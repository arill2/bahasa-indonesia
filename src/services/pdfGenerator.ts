import { jsPDF } from 'jspdf';
import { Competency, COMPETENCY_LABELS } from '../types';
import { analyzeStudentPerformance, ExamReportData } from './analysis';

export type { ExamReportData } from './analysis';

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

  const studentNis = data.studentNis || data.nisn || '';
  const teacherName = data.teacherName || 'Muhammad Ali Rahman, S.Pd., M.Pd.';
  const analysis = analyzeStudentPerformance(data);

  // =========================================================================
  // 1. KOP SURAT RESMI (SMA NEGERI 1 PINRANG)
  // =========================================================================
  let curY = 10;

  // Background Header Badge
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(marginX, curY, contentWidth, 23, 2, 2, 'FD');

  // Institution text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(87, 83, 78);
  doc.text('DINAS PENDIDIKAN PROVINSI SULAWESI SELATAN', pageWidth / 2, curY + 4.5, {
    align: 'center'
  });

  doc.setFontSize(12.5);
  doc.setTextColor(28, 25, 23);
  doc.text('SMA NEGERI 1 PINRANG', pageWidth / 2, curY + 10, {
    align: 'center'
  });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 113, 108);
  doc.text(
    'Lembar evaluasi pembelajaran Bahasa Indonesia Kelas XII',
    pageWidth / 2,
    curY + 14.5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110); // teal-700
  doc.text(
    'LEMBAR LAPORAN HASIL EVALUASI & NILAI AKHIR TKA BAHASA INDONESIA',
    pageWidth / 2,
    curY + 19.5,
    { align: 'center' }
  );

  curY += 25;

  // Official Double Line Divider
  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(0.7);
  doc.line(marginX, curY, marginX + contentWidth, curY);
  doc.setDrawColor(214, 211, 209);
  doc.setLineWidth(0.25);
  doc.line(marginX, curY + 1, marginX + contentWidth, curY + 1);

  curY += 4;

  // =========================================================================
  // 2. DATA IDENTITAS SISWA & INFORMASI UJIAN (TERSTRUKTUR RAPI)
  // =========================================================================
  const idBoxHeight = 20;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(214, 211, 209);
  doc.roundedRect(marginX, curY, contentWidth, idBoxHeight, 2, 2, 'FD');

  const col1X = marginX + 3.5;
  const col2X = marginX + 94;

  // Header badges inside Identitas
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 118, 110);
  doc.text('DATA IDENTITAS PESERTA DIDIK', col1X, curY + 4);
  doc.text('INFORMASI PELAKSANAAN EVALUASI', col2X, curY + 4);

  // Field details - Column 1
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text('Nama Siswa :', col1X, curY + 8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(data.studentName, col1X + 22, curY + 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text('NIS Siswa   :', col1X, curY + 12.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(studentNis || '-', col1X + 22, curY + 12.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text('Kelas XII   :', col1X, curY + 16.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 118, 110);
  doc.text(`${data.studentClass} (SMAN 1 Pinrang)`, col1X + 22, curY + 16.5);

  // Field details - Column 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text('Paket Ujian  :', col2X, curY + 8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(data.examTitle.slice(0, 42), col2X + 22, curY + 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text('Tanggal Uji  :', col2X, curY + 12.5);
  doc.setTextColor(28, 25, 23);
  doc.text(data.examDate, col2X + 22, curY + 12.5);

  const minutesTaken = Math.floor(data.timeSpentSeconds / 60);
  const secondsTaken = data.timeSpentSeconds % 60;
  doc.setTextColor(87, 83, 78);
  doc.text('Waktu Kerja  :', col2X, curY + 16.5);
  doc.setTextColor(28, 25, 23);
  doc.text(`${minutesTaken}m ${secondsTaken}s (Batas: ${data.durationMinutes} menit)`, col2X + 22, curY + 16.5);

  curY += idBoxHeight + 3.5;

  // =========================================================================
  // 3. KOTAK NILAI AKHIR EVALUASI (DITAMPILKAN SANGAT JELAS & ELEGAN)
  // =========================================================================
  const scoreBoxHeight = 26;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(marginX, curY, contentWidth, scoreBoxHeight, 2, 2, 'FD');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110);
  doc.text('NILAI AKHIR EVALUASI SISWA', marginX + 4.5, curY + 5);

  // Subtitle: Menunjukkan rasio jawaban benar dari total pertanyaan
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 113, 108);
  doc.text('Rasio Jawaban Benar dari Total Pertanyaan:', marginX + 4.5, curY + 9.5);

  // Bold Prominent Highlight: "X dari Y Soal Benar"
  doc.setFontSize(13.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
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
  doc.setFillColor(245, 245, 244);
  doc.roundedRect(marginX + 52.5, curY + 18.5, 24, 5, 1, 1, 'F');
  doc.setTextColor(87, 83, 78);
  doc.text(`Kosong: ${data.unansweredCount}`, marginX + 55, curY + 22);

  // Pill Predikat
  const [pr, pg, pb] = analysis.predicateColor;
  doc.setTextColor(pr, pg, pb);
  doc.text(`Predikat: ${analysis.predicate}`, marginX + 80, curY + 22);

  // Skor Box on Right Side
  const scoreBadgeW = 38;
  const scoreBadgeX = marginX + contentWidth - scoreBadgeW - 3.5;
  doc.setFillColor(15, 118, 110);
  doc.roundedRect(scoreBadgeX, curY + 3.5, scoreBadgeW, 19, 2, 2, 'F');

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(153, 246, 228);
  doc.text('SKOR AKHIR', scoreBadgeX + scoreBadgeW / 2, curY + 7.5, { align: 'center' });

  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  const safeScore = Number.isFinite(data.score) ? data.score : 0;
  doc.text(`${safeScore}`, scoreBadgeX + scoreBadgeW / 2, curY + 14.5, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(153, 246, 228);
  doc.text('Skala 0 - 100', scoreBadgeX + scoreBadgeW / 2, curY + 19, { align: 'center' });

  curY += scoreBoxHeight + 3.5;

  // =========================================================================
  // 4. DESKRIPSI KEMAMPUAN SISWA (PEDAGOGIS & JELAS)
  // =========================================================================
  const descLinesPre = doc.splitTextToSize(analysis.description, contentWidth - 7);
  const descBoxHeight = Math.max(22, descLinesPre.length * 3.2 + 8);
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(marginX, curY, contentWidth, descBoxHeight, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(41, 37, 36);
  doc.text('A. DESKRIPSI KEMAMPUAN & TINGKAT NALAR LITERASI SISWA', marginX + 3.5, curY + 4.5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(68, 64, 60);
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
  doc.setTextColor(41, 37, 36);
  doc.text('C. RINCIAN CAPAIAN PER MATERI KOMPETENSI TKA BAHASA INDONESIA', marginX, curY + 3);

  curY += 4.5;

  // Table Header
  const tableRowH = 4.3;
  doc.setFillColor(15, 118, 110);
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
    doc.setDrawColor(231, 229, 228);
    doc.line(marginX, curY + tableRowH, marginX + contentWidth, curY + tableRowH);

    doc.setFontSize(6.3);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(68, 64, 60);

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
  // 7. PENGESAHAN & TANDA TANGAN
  // =========================================================================
  const signCol1 = marginX + 10;
  const signCol2 = marginX + 115;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);

  doc.text('Mengetahui / Menyetujui,', signCol1, curY + 2.5);
  doc.text('Peserta Didik,', signCol1, curY + 6);

  doc.text(`Pinrang, ${data.examDate}`, signCol2, curY + 2.5);
  doc.text('Guru Pembimbing Bahasa Indonesia,', signCol2, curY + 6);

  curY += 16;

  // Student Sign
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(data.studentName, signCol1, curY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(120, 113, 108);
  doc.text(`NIS: ${studentNis || '-'} • Kelas: ${data.studentClass}`, signCol1, curY + 3.2);

  // Teacher signature column only when a real teacher name is supplied
  if (teacherName) {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 25, 23);
    doc.text(teacherName, signCol2, curY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.3);
    doc.setTextColor(120, 113, 108);
    doc.text('Guru Pembimbing Bahasa Indonesia', signCol2, curY + 3.2);
  }

  // Bottom Notice
  doc.setFontSize(5.8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(168, 162, 158);
  doc.text(
    '* Dokumen ini adalah lembar hasil evaluasi belajar Bahasa Indonesia Kelas XII SMAN 1 Pinrang dan bukan hasil resmi TKA.',
    marginX,
    pageHeight - 6.5
  );

  // Filename
  const cleanName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanClass = data.studentClass.replace(/[^a-zA-Z0-9]/g, '');
  const fileName = `Nilai_Akhir_TKA_${cleanName}_${cleanClass}.pdf`;

  doc.save(fileName);
}
