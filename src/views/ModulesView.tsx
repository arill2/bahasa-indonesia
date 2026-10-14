import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Check,
  X,
  Target,
  FileText
} from 'lucide-react';
import { LearningModule, StudentProfile } from '../types';
import { MODULES_DATA } from '../data/modulesData';
import { addXpAndActivity } from '../services/storage';

interface ModulesViewProps {
  initialModuleId?: string;
  profile: StudentProfile;
  onUpdateProfile: (p: StudentProfile) => void;
  onStartPracticeByCompetency: (competencies: string[]) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  initialModuleId,
  profile,
  onUpdateProfile,
  onStartPracticeByCompetency
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || MODULES_DATA[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const categories = ['Semua', ...Array.from(new Set(MODULES_DATA.map((m) => m.category)))];

  const currentModule =
    MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];

  const isCompleted = profile.completedModuleIds.includes(currentModule.id);

  const handleSelectQuizOption = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleMarkCompleted = () => {
    const updated = addXpAndActivity(50, currentModule.id);
    onUpdateProfile(updated);
  };

  const filteredModules =
    selectedCategory === 'Semua'
      ? MODULES_DATA
      : MODULES_DATA.filter((m) => m.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Category Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            Modul Pembelajaran Bahasa Indonesia Kelas XII
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Materi esensial penalaran wacana, struktur kebahasaan, dan telaah kritis sesuai karakteristik TKA.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Module List Sidebar + Active Module Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Module Sidebar List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-stone-500 block px-1">
            Daftar Modul ({filteredModules.length})
          </span>
          {filteredModules.map((mod) => {
            const active = mod.id === selectedModuleId;
            const completed = profile.completedModuleIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-teal-50/80 border-teal-400 shadow-xs ring-1 ring-teal-300'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 mb-1">
                  <span className="text-teal-600 font-bold">{mod.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{mod.estimatedMinutes} m</span>
                  </div>
                </div>
                <h4 className={`text-sm font-bold ${active ? 'text-teal-900' : 'text-stone-900'}`}>
                  {mod.title}
                </h4>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px] truncate max-w-[180px]">
                    {mod.subtitle}
                  </span>
                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-500 font-medium">Belum selesai</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Reader */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Module Title & Meta */}
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                {currentModule.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Estimasi: {currentModule.estimatedMinutes} Menit
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Modul Dikuasai
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              {currentModule.title}
            </h1>
            <p className="text-sm text-stone-600 mt-1 font-medium leading-relaxed">
              {currentModule.subtitle}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-teal-600" />
              Tujuan Pembelajaran
            </h3>
            <ul className="text-xs text-stone-600 space-y-1.5">
              {currentModule.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {currentModule.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-1.5">
                  {sec.heading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {sec.body}
                </p>

                {sec.keyPoints && (
                  <div className="p-3.5 bg-teal-50/50 rounded-xl border border-teal-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-teal-800 block">
                      Poin Kunci Asesmen:
                    </span>
                    <ul className="text-xs text-stone-700 space-y-1">
                      {sec.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.example && (
                  <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span>{sec.example.title}</span>
                    </div>
                    <blockquote className="text-xs italic text-stone-900 bg-white/80 p-3 rounded-lg border border-amber-100 leading-relaxed font-serif-reading">
                      "{sec.example.text}"
                    </blockquote>
                    <div className="text-xs text-stone-700 pt-1">
                      <span className="font-semibold text-stone-900">Analisis Kritis: </span>
                      {sec.example.analysis}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="p-4.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Ringkasan Materi
            </h4>
            <ul className="text-xs text-emerald-950 space-y-1.5">
              {currentModule.summary.map((sum, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{sum}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive "Cek Pemahaman" */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-4 border border-stone-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-400" />
                <h4 className="font-bold text-sm sm:text-base">Cek Pemahaman Anda</h4>
              </div>
            </div>

            {currentModule.checkUnderstanding.map((cu, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isCorrect = selectedOpt === cu.correctIndex;
              return (
                <div key={qIdx} className="space-y-3 pt-2">
                  <p className="text-xs sm:text-sm text-stone-100 leading-relaxed">
                    {cu.question}
                  </p>
                  <div className="space-y-2">
                    {cu.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      let btnStyle = 'bg-white/10 hover:bg-white/15 text-stone-100 border-white/15';

                      if (quizSubmitted) {
                        if (oIdx === cu.correctIndex) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-500 line-through';
                        } else {
                          btnStyle = 'opacity-40 bg-white/5 text-stone-300 border-transparent';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-teal-600 text-white border-teal-500 font-semibold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center shrink-0 text-[11px] font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed mt-2 ${
                        isCorrect
                          ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
                      }`}
                    >
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Jawaban Benar! Mari perhatikan alasannya:</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-rose-400" />
                            <span>Belum tepat. Cermati pembahasan berikut:</span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-200">{cu.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                onClick={handleCheckQuiz}
                disabled={Object.keys(quizAnswers).length === 0}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
                className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Coba Ulang Kuis
              </button>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleMarkCompleted}
              disabled={isCompleted}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md cursor-pointer'
              }`}
            >
              <Check className="w-4 h-4" />
              {isCompleted ? 'Modul Telah Diselesaikan' : 'Tandai Selesai (+50 XP)'}
            </button>

            <button
              onClick={() => onStartPracticeByCompetency(currentModule.relatedCompetencies)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-teal-50 hover:text-teal-700 text-stone-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-teal-600" />
              Latihan Soal Terkait Modul Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
