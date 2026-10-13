import {
  StudentProfile,
  Question,
  ExamSession,
  Competency,
  TeacherConfig,
  ClassStudentData,
  StudentActivityLog
} from '../types';
import { INITIAL_QUESTIONS } from '../data/questionsData';
import { INITIAL_TEACHER_CONFIG, INITIAL_STUDENTS } from '../data/teacherData';

const STORAGE_KEYS = {
  PROFILE: 'bahasa_xii_profile_v1',
  QUESTIONS: 'bahasa_xii_questions_v1',
  TEACHER_CONFIG: 'bahasa_xii_teacher_cfg_v1',
  STUDENTS: 'bahasa_xii_students_v1',
  CURRENT_ROLE: 'bahasa_xii_active_role_v1',
  ACTIVITY_LOGS: 'bahasa_xii_activity_logs_v1'
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Andi Muh. Fadhil',
  nis: '19283',
  nisn: '0068412091',
  className: 'XII A',
  school: 'SMAN 1 PINRANG',
  xp: 450,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 3,
  badges: [
    {
      id: 'b-1',
      title: 'Pembaca Teliti',
      desc: 'Menjawab benar 5 soal analisis fakta dan opini tanpa keliru.',
      icon: 'Eye',
      unlocked: true,
      dateUnlocked: '2026-10-01'
    },
    {
      id: 'b-2',
      title: 'Pemburu Gagasan Utama',
      desc: 'Mencapai akurasi 85%+ pada materi Ide Pokok & Gagasan Utama.',
      icon: 'Target',
      unlocked: true,
      dateUnlocked: '2026-10-03'
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
      unlocked: true,
      dateUnlocked: '2026-10-05'
    }
  ],
  completedModuleIds: ['mod-1', 'mod-2'],
  examHistory: [
    {
      id: 'sim-demo-1',
      mode: 'cepat',
      title: 'Simulasi Cepat Bahasa Indonesia TKA #1',
      totalQuestions: 10,
      durationMinutes: 15,
      startTime: Date.now() - 86400000 * 2,
      endTime: Date.now() - 86400000 * 2 + 12 * 60000,
      elapsedSeconds: 720,
      answers: { 'q-1': 'B', 'q-2': 'B', 'q-3': 'A', 'q-4': 'E', 'q-5': 'C', 'q-6': 'A', 'q-7': 'C', 'q-8': 'B', 'q-9': 'C', 'q-10': 'C' },
      flagged: ['q-7'],
      completed: true,
      score: 80,
      correctCount: 8,
      incorrectCount: 2,
      unansweredCount: 0,
      questionIds: ['q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7', 'q-8', 'q-9', 'q-10'],
      competencyScores: {
        'ide-pokok': { total: 1, correct: 1, percentage: 100 },
        'tersurat-tersirat': { total: 2, correct: 2, percentage: 100 },
        'simpulan-makna': { total: 2, correct: 2, percentage: 100 },
        'hubungan-paragraf': { total: 1, correct: 1, percentage: 100 },
        'tujuan-penulis': { total: 1, correct: 1, percentage: 100 },
        'evaluasi-argumen': { total: 1, correct: 1, percentage: 100 },
        'akurasi-relevansi': { total: 0, correct: 0, percentage: 0 },
        'struktur-kebahasaan': { total: 1, correct: 1, percentage: 100 },
        'perbandingan-teks': { total: 2, correct: 1, percentage: 50 }
      }
    }
  ],
  practiceHistory: [
    { questionId: 'q-1', selectedAnswer: 'B', isCorrect: true, timestamp: Date.now() - 4000000, competency: 'simpulan-makna' },
    { questionId: 'q-2', selectedAnswer: 'B', isCorrect: true, timestamp: Date.now() - 3800000, competency: 'tujuan-penulis' },
    { questionId: 'q-6', selectedAnswer: 'B', isCorrect: false, timestamp: Date.now() - 3200000, competency: 'perbandingan-teks' },
    { questionId: 'q-7', selectedAnswer: 'C', isCorrect: false, timestamp: Date.now() - 3100000, competency: 'perbandingan-teks' },
    { questionId: 'q-14', selectedAnswer: 'B', isCorrect: true, timestamp: Date.now() - 2500000, competency: 'struktur-kebahasaan' }
  ]
};

export const getStoredProfile = (): StudentProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed: StudentProfile = JSON.parse(raw);
      if (parsed.className && (parsed.className.includes('MIPA') || parsed.className.includes('IPS'))) {
        parsed.className = 'XII A';
      }
      if (!parsed.nis) {
        parsed.nis = '19283';
      }
      saveStoredProfile(parsed);
      return parsed;
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

  // Pre-seed with realistic Pinrang high school activities
  const initialLogs: StudentActivityLog[] = [
    {
      id: 'act-1',
      studentName: 'Andi Muhammad Fadhil',
      nis: '19283',
      className: 'XII A',
      timestamp: Date.now() - 1000 * 60 * 12,
      activityType: 'simulasi',
      description: 'Menyelesaikan Simulasi Ujian TKA Bahasa Indonesia (20 Soal)',
      score: 95,
      correctCount: 19,
      totalQuestions: 20
    },
    {
      id: 'act-2',
      studentName: 'Zahra Meilani Lasinrang',
      nis: '19290',
      className: 'XII G',
      timestamp: Date.now() - 1000 * 60 * 35,
      activityType: 'simulasi',
      description: 'Menyelesaikan Simulasi Intensif HOTS Multiteks',
      score: 100,
      correctCount: 20,
      totalQuestions: 20
    },
    {
      id: 'act-3',
      studentName: 'Nur Aisyah Ramadhani',
      nis: '19284',
      className: 'XII A',
      timestamp: Date.now() - 1000 * 60 * 75,
      activityType: 'simulasi',
      description: 'Menyelesaikan Simulasi Reguler TKA',
      score: 96,
      correctCount: 24,
      totalQuestions: 25
    },
    {
      id: 'act-4',
      studentName: 'Muh. Al-Fatih Batara',
      nis: '19294',
      className: 'XII K',
      timestamp: Date.now() - 1000 * 60 * 120,
      activityType: 'latihan',
      description: 'Mengerjakan Latihan Mandiri Materi Ide Pokok & Argumen',
      score: 90,
      correctCount: 9,
      totalQuestions: 10
    },
    {
      id: 'act-5',
      studentName: 'Siti Rahmawati Putri',
      nis: '19286',
      className: 'XII C',
      timestamp: Date.now() - 1000 * 60 * 180,
      activityType: 'modul',
      description: 'Membaca Modul Kaidah Kebahasaan, EYD V & Kalimat Efektif'
    },
    {
      id: 'act-6',
      studentName: 'Dewi Lestari Mansyur',
      nis: '19288',
      className: 'XII E',
      timestamp: Date.now() - 1000 * 60 * 240,
      activityType: 'simulasi',
      description: 'Menyelesaikan Simulasi Cepat TKA #2',
      score: 85,
      correctCount: 17,
      totalQuestions: 20
    },
    {
      id: 'act-7',
      studentName: 'Andi Muhammad Fadhil',
      nis: '19283',
      className: 'XII A',
      timestamp: Date.now() - 1000 * 60 * 300,
      activityType: 'login',
      description: 'Login ke Platform Pembelajaran Bahasa XII SMAN 1 Pinrang'
    }
  ];

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

export const getStoredStudents = (): ClassStudentData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading student records', e);
  }
  return INITIAL_STUDENTS;
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
