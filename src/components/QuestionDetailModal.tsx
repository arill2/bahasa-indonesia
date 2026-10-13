import React, { useEffect } from 'react';
import { X, CheckCircle2, BotMessageSquare } from 'lucide-react';
import { Question, COMPETENCY_LABELS } from '../types';

interface QuestionDetailModalProps {
  question: Question | null;
  onClose: () => void;
  onOpenAITutorWithContext: (question: string, stimulus: string) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
  onOpenAITutorWithContext
}) => {
  useEffect(() => {
    if (!question) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [question, onClose]);

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {COMPETENCY_LABELS[question.competency]}
            </span>
            <span className="text-xs font-semibold capitalize bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {question.difficulty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stimulus */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">{question.stimulusTitle}</h3>
          <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-700 font-serif-reading leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto stimulus-scroll">
            {question.stimulusText}
          </div>
          {question.stimulusSource && (
            <p className="text-[11px] text-slate-400 italic">Sumber: {question.stimulusSource}</p>
          )}
        </div>

        {/* Stem */}
        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
          {question.question}
        </h4>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isKey = Array.isArray(question.correctAnswer)
              ? question.correctAnswer.includes(opt.id)
              : question.correctAnswer === opt.id;

            return (
              <div
                key={opt.id}
                className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                  isKey
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-black/10 font-bold flex items-center justify-center shrink-0 text-xs">
                  {opt.id}
                </span>
                <div className="flex-1 leading-snug">
                  {opt.text}
                  {isKey && (
                    <span className="ml-2 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Kunci Jawaban
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-800 space-y-1">
          <span className="font-bold text-indigo-900 block">Pembahasan Lengkap:</span>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAITutorWithContext(question.question, question.stimulusText);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            <BotMessageSquare className="w-4 h-4" />
            Diskusikan Soal dengan AI Tutor
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
