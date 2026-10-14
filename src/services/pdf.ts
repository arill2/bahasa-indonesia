import type { ExamReportData } from './analysis';

/**
 * PDF dibuat lewat dynamic import: kode jsPDF + html2canvas (~380 kB)
 * hanya dimuat saat pengguna menekan tombol unduh, bukan saat halaman dibuka.
 */
export async function downloadExamReportPDF(data: ExamReportData): Promise<void> {
  const { generateExamReportPDF } = await import('./pdfGenerator');
  generateExamReportPDF(data);
}