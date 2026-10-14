import {
  StudentProfile,
  Question,
  ExamSession,
  Competency,
  TeacherConfig,
  StudentActivityLog,
  AuthSession
} from '../types';
import { INITIAL_QUESTIONS } from '../data/questionsData';
import { INITIAL_TEACHER_CONFIG } from '../data/teacherData';

const STORAGE_KEYS = {
  PROFILE: 'bahasa_xii_profile_v1',
  QUESTIONS: 'bahasa_xii_questions_v1',
  TEACHER_CONFIG: 'bahasa_xii_teacher_cfg_v1',
  ACTIVITY_LOGS: 'bahasa_xii_activity_logs_v1',
  AUTH_SESSION: 'bahasa_xii_auth_session_v1'
};

const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  nis: '',
  nisn: '',
  className: 'XII D',
  school: 'SMAN 1 PINRANG',
  xp: 0,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 1,
  badges: [
    {
      id: 'b-1',
      title: 'Pembaca Teliti',
      desc: 'Menjawab benar 5 soal analisis fakta dan opini tanpa keliru.',
      icon: 'Eye',
      unlocked: false
    },
    {
      id: 'b-2',
      title: 'Pemburu Gagasan Utama',
      desc: 'Mencapai akurasi 85%+ pada materi Ide Pokok & Gagasan Utama.',
      icon: 'Target',
      unlocked: false
    },
    {
      id: 'b-3',
      title: 'Ahli Inferensi',
      desc: 'Berhasil membedah 10 soal informasi tersirat dan simpulan teks.',
      icon: 'Brain',
      unlocked: false
    },
    {
      id: 'b-4',
      title: 'Pejuang TKA',
      desc: 'Menuntaskan simulasi penuh dengan batas waktu resmi.',
      icon: 'Award',
      unlocked: false
    }
  ],
  completedModuleIds: [],
  examHistory: [],
  practiceHistory: []
};

export const getAuthSession = (): AuthSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (raw) return JSON.parse(raw) as AuthSession;
  } catch (e) {
    console.error('Error reading auth session', e);
  }
  return null;
};

export const saveAuthSession = (session: AuthSession) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
  } catch (e) {
    console.error('Error saving auth session', e);
  }
};

export const clearAuthSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  } catch (e) {
    console.error('Error clearing auth session', e);
  }
};

export const getStoredProfile = (): StudentProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      return JSON.parse(raw) as StudentProfile;
    }
  } catch (e) {
    console.error('Error reading profile from localStorage', e);
  }
  return DEFAULT_PROFILE;
};

export const getStudentActivityLogs = (): StudentActivityLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading activity logs', e);
  }

  // No seeded logs: activity logs are empty until a real student acts.
  const initialLogs: StudentActivityLog[] = [];

  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(initialLogs));
  } catch (e) {
    // Ignore storage errors
  }
  return initialLogs;
};

export const recordStudentActivity = (log: Omit<StudentActivityLog, 'id' | 'timestamp'>): void => {
  try {
    const currentLogs = getStudentActivityLogs();
    const newLog: StudentActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      ...log
    };
    const updated = [newLog, ...currentLogs].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error recording student activity', e);
  }
};

export const saveStoredProfile = (profile: StudentProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
};

export const addXpAndActivity = (xpGained: number, markCompletedModuleId?: string) => {
  const profile = getStoredProfile();
  profile.xp += xpGained;
  profile.level = Math.floor(profile.xp / 200) + 1;

  if (markCompletedModuleId && !profile.completedModuleIds.includes(markCompletedModuleId)) {
    profile.completedModuleIds.push(markCompletedModuleId);
  }

  // Update streak if today is active
  const today = new Date().toISOString().split('T')[0];
  if (profile.lastActiveDate !== today) {
    profile.streakDays += 1;
    profile.lastActiveDate = today;
  }

  saveStoredProfile(profile);
  return profile;
};

