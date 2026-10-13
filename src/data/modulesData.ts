import { LearningModule } from '../types';

export const MODULES_DATA: LearningModule[] = [
  {
    id: 'mod-1',
    category: 'Membaca dan Memahami Teks',
    title: 'Ide Pokok, Gagasan Utama, dan Simpulan Teks',
    subtitle: 'Strategi membedakan kalimat utama, gagasan penjelas, dan merumuskan simpulan logis',
    estimatedMinutes: 20,
    objectives: [
      'Membedakan ide pokok eksplisit (tersurat) dan implisit (tersirat) dalam paragraf.',
      'Mengidentifikasi jenis paragraf (deduktif, induktif, campuran) dengan akurat.',
      'Menarik simpulan komprehensif berdasarkan fakta dan premis yang disajikan penulis.'
    ],
    contentSections: [
      {
        heading: '1. Hakikat Ide Pokok vs Gagasan Penjelas',
        body: 'Ide pokok (gagasan utama) adalah pernyataan kunci yang menjadi pengendali seluruh isi paragraf. Gagasan utama bersifat umum dan membutuhkan kalimat penjelas (supporting details) yang memberikan rincian faktual, data statistik, contoh kasus, atau sebab-akibat.',
        keyPoints: [
          'Paragraf Deduktif: Gagasan utama berada di awal paragraf, diikuti penjelasan khusus.',
          'Paragraf Induktif: Dimulai dengan rincian khusus dan diakhiri dengan simpulan/kalimat utama di akhir.',
          'Paragraf Ineratif: Kalimat utama berada di tengah-tengah paragraf.',
          'Paragraf Campuran (Deduktif-Induktif): Gagasan utama di awal ditegaskan kembali di akhir paragraf.'
        ],
        example: {
          title: 'Contoh Analisis Paragraf',
          text: 'Peralihan menuju energi terbarukan bukan lagi sekadar pilihan moral, melainkan keharusan strategis demi ketahanan ekonomi nasional. Ketergantungan terhadap bahan bakar fosil terus menguras devisa negara untuk subsidi energi dan mempercepat laju perubahan iklim. Sebaliknya, investasi pada energi surya dan angin di berbagai pelosok nusantara terbukti mampu menciptakan lapangan kerja hijau serta menjamin kemandirian energi jangka panjang.',
          analysis: 'Ide pokok terletak pada kalimat pertama: Peralihan energi terbarukan merupakan keharusan strategis ketahanan ekonomi. Kalimat kedua dan ketiga merupakan gagasan penjelas yang menguraikan alasan (dampak negatif fosil vs manfaat ekonomi energi surya/angin).'
        }
      },
      {
        heading: '2. Cara Menarik Simpulan yang Tepat',
        body: 'Simpulan bukan sekadar ringkasan kalimat terakhir. Simpulan yang valid dalam Asesmen TKA adalah pernyataan logis yang mencakup seluruh benang merah teks, tidak menambahkan opini di luar teks, dan tidak bersifat terlalu sempit atau terlalu luas.',
        keyPoints: [
          'Waspadai Jebakan Pilihan: Jangan memilih opsi yang mengandung fakta benar menurut dunia nyata tetapi TIDAK didukung oleh data dalam teks.',
          'Waspadai Generalisasi Berlebihan: Hindari simpulan yang memakai kata "selalu", "seluruhnya", atau "pasti" kecuali teks memang menegaskan demikian.'
        ]
      }
    ],
    summary: [
      'Ide pokok mengendalikan isi paragraf dan bersifat paling umum.',
      'Gagasan penjelas mengelaborasi ide pokok dengan bukti, contoh, atau argumen.',
      'Simpulan yang baik merangkum premis utama secara objektif tanpa asumsi liar.'
    ],
    checkUnderstanding: [
      {
        question: 'Manakah kriteria simpulan teks yang paling valid dalam asesmen membaca kritis?',
        options: [
          'Mengulang persis kalimat terakhir pada paragraf penutup.',
          'Pernyataan logis yang merangkum premis utama dan didukung langsung oleh fakta dalam stimulus.',
          'Pendapat pribadi pembaca yang relevan dengan topik umum teks.',
          'Rangkuman yang memilih fakta yang paling sensasional.'
        ],
        correctIndex: 1,
        explanation: 'Simpulan yang valid adalah simpulan inferensial yang ditopang oleh premis-premis faktual dalam teks tanpa mengandalkan asumsi di luar teks.'
      }
    ],
    relatedCompetencies: ['ide-pokok', 'simpulan-makna']
  },
  {
    id: 'mod-2',
    category: 'Analisis Teks',
    title: 'Evaluasi Argumen, Fakta vs Opini, dan Bukti',
    subtitle: 'Menganalisis kekuatan penalaran penulis, mendeteksi bias, dan menguji keabsahan bukti',
    estimatedMinutes: 25,
    objectives: [
      'Membedakan fakta objektif terverifikasi dengan opini/klaim subjektif.',
      'Mengevaluasi apakah premis yang disodorkan penulis mendukung klaim utama secara logis.',
      'Mengidentifikasi kesesatan berpikir (logical fallacy) dalam teks argumentatif.'
    ],
    contentSections: [
      {
        heading: '1. Membedakan Fakta dan Opini dalam Teks Kritis',
        body: 'Fakta adalah keadaan nyata yang telah terverifikasi melalui data empiris, tanggal, angka pasti, atau peristiwa konkret. Opini adalah sikap pandang, perkiraan, penilaian personal, atau anjuran penulis yang belum dapat diukur secara seragam.',
        keyPoints: [
          'Ciri Fakta: Menyebut angka, tanggal, rujukan lembaga terpercaya, tidak mengandung kata nilai relatif.',
          'Ciri Opini: Menggunakan kata modalitas ("sebaiknya", "tampaknya", "dapat dikatakan", "luar biasa", "buruk").'
        ],
        example: {
          title: 'Contoh Pemilahan Fakta vs Opini',
          text: '(1) Berdasarkan laporan BPS tahun 2024, produksi padi di Kabupaten Pinrang mencapai lebih dari 500.000 ton gabah kering giling. (2) Capaian ini menunjukkan bahwa Pinrang merupakan lumbung pangan terbaik yang patut dijadikan teladan nasional. (3) Keberhasilan ini didorong oleh modernisasi sistem irigasi teknis di Bendung Benteng.',
          analysis: 'Kalimat (1) adalah fakta (data BPS terverifikasi). Kalimat (2) mengandung opini subjektif ("terbaik yang patut dijadikan teladan"). Kalimat (3) adalah pernyataan eksplanatif kausalitas.'
        }
      },
      {
        heading: '2. Kekuatan Argumen dan Relevansi Bukti',
        body: 'Argumen yang kuat memenuhi tiga syarat: (1) Akseptabilitas premis (premisnya benar/dapat dipercaya), (2) Relevansi bukti (bukti berhubungan langsung dengan klaim), dan (3) Kecukupan alasan (bukti cukup banyak dan tidak melompat pada kesimpulan tergesa-gesa).',
        keyPoints: [
          'Uji Relevansi: Apakah data yang disajikan benar-benar menjawab persoalan yang dipertanyakan?',
          'Uji Keberpihakan: Apakah penulis sengaja mengabaikan fakta pembanding untuk memenangkan sudut pandangnya?'
        ]
      }
    ],
    summary: [
      'Fakta dapat diuji kebenarannya secara objektif; opini adalah penafsiran atau pertimbangan nilai.',
      'Argumen yang sahih harus memiliki hubungan inferensial langsung antara premis dan konklusi.'
    ],
    checkUnderstanding: [
      {
        question: 'Manakah di antara pernyataan berikut yang tergolong fakta teruji?',
        options: [
          'Sektor pertanian Pinrang diperkirakan akan berkembang pesat tahun depan.',
          'Bendung Benteng diresmikan pembangunannya pada masa kolonial Belanda tahun 1939.',
          'Sistem pertanian modern selalu lebih disukai petani daripada cara tradisional.',
          'Pinrang adalah daerah paling nyaman untuk bertani di Sulawesi Selatan.'
        ],
        correctIndex: 1,
        explanation: 'Pernyataan tentang tahun peresmian Bendung Benteng memuat data historis konkret yang dapat diverifikasi dokumen resmi.'
      }
    ],
    relatedCompetencies: ['evaluasi-argumen', 'akurasi-relevansi']
  },
  {
    id: 'mod-3',
    category: 'Teks Bahasa Indonesia',
    title: 'Teks Editorial & Analisis Sudut Pandang Redaksi',
    subtitle: 'Membedah struktur tesis-argumentasi-penegasan ulang serta sikap redaksi terhadap isu publik',
    estimatedMinutes: 20,
    objectives: [
      'Menganalisis struktur teks editorial (pengenalan isu, argumentasi, dan penegasan).',
      'Mengungkap perspektif dan sikap lembaga redaksi terhadap isu kontemporer.',
      'Menilai keberimbangan ulasan redaksi terhadap pihak-pihak terkait.'
    ],
    contentSections: [
      {
        heading: '1. Anatomi Teks Editorial',
        body: 'Teks editorial adalah opini resmi suatu institusi media massa terhadap persoalan aktual, fenomenal, dan kontroversial yang sedang menjadi sorotan masyarakat. Bahasa editorial lugas, santun, tetapi kritis dan persuasif.',
        keyPoints: [
          'Pengenalan Isu (Tesis): Menyoroti peristiwa hangat dan posisi redaksi terhadap isu.',
          'Penyampaian Argumen: Rangkaian bukti, telaah kritis, data pendukung, dan tanggapan atas dalih pihak lain.',
          'Penegasan Ulang: Rekomendasi solusi, saran konstruktif, atau harapan kepada pengambil kebijakan.'
        ]
      },
      {
        heading: '2. Menentukan Sikap dan Keberpihakan Penulis',
        body: 'Soal TKA kerap menanyakan: "Bagaimana sikap penulis/redaksi dalam teks tersebut?" Sikap ini terdeteksi dari pemilihan kata sifat, modalitas, dan fokus pihak mana yang paling dikritik atau dibela (misalnya: mendukung, mengecam, skeptis, prihatin, atau solutif).',
        example: {
          title: 'Contoh Deteksi Sikap Redaksi',
          text: 'Pemerintah daerah tidak boleh terus berlindung di balik alasan keterbatasan anggaran tatkala jalan poros sentra pertanian rusak parah. Petani berhak atas infrastruktur yang layak setelah sumbangsih mereka menjaga surplus pangan. Sudah saatnya prioritas belanja daerah ditata ulang dengan meletakkan kepentingan rakyat di atas proyek mercusuar.',
          analysis: 'Sikap redaksi: Kritis dan menuntut tindakan nyata pemerintah daerah, sekaligus berpihak kepada kepentingan petani dan masyarakat umum.'
        }
      }
    ],
    summary: [
      'Editorial mencerminkan sikap institusi redaksi, bukan opini orang perorangan.',
      'Sikap penulis terbaca dari diksi modalitas, nada tulisan, serta rekomendasi yang disodorkan.'
    ],
    checkUnderstanding: [
      {
        question: 'Apa fungsi utama penegasan ulang dalam teks editorial?',
        options: [
          'Memperkenalkan isu baru yang belum pernah dibahas sebelumnya.',
          'Menegaskan kembali sikap redaksi disertai rekomendasi solusi konkret atas isu yang dikaji.',
          'Menyajikan data statistik teknis yang rumit.',
          'Menyalahkan satu pihak tanpa menawarkan jalan keluar.'
        ],
        correctIndex: 1,
        explanation: 'Penegasan ulang berfungsi memantapkan posisi argumentatif redaksi serta memberikan saran/rekomendasi konstruktif.'
      }
    ],
    relatedCompetencies: ['tujuan-penulis', 'struktur-kebahasaan']
  },
  {
    id: 'mod-4',
    category: 'Kebahasaan',
    title: 'Kalimat Efektif, Kohesi, Koherensi, dan EYD V',
    subtitle: 'Menguasai kelogisan struktur kalimat, variasi konjungsi, dan kaidah ejaan bahasa Indonesia baku',
    estimatedMinutes: 25,
    objectives: [
      'Mendeteksi ketidakefektifan kalimat (pleonasme, kerancuan subjek-predikat, ketidaksejajaran bentuk).',
      'Memahami peranan pemarkah kohesi (kata ganti, repetisi, konjungsi antarkalimat) dan koherensi semantis.',
      'Menerapkan kaidah penulisan huruf kapital, kata serapan, dan tanda baca sesuai EYD V.'
    ],
    contentSections: [
      {
        heading: '1. Ciri-Ciri Kalimat Efektif dalam Asesmen TKA',
        body: 'Kalimat efektif adalah kalimat yang mampu menyampaikan pesan penulis secara tepat tanpa menimbulkan ketaksaan (ambiguitas) atau pemborosan kata.',
        keyPoints: [
          'Keutuhan Struktur: Memiliki subjek dan predikat yang jelas. (Salah: "Dalam musyawarah itu memutuskan...", Benar: "Musyawarah itu memutuskan..." atau "Dalam musyawarah itu diputuskan...").',
          'Keparalelan (Kesejajaran Bentuk): Bentuk kata yang dirinci harus setara. (Salah: "Kegiatan meliputi penanaman pohon, membersihkan selokan, dan pengecatan...", Benar: "penanaman, pembersihan, dan pengecatan").',
          'Kehematan Kata: Menghindari pleonasme. (Salah: "Saling tolong-menolong", Benar: "Saling menolong" atau "Tolong-menolong").',
          'Kelogisan Nalar: Masuk akal secara semantis. (Salah: "Waktu dan tempat kami persilakan.", Benar: "Bapak Kepala Sekolah kami persilakan.").'
        ]
      },
      {
        heading: '2. Kohesi dan Koherensi Antarkalimat',
        body: 'Kohesi adalah kepaduan bentuk lahiriah teks (penggunaan konjungsi, anafora, kata rujukan). Koherensi adalah kepaduan makna dan kelogisan hubungan ide antarparagraf.',
        example: {
          title: 'Contoh Analisis Konjungsi Antarkalimat',
          text: 'Pemberian pupuk subsidi sering kali terlambat tiba di tangan petani. Oleh karena itu, masa tanam kerap tertunda beberapa pekan. Sebaliknya, petani yang beralih ke pupuk kompos mandiri justru mampu mempertahankan ritme tanam secara konsisten.',
          analysis: '"Oleh karena itu" menunjukkan hubungan konsekuensi/akibat. "Sebaliknya" menunjukkan hubungan pertentangan/kontras antara petani yang bergantung pada subsidi vs yang mandiri.'
        }
      }
    ],
    summary: [
      'Kalimat efektif menuntut kejelasan fungsi gramatikal (S-P), keparalelan imbuhan, dan kehematan.',
      'Kohesi mempertautkan bentuk kata; koherensi menjamin alur gagasan mengalir secara runtut dan masuk akal.'
    ],
    checkUnderstanding: [
      {
        question: 'Manakah kalimat berikut yang memenuhi syarat keparalelan dan keefektifan?',
        options: [
          'Panitia bertugas menyusun jadwal, pengadaan perlengkapan, dan mengawasi jalannya ujian.',
          'Pemerintah berupaya menstabilkan harga, memperlancar distribusi, dan meningkatkan kesejahteraan petani.',
          'Untuk mempersingkat waktu, acara berikutnya adalah sambutan ketua panitia.',
          'Di dalam pertemuan itu membicarakan tentang perbaikan mutu pendidikan.'
        ],
        correctIndex: 1,
        explanation: 'Opsi kedua menggunakan verba me- yang sejajar (menstabilkan, memperlancar, meningkatkan) serta struktur S-P-O yang utuh.'
      }
    ],
    relatedCompetencies: ['struktur-kebahasaan', 'hubungan-paragraf']
  },
  {
    id: 'mod-5',
    category: 'Literasi Kritis',
    title: 'Membaca Multiteks: Perbandingan dan Integrasi Informasi',
    subtitle: 'Menyandingkan dua teks bertopik sama untuk menemukan persamaan, perbedaan, dan sintesis sudut pandang',
    estimatedMinutes: 25,
    objectives: [
      'Mengidentifikasi persamaan tema dan perbedaan fokus penekanan antara dua teks.',
      'Menilai kontradiksi atau komplementaritas argumen dari dua sumber bacaan.',
      'Mengintegrasikan informasi terpisah menjadi sebuah simpulan komposit yang utuh.'
    ],
    contentSections: [
      {
        heading: '1. Karakteristik Soal Multiteks TKA',
        body: 'Soal multiteks menyajikan Teks 1 dan Teks 2 dengan tema besar yang identik (misalnya kecerdasan buatan, ketahanan pangan, atau kearifan lokal), tetapi kedua teks ditulis oleh penulis berbeda dengan fokus, metode pengolahan data, atau sudut pandang yang berlainan.',
        keyPoints: [
          'Langkah 1: Identifikasi topik payung yang menyatukan kedua teks.',
          'Langkah 2: Tentukan fokus spesifik Teks 1 (apa yang ditekankan?).',
          'Langkah 3: Tentukan fokus spesifik Teks 2 (apa yang disorot?).',
          'Langkah 4: Periksa hubungan kedua teks: apakah saling melengkapi (komplementer), saling membantah (kontradiktif), atau teks 2 merupakan solusi teknis dari problem teks 1?'
        ],
        example: {
          title: 'Contoh Sinergi Dua Teks',
          text: 'Teks 1 fokus pada ancaman kepunahan bahasa daerah Bugis di kalangan generasi muda perkotaan. Teks 2 membahas pengembangan aplikasi kamus digital dan konten gim berbasis bahasa Bugis di sekolah-sekolah Pinrang.',
          analysis: 'Hubungan kedua teks: Teks 1 menyajikan identifikasi masalah sosial budaya, sedangkan Teks 2 menyajikan inovasi terapan sebagai salah satu solusi preventifnya.'
        }
      }
    ],
    summary: [
      'Jangan terburu-buru menyimpulkan kedua teks bertentangan sebelum memetakan fokus masing-masing teks.',
      'Sintesis informasi membutuhkan pemahaman menyeluruh terhadap premis kedua teks.'
    ],
    checkUnderstanding: [
      {
        question: 'Jika Teks A memaparkan dampak kekeringan terhadap hasil panen dan Teks B menjelaskan teknologi pemanenan air hujan terapan, bagaimana hubungan kedua teks tersebut?',
        options: [
          'Kedua teks saling bertentangan secara teoretis.',
          'Teks B memberikan alternatif solusi terhadap permasalahan lingkungan yang disajikan pada Teks A.',
          'Teks A menyanggah metode ilmiah yang ditawarkan Teks B.',
          'Kedua teks tidak memiliki keterkaitan sama sekali.'
        ],
        correctIndex: 1,
        explanation: 'Hubungan antara teks A dan B adalah hubungan masalah dan solusi (komplementer).'
      }
    ],
    relatedCompetencies: ['perbandingan-teks', 'evaluasi-argumen']
  }
];
