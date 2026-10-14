import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckSquare,
  Timer,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  Lightbulb,
  CheckCircle2,
  Target,
  User,
  Check,
  Edit3,
  School,
  Smile,
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
  const [nisInput, setNisInput] = useState(profile.nis || profile.nisn || '');
  const [selectedClass, setSelectedClass] = useState(profile.className || 'XII A');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isEditingExpanded, setIsEditingExpanded] = useState(false);

  // Keep input in sync if profile changes from elsewhere
  useEffect(() => {
    setFullNameInput(profile.name);
    setNisInput(profile.nis || profile.nisn || '');
    setSelectedClass(profile.className || 'XII A');
  }, [profile.name, profile.nis, profile.nisn, profile.className]);

  // Handle saving student name, NIS, and class
  useEffect(() => {
    if (!isSavedFeedback) return;
    const t = setTimeout(() => setIsSavedFeedback(false), 4000);
    return () => clearTimeout(t);
  }, [isSavedFeedback]);

  const handleSaveStudentName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedName = fullNameInput.trim();
    const trimmedNis = nisInput.trim();
    if (!trimmedName || !trimmedNis) return;

    const identityChanged =
      trimmedName !== profile.name ||
      trimmedNis !== profile.nis ||
      selectedClass !== profile.className;

    const updatedProfile: StudentProfile = {
      ...profile,
      name: trimmedName,
      nis: trimmedNis,
      className: selectedClass
    };

    onUpdateProfile(updatedProfile);

    if (identityChanged) {
      recordStudentActivity({
        studentName: trimmedName,
        nis: trimmedNis,
        className: selectedClass,
        activityType: 'login',
        description: `Siswa memperbarui data identitas & login (NIS: ${trimmedNis}, Kelas: ${selectedClass})`
      });
    }

    setIsSavedFeedback(true);
    setIsEditingExpanded(false);
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
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Greeting Text with Student Name */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-bold shadow-xs">
                <Smile className="w-3.5 h-3.5 text-amber-300" />
                {getGreeting()}, {profile.name}!
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-stone-700 text-xs font-semibold border border-teal-200">
                <School className="w-3 h-3 text-teal-600" />
                {profile.className} • SMAN 1 Pinrang
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Senang melihat Anda kembali, <span className="text-teal-700">{profile.name}</span>!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              Gunakan kolom di bawah ini untuk memasukkan nama lengkap Anda. Platform akan menyapa Anda secara personal di setiap modul, latihan soal, dan sertifikat hasil simulasi TKA.
            </p>
          </div>

          {/* Quick Toggle if collapsed */}
          {!isEditingExpanded && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditingExpanded(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-teal-600" />
                <span>Ubah Nama & Kelas</span>
              </button>
            </div>
          )}
        </div>

        {/* The Interactive Input Form */}
        <form
          onSubmit={handleSaveStudentName}
          className="mt-4 pt-4 border-t border-teal-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            {/* Input Nama Lengkap Siswa */}
            <div className="sm:col-span-1 lg:col-span-4 space-y-1.5">
              <label htmlFor="student-full-name" className="block text-xs font-extrabold text-stone-900">
                Nama Lengkap Siswa:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4 text-teal-600" />
                </div>
                <input
                  id="student-full-name"
                  type="text"
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  placeholder="Ketik nama lengkap siswa"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs font-medium transition-all"
                />
              </div>
            </div>

            {/* Input NIS Siswa (Disamping Kolom Input Nama Siswa) */}
            <div className="sm:col-span-1 lg:col-span-3 space-y-1.5">
              <label htmlFor="student-nis" className="block text-xs font-extrabold text-stone-900">
                NIS Siswa (Nomor Induk):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <IdCard className="w-4 h-4 text-teal-600" />
                </div>
                <input
                  id="student-nis"
                  type="text"
                  value={nisInput}
                  onChange={(e) => setNisInput(e.target.value)}
                  placeholder="Isi NIS siswa"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs font-mono font-medium transition-all"
                />
              </div>
            </div>

            {/* Selector Kelas XII A s/d XII L */}
            <div className="sm:col-span-1 lg:col-span-2 space-y-1.5">
              <label htmlFor="student-class" className="block text-xs font-extrabold text-stone-900">
                Kelas XII:
              </label>
              <select
                id="student-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs font-bold cursor-pointer transition-all"
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
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
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
      <div className="rounded-2xl bg-stone-900 text-white p-6 sm:p-8 shadow-xs border border-stone-900">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-xs font-semibold text-stone-300 mb-3.5">
            Tahun Ajaran 2025/2026 • SMAN 1 Pinrang • Kelas XII
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Selamat Datang di <span className="text-teal-400">BAHASA XII</span>, {profile.name}!
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-stone-300 font-normal leading-relaxed max-w-2xl">
            Belajar dengan arah yang jelas, berlatih dengan soal yang menantang, dan siapkan diri menghadapi TKA melalui analisis wacana dan penguasaan kaidah kebahasaan.
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('materi')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs sm:text-sm hover:bg-stone-100 transition-all shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              Buka Materi
            </button>
            <button
              onClick={() => onNavigate('latihan')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              Latihan Soal ({totalQuestionsCount} Butir)
            </button>
            <button
              onClick={() => onNavigate('simulasi')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              <Timer className="w-4 h-4 text-teal-400" />
              Simulasi TKA Berbatas Waktu
            </button>
          </div>
        </div>
      </div>

      {/* Progres level & streak */}
      <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
            Lv.{profile.level}
          </div>
          <div className="space-y-1 flex-1 min-w-[200px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Progres Level {profile.level}</span>
              <span className="font-bold text-teal-600">{profile.xp} Total XP</span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpLevelPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-500 block">
              {200 - xpCurrentLevel} XP lagi menuju Level {profile.level + 1}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 px-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-amber-600" />
            <div className="text-left">
              <span className="text-[10px] text-amber-700 font-semibold block">Streak Belajar</span>
              <span className="text-xs font-black text-amber-900">{profile.streakDays} Hari Aktif</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('latihan')}
            className="p-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl border border-teal-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Latihan Cepat</span>
          </button>
        </div>
      </div>

      {/* Metrik utama dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Progres Belajar */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Progres Modul</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-stone-900">{progressPercent}%</div>
          <p className="text-[11px] text-stone-500 mt-1">
            {completedModulesCount} dari {totalModulesCount} modul
          </p>
          <div className="mt-2 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Latihan Selesai */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Latihan Selesai</span>
            <CheckSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-stone-900">{totalPracticeQuestions}</div>
          <p className="text-[11px] text-stone-500 mt-1">Soal latihan terjawab</p>
          <div className="mt-2 text-[11px] text-emerald-600 font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Terus berlatih
          </div>
        </div>

        {/* Skor Terakhir */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Skor Terakhir</span>
            <TrendingUp className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-extrabold text-stone-900">
            {lastExam ? lastExam.score : '-'}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {lastExam ? `Mode ${lastExam.mode}` : 'Belum ada ujian'}
          </p>
        </div>

        {/* Skor Tertinggi */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Skor Tertinggi</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{highestScore > 0 ? highestScore : '-'}</div>
          <p className="text-[11px] text-stone-500 mt-1">Simulasi latihan</p>
        </div>

        {/* Simulasi TKA */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Simulasi TKA</span>
            <Timer className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-stone-900">{profile.examHistory.length}</div>
          <p className="text-[11px] text-stone-500 mt-1">Sesi terselesaikan</p>
        </div>

        {/* Kelemahan Utama */}
        <div className="bg-white p-4.5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold">Perlu Latihan</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-sm font-bold text-stone-900 truncate" title={weakestItem ? COMPETENCY_LABELS[weakestItem.competency] : 'Optimal'}>
            {weakestItem ? COMPETENCY_LABELS[weakestItem.competency] : 'Optimal'}
          </div>
          <p className="text-[11px] text-amber-700 mt-1">
            {weakestItem ? `Akurasi: ${weakestItem.accuracy}%` : 'Pertahankan!'}
          </p>
        </div>
      </div>

      {/* Rekomendasi belajar adaptif */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Rekomendasi Belajar Adaptif Hari Ini
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {weakestItem
                ? `Tingkatkan Kompetensi: ${COMPETENCY_LABELS[weakestItem.competency]}`
                : 'Pertahankan Performa Literasi Kritis Anda!'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {weakestItem ? (
                <>
                  Halo <strong>{profile.name}</strong>, berdasarkan riwayat latihan Anda, akurasi pada{' '}
                  <span className="font-semibold text-stone-900">{COMPETENCY_LABELS[weakestItem.competency]}</span>{' '}
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Target className="w-4 h-4 text-teal-200" />
                Mulai Latihan Penguatan
              </button>
            )}
            <button
              onClick={() => onNavigate('kesalahan')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              Lihat Analisis Kesalahan
            </button>
          </div>
        </div>
      </div>

      {/* Modul pilihan & tips strategi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modul Pilihan Kelas XII */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Modul Pembelajaran Utama</h3>
              <p className="text-xs text-stone-500">Materi esensial Bahasa Indonesia Kelas XII sesuai karakteristik TKA</p>
            </div>
            <button
              onClick={() => onNavigate('materi')}
              className="text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
            >
              Lihat Semua ({MODULES_DATA.length})
            </button>
          </div>

          <div className="space-y-3">
            {MODULES_DATA.slice(0, 3).map((mod) => {
              const isCompleted = profile.completedModuleIds.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onNavigate('materi', { moduleId: mod.id })}
                  className="group w-full text-left p-4 rounded-xl border border-stone-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                        {mod.category}
                      </span>
                      <span className="text-xs text-stone-500">• {mod.estimatedMinutes} menit</span>
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-teal-600 transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {mod.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-stone-500 transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Strategi Kilat TKA */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tips TKA Hari Ini</span>
            </div>
            <h4 className="font-bold text-stone-900 text-sm mb-2">
              Teknik Membaca Stem Pertanyaan Sebelum Stimulus
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Pada teks panjang, jangan membaca stimulus tanpa arah. Baca kalimat pertanyaan terlebih dahulu untuk memandu pandangan mata Anda mencari kata kunci yang tepat di paragraf.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
              <div className="font-semibold text-stone-900">Langkah cepat:</div>
              <div>1. Identifikasi kata kunci batang soal.</div>
              <div>2. Pindai paragraf rujukan secara terarah.</div>
              <div>3. Cermati kalimat di sekitar kata kunci.</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('tips')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-teal-50 hover:text-teal-700 text-stone-700 text-xs font-bold transition-all text-center cursor-pointer"
          >
            Buka Bank Tips & Strategi TKA
          </button>
        </div>
      </div>

      {/* Pintasan fitur utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Data Siswa & Aktivitas */}
        <button
          type="button"
          onClick={() => onNavigate('data-siswa')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group space-y-2 text-left w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-teal-700 transition-colors">
            Data Siswa & Aktivitas
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Lihat data siswa yang login, riwayat aktivitas belajar, dan hasil nilai akhir evaluasi TKA kelas XII A s.d. XII L.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('bank-soal')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group space-y-2 text-left w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-teal-700 transition-colors">
            Bank Soal Terkategori ({totalQuestionsCount} Butir)
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Pilih dan latih butir soal berdasarkan kompetensi, tingkat kesulitan, atau tipe soal pilihan ganda & kompleks.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('kesalahan')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer group space-y-2 text-left w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">
            Analisis Kesalahan Saya
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Pelajari kekeliruan bernalar sebelumnya agar tidak mengulang pola salah yang sama di ujian TKA mendatang.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tips')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group space-y-2 text-left w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">
            Tips & Strategi TKA
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Kiat membaca cepat stimulus panjang, teknik eliminasi opsi distraktor, dan manajemen waktu ujian.
          </p>
        </button>
      </div>
    </div>
  );
};
