import React, { useState, useEffect } from 'react';
import {
  Star,
  Flame,
  Award,
  CheckCircle2,
  Edit3,
  Check,
  FileDown
} from 'lucide-react';
import { StudentProfile, CLASS_OPTIONS, ExamSession } from '../types';
import { downloadExamReportPDF } from '../services/pdf';

interface ProfileViewProps {
  profile: StudentProfile;
  onResetData: () => void;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onResetData,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [nis, setNis] = useState(profile.nis || profile.nisn || '');
  const [className, setClassName] = useState(profile.className);
  const [nisn, setNisn] = useState(profile.nisn || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep the form in sync when the profile changes outside this view (login, reset).
  useEffect(() => {
    setName(profile.name);
    setNis(profile.nis || profile.nisn || '');
    setClassName(profile.className);
    setNisn(profile.nisn || '');
  }, [profile.name, profile.nis, profile.nisn, profile.className]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const updated: StudentProfile = {
      ...profile,
      name: trimmed,
      nis: nis.trim(),
      className,
      nisn: nisn.trim()
    };

    onUpdateProfile(updated);
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Student ID Card Look */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-black shadow-xs">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-300 bg-stone-900 border border-stone-700 px-2.5 py-0.5 rounded-full inline-block">
                Kartu Siswa Kelas XII · SMAN 1 Pinrang
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{profile.name}</h2>
              <p className="text-xs text-stone-300">
                NISN: <span className="font-mono font-semibold">{profile.nisn}</span> • {profile.className}
              </p>
              <p className="text-xs text-teal-300 font-semibold">{profile.school}</p>
            </div>
          </div>

          {/* Level & XP Capsule */}
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 text-center min-w-[160px] space-y-1">
            <span className="text-[11px] text-stone-500 font-medium block">Tingkat Capaian</span>
            <div className="text-2xl font-black text-white">Level {profile.level}</div>
            <div className="text-xs text-teal-300 font-bold flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-teal-300" />
              {profile.xp} Total XP
            </div>
            <div className="text-[11px] text-amber-300 flex items-center justify-center gap-1 pt-1">
              <Flame className="w-3 h-3 fill-amber-400" />
              {profile.streakDays} Hari Belajar
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-teal-600" />
              Kelola Identitas & Sapaan Siswa
            </h3>
            <p className="text-xs text-stone-500">
              Nama ini digunakan untuk menyapa Anda dan tertera pada lembar laporan simulasi TKA.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-1.5 rounded-xl border border-teal-200 text-teal-700 hover:bg-teal-50 font-bold text-xs transition-all cursor-pointer"
          >
            {isEditing ? 'Tutup Form' : 'Ubah Data'}
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Data profil berhasil diperbarui! Nama dan kelas baru telah diterapkan.</span>
          </div>
        )}

        {isEditing && (
          <form onSubmit={handleSave} className="pt-3 border-t border-stone-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap Siswa"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">NIS Siswa</label>
                <input
                  type="text"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  placeholder="Isi NIS"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Kelas XII</label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-bold"
                >
                  {CLASS_OPTIONS.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">NISN Siswa</label>
                <input
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="Isi NISN"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Profil
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Badges & Gamification */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-stone-900 text-lg">
              Lencana Prestasi Literasi
            </h3>
            <p className="text-xs text-stone-500">
              Penghargaan atas ketelitian dan konsistensi latihan penalaran Bahasa Indonesia.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            {profile.badges.filter((b) => b.unlocked).length} dari {profile.badges.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4.5 rounded-2xl border transition-all text-center space-y-2.5 ${
                badge.unlocked
                  ? 'bg-white border-teal-200 shadow-xs'
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center shadow-xs ${
                  badge.unlocked
                    ? 'bg-teal-600 text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{badge.title}</h4>
              <p className="text-[11px] text-stone-500 leading-snug">{badge.desc}</p>
              {badge.unlocked ? (
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Terbuka
                </span>
              ) : (
                <span className="inline-block text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  Belum Terbuka
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Exam Simulation History */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-extrabold text-stone-900 text-lg">
          Riwayat Ujian & Simulasi Mandiri ({profile.name})
        </h3>

        {profile.examHistory.length === 0 ? (
          <p className="text-xs text-stone-500 py-4 text-center">
            Belum ada riwayat simulasi. Klik menu Simulasi TKA untuk mulai menguji kemampuan.
          </p>
        ) : (
          <div className="divide-y divide-stone-100">
            {profile.examHistory.map((ex) => (
              <div key={ex.id} className="py-3.5 flex items-center justify-between flex-wrap gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900">{ex.title}</h4>
                  <p className="text-[11px] text-stone-500">
                    Durasi: {Math.round(ex.elapsedSeconds / 60)} menit • Nilai Akhir: <strong className="text-teal-700 font-bold">{ex.correctCount} / {ex.totalQuestions} Benar</strong>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-black text-teal-700 text-lg">{ex.score}</span>
                    <span className="text-[10px] text-stone-500 block">Skor / 100</span>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await downloadExamReportPDF({
                        studentName: profile.name,
                        studentNis: profile.nis || '',
                        studentClass: profile.className,
                        nisn: profile.nisn,
                        schoolName: profile.school,
                        examTitle: ex.title,
                        examDate: new Date(ex.endTime || ex.startTime).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }),
                        durationMinutes: ex.durationMinutes,
                        timeSpentSeconds: ex.elapsedSeconds,
                        totalQuestions: ex.totalQuestions,
                        correctCount: ex.correctCount,
                        incorrectCount: ex.incorrectCount,
                        unansweredCount: ex.unansweredCount,
                        score: ex.score,
                        competencyScores: ex.competencyScores
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-bold transition-all cursor-pointer"
                    title="Download Nilai Akhir PDF A4"
                  >
                    <FileDown className="w-3.5 h-3.5 text-teal-600" />
                    <span>Unduh PDF (A4)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account / Privacy Options */}
      <div className="p-5 bg-stone-100/70 rounded-2xl border border-stone-200 flex items-center justify-between flex-wrap gap-3 text-xs text-stone-600">
        <div>
          <p className="font-semibold text-stone-900">Privasi Akun & Data Lokal</p>
          <p className="text-[11px] text-stone-500">
            Semua progres latihan tersimpan di peramban ini sesuai ketentuan keamanan sekolah.
          </p>
        </div>
        <button
          onClick={onResetData}
          className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-stone-700 font-bold transition-all cursor-pointer"
        >
          Reset Data Latihan
        </button>
      </div>
    </div>
  );
};
