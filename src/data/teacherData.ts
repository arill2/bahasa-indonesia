import { ClassStudentData, TeacherConfig, Competency } from '../types';

export const INITIAL_TEACHER_CONFIG: TeacherConfig = {
  teacherName: 'Muhammad Ali Rahman, S.Pd., M.Pd.',
  nip: '',
  academicYear: '2025/2026',
  schoolName: 'SMAN 1 PINRANG',
  passGrade: 75
};

export const INITIAL_STUDENTS: ClassStudentData[] = [];

export const CLASS_COMPETENCY_STATS: Record<Competency, { averageAccuracy: number; totalAssessed: number }> = {
  'ide-pokok': { averageAccuracy: 0, totalAssessed: 0 },
  'tersurat-tersirat': { averageAccuracy: 0, totalAssessed: 0 },
  'simpulan-makna': { averageAccuracy: 0, totalAssessed: 0 },
  'struktur-kebahasaan': { averageAccuracy: 0, totalAssessed: 0 },
  'hubungan-paragraf': { averageAccuracy: 0, totalAssessed: 0 },
  'tujuan-penulis': { averageAccuracy: 0, totalAssessed: 0 },
  'perbandingan-teks': { averageAccuracy: 0, totalAssessed: 0 },
  'akurasi-relevansi': { averageAccuracy: 0, totalAssessed: 0 },
  'evaluasi-argumen': { averageAccuracy: 0, totalAssessed: 0 }
};
