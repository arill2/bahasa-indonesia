import React, { useState } from 'react';
import { GraduationCap, User, ShieldCheck, IdCard, Lock, LogIn, AlertCircle } from 'lucide-react';
import { LOGIN_CLASS_OPTIONS, UserRole } from '../types';

interface LoginViewProps {
  onStudentLogin: (name: string, className: string) => void;
  onAdminLogin: (username: string, password: string) => Promise<boolean>;
}

export const LoginView: React.FC<LoginViewProps> = ({ onStudentLogin, onAdminLogin }) => {
  const [mode, setMode] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [className, setClassName] = useState<string>(LOGIN_CLASS_OPTIONS[0]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setError(null);
    onStudentLogin(trimmed, className);
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const ok = await onAdminLogin(username.trim(), password);
      if (!ok) setError('Username atau kata sandi admin salah.');
    } catch {
      setError('Tidak dapat memverifikasi admin. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Identitas */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center mx-auto border border-teal-800">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">BAHASA XII</h1>
            <p className="text-xs text-stone-500">SMAN 1 Pinrang · Bahasa Indonesia Kelas XII</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            {/* Switch Siswa / Admin */}
            <div className="grid grid-cols-2 border-b border-stone-200">
              <button
                type="button"
                onClick={() => { setMode('student'); setError(null); }}
                className={`py-3 min-h-11 text-sm font-bold transition-colors ${
                  mode === 'student' ? 'bg-teal-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Siswa
              </button>
              <button
                type="button"
                onClick={() => { setMode('teacher'); setError(null); }}
                className={`py-3 min-h-11 text-sm font-bold transition-colors ${
                  mode === 'teacher' ? 'bg-teal-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              {mode === 'student' ? (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Isi nama dan kelas untuk mulai berlatih. Progres belajar Anda tersimpan di perangkat ini.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="login-name" className="block text-xs font-bold text-stone-700">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                      <input
                        id="login-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ketik nama lengkap Anda"
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="login-class" className="block text-xs font-bold text-stone-700">
                      Kelas
                    </label>
                    <div className="relative">
                      <IdCard className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                      <select
                        id="login-class"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 bg-white text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 cursor-pointer"
                      >
                        {LOGIN_CLASS_OPTIONS.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Masuk sebagai Siswa
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Masuk sebagai admin untuk memantau data siswa, nilai, dan aktivitas belajar.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="login-username" className="block text-xs font-bold text-stone-700">
                      Username Admin
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                      <input
                        id="login-username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="login-password" className="block text-xs font-bold text-stone-700">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                      <input
                        id="login-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Kata sandi"
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 bg-white text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                      />
                    </div>
                  </div>

                  {error && (
                    <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !username.trim() || !password}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    {isSubmitting ? 'Memeriksa...' : 'Masuk sebagai Admin'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <p className="text-center text-[11px] text-stone-500">
            Media pembelajaran internal SMAN 1 Pinrang
          </p>
        </div>
      </div>
    </div>
  );
};