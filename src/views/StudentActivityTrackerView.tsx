import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Clock,
  FileDown,
  AlertTriangle,
  GraduationCap,
  Trash2,
  Loader2
} from 'lucide-react';
import { ClassStudentData, StudentProfile, CLASS_OPTIONS, COMPETENCY_LABELS } from '../types';
import { downloadExamReportPDF } from '../services/pdf';
import {
  fetchAdminStudents,
  fetchAdminActivity,
  deleteStudentRequest,
  AdminSessionExpiredError,
  RemoteStudent,
  RemoteActivity
} from '../services/remote';

interface StudentActivityTrackerViewProps {
  currentProfile: StudentProfile;
  onAdminExpired?: () => void;
}

interface AdminStudentRow extends ClassStudentData {
  percentage?: number;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

export const StudentActivityTrackerView: React.FC<StudentActivityTrackerViewProps> = ({
  currentProfile,
  onAdminExpired
}) => {
  const [activeView, setActiveView] = useState<'daftar-siswa' | 'log-aktivitas'>('daftar-siswa');
  const [selectedClass, setSelectedClass] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studentToDelete, setStudentToDelete] = useState<AdminStudentRow | null>(null);
  const [rows, setRows] = useState<AdminStudentRow[]>([]);
  const [logs, setLogs] = useState<RemoteActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    Promise.all([fetchAdminStudents(), fetchAdminActivity()])
      .then(([students, activity]) => {
        if (!active) return;
        setRows(
          students.map((s: RemoteStudent) => ({
            id: s.id,
            name: s.name,
            nis: '',
            nisn: '',
            className: s.className,
            testsCompleted: s.testsCompleted,
            averageScore: s.averageScore,
            highestScore: s.highestScore,
            weakestCompetency: 'evaluasi-argumen',
            strongestCompetency: 'ide-pokok',
            lastActive: formatDate(s.lastActive),
            latestExamResult: s.latestExamResult
              ? {
                  score: s.latestExamResult.score,
                  correctCount: s.latestExamResult.correctCount,
                  totalQuestions: s.latestExamResult.totalQuestions,
                  date: new Date(s.latestExamResult.date).toLocaleDateString('id-ID')
                }
              : undefined,
            percentage: s.latestExamResult?.percentage
          }))
        );
        setLogs(activity);
      })
      .catch((e) => {
        if (!active) return;
        console.error(e);
        if (e instanceof AdminSessionExpiredError) {
          setError('Sesi admin berakhir. Silakan login ulang.');
          onAdminExpired?.();
        } else {
          setError('Tidak dapat memuat data dari server. Periksa koneksi lalu coba lagi.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Filter students by class & search query
  const filteredStudents = rows.filter((s) => {
    const matchClass = selectedClass === 'Semua' || s.className === selectedClass;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q);
    return matchClass && matchQuery;
  });

  // Overall metrics calculation
  const totalStudentsCount = rows.length;
  const avgBatchScore = Math.round(
    rows.reduce((acc, s) => acc + s.averageScore, 0) / (totalStudentsCount || 1)
  );
  const totalTestsCompleted = rows.reduce((acc, s) => acc + s.testsCompleted, 0);

  // Download PDF report for a student from the latest recorded exam
  const handleDownloadStudentPDF = async (student: ClassStudentData) => {
    const totalQ = student.latestExamResult?.totalQuestions || 0;
    const correctQ = student.latestExamResult?.correctCount || 0;
    const scoreVal = student.latestExamResult?.score || 0;
    const emptyComp = {
      'ide-pokok': { total: 0, correct: 0, percentage: 0 },
      'tersurat-tersirat': { total: 0, correct: 0, percentage: 0 },
      'simpulan-makna': { total: 0, correct: 0, percentage: 0 },
      'hubungan-paragraf': { total: 0, correct: 0, percentage: 0 },
      'tujuan-penulis': { total: 0, correct: 0, percentage: 0 },
      'evaluasi-argumen': { total: 0, correct: 0, percentage: 0 },
      'akurasi-relevansi': { total: 0, correct: 0, percentage: 0 },
      'struktur-kebahasaan': { total: 0, correct: 0, percentage: 0 },
      'perbandingan-teks': { total: 0, correct: 0, percentage: 0 }
    };

    await downloadExamReportPDF({
      studentName: student.name,
      studentNis: student.nis,
      nisn: student.nisn,
      studentClass: student.className,
      schoolName: 'SMAN 1 PINRANG',
      examTitle: 'Latihan Evaluasi TKA Bahasa Indonesia Kelas XII',
      examDate: student.latestExamResult?.date || new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      durationMinutes: 0,
      timeSpentSeconds: 0,
      totalQuestions: totalQ,
      correctCount: correctQ,
      incorrectCount: totalQ - correctQ,
      unansweredCount: 0,
      score: scoreVal,
      competencyScores: emptyComp
    });
  };

  // Delete a student record (and their results) via the API.
  const handleConfirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudentRequest(studentToDelete.name, studentToDelete.className);
    } catch (e) {
      console.error(e);
      setError('Gagal menghapus data siswa.');
    }
    setStudentToDelete(null);
    setReloadKey((v) => v + 1);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-full overflow-x-hidden">
      {loading && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 flex items-center justify-center gap-3 text-stone-600 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
          Memuat data siswa dari server...
        </div>
      )}

      {error && !loading && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-semibold text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {error}
          </span>
          <button
            onClick={() => setReloadKey((v) => v + 1)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
      <>
      {/* ============================================================== */}
      {/* 1. TOP HEADER & INTRO BANNER                                   */}
      {/* ============================================================== */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-stone-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide bg-teal-50 text-teal-700 border border-teal-200">
                <Users className="w-3.5 h-3.5" />
                Monitoring Siswa · SMAN 1 Pinrang
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Data Siswa yang Login, Aktivitas Belajar & Hasil Ujian
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed">
              Pantau rekam jejak belajar siswa kelas XII A sampai XII L, aktivitas login dan pengerjaan modul, serta hasil evaluasi nilai akhir simulasi TKA Bahasa Indonesia secara transparan.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveView('daftar-siswa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'daftar-siswa'
                  ? 'bg-white text-teal-700 shadow-xs font-black'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Daftar Siswa & Nilai ({rows.length})
            </button>
            <button
              onClick={() => setActiveView('log-aktivitas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'log-aktivitas'
                  ? 'bg-white text-teal-700 shadow-xs font-black'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Log Aktivitas Siswa</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 mt-6 border-t border-stone-100">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-[11px] font-bold text-stone-500 block">
              Total Siswa Terdata
            </span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-0.5">
              {totalStudentsCount} <span className="text-xs font-semibold text-stone-500">Siswa</span>
            </div>
            <p className="text-[11px] text-teal-600 font-semibold mt-1">
              Rombel XII A s.d. XII L
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-800 block">
              Rata-Rata Nilai
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
              {avgBatchScore} <span className="text-xs font-semibold text-emerald-600">/ 100</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Dari hasil latihan terdata
            </p>
          </div>

          <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200">
            <span className="text-[11px] font-bold text-teal-800 block">
              Aktivitas Terselesaikan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-teal-700 mt-0.5">
              {totalTestsCompleted} <span className="text-xs font-semibold text-teal-600">Aktivitas</span>
            </div>
            <p className="text-[11px] text-teal-700 font-semibold mt-1">
              Simulasi & Latihan Terdata
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-800 block">
              Guru Pembimbing
            </span>
            <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1.5">
              Muhammad Ali Rahman
            </div>
            <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
              Bahasa Indonesia Kelas XII
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
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                <Search className="w-4 h-4 text-teal-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama lengkap atau NIS siswa..."
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            {/* Class Filter Selector (XII A to XII L) */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-stone-600 whitespace-nowrap hidden sm:inline">
                Pilih Kelas:
              </span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
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
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                  Rekapitulasi Data Siswa, Aktivitas & Hasil Ujian ({filteredStudents.length} Siswa)
                </h3>
              </div>
              <span className="text-xs text-stone-500">
                Data resmi peserta evaluasi SMAN 1 Pinrang
              </span>
            </div>

            {/* Responsive Card List for Mobile Screens (No Horizontal Scroll) */}
            <div className="md:hidden p-3 space-y-3.5">
              {filteredStudents.length === 0 ? (
                <div className="py-8 text-center text-stone-500 text-xs">
                  Tidak ada siswa yang sesuai dengan filter pencarian.
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isPassing = student.averageScore >= 75;
                  const isCurrentUser =
                    student.name === currentProfile.name && student.className === currentProfile.className;

                  return (
                    <div
                      key={student.id}
                      className={`p-4 rounded-2xl border text-xs space-y-3 transition-all ${
                        isCurrentUser
                          ? 'bg-teal-50/50 border-teal-200 shadow-xs'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-stone-900 text-sm block truncate">
                              {student.name}
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                              <span className="font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded text-[11px] border border-teal-100">
                                {student.className}
                              </span>
                              <span className="font-mono text-stone-500 text-[11px]">
                                NIS: {student.nis}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isCurrentUser && (
                          <span className="text-[9px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full shrink-0">
                            Akun Anda
                          </span>
                        )}
                      </div>

                      {/* Card Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-[11px]">
                        <div>
                          <span className="text-stone-500 block text-[10px]">Nilai Akhir Terakhir:</span>
                          {student.latestExamResult ? (
                            <span className="font-extrabold text-stone-900 block mt-0.5">
                              {student.latestExamResult.correctCount}/{student.latestExamResult.totalQuestions} Benar{' '}
                              <strong className="text-teal-600">({student.latestExamResult.score})</strong>
                            </span>
                          ) : (
                            <span className="text-stone-500">-</span>
                          )}
                        </div>

                        <div>
                          <span className="text-stone-500 block text-[10px]">Rata-Rata / KKM:</span>
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
                          <span className="text-stone-500 block text-[10px]">Aktivitas Terakhir:</span>
                          <span className="font-medium text-stone-700 block truncate mt-0.5">
                            {student.lastActive}
                          </span>
                        </div>

                        <div>
                          <span className="text-stone-500 block text-[10px]">Aktivitas:</span>
                          <span className="font-bold text-stone-900 block mt-0.5">
                            {student.testsCompleted}Aktivitas
                          </span>
                        </div>
                      </div>

                      {/* Card Action */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDownloadStudentPDF(student)}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-teal-50 border border-stone-200 text-teal-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5 text-teal-600" />
                          <span>Unduh PDF (A4)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentToDelete(student)}
                          aria-label={`Hapus data ${student.name}`}
                          className="py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-300 text-rose-700 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Responsive Table for Desktop & Tablet */}
            <div className="hidden md:block overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Nama Lengkap Siswa</th>
                    <th className="py-3 px-4 font-bold">NIS</th>
                    <th className="py-3 px-4 font-bold">Kelas</th>
                    <th className="py-3 px-4 font-bold">Aktivitas Terakhir</th>
                    <th className="py-3 px-4 font-bold text-center">Aktivitas</th>
                    <th className="py-3 px-4 font-bold text-center">Nilai Akhir Terakhir</th>
                    <th className="py-3 px-4 font-bold text-center">Rata-Rata</th>
                    <th className="py-3 px-4 font-bold text-center">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-stone-500">
                        Tidak ada siswa yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => {
                      const isPassing = student.averageScore >= 75;
                      const isCurrentUser =
                        student.name === currentProfile.name && student.className === currentProfile.className;

                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-stone-50 transition-colors ${
                            isCurrentUser ? 'bg-teal-50/40 font-semibold' : ''
                          }`}
                        >
                          {/* Nama */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-extrabold text-stone-900 block">
                                  {student.name}
                                </span>
                                {isCurrentUser && (
                                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded inline-block">
                                    Akun Anda
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* NIS */}
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-700">
                            {student.nis}
                          </td>

                          {/* Kelas */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-teal-900 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                              {student.className}
                            </span>
                          </td>

                          {/* Aktivitas Terakhir */}
                          <td className="py-3.5 px-4 text-stone-500">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{student.lastActive}</span>
                            </div>
                          </td>

                          {/* Sesi Ujian */}
                          <td className="py-3.5 px-4 text-center font-medium">
                            {student.testsCompleted} aktivitas
                          </td>

                          {/* Nilai Akhir Terakhir (Rasio Benar / Total) */}
                          <td className="py-3.5 px-4 text-center">
                            {student.latestExamResult ? (
                              <div>
                                <span className="font-black text-stone-900 text-xs">
                                  {student.latestExamResult.correctCount} / {student.latestExamResult.totalQuestions} Benar
                                </span>
                                <span className="text-[10px] text-teal-700 font-bold block">
                                  (Skor: {student.latestExamResult.score}/100)
                                </span>
                              </div>
                            ) : (
                              <span className="text-stone-500">-</span>
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

                          {/* Row actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleDownloadStudentPDF(student)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-teal-700 border border-stone-300 hover:border-teal-300 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                                title={`Unduh lembar nilai PDF untuk ${student.name}`}
                              >
                                <FileDown className="w-3.5 h-3.5 text-teal-600" />
                                <span>Unduh PDF</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setStudentToDelete(student)}
                                aria-label={`Hapus data ${student.name}`}
                                className="inline-flex items-center justify-center p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-stone-300 hover:border-rose-300 transition-colors cursor-pointer"
                                title={`Hapus data ${student.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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
      {/* 3. TAB 2: LOG AKTIVITAS SISWA                                  */}
      {/* ============================================================== */}
      {activeView === 'log-aktivitas' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                Linimasa Aktivitas Belajar & Login Siswa
              </h3>
              <p className="text-xs text-stone-500">
                Pencatatan waktu login, latihan soal, penuntasan modul materi, dan simulasi ujian siswa.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              {logs.length} Entri
            </span>
          </div>

          {logs.length === 0 ? (
            <p className="text-xs text-stone-500 py-8 text-center">
              Belum ada aktivitas tercatat. Entri muncul setelah siswa login atau mengerjakan latihan.
            </p>
          ) : (
          <div className="divide-y divide-stone-100 space-y-2">
            {logs.map((log) => {
              const dateStr = new Date(log.timestamp).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });

              let badgeColor = 'bg-stone-100 text-stone-700';
              let badgeLabel = 'Aktivitas';

              if (log.activityType === 'simulasi') {
                badgeColor = 'bg-teal-100 text-teal-800';
                badgeLabel = 'Ujian Simulasi';
              } else if (log.activityType === 'latihan') {
                badgeColor = 'bg-emerald-100 text-emerald-800';
                badgeLabel = 'Latihan Soal';
              } else if (log.activityType === 'modul') {
                badgeColor = 'bg-cyan-100 text-cyan-800';
                badgeLabel = 'Materi Modul';
              } else if (log.activityType === 'login') {
                badgeColor = 'bg-amber-100 text-amber-800';
                badgeLabel = 'Login Siswa';
              }

              return (
                <div key={log.id} className="pt-3 pb-2 flex items-start justify-between flex-wrap gap-2 text-xs min-w-0">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-stone-900 text-sm truncate">
                          {log.name}
                        </span>
                        <span className="font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                          {log.className}
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${badgeColor}`}>
                          {badgeLabel}
                        </span>
                      </div>
                      <p className="text-stone-600 mt-1 break-words">
                        {log.title || 'Latihan diselesaikan'}
                      </p>
                      {typeof log.score === 'number' && (
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                            Nilai Akhir: {log.correctCount} / {log.totalQuestions} Benar (Skor {log.score}/100, {log.percentage}%)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-stone-500 text-[10px] font-medium shrink-0 self-start sm:self-center">
                    {dateStr}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      )}

      {/* Delete confirmation modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi hapus data siswa"
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-stone-200"
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-extrabold text-stone-900">Hapus Data Siswa?</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Data <strong className="text-stone-900">{studentToDelete.name}</strong> ({studentToDelete.className})
                beserta log aktivitasnya akan dihapus permanen dari perangkat ini.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDeleteStudent}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};
