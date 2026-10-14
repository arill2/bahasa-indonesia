import { Competency, COMPETENCY_LABELS } from '../types';

export interface ExamReportData {
  studentName: string;
  studentNis?: string;
  nisn: string;
  studentClass: string;
  schoolName: string;
  examTitle: string;
  examDate: string;
  durationMinutes: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  competencyScores: Record<Competency, { total: number; correct: number; percentage: number }>;
  teacherName?: string;
}

export interface AnalysisResult {
  predicate: string;
  predicateColor: [number, number, number];
  description: string;
  strongTopics: {
    competency: Competency;
    name: string;
    correct: number;
    total: number;
    percentage: number;
  }[];
  weakTopics: {
    competency: Competency;
    name: string;
    correct: number;
    total: number;
    percentage: number;
    recommendation: string;
  }[];
}

const TOPIC_RECOMMENDATIONS: Record<Competency, string> = {
  'ide-pokok':
    'Latih teknik skimming & scanning untuk membedakan gagasan pokok sentral dari rincian penjelas dan ilustrasi wacana.',
  'tersurat-tersirat':
    'Perkuat inferensi membaca makna implisit dan maksud tersirat yang tidak dituliskan secara eksplisit dalam teks.',
  'simpulan-makna':
    'Asah kemampuan menarik simpulan deduktif/induktif dan memahami makna kata berdasar konteks pemakaian kalimat.',
  'hubungan-paragraf':
    'Tinjau kembali konjungsi antarkalimat dan kohesi-koherensi alur logika penalaran antarkalimat maupun antarparagraf.',
  'tujuan-penulis':
    'Cermati nada (tone) tulisan, sudut pandang objektif/subjektif, serta tendensi persuasif penulis dalam teks.',
  'evaluasi-argumen':
    'Tingkatkan kepekaan memilah fakta objektif dari opini dan menguji validitas bukti yang diajukan oleh penulis.',
  'akurasi-relevansi':
    'Periksa konsistensi data pendukung (tabel/pernyataan) dan waspadai argumen yang mengandung generalisasi keliru.',
  'struktur-kebahasaan':
    'Pelajari kaidah PUEBI/EYD V, kalimat efektif (kesepadanan & keparalelan), pembentukan kata berimbuhan meN-, serta ejaan baku.',
  'perbandingan-teks':
    'Latih analisis komparasi multiteks untuk memetakan persamaan dan perbedaan fokus dari dua teks bertema serumpun.'
};

export function analyzeStudentPerformance(data: ExamReportData): AnalysisResult {
  const { score, competencyScores, studentName, studentClass } = data;

  let predicate = 'SANGAT MAHIR';
  let predicateColor: [number, number, number] = [16, 120, 60];
  let narrativeLevel = 'Sangat Tinggi (Advanced)';

  if (score >= 85) {
    predicate = 'SANGAT MAHIR (Tingkat Penalaran Tinggi)';
    predicateColor = [16, 120, 60];
    narrativeLevel = 'Sangat Tinggi (Advanced)';
  } else if (score >= 70) {
    predicate = 'MAHIR (Tingkat Penalaran Mandiri)';
    predicateColor = [30, 90, 180];
    narrativeLevel = 'Tinggi / Mandiri (Proficient)';
  } else if (score >= 55) {
    predicate = 'CAKAP (Tingkat Penalaran Berkembang)';
    predicateColor = [200, 120, 20];
    narrativeLevel = 'Sedang / Berkembang (Developing)';
  } else {
    predicate = 'PERLU PENDAMPINGAN (Fondasi Perlu Diperkuat)';
    predicateColor = [190, 40, 40];
    narrativeLevel = 'Awal / Perlu Penguatan (Needs Improvement)';
  }

  const topicEntries = (Object.keys(competencyScores) as Competency[])
    .map((c) => ({
      competency: c,
      name: COMPETENCY_LABELS[c] || c,
      ...competencyScores[c],
      recommendation: TOPIC_RECOMMENDATIONS[c] || 'Perbanyak latihan soal terarah.'
    }))
    .filter((t) => t.total > 0);

  const weakTopics = topicEntries
    .filter((t) => t.percentage < 70 || t.correct < t.total)
    .sort((a, b) => a.percentage - b.percentage);

  const strongTopics = topicEntries
    .filter((t) => t.percentage >= 70)
    .sort((a, b) => b.percentage - a.percentage);

  let description = '';
  if (score >= 85) {
    description = `Ananda ${studentName} (${studentClass}) menunjukkan penguasaan nalar literasi TKA Bahasa Indonesia pada kategori ${narrativeLevel}. Peserta didik mampu menganalisis wacana berbobot HOTS dengan akurasi tinggi, mengidentifikasi hubungan logis antarkalimat, serta mengevaluasi argumen dan fakta-opini secara kritis.`;
  } else if (score >= 70) {
    description = `Ananda ${studentName} (${studentClass}) menunjukkan penguasaan nalar literasi pada kategori ${narrativeLevel}. Siswa telah menguasai sebagian besar kompetensi pemahaman bacaan, penarikan inferensi, dan penentuan ide pokok dengan baik. Kendala minor tampak pada ketelitian membedakan pengecoh pada pilihan ganda kompleks yang dapat ditingkatkan melalui latihan terarah.`;
  } else if (score >= 55) {
    description = `Ananda ${studentName} (${studentClass}) berada pada tingkat pemahaman ${narrativeLevel}. Siswa dapat menemukan informasi tersurat dan gagasan utama umum dengan cukup baik, namun masih mengalami kendala dalam menarik simpulan tersirat dan mengevaluasi validitas bukti wacana. Disarankan membaca teks analitis dan modul konsep literasi secara bertahap.`;
  } else {
    description = `Ananda ${studentName} (${studentClass}) memerlukan bimbingan intensif pada materi fondasi nalar literasi TKA. Penguasaan konsep pokok seperti membedakan ide pokok dari kalimat penjelas, kohesi paragraf, dan struktur kalimat baku masih memerlukan pendampingan guru. Siswa disarankan membaca rangkuman modul materi secara bertahap.`;
  }

  return {
    predicate,
    predicateColor,
    description,
    strongTopics,
    weakTopics
  };
}