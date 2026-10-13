import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Layers
} from 'lucide-react';
import { Question, Competency, COMPETENCY_LABELS, StudentProfile } from '../types';
import { recordPracticeAnswer } from '../services/storage';

interface AdaptivePracticeViewProps {
  targetCompetency?: string;
  allQuestions: Question[];
  profile: StudentProfile;
  onUpdateProfile: (p: StudentProfile) => void;
  onBackToDashboard: () => void;
}

export const AdaptivePracticeView: React.FC<AdaptivePracticeViewProps> = ({
  targetCompetency,
  allQuestions,
  profile,
  onUpdateProfile,
  onBackToDashboard
}) => {
  // Select and shuffle matching questions for adaptive practice
  const questionsToDrill = React.useMemo(() => {
    const pool = allQuestions.filter(
      (q) => !targetCompetency || q.competency === targetCompetency
    );
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [allQuestions, targetCompetency]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<{ isCorrect: boolean; qId: string }[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);

  const currentQ = questionsToDrill[currentIndex];

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
      return [...selectedAnswer].sort().join(',') === [...currentQ.correctAnswer].sort().join(',');
    }
    return selectedAnswer === currentQ.correctAnswer;
  };

  const handleSubmit = () => {
    if (!currentQ || !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) return;

    const correct = checkIsCorrect();
    setIsAnswerSubmitted(true);
    const updatedHistory = [...sessionResults, { isCorrect: correct, qId: currentQ.id }];
    setSessionResults(updatedHistory);

    const updated = recordPracticeAnswer(currentQ.id, selectedAnswer, correct, currentQ.competency);
    onUpdateProfile(updated);
  };

  const handleNext = () => {
    if (currentIndex < questionsToDrill.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setIsAnswerSubmitted(false);
    } else {
      setIsSessionComplete(true);
    }
  };

  if (questionsToDrill.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
        <p className="text-sm text-slate-500">Tidak ada soal yang tersedia untuk target kompetensi ini.</p>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Session summary
  if (isSessionComplete) {
    const correctCount = sessionResults.filter((r) => r.isCorrect).length;
    const accuracy = Math.round((correctCount / questionsToDrill.length) * 100);

    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 animate-scaleUp">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-md">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            SESI ADAPTIF SELESAI
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Penguatan Kompetensi Tuntas!
          </h2>
          <p className="text-xs text-slate-500">
            {targetCompetency ? COMPETENCY_LABELS[targetCompetency as Competency] : 'Latihan Mandiri'}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-around">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Benar</span>
            <span className="text-2xl font-bold text-emerald-600">
              {correctCount} / {questionsToDrill.length}
            </span>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Akurasi</span>
            <span className="text-2xl font-bold text-indigo-600">{accuracy}%</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {accuracy >= 80
            ? 'Luar biasa! Pemahaman nalar Anda pada materi ini telah meningkat secara signifikan.'
            : 'Perkembangan yang bagus! Terus asah kecermatan membaca wacana dengan latihan rutin.'}
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer('');
              setIsAnswerSubmitted(false);
              setSessionResults([]);
              setIsSessionComplete(false);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Latih Ulang
          </button>
          <button
            onClick={onBackToDashboard}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = checkIsCorrect();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">Latihan Adaptif Cerdas</div>
            <h3 className="font-extrabold text-sm sm:text-base">
              {targetCompetency ? COMPETENCY_LABELS[targetCompetency as Competency] : 'Penguatan Penalaran'}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
            Soal {currentIndex + 1} / {questionsToDrill.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questionsToDrill.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Stimulus */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
            Stimulus: {currentQ.stimulusTitle}
          </span>
          <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed font-serif-reading max-h-48 overflow-y-auto stimulus-scroll">
            {currentQ.stimulusText}
          </div>
        </div>

        {/* Stem */}
        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = Array.isArray(selectedAnswer)
              ? selectedAnswer.includes(opt.id)
              : selectedAnswer === opt.id;

            const isKey = Array.isArray(currentQ.correctAnswer)
              ? currentQ.correctAnswer.includes(opt.id)
              : currentQ.correctAnswer === opt.id;

            let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (isAnswerSubmitted) {
              if (isKey) {
                style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
              } else if (isSelected && !isKey) {
                style = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                style = 'opacity-40 bg-slate-50 border-slate-200';
              }
            } else if (isSelected) {
              style = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
              >
                <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center shrink-0 font-bold text-xs">
                  {opt.id}
                </span>
                <span className="leading-snug pt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            Verifikasi Jawaban
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            <div
              className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                isCorrect
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border border-rose-300 text-rose-900'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tepat sekali! Pembahasan:</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Belum tepat. Cermati penjelasannya:</span>
                  </>
                )}
              </div>
              <p className="text-slate-800">{currentQ.explanation}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>{currentIndex < questionsToDrill.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
