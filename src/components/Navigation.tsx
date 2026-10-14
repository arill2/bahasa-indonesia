import React, { useEffect } from 'react';
import {
  Home,
  BookOpen,
  CheckSquare,
  Database,
  Timer,
  BarChart3,
  Compass,
  AlertCircle,
  User,
  LayoutDashboard,
  Users
} from 'lucide-react';
import { UserRole } from '../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: string;
}

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  role: UserRole;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mistakesCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  role,
  mobileMenuOpen,
  setMobileMenuOpen,
  mistakesCount = 0
}) => {
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);
  const studentNavItems: NavItem[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'latihan', label: 'Latihan Soal', icon: CheckSquare },
    { id: 'bank-soal', label: 'Bank Soal', icon: Database },
    { id: 'simulasi', label: 'Simulasi TKA', icon: Timer, highlight: true },
    { id: 'hasil', label: 'Hasil & Analisis', icon: BarChart3 },
    { id: 'tips', label: 'Tips & Strategi', icon: Compass },
    {
      id: 'kesalahan',
      label: 'Kesalahan Saya',
      icon: AlertCircle,
      badge: mistakesCount > 0 ? `${mistakesCount}` : undefined
    },
    { id: 'profil', label: 'Profil', icon: User }
  ];

  const teacherNavItems: NavItem[] = [
    { id: 'guru-dashboard', label: 'Dashboard Guru', icon: LayoutDashboard },
    { id: 'data-siswa', label: 'Data Siswa & Aktivitas', icon: Users, highlight: true },
    { id: 'materi', label: 'Modul Materi', icon: BookOpen },
    { id: 'bank-soal', label: 'Kelola Bank Soal', icon: Database },
    { id: 'simulasi', label: 'Simulasi TKA', icon: Timer },
    { id: 'tips', label: 'Tips & Strategi', icon: Compass }
  ];

  const currentItems = role === 'teacher' ? teacherNavItems : studentNavItems;

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sub-Nav Bar */}
      <nav className="hidden lg:block bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-1.5 overflow-x-auto no-scrollbar">
            {currentItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 shadow-xs ring-1 ring-teal-200'
                      : item.highlight
                      ? 'text-teal-600 hover:bg-teal-50/50 hover:text-teal-800'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi"
            className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="font-extrabold text-stone-900 text-base">Menu Navigasi</span>
                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold">
                  {role === 'teacher' ? 'MODE ADMIN' : 'SISWA XII'}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                {currentItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 min-h-11 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-md'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
              <p className="font-semibold text-stone-900">SMAN 1 PINRANG</p>
              <p className="text-[11px] text-stone-500">Bahasa Indonesia Kelas XII</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMobileMenuOpen(false)}
            className="flex-1 cursor-default"
          />
        </div>
      )}
    </>
  );
};
