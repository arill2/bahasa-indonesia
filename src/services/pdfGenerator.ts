import { jsPDF } from 'jspdf';
import { Competency, COMPETENCY_LABELS } from '../types';

export interface ExamReportData {
  studentName: string;
  studentNis?: string; // Nomor Induk Siswa (NIS)
  nisn: string;        // Nomor Induk Siswa Nasional (NISN)
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
  score: number; // 0 - 100
  competencyScores: Record<
    Competency,
    { total: number; correct: number; percentage: number }
  >;
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
  const { score, totalQuestions, correctCount, competencyScores, studentName, studentClass } = data;

  let predicate = 'SANGAT MAHIR';
  let predicateColor: [number, number, number] = [16, 120, 60]; // emerald
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

  // Identify strong & weak topics
  const topicEntries = (Object.keys(competencyScores) as Competency[])
    .map((c) => ({
      competency: c,
      name: COMPETENCY_LABELS[c] || c,
      ...competencyScores[c],
      recommendation: TOPIC_RECOMMENDATIONS[c] || 'Perbanyak latihan soal terarah.'
    }))
    .filter((t) => t.total > 0);

  // Weak topics: percentage < 70 or lowest percentage
  const weakTopics = topicEntries
    .filter((t) => t.percentage < 70 || t.correct < t.total)
    .sort((a, b) => a.percentage - b.percentage);

  // Strong topics: percentage >= 70
  const strongTopics = topicEntries
    .filter((t) => t.percentage >= 70)
    .sort((a, b) => b.percentage - a.percentage);

  // Generate qualitative description
  let description = '';
  if (score >= 85) {
    description = `Ananda ${studentName} (${studentClass}) menunjukkan penguasaan nalar literasi TKA Bahasa Indonesia pada kategori ${narrativeLevel}. Peserta didik mampu menganalisis wacana berbobot HOTS dengan akurasi prima, mengidentifikasi hubungan logis antarkalimat, serta mengevaluasi argumen dan fakta-opini secara kritis. Kemampuan bernalar siswa sangat siap untuk menghadapi ujian seleksi nasional.`;
  } else if (score >= 70) {
    description = `Ananda ${studentName} (${studentClass}) menunjukkan penguasaan nalar literasi pada kategori ${narrativeLevel}. Siswa telah menguasai sebagian besar kompetensi pemahaman bacaan, penarikan inferensi, dan penentuan ide pokok dengan baik. Kendala minor tampak pada ketelitian membedakan pengecoh pada pilihan ganda kompleks yang dapat ditingkatkan melalui latihan terarah.`;
  } else if (score >= 55) {
    description = `Ananda ${studentName} (${studentClass}) berada pada tingkat pemahaman ${narrativeLevel}. Siswa dapat menemukan informasi tersurat dan gagasan utama umum dengan cukup baik, namun masih mengalami kendala dalam menarik simpulan tersirat dan mengevaluasi validitas bukti wacana. Disarankan membaca teks analitis dan modul konsep literasi secara bertahap.`;
  } else {
    description = `Ananda ${studentName} (${studentClass}) memerlukan bimbingan intensif pada materi fondasi nalar literasi TKA. Penguasaan konsep pokok seperti membedakan ide pokok dari kalimat penjelas, kohesi paragraf, dan struktur kalimat baku masih memerlukan pendampingan guru. Siswa disarankan memanfaatkan AI Tutor dan mempelajari rangkuman modul materi.`;
  }

  return {
    predicate,
    predicateColor,
    description,
    strongTopics,
    weakTopics
  };
}

