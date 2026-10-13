import React from 'react';
import {
  GraduationCap,
  Star,
  Flame,
  UserCheck,
  BotMessageSquare,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { UserRole, StudentProfile } from '../types';

interface HeaderProps {
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  profile: StudentProfile;
  onOpenAITutor: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  profile,
  onOpenAITutor,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18">
          {/* Logo & School Identity */}
          <div className="flex items-center gap-2 sm:gap-3.5 cursor-pointer min-w-0" onClick={() => onSelectTab('beranda')}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-lg">
                  BAHASA XII
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-wider">
                  SMAN 1 PINRANG
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block truncate">
                Belajar Bahasa Indonesia • Latihan • Simulasi TKA
              </p>
            </div>
          </div>

          {/* Right Actions & Student Status */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* AI Tutor Button */}
            <button
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] sm:text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Tanya AI Tutor Bahasa Indonesia"
            >
              <BotMessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>

            {/* Student Name & Avatar badge */}
            {role === 'student' && (
              <div
                onClick={() => onSelectTab('profil')}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100/90 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs text-indigo-900 cursor-pointer transition-all"
                title={`Profil Siswa: ${profile.name} (${profile.className})`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block leading-tight">
                  <span className="font-bold text-slate-900 block truncate max-w-[100px]">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-semibold block">
                    {profile.className}
                  </span>
                </div>
              </div>
            )}

            {/* Streak & XP Badge for student */}
            {role === 'student' && (
              <div className="hidden xl:flex items-center gap-2 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/80 text-xs font-medium text-slate-700">
                <span className="inline-flex items-center gap-1 text-amber-600 font-semibold" title="Hari berturut-turut belajar">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {profile.streakDays}h
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold" title="Total XP Belajar">
                  <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                  {profile.xp} XP
                </span>
              </div>
            )}

            {/* Role Switcher Pill */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-[10px] sm:text-xs">
              <button
                onClick={() => onRoleChange('student')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium transition-colors ${
                  role === 'student'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Siswa
              </button>
              <button
                onClick={() => onRoleChange('teacher')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium transition-colors ${
                  role === 'teacher'
                    ? 'bg-indigo-700 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Guru
              </button>
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
