import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckSquare,
  Timer,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowRight,
  Flame,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  Zap,
  Target,
  User,
  Check,
  Edit3,
  School,
  Smile,
  Layers,
  IdCard,
  Users
} from 'lucide-react';
import { StudentProfile, COMPETENCY_LABELS, CLASS_OPTIONS } from '../types';
import { calculateStudentWeaknesses, recordStudentActivity } from '../services/storage';
import { MODULES_DATA } from '../data/modulesData';

interface DashboardProps {
  profile: StudentProfile;
  onNavigate: (tab: string, extraState?: any) => void;
  onStartAdaptive: (competency?: string) => void;
  onUpdateProfile: (updated: StudentProfile) => void;
  totalQuestionsCount?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  onNavigate,
  onStartAdaptive,
  onUpdateProfile,
  totalQuestionsCount = 70
}) => {
  const weaknesses = calculateStudentWeaknesses(profile);
  const weakestItem = weaknesses.length > 0 ? weaknesses[0] : null;

  const lastExam = profile.examHistory.length > 0 ? profile.examHistory[0] : null;
  const highestScore = profile.examHistory.length > 0
    ? Math.max(...profile.examHistory.map(e => e.score))
    : 0;

  const totalPracticeQuestions = profile.practiceHistory.length;
  const completedModulesCount = profile.completedModuleIds.length;
  const totalModulesCount = MODULES_DATA.length;
  const progressPercent = Math.round((completedModulesCount / totalModulesCount) * 100);

  // Level progression
  const xpCurrentLevel = profile.xp % 200;
  const xpLevelPercent = Math.round((xpCurrentLevel / 200) * 100);

  // State for Name, NIS & Class Input Column
  const [fullNameInput, setFullNameInput] = useState(profile.name);
  const [nisInput, setNisInput] = useState(profile.nis || profile.nisn || '19283');
  const [selectedClass, setSelectedClass] = useState(profile.className || 'XII A');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isEditingExpanded, setIsEditingExpanded] = useState(false);

  // Keep input in sync if profile changes from elsewhere
  useEffect(() => {
    setFullNameInput(profile.name);
    setNisInput(profile.nis || profile.nisn || '19283');
    setSelectedClass(profile.className || 'XII A');
  }, [profile.name, profile.nis, profile.nisn, profile.className]);

  // Handle saving student name, NIS, and class
  const handleSaveStudentName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedName = fullNameInput.trim();
    const trimmedNis = nisInput.trim() || profile.nis || '19283';
    if (!trimmedName) return;

    const updatedProfile: StudentProfile = {
      ...profile,
      name: trimmedName,
      nis: trimmedNis,
      className: selectedClass
    };

    onUpdateProfile(updatedProfile);
    recordStudentActivity({
      studentName: trimmedName,
      nis: trimmedNis,
      className: selectedClass,
      activityType: 'login',
      description: `Siswa memperbarui data identitas & login (NIS: ${trimmedNis}, Kelas: ${selectedClass})`
    });

    setIsSavedFeedback(true);
    setIsEditingExpanded(false);
    setTimeout(() => {
      setIsSavedFeedback(false);
    }, 4000);
  };

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat Pagi';
    if (hour >= 11 && hour < 15) return 'Selamat Siang';
    if (hour >= 15 && hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Kolom input nama siswa */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Greeting Text with Student Name */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs">
                <Smile className="w-3.5 h-3.5 text-yellow-300" />
                {getGreeting()}, {profile.name}!
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-slate-700 text-xs font-semibold border border-indigo-200">
                <School className="w-3 h-3 text-indigo-600" />
                {profile.className} • SMAN 1 Pinrang
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Senang melihat Anda kembali, <span className="text-indigo-700">{profile.name}</span>!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Gunakan kolom di bawah ini untuk memasukkan nama lengkap Anda. Platform akan menyapa Anda secara personal di setiap modul, latihan soal, dan sertifikat hasil simulasi TKA.
            </p>
          </div>

          {/* Quick Toggle if collapsed */}
          {!isEditingExpanded && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditingExpanded(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Ubah Nama & Kelas</span>
              </button>
            </div>
          )}
        </div>

        {/* The Interactive Input Form */}
        <form
          onSubmit={handleSaveStudentName}
          className="mt-4 pt-4 border-t border-indigo-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            {/* Input Nama Lengkap Siswa */}
            <div className="sm:col-span-1 lg:col-span-4 space-y-1.5">
              <label htmlFor="student-full-name" className="block text-xs font-extrabold text-slate-800">
                Nama Lengkap Siswa:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  id="student-full-name"
                  type="text"
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  placeholder="Ketik nama lengkap siswa"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs font-medium transition-all"
                />
              </div>
            </div>

            {/* Input NIS Siswa (Disamping Kolom Input Nama Siswa) */}
            <div className="sm:col-span-1 lg:col-span-3 space-y-1.5">
              <label htmlFor="student-nis" className="block text-xs font-extrabold text-slate-800">
                NIS Siswa (Nomor Induk):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IdCard className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  id="student-nis"
                  type="text"
                  value={nisInput}
                  onChange={(e) => setNisInput(e.target.value)}
                  placeholder="Contoh: 19283"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs font-mono font-medium transition-all"
                />
              </div>
            </div>

            {/* Selector Kelas XII A s/d XII L */}
            <div className="sm:col-span-1 lg:col-span-2 space-y-1.5">
              <label htmlFor="student-class" className="block text-xs font-extrabold text-slate-800">
                Kelas XII:
              </label>
              <select
                id="student-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs font-bold cursor-pointer transition-all"
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Simpan */}
            <div className="sm:col-span-1 lg:col-span-3 flex items-center gap-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 text-white" />
                <span>Simpan Identitas</span>
              </button>
            </div>
          </div>

          {/* Feedback banner */}
          {isSavedFeedback && (
            <div className="mt-3.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Nama Anda berhasil disimpan sebagai <strong>{profile.name}</strong> ({profile.className})! Sapaan di seluruh website telah diperbarui.
              </span>
            </div>
          )}
        </form>
      </div>

      {/* Hero banner selamat datang */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xs border border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 mb-3.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Tahun Ajaran 2025/2026 • SMAN 1 Pinrang • Kelas XII
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Selamat Datang di <span className="text-indigo-400">BAHASA XII</span>, {profile.name}!
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
            Belajar lebih terarah. Berlatih lebih cerdas. Siap menghadapi TKA dengan kemampuan penalaran literasi kritis, analisis wacana autentik, dan penguasaan kaidah kebahasaan yang unggul.
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('materi')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Mulai Belajar
            </button>
            <button
              onClick={() => onNavigate('latihan')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              Latihan Soal ({totalQuestionsCount} Butir)
            </button>
            <button
              onClick={() => onNavigate('simulasi')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              <Timer className="w-4 h-4 text-indigo-400" />
              Simulasi TKA Berbatas Waktu
            </button>
          </div>
        </div>
      </div>

      {/* Progres level & streak */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
            Lv.{profile.level}
          </div>
          <div className="space-y-1 flex-1 min-w-[200px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Progres Level {profile.level}</span>
              <span className="font-bold text-indigo-600">{profile.xp} Total XP</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpLevelPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block">
              {200 - xpCurrentLevel} XP lagi menuju Level {profile.level + 1}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div className="text-left">
              <span className="text-[10px] text-amber-700 font-semibold block">Streak Belajar</span>
              <span className="text-xs font-black text-amber-900">{profile.streakDays} Hari Aktif</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('latihan')}
            className="p-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Tantangan Kilat</span>
          </button>
        </div>
      </div>

      {/* Metrik utama dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Progres Belajar */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Progres Modul</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{progressPercent}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {completedModulesCount} dari {totalModulesCount} modul
          </p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Latihan Selesai */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Latihan Selesai</span>
            <CheckSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalPracticeQuestions}</div>
          <p className="text-[11px] text-slate-500 mt-1">Soal latihan terjawab</p>
          <div className="mt-2 text-[11px] text-emerald-600 font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Terus berlatih
          </div>
        </div>

        {/* Skor Terakhir */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Skor Terakhir</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {lastExam ? lastExam.score : '-'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {lastExam ? `Mode ${lastExam.mode}` : 'Belum ada ujian'}
          </p>
        </div>

        {/* Skor Tertinggi */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Skor Tertinggi</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{highestScore > 0 ? highestScore : '-'}</div>
          <p className="text-[11px] text-slate-500 mt-1">Simulasi latihan</p>
        </div>

        {/* Simulasi TKA */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Simulasi TKA</span>
            <Timer className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{profile.examHistory.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Sesi terselesaikan</p>
        </div>

        {/* Kelemahan Utama */}
        <div className="bg-white p-4.5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold">Perlu Latihan</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 truncate" title={weakestItem ? COMPETENCY_LABELS[weakestItem.competency] : 'Optimal'}>
            {weakestItem ? COMPETENCY_LABELS[weakestItem.competency] : 'Optimal'}
          </div>
          <p className="text-[11px] text-amber-700 mt-1">
            {weakestItem ? `Akurasi: ${weakestItem.accuracy}%` : 'Pertahankan!'}
          </p>
        </div>
      </div>

      {/* Rekomendasi belajar adaptif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
              <BrainCircuit className="w-3.5 h-3.5" />
              Rekomendasi Belajar Adaptif Hari Ini
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {weakestItem
                ? `Tingkatkan Kompetensi: ${COMPETENCY_LABELS[weakestItem.competency]}`
                : 'Pertahankan Performa Literasi Kritis Anda!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {weakestItem ? (
                <>
                  Halo <strong>{profile.name}</strong>, berdasarkan riwayat latihan Anda, akurasi pada{' '}
                  <span className="font-semibold text-slate-800">{COMPETENCY_LABELS[weakestItem.competency]}</span>{' '}
                  masih berada di angka <span className="font-bold text-amber-600">{weakestItem.accuracy}%</span>. Kami menyarankan pendalaman modul terkait serta pengerjaan set soal penguatan terarah.
                </>
              ) : (
                `Luar biasa, ${profile.name}! Hasil latihan Anda sangat merata. Terus tantang diri Anda dengan paket Simulasi TKA atau modul Literasi Multiteks untuk mempertahankan ketajaman daya nalar Anda.`
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            {weakestItem && (
              <button
                onClick={() => onStartAdaptive(weakestItem.competency)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-4 h-4 text-indigo-200" />
                Mulai Latihan Penguatan
              </button>
            )}
            <button
              onClick={() => onNavigate('kesalahan')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              Lihat Analisis Kesalahan
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modul pilihan & tips strategi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modul Pilihan Kelas XII */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Modul Pembelajaran Utama</h3>
              <p className="text-xs text-slate-500">Materi esensial Bahasa Indonesia Kelas XII sesuai karakteristik TKA</p>
            </div>
            <button
              onClick={() => onNavigate('materi')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
            >
              Lihat Semua ({MODULES_DATA.length}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {MODULES_DATA.slice(0, 3).map((mod) => {
              const isCompleted = profile.completedModuleIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => onNavigate('materi', { moduleId: mod.id })}
                  className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {mod.category}
                      </span>
                      <span className="text-xs text-slate-400">• {mod.estimatedMinutes} menit</span>
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {mod.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategi Kilat TKA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tips TKA Hari Ini</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Teknik Membaca Stem Pertanyaan Sebelum Stimulus
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Pada teks panjang, jangan membaca stimulus tanpa arah. Baca kalimat pertanyaan terlebih dahulu untuk memandu pandangan mata Anda mencari kata kunci yang tepat di paragraf.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800">3 Langkah Cepat:</div>
              <div>1. Identifikasi kata kunci batang soal.</div>
              <div>2. Pindai paragraf rujukan secara terarah.</div>
              <div>3. Cermati kalimat di sekitar kata kunci.</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('tips')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-all text-center cursor-pointer"
          >
            Buka Bank Tips & Strategi TKA
          </button>
        </div>
      </div>

      {/* Pintasan fitur utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Data Siswa & Aktivitas */}
        <div
          onClick={() => onNavigate('data-siswa')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
            Data Siswa & Aktivitas
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Lihat data siswa yang login, riwayat aktivitas belajar, dan hasil nilai akhir evaluasi TKA kelas XII A s.d. XII L.
          </p>
        </div>

        <div
          onClick={() => onNavigate('bank-soal')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
            Bank Soal Terkategori ({totalQuestionsCount} Butir)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pilih dan latih butir soal berdasarkan kompetensi, tingkat kesulitan, atau tipe soal pilihan ganda & kompleks.
          </p>
        </div>

        <div
          onClick={() => onNavigate('kesalahan')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
            Analisis Kesalahan Saya
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pelajari kekeliruan bernalar sebelumnya agar tidak mengulang pola salah yang sama di ujian TKA mendatang.
          </p>
        </div>

        <div
          onClick={() => onNavigate('tips')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
            Tips & Strategi TKA
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Kiat membaca cepat stimulus panjang, teknik eliminasi opsi distraktor, dan manajemen waktu ujian.
          </p>
        </div>
      </div>
    </div>
  );
};