export const recordPracticeAnswer = (
  questionId: string,
  selectedAnswer: any,
  isCorrect: boolean,
  competency: Competency
) => {
  const profile = getStoredProfile();
  profile.practiceHistory.push({
    questionId,
    selectedAnswer,
    isCorrect,
    timestamp: Date.now(),
    competency
  });

  if (isCorrect) {
    profile.xp += 15;
    profile.level = Math.floor(profile.xp / 200) + 1;
  } else {
    profile.xp += 5; // Encouragement XP for attempting
  }

  saveStoredProfile(profile);
  return profile;
};

export const recordExamSession = (session: ExamSession) => {
  const profile = getStoredProfile();
  profile.examHistory.unshift(session);
  profile.xp += Math.round(session.score * 1.5) + 50;
  profile.level = Math.floor(profile.xp / 200) + 1;

  // Check badges
  const pejuangBadge = profile.badges.find(b => b.id === 'b-4');
  if (pejuangBadge && !pejuangBadge.unlocked) {
    pejuangBadge.unlocked = true;
    pejuangBadge.dateUnlocked = new Date().toISOString().split('T')[0];
  }

  saveStoredProfile(profile);
  return profile;
};

export const getStoredQuestions = (): Question[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (raw) {
      const parsed: Question[] = JSON.parse(raw);
      // Ensure all current INITIAL_QUESTIONS are available, plus any custom questions
      const initialMap = new Map(INITIAL_QUESTIONS.map(q => [q.id, q]));
      const customOnes = parsed.filter(q => q.id.startsWith('custom-') || !initialMap.has(q.id));
      
      const missingInitial = INITIAL_QUESTIONS.filter(initQ => !parsed.some(p => p.id === initQ.id));
      if (missingInitial.length === 0 && customOnes.length === 0 && parsed.length >= INITIAL_QUESTIONS.length) {
        return parsed;
      }
      // Merge custom questions with updated INITIAL_QUESTIONS
      const merged = [...customOnes, ...INITIAL_QUESTIONS];
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.error('Error loading questions from localStorage', e);
  }
  return INITIAL_QUESTIONS;
};

export const saveStoredQuestions = (questions: Question[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error('Error saving questions', e);
  }
};

export const addQuestion = (newQ: Question) => {
  const list = getStoredQuestions();
  list.unshift(newQ);
  saveStoredQuestions(list);
  return list;
};

export const updateQuestion = (updatedQ: Question) => {
  const list = getStoredQuestions();
  const idx = list.findIndex(q => q.id === updatedQ.id);
  if (idx !== -1) {
    list[idx] = updatedQ;
    saveStoredQuestions(list);
  }
  return list;
};

export const deleteQuestion = (id: string) => {
  const list = getStoredQuestions().filter(q => q.id !== id);
  saveStoredQuestions(list);
  return list;
};

export const getTeacherConfig = (): TeacherConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHER_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading teacher config', e);
  }
  return INITIAL_TEACHER_CONFIG;
};

export const saveTeacherConfig = (config: TeacherConfig) => {
  localStorage.setItem(STORAGE_KEYS.TEACHER_CONFIG, JSON.stringify(config));
};

export const calculateStudentWeaknesses = (profile: StudentProfile) => {
  const compStats: Record<string, { total: number; incorrect: number }> = {};

  // Aggregate from practice
  profile.practiceHistory.forEach(item => {
    if (!compStats[item.competency]) compStats[item.competency] = { total: 0, incorrect: 0 };
    compStats[item.competency].total += 1;
    if (!item.isCorrect) compStats[item.competency].incorrect += 1;
  });

  // Aggregate from exams
  profile.examHistory.forEach(exam => {
    Object.entries(exam.competencyScores || {}).forEach(([comp, sc]) => {
      if (!compStats[comp]) compStats[comp] = { total: 0, incorrect: 0 };
      compStats[comp].total += sc.total;
      compStats[comp].incorrect += (sc.total - sc.correct);
    });
  });

  const weaknesses = Object.entries(compStats)
    .map(([comp, data]) => {
      const accuracy = data.total > 0 ? Math.round(((data.total - data.incorrect) / data.total) * 100) : 100;
      return {
        competency: comp as Competency,
        accuracy,
        total: data.total,
        incorrect: data.incorrect
      };
    })
    .filter(item => item.total >= 1)
    .sort((a, b) => a.accuracy - b.accuracy);

  return weaknesses;
};
