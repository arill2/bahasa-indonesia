import { ClassStudentData, TeacherConfig, Competency } from '../types';

export const INITIAL_TEACHER_CONFIG: TeacherConfig = {
  teacherName: 'Muhammad Ali Rahman, S.Pd., M.Pd.',
  nip: '19820315 200801 1 012',
  academicYear: '2025/2026, Semester Genap',
  defaultTimePerQuestionSeconds: 100,
  schoolName: 'SMAN 1 PINRANG',
  passGrade: 75
};

export const INITIAL_STUDENTS: ClassStudentData[] = [
  {
    id: 'std-1',
    name: 'Andi Muhammad Fadhil',
    nis: '19283',
    nisn: '0068412091',
    className: 'XII A',
    testsCompleted: 6,
    averageScore: 88,
    highestScore: 95,
    weakestCompetency: 'evaluasi-argumen',
    strongestCompetency: 'ide-pokok',
    lastActive: 'Hari ini, 14:20',
    totalXP: 450,
    streakDays: 4,
    latestExamResult: {
      score: 95,
      correctCount: 19,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-2',
    name: 'Nur Aisyah Ramadhani',
    nis: '19284',
    nisn: '0067321455',
    className: 'XII A',
    testsCompleted: 5,
    averageScore: 92,
    highestScore: 96,
    weakestCompetency: 'perbandingan-teks',
    strongestCompetency: 'simpulan-makna',
    lastActive: 'Hari ini, 11:05',
    totalXP: 520,
    streakDays: 6,
    latestExamResult: {
      score: 96,
      correctCount: 24,
      totalQuestions: 25,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-3',
    name: 'Muhammad Ilham Saputra',
    nis: '19285',
    nisn: '0065498123',
    className: 'XII B',
    testsCompleted: 4,
    averageScore: 74,
    highestScore: 82,
    weakestCompetency: 'evaluasi-argumen',
    strongestCompetency: 'struktur-kebahasaan',
    lastActive: 'Kemarin, 16:45',
    totalXP: 310,
    streakDays: 2,
    latestExamResult: {
      score: 80,
      correctCount: 16,
      totalQuestions: 20,
      date: '07 Oktober 2026'
    }
  },
  {
    id: 'std-4',
    name: 'Siti Rahmawati Putri',
    nis: '19286',
    nisn: '0068991204',
    className: 'XII C',
    testsCompleted: 7,
    averageScore: 85,
    highestScore: 90,
    weakestCompetency: 'hubungan-paragraf',
    strongestCompetency: 'tersurat-tersirat',
    lastActive: 'Hari ini, 09:12',
    totalXP: 480,
    streakDays: 5,
    latestExamResult: {
      score: 90,
      correctCount: 18,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-5',
    name: 'Ahmad Fauzi Baso',
    nis: '19287',
    nisn: '0061298401',
    className: 'XII D',
    testsCompleted: 3,
    averageScore: 68,
    highestScore: 75,
    weakestCompetency: 'tujuan-penulis',
    strongestCompetency: 'ide-pokok',
    lastActive: '2 hari lalu',
    totalXP: 210,
    streakDays: 1,
    latestExamResult: {
      score: 70,
      correctCount: 14,
      totalQuestions: 20,
      date: '06 Oktober 2026'
    }
  },
  {
    id: 'std-6',
    name: 'Dewi Lestari Mansyur',
    nis: '19288',
    nisn: '0063419082',
    className: 'XII E',
    testsCompleted: 6,
    averageScore: 79,
    highestScore: 86,
    weakestCompetency: 'evaluasi-argumen',
    strongestCompetency: 'simpulan-makna',
    lastActive: 'Hari ini, 15:30',
    totalXP: 410,
    streakDays: 3,
    latestExamResult: {
      score: 85,
      correctCount: 17,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-7',
    name: 'Rian Hidayatullah',
    nis: '19289',
    nisn: '0064551920',
    className: 'XII F',
    testsCompleted: 5,
    averageScore: 71,
    highestScore: 78,
    weakestCompetency: 'perbandingan-teks',
    strongestCompetency: 'struktur-kebahasaan',
    lastActive: 'Kemarin, 19:10',
    totalXP: 290,
    streakDays: 2,
    latestExamResult: {
      score: 75,
      correctCount: 15,
      totalQuestions: 20,
      date: '07 Oktober 2026'
    }
  },
  {
    id: 'std-8',
    name: 'Zahra Meilani Lasinrang',
    nis: '19290',
    nisn: '0069018442',
    className: 'XII G',
    testsCompleted: 8,
    averageScore: 94,
    highestScore: 100,
    weakestCompetency: 'akurasi-relevansi',
    strongestCompetency: 'evaluasi-argumen',
    lastActive: 'Hari ini, 16:02',
    totalXP: 640,
    streakDays: 7,
    latestExamResult: {
      score: 100,
      correctCount: 20,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-9',
    name: 'Fikram Nurfadillah',
    nis: '19291',
    nisn: '0067823901',
    className: 'XII H',
    testsCompleted: 5,
    averageScore: 83,
    highestScore: 90,
    weakestCompetency: 'struktur-kebahasaan',
    strongestCompetency: 'tersurat-tersirat',
    lastActive: 'Hari ini, 10:15',
    totalXP: 370,
    streakDays: 4,
    latestExamResult: {
      score: 85,
      correctCount: 17,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-10',
    name: 'Maghfira Syahrir',
    nis: '19292',
    nisn: '0068341928',
    className: 'XII I',
    testsCompleted: 6,
    averageScore: 89,
    highestScore: 95,
    weakestCompetency: 'evaluasi-argumen',
    strongestCompetency: 'simpulan-makna',
    lastActive: 'Kemarin, 14:40',
    totalXP: 430,
    streakDays: 4,
    latestExamResult: {
      score: 90,
      correctCount: 18,
      totalQuestions: 20,
      date: '07 Oktober 2026'
    }
  },
  {
    id: 'std-11',
    name: 'Reski Ananda Putri',
    nis: '19293',
    nisn: '0069123847',
    className: 'XII J',
    testsCompleted: 4,
    averageScore: 77,
    highestScore: 85,
    weakestCompetency: 'perbandingan-teks',
    strongestCompetency: 'ide-pokok',
    lastActive: 'Hari ini, 13:00',
    totalXP: 320,
    streakDays: 3,
    latestExamResult: {
      score: 80,
      correctCount: 16,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-12',
    name: 'Muh. Al-Fatih Batara',
    nis: '19294',
    nisn: '0064912039',
    className: 'XII K',
    testsCompleted: 7,
    averageScore: 91,
    highestScore: 98,
    weakestCompetency: 'hubungan-paragraf',
    strongestCompetency: 'evaluasi-argumen',
    lastActive: 'Hari ini, 15:45',
    totalXP: 510,
    streakDays: 5,
    latestExamResult: {
      score: 95,
      correctCount: 19,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  },
  {
    id: 'std-13',
    name: 'Nurul Annisa Cempa',
    nis: '19295',
    nisn: '0067341902',
    className: 'XII L',
    testsCompleted: 6,
    averageScore: 86,
    highestScore: 92,
    weakestCompetency: 'tujuan-penulis',
    strongestCompetency: 'tersurat-tersirat',
    lastActive: 'Hari ini, 16:20',
    totalXP: 440,
    streakDays: 4,
    latestExamResult: {
      score: 90,
      correctCount: 18,
      totalQuestions: 20,
      date: '08 Oktober 2026'
    }
  }
];

export const CLASS_COMPETENCY_STATS: Record<Competency, { averageAccuracy: number; totalAssessed: number }> = {
  'ide-pokok': { averageAccuracy: 86, totalAssessed: 142 },
  'tersurat-tersirat': { averageAccuracy: 81, totalAssessed: 138 },
  'simpulan-makna': { averageAccuracy: 76, totalAssessed: 130 },
  'struktur-kebahasaan': { averageAccuracy: 78, totalAssessed: 140 },
  'hubungan-paragraf': { averageAccuracy: 71, totalAssessed: 115 },
  'tujuan-penulis': { averageAccuracy: 69, totalAssessed: 120 },
  'perbandingan-teks': { averageAccuracy: 67, totalAssessed: 110 },
  'akurasi-relevansi': { averageAccuracy: 65, totalAssessed: 98 },
  'evaluasi-argumen': { averageAccuracy: 61, totalAssessed: 125 }
};
