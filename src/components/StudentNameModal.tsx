import React, { useState, useEffect } from 'react';
import { X, User, Check, GraduationCap, IdCard } from 'lucide-react';
import { StudentProfile, CLASS_OPTIONS } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface StudentNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
}

export const StudentNameModal: React.FC<StudentNameModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [name, setName] = useState(profile.name || '');
  const [nis, setNis] = useState(profile.nis || '');
  const [className, setClassName] = useState(profile.className || 'XII A');
  const [nisn, setNisn] = useState(profile.nisn || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;

    const updated: StudentProfile = {
      ...profile,
      name: cleanName,
      nis: nis.trim() || profile.nis || '',
      className,
      nisn: nisn.trim() || profile.nisn
    };

    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn max-w-full overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Identitas dan Sapaan Siswa"
        className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-7 shadow-2xl space-y-4 border border-stone-200 animate-scaleUp my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Identitas & Sapaan Siswa</h3>
              <p className="text-[11px] text-stone-500">SMAN 1 Pinrang • Rombel XII A s.d. XII L</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Greeting Preview */}
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 space-y-1">
          <span className="text-[10px] font-bold text-teal-600 block">
            Pratinjau Sapaan Sistem:
          </span>
          <p className="font-bold text-sm text-stone-900 truncate">
            Halo, {name.trim() || 'Siswa'}!
          </p>
          <p className="text-[11px] text-stone-600">
            NIS: <strong>{nis || '-'}</strong> • Kelas: <strong>{className}</strong> • SMAN 1 Pinrang
          </p>
        </div>

        {/* Form Inputs: Nama Siswa & NIS Siswa Disamping */}
        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Input Nama Lengkap Siswa */}
            <div className="space-y-1">
              <label className="font-bold text-stone-900 block">
                Nama Lengkap Siswa: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                  <User className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ketik nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Input NIS Siswa (Disamping Kolom Input Nama) */}
            <div className="space-y-1">
              <label className="font-bold text-stone-900 block">
                NIS Siswa (Nomor Induk): <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                  <IdCard className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Isi NIS bila ada"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-mono font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-900 block mb-1">Kelas XII (A s/d L):</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-900 block mb-1">NISN Siswa (Nasional):</label>
              <input
                type="text"
                placeholder="Contoh: 0068412091"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Identitas berhasil disimpan! Nama, NIS, dan kelas telah disinkronkan.</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-teal-200" />
              <span>Simpan Identitas</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
