export type UserRole = 'student' | 'teacher';

export const CLASS_OPTIONS = [
  'XII A',
  'XII B',
  'XII C',
  'XII D',
  'XII E',
  'XII F',
  'XII G',
  'XII H',
  'XII I',
  'XII J',
  'XII K',
  'XII L'
] as const;

export type SchoolClass = typeof CLASS_OPTIONS[number];

export type Competency =
  | 'ide-pokok'             // Menentukan Ide Pokok & Gagasan Utama
  | 'tersurat-tersirat'     // Informasi Tersurat & Tersirat
  | 'simpulan-makna'        // Simpulan & Makna Kata/Kalimat
  | 'hubungan-paragraf'     // Hubungan Antarkalimat & Antarparagraf
  | 'tujuan-penulis'        // Tujuan, Sikap & Perspektif Penulis
  | 'evaluasi-argumen'      // Evaluasi Argumen, Bukti, Fakta & Opini
  | 'akurasi-relevansi'     // Menilai Keakuratan & Relevansi Informasi
  | 'struktur-kebahasaan'   // Struktur Teks, Kalimat Efektif & Ejaan
  | 'perbandingan-teks';    // Membandingkan Dua Teks / Literasi Multiteks

export const COMPETENCY_LABELS: Record<Competency, string> = {
  'ide-pokok': 'Ide Pokok & Gagasan Utama',
  'tersurat-tersirat': 'Informasi Tersurat & Tersirat',
  'simpulan-makna': 'Simpulan & Makna Teks',
  'hubungan-paragraf': 'Hubungan Antarkalimat & Paragraf',
  'tujuan-penulis': 'Tujuan & Perspektif Penulis',
  'evaluasi-argumen': 'Evaluasi Argumen & Fakta-Opini',
  'akurasi-relevansi': 'Keakuratan & Relevansi Informasi',
  'struktur-kebahasaan': 'Struktur & Kaidah Kebahasaan',
  'perbandingan-teks': 'Membandingkan Dua Teks (Multiteks)'
};

export type DifficultyLevel = 'mudah' | 'sedang' | 'sulit';

export type QuestionType = 'pilihan-ganda' | 'pilihan-ganda-kompleks' | 'benar-salah';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
}

export interface Question {
  id: string;
  stimulusTitle: string;
  stimulusText: string;
  stimulusSource?: string;
  stimulusText2?: string;
  stimulusTitle2?: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string | string[]; // 'A' or ['A', 'C'] for kompleks
  explanation: string;
  competency: Competency;
  subCompetency: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  misconceptions?: Record<string, string>; // Explanation for each specific distractor
  isValidated?: boolean;
  validationNotes?: string;
}

export interface LearningModule {
  id: string;
  category: 'Membaca dan Memahami Teks' | 'Analisis Teks' | 'Teks Bahasa Indonesia' | 'Kebahasaan' | 'Literasi Kritis';
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  objectives: string[];
  contentSections: {
    heading: string;
    body: string;
    keyPoints?: string[];
    example?: {
      title: string;
      text: string;
      analysis: string;
    };
  }[];
  summary: string[];
  checkUnderstanding: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  relatedCompetencies: Competency[];
}

export interface ExamSession {
  id: string;
  mode: 'cepat' | 'reguler' | 'intensif' | 'adaptif' | 'bank-custom';
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  startTime: number;
  endTime?: number;
  elapsedSeconds: number;
  answers: Record<string, any>;
  flagged: string[];
  completed: boolean;
  score: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  questionIds: string[];
  competencyScores: Record<Competency, { total: number; correct: number; percentage: number }>;
}

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface StudentProfile {
  name: string;
  nis: string; // Nomor Induk Siswa (NIS)
  nisn: string; // Nomor Induk Siswa Nasional (NISN)
  className: string;
  school: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  level: number;
  badges: Badge[];
  completedModuleIds: string[];
  examHistory: ExamSession[];
  practiceHistory: {
    questionId: string;
    selectedAnswer: any;
    isCorrect: boolean;
    timestamp: number;
    competency: Competency;
  }[];
}

export interface ClassStudentData {
  id: string;
  name: string;
  nis: string;
  nisn: string;
  className: string;
  testsCompleted: number;
  averageScore: number;
  highestScore: number;
  weakestCompetency: Competency;
  strongestCompetency: Competency;
  lastActive: string;
  totalXP?: number;
  streakDays?: number;
  latestExamResult?: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    date: string;
  };
}

export interface StudentActivityLog {
  id: string;
  studentName: string;
  nis: string;
  className: string;
  timestamp: number;
  activityType: 'login' | 'latihan' | 'modul' | 'simulasi';
  description: string;
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
}

export interface TeacherConfig {
  teacherName: string;
  nip: string;
  academicYear: string;
  defaultTimePerQuestionSeconds: number;
  schoolName: string;
  passGrade: number;
}
