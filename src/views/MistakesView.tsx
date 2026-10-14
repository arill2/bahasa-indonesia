import React from 'react';
import {
  AlertCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  Target
} from 'lucide-react';
import { StudentProfile, Question, COMPETENCY_LABELS, Competency } from '../types';
import { calculateStudentWeaknesses } from '../services/storage';

interface MistakesViewProps {
  profile: StudentProfile;
  allQuestions: Question[];
  onStartAdaptive: (competency?: string, questionIds?: string[]) => void;
  onNavigateToModule: (moduleId?: string) => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  profile,
  allQuestions,
  onStartAdaptive,
  onNavigateToModule
}) => {
  const weaknesses = calculateStudentWeaknesses(profile);

  // Collect unique question IDs answered incorrectly, from practice and exams
  const wrongPractice = profile.practiceHistory.filter((h) => !h.isCorrect);

  const wrongExamIds = profile.examHistory.flatMap((ex) =>
    ex.questionIds.filter((qid) => {
      const q = allQuestions.find((qq) => qq.id === qid);
      if (!q) return false;
      const ans = ex.answers[qid];
      const isAnswered = ans && (!Array.isArray(ans) || ans.length > 0);
      if (!isAnswered) return false;
      if (q.type === 'pilihan-ganda-kompleks') {
        return !(
          Array.isArray(ans) &&
          Array.isArray(q.correctAnswer) &&
          [...ans].sort().join(',') === [...q.correctAnswer].sort().join(',')
        );
      }
      return ans !== q.correctAnswer;
    })
  );

  const wrongQuestionIds = Array.from(new Set([...wrongPractice.map((h) => h.questionId), ...wrongExamIds]));

  const wrongQuestions = wrongQuestionIds
    .map((id) => allQuestions.find((q) => q.id === id))
    .filter((q): q is Question => q !== undefined);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
          <AlertCircle className="w-3.5 h-3.5" />
          Belajar dari Kesalahan
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Analisis Diagnosis Kelemahan Siswa
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Sistem mencatat secara objektif pola kesalahan penalaran Anda. Jadikan kekeliruan sebagai batu loncatan untuk mempertajam keterampilan literasi dan evaluasi teks TKA.
        </p>
      </div>

      {/* Weak Competencies Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-stone-900 text-base sm:text-lg flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-amber-500" />
          Kompetensi yang Membutuhkan Penguatan
        </h3>

        {weaknesses.length === 0 ? (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-950 text-base">Belum Ada Pola Kelemahan Signifikan</h4>
            <p className="text-xs text-emerald-800">
              Pertahankan performa belajar Anda atau ikuti lebih banyak simulasi untuk memetakan kemampuan secara komprehensif.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weaknesses.slice(0, 3).map((w, idx) => {
              const label = COMPETENCY_LABELS[w.competency] || w.competency;
              return (
                <div
                  key={w.competency}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        Prioritas {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-amber-600">
                        Akurasi: {w.accuracy}%
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm">{label}</h4>

                    <p className="text-xs text-stone-500 leading-relaxed">
                      Anda telah mencoba {w.total} butir soal pada kompetensi ini dengan {w.incorrect} kali kekeliruan nalar.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        const wrongIds = Array.from(new Set(
                          profile.practiceHistory.filter((h) => !h.isCorrect && wrongQuestions.some((wq) => wq.competency === w.competency)).map((h) => h.questionId)
                        ));
                        onStartAdaptive(w.competency, wrongIds.length > 0 ? wrongIds : undefined);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5 text-teal-200" />
                      Latihan Terarah (5 Soal)
                    </button>
                    <button
                      onClick={() => onNavigateToModule()}
                      className="w-full py-2 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                      Buka Semua Modul
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* List of Previously Wrong Questions with Re-Try option */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-stone-900 text-base">
              Bank Soal Riwayat Keliru ({wrongQuestions.length})
            </h3>
            <p className="text-xs text-stone-500">
              Daftar butir soal yang pernah Anda jawab belum tepat dalam sesi latihan.
            </p>
          </div>
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => {
                const revIds = wrongQuestionIds;
                onStartAdaptive(undefined, revIds);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Kerjakan Ulang Semua
            </button>
          )}
        </div>

        {wrongQuestions.length === 0 ? (
          <p className="text-xs text-stone-500 py-4 text-center">
            Belum ada soal yang keliru dalam sesi latihan mandiri Anda saat ini.
          </p>
        ) : (
          <div className="space-y-3">
            {wrongQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-stone-200 hover:border-teal-300 bg-stone-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{q.stimulusTitle}</span>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {COMPETENCY_LABELS[q.competency]}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-1">{q.question}</p>
                </div>

                <button
                  onClick={() => onStartAdaptive(q.competency, [q.id])}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 hover:bg-teal-50 hover:text-teal-700 text-stone-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Coba Ulang
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
