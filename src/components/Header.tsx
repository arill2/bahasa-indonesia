import React from 'react';
import {
  GraduationCap,
  Star,
  Flame,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { UserRole, StudentProfile } from '../types';

interface HeaderProps {
  role: UserRole;
  profile: StudentProfile;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  profile,
  onLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18">
          {/* Logo & School Identity */}
          <button
            type="button"
            className="flex items-center gap-2 sm:gap-3.5 min-w-0 text-left rounded-lg focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2"
            onClick={() => onSelectTab('beranda')}
            aria-label="Ke Beranda"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-teal-700 flex items-center justify-center text-white border border-teal-800 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-extrabold text-stone-900 tracking-tight text-sm sm:text-lg">
                  BAHASA XII
                </span>
                <span className="text-[11px] font-semibold text-stone-500 tracking-wide">
                  SMAN 1 PINRANG
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden md:block truncate">
                Belajar Bahasa Indonesia • Latihan • Simulasi TKA
              </p>
            </div>
          </button>

          {/* Right Actions & Student Status */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Identity: student name+class, or admin badge */}
            {role === 'student' ? (
              <button
                type="button"
                onClick={() => onSelectTab('profil')}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:px-2.5 sm:py-1 min-h-11 rounded-xl bg-stone-100/90 hover:bg-teal-50 border border-stone-200 hover:border-teal-200 text-xs text-teal-900 cursor-pointer transition-all"
                title={`Profil Siswa: ${profile.name} (${profile.className})`}
              >
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-[11px] flex items-center justify-center">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block leading-tight">
                  <span className="font-bold text-stone-900 block truncate max-w-[100px]">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold block">
                    {profile.className}
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-2.5 min-h-11 rounded-xl bg-stone-900 text-white">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center">
                  A
                </span>
                <span className="text-xs font-bold">Admin</span>
              </div>
            )}

            {/* Streak & XP Badge for student */}
            {role === 'student' && (
              <div className="hidden xl:flex items-center gap-2 bg-stone-100/80 px-2.5 py-1.5 rounded-lg border border-stone-200/80 text-xs font-medium text-stone-700">
                <span className="inline-flex items-center gap-1 text-amber-600 font-semibold" title="Hari berturut-turut belajar">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {profile.streakDays}h
                </span>
                <span className="text-stone-300">|</span>
                <span className="inline-flex items-center gap-1 text-teal-700 font-semibold" title="Total XP Belajar">
                  <Star className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                  {profile.xp} XP
                </span>
              </div>
            )}

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 min-h-11 rounded-lg border border-stone-200 text-stone-600 hover:text-rose-700 hover:border-rose-300 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
