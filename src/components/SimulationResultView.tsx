import React, { useState, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BotMessageSquare,
  BarChart3,
  BookOpen,
  ArrowRight,
  Filter,
  AlertCircle,
  Printer,
  FileDown,
  Target,
  UserCheck,
  AlertTriangle,
  Lightbulb,
  Check,
  GraduationCap,
  Search,
  CheckSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExamSession, Question, StudentProfile, COMPETENCY_LABELS, Competency } from '../types';
import { explainMistakeWithAI } from '../services/api';
import { generateExamReportPDF, analyzeStudentPerformance } from '../services/pdfGenerator';

interface SimulationResultViewProps {
  session: ExamSession;
  allQuestions: Question[];
  profile?: StudentProfile;
  onRestartSimulation: () => void;
  onStartAdaptiveForCompetency: (comp: Competency) => void;
  onOpenAITutorWithContext?: (questionContext: string, stimulus: string) => void;
}

export const SimulationResultView: React.FC<SimulationResultViewProps> = ({
  session,
  allQuestions,
  profile,
  onRestartSimulation,
  onStartAdaptiveForCompetency,
  onOpenAITutorWithContext
}) => {
  const [reviewFilter, setReviewFilter] = useState<'semua' | 'salah' | 'benar'>('semua');
  const [loadingAiMap, setLoadingAiMap] = useState<Record<string, boolean>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  // Map session question ids to actual questions
  const sessionQuestions = session.questionIds
    .map((id) => allQuestions.find((q) => q.id === id))
    .filter((q): q is Question => q !== undefined);

  const questionsToReview = useMemo(() => {
    return sessionQuestions.filter((q) => {
      const studentAns = session.answers[q.id];
      const isAnswered = studentAns && (!Array.isArray(studentAns) || studentAns.length > 0);

      let isCorrect = false;
      if (isAnswered) {
        if (q.type === 'pilihan-ganda-kompleks') {
          if (Array.isArray(studentAns) && Array.isArray(q.correctAnswer)) {
            const sortedAns = [...studentAns].sort().join(',');
            const sortedKey = [...q.correctAnswer].sort().join(',');
            isCorrect = sortedAns === sortedKey;
          }
        } else {
          isCorrect = studentAns === q.correctAnswer;
        }
      }

      if (reviewFilter === 'semua') return true;
      if (reviewFilter === 'salah') return !isCorrect;
      if (reviewFilter === 'benar') return isCorrect;
      return true;
    });
  }, [sessionQuestions, session.answers, reviewFilter]);

  const competencyEntries = Object.entries(session.competencyScores)
    .filter(([_, data]) => data.total > 0)
    .sort((a, b) => a[1].percentage - b[1].percentage);

  // Pedagogical analysis for display & PDF
  const reportData = useMemo(() => ({
    studentName: profile?.name || 'Andi Muhammad Fadhil',
    studentNis: profile?.nis || '19283',
    studentClass: profile?.className || 'XII A',
    nisn: profile?.nisn || '0068412091',
    schoolName: profile?.school || 'SMAN 1 PINRANG',
    examTitle: session.title,
    examDate: new Date(session.endTime || session.startTime).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    durationMinutes: session.durationMinutes,
    timeSpentSeconds: session.elapsedSeconds,
    totalQuestions: session.totalQuestions,
    correctCount: session.correctCount,
    incorrectCount: session.incorrectCount,
    unansweredCount: session.unansweredCount,
    score: session.score,
    competencyScores: session.competencyScores,
    teacherName: 'Muhammad Ali Rahman, S.Pd., M.Pd.'
  }), [session, profile]);

  const analysis = useMemo(() => {
    return analyzeStudentPerformance(reportData);
  }, [reportData]);

  const handleDownloadPDF = () => {
    generateExamReportPDF(reportData);
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 4000);
  };

  const handleExplainMistake = async (q: Question, studentAns: any) => {
    setLoadingAiMap((prev) => ({ ...prev, [q.id]: true }));
    try {
      const studentStr = Array.isArray(studentAns) ? studentAns.join(', ') : (studentAns || 'Tidak Dijawab');
      const correctStr = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer;
      const explanation = await explainMistakeWithAI(q, studentStr, correctStr);
      setAiExplanations((prev) => ({ ...prev, [q.id]: explanation }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAiMap((prev) => ({ ...prev, [q.id]: false }));
    }
  };

  const minutesTaken = Math.floor(session.elapsedSeconds / 60);
  const secondsTaken = session.elapsedSeconds % 60;

  return (
    <div className="space-y-8 animate-fadeIn max-w-full overflow-x-hidden min-w-0">
      {/* Top hero result card & nilai akhir */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Pill & School Info */}
          <div className="text-center space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              KARTU LAPORAN HASIL EVALUASI TKA BAHASA INDONESIA
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {session.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Instrumen Berstandar HOTS • Seleksi Masuk PTN • Guru Pembimbing: <strong>Muhammad Ali Rahman</strong>
            </p>
          </div>

          {/* Student Credentials Certificate Banner */}
          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-xs shrink-0">
                {(profile?.name || 'S').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-black text-indigo-700 tracking-wider block">
                  LEMBAR IDENTITAS PESERTA DIDIK
                </span>
                <span className="font-black text-slate-900 text-base sm:text-lg block truncate">
                  {profile?.name || 'Andi Muhammad Fadhil'}
                </span>
                <div className="flex items-center gap-2 flex-wrap text-slate-600 text-xs mt-0.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-900 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-100">
                    <GraduationCap className="w-3 h-3 text-indigo-600" />
                    Kelas: <strong>{profile?.className || 'XII A'}</strong>
                  </span>
                  <span>•</span>
                  <span>NIS: <strong className="font-mono text-indigo-900">{profile?.nis || '19283'}</strong></span>
                  <span>•</span>
                  <span>{profile?.school || 'SMAN 1 PINRANG'}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                title="Download lembar nilai lengkap dalam format PDF A4"
              >
                {pdfDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>PDF Berhasil Diunduh!</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Download PDF (A4)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                title="Cetak lembar nilai langsung"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Cetak Lembar</span>
              </button>
            </div>
          </div>

          {/* Nilai akhir highlight card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xs border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Nilai Akhir: Jumlah Jawaban Benar dari Total Pertanyaan */}
              <div className="md:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  <Target className="w-3.5 h-3.5 text-yellow-300" />
                  NILAI AKHIR EVALUASI
                </span>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                    {session.correctCount} / {session.totalQuestions}{' '}
                    <span className="text-lg sm:text-2xl font-bold text-indigo-300">
                      Jawaban Benar
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    Nilai akhir menunjukkan jumlah jawaban benar ({session.correctCount}) dari total keseluruhan ({session.totalQuestions} butir soal).
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-xs font-bold px-3 py-1 rounded-lg bg-white/10 text-white border border-white/15">
                    Predikat: <strong className="text-amber-300">{analysis.predicate}</strong>
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Akurasi: {Math.round((session.correctCount / session.totalQuestions) * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('periksa-jawaban-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-950" />
                    <span>Periksa Jawaban Siswa</span>
                  </button>
                </div>
              </div>

              {/* Skor Skala 100 & Download Action */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-slate-800 rounded-2xl border border-slate-700 text-center space-y-3">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-300">
                  SKOR AKHIR (SKALA 100)
                </span>
                <div className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight leading-none">
                  {session.score}
                  <span className="text-xl text-white/50 font-medium">/100</span>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-indigo-600" />
                  <span>Download Hasil Nilai (PDF A4)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200">
              <span className="text-xs text-emerald-800 font-bold block">Jawaban Benar</span>
              <span className="text-2xl font-black text-emerald-700">{session.correctCount}</span>
              <span className="text-[11px] text-emerald-600 block">dari {session.totalQuestions} soal</span>
            </div>
            <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200">
              <span className="text-xs text-rose-800 font-bold block">Jawaban Salah</span>
              <span className="text-2xl font-black text-rose-700">{session.incorrectCount}</span>
              <span className="text-[11px] text-rose-600 block">perlu dianalisis</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-600 font-bold block">Tidak Dijawab</span>
              <span className="text-2xl font-black text-slate-700">{session.unansweredCount}</span>
              <span className="text-[11px] text-slate-500 block">soal terlewat</span>
            </div>
            <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200">
              <span className="text-xs text-sky-800 font-bold block">Waktu Selesai</span>
              <span className="text-2xl font-black text-sky-700">
                {minutesTaken}m {secondsTaken}s
              </span>
              <span className="text-[11px] text-sky-600 block">dari {session.durationMinutes} menit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fitur periksa jawaban siswa */}
      <div id="periksa-jawaban-section" className="space-y-4 pt-2">
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                  Fitur Periksa Jawaban Siswa
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Periksa setiap butir soal, bandingkan pilihan Anda dengan kunci jawaban resmi, dan pelajari pembahasan ilmiahnya.
              </p>
            </div>

            {/* Filter Review Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs shrink-0 self-start sm:self-center">
              <button
                onClick={() => setReviewFilter('semua')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  reviewFilter === 'semua'
                    ? 'bg-white text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({sessionQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('salah')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  reviewFilter === 'salah'
                    ? 'bg-white text-rose-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salah ({session.incorrectCount + session.unansweredCount})
              </button>
              <button
                onClick={() => setReviewFilter('benar')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  reviewFilter === 'benar'
                    ? 'bg-white text-emerald-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Benar ({session.correctCount})
              </button>
            </div>
          </div>

          {/* Quick Palette Jump Bar */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Lompat Langsung ke Nomor Soal:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sessionQuestions.map((q, idx) => {
                const ans = session.answers[q.id];
                const isAnswered = ans && (!Array.isArray(ans) || ans.length > 0);
                let isCorrect = false;
                if (isAnswered) {
                  if (q.type === 'pilihan-ganda-kompleks') {
                    if (Array.isArray(ans) && Array.isArray(q.correctAnswer)) {
                      isCorrect = [...ans].sort().join(',') === [...q.correctAnswer].sort().join(',');
                    }
                  } else {
                    isCorrect = ans === q.correctAnswer;
                  }
                }

                let badgeCls = 'bg-slate-100 text-slate-600 border-slate-200';
                if (!isAnswered) {
                  badgeCls = 'bg-slate-200 text-slate-700 border-slate-300';
                } else if (isCorrect) {
                  badgeCls = 'bg-emerald-600 text-white font-bold border-emerald-700';
                } else {
                  badgeCls = 'bg-rose-600 text-white font-bold border-rose-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      const el = document.getElementById(`review-question-${q.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`w-8 h-8 rounded-xl border text-xs flex items-center justify-center font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95 ${badgeCls}`}
                    title={`Nomor ${idx + 1}: ${isCorrect ? 'Benar' : isAnswered ? 'Salah' : 'Tidak Dijawab'}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Benar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Salah
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Tidak Dijawab
              </span>
            </div>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-6">
          {questionsToReview.map((q, idx) => {
            const studentAns = session.answers[q.id];
            const isAnswered = studentAns && (!Array.isArray(studentAns) || studentAns.length > 0);

            let isCorrect = false;
            if (isAnswered) {
              if (q.type === 'pilihan-ganda-kompleks') {
                if (Array.isArray(studentAns) && Array.isArray(q.correctAnswer)) {
                  isCorrect = [...studentAns].sort().join(',') === [...q.correctAnswer].sort().join(',');
                }
              } else {
                isCorrect = studentAns === q.correctAnswer;
              }
            }

            const explanationAi = aiExplanations[q.id];
            const isLoadingThisAi = loadingAiMap[q.id];

            return (
              <div
                key={q.id}
                id={`review-question-${q.id}`}
                className={`p-5 sm:p-6 rounded-3xl bg-white border shadow-xs space-y-4 transition-all ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    >
                      {session.questionIds.indexOf(q.id) + 1}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">{q.stimulusTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {COMPETENCY_LABELS[q.competency]}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? 'JAWABAN BENAR' : isAnswered ? 'JAWABAN SALAH' : 'TIDAK DIJAWAB'}
                    </span>
                  </div>
                </div>

                {/* Stimulus Snippet */}
                <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 max-h-40 overflow-y-auto stimulus-scroll font-serif-reading leading-relaxed border border-slate-100">
                  {q.stimulusText}
                </div>

                {/* Question */}
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{q.question}</h4>

                {/* Options display */}
                <div className="space-y-1.5">
                  {q.options.map((opt) => {
                    const isChosen = Array.isArray(studentAns)
                      ? studentAns.includes(opt.id)
                      : studentAns === opt.id;

                    const isKey = Array.isArray(q.correctAnswer)
                      ? q.correctAnswer.includes(opt.id)
                      : q.correctAnswer === opt.id;

                    let bg = 'bg-white border-slate-200 text-slate-700';
                    if (isKey) {
                      bg = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                    } else if (isChosen && !isKey) {
                      bg = 'bg-rose-50 border-rose-400 text-rose-900 font-medium';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${bg}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center shrink-0 font-bold">
                          {opt.id}
                        </span>
                        <div className="flex-1 leading-snug">
                          {opt.text}
                          {isKey && (
                            <span className="ml-2 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Kunci Jawaban Resmi
                            </span>
                          )}
                          {isChosen && !isKey && (
                            <span className="ml-2 text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                              Pilihan Anda (Keliru)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Official Scientific Explanation */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-indigo-600" />
                    Pembahasan Ilmiah & Telaah Nalar:
                  </span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>

                {/* AI Why Mistake Button & Box */}
                {!isCorrect && (
                  <div className="space-y-2 pt-1">
                    {!explanationAi ? (
                      <button
                        onClick={() => handleExplainMistake(q, studentAns)}
                        disabled={isLoadingThisAi}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-bold bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        <BotMessageSquare className="w-3.5 h-3.5 text-amber-600" />
                        {isLoadingThisAi ? 'AI sedang mendiagnosis jawaban...' : 'Mengapa jawaban saya salah? (Analisis AI SMAN 1 Pinrang)'}
                      </button>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-800">
                          <BotMessageSquare className="w-3.5 h-3.5 text-amber-600" />
                          Penjelasan Diagnosis Kesalahan (AI Tutor SMAN 1 Pinrang):
                        </div>
                        <p className="text-[12px] leading-relaxed whitespace-pre-line text-slate-800">
                          {explanationAi}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Deskripsi kemampuan siswa & materi penguatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Section A: Deskripsi Kemampuan Siswa */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Deskripsi Kemampuan Siswa
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Analisis Nalar
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p className="font-medium">
              {analysis.description}
            </p>
          </div>

          {/* Strong topics badge list */}
          {analysis.strongTopics.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-extrabold text-slate-700 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Materi yang Telah Dikuasai dengan Sangat Baik:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.strongTopics.map((st) => (
                  <span
                    key={st.competency}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {st.name} ({st.correct}/{st.total} - {st.percentage}%)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section B: Materi yang Perlu Diasah (Diagnosis & Rekomendasi) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2 text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Materi yang Perlu Diasah
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Rekomendasi Pembimbing
            </span>
          </div>

          {analysis.weakTopics.length === 0 ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 space-y-2">
              <div className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Sempurna! Semua Kompetensi Tuntas!
              </div>
              <p className="leading-relaxed">
                Akurasi Anda merata di seluruh materi kompetensi (≥ 70%). Pertahankan daya nalar kritis dengan mencoba simulasi intensif 30 butir soal bertema multiteks.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {analysis.weakTopics.slice(0, 3).map((wt, idx) => (
                <div
                  key={wt.competency}
                  className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-rose-950">
                      {idx + 1}. {wt.name}
                    </span>
                    <span className="font-black text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-200 text-[11px]">
                      Benar: {wt.correct}/{wt.total} ({wt.percentage}%)
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11.5px]">
                    <strong className="text-slate-800">Saran Perbaikan:</strong> {wt.recommendation}
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onStartAdaptiveForCompetency(wt.competency)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs cursor-pointer transition-all"
                    >
                      <Target className="w-3.5 h-3.5 text-rose-200" />
                      <span>Asah Materi Ini dengan Soal Terarah</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Analisis capaian per kompetensi */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Tabel Rincian Capaian per Materi Kompetensi TKA
            </h3>
            <p className="text-xs text-slate-500">
              Statistik ketuntasan berdasarkan jawaban benar siswa pada setiap materi pengujian.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold cursor-pointer transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unduh Format PDF (A4)</span>
          </button>
        </div>

        <div className="space-y-3.5 pt-2">
          {competencyEntries.map(([compKey, data]) => {
            const label = COMPETENCY_LABELS[compKey as keyof typeof COMPETENCY_LABELS] || compKey;
            const isLow = data.percentage < 70;
            return (
              <div key={compKey} className="space-y-1.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">
                      Benar: <strong className="text-slate-800">{data.correct}</strong> dari {data.total} soal
                    </span>
                    <span
                      className={`font-black px-2 py-0.5 rounded-md text-[11px] ${
                        isLow
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {data.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isLow ? 'bg-rose-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Bar with Download PDF and Restart */}
      <div className="sticky bottom-4 z-20 p-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold text-slate-800">
            Nilai Akhir: <strong className="text-indigo-700">{session.correctCount} / {session.totalQuestions} Benar</strong> (Skor: {session.score}/100)
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Unduh Lembar Nilai Akhir (PDF A4)</span>
          </button>
          <button
            type="button"
            onClick={onRestartSimulation}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Mulai Ujian Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