export function generateExamReportPDF(data: ExamReportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm

  const studentNis = data.studentNis || data.nisn || '19283';
  const teacherName = data.teacherName || 'Muhammad Ali Rahman, S.Pd., M.Pd.';
  const analysis = analyzeStudentPerformance(data);

  // =========================================================================
  // 1. KOP SURAT RESMI (SMA NEGERI 1 PINRANG)
  // =========================================================================
  let curY = 10;

  // Background Header Badge
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginX, curY, contentWidth, 23, 2, 2, 'FD');

  // Institution text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('PEMERINTAH PROVINSI SULAWESI SELATAN • DINAS PENDIDIKAN', pageWidth / 2, curY + 4.5, {
    align: 'center'
  });

  doc.setFontSize(12.5);
  doc.setTextColor(15, 23, 42);
  doc.text('SMA NEGERI 1 PINRANG', pageWidth / 2, curY + 10, {
    align: 'center'
  });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Alamat: Jl. Urip Sumoharjo No. 34, Kab. Pinrang • Akreditasi A • NPSN: 40304620 • Pos: 91212',
    pageWidth / 2,
    curY + 14.5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(67, 56, 202); // indigo-700
  doc.text(
    'LEMBAR LAPORAN HASIL EVALUASI & NILAI AKHIR TKA BAHASA INDONESIA',
    pageWidth / 2,
    curY + 19.5,
    { align: 'center' }
  );

  curY += 25;

  // Official Double Line Divider
  doc.setDrawColor(67, 56, 202);
  doc.setLineWidth(0.7);
  doc.line(marginX, curY, marginX + contentWidth, curY);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.25);
  doc.line(marginX, curY + 1, marginX + contentWidth, curY + 1);

  curY += 4;

  // =========================================================================
  // 2. DATA IDENTITAS SISWA & INFORMASI UJIAN (TERSTRUKTUR RAPI)
  // =========================================================================
  const idBoxHeight = 20;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, curY, contentWidth, idBoxHeight, 2, 2, 'FD');

  const col1X = marginX + 3.5;
  const col2X = marginX + 94;

  // Header badges inside Identitas
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(67, 56, 202);
  doc.text('DATA IDENTITAS PESERTA DIDIK', col1X, curY + 4);
  doc.text('INFORMASI PELAKSANAAN EVALUASI', col2X, curY + 4);

  // Field details - Column 1
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Nama Siswa :', col1X, curY + 8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.studentName, col1X + 22, curY + 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('NIS Siswa   :', col1X, curY + 12.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(studentNis, col1X + 22, curY + 12.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Kelas XII   :', col1X, curY + 16.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(67, 56, 202);
  doc.text(`${data.studentClass} (SMAN 1 Pinrang)`, col1X + 22, curY + 16.5);

  // Field details - Column 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Paket Ujian  :', col2X, curY + 8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.examTitle, col2X + 22, curY + 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Tanggal Uji  :', col2X, curY + 12.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.examDate, col2X + 22, curY + 12.5);

  const minutesTaken = Math.floor(data.timeSpentSeconds / 60);
  const secondsTaken = data.timeSpentSeconds % 60;
  doc.setTextColor(71, 85, 105);
  doc.text('Waktu Kerja  :', col2X, curY + 16.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${minutesTaken}m ${secondsTaken}s (Batas: ${data.durationMinutes} menit)`, col2X + 22, curY + 16.5);

  curY += idBoxHeight + 3.5;

  // =========================================================================
  // 3. KOTAK NILAI AKHIR EVALUASI (DITAMPILKAN SANGAT JELAS & ELEGAN)
  // =========================================================================
  const scoreBoxHeight = 26;
  doc.setFillColor(245, 247, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(marginX, curY, contentWidth, scoreBoxHeight, 2, 2, 'FD');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(67, 56, 202);
  doc.text('NILAI AKHIR EVALUASI SISWA', marginX + 4.5, curY + 5);

  // Subtitle: Menunjukkan rasio jawaban benar dari total pertanyaan
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Rasio Jawaban Benar dari Total Pertanyaan:', marginX + 4.5, curY + 9.5);

  // Bold Prominent Highlight: "X dari Y Soal Benar"
  doc.setFontSize(13.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.correctCount} dari ${data.totalQuestions} Soal Benar`, marginX + 4.5, curY + 15.5);

  // Stats Pills (Benar, Salah, Kosong, Akurasi)
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');

  // Pill Benar
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(marginX + 4.5, curY + 18.5, 22, 5, 1, 1, 'F');
  doc.setTextColor(22, 101, 52);
  doc.text(`Benar: ${data.correctCount}`, marginX + 7, curY + 22);

  // Pill Salah
  doc.setFillColor(254, 226, 226);
  doc.roundedRect(marginX + 28.5, curY + 18.5, 22, 5, 1, 1, 'F');
  doc.setTextColor(185, 28, 28);
  doc.text(`Salah: ${data.incorrectCount}`, marginX + 31, curY + 22);

  // Pill Kosong
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(marginX + 52.5, curY + 18.5, 24, 5, 1, 1, 'F');
  doc.setTextColor(71, 85, 105);
  doc.text(`Kosong: ${data.unansweredCount}`, marginX + 55, curY + 22);

  // Pill Predikat
  const [pr, pg, pb] = analysis.predicateColor;
  doc.setTextColor(pr, pg, pb);
  doc.text(`Predikat: ${analysis.predicate}`, marginX + 80, curY + 22);

  // Skor Box on Right Side
  const scoreBadgeW = 38;
  const scoreBadgeX = marginX + contentWidth - scoreBadgeW - 3.5;
  doc.setFillColor(67, 56, 202);
  doc.roundedRect(scoreBadgeX, curY + 3.5, scoreBadgeW, 19, 2, 2, 'F');

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(224, 231, 255);
  doc.text('SKOR AKHIR', scoreBadgeX + scoreBadgeW / 2, curY + 7.5, { align: 'center' });

  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(`${data.score}`, scoreBadgeX + scoreBadgeW / 2, curY + 14.5, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(199, 210, 254);
  doc.text('Skala 0 - 100', scoreBadgeX + scoreBadgeW / 2, curY + 19, { align: 'center' });

  curY += scoreBoxHeight + 3.5;

  // =========================================================================
  // 4. DESKRIPSI KEMAMPUAN SISWA (PEDAGOGIS & JELAS)
  // =========================================================================
  const descBoxHeight = 22;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginX, curY, contentWidth, descBoxHeight, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('A. DESKRIPSI KEMAMPUAN & TINGKAT NALAR LITERASI SISWA', marginX + 3.5, curY + 4.5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(analysis.description, contentWidth - 7);
  doc.text(descLines, marginX + 3.5, curY + 9);

  curY += descBoxHeight + 3.5;

  // =========================================================================
  // 5. MATERI YANG PERLU DIASAH (DIAGNOSIS & REKOMENDASI TINDAK LANJUT)
  // =========================================================================
  const weakTopicsToShow = analysis.weakTopics.slice(0, 2);
  const weakBoxHeight = weakTopicsToShow.length > 0 ? 25 : 16;

  doc.setFillColor(254, 242, 242); // subtle rose tint
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(marginX, curY, contentWidth, weakBoxHeight, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(153, 27, 27);
  doc.text('B. MATERI YANG PERLU DIASAH (DIAGNOSIS & REKOMENDASI GURU PEMBIMBING)', marginX + 3.5, curY + 4.5);

  if (weakTopicsToShow.length === 0) {
    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    doc.text(
      'Sangat Baik! Seluruh materi kompetensi yang diujikan telah dikuasai dengan ketuntasan tinggi (>= 70%). Pertahankan konsistensi dengan berlatih wacana analitis HOTS tingkat lanjut.',
      marginX + 3.5,
      curY + 9.5
    );
  } else {
    let topicY = curY + 9;
    weakTopicsToShow.forEach((wt, idx) => {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(185, 28, 28);
      doc.text(`${idx + 1}. ${wt.name} (Akurasi: ${wt.correct}/${wt.total} Benar - ${wt.percentage}%)`, marginX + 3.5, topicY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.6);
      doc.setTextColor(68, 64, 60);
      const recText = doc.splitTextToSize(`   Saran Pembimbing: ${wt.recommendation}`, contentWidth - 7);
      doc.text(recText, marginX + 3.5, topicY + 3.5);

      topicY += 7.5;
    });
  }

  curY += weakBoxHeight + 3.5;

  // =========================================================================
  // 6. TABEL EVALUASI PENGUASAAN MATERI TKA (LENGKAP SEMUA KOMPETENSI)
  // =========================================================================
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('C. RINCIAN CAPAIAN PER MATERI KOMPETENSI TKA BAHASA INDONESIA', marginX, curY + 3);

  curY += 4.5;

  // Table Header
  const tableRowH = 4.3;
  doc.setFillColor(67, 56, 202);
  doc.rect(marginX, curY, contentWidth, tableRowH + 0.5, 'F');

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('NO', marginX + 2, curY + 3.3);
  doc.text('MATERI / KOMPETENSI LITERASI', marginX + 11, curY + 3.3);
  doc.text('TOTAL', marginX + 105, curY + 3.3, { align: 'center' });
  doc.text('BENAR', marginX + 122, curY + 3.3, { align: 'center' });
  doc.text('PERSENTASE', marginX + 144, curY + 3.3, { align: 'center' });
  doc.text('STATUS KETUNTASAN', marginX + 167, curY + 3.3, { align: 'center' });

  curY += tableRowH + 0.5;

  // Table rows for all competencies with questions
  const allCompKeys = Object.keys(data.competencyScores) as Competency[];
  const compWithQuestions = allCompKeys.filter((k) => data.competencyScores[k].total > 0);

  compWithQuestions.forEach((compKey, index) => {
    const stat = data.competencyScores[compKey];
    const isEven = index % 2 === 0;

    doc.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255);
    doc.rect(marginX, curY, contentWidth, tableRowH, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, curY + tableRowH, marginX + contentWidth, curY + tableRowH);

    doc.setFontSize(6.3);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    doc.text(`${index + 1}`, marginX + 2, curY + 3.1);
    doc.text(COMPETENCY_LABELS[compKey] || compKey, marginX + 11, curY + 3.1);
    doc.text(`${stat.total}`, marginX + 105, curY + 3.1, { align: 'center' });
    doc.text(`${stat.correct}`, marginX + 122, curY + 3.1, { align: 'center' });
    doc.text(`${stat.percentage}%`, marginX + 144, curY + 3.1, { align: 'center' });

    let statusText = 'Tuntas (Tinggi)';
    doc.setTextColor(22, 101, 52);
    if (stat.percentage < 50) {
      statusText = 'Perlu Bimbingan';
      doc.setTextColor(185, 28, 28);
    } else if (stat.percentage < 75) {
      statusText = 'Cukup / Perlu Asah';
      doc.setTextColor(194, 65, 12);
    }

    doc.setFont('helvetica', 'bold');
    doc.text(statusText, marginX + 167, curY + 3.1, { align: 'center' });

    curY += tableRowH;
  });

  curY += 4;

  // =========================================================================
  // 7. PENGESAHAN & TANDA TANGAN (MUHAMMAD ALI RAHMAN)
  // =========================================================================
  const signCol1 = marginX + 10;
  const signCol2 = marginX + 115;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  doc.text('Mengetahui / Menyetujui,', signCol1, curY + 2.5);
  doc.text('Peserta Didik,', signCol1, curY + 6);

  doc.text(`Pinrang, ${data.examDate}`, signCol2, curY + 2.5);
  doc.text('Guru Pembimbing Bahasa Indonesia,', signCol2, curY + 6);

  curY += 16;

  // Student Sign
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.studentName, signCol1, curY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(100, 116, 139);
  doc.text(`NIS: ${studentNis} • Kelas: ${data.studentClass}`, signCol1, curY + 3.2);

  // Teacher Sign (MUHAMMAD ALI RAHMAN)
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(teacherName, signCol2, curY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(100, 116, 139);
  doc.text('NIP. 19820315 200801 1 012 • SMA Negeri 1 Pinrang', signCol2, curY + 3.2);

  // Bottom Notice
  doc.setFontSize(5.8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184);
  doc.text(
    '* Dokumen ini adalah lembar hasil resmi evaluasi belajar Bahasa Indonesia Kelas XII SMAN 1 Pinrang (Format Standar A4).',
    marginX,
    pageHeight - 6.5
  );

  // Filename
  const cleanName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanClass = data.studentClass.replace(/[^a-zA-Z0-9]/g, '');
  const fileName = `Nilai_Akhir_TKA_${cleanName}_${cleanClass}.pdf`;

  doc.save(fileName);
}
