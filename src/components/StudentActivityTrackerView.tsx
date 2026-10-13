import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Calendar,
  FileDown,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  School,
  IdCard,
  UserCheck,
  Flame,
  BarChart3
} from 'lucide-react';
import { ClassStudentData, StudentActivityLog, StudentProfile, CLASS_OPTIONS, COMPETENCY_LABELS } from '../types';
import { getStoredStudents, getStudentActivityLogs } from '../services/storage';
import { generateExamReportPDF } from '../services/pdfGenerator';

interface StudentActivityTrackerViewProps {
  currentProfile: StudentProfile;
  onNavigateTab?: (tab: string) => void;
}

export const StudentActivityTrackerView: React.FC<StudentActivityTrackerViewProps> = ({
  currentProfile,
  onNavigateTab
}) => {
  const [activeView, setActiveView] = useState<'daftar-siswa' | 'log-aktivitas'>('daftar-siswa');
  const [selectedClass, setSelectedClass] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<ClassStudentData | null>(null);

  // Load students & activity logs
  const storedStudents = useMemo(() => getStoredStudents(), []);
  const activityLogs = useMemo(() => getStudentActivityLogs(), []);

  // Merge current logged in student into the list
  const allStudents = useMemo(() => {
    const list = [...storedStudents];
    const exists = list.some(
      (s) => s.nis === currentProfile.nis || s.name.toLowerCase() === currentProfile.name.toLowerCase()
    );

    if (!exists) {
      const highestScore = currentProfile.examHistory.length > 0
        ? Math.max(...currentProfile.examHistory.map((e) => e.score))
        : 88;
      const avgScore = currentProfile.examHistory.length > 0
        ? Math.round(
            currentProfile.examHistory.reduce((acc, e) => acc + e.score, 0) / currentProfile.examHistory.length
          )
        : 88;

      list.unshift({
        id: 'current-user',
        name: currentProfile.name,
        nis: currentProfile.nis || '19283',
        nisn: currentProfile.nisn || '0068412091',
        className: currentProfile.className || 'XII A',
        testsCompleted: currentProfile.examHistory.length || 1,
        averageScore: avgScore,
        highestScore: highestScore,
        weakestCompetency: 'evaluasi-argumen',
        strongestCompetency: 'ide-pokok',
        lastActive: 'Online Sekarang',
        totalXP: currentProfile.xp,
        streakDays: currentProfile.streakDays,
        latestExamResult: currentProfile.examHistory.length > 0
          ? {
              score: currentProfile.examHistory[0].score,
              correctCount: currentProfile.examHistory[0].correctCount,
              totalQuestions: currentProfile.examHistory[0].totalQuestions,
              date: new Date(currentProfile.examHistory[0].startTime).toLocaleDateString('id-ID')
            }
          : undefined
      });
    }
    return list;
  }, [storedStudents, currentProfile]);

  // Filter students by class & search query
  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      const matchClass = selectedClass === 'Semua' || s.className === selectedClass;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nis.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [allStudents, selectedClass, searchQuery]);

  // Overall metrics calculation
  const totalStudentsCount = allStudents.length;
  const avgBatchScore = Math.round(
    allStudents.reduce((acc, s) => acc + s.averageScore, 0) / (totalStudentsCount || 1)
  );
  const totalTestsCompleted = allStudents.reduce((acc, s) => acc + s.testsCompleted, 0);

  // Download official PDF for a student
  const handleDownloadStudentPDF = (student: ClassStudentData) => {
    const totalQ = student.latestExamResult?.totalQuestions || 20;
    const correctQ = student.latestExamResult?.correctCount || Math.round((student.averageScore / 100) * totalQ);
    const scoreVal = student.latestExamResult?.score || student.averageScore;

    generateExamReportPDF({
      studentName: student.name,
      studentNis: student.nis,
      nisn: student.nisn,
      studentClass: student.className,
      schoolName: 'SMAN 1 PINRANG',
      examTitle: 'Simulasi Evaluasi TKA Bahasa Indonesia Angkatan XII',
      examDate: student.latestExamResult?.date || new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      durationMinutes: 20,
      timeSpentSeconds: 1080,
      totalQuestions: totalQ,
      correctCount: correctQ,
      incorrectCount: totalQ - correctQ,
      unansweredCount: 0,
      score: scoreVal,
      competencyScores: {
        'ide-pokok': { total: 3, correct: 3, percentage: 100 },
        'tersurat-tersirat': { total: 3, correct: 2, percentage: 67 },
        'simpulan-makna': { total: 2, correct: 2, percentage: 100 },
        'hubungan-paragraf': { total: 2, correct: 2, percentage: 100 },
        'tujuan-penulis': { total: 2, correct: 1, percentage: 50 },
        'evaluasi-argumen': { total: 3, correct: 2, percentage: 67 },
        'akurasi-relevansi': { total: 2, correct: 1, percentage: 50 },
        'struktur-kebahasaan': { total: 2, correct: 2, percentage: 100 },
        'perbandingan-teks': { total: 1, correct: 1, percentage: 100 }
      },
      teacherName: 'Muhammad Ali Rahman, S.Pd., M.Pd.'
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-full overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. TOP HEADER & INTRO BANNER                                   */}
      {/* ============================================================== */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Users className="w-3.5 h-3.5" />
                SISTEM MONITORING SISWA • SMAN 1 PINRANG
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Data Sinkron
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Data Siswa yang Login, Aktivitas Belajar & Hasil Ujian
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Pantau rekam jejak belajar siswa kelas XII A sampai XII L, aktivitas login dan pengerjaan modul, serta hasil evaluasi nilai akhir simulasi TKA Bahasa Indonesia secara transparan.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveView('daftar-siswa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'daftar-siswa'
                  ? 'bg-white text-indigo-700 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Siswa & Nilai ({allStudents.length})
            </button>
            <button
              onClick={() => setActiveView('log-aktivitas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'log-aktivitas'
                  ? 'bg-white text-indigo-700 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Log Aktivitas Real-Time</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 mt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Siswa Terdata
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              {totalStudentsCount} <span className="text-xs font-semibold text-slate-500">Siswa</span>
            </div>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">
              Rombel XII A s.d. XII L
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Rata-Rata Nilai Angkatan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
              {avgBatchScore} <span className="text-xs font-semibold text-emerald-600">/ 100</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Standar KKM Sekolah: 75
            </p>
          </div>

          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200">
            <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider block">
              Sesi Ujian Selesai
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-0.5">
              {totalTestsCompleted} <span className="text-xs font-semibold text-indigo-600">Sesi</span>
            </div>
            <p className="text-[11px] text-indigo-700 font-semibold mt-1">
              Simulasi & Latihan Terdata
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              Guru Pembimbing
            </span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate">
              Muhammad Ali Rahman
            </div>
            <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
              NIP. 19820315 200801 1 012
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TAB 1: DAFTAR SISWA, AKTIVITAS & HASIL UJIAN               */}
      {/* ============================================================== */}
      {activeView === 'daftar-siswa' && (
        <div className="space-y-4">
          {/* Filter Bar (Search by Name / NIS, Filter by Class) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-indigo-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama lengkap atau NIS siswa..."
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Class Filter Selector (XII A to XII L) */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap hidden sm:inline">
                Pilih Kelas:
              </span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Semua">Semua Kelas (XII A s.d. XII L)</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Students Data Table & Responsive Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Rekapitulasi Data Siswa, Aktivitas & Hasil Ujian ({filteredStudents.length} Siswa)
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Data resmi peserta evaluasi SMAN 1 Pinrang
              </span>
            </div>

            {/* Responsive Card List for Mobile Screens (No Horizontal Scroll) */}
            <div className="md:hidden p-3 space-y-3.5">
              {filteredStudents.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Tidak ada siswa yang sesuai dengan filter pencarian.
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isPassing = student.averageScore >= 75;
                  const isCurrentUser =
                    student.nis === currentProfile.nis || student.name === currentProfile.name;

                  return (
                    <div
                      key={student.id}
                      className={`p-4 rounded-2xl border text-xs space-y-3 transition-all ${
                        isCurrentUser
                          ? 'bg-indigo-50/50 border-indigo-200 shadow-xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-slate-900 text-sm block truncate">
                              {student.name}
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                              <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded text-[11px] border border-indigo-100">
                                {student.className}
                              </span>
                              <span className="font-mono text-slate-500 text-[11px]">
                                NIS: {student.nis}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isCurrentUser && (
                          <span className="text-[9px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full shrink-0">
                            Akun Anda
                          </span>
                        )}
                      </div>

                      {/* Card Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Nilai Akhir Terakhir:</span>
                          {student.latestExamResult ? (
                            <span className="font-extrabold text-slate-900 block mt-0.5">
                              {student.latestExamResult.correctCount}/{student.latestExamResult.totalQuestions} Benar{' '}
                              <strong className="text-indigo-600">({student.latestExamResult.score})</strong>
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px]">Rata-Rata / KKM:</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`font-black ${isPassing ? 'text-emerald-700' : 'text-rose-600'}`}>
                              {student.averageScore}/100
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isPassing ? 'TUNTAS' : 'REMEDIAL'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px]">Aktivitas Terakhir:</span>
                          <span className="font-medium text-slate-700 block truncate mt-0.5">
                            {student.lastActive}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px]">Tes Diikuti:</span>
                          <span className="font-bold text-slate-800 block mt-0.5">
                            {student.testsCompleted} Sesi Ujian
                          </span>
                        </div>
                      </div>

                      {/* Card Action */}
                      <button
                        type="button"
                        onClick={() => handleDownloadStudentPDF(student)}
                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Unduh Lembar Nilai PDF (A4)</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Responsive Table for Desktop & Tablet */}
            <div className="hidden md:block overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Nama Lengkap Siswa</th>
                    <th className="py-3 px-4 font-bold">NIS</th>
                    <th className="py-3 px-4 font-bold">Kelas</th>
                    <th className="py-3 px-4 font-bold">Aktivitas Terakhir</th>
                    <th className="py-3 px-4 font-bold text-center">Ujian Diikuti</th>
                    <th className="py-3 px-4 font-bold text-center">Nilai Akhir Terakhir</th>
                    <th className="py-3 px-4 font-bold text-center">Rata-Rata</th>
                    <th className="py-3 px-4 font-bold text-center">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Laporan PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        Tidak ada siswa yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const isPassing = student.averageScore >= 75;
                      const isCurrentUser =
                        student.nis === currentProfile.nis || student.name === currentProfile.name;

                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isCurrentUser ? 'bg-indigo-50/40 font-semibold' : ''
                          }`}
                        >
                          {/* Nama */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-900 block">
                                  {student.name}
                                </span>
                                {isCurrentUser && (
                                  <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.2 rounded inline-block">
                                    Akun Anda (Login Aktif)
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* NIS */}
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                            {student.nis}
                          </td>

                          {/* Kelas */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                              {student.className}
                            </span>
                          </td>

                          {/* Aktivitas Terakhir */}
                          <td className="py-3.5 px-4 text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{student.lastActive}</span>
                            </div>
                          </td>

                          {/* Sesi Ujian */}
                          <td className="py-3.5 px-4 text-center font-medium">
                            {student.testsCompleted} tes
                          </td>

                          {/* Nilai Akhir Terakhir (Rasio Benar / Total) */}
                          <td className="py-3.5 px-4 text-center">
                            {student.latestExamResult ? (
                              <div>
                                <span className="font-black text-slate-900 text-xs">
                                  {student.latestExamResult.correctCount} / {student.latestExamResult.totalQuestions} Benar
                                </span>
                                <span className="text-[10px] text-indigo-700 font-bold block">
                                  (Skor: {student.latestExamResult.score}/100)
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          {/* Rata-Rata */}
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`font-black text-sm ${
                                isPassing ? 'text-emerald-700' : 'text-rose-600'
                              }`}
                            >
                              {student.averageScore}
                            </span>
                          </td>

                          {/* Status KKM */}
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isPassing
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {isPassing ? 'TUNTAS' : 'REMEDIAL'}
                            </span>
                          </td>

                          {/* Download PDF Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDownloadStudentPDF(student)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-300 hover:border-indigo-300 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                              title={`Download Lembar Nilai PDF A4 untuk ${student.name}`}
                            >
                              <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Unduh PDF A4</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TAB 2: LOG AKTIVITAS SISWA REAL-TIME                        */}
      {/* ============================================================== */}
      {activeView === 'log-aktivitas' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Linimasa Aktivitas Belajar & Login Siswa
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan waktu login, latihan soal, penuntasan modul materi, dan simulasi ujian siswa.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
              Terbaru ({activityLogs.length} Entri)
            </span>
          </div>

          <div className="divide-y divide-slate-100 space-y-2">
            {activityLogs.map((log) => {
              const dateStr = new Date(log.timestamp).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });

              let badgeColor = 'bg-slate-100 text-slate-700';
              let badgeLabel = 'Aktivitas';

              if (log.activityType === 'simulasi') {
                badgeColor = 'bg-indigo-100 text-indigo-800';
                badgeLabel = 'Ujian Simulasi';
              } else if (log.activityType === 'latihan') {
                badgeColor = 'bg-emerald-100 text-emerald-800';
                badgeLabel = 'Latihan Soal';
              } else if (log.activityType === 'modul') {
                badgeColor = 'bg-sky-100 text-sky-800';
                badgeLabel = 'Materi Modul';
              } else if (log.activityType === 'login') {
                badgeColor = 'bg-amber-100 text-amber-800';
                badgeLabel = 'Login Siswa';
              }

              return (
                <div key={log.id} className="pt-3 pb-2 flex items-start justify-between flex-wrap gap-2 text-xs min-w-0">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm truncate">
                          {log.studentName}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          NIS: {log.nis}
                        </span>
                        <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.2 rounded text-[11px]">
                          {log.className}
                        </span>
                        <span className={`font-bold px-2 py-0.2 rounded text-[10px] ${badgeColor}`}>
                          {badgeLabel}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 break-words">
                        {log.description}
                      </p>
                      {log.score !== undefined && (
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                            Nilai Akhir: {log.correctCount} / {log.totalQuestions} Benar (Skor {log.score}/100)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-slate-400 text-[10px] font-medium shrink-0 self-start sm:self-center">
                    {dateStr}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
