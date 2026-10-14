import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Question, COMPETENCY_LABELS } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface QuestionDetailModalProps {
  question: Question | null;
  onClose: () => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose
}) => {
  useEffect(() => {
    if (!question) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [question, onClose]);

  const trapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!question) return;
    const dialog = trapRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    (focusables[0] ?? dialog).focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      previouslyFocused?.focus();
    };
  }, [question]);

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Detail soal dan kunci jawaban"
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[88dvh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp border border-stone-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
              {COMPETENCY_LABELS[question.competency]}
            </span>
            <span className="text-xs font-semibold capitalize bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
              {question.difficulty}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stimulus */}
        <div className="space-y-2">
          <h3 className="font-bold text-stone-900 text-base">{question.stimulusTitle}</h3>
          <div className="p-4 bg-stone-50 rounded-xl text-xs sm:text-sm text-stone-700 font-serif-reading leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto stimulus-scroll">
            {question.stimulusText}
          </div>
          {question.stimulusSource && (
            <p className="text-[11px] text-stone-500 italic">Sumber: {question.stimulusSource}</p>
          )}
        </div>

        {/* Stem */}
        <h4 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
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
                    : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-black/10 font-bold flex items-center justify-center shrink-0 text-xs">
                  {opt.id}
                </span>
                <div className="flex-1 leading-snug">
                  {opt.text}
                  {isKey && (
                    <span className="ml-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Kunci Jawaban
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-stone-900 space-y-1">
          <span className="font-bold text-teal-900 block">Pembahasan Lengkap:</span>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>

{/* Footer Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
