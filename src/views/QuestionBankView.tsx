import React, { useState } from 'react';
import {
  Search,
  Filter,
  Database,
  PlayCircle,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Layers,
  ArrowRight,
  X,
  Target
} from 'lucide-react';
import { Question, Competency, COMPETENCY_LABELS } from '../types';

interface QuestionBankViewProps {
  questions: Question[];
  onStartPracticeWithQuestions: (questions: Question[]) => void;
  onOpenQuestionDetail: (q: Question) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onStartPracticeWithQuestions,
  onOpenQuestionDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComp, setSelectedComp] = useState<string>('semua');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('semua');
  const [selectedType, setSelectedType] = useState<string>('semua');

  const filtered = questions.filter((q) => {
    const matchSearch =
      searchQuery === '' ||
      q.stimulusTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.stimulusText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchComp = selectedComp === 'semua' || q.competency === selectedComp;
    const matchDiff = selectedDifficulty === 'semua' || q.difficulty === selectedDifficulty;
    const matchType = selectedType === 'semua' || q.type === selectedType;

    return matchSearch && matchComp && matchDiff && matchType;
  });

  const typeCounts = {
    semua: questions.length,
    'pilihan-ganda': questions.filter((q) => q.type === 'pilihan-ganda').length,
    'pilihan-ganda-kompleks': questions.filter((q) => q.type === 'pilihan-ganda-kompleks').length,
    'benar-salah': questions.filter((q) => q.type === 'benar-salah').length
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Bank Soal Bahasa Indonesia Kelas XII
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Tersedia {questions.length} butir soal terstandarisasi dengan stimulus beraneka genre, format pilihan ganda biasa, kompleks, dan benar/salah.
            </p>
          </div>

          <button
            onClick={() => onStartPracticeWithQuestions(filtered)}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
          >
            <PlayCircle className="w-4 h-4" />
            Latihan Hasil Filter ({filtered.length} Soal)
          </button>
        </div>

        {/* Quick Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-stone-100">
          {[
            { id: 'semua', label: 'Semua Bentuk' },
            { id: 'pilihan-ganda', label: 'Pilihan Ganda' },
            { id: 'pilihan-ganda-kompleks', label: 'Pilihan Ganda Kompleks' },
            { id: 'benar-salah', label: 'Benar / Salah' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === t.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedType === t.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {typeCounts[t.id as keyof typeof typeCounts] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar & Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari berdasarkan kata kunci, judul wacana, atau stimulus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-2.5 p-1 min-h-7 min-w-7 inline-flex items-center justify-center text-stone-500 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Competency Dropdown */}
          <div className="sm:col-span-4">
            <select
              value={selectedComp}
              onChange={(e) => setSelectedComp(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 focus:ring-1 focus:ring-teal-500 truncate"
            >
              <option value="semua">Semua Kompetensi ({questions.length})</option>
              {Object.entries(COMPETENCY_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="sm:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 focus:ring-1 focus:ring-teal-500 capitalize"
            >
              <option value="semua">Semua Kesulitan</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 px-1">
          <span>
            Menampilkan <strong className="text-stone-900">{filtered.length}</strong> butir soal terkurasi
          </span>
          <span className="text-stone-500">SMAN 1 Pinrang</span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <p className="text-sm text-stone-500">Tidak ada butir soal yang sesuai kriteria pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedComp('semua');
                setSelectedDifficulty('semua');
                setSelectedType('semua');
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          filtered.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-teal-300 transition-all shadow-2xs space-y-3.5 group"
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-teal-600 transition-colors">
                    {q.stimulusTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-700">
                    {COMPETENCY_LABELS[q.competency]}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold capitalize ${
                      q.difficulty === 'mudah'
                        ? 'bg-emerald-50 text-emerald-700'
                        : q.difficulty === 'sedang'
                        ? 'bg-stone-100 text-stone-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-600">
                    {q.type.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Stem Pertanyaan */}
              <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                {q.question}
              </p>

              {/* Stimulus Snippet */}
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 line-clamp-2 font-serif-reading leading-relaxed">
                {q.stimulusText}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100 flex-wrap gap-2">
                <span className="text-stone-500 text-[11px]">
                  Subkompetensi: <strong className="text-stone-600">{q.subCompetency}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartPracticeWithQuestions([q])}
                    className="px-3 py-2 min-h-11 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Latih Soal Ini</span>
                  </button>
                  <button
                    onClick={() => onOpenQuestionDetail(q)}
                    className="px-3 py-2 min-h-11 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Detail & Kunci</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
