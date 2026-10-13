import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  BookOpen,
  RotateCcw,
  BotMessageSquare,
  ChevronRight,
  ChevronLeft,
  Layers,
  Volume2,
  VolumeX,
  Type,
  Grid,
  Keyboard,
  Award,
  FileDown,
  Target,
  UserCheck,
  AlertTriangle,
  X
} from 'lucide-react';
import {
  Question,
  Competency,
  DifficultyLevel,
  COMPETENCY_LABELS,
  StudentProfile
} from '../types';
import { recordPracticeAnswer } from '../services/storage';
import { explainMistakeWithAI } from '../services/api';
import { generateExamReportPDF, analyzeStudentPerformance } from '../services/pdfGenerator';

interface PracticeViewProps {
  questions: Question[];
  profile: StudentProfile;
  onUpdateProfile: (p: StudentProfile) => void;
  filterCompetency?: string | null;
  onOpenAITutorWithContext: (questionContext: string, stimulus: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  profile,
  onUpdateProfile,
  filterCompetency,
  onOpenAITutorWithContext
}) => {
  const [selectedComp, setSelectedComp] = useState<string>(filterCompetency || 'semua');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('semua');
  const [selectedType, setSelectedType] = useState<string>('semua');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Reading tools
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [multitextTab, setMultitextTab] = useState<'semua' | 'teks1' | 'teks2'>('semua');
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [sessionAnswers, setSessionAnswers] = useState<
    Record<string, { answered: any; isCorrect: boolean; q: Question }>
  >({});
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchComp = selectedComp === 'semua' || q.competency === selectedComp;
    const matchDiff = selectedDifficulty === 'semua' || q.difficulty === selectedDifficulty;
    const matchType = selectedType === 'semua' || q.type === selectedType;
    return matchComp && matchDiff && matchType;
  });

  const currentQ: Question | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Stop speech synthesis on change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setMultitextTab('semua');
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape' && showSummaryModal) {
        setShowSummaryModal(false);
        return;
      }

      const key = e.key.toUpperCase();
      if (!isAnswerSubmitted && ['A', 'B', 'C', 'D', 'E'].includes(key)) {
        handleSelectOption(key);
      } else if (e.key === 'ArrowRight' && isAnswerSubmitted) {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerSubmitted, currentQ, selectedAnswer, showSummaryModal]);

  const toggleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;

    if (currentQ?.type === 'pilihan-ganda-kompleks') {
      const cur = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
      if (cur.includes(optId)) {
        setSelectedAnswer(cur.filter((id) => id !== optId));
      } else {
        setSelectedAnswer([...cur, optId]);
      }
    } else {
      setSelectedAnswer(optId);
    }
  };

  const checkIsCorrect = (): boolean => {
    if (!currentQ) return false;
    if (currentQ.type === 'pilihan-ganda-kompleks') {
      if (!Array.isArray(selectedAnswer) || !Array.isArray(currentQ.correctAnswer)) return false;
      const sortedSelected = [...selectedAnswer].sort().join(',');
      const sortedCorrect = [...currentQ.correctAnswer].sort().join(',');
      return sortedSelected === sortedCorrect;
    }
    return selectedAnswer === currentQ.correctAnswer;
  };

  const handleSubmitAnswer = () => {
    if (!currentQ || !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) return;

    const correct = checkIsCorrect();
    setIsAnswerSubmitted(true);
    setAiExplanation(null);

    setSessionAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { answered: selectedAnswer, isCorrect: correct, q: currentQ }
    }));

    const updated = recordPracticeAnswer(currentQ.id, selectedAnswer, correct, currentQ.competency);
    onUpdateProfile(updated);
  };

  const sessionTotal = Object.keys(sessionAnswers).length;
  const sessionCorrect = Object.values(sessionAnswers).filter((a) => a.isCorrect).length;
  const sessionIncorrect = sessionTotal - sessionCorrect;
  const sessionScore = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  const sessionCompScores = useMemo(() => {
    const stats: Record<Competency, { total: number; correct: number; percentage: number }> = {
      'ide-pokok': { total: 0, correct: 0, percentage: 0 },
      'tersurat-tersirat': { total: 0, correct: 0, percentage: 0 },
      'simpulan-makna': { total: 0, correct: 0, percentage: 0 },
      'hubungan-paragraf': { total: 0, correct: 0, percentage: 0 },
      'tujuan-penulis': { total: 0, correct: 0, percentage: 0 },
      'evaluasi-argumen': { total: 0, correct: 0, percentage: 0 },
      'akurasi-relevansi': { total: 0, correct: 0, percentage: 0 },
      'struktur-kebahasaan': { total: 0, correct: 0, percentage: 0 },
      'perbandingan-teks': { total: 0, correct: 0, percentage: 0 }
    };
    Object.values(sessionAnswers).forEach((item) => {
      const c = item.q.competency;
      if (!stats[c]) stats[c] = { total: 0, correct: 0, percentage: 0 };
      stats[c].total += 1;
      if (item.isCorrect) stats[c].correct += 1;
    });
    Object.keys(stats).forEach((k) => {
      const c = k as Competency;
      if (stats[c].total > 0) {
        stats[c].percentage = Math.round((stats[c].correct / stats[c].total) * 100);
      }
    });
    return stats;
  }, [sessionAnswers]);

  const handleDownloadPracticePDF = () => {
    if (sessionTotal === 0) return;
    generateExamReportPDF({
      studentName: profile.name,
      studentNis: profile.nis || '19283',
      studentClass: profile.className,
      nisn: profile.nisn,
      schoolName: profile.school,
      examTitle: 'Latihan Soal Mandiri TKA Bahasa Indonesia',
      examDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      durationMinutes: Math.max(10, Math.round(sessionTotal * 1.5)),
      timeSpentSeconds: sessionTotal * 90,
      totalQuestions: sessionTotal,
      correctCount: sessionCorrect,
      incorrectCount: sessionIncorrect,
      unansweredCount: 0,
      score: sessionScore,
      competencyScores: sessionCompScores,
      teacherName: 'Muhammad Ali Rahman, S.Pd., M.Pd.'
    });
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setSelectedAnswer('');
    setAiExplanation(null);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleAskWhyMistake = async () => {
    if (!currentQ) return;
    setLoadingAi(true);
    try {
      const answerStr = Array.isArray(selectedAnswer) ? selectedAnswer.join(', ') : selectedAnswer;
      const correctStr = Array.isArray(currentQ.correctAnswer) ? currentQ.correctAnswer.join(', ') : currentQ.correctAnswer;
      const explanation = await explainMistakeWithAI(currentQ, answerStr, correctStr);
      setAiExplanation(explanation);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  if (!currentQ) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Filter className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">Tidak Ada Soal yang Cocok</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Kombinasi filter kompetensi dan tingkat kesulitan yang dipilih saat ini belum memiliki butir soal.
        </p>
        <button
          onClick={() => {
            setSelectedComp('semua');
            setSelectedDifficulty('semua');
            setSelectedType('semua');
            setCurrentIndex(0);
          }}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
        >
          Reset Seluruh Filter
        </button>
      </div>
    );
  }

  const isCorrect = checkIsCorrect();
  const hasMultitext = currentQ.stimulusText.includes('TEKS 1:') && currentQ.stimulusText.includes('TEKS 2:');

  let displayedText = currentQ.stimulusText;
  if (hasMultitext && multitextTab === 'teks1') {
    displayedText = currentQ.stimulusText.split('TEKS 2:')[0] || currentQ.stimulusText;
  } else if (hasMultitext && multitextTab === 'teks2') {
    const parts = currentQ.stimulusText.split('TEKS 2:');
    displayedText = parts.length > 1 ? `TEKS 2:\n${parts[1]}` : currentQ.stimulusText;
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-full overflow-x-hidden min-w-0">
      {/* Header & Comprehensive Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Latihan Soal Interaktif (HOTS)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Halo <strong className="text-indigo-700">{profile.name}</strong> ({profile.className}) • Latihan mandiri dengan umpan balik langsung, telaah nalar ilmiah, dan bantuan AI Tutor.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {sessionTotal > 0 && (
              <button
                type="button"
                onClick={() => setShowSummaryModal(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                title="Lihat Nilai Akhir & Download PDF"
              >
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>Nilai Akhir ({sessionCorrect}/{sessionTotal})</span>
                <FileDown className="w-3.5 h-3.5 text-white/90" />
              </button>
            )}
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-indigo-600" />
              <span>Daftar Soal ({currentIndex + 1}/{filteredQuestions.length})</span>
            </button>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl capitalize">
              {currentQ.difficulty}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Kompetensi:</label>
            <select
              value={selectedComp}
              onChange={(e) => {
                setSelectedComp(e.target.value);
                setCurrentIndex(0);
                setIsAnswerSubmitted(false);
                setSelectedAnswer('');
                setAiExplanation(null);
              }}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 text-xs focus:ring-1 focus:ring-indigo-500"
            >
              <option value="semua">Semua Kompetensi ({questions.length})</option>
              {Object.entries(COMPETENCY_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Tingkat Kesulitan:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentIndex(0);
                setIsAnswerSubmitted(false);
                setSelectedAnswer('');
                setAiExplanation(null);
              }}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 text-xs focus:ring-1 focus:ring-indigo-500 capitalize"
            >
              <option value="semua">Semua Kesulitan</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">Bentuk Soal:</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentIndex(0);
                setIsAnswerSubmitted(false);
                setSelectedAnswer('');
                setAiExplanation(null);
              }}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 text-xs focus:ring-1 focus:ring-indigo-500"
            >
              <option value="semua">Semua Bentuk</option>
              <option value="pilihan-ganda">Pilihan Ganda Biasa</option>
              <option value="pilihan-ganda-kompleks">Pilihan Ganda Kompleks</option>
              <option value="benar-salah">Benar / Salah</option>
            </select>
          </div>
        </div>

        {/* Quick Palette Drawer if opened */}
        {showPalette && (
          <div className="pt-3 border-t border-slate-100 space-y-2 animate-fadeIn">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Pilih Cepat Nomor:</span>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto stimulus-scroll p-1">
              {filteredQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsAnswerSubmitted(false);
                    setSelectedAnswer('');
                    setAiExplanation(null);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Split Pane: Left Reading Stimulus, Right Question & Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Stimulus Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Wacana Stimulus (Soal #{currentIndex + 1})
            </span>

            {/* Reading Toolbar */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
              {/* Font Size Pills */}
              <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'sm' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Huruf Kecil"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'md' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Huruf Standar"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'lg' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Huruf Besar"
                >
                  A+
                </button>
              </div>

              {/* Text-to-Speech Audio */}
              <button
                onClick={() => toggleSpeakText(currentQ.stimulusText)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                  isSpeaking ? 'bg-indigo-600 text-white animate-pulse' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title={isSpeaking ? 'Matikan Suara' : 'Dengarkan Wacana'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Audio'}</span>
              </button>
            </div>
          </div>

          {/* Multitext Tab Switcher if applicable */}
          {hasMultitext && (
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMultitextTab('semua')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  multitextTab === 'semua' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Tampilkan Kedua Teks
              </button>
              <button
                onClick={() => setMultitextTab('teks1')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  multitextTab === 'teks1' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Fokus Teks 1
              </button>
              <button
                onClick={() => setMultitextTab('teks2')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  multitextTab === 'teks2' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Fokus Teks 2
              </button>
            </div>
          )}

          <div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              {COMPETENCY_LABELS[currentQ.competency]}
            </span>
            <h4 className="font-extrabold text-slate-900 text-base">
              {currentQ.stimulusTitle}
            </h4>
          </div>

          {/* Scrollable Stimulus Body */}
          <div
            className={`text-slate-800 leading-relaxed max-h-[420px] overflow-y-auto pr-2 stimulus-scroll whitespace-pre-line font-serif-reading ${
              fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
            }`}
          >
            {displayedText}
          </div>

          {currentQ.stimulusSource && (
            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
              Sumber: {currentQ.stimulusSource}
            </p>
          )}

          {/* Quick AI Tutor Discussion */}
          <div className="pt-2">
            <button
              onClick={() => onOpenAITutorWithContext(currentQ.question, currentQ.stimulusText)}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              <BotMessageSquare className="w-4 h-4" />
              <span>Butuh bimbingan memahami wacana ini? Buka AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Right: Question & Options Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {currentQ.type === 'pilihan-ganda-kompleks'
                ? 'Pilihan Ganda Kompleks (Bisa > 1)'
                : currentQ.type === 'benar-salah'
                ? 'Benar / Salah'
                : 'Pilihan Ganda'}
            </span>
            <span className="text-[11px] text-slate-400">
              Subkompetensi: {currentQ.subCompetency}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = Array.isArray(selectedAnswer)
                ? selectedAnswer.includes(opt.id)
                : selectedAnswer === opt.id;

              const isCorrectOpt = Array.isArray(currentQ.correctAnswer)
                ? currentQ.correctAnswer.includes(opt.id)
                : currentQ.correctAnswer === opt.id;

              let style = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

              if (isAnswerSubmitted) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                } else if (isSelected && !isCorrectOpt) {
                  style = 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-300';
                } else {
                  style = 'opacity-40 bg-slate-50 text-slate-400 border-slate-200';
                }
              } else if (isSelected) {
                style = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-500 shadow-2xs';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                      isSelected
                        ? isAnswerSubmitted
                          ? isCorrectOpt
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="leading-snug pt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Selesai & Periksa Jawaban</span>
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              {/* Feedback Alert with XP Reward */}
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Benar! Mari lihat alasan jawabannya.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Belum tepat. Perhatikan kembali teks.</span>
                      </>
                    )}
                  </div>
                  {isCorrect && (
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> +15 XP
                    </span>
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/60 text-slate-800">
                  <span className="font-bold block mb-1">Pembahasan Resmi:</span>
                  {currentQ.explanation}
                </div>
              </div>

              {/* AI "Mengapa Jawaban Saya Salah?" Button */}
              {!isCorrect && !aiExplanation && (
                <button
                  onClick={handleAskWhyMistake}
                  disabled={loadingAi}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <BotMessageSquare className="w-4 h-4 text-amber-600" />
                  {loadingAi ? 'AI sedang mendiagnosis jawaban...' : 'Mengapa jawaban saya salah? (Analisis AI)'}
                </button>
              )}

              {/* AI Explanation Box */}
              {aiExplanation && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <BotMessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    Penjelasan Diagnosis AI SMAN 1 Pinrang:
                  </div>
                  <div className="text-[12px] leading-relaxed whitespace-pre-line text-slate-800">
                    {aiExplanation}
                  </div>
                </div>
              )}

              {/* Navigation to next */}
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Soal Berikutnya ({currentIndex + 1 < filteredQuestions.length ? `${currentIndex + 2}` : '1'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Session Progress floating banner */}
      {sessionTotal > 0 && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 block">
                Hasil Latihan: {sessionCorrect} dari {sessionTotal} Soal Benar ({sessionScore}%)
              </span>
              <span className="text-slate-500 text-[11px]">
                {profile.name} • {profile.className} • SMAN 1 Pinrang
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSummaryModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Buka Lembar Nilai Akhir & Unduh PDF (A4)</span>
          </button>
        </div>
      )}

      {/* Nilai Akhir Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-300" />
                </span>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    Lembar Nilai Akhir Latihan Mandiri
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {profile.name} • {profile.className} • SMAN 1 Pinrang
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nilai Akhir Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xs border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full inline-block">
                NILAI AKHIR LATIHAN
              </span>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    {sessionCorrect} / {sessionTotal} Soal Benar
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Menunjukkan jumlah jawaban benar dari seluruh butir pertanyaan yang telah dikerjakan.
                  </p>
                </div>
                <div className="text-right bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-300 font-bold block uppercase">Skor</span>
                  <div className="text-3xl font-black text-amber-400">
                    {sessionScore}<span className="text-sm text-white/50">/100</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs flex-wrap border-t border-indigo-800/80">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Benar: {sessionCorrect}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Salah: {sessionIncorrect}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white font-semibold">
                  Akurasi: {sessionScore}%
                </span>
              </div>
            </div>

            {/* Deskripsi Kemampuan Siswa */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Deskripsi Kemampuan Siswa:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {sessionScore >= 80
                  ? `Ananda ${profile.name} (${profile.className}) menunjukkan pemahaman nalar literasi yang sangat baik pada butir soal yang dikerjakan. Daya analisis terhadap teks dan penarikan simpulan logis telah terbangun kokoh.`
                  : sessionScore >= 60
                  ? `Ananda ${profile.name} (${profile.className}) memiliki kemampuan literasi dasar yang memadai, namun perlu meningkatkan ketelitian pada telaah wacana kompleks dan verifikasi fakta pendukung.`
                  : `Ananda ${profile.name} (${profile.className}) disarankan memperkuat pemahaman konsep ide pokok dan hubungan antarkalimat dengan membaca rangkuman modul pembelajaran.`}
              </p>
            </div>

            {/* Materi yang Perlu Diasah */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2 text-xs">
              <span className="font-extrabold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Materi yang Perlu Diasah:
              </span>
              <div className="space-y-1.5 text-slate-700">
                {Object.entries(sessionCompScores)
                  .filter(([_, data]) => data.total > 0 && (data.percentage < 75 || data.correct < data.total))
                  .slice(0, 3)
                  .map(([compKey, data]) => (
                    <div key={compKey} className="flex items-center justify-between bg-white p-2 rounded-xl border border-rose-100">
                      <span className="font-semibold text-rose-950">
                        {COMPETENCY_LABELS[compKey as keyof typeof COMPETENCY_LABELS] || compKey}
                      </span>
                      <span className="font-bold text-rose-700 text-[11px]">
                        Benar: {data.correct}/{data.total} ({data.percentage}%)
                      </span>
                    </div>
                  ))}
                {Object.values(sessionCompScores).every((d) => d.total === 0 || d.percentage >= 75) && (
                  <p className="text-emerald-700 font-medium">
                    Semua materi yang dikerjakan pada sesi ini tuntas dengan capaian baik (≥ 75%).
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Lanjut Latihan Soal
              </button>
              <button
                type="button"
                onClick={handleDownloadPracticePDF}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <FileDown className="w-4 h-4 text-white" />
                <span>Unduh Laporan Nilai Akhir (PDF A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
