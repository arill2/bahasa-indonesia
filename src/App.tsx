/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, Question, StudentProfile, ExamSession, AuthSession } from './types';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredQuestions,
  recordStudentActivity,
  getAuthSession,
  saveAuthSession,
  clearAuthSession
} from './services/storage';

import { LoginView } from './views/LoginView';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

import { Dashboard } from './views/Dashboard';
import { ModulesView } from './views/ModulesView';
import { PracticeView } from './views/PracticeView';
import { QuestionBankView } from './views/QuestionBankView';
import { SimulationView } from './views/SimulationView';
import { SimulationResultView } from './views/SimulationResultView';
import { AdaptivePracticeView } from './views/AdaptivePracticeView';
import { MistakesView } from './views/MistakesView';
import { TipsView } from './views/TipsView';
import { TeacherDashboard } from './views/TeacherDashboard';
import { ProfileView } from './views/ProfileView';
import { StudentActivityTrackerView } from './views/StudentActivityTrackerView';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import {
  recordStudentLogin,
  submitResultRequest,
  adminLoginRequest,
  setAdminToken
} from './services/remote';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(getAuthSession());
  const role: UserRole = session?.role ?? 'student';
  const [activeTab, setActiveTab] = useState<string>(
    session?.role === 'teacher' ? 'guru-dashboard' : 'beranda'
  );
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [questions, setQuestions] = useState<Question[]>(getStoredQuestions());

  // Navigation parameters
  const [activeExamSession, setActiveExamSession] = useState<ExamSession | null>(
    profile.examHistory.length > 0 ? profile.examHistory[0] : null
  );
  const [adaptiveTargetComp, setAdaptiveTargetComp] = useState<string | undefined>(undefined);
  const [adaptiveQuestionIds, setAdaptiveQuestionIds] = useState<string[] | undefined>(undefined);
  const [practiceCompFilter, setPracticeCompFilter] = useState<string | null>(null);
  const [practiceQuestionIds, setPracticeQuestionIds] = useState<string[] | null>(null);
  const [initialModuleId, setInitialModuleId] = useState<string | undefined>(undefined);

  // Modals & Drawers
  const [detailQuestion, setDetailQuestion] = useState<Question | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync profile update
  const handleUpdateProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handleRefreshQuestions = () => {
    setQuestions(getStoredQuestions());
  };

  // Student login: name + class start a fresh local progress record.
  const handleStudentLogin = (name: string, className: string) => {
    const current = getStoredProfile();
    const fresh: StudentProfile = {
      ...current,
      name,
      className,
      nis: '',
      nisn: '',
      xp: 0,
      level: 1,
      streakDays: 0,
      completedModuleIds: [],
      examHistory: [],
      practiceHistory: [],
      badges: current.badges.map((b) => ({ ...b, unlocked: false, dateUnlocked: undefined }))
    };
    saveStoredProfile(fresh);
    setProfile(fresh);
    setActiveExamSession(null);

    recordStudentActivity({
      studentName: name,
      nis: '',
      className,
      activityType: 'login',
      description: `Login siswa (${className})`
    });

    recordStudentLogin(name, className);

    const next: AuthSession = { role: 'student', studentName: name, className };
    saveAuthSession(next);
    setSession(next);
    setActiveTab('beranda');
  };

  // Admin login: verified by the server against env credentials. Returns token for admin API.
  // Admin token died (TTL or revoked): drop the local session and force re-login.
  const handleAdminExpired = () => {
    clearAuthSession();
    setSession(null);
  };

  const handleAdminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const token = await adminLoginRequest(username, password);
      if (!token) return false;

      const next: AuthSession = { role: 'teacher' };
      saveAuthSession(next);
      setSession(next);
      setActiveTab('guru-dashboard');
      return true;
    } catch {
      return false;
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setAdminToken(null);
    setSession(null);
    setActiveTab('beranda');
    setMobileMenuOpen(false);
  };

  // Navigation handlers
  const handleNavigate = (tab: string, extraState?: any) => {
    if (tab === 'materi') {
      setInitialModuleId(extraState?.moduleId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAdaptive = (competency?: string, questionIds?: string[]) => {
    setAdaptiveTargetComp(competency);
    setAdaptiveQuestionIds(questionIds);
    setActiveTab('adaptif');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPracticeByCompetencies = (comps: string[]) => {
    setPracticeCompFilter(comps.length > 0 ? comps[0] : null);
    setPracticeQuestionIds(null);
    setActiveTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPracticeWithQuestions = (selectedQuestions: Question[]) => {
    setPracticeCompFilter(null);
    setPracticeQuestionIds(selectedQuestions.map((q) => q.id));
    setActiveTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSimulationResults = (sessionData: ExamSession) => {
    setActiveExamSession(sessionData);
    recordStudentActivity({
      studentName: profile.name,
      nis: profile.nis || '',
      className: profile.className,
      activityType: 'simulasi',
      description: `Menyelesaikan ${sessionData.title}`,
      score: sessionData.score,
      correctCount: sessionData.correctCount,
      totalQuestions: sessionData.totalQuestions
    });
    submitResultRequest({
      name: profile.name,
      className: profile.className,
      activityType: sessionData.mode === 'adaptif' ? 'adaptif' : 'simulasi',
      title: sessionData.title,
      score: sessionData.score,
      correctCount: sessionData.correctCount,
      totalQuestions: sessionData.totalQuestions
    });
    setActiveTab('hasil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetData = () => {
    if (confirm('Apakah Anda ingin mereset data belajar di perangkat ini ke setelan awal?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Count wrong practice items
  const wrongCount = profile.practiceHistory.filter((p) => !p.isCorrect).length;

  // Gate the app behind the login screen.
  if (!session) {
    return <LoginView onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 overflow-x-hidden max-w-full w-full">
      {/* Top Header */}
      <Header
        role={role}
        profile={profile}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        role={role}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mistakesCount={wrongCount}
      />

      {/* Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-x-hidden min-w-0">
        {/* BERANDA */}
        {activeTab === 'beranda' && (
          <Dashboard
            profile={profile}
            onNavigate={handleNavigate}
            onStartAdaptive={(comp) => handleStartAdaptive(comp)}
            onUpdateProfile={handleUpdateProfile}
            totalQuestionsCount={questions.length}
          />
        )}

        {/* MATERI MODUL */}
        {activeTab === 'materi' && (
          <ModulesView
            initialModuleId={initialModuleId}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onStartPracticeByCompetency={handleStartPracticeByCompetencies}
          />
        )}

        {/* LATIHAN SOAL */}
        {activeTab === 'latihan' && (
          <PracticeView
            questions={questions}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            filterCompetency={practiceCompFilter}
            restrictedQuestionIds={practiceQuestionIds}
          />
        )}

        {/* BANK SOAL */}
        {activeTab === 'bank-soal' && (
          <QuestionBankView
            questions={questions}
            onStartPracticeWithQuestions={handleStartPracticeWithQuestions}
            onOpenQuestionDetail={(q) => setDetailQuestion(q)}
          />
        )}

        {/* SIMULASI TKA */}
        {activeTab === 'simulasi' && (
          <SimulationView
            allQuestions={questions}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onViewResults={handleViewSimulationResults}
          />
        )}

        {/* HASIL & ANALISIS */}
        {activeTab === 'hasil' && (
          activeExamSession ? (
            <SimulationResultView
              session={activeExamSession}
              allQuestions={questions}
              profile={profile}
              onRestartSimulation={() => {
                setActiveTab('simulasi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartAdaptiveForCompetency={(comp) => handleStartAdaptive(comp)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <h3 className="text-lg font-bold text-stone-900">Belum Ada Sesi Ujian</h3>
              <p className="text-xs text-stone-500">
                Silakan ikuti salah satu mode simulasi untuk melihat analisis kemampuan dan grafik pencapaian nilai Anda.
              </p>
              <button
                onClick={() => setActiveTab('simulasi')}
                className="px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold"
              >
                Mulai Simulasi TKA
              </button>
            </div>
          )
        )}

        {/* DATA SISWA & AKTIVITAS */}
        {activeTab === 'data-siswa' && (
          <StudentActivityTrackerView
            currentProfile={profile}
            onAdminExpired={handleAdminExpired}
          />
        )}

        {/* TIPS & STRATEGI */}
        {activeTab === 'tips' && <TipsView />}

        {/* KESALAHAN SAYA */}
        {activeTab === 'kesalahan' && (
          <MistakesView
            profile={profile}
            allQuestions={questions}
            onStartAdaptive={(comp, ids) => handleStartAdaptive(comp, ids)}
            onNavigateToModule={() => handleNavigate('materi')}
          />
        )}

        {/* LATIHAN ADAPTIF */}
        {activeTab === 'adaptif' && (
          <AdaptivePracticeView
            restrictedQuestionIds={adaptiveQuestionIds}
            targetCompetency={adaptiveTargetComp}
            allQuestions={questions}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onBackToDashboard={() => setActiveTab('beranda')}
          />
        )}

        {/* DASHBOARD ADMIN */}
        {activeTab === 'guru-dashboard' && (
          <TeacherDashboard
            questions={questions}
            onRefreshQuestions={handleRefreshQuestions}
            onAdminExpired={handleAdminExpired}
          />
        )}

        {/* PROFIL SISWA */}
        {activeTab === 'profil' && (
          <ProfileView
            profile={profile}
            onResetData={handleResetData}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Question Detail Modal from Bank Soal */}
      <QuestionDetailModal
        question={detailQuestion}
        onClose={() => setDetailQuestion(null)}
      />
    </div>
  );
}