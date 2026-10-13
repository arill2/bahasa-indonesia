/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, Question, StudentProfile, ExamSession } from './types';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredQuestions,
  recordStudentActivity
} from './services/storage';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

import { Dashboard } from './components/Dashboard';
import { ModulesView } from './components/ModulesView';
import { PracticeView } from './components/PracticeView';
import { QuestionBankView } from './components/QuestionBankView';
import { SimulationView } from './components/SimulationView';
import { SimulationResultView } from './components/SimulationResultView';
import { AdaptivePracticeView } from './components/AdaptivePracticeView';
import { MistakesView } from './components/MistakesView';
import { TipsView } from './components/TipsView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ProfileView } from './components/ProfileView';
import { StudentActivityTrackerView } from './components/StudentActivityTrackerView';
import { AITutorModal } from './components/AITutorModal';
import { QuestionDetailModal } from './components/QuestionDetailModal';

export default function App() {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [questions, setQuestions] = useState<Question[]>(getStoredQuestions());

  // Navigation parameters
  const [activeExamSession, setActiveExamSession] = useState<ExamSession | null>(
    profile.examHistory.length > 0 ? profile.examHistory[0] : null
  );
  const [adaptiveTargetComp, setAdaptiveTargetComp] = useState<string | undefined>(undefined);
  const [practiceCompFilter, setPracticeCompFilter] = useState<string | null>(null);
  const [initialModuleId, setInitialModuleId] = useState<string | undefined>(undefined);

  // Modals & Drawers
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState<{ question?: string; stimulus?: string }>({});
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

  // Open AI Tutor with specific context
  const handleOpenAITutorWithContext = (question: string, stimulus: string) => {
    setAiTutorContext({ question, stimulus });
    setIsAITutorOpen(true);
  };

  // Navigation handlers
  const handleNavigate = (tab: string, extraState?: any) => {
    if (tab === 'materi' && extraState?.moduleId) {
      setInitialModuleId(extraState.moduleId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAdaptive = (competency?: string) => {
    setAdaptiveTargetComp(competency);
    setActiveTab('adaptif');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPracticeByCompetencies = (comps: string[]) => {
    setPracticeCompFilter(comps.length > 0 ? comps[0] : null);
    setActiveTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPracticeWithQuestions = (selectedQuestions: Question[]) => {
    if (selectedQuestions.length > 0) {
      setPracticeCompFilter(selectedQuestions[0].competency);
    }
    setActiveTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSimulationResults = (session: ExamSession) => {
    setActiveExamSession(session);
    recordStudentActivity({
      studentName: profile.name,
      nis: profile.nis || '19283',
      className: profile.className,
      activityType: 'simulasi',
      description: `Menyelesaikan ${session.title}`,
      score: session.score,
      correctCount: session.correctCount,
      totalQuestions: session.totalQuestions
    });
    setActiveTab('hasil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetData = () => {
    if (confirm('Apakah Anda ingin mereset data belajar demo ke setelan awal?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Count wrong practice items
  const wrongCount = profile.practiceHistory.filter((p) => !p.isCorrect).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 overflow-x-hidden max-w-full w-full">
      {/* Top Header */}
      <Header
        role={role}
        onRoleChange={(newRole) => {
          setRole(newRole);
          if (newRole === 'teacher') {
            setActiveTab('guru-dashboard');
          } else if (activeTab === 'guru-dashboard') {
            setActiveTab('beranda');
          }
        }}
        profile={profile}
        onOpenAITutor={() => {
          setAiTutorContext({});
          setIsAITutorOpen(true);
        }}
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
            onOpenAITutorWithContext={handleOpenAITutorWithContext}
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
              onOpenAITutorWithContext={handleOpenAITutorWithContext}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Belum Ada Sesi Ujian</h3>
              <p className="text-xs text-slate-500">
                Silakan ikuti salah satu mode simulasi untuk melihat analisis kemampuan dan grafik pencapaian nilai Anda.
              </p>
              <button
                onClick={() => setActiveTab('simulasi')}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
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
            onNavigateTab={handleNavigate}
          />
        )}

        {/* TIPS & STRATEGI */}
        {activeTab === 'tips' && <TipsView />}

        {/* KESALAHAN SAYA */}
        {activeTab === 'kesalahan' && (
          <MistakesView
            profile={profile}
            allQuestions={questions}
            onStartAdaptive={(comp) => handleStartAdaptive(comp)}
            onNavigateToModule={() => handleNavigate('materi')}
          />
        )}

        {/* LATIHAN ADAPTIF */}
        {activeTab === 'adaptif' && (
          <AdaptivePracticeView
            targetCompetency={adaptiveTargetComp}
            allQuestions={questions}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onBackToDashboard={() => setActiveTab('beranda')}
          />
        )}

        {/* DASHBOARD GURU */}
        {activeTab === 'guru-dashboard' && (
          <TeacherDashboard
            questions={questions}
            onRefreshQuestions={handleRefreshQuestions}
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

      {/* AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        contextQuestion={aiTutorContext.question}
        contextStimulus={aiTutorContext.stimulus}
      />

      {/* Question Detail Modal from Bank Soal */}
      <QuestionDetailModal
        question={detailQuestion}
        onClose={() => setDetailQuestion(null)}
        onOpenAITutorWithContext={handleOpenAITutorWithContext}
      />
    </div>
  );
}
