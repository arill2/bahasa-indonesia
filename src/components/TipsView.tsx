import React, { useState } from 'react';
import {
  Lightbulb,
  BookOpen,
  ShieldAlert,
  Clock,
  CheckCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { TKA_STRATEGY_TIPS, TkaStrategyTip } from '../data/tipsData';

export const TipsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Membaca Stimulus',
    'Teknik Menjawab',
    'Evaluasi Nalar',
    'Manajemen Waktu'
  ];

  const filtered =
    selectedCategory === 'Semua'
      ? TKA_STRATEGY_TIPS
      : TKA_STRATEGY_TIPS.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          PANDUAN TAKTIK & STRATEGI TKA
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Strategi Menaklukkan Asesmen Bahasa Indonesia
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Kiat praktis membaca stimulus panjang, mendeteksi opsi jebakan, dan mengelola waktu secara terukur agar performa ujian Anda maksimal.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {filtered.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5 hover:border-indigo-300 transition-all"
          >
            {/* Meta */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                {tip.category}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                {tip.badge}
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {tip.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {tip.summary}
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Langkah Eksekusi:
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5">
                {tip.steps.map((st, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-snug">{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Study Example */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Studi Kasus Soal:</span>
              <div className="italic text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed font-serif-reading">
                "{tip.exampleCase.questionContext}"
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 bg-rose-50 text-rose-900 rounded-lg border border-rose-200">
                  <span className="font-bold block">Jebakan Umum:</span>
                  {tip.exampleCase.trap}
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200">
                  <span className="font-bold block">Solusi Cerdas:</span>
                  {tip.exampleCase.smartSolution}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
