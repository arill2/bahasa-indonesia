import React, { useState, useEffect } from 'react';
import {
  Timer,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Layers,
  ArrowRight,
  Volume2,
  VolumeX,
  Type,
  Highlighter,
  Maximize2,
  Grid,
  X,
  Keyboard
} from 'lucide-react';
import { Question, ExamSession, Competency, COMPETENCY_LABELS, StudentProfile } from '../types';
import { recordExamSession } from '../services/storage';

interface SimulationViewProps {
  allQuestions: Question[];
  profile: StudentProfile;
  onUpdateProfile: (p: StudentProfile) => void;
  onViewResults: (session: ExamSession) => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  allQuestions,
  profile,
  onUpdateProfile,
  onViewResults
}) => {
  // Mode selection or active test
  const [examMode, setExamMode] = useState<'cepat' | 'reguler' | 'intensif'>('reguler');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [initialDurationMinutes, setInitialDurationMinutes] = useState<number>(45);
  const [startTime, setStartTime] = useState<number>(0);
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Reading tools state
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isHighlighterActive, setIsHighlighterActive] = useState<boolean>(false);
  const [highlightedParas, setHighlightedParas] = useState<Record<string, number[]>>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [multitextTab, setMultitextTab] = useState<'semua' | 'teks1' | 'teks2'>('semua');

  // Configuration for modes
  const modeConfigs = {
    cepat: {
      count: Math.min(15, allQuestions.length),
      minutes: 20,
      label: 'Simulasi Cepat',
      desc: 'Pemanasan kilat materi esensial (15 soal • 20 menit)',
      badge: 'Cepat & Fokus'
    },
    reguler: {
      count: Math.min(30, allQuestions.length),
      minutes: 45,
      label: 'Simulasi Reguler',
      desc: 'Standar asesmen resmi semester (30 soal • 45 menit)',
      badge: 'Rekomendasi Utama'
    },
    intensif: {
      count: Math.min(45, allQuestions.length),
      minutes: 65,
      label: 'Simulasi Intensif',
      desc: 'Uji komprehensif seluruh kompetensi TKA (45 soal • 65 menit)',
      badge: 'Ketahanan Penuh'
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!isTestActive) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishSimulation(true); // Auto-submit when time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, answers, flagged]);

  // Keyboard shortcut listener for active exam
  useEffect(() => {
    if (!isTestActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
        handleSelectOption(key);
      } else if (key === 'F') {
        handleToggleFlag();
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < currentQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestActive, currentIndex, currentQuestions, answers, flagged]);

  // Escape key handler for modal dialogs
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showConfirmFinishModal) {
          setShowConfirmFinishModal(false);
        } else if (showMobilePalette) {
          setShowMobilePalette(false);
        }
      }
    };

    if (showConfirmFinishModal || showMobilePalette) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showConfirmFinishModal, showMobilePalette]);

  // Clean speech synthesis on unmount or question change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setMultitextTab('semua');
  }, [currentIndex, isTestActive]);

  const handleStartExam = (selectedMode: 'cepat' | 'reguler' | 'intensif') => {
    const config = modeConfigs[selectedMode];
    // Shuffle or select subset
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, config.count);

    setExamMode(selectedMode);
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged([]);
    setTimeLeftSeconds(config.minutes * 60);
    setInitialDurationMinutes(config.minutes);
    setStartTime(Date.now());
    setIsTestActive(true);
    setHighlightedParas({});
  };

  const handleSelectOption = (optId: string) => {
    const q = currentQuestions[currentIndex];
    if (!q) return;

    if (q.type === 'pilihan-ganda-kompleks') {
      const cur = Array.isArray(answers[q.id]) ? [...answers[q.id]] : [];
      if (cur.includes(optId)) {
        setAnswers({ ...answers, [q.id]: cur.filter((id) => id !== optId) });
      } else {
        setAnswers({ ...answers, [q.id]: [...cur, optId] });
      }
    } else {
      setAnswers({ ...answers, [q.id]: optId });
    }
  };

  const handleToggleFlag = () => {
    const q = currentQuestions[currentIndex];
    if (!q) return;

    if (flagged.includes(q.id)) {
      setFlagged(flagged.filter((id) => id !== q.id));
    } else {
      setFlagged([...flagged, q.id]);
    }
  };

  const handleToggleHighlightPara = (paraIdx: number) => {
    if (!isHighlighterActive) return;
    const qId = currentQuestions[currentIndex]?.id;
    if (!qId) return;

    const currentList = highlightedParas[qId] || [];
    if (currentList.includes(paraIdx)) {
      setHighlightedParas({
        ...highlightedParas,
        [qId]: currentList.filter((idx) => idx !== paraIdx)
      });
    } else {
      setHighlightedParas({
        ...highlightedParas,
        [qId]: [...currentList, paraIdx]
      });
    }
  };

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

  const handleFinishSimulation = (isAuto = false) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setShowConfirmFinishModal(false);
    setIsTestActive(false);

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const compStats: Record<Competency, { total: number; correct: number; percentage: number }> = {
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

    currentQuestions.forEach((q) => {
      const ans = answers[q.id];
      if (!compStats[q.competency]) {
        compStats[q.competency] = { total: 0, correct: 0, percentage: 0 };
      }
      compStats[q.competency].total += 1;

      if (!ans || (Array.isArray(ans) && ans.length === 0)) {
        unansweredCount += 1;
      } else {
        let isCorrect = false;
        if (q.type === 'pilihan-ganda-kompleks') {
          if (Array.isArray(ans) && Array.isArray(q.correctAnswer)) {
            const sortedAns = [...ans].sort().join(',');
            const sortedKey = [...q.correctAnswer].sort().join(',');
            isCorrect = sortedAns === sortedKey;
          }
        } else {
          isCorrect = ans === q.correctAnswer;
        }

        if (isCorrect) {
          correctCount += 1;
          compStats[q.competency].correct += 1;
        } else {
          incorrectCount += 1;
        }
      }
    });

    Object.keys(compStats).forEach((key) => {
      const c = key as Competency;
      if (compStats[c].total > 0) {
        compStats[c].percentage = Math.round((compStats[c].correct / compStats[c].total) * 100);
      }
    });

    const score = Math.round((correctCount / currentQuestions.length) * 100);

    const session: ExamSession = {
      id: `sim-${Date.now()}`,
      mode: examMode,
      title: `Simulasi TKA Bahasa Indonesia (${modeConfigs[examMode].label})`,
      totalQuestions: currentQuestions.length,
      durationMinutes: initialDurationMinutes,
      startTime,
      endTime: Date.now(),
      elapsedSeconds,
      answers,
      flagged,
      completed: true,
      score,
      correctCount,
      incorrectCount,
      unansweredCount,
      questionIds: currentQuestions.map((q) => q.id),
      competencyScores: compStats
    };

    const updatedProfile = recordExamSession(session);
    onUpdateProfile(updatedProfile);
    onViewResults(session);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // PRE-EXAM SETUP SCREEN
  if (!isTestActive) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            SIMULASI RESMI • BANK SOAL 45+ BUTIR LENGKAP
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulasi TKA Bahasa Indonesia Kelas XII
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Peserta: <strong className="text-indigo-700 font-bold">{profile.name}</strong> ({profile.className} • SMAN 1 Pinrang). Asah kesiapan dan ketahanan berpikir Anda dengan durasi waktu resmi, wacana otentik berbobot HOTS, dan analisis kelemahan mendalam.
          </p>
        </div>

        {/* Mode Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['cepat', 'reguler', 'intensif'] as const).map((mKey) => {
            const cfg = modeConfigs[mKey];
            const isSelected = examMode === mKey;
            return (
              <div
                key={mKey}
                onClick={() => setExamMode(mKey)}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50/50 border-indigo-600 shadow-xs ring-1 ring-indigo-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cfg.badge}
                    </span>
                    <Clock className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">{cfg.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{cfg.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-500">Jumlah Soal:</span>
                    <span className="text-indigo-700 font-bold">{cfg.count} Soal</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-500">Alokasi Waktu:</span>
                    <span className="text-indigo-700 font-bold">{cfg.minutes} Menit</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions & Features */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Fitur Unggulan Simulasi Digital CBT
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 block">⚡ Pintasan Keyboard:</span>
              <p>Gunakan tombol A, B, C, D, E untuk memilih jawaban, tombol F untuk menandai ragu-ragu, dan tombol Panah Kiri/Kanan untuk berpindah soal.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 block">🖍️ Stabilo Digital & Ukuran Teks:</span>
              <p>Anda dapat memperbesar huruf wacana (A / A+) dan mengaktifkan stabilo kuning untuk menandai paragraf penting wacana.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 block">⏱️ Timer & Auto-Submit:</span>
              <p>Waktu berjalan otomatis. Jika waktu habis, jawaban tersimpan dan skor langsung dikalkulasi.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-800 block">📊 Analisis Diagnosis:</span>
              <p>Hasil ujian membedah capaian 9 kompetensi dan memberikan rekomendasi latihan kelemahan.</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => handleStartExam(examMode)}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-white" />
            Mulai Ujian ({modeConfigs[examMode].count} Soal • {modeConfigs[examMode].minutes} Menit)
          </button>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            SMAN 1 Pinrang • Ujian Berjalan Mandiri
          </p>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM WORKSPACE
  const currentQ = currentQuestions[currentIndex];
  const isFlagged = currentQ ? flagged.includes(currentQ.id) : false;
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;
  const answeredCount = Object.keys(answers).filter((k) => {
    const a = answers[k];
    return a && (!Array.isArray(a) || a.length > 0);
  }).length;
  const unansweredCount = currentQuestions.length - answeredCount;
  const isTimeCritical = timeLeftSeconds < 180;

  // Split paragraphs of stimulus for highlighting
  const stimulusParas = currentQ.stimulusText.split('\n\n');
  const highlightedForThisQ = highlightedParas[currentQ.id] || [];

  // Check if stimulus has TEKS 1 and TEKS 2
  const hasMultitext = currentQ.stimulusText.includes('TEKS 1:') && currentQ.stimulusText.includes('TEKS 2:');

  // Filter content if multitext tab is active
  let displayedText = currentQ.stimulusText;
  if (hasMultitext && multitextTab === 'teks1') {
    const parts = currentQ.stimulusText.split('TEKS 2:');
    displayedText = parts[0] || currentQ.stimulusText;
  } else if (hasMultitext && multitextTab === 'teks2') {
    const parts = currentQ.stimulusText.split('TEKS 2:');
    displayedText = parts.length > 1 ? `TEKS 2:\n${parts[1]}` : currentQ.stimulusText;
  }

  return (
    <div className="space-y-4 pb-20 sm:pb-8 animate-fadeIn">
      {/* Top Exam Navigation Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Progress info & mobile palette trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowMobilePalette(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Buka Daftar Nomor"
          >
            <Grid className="w-4 h-4 text-indigo-600" />
            <span>#{currentIndex + 1}</span>
          </button>

          <span className="hidden sm:inline font-extrabold text-slate-900 text-sm">
            Nomor {currentIndex + 1} <span className="text-slate-400 font-normal">/ {currentQuestions.length}</span>
          </span>

          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold">
            {answeredCount} Terjawab
          </span>

          {flagged.length > 0 && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
              <Flag className="w-3 h-3 fill-amber-600 text-amber-600" />
              {flagged.length} Ragu
            </span>
          )}

          <div className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-slate-200 text-xs font-semibold text-slate-600">
            <span className="text-indigo-700 font-bold">{profile.name}</span>
            <span className="text-slate-400">({profile.className})</span>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-extrabold transition-all ${
            isTimeCritical
              ? 'bg-rose-50 text-rose-600 border border-rose-300 animate-pulse'
              : 'bg-slate-100 text-slate-800 border border-slate-200'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        {/* Right: Flag, Short-key badge & Finish Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFlag}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFlagged
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
            }`}
            title="Pintasan keyboard: tekan tombol F"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFlagged ? 'Tersimpan Kuning' : 'Tandai Soal (F)'}</span>
          </button>

          <button
            onClick={() => setShowConfirmFinishModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Selesaikan ujian untuk melihat nilai akhir dan membuka fitur periksa jawaban"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Selesai Ujian</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Reading Stimulus Pane */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          {/* Header Controls for Stimulus */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Wacana Stimulus Soal #{currentIndex + 1}
              </span>
            </div>

            {/* Stimulus Reading Toolbar: Font size, Audio, Highlighter */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
              {/* Font Size Pills */}
              <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'sm' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Ukuran Huruf Kecil"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'md' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Ukuran Huruf Standar"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    fontSize === 'lg' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Ukuran Huruf Besar"
                >
                  A+
                </button>
              </div>

              {/* Highlighter Mode Toggle */}
              <button
                onClick={() => setIsHighlighterActive(!isHighlighterActive)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  isHighlighterActive
                    ? 'bg-amber-400 text-amber-950 font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="Aktifkan Mode Stabilo Kuning (Klik paragraf untuk menyorot)"
              >
                <Highlighter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stabilo</span>
              </button>

              {/* Text-to-Speech Audio */}
              <button
                onClick={() => toggleSpeakText(currentQ.stimulusText)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  isSpeaking ? 'bg-indigo-600 text-white animate-pulse' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title={isSpeaking ? 'Hentikan Audio' : 'Dengarkan Teks Dibacakan'}
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

          {/* Title */}
          <div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              {COMPETENCY_LABELS[currentQ.competency]}
            </span>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {currentQ.stimulusTitle}
            </h3>
          </div>

          {/* Highlighter guide if active */}
          {isHighlighterActive && (
            <div className="p-2 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 text-[11px] flex items-center justify-between">
              <span>🖍️ Mode stabilo aktif: klik paragraf wacana di bawah untuk memberi tanda kuning.</span>
              <button
                onClick={() => setHighlightedParas({ ...highlightedParas, [currentQ.id]: [] })}
                className="font-bold underline text-amber-800 cursor-pointer ml-2"
              >
                Hapus Tanda
              </button>
            </div>
          )}

          {/* Scrollable Stimulus Content with Adjustable Font Size */}
          <div
            className={`text-slate-800 leading-relaxed max-h-[460px] overflow-y-auto pr-2 stimulus-scroll font-serif-reading space-y-3.5 ${
              fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
            }`}
          >
            {displayedText.split('\n\n').map((para, pIdx) => {
              const isParaHighlighted = highlightedForThisQ.includes(pIdx);
              return (
                <p
                  key={pIdx}
                  onClick={() => handleToggleHighlightPara(pIdx)}
                  className={`transition-colors rounded-lg p-1.5 -mx-1.5 ${
                    isHighlighterActive ? 'cursor-pointer hover:bg-amber-100/60' : ''
                  } ${isParaHighlighted ? 'bg-amber-200/80 text-amber-950 font-medium' : ''}`}
                >
                  {para}
                </p>
              );
            })}
          </div>

          {currentQ.stimulusSource && (
            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
              Sumber: {currentQ.stimulusSource}
            </p>
          )}
        </div>

        {/* Right: Stem, Options, and Palette */}
        <div className="lg:col-span-5 space-y-5">
          {/* Question Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {currentQ.type === 'pilihan-ganda-kompleks'
                  ? 'Pilihan Ganda Kompleks (Bisa > 1)'
                  : currentQ.type === 'benar-salah'
                  ? 'Benar / Salah'
                  : 'Pilihan Ganda'}
              </span>
              <span className="text-slate-400 capitalize">{currentQ.difficulty}</span>
            </div>

            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
              {currentQ.question}
            </h4>

            {/* Options List with Keyboard Hints */}
            <div className="space-y-2.5 pt-1">
              {currentQ.options.map((opt) => {
                const isSelected = Array.isArray(currentAnswer)
                  ? currentAnswer.includes(opt.id)
                  : currentAnswer === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-500 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                        isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="leading-snug pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Keyboard Shortcuts Helper */}
            <div className="hidden sm:flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Keyboard className="w-3.5 h-3.5" /> Tekan huruf A-E di keyboard untuk memilih
              </span>
              <span>Panah ⬅ ➡ untuk navigasi</span>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5 flex-wrap">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < currentQuestions.length - 1 && (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setShowConfirmFinishModal(true)}
                  className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                    currentIndex === currentQuestions.length - 1
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                  title="Tekan tombol Selesai untuk mengakhiri pengerjaan dan membuka fitur periksa jawaban"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai & Periksa Jawaban</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette Desktop Grid */}
          <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Lembar Nomor Soal ({currentQuestions.length})
              </span>
              <span className="text-[11px] text-slate-400">Klik untuk lompat</span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1 stimulus-scroll">
              {currentQuestions.map((q, idx) => {
                const ans = answers[q.id];
                const hasAnswer = ans && (!Array.isArray(ans) || ans.length > 0);
                const isItemFlagged = flagged.includes(q.id);
                const isCurrent = idx === currentIndex;

                let paletteColor = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200';

                if (isCurrent) {
                  paletteColor = 'ring-2 ring-indigo-600 font-extrabold';
                }

                if (isItemFlagged) {
                  paletteColor += ' bg-amber-400 text-amber-950 font-bold border-amber-500';
                } else if (hasAnswer) {
                  paletteColor += ' bg-emerald-600 text-white font-bold border-emerald-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${paletteColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Dijawab
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Ragu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Belum
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile for effortless navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-2.5 shadow-md flex items-center justify-between gap-2">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <button
          onClick={() => setShowMobilePalette(true)}
          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold flex items-center gap-1.5"
        >
          <Grid className="w-4 h-4 text-indigo-600" />
          <span>Soal {currentIndex + 1} / {currentQuestions.length}</span>
        </button>

        {currentIndex === currentQuestions.length - 1 ? (
          <button
            onClick={() => setShowConfirmFinishModal(true)}
            className="p-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Selesai</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
            className="p-2.5 px-3 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Palette Drawer Modal */}
      {showMobilePalette && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Pilih Nomor Soal ({currentQuestions.length})</h3>
              <button
                onClick={() => setShowMobilePalette(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1 stimulus-scroll">
              {currentQuestions.map((q, idx) => {
                const ans = answers[q.id];
                const hasAnswer = ans && (!Array.isArray(ans) || ans.length > 0);
                const isItemFlagged = flagged.includes(q.id);
                const isCurrent = idx === currentIndex;

                let paletteColor = 'bg-slate-100 text-slate-700 border-slate-200';

                if (isCurrent) {
                  paletteColor = 'ring-2 ring-indigo-600 font-extrabold';
                }

                if (isItemFlagged) {
                  paletteColor += ' bg-amber-400 text-amber-950 font-bold border-amber-500';
                } else if (hasAnswer) {
                  paletteColor += ' bg-emerald-600 text-white font-bold border-emerald-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMobilePalette(false);
                    }}
                    className={`h-10 rounded-xl border text-xs flex items-center justify-center font-bold transition-all ${paletteColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowMobilePalette(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Tutup Lembar Nomor
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Submit */}
      {showConfirmFinishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-extrabold text-slate-900">
                Selesaikan Ujian & Buka Fitur Periksa Jawaban?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {unansweredCount > 0 ? (
                  <>
                    Anda masih memiliki <span className="font-bold text-rose-600">{unansweredCount} butir soal</span> yang belum dijawab. Setelah menekan tombol Selesai, lembar ujian akan dikunci, Nilai Akhir dihitung, dan <strong>Fitur Periksa Jawaban</strong> akan langsung dibuka.
                  </>
                ) : (
                  'Seluruh soal telah dijawab. Setelah menekan tombol Selesai, Nilai Akhir (jumlah jawaban benar dari total pertanyaan) akan langsung dihitung dan Fitur Periksa Jawaban akan segera dibuka.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmFinishModal(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button
                onClick={() => handleFinishSimulation(false)}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Ya, Selesai & Periksa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
