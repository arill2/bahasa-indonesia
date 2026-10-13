export interface TkaStrategyTip {
  id: string;
  category: 'Membaca Stimulus' | 'Teknik Menjawab' | 'Manajemen Waktu' | 'Evaluasi Nalar';
  title: string;
  icon: string;
  badge: string;
  summary: string;
  steps: string[];
  exampleCase: {
    questionContext: string;
    trap: string;
    smartSolution: string;
  };
}

export const TKA_STRATEGY_TIPS: TkaStrategyTip[] = [
  {
    id: 'tip-1',
    category: 'Membaca Stimulus',
    title: 'Teknik "Pertanyaan Dulu, Stimulus Kemudian"',
    icon: 'BookOpen',
    badge: 'Efisiensi Baca',
    summary: 'Jangan langsung membaca teks panjang dari awal sampai akhir tanpa tujuan. Bacalah batang soal (stem) terlebih dahulu untuk memandu pandangan Anda.',
    steps: [
      'Baca pertanyaan secara teliti untuk mengidentifikasi kata kunci (misal: "tujuan penulis", "paragraf kedua", "simpulan", atau "perbandingan teks").',
      'Identifikasi tipe informasi yang dicari: apakah fakta tersurat (angka/tahun), inferensi tersirat, atau hubungan kausalitas?',
      'Lakukan pemindaian (scanning) terarah pada bagian paragraf yang memuat kata kunci pertanyaan.',
      'Tandai kalimat kunci dan baca dua kalimat di sekitar kata kunci untuk mendapatkan konteks utuh.'
    ],
    exampleCase: {
      questionContext: 'Soal: "Berdasarkan paragraf 3, apa dampak alih fungsi lahan bakau terhadap pasokan air tanah?"',
      trap: 'Membaca ulang paragraf 1 dan 2 dari awal yang memakan waktu 2 menit.',
      smartSolution: 'Langsung lompat ke paragraf 3, cari kata kunci "pasokan air tanah" atau "intrusi air asin", dan temukan jawaban dalam 20 detik.'
    }
  },
  {
    id: 'tip-2',
    category: 'Teknik Menjawab',
    title: 'Mendeteksi 4 Jenis Distraktor (Pilihan Pengecoh)',
    icon: 'ShieldAlert',
    badge: 'Ketelitian',
    summary: 'Penyusun soal TKA profesional sengaja merancang pilihan jawaban pengecoh yang tampak sangat meyakinkan tetapi memiliki cacat logika tersembunyi.',
    steps: [
      'Distraktor Terlalu Luas (Over-generalization): Menggunakan kata absolut seperti "selalu", "seluruh", "pasti", padahal teks menggunakan kata "sebagian besar" atau "cenderung".',
      'Distraktor Benar di Dunia Nyata, Salah dalam Teks: Fakta di opsi benar menurut pengetahuan umum, tetapi TIDAK didukung oleh data di dalam stimulus.',
      'Distraktor Membalik Hubungan Sebab-Akibat: Yang seharusnya menjadi penyebab malah dijadikan akibat, atau sebaliknya.',
      'Distraktor Opsi Pengulangan Sebagian: Opsi hanya memuat separuh fakta penting dan sengaja menghilangkan syarat pentingnya.'
    ],
    exampleCase: {
      questionContext: 'Teks menyebutkan "Banyak petani muda mulai memakai drone...", opsi pengecoh menulis "Seluruh petani di Sulawesi Selatan wajib memakai drone".',
      trap: 'Terburu-buru memilih opsi karena melihat ada kata "petani" dan "drone".',
      smartSolution: 'Periksa modalitas kuantitas: "Banyak petani muda" tidak sama dengan "Seluruh petani wajib". Gugurkan opsi tersebut.'
    }
  },
  {
    id: 'tip-3',
    category: 'Evaluasi Nalar',
    title: 'Menembus Soal Inferensi & Informasi Tersirat',
    icon: 'Brain',
    badge: 'Penalaran HOTS',
    summary: 'Soal inferensi menanyakan pesan yang TIDAK tertulis secara kata demi kata, melainkan harus disimpulkan melalui penalaran deduktif atau induktif.',
    steps: [
      'Temukan premis mayor dan premis minor yang disajikan penulis.',
      'Ajukan pertanyaan kritis: "Jika informasi A benar, dan informasi B terjadi, apa konsekuensi yang tak terelakkan?"',
      'Pastikan inferensi Anda memiliki pijakan bukti (evidence-based) di dalam teks, bukan imajinasi bebas.',
      'Pilihlah simpulan yang paling hemat asumsi (prinsip Occam’s Razor).'
    ],
    exampleCase: {
      questionContext: 'Teks: "Penurunan populasi kepiting bakau memicu keluhan nelayan mengenai anjloknya tangkapan harian."',
      trap: 'Memilih simpulan liar: "Nelayan akan beralih profesi menjadi pedagang pakaian."',
      smartSolution: 'Inferensi logis terdekat: "Keseimbangan ekosistem mangrove berkorelasi langsung dengan pendapatan nelayan tradisional setempat."'
    }
  },
  {
    id: 'tip-4',
    category: 'Manajemen Waktu',
    title: 'Manajemen Waktu & Strategi Menandai (Flagging)',
    icon: 'Clock',
    badge: 'Strategi Ujian',
    summary: 'Alokasikan waktu secara disiplin: rata-rata 1,5 hingga 2 menit per nomor. Jangan biarkan satu soal sulit mencuri waktu untuk 3 soal mudah lainnya.',
    steps: [
      'Babak 1 (Soal Cepat): Kerjakan terlebih dahulu soal-soal fakta tersurat, makna kata/istilah, dan perbaikan kalimat efektif (30-60 detik per soal).',
      'Babak 2 (Soal Sedang): Kerjakan soal ide pokok, simpulan paragraf tunggal, dan fakta vs opini.',
      'Babak 3 (Soal Berbobot Tinggi): Untuk soal multiteks dan analisis argumen panjang, jika ragu lebih dari 1,5 menit, pilih opsi terbaik sementara, klik tombol "Tandai Soal", dan lanjutkan.',
      'Gunakan sisa 5-10 menit di akhir untuk meninjau hanya nomor-nomor yang bertanda kuning (Ditandai).'
    ],
    exampleCase: {
      questionContext: 'Menghadapi soal multiteks dengan 2 teks bacaan panjang di nomor 15 dari 40 soal.',
      trap: 'Terdiam memikirkan perbedaan argumen selama 4 menit penuh hingga panik kehabisan waktu di nomor 35.',
      smartSolution: 'Kerjakan draf jawaban terbaik dalam 1,5 menit, klik [Tandai Soal], amankan nomor 16-40, lalu kembali saat waktu tersisa.'
    }
  }
];
