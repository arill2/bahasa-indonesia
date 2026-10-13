import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    stimulusTitle: 'Transformasi Pertanian Presisi di Bumi Lasinrang',
    stimulusText: `Kabupaten Pinrang di Sulawesi Selatan telah lama diakui sebagai salah satu lumbung pangan utama nasional. Namun, tantangan perubahan iklim global, anomali curah hujan, dan degradasi kesuburan tanah menuntut pergeseran paradigma dari pola tanam konvensional menuju pertanian presisi berbasis teknologi cerdas (smart agriculture).

Dalam tiga tahun terakhir, sejumlah kelompok tani muda di kawasan Mattiro Bulu dan Cempa mulai mengintegrasikan sensor kelembapan tanah berbasis Internet of Things (IoT) serta pemantauan spektral daun menggunakan pesawat nirawak (drone). Data real-time tersebut dikirim ke gawai petani untuk menentukan takaran air dan pupuk organik cair yang proporsional. Hasilnya, efisiensi penggunaan air irigasi meningkat hingga 35%, sementara residu kimiawi pada tanah berkurang drastis tanpa menurunkan tonase panen per hektare.

Kendati demikian, adopsi teknologi ini bukannya tanpa aral melintang. Mayoritas petani generasi senior masih enggan beralih karena terbiasa dengan metode intuisi turun-temurun dan keterbatasan literasi digital. Oleh sebab itu, akselerasi modernisasi pertanian di Pinrang tidak cukup hanya bertumpu pada penyediaan peranti teknologi, melainkan wajib dibarengi dengan pendampingan kultural dan regenerasi petani muda secara terpadu.`,
    stimulusSource: 'Dikutip dan diadaptasi dari Telaah Ketahanan Pangan Sulawesi Selatan (2025)',
    question: 'Berdasarkan paragraf kedua, apa simpulan logis mengenai penerapan pertanian presisi berbasis IoT di wilayah Mattiro Bulu dan Cempa?',
    options: [
      { id: 'A', text: 'Mampu menaikkan harga jual gabah di pasar nasional hingga dua kali lipat.' },
      { id: 'B', text: 'Berhasil mengoptimalkan efisiensi sumber daya dan mengurangi residu kimiawi tanpa menurunkan hasil produksi.' },
      { id: 'C', text: 'Menghilangkan ketergantungan petani muda pada sistem irigasi teknis Bendung Benteng.' },
      { id: 'D', text: 'Menggantikan seluruh tenaga kerja manusia di sawah dengan perangkat cerdas nirawak.' },
      { id: 'E', text: 'Membuat petani senior secara otomatis menguasai literasi digital dalam waktu singkat.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf kedua secara eksplisit dan substantif menyebutkan bahwa integrasi sensor IoT dan drone menghasilkan peningkatan efisiensi air irigasi hingga 35% serta pengurangan residu kimiawi pada tanah tanpa menurunkan tonase panen. Opsi B adalah simpulan logis yang paling tepat.',
    competency: 'simpulan-makna',
    subCompetency: 'Menarik simpulan berbasis bukti teks',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks tidak menyebutkan lonjakan harga jual gabah hingga dua kali lipat. Ini asumsi berlebihan di luar teks.',
      'C': 'Teks hanya menyebut efisiensi air irigasi meningkat, bukan menghilangkan ketergantungan dari bendungan.',
      'D': 'Teks menyebut teknologi mengoptimalkan takaran air dan pupuk, bukan menggantikan seluruh tenaga manusia.',
      'E': 'Paragraf ketiga justru menegaskan petani senior masih enggan beralih karena keterbatasan literasi digital.'
    },
    isValidated: true,
    validationNotes: 'Stimulus kontekstual, opsi homogen, distraktor logis dan berpijak pada teks.'
  },
  {
    id: 'q-2',
    stimulusTitle: 'Transformasi Pertanian Presisi di Bumi Lasinrang',
    stimulusText: `Mayoritas petani generasi senior masih enggan beralih karena terbiasa dengan metode intuisi turun-temurun dan keterbatasan literasi digital. Oleh sebab itu, akselerasi modernisasi pertanian di Pinrang tidak cukup hanya bertumpu pada penyediaan peranti teknologi, melainkan wajib dibarengi dengan pendampingan kultural dan regenerasi petani muda secara terpadu.`,
    stimulusSource: 'Paragraf ke-3 cuplikan teks Pertanian Presisi',
    question: 'Apa tujuan utama penulis menyampaikan pernyataan pada kalimat terakhir paragraf ketiga?',
    options: [
      { id: 'A', text: 'Mengkritik keengganan generasi senior yang tidak mau belajar gawai canggih.' },
      { id: 'B', text: 'Menegaskan bahwa modernisasi memerlukan pendekatan komprehensif yang melibatkan aspek sosial dan regenerasi pelaku.' },
      { id: 'C', text: 'Menyarankan penghentian bantuan subsidi alat pertanian kepada kelompok tani tradisional.' },
      { id: 'D', text: 'Menolak penggunaan teknologi cerdas dalam kegiatan bercocok tanam padi di pedesaan.' },
      { id: 'E', text: 'Membuktikan bahwa metode intuisi turun-temurun telah usang dan tidak memiliki nilai guna.' }
    ],
    correctAnswer: 'B',
    explanation: 'Penulis menggunakan konjungsi "Oleh sebab itu" untuk menawarkan solusi bahwa modernisasi pertanian tidak cukup sebatas infrastruktur fisik gawai/teknologi, melainkan harus menyentuh sisi manusia berupa pendampingan kultural dan regenerasi terpadu.',
    competency: 'tujuan-penulis',
    subCompetency: 'Menemukan tujuan retoris dan fungsi gagasan penulis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penulis tidak berniat menyudutkan atau menghakimi senior, melainkan mengidentifikasi akar hambatan budaya.',
      'C': 'Teks tidak menganjurkan penghentian subsidi alat bagi petani tradisional.',
      'D': 'Penulis mendukung modernisasi pertanian, bukan menolaknya.',
      'E': 'Teks menjelaskan realitas kebiasaan lama sebagai tantangan transisi, bukan menafikan nilai kearifan lokal.'
    },
    isValidated: true
  },
  {
    id: 'q-3',
    stimulusTitle: 'Kearifan Lokal "Sipakatau, Sipakalebbi, Sipakainge" di Era Algoritma',
    stimulusText: `Dalam filsafat hidup masyarakat Bugis, trias nilai *Sipakatau* (saling memanusiakan), *Sipakalebbi* (saling menghargai martabat), dan *Sipakainge* (saling mengingatkan dalam kebaikan) merupakan jangkar moral dalam setiap interaksi komunal. Falsafah ini menuntut kehati-hatian dalam bertutur agar tidak melukai martabat lawan bicara.

Akan tetapi, lanskap ruang publik digital masa kini—yang dirancang dengan algoritma penarik atensi—sering kali mengamplifikasi polarisasi dan agresivitas verbal. Kolom komentar media sosial kerap dipenuhi cercaan anonim, perundungan siber, dan penyebaran disinformasi yang mereduksi manusia semata-mata menjadi angka penonton (engagement metric).

Menghidupkan kembali etika *Sipakatau, Sipakalebbi, Sipakainge* di jagat maya bukan sekadar romantisme masa lalu. Falsafah ini justru dapat menjadi kerangka literasi digital kritis: melatih pengguna internet untuk memperlakukan akun lain sebagai subjek berkesadaran, bukan objek pelampiasan amarah; memvalidasi kebenaran kabar sebelum membagikannya (*Sipakainge*); serta menolak budaya mempermalukan orang lain di muka umum (*Sipakalebbi*).`,
    stimulusSource: 'Diadaptasi dari Jurnal Kebudayaan dan Literasi Kewargaan Sulawesi Selatan (2025)',
    question: 'Berdasarkan teks tersebut, manakah argumen tersirat yang PALING KUAT mengenai penyebab pudarnya nilai kesantunan di media sosial?',
    options: [
      { id: 'A', text: 'Arsitektur algoritma media sosial secara sistemis mengutamakan keterlibatan massa yang sering kali dipicu oleh sensasi dan emosi negatif.' },
      { id: 'B', text: 'Generasi muda sama sekali tidak pernah diajarkan muatan lokal budaya Bugis di jenjang persekolahan formal.' },
      { id: 'C', text: 'Tidak tersedianya undang-undang yang mengatur sanksi pidana atas ujaran kebencian di ranah digital.' },
      { id: 'D', text: 'Masyarakat tradisional tidak memiliki kapasitas intelektual untuk mengoperasikan telepon pintar dengan bijak.' },
      { id: 'E', text: 'Nilai-nilai luhur kedaerahan sudah tidak lagi memiliki relevansi praktis di era kecerdasan buatan.' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat pada paragraf kedua ("lanskap ruang publik digital masa kini—yang dirancang dengan algoritma penarik atensi—sering kali mengamplifikasi polarisasi dan agresivitas verbal") menunjukkan bahwa desain algoritma penarik atensilah yang memicu degradasi etika komunikasi.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menemukan informasi implisit (inferensi argumen)',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Teks tidak menyinggung kurikulum persekolahan formal. Ini spekulasi liar.',
      'C': 'Aspek regulasi hukum tidak dibahas dalam teks bacaan.',
      'D': 'Menghakimi kemampuan masyarakat tradisional bertentangan dengan konteks teks dan tidak berdasar fakta teks.',
      'E': 'Paragraf ketiga justru menegaskan falsafah ini amat relevan sebagai kerangka literasi digital kritis kontemporer.'
    },
    isValidated: true
  },
  {
    id: 'q-4',
    stimulusTitle: 'Urgensi Perlindungan Ekosistem Mangrove Suppa',
    stimulusText: `(1) Wilayah pesisir Kecamatan Suppa, Pinrang, memiliki bentang hutan bakau yang berfungsi ganda sebagai benteng alami dari abrasi gelombang Selat Makassar sekaligus rumah pemijahan beragam biota laut bernilai ekonomis. (2) Namun, dalam dekade terakhir, konversi lahan mangrove menjadi tambak intensif dan permukiman liar telah menyusutkan tutupan hijau sebesar 28%. (3) Akibatnya, beberapa titik tambak warga mulai tergenang rob dan intrusi air asin telah mencemari sumur air tawar hingga radius dua kilometer ke arah daratan. (4) Di samping itu, penurunan populasi kepiting bakau dan udang windu memicu keluhan nelayan tradisional mengenai anjloknya tangkapan harian. (5) Sudah saatnya pemerintah daerah dan kelompok pemerhati lingkungan memulihkan ekosistem melalui zonasi tambak ramah lingkungan (silvofishery) serta penegakan hukum tegas terhadap perambah liar.`,
    stimulusSource: 'Diadaptasi dari Laporan Kajian Pesisir Teluk Parepare dan Suppa (2024)',
    question: 'Kalimat manakah dalam paragraf tersebut yang merupakan opini bernada saran/rekomendasi?',
    options: [
      { id: 'A', text: 'Kalimat (1)' },
      { id: 'B', text: 'Kalimat (2)' },
      { id: 'C', text: 'Kalimat (3)' },
      { id: 'D', text: 'Kalimat (4)' },
      { id: 'E', text: 'Kalimat (5)' }
    ],
    correctAnswer: 'E',
    explanation: 'Kalimat (5) ditandai dengan frasa "Sudah saatnya...", yang merupakan modalitas pertimbangan normatif sekaligus anjuran tindakan (rekomendasi) bagi pemerintah daerah dan pemerhati lingkungan. Kalimat 1, 2, 3, dan 4 merupakan paparan fakta empiris dan dampak riil.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Membedakan fakta objektif dengan opini rekomendatif',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kalimat (1) memaparkan fungsi ekologis nyata hutan bakau (fakta geografis).',
      'B': 'Kalimat (2) menyajikan data persentase penyusutan tutupan hijau sebesar 28% (data faktual).',
      'C': 'Kalimat (3) menerangkan dampak fisik nyata berupa banjir rob dan intrusi air tawar.',
      'D': 'Kalimat (4) memaparkan konsekuensi ekonomi riil penurunan populasi biota laut.'
    },
    isValidated: true
  },
  {
    id: 'q-5',
    stimulusTitle: 'Analisis Kebahasaan: Efektivitas Kalimat',
    stimulusText: `Perhatikan kutipan paragraf berikut!

"(1) Dalam rangka untuk memperingati Hari Pendidikan Nasional, SMAN 1 Pinrang menyelenggarakan festival literasi kebahasaan. (2) Berbagai macam buku-buku karya sastrawan Sulawesi Selatan dipamerkan di aula sekolah. (3) Kepala sekolah mengatakan bahwa festival ini bertujuan untuk menumbuhkan minat baca kritis siswa. (4) Menurut dewan juri menyatakan bahwa karya esai siswa kelas XII memiliki kedalaman argumentasi yang luar biasa. (5) Seluruh siswa sangat antusias sekali mengikuti setiap sesi lokakarya kepenulisan."`,
    question: 'Kalimat yang efektif dalam kutipan paragraf di atas ditunjukkan oleh nomor...',
    options: [
      { id: 'A', text: '(1)' },
      { id: 'B', text: '(2)' },
      { id: 'C', text: '(3)' },
      { id: 'D', text: '(4)' },
      { id: 'E', text: '(5)' }
    ],
    correctAnswer: 'C',
    explanation: 'Kalimat (3) memenuhi kaidah kalimat efektif dengan struktur S-P-O-K yang jelas dan lugas. Kalimat (1) mubazir/pleonastis ("Dalam rangka untuk"), kalimat (2) pleonastis ("Berbagai macam buku-buku"), kalimat (4) rancu struktur subjek-predikatnya ("Menurut... menyatakan bahwa"), dan kalimat (5) pleonastis ("sangat antusias sekali").',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menganalisis kalimat efektif dan pemborosan kata',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kalimat (1) memuat pleonasme: penggabungan "dalam rangka" dan "untuk" yang semakna.',
      'B': 'Kalimat (2) memuat pleonasme: bentuk jamak ganda "berbagai macam" diikuti kata ulang "buku-buku".',
      'D': 'Kalimat (4) kehilangan subjek yang jelas akibat penumpukan "Menurut dewan juri menyatakan bahwa...".',
      'E': 'Kalimat (5) memuat pleonasme tingkat intensitas: "sangat" disandingkan dengan "sekali".'
    },
    isValidated: true
  },
  {
    id: 'q-6',
    stimulusTitle: 'Perbandingan Dua Teks: Pembelajaran Berbasis Kecerdasan Buatan (Multiteks)',
    stimulusText: `TEKS 1:
Pemanfaatan piranti Generative Artificial Intelligence (AI) dalam pembelajaran bahasa di sekolah menengah membuka cakrawala efisiensi yang belum pernah ada sebelumnya. Siswa dapat memperoleh umpan balik instan terhadap draf esai mereka, mulai dari perbaikan gramatika, pemilihan sinonim yang variatif, hingga pemetaan alur paragraf. Guru pun terbantu dalam menyusun diferensiasi materi yang disesuaikan dengan ritme belajar masing-masing anak. Dengan supervisi yang tepat, AI membebaskan guru dari rutinitas administratif sehingga dapat lebih berfokus pada dialog pedagogis yang humanis di ruang kelas.

TEKS 2:
Ketergantungan berlebihan pada generator teks cerdas dikhawatirkan dapat melumpuhkan daya juang kognitif (cognitive struggle) siswa dalam merumuskan argumen mandiri. Menulis esai sejatinya adalah proses pergulatan batin, penataan ide yang berantakan, serta penemuan jati diri retoris. Ketika mesin menyodorkan draf siap pakai hanya dalam hitungan detik, kemampuan berpikir reflektif dan orisinalitas gagasan siswa berisiko terdegradasi menjadi sekadar keterampilan menyunting teks instan buatan mesin. Jika tidak diimbangi asesmen lisan dan penulisan tangan langsung di kelas, integritas akademik generasi masa depan berada di ujung tanduk.`,
    stimulusSource: 'Dihimpun dari Antologi Wacana Pendidikan Digital (2025)',
    question: 'Perbedaan sudut pandang utama antara Teks 1 dan Teks 2 dalam memandang pemanfaatan kecerdasan buatan dalam pembelajaran menulis adalah...',
    options: [
      { id: 'A', text: 'Teks 1 menyoroti efisiensi teknis dan diferensiasi materi, sedangkan Teks 2 memperingatkan degradasi daya juang kognitif dan orisinalitas berpikir siswa.' },
      { id: 'B', text: 'Teks 1 menolak pemanfaatan AI untuk kegiatan administratif, sedangkan Teks 2 mewajibkan seluruh ujian dilakukan secara digital.' },
      { id: 'C', text: 'Teks 1 menganggap peran guru sudah usang, sedangkan Teks 2 menganggap mesin tidak memiliki kecerdasan sama sekali.' },
      { id: 'D', text: 'Teks 1 berfokus pada biaya langganan aplikasi AI, sedangkan Teks 2 berfokus pada regulasi hukum hak cipta di internet.' },
      { id: 'E', text: 'Teks 1 menyarankan penghapusan tugas esai, sedangkan Teks 2 menyarankan pelarangan gawai di seluruh lingkungan sekolah.' }
    ],
    correctAnswer: 'A',
    explanation: 'Teks 1 memandang AI secara optimis sebagai alat bantu produktivitas yang memperkaya umpan balik dan diferensiasi materi. Sebaliknya, Teks 2 memandang secara kritis ancaman ketergantungan AI terhadap proses pergulatan kognitif dan integritas berpikir orisinal.',
    competency: 'perbandingan-teks',
    subCompetency: 'Membandingkan perspektif dan fokus penekanan dua teks',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Teks 1 justru menyebut AI meringankan tugas administratif; Teks 2 menyarankan ujian tulis tangan di kelas.',
      'C': 'Teks 1 tidak pernah menyatakan peran guru usang, melainkan menekankan dialog pedagogis guru.',
      'D': 'Kedua teks tidak membahas persoalan finansial biaya langganan piranti.',
      'E': 'Kedua teks sama sekali tidak menganjurkan penghapusan tugas esai.'
    },
    isValidated: true
  },
  {
    id: 'q-7',
    stimulusTitle: 'Perbandingan Dua Teks: Pembelajaran Berbasis Kecerdasan Buatan (Multiteks)',
    stimulusText: `TEKS 1:
Pemanfaatan piranti Generative Artificial Intelligence (AI) dalam pembelajaran bahasa di sekolah menengah membuka cakrawala efisiensi yang belum pernah ada sebelumnya. Siswa dapat memperoleh umpan balik instan terhadap draf esai mereka, mulai dari perbaikan gramatika, pemilihan sinonim yang variatif, hingga pemetaan alur paragraf. Guru pun terbantu dalam menyusun diferensiasi materi yang disesuaikan dengan ritme belajar masing-masing anak.

TEKS 2:
Ketergantungan berlebihan pada generator teks cerdas dikhawatirkan dapat melumpuhkan daya juang kognitif siswa dalam merumuskan argumen mandiri. Menulis esai sejatinya adalah proses pergulatan batin, penataan ide yang berantakan, serta penemuan jati diri retoris. Ketika mesin menyodorkan draf siap pakai dalam hitungan detik, orisinalitas gagasan siswa berisiko terdegradasi.`,
    question: 'Jika kedua teks di atas disintesiskan menjadi sebuah kebijakan pembelajaran di SMAN 1 Pinrang, simpulan integratif yang PALING TEPAT adalah...',
    options: [
      { id: 'A', text: 'Sekolah harus melarang mutlak akses internet demi menjaga kemurnian berpikir siswa.' },
      { id: 'B', text: 'AI dapat dimanfaatkan sebagai mitra dialog kognitif dan perbaikan draf, tetapi proses konseptualisasi gagasan utama dan asesmen otentik tetap wajib menuntut pemikiran mandiri siswa.' },
      { id: 'C', text: 'Seluruh tugas menulis diserahkan sepenuhnya kepada kecerdasan buatan demi mengejar efisiensi waktu.' },
      { id: 'D', text: 'Siswa diperbolehkan menggunakan AI hanya jika membayar iuran laboratorium komputer sekolah.' },
      { id: 'E', text: 'Guru bahasa Indonesia sebaiknya digantikan oleh aplikasi asisten virtual berbasis kecerdasan buatan.' }
    ],
    correctAnswer: 'B',
    explanation: 'Sintesis yang adil dan berimbang mempertemukan kelebihan efisiensi alat bantu (Teks 1) dengan mitigasi risiko ketergantungan berpikir kritis (Teks 2). Pilihan B mencakup kedua aspek tersebut secara proporsional.',
    competency: 'perbandingan-teks',
    subCompetency: 'Menyintesis informasi dari beberapa sumber bacaan',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kebijakan ekstrem melarang internet tidak realistis dan mengabaikan manfaat yang diuraikan Teks 1.',
      'C': 'Menyerahkan tugas kepada mesin adalah bentuk ketergantungan yang justru ditentang keras pada Teks 2.',
      'D': 'Iuran laboratorium tidak ada sangkut pautnya dengan pertimbangan pedagogis teks.',
      'E': 'Kedua teks tidak pernah menuntut penggantian peran guru oleh mesin.'
    },
    isValidated: true
  },
  {
    id: 'q-8',
    stimulusTitle: 'Dilema Konsumsi Berita Kilat di Ruang Maya',
    stimulusText: `(1) Tren jurnalisme daring saat ini didikte oleh kecepatan tayang (clickbait and speed journalism) yang acap kali menomorduakan akurasi verifikasi. (2) Judul berita dirancang bombastis dan provokatif agar memancing rasa penasaran netizen. (3) Akibatnya, banyak pembaca hanya mengonsumsi tajuk berita tanpa menyimak tubuh artikel secara tuntas sebelum membagikannya ke grup percakapan keluarga. (4) Fenomena "baca judul langsung sebar" ini menjadi lahan subur bagi perkembangbiakan hoaks dan kepanikan sosial yang tidak perlu. (5) Oleh karena itu, pembaca dituntut mengasah keterampilan membaca kritis serta melakukan verifikasi silang (cross-check) ke situs berita kredibel berbadan hukum pers resmi sebelum mempercayai suatu informasi viral.`,
    question: 'Hubungan kausalitas (sebab-akibat) dalam teks di atas terjadi antara kalimat...',
    options: [
      { id: 'A', text: 'Kalimat (1) menyebabkan terjadinya kalimat (2)' },
      { id: 'B', text: 'Kalimat (2) dan (3) menyebabkan timbulnya dampak pada kalimat (4)' },
      { id: 'C', text: 'Kalimat (4) merupakan penyebab dari fenomena kalimat (1)' },
      { id: 'D', text: 'Kalimat (5) menjadi penyebab langsung kalimat (3)' },
      { id: 'E', text: 'Kalimat (3) menjadi akibat dari rekomendasi pada kalimat (5)' }
    ],
    correctAnswer: 'B',
    explanation: 'Judul berita yang provokatif (kalimat 2) dan kebiasaan pembaca yang hanya membaca judul tanpa isi lalu membagikannya (kalimat 3) menjadi sebab langsung ("menjadi lahan subur") berkembang biaknya hoaks dan kepanikan sosial (kalimat 4). Hubungan sebab-akibat ini ditandai secara gramatikal dan semantis.',
    competency: 'hubungan-paragraf',
    subCompetency: 'Menganalisis hubungan logis kausalitas antarkalimat',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kalimat 1 dan 2 sama-sama memaparkan ciri jurnalisme cepat, bukan sebab-akibat murni.',
      'C': 'Urutan nalar terbalik: hoaks (4) adalah dampak, bukan sebab dari tren jurnalisme (1).',
      'D': 'Kalimat 5 adalah simpulan saran, bukan penyebab dari kebiasaan buruk membaca judul pada kalimat 3.',
      'E': 'Kalimat 5 adalah anjuran pemecahan masalah, bukan anteseden bagi kalimat 3.'
    },
    isValidated: true
  },
  {
    id: 'q-9',
    stimulusTitle: 'Petikan Cerpen: Warisan di Bawah Atap Saoraja',
    stimulusText: `Matahari condong ke barat, melempar bayang-bayang tiang Saoraja memanjang di atas pelataran tanah liat. Puang Ambo menatap lembaran kertas usang di tangannya dengan jemari yang bergetar halus. Di hadapannya, Baso—putra bungsunya yang baru saja menamatkan gelar sarjana teknik di Makassar—duduk bersila dengan kepala tertunduk takzim.

"Kau ingin menjual petak sawah peninggalan kakekmu di Suppa ini untuk modal merintis studio peranti lunak di kota, Baso?" Suara lelaki renta itu terdengar serak, tidak bernada marah, tetapi sarat akan kepedihan yang ditahan.

"Bukan semata menjual demi modal materi, Puang," jawab Baso perlahan tanpa berani menatap langsung mata ayahnya. "Tanah itu tak lagi menghasilkan jika kita terus menyewakannya kepada pemodal luar yang memeras tanah dengan zat kimia hingga tandus. Saya ingin membangun aplikasi tata kelola air dan pasar langsung bagi petani Pinrang. Saya ingin mengembalikan berkah tanah ini lewat jalur yang berbeda, Puang."

Puang Ambo terdiam lama. Angin sore meniup pucuk-pucuk pohon lontar di kejauhan, membawa aroma gabah kering dan kenangan masa silam yang enggan beranjak.`,
    stimulusSource: 'Cerpen Fiksi Edukatif: Jejak Langkah di Bumi Lasinrang',
    question: 'Konflik batin utama yang dialami tokoh Puang Ambo dalam kutipan cerpen di atas adalah...',
    options: [
      { id: 'A', text: 'Kemarahan besar karena anaknya menolak menjadi seorang petani tradisional di desa.' },
      { id: 'B', text: 'Pergulatan antara keterikatan emosional pada tanah warisan leluhur dan kesadaran akan niat mulia modernisasi anaknya.' },
      { id: 'C', text: 'Ketakutan bahwa Baso akan tertipu oleh pengembang peranti lunak di kota Makassar.' },
      { id: 'D', text: 'Kekecewaan karena Baso tidak berhasil menyelesaikan studinya tepat waktu.' },
      { id: 'E', text: 'Kebingungan akibat utang piutang keluarga yang belum terlunasi oleh hasil panen sawah.' }
    ],
    correctAnswer: 'B',
    explanation: 'Suara Puang Ambo tidak bernada marah melainkan kepedihan ("sarat akan kepedihan yang ditahan"), dan ia terdiam lama menimbang penjelasan Baso yang ingin mengembalikan berkah tanah lewat inovasi aplikasi. Ini mencerminkan dilema batin antara sentimentalitas tanah pusaka dan rasionalitas masa depan generasi muda.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menganalisis konflik batin dan karakter tokoh dalam prosa',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks menegaskan suara Puang Ambo "tidak bernada marah", melainkan sedih dan menimbang.',
      'C': 'Kekhawatiran tertipu rekan bisnis tidak disebutkan dalam teks.',
      'D': 'Teks menyebutkan Baso "baru saja menamatkan gelar sarjana", artinya ia telah lulus.',
      'E': 'Tidak ada penyebutan perkara utang piutang dalam kutipan.'
    },
    isValidated: true
  },
  {
    id: 'q-10',
    stimulusTitle: 'Petikan Cerpen: Warisan di Bawah Atap Saoraja',
    stimulusText: `Di hadapannya, Baso—putra bungsunya yang baru saja menamatkan gelar sarjana teknik di Makassar—duduk bersila dengan kepala tertunduk takzim.
...
"Bukan semata menjual demi modal materi, Puang," jawab Baso perlahan tanpa berani menatap langsung mata ayahnya.`,
    question: 'Sikap tokoh Baso saat berkomunikasi dengan ayahnya mencerminkan nilai budaya lokal...',
    options: [
      { id: 'A', text: 'Pemberontakan terhadap tradisi keluarga bangsawan masa lampau.' },
      { id: 'B', text: 'Sikap penolakan pasif terhadap keputusan sepihak orang tua.' },
      { id: 'C', text: 'Penghormatan luhur anak terhadap orang tua (sipakalebbi) dalam musyawarah keluarga.' },
      { id: 'D', text: 'Ketidakpercayaan diri pemuda desa yang merasa rendah diri di hadapan tetua.' },
      { id: 'E', text: 'Pura-pura patuh demi meloloskan kepentingan pribadi menjual harta warisan.' }
    ],
    correctAnswer: 'C',
    explanation: 'Tindakan Baso duduk bersila, kepala tertunduk takzim, dan berbicara perlahan tanpa menatap mata secara menantang mencerminkan etika sopan santun dan rasa hormat yang mendalam (*sipakalebbi*) seorang anak kepada ayahnya dalam kebudayaan Bugis.',
    competency: 'simpulan-makna',
    subCompetency: 'Menafsirkan makna gestur simbolik dan muatan nilai kultural teks',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Baso tidak memberontak; ia memohon restu dengan penuh takzim.',
      'B': 'Baso berargumen secara rasional dan santun, bukan pasif-agresif.',
      'D': 'Baso adalah sarjana teknik dengan visi konkret, ketundukannya adalah bentuk adab, bukan rendah diri.',
      'E': 'Penjelasan Baso menunjukkan komitmen tulus memutus rantai perusakan tanah oleh pemodal luar.'
    },
    isValidated: true
  },
  {
    id: 'q-11',
    stimulusTitle: 'Pencemaran Mikroplastik dan Rantai Makanan Bahari',
    stimulusText: `Studi oseanografi terkini di perairan Selat Makassar mengonfirmasi temuan partikel mikroplastik dalam saluran pencernaan 68% sampel ikan pelagis kecil yang biasa dikonsumsi masyarakat pesisir. Mikroplastik—fragmen polimer sintetik berukuran kurang dari lima milimeter—berasal dari degradasi sampah kantong plastik, serat tekstil sintetis cucian, serta microbeads kosmetik yang terbuang ke daerah aliran sungai tanpa pengolahan sanitasi memadai.

Karena ukurannya yang renik, mikroplastik kerap tertelan oleh zooplankton dan fitoplankton di dasar jaring makanan laut. Melalui mekanisme bioakumulasi dan biomagnifikasi, konsentrasi senyawa karsinogenik seperti bisfenol A (BPA) dan ftalat yang terserap pada permukaan mikroplastik terus berlipat ganda seiring kenaikan tingkat trofik predator puncak, termasuk manusia yang mengonsumsi hidangan laut tercemar.`,
    stimulusSource: 'Dikutip dari Buletin Riset Kelautan dan Perikanan Nusantara (2024)',
    question: 'Berdasarkan teks di atas, mekanisme biomagnifikasi mikroplastik dapat didefinisikan sebagai...',
    options: [
      { id: 'A', text: 'Proses penguraian partikel plastik menjadi molekul organik yang bermanfaat bagi fitoplankton.' },
      { id: 'B', text: 'Peningkatan konsentrasi zat berbahaya pada tubuh organisme seiring perpindahan energi ke tingkat trofik rantai makanan yang lebih tinggi.' },
      { id: 'C', text: 'Penyaringan limbah tekstil di daerah aliran sungai menggunakan teknologi membran mikro.' },
      { id: 'D', text: 'Penurunan kadar racun kimiawi dalam tubuh ikan akibat metabolisme enzim pencernaan alami.' },
      { id: 'E', text: 'Pemulihan populasi zooplankton setelah berkurangnya sampah plastik rumah tangga di pesisir.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat terakhir menerangkan bahwa melalui biomagnifikasi, "konsentrasi senyawa karsinogenik... terus berlipat ganda seiring kenaikan tingkat trofik predator puncak, termasuk manusia". Ini secara tepat didefinisikan pada opsi B.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menjelaskan definisi istilah dan proses saintifik berdasarkan teks',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Mikroplastik tidak terurai menjadi zat organik bermanfaat; plastik adalah polimer anorganik berbahaya.',
      'C': 'Ini istilah proses penyaringan air, bukan biomagnifikasi biologis.',
      'D': 'Biomagnifikasi justru meningkatkan kadar akumulasi racun, bukan menurunkannya.',
      'E': 'Tidak ada korelasi definisi antara biomagnifikasi dan pemulihan populasi plankton.'
    },
    isValidated: true
  },
  {
    id: 'q-12',
    stimulusTitle: 'Pencemaran Mikroplastik dan Rantai Makanan Bahari',
    stimulusText: `Karena ukurannya yang renik, mikroplastik kerap tertelan oleh zooplankton dan fitoplankton di dasar jaring makanan laut. Melalui mekanisme bioakumulasi dan biomagnifikasi, konsentrasi senyawa karsinogenik seperti bisfenol A (BPA) dan ftalat yang terserap pada permukaan mikroplastik terus berlipat ganda seiring kenaikan tingkat trofik predator puncak, termasuk manusia yang mengonsumsi hidangan laut tercemar.`,
    question: 'Pernyataan manakah yang PALING MEWAKILI asumsi yang mendasari kekhawatiran peneliti pada paragraf kedua?',
    options: [
      { id: 'A', text: 'Konsumsi ikan laut oleh manusia dapat memicu risiko kesehatan serius akibat paparan racun yang menumpuk di sepanjang rantai makanan.' },
      { id: 'B', text: 'Nelayan tradisional di Selat Makassar sengaja membuang sampah plastik untuk menarik perhatian kawanan ikan.' },
      { id: 'C', text: 'Semua jenis mikroplastik dapat larut dengan sendirinya jika dipanaskan pada suhu mendidih.' },
      { id: 'D', text: 'Zooplankton merupakan satu-satunya organisme yang kebal terhadap racun bisfenol A dan ftalat.' },
      { id: 'E', text: 'Konsentrasi racun mikroplastik pada predator laut lebih kecil dibandingkan pada plankton mikroskopis.' }
    ],
    correctAnswer: 'A',
    explanation: 'Asumsi yang mendasari kekhawatiran adalah bahwa paparan senyawa karsinogenik (penyebab kanker) yang menumpuk hingga predator puncak (manusia) membahayakan kesehatan masyarakat yang mengonsumsi ikan tercemar.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Mengidentifikasi asumsi dasar di balik pernyataan ilmiah',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Asumsi ini absurd dan tidak memiliki dasar faktual dalam teks.',
      'C': 'Plastik sintetis tidak larut dalam air mendidih; merebus tidak menghilangkan cemaran kimia.',
      'D': 'Teks tidak pernah menyatakan zooplankton kebal terhadap racun.',
      'E': 'Bertentangan dengan teks: konsentrasi pada predator puncak berlipat ganda lebih tinggi, bukan lebih kecil.'
    },
    isValidated: true
  },
  {
    id: 'q-13',
    stimulusTitle: 'Urgensi Perlindungan HAKI bagi Pengrajin Tenun Sutra Wajo-Pinrang',
    stimulusText: `(1) Kain tenun sutra tradisional khas Sulawesi Selatan menyimpan kekayaan motif filosofis bernilai tinggi yang diwariskan turun-temurun. (2) Namun, belakangan ini pasar tekstil lokal dibanjiri oleh kain bermotif sutra tiruan yang diproduksi secara massal oleh pabrik tekstil luar negeri menggunakan teknik cetak digital (digital printing) berbahan poliester murah. (3) Harga kain tiruan tersebut hanya sepertiga dari harga kain tenun asli ATBM (Alat Tenun Bukan Mesin), sehingga banyak pengrajin lokal merugi dan terpaksa gulung tikar. (4) Tanpa perlindungan Indikasi Geografis dan Hak Kekayaan Intelektual (HAKI) yang kuat, warisan identitas budaya kita terancam punah ditelan ekspansi pasar bebas. (5) Para konsumen sering kali tidak dapat membedakan mana kain tenun tangan asli dan mana cetakan pabrikan karena kemiripan visual pada pandangan sekilas.`,
    question: 'Gagasan utama paragraf di atas adalah...',
    options: [
      { id: 'A', text: 'Keunggulan teknologi cetak digital luar negeri dalam meniru motif nusantara.' },
      { id: 'B', text: 'Kain tenun sutra lokal menghadapi ancaman kepunahan akibat banjir kain tiruan pabrikan dan minimnya perlindungan HAKI.' },
      { id: 'C', text: 'Ketidakmampuan pengrajin lokal menurunkan harga jual kain sutra tenun tangan.' },
      { id: 'D', text: 'Perbedaan mendasar antara serat sutra alam dan benang poliester buatan manusia.' },
      { id: 'E', text: 'Kegagalan promosi pariwisata daerah dalam memperkenalkan kain tenun tradisional ke pentas dunia.' }
    ],
    correctAnswer: 'B',
    explanation: 'Gagasan utama mencakup persoalan inti paragraf: serbuan kain tiruan murah yang mengancam kelangsungan pengrajin tenun sutra tradisional serta pentingnya payung hukum HAKI untuk melindungi warisan budaya tersebut.',
    competency: 'ide-pokok',
    subCompetency: 'Menentukan gagasan pokok wacana kompleks',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teknologi cetak digital adalah faktor penyebab ancaman, bukan pokok pembicaraan utama teks.',
      'C': 'Teks menyoroti ketimpangan biaya produksi akibat tenun tangan vs mesin, bukan semata ketidakmampuan.',
      'D': 'Teks tidak membedah komposisi kimia serat sutra alam vs poliester.',
      'E': 'Promosi pariwisata tidak diperdebatkan dalam teks.'
    },
    isValidated: true
  },
  {
    id: 'q-14',
    stimulusTitle: 'Kaidah Ejaan: Penulisan Kata Baku dan Tanda Baca (EYD V)',
    stimulusText: `Cermatilah kalimat-kalimat berikut!

(1) Pihak sekolah mengundang para orang tua murid untuk menghadiri rapat kordinasi di ruang multimedia.
(2) Praktik pembelajaran berbasis proyek menuntut siswa untuk aktif berkolaborasi.
(3) Sebelum menyimpulkan hasil observasi, kita wajib menganalisa data secara objektif.
(4) Beliau menasihati kami agar tidak mudah terprovokasi oleh berita hoaks di media sosial.
(5) Pertanggung-jawaban panitia pelaksana akan diserahkan pada hari Senin depan.`,
    question: 'Kalimat yang memuat penulisan kata baku dan kaidah ejaan yang TEPAT sesuai Pedoman Umum Ejaan Bahasa Indonesia (EYD V) adalah nomor...',
    options: [
      { id: 'A', text: '(1) dan (3)' },
      { id: 'B', text: '(2) dan (4)' },
      { id: 'C', text: '(3) dan (5)' },
      { id: 'D', text: '(1) dan (4)' },
      { id: 'E', text: '(2) dan (5)' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat (2) baku karena menggunakan "Praktik" (bukan praktek) dan "objektif". Kalimat (4) baku karena menggunakan "menasihati" (bukan menasehati) dan struktur yang tepat. Kalimat (1) salah karena "kordinasi" (baku: koordinasi); kalimat (3) salah karena "menganalisa" (baku: menganalisis); kalimat (5) salah karena penulisan gabungan kata berimbuhan konfiks harus serangkai tanpa tanda hubung: "pertanggungjawaban".',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menganalisis kata baku dan penulisan gabungan kata sesuai EYD V',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kata "kordinasi" (seharusnya koordinasi) dan "menganalisa" (seharusnya menganalisis) merupakan bentuk tidak baku.',
      'C': 'Kata "menganalisa" dan penulisan "pertanggung-jawaban" dengan tanda hubung menyalahi kaidah EYD V.',
      'D': 'Kalimat 1 tidak baku pada kata "kordinasi" dan redundan pada frasa "para orang tua murid".',
      'E': 'Penulisan "pertanggung-jawaban" salah; jika mendapat awalan dan akhiran sekaligus, harus digabung serangkai.'
    },
    isValidated: true
  },
  {
    id: 'q-15',
    stimulusTitle: 'Menakar Keakuratan Sumber Berita Kesehatan',
    stimulusText: `Sebuah pesan berantai yang viral di aplikasi pesan singkat mengklaim bahwa merebus daun tanaman herbal liar tertentu yang tumbuh di tepi pematang sawah dapat menyembuhkan penyakit diabetes mellitus secara permanen hanya dalam tiga hari tanpa perlu konsumsi obat dokter. Pesan tersebut mencantumkan kutipan seorang "Profesor X" tanpa menyebutkan universitas afiliasi, tahun penelitian, jurnal publikasi, maupun metodologi uji klinis yang dilalui.`,
    question: 'Berdasarkan prinsip literasi informasi kritis, kelemahan mendasar dari keabsahan klaim teks tersebut adalah...',
    options: [
      { id: 'A', text: 'Pesan tersebut ditulis menggunakan bahasa Indonesia yang santai dan akrab.' },
      { id: 'B', text: 'Klaim medis tidak menyertakan rujukan uji klinis peer-reviewed dan mengabaikan kompleksitas patofisiologi penyakit kronis.' },
      { id: 'C', text: 'Harga daun tanaman herbal tersebut terlalu murah sehingga tidak masuk akal secara ekonomis.' },
      { id: 'D', text: 'Pesan disebarkan melalui telepon genggam pintar keluaran model lama.' },
      { id: 'E', text: 'Tanaman herbal liar di pematang sawah tidak mungkin memiliki kandungan zat kimia alami.' },
    ],
    correctAnswer: 'B',
    explanation: 'Penilaian keakuratan informasi ilmiah menuntut adanya bukti empiris, rujukan uji klinis pada jurnal bereputasi (peer-reviewed), dan afiliasi keilmuan yang jelas. Mengklaim sembuh permanen dalam 3 hari pada penyakit metabolik kronis tanpa dasar metodologis merupakan ciri utama pseudains/disinformasi.',
    competency: 'akurasi-relevansi',
    subCompetency: 'Menilai keabsahan bukti dan kredibilitas sumber informasi',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Gaya bahasa bukan kriteria utama penentu validitas ilmiah bukti klinis.',
      'C': 'Harga tanaman tidak menentukan keabsahan biologis khasiat medis.',
      'D': 'Model gawai sama sekali tidak relevan dengan validitas isi informasi.',
      'E': 'Banyak tanaman liar mengandung metabolit sekunder alami, tetapi klaim penyembuhan instan tanpa uji yang tidak absah.'
    },
    isValidated: true
  },
  {
    id: 'q-16',
    stimulusTitle: 'Keanekaragaman Hayati Danau Tempe dan Siklus Hidrologi',
    stimulusText: `Danau Tempe yang membentang di perbatasan Kabupaten Wajo, Soppeng, dan Sidenreng Rappang merupakan danau paparan banjir (floodplain lake) yang unik. Ketika musim hujan tiba, luapan air Sungai Walanae dan Bila mengubah danau ini menjadi hamparan samudra tawar seluas puluhan ribu hektare. Sebaliknya, pada musim kemarau, permukaan air menyusut drastis menyisakan alur-alur sungai kecil dan menyibak hamparan daratan subur yang dimanfaatkan masyarakat sebagai lahan budidaya palawija musiman.

Namun, laju sedimentasi yang diperparah oleh penggundulan hutan di Daerah Aliran Sungai (DAS) bagian hulu mengakibatkan pendangkalan danau mencapai 15–20 sentimeter per tahun. Jika laju pendangkalan ini tidak dimitigasi secara terpadu melalui restorasi hulu dan pengerukan sedimentasi, fungsi retensi banjir Danau Tempe diproyeksikan akan lumpuh dalam dua dasawarsa mendatang, mengancam keselamatan ratusan ribu jiwa di hilir.`,
    stimulusSource: 'Diadaptasi dari Kajian Hidrologi Ekosistem Danau Nusantara (2024)',
    question: 'Apa dampak ekologis yang diprediksi akan terjadi apabila laju sedimentasi Danau Tempe terus dibiarkan tanpa penanganan mitigasi?',
    options: [
      { id: 'A', text: 'Volume air danau akan membeku menjadi daratan es permanen.' },
      { id: 'B', text: 'Hilangnya fungsi retensi (penampung) banjir danau sehingga meningkatkan risiko bencana banjir bagi kawasan hilir.' },
      { id: 'C', text: 'Air danau akan berubah menjadi air asin laut dalam hitungan bulan.' },
      { id: 'D', text: 'Kawasan Danau Tempe akan secara instan beralih fungsi menjadi kawasan industri manufaktur.' },
      { id: 'E', text: 'Masyarakat hulu tidak akan lagi membutuhkan pasokan kayu bakar.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf kedua secara eksplisit dan analitis menyatakan: "fungsi retensi banjir Danau Tempe diproyeksikan akan lumpuh dalam dua dasawarsa mendatang, mengancam keselamatan ratusan ribu jiwa di hilir". Opsi B adalah representasi dampak ekologis yang tepat.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menganalisis dampak prediktif berdasarkan informasi saintifik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Danau Tempe berada di daerah tropis beriklim khatulistiwa, mustahil membeku.',
      'C': 'Danau Tempe adalah danau air tawar pedalaman, sedimentasi tidak mengubah salinitas menjadi laut asin.',
      'D': 'Teks berbicara tentang risiko bencana hidrometeorologi, bukan rencana zonasi industri.',
      'E': 'Tidak ada relevansi antara kapasitas danau dan kebutuhan kayu bakar masyarakat.'
    },
    isValidated: true
  },
  {
    id: 'q-17',
    stimulusTitle: 'Analisis Kohesi dan Koherensi Paragraf',
    stimulusText: `Perhatikan urutan kalimat acak berikut!

(1) Akibatnya, ketersediaan air bersih di daerah hilir mengalami penurunan drastis saat musim kemarau.
(2) Degradasi tutupan vegetasi di kawasan hulu pegunungan Latimojong kian memprihatinkan.
(3) Oleh sebab itu, program penghijauan berbasis tanaman bernilai ekonomi seperti kopi dan kemiri harus segera digalakkan.
(4) Hal ini dipicu oleh pembukaan lahan perkebunan monokultur tanpa memperhatikan kaidah konservasi tanah.
(5) Kerusakan kanopi hutan tersebut mempercepat laju erosi permukaan dan menurunkan daya serap air tanah.`,
    question: 'Susunan kalimat yang tepat agar membentuk paragraf yang kohesif dan koheren adalah...',
    options: [
      { id: 'A', text: '(2) - (4) - (5) - (1) - (3)' },
      { id: 'B', text: '(2) - (1) - (4) - (5) - (3)' },
      { id: 'C', text: '(4) - (2) - (5) - (3) - (1)' },
      { id: 'D', text: '(3) - (2) - (4) - (5) - (1)' },
      { id: 'E', text: '(5) - (4) - (2) - (1) - (3)' }
    ],
    correctAnswer: 'A',
    explanation: 'Urutan logis alur nalar: Dimulai dengan pernyataan topik utama degradasi hulu (2), rujukan penyebab "Hal ini dipicu..." (4), penjelasan mekanisme kerusakan tutupan dan erosi (5), dampak lanjutan di hilir yang ditandai "Akibatnya..." (1), dan ditutup dengan simpulan rekomendatif "Oleh sebab itu..." (3).',
    competency: 'hubungan-paragraf',
    subCompetency: 'Menyusun kalimat acak menjadi paragraf padu (kohesi & koherensi)',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Menaruh kalimat (1) setelah (2) melompati penjelasan proses perusakan hutan pada (4) dan (5).',
      'C': 'Kalimat (4) memuat kata anafora "Hal ini", sehingga tidak dapat diletakkan di awal paragraf tanpa rujukan.',
      'D': 'Kalimat (3) diawali konjungsi antarkalimat penyimpul "Oleh sebab itu", tidak cocok membuka paragraf.',
      'E': 'Kalimat (5) merujuk pada "Kerusakan kanopi hutan tersebut" yang mengharuskan ada kalimat pengantar sebelumnya.'
    },
    isValidated: true
  },
  {
    id: 'q-18',
    stimulusTitle: 'Pemberdayaan Nelayan Tradisional di Pesisir Suppa',
    stimulusText: `Penerapan teknologi rumpon cerdas bertenaga surya yang dilengkapi penarik ikan akustik (acoustic fish attractor) di perairan Suppa membuktikan bahwa kearifan nelayan lokal dapat disinergikan dengan rekayasa teknologi tepat guna. Nelayan tidak lagi harus menghabiskan puluhan liter solar untuk berlayar tanpa kepastian lokasi gerombolan ikan (fishing ground). Dengan mengandalkan titik koordinat rumpon yang termonitor, waktu melaut berkurang dari 14 jam menjadi 6 jam per trip, dengan hasil tangkapan rata-rata meningkat 40%. Penghematan biaya bahan bakar tersebut langsung dialokasikan nelayan untuk membiayai pendidikan anak-anak mereka hingga ke bangku perguruan tinggi.`,
    stimulusSource: 'Dikutip dari Jurnal Inovasi Pesisir dan Kelautan Tropis (2025)',
    question: 'Pernyataan berikut yang BUKAN merupakan fakta yang termuat dalam teks adalah...',
    options: [
      { id: 'A', text: 'Rumpon cerdas menggunakan energi bertenaga surya dan pemikat akustik.' },
      { id: 'B', text: 'Waktu melaut nelayan terpangkas dari 14 jam menjadi 6 jam per trip.' },
      { id: 'C', text: 'Hasil tangkapan ikan nelayan mengalami kenaikan rata-rata sebesar 40%.' },
      { id: 'D', text: 'Pemerintah daerah membagikan rumpon cerdas secara cuma-cuma kepada seluruh nelayan di Sulawesi Selatan.' },
      { id: 'E', text: 'Efisiensi biaya bahan bakar dialihkan nelayan untuk menyokong biaya pendidikan keluarga.' }
    ],
    correctAnswer: 'D',
    explanation: 'Teks sama sekali tidak menyebutkan bahwa pemerintah membagikan rumpon cerdas secara gratis kepada seluruh nelayan di Sulawesi Selatan. Opsi D adalah informasi tambahan tanpa dasar teks.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Mengidentifikasi informasi yang tidak sesuai dengan isi teks',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Termuat secara eksplisit di kalimat pertama.',
      'B': 'Termuat secara eksplisit di kalimat ketiga.',
      'C': 'Termuat secara eksplisit di kalimat ketiga.',
      'E': 'Termuat secara eksplisit di kalimat keempat.'
    },
    isValidated: true
  },
  {
    id: 'q-19',
    stimulusTitle: 'Kritik Sastra: Resensi Antologi Puisi "Lontara Rindu"',
    stimulusText: `Dalam antologi puisi "Lontara Rindu", penyair berhasil meramu metafora alam maritim Pinrang—seperti perahu lepa-lepa, ombak Suppa, dan desau pohon asam di tepi jalan poros—menjadi simbol perantauan batin yang menggugah. Diksi yang dipilih hemat tetapi bertenaga, memanfaatkan polisemi kata dalam bahasa Bugis yang dipertautkan secara luwes dengan struktur gramatika Indonesia modern. Namun, pada beberapa sajak di bagian akhir buku, penyair tampak terlalu berambisi menyisipkan terminologi sosiologis kontemporer yang terasa artifisial, sehingga ritme liris yang telah terbangun khusyuk di awal antologi seketika menjadi patah dan kaku.`,
    stimulusSource: 'Resensi Buku Kolom Sastra Kompas Kaji Budaya (2025)',
    question: 'Inti kritik atau kelemahan karya yang diidentifikasi oleh penulis resensi di atas adalah...',
    options: [
      { id: 'A', text: 'Penyair gagal memahami makna metafora perahu lepa-lepa dan laut.' },
      { id: 'B', text: 'Penyisipan istilah sosiologis kontemporer yang terkesan dipaksakan di akhir buku merusak ritme liris puisi.' },
      { id: 'C', text: 'Penyair tidak menggunakan kosakata bahasa Indonesia baku sama sekali.' },
      { id: 'D', text: 'Buku puisi dicetak menggunakan kertas yang berkualitas rendah.' },
      { id: 'E', text: 'Tema perantauan maritim sudah terlalu klise dan membosankan pembaca.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat terakhir secara terang menunjukkan letak kritik resensator: penyisipan istilah sosiologis kontemporer yang terasa artifisial sehingga merusak ("patah dan kaku") ritme liris yang sebelumnya telah terbangun apik.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Menilai kritik dan evaluasi karya sastra (teks ulasan/resensi)',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Resensator justru memuji kepiawaian meramu metafora maritim di awal buku.',
      'C': 'Teks memuji pertautan luwes bahasa Bugis dengan gramatika Indonesia modern.',
      'D': 'Fisik kertas buku tidak dibahas dalam telaah intrinsik tersebut.',
      'E': 'Tema maritim dipuji sebagai simbol perantauan batin yang menggugah, bukan dicap membosankan.'
    },
    isValidated: true
  },
  {
    id: 'q-20',
    stimulusTitle: 'Perspektif Penulis dalam Wacana Transisi Energi',
    stimulusText: `Pembangunan pembangkit listrik tenaga bayu (PLTB) skala raksasa di perbukitan Sulawesi Selatan kerap dipromosikan sebagai tonggak gemilang revolusi energi hijau. Kita tentu sepakat bahwa emisi karbon wajib ditekan demi mencegah bencana iklim katastrofik. Kendati demikian, euforia narasi ramah lingkungan ini tidak boleh membutakan mata kita dari ongkos sosial dan ekologis lokal yang timbul. Pembukaan akses jalan turbin telah memicu fragmentasi koridor satwa endemik dan memicu kekhawatiran erosi tebing di atas permukiman warga lereng. Pembangunan yang adil iklim (climate justice) sejati harus mendengarkan suara komunitas adat lokal, bukan semata memuaskan target angka di atas kertas korporasi multi-nasional.`,
    stimulusSource: 'Diadaptasi dari Opini Harian Teropong Lingkungan (2025)',
    question: 'Bagaimanakah sikap penulis teks editorial tersebut terhadap proyek pembangunan PLTB?',
    options: [
      { id: 'A', text: 'Mendukung mutlak tanpa syarat demi percepatan perolehan keuntungan devisa korporasi asing.' },
      { id: 'B', text: 'Menolak keras seluruh bentuk energi terbarukan karena menganggap perubahan iklim hanyalah rekayasa.' },
      { id: 'C', text: 'Mendukung tujuan transisi energi hijau, tetapi bersikap kritis terhadap dampak sosial-ekologis lokal serta menuntut keadilan bagi komunitas setempat.' },
      { id: 'D', text: 'Apatis dan menganggap konflik lingkungan di perbukitan sebagai urusan lumrah yang tidak perlu diselesaikan.' },
      { id: 'E', text: 'Menuntut seluruh proyek turbin angin dipindahkan ke tengah samudra lepas tanpa studi amdal.' }
    ],
    correctAnswer: 'C',
    explanation: 'Penulis sepakat emisi karbon harus ditekan ("Kita tentu sepakat bahwa emisi karbon wajib ditekan"), tetapi kritis terhadap ekses sosial dan ekologis lokal yang timbul serta mendesak agar keadilan iklim memperhitungkan warga setempat. Sikap ini berimbang, kritis, dan solutif.',
    competency: 'tujuan-penulis',
    subCompetency: 'Menganalisis sikap, sudut pandang, dan nada tulisan penulis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penulis justru mengkritik pemenuhan target korporasi yang mengabaikan warga.',
      'B': 'Penulis mengakui perlunya menekan emisi karbon, bukan menolak energi terbarukan secara membabi buta.',
      'D': 'Penulis bersikap peduli dan berpihak pada komunitas warga, bukan apatis.',
      'E': 'Pemindahan turbin ke tengah samudra tidak ada dalam teks bacaan.'
    },
    isValidated: true
  },
  {
    id: 'q-21',
    stimulusTitle: 'Literasi Keuangan Generasi Z dan Jebakan "Paylater"',
    stimulusText: `Kemudahan akses fitur bayar nanti (*paylater*) dan pinjaman daring (pinjol) ilegal berbalut antarmuka aplikasi yang serbapraktis telah menjebak ribuan pemuda usia produktif dalam jeratan utang konsumtif. Algoritma gamifikasi belanja—seperti hitung mundur promosi kilat dan kupon diskon bertingkat—secara psikologis mengeksploitasi fenomena FOMO (*Fear of Missing Out*) di kalangan generasi muda. Tanpa dibekali literasi keuangan dasar mengenai rasio utang terhadap pendapatan (*debt-to-income ratio*) dan beban bunga berbunga, konsumsi impulsif atas barang-barang gaya hidup sesaat dapat menghancurkan skor kredit masa depan mereka sebelum karier profesional mereka benar-benar dimulai.`,
    question: 'Pesan moral tersirat yang ingin disampaikan penulis kepada pembaca muda adalah...',
    options: [
      { id: 'A', text: 'Menghindari sama sekali penggunaan telepon pintar dalam kehidupan sehari-hari.' },
      { id: 'B', text: 'Mengasah pengendalian diri dan literasi keuangan rasional agar tidak tergiur oleh ilusi kemudahan belanja berbasis utang.' },
      { id: 'C', text: 'Mengambil pinjaman daring sebanyak mungkin selama masa promosi bunga nol persen berlangsung.' },
      { id: 'D', text: 'Menutup rekening tabungan bank konvensional dan beralih ke transaksi tunai zaman purba.' },
      { id: 'E', text: 'Membeli barang mewah sesegera mungkin agar tidak dipandang remeh oleh rekan sebaya.' }
    ],
    correctAnswer: 'B',
    explanation: 'Penulis menyoroti bahaya jebakan psikologis FOMO dan ilusi kemudahan fitur utang. Pesan moral tersirat adalah pentingnya pengendalian diri dan pemahaman literasi keuangan agar tidak merusak masa depan ekonomi pribadi.',
    competency: 'simpulan-makna',
    subCompetency: 'Menyimpulkan pesan tersirat/amanat wacana sosial',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penulis menyoroti literasi keuangan, bukan menganjurkan boikot penggunaan telepon pintar.',
      'C': 'Mengambil utang sebanyak mungkin bertolak belakang dengan isi teks peringatan.',
      'D': 'Teks tidak menganjurkan penutupan rekening tabungan.',
      'E': 'Membeli barang mewah karena gengsi adalah perwujudan FOMO yang justru dikritik dalam teks.'
    },
    isValidated: true
  },
  {
    id: 'q-22',
    stimulusTitle: 'Struktur Teks Eksplanasi: Terjadinya Gelombang Panas (Heatwave)',
    stimulusText: `(1) Gelombang panas (heatwave) terjadi akibat terbentuknya kubah udara bertekanan tinggi (heat dome) di lapisan troposfer atas yang menjebak udara panas di dekat permukaan bumi layaknya penutup panci bertekanan. (2) Tekanan udara tinggi yang statis tersebut menekan massa udara ke bawah, memanaskannya secara adiabatik, dan menghalau pembentukan awan hujan. (3) Akibat ketiadaan tutupan awan, radiasi sinar matahari memanggang daratan secara leluasa selama berhari-hari. (4) Dalam struktur teks eksplanasi ilmiah, kutipan paragraf tersebut menempati bagian...`,
    question: 'Kutipan di atas menempati bagian struktur eksplanasi...',
    options: [
      { id: 'A', text: 'Pernyataan umum (identifikasi fenomena)' },
      { id: 'B', text: 'Deretan penjelas (proses kausalitas ilmiah)' },
      { id: 'C', text: 'Interpretasi atau ulasan simpulan pribadi' },
      { id: 'D', text: 'Orientasi tokoh dan latar suasana' },
      { id: 'E', text: 'Koda atau amanat moral' }
    ],
    correctAnswer: 'B',
    explanation: 'Kutipan menjelaskan kronologi dan mekanisme kausalitas ilmiah terbentuknya kubah panas (heat dome), tekanan adiabatik, hingga ketiadaan awan. Ini adalah bagian inti deretan penjelas (rangkaian proses/sebab-akibat) dalam teks eksplanasi ilmiah.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menganalisis struktur teks eksplanasi ilmiah',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Pernyataan umum biasanya hanya memperkenalkan definisi luas fenomena di awal.',
      'C': 'Interpretasi memuat tanggapan/simpulan akhir, sedangkan teks ini menjelaskan proses fisik.',
      'D': 'Orientasi adalah bagian teks naratif/cerita, bukan eksplanasi sains.',
      'E': 'Koda adalah bagian teks naratif/fabel.'
    },
    isValidated: true
  },
  {
    id: 'q-23',
    stimulusTitle: 'Pilihan Ganda Kompleks: Evaluasi Argumen Ketahanan Pangan',
    stimulusText: `Pemerintah Kabupaten Pinrang meluncurkan program diversifikasi pangan lokal dengan mempromosikan olahan sorgum, sukun, dan ubi jalar sebagai pendamping beras. Program ini dilatari oleh risiko fluktuasi cuaca ekstrem El Nino yang berpotensi memangkas produksi padi sawah irigasi. Selain itu, indeks glikemik umbi lokal terbukti lebih rendah dibanding beras putih giling sehingga lebih ramah bagi pencegahan diabetes melitus. Namun, survei preferensi konsumsi menunjukkan 85% rumah tangga masih memandang konsumsi nonberas sebagai simbol status sosial ekonomi rendah.`,
    question: 'Berdasarkan teks tersebut, manakah DUA faktor utama yang menjadi dasar kebijakan diversifikasi pangan di Pinrang? (Pilihan Ganda Kompleks)',
    options: [
      { id: 'A', text: 'Mitigasi kerentanan pasokan pangan akibat ancaman anomali iklim ekstrem seperti El Nino.' },
      { id: 'B', text: 'Menurunkan harga jual beras lokal di pasar ekspor internasional.' },
      { id: 'C', text: 'Manfaat kesehatan bagi publik karena pangan lokal alternatif memiliki indeks glikemik yang lebih rendah.' },
      { id: 'D', text: 'Keinginan warga untuk menurunkan status sosial ekonomi keluarga mereka.' },
      { id: 'E', text: 'Menghapuskan seluruh areal persawahan padi di wilayah Sulawesi Selatan.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Dua faktor pendorong utama yang jelas disebutkan dalam teks adalah: (1) Risiko cuaca ekstrem El Nino (opsi A), dan (2) Manfaat indeks glikemik lebih rendah bagi pencegahan diabetes (opsi C).',
    competency: 'evaluasi-argumen',
    subCompetency: 'Menemukan kombinasi argumen pendukung kebijakan',
    difficulty: 'sedang',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Ekspor beras internasional tidak disebut sebagai tujuan program.',
      'D': 'Warga justru memandang nonberas bernilai rendah, bukan ingin menurunkannya.',
      'E': 'Program bertujuan mendampingi beras (diversifikasi), bukan menghapus persawahan.'
    },
    isValidated: true
  },
  {
    id: 'q-24',
    stimulusTitle: 'Benar / Salah: Keakuratan Informasi Tekstual',
    stimulusText: `Perpustakaan digital SMAN 1 Pinrang menyediakan akses ke 15.000 judul buku elektronik, jurnal nasional terakreditasi, serta arsip manuskrip lontara digital. Layanan ini dapat diakses secara gratis oleh seluruh siswa dan guru aktif menggunakan akun belajar resmi sekolah.`,
    question: 'Tentukan apakah pernyataan berikut BENAR atau SALAH berdasarkan teks di atas: "Siswa SMAN 1 Pinrang diwajibkan membayar biaya langganan bulanan untuk mengunduh jurnal terakreditasi di perpustakaan digital sekolah."',
    options: [
      { id: 'A', text: 'BENAR' },
      { id: 'B', text: 'SALAH' }
    ],
    correctAnswer: 'B',
    explanation: 'Pernyataan SALAH karena teks dengan tegas menyatakan bahwa layanan tersebut "dapat diakses secara gratis oleh seluruh siswa dan guru aktif menggunakan akun belajar resmi sekolah".',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menilai kebenaran pernyataan eksplisit (Benar/Salah)',
    difficulty: 'mudah',
    type: 'benar-salah',
    misconceptions: {
      'A': 'Salah memahami informasi; teks menyatakan secara eksplisit bahwa akses layanan adalah gratis.'
    },
    isValidated: true
  },
  {
    id: 'q-25',
    stimulusTitle: 'Analisis Diksi dan Makna Kata Kiasan',
    stimulusText: `Dalam menghadapi guncangan disrupsi teknologi kecerdasan buatan, kita tidak boleh menjadi penonton yang pasif. Guru dan siswa harus berani *keluar dari zona nyaman* dan *menjemput bola* perubahan agar tidak tergilas oleh roda zaman.`,
    question: 'Makna kiasan dari ungkapan "menjemput bola" dalam konteks kalimat tersebut adalah...',
    options: [
      { id: 'A', text: 'Bermain sepak bola bersama siswa di lapangan sekolah saat jam istirahat.' },
      { id: 'B', text: 'Mengambil inisiatif secara proaktif untuk belajar dan beradaptasi sebelum tertinggal.' },
      { id: 'C', text: 'Menunggu perintah resmi dari dinas pendidikan tanpa melakukan inovasi.' },
      { id: 'D', text: 'Membeli bola baru untuk inventaris laboratorium olahraga sekolah.' },
      { id: 'E', text: 'Menolak pemanfaatan aplikasi modern karena takut menghadapi kegagalan.' }
    ],
    correctAnswer: 'B',
    explanation: 'Ungkapan idiomatik "menjemput bola" berarti bersikap proaktif, berinisiatif mendatangi atau menyongsong peluang tanpa menunggu disuruh atau dipaksa situasi.',
    competency: 'simpulan-makna',
    subCompetency: 'Menentukan makna ungkapan/idiom dalam konteks wacana',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Ini makna harfiah olahraga sepak bola, bukan makna kiasan dalam teks disrupsi teknologi.',
      'C': 'Menunggu perintah adalah sikap reaktif/pasif, kebalikan dari menjemput bola.',
      'D': 'Makna harfiah inventaris, bukan makna konotatif konteks pembelajaran.',
      'E': 'Bertolak belakang dengan pesan kalimat.'
    },
    isValidated: true
  },
  {
    id: 'q-26',
    stimulusTitle: 'Perdebatan Kurikulum Literasi Kritis (Multiteks)',
    stimulusText: `TEKS 1:
Penerapan pembelajaran berbasis proyek (project-based learning) di SMA memberikan ruang leluasa bagi siswa untuk memecahkan persoalan otentik di sekitar mereka. Dalam konteks Bahasa Indonesia, siswa tidak lagi sekadar menghafal kaidah gramatika secara teoritis di buku teks, melainkan mempraktikkannya secara nyata: menulis surat advokasi lingkungan, merancang kampanye media sosial anti-perundungan, dan menyusun teks eksposisi advokasi petani lokal. Pendekatan ini terbukti melipatgandakan motivasi belajar intrinsik serta menumbuhkan kesadaran kewargaan yang kritis.

TEKS 2:
Kendati pembelajaran berbasis proyek menjanjikan suasana kelas yang dinamis, ada risiko hilangnya penguasaan fondasi tata bahasa dan ketelitian ejaan jika guru tidak melakukan intervensi gramatikal yang ketat. Kerap kali siswa menghasilkan produk kampanye yang visualnya memikat, tetapi sarat dengan kesalahan kalimat rancu, pleonasme, dan salah nalar penulisan kata baku. Tanpa pemahaman fondasional mengenai struktur kalimat efektif dan logika paragraf kohesif, keterampilan menulis siswa akan rapuh ketika harus menghadapi penulisan karya ilmiah akademik di perguruan tinggi.`,
    stimulusSource: 'Dihimpun dari Forum Diskusi Pedagogi Bahasa Indonesia (2025)',
    question: 'Berdasarkan kedua teks tersebut, manakah DUA pernyataan yang mencerminkan hubungan konseptual yang tepat? (Pilihan Ganda Kompleks)',
    options: [
      { id: 'A', text: 'Teks 1 berfokus pada manfaat kontekstual pembelajaran berbasis proyek, sedangkan Teks 2 mengingatkan pentingnya penguatan fondasi gramatika formal.' },
      { id: 'B', text: 'Teks 1 dan Teks 2 sama-sama merekomendasikan penghapusan total materi kaidah kalimat efektif dari kurikulum SMA.' },
      { id: 'C', text: 'Teks 2 melengkapi pandangan optimis Teks 1 dengan memberikan tinjauan kritis terhadap potensi kelemahan akademik yang perlu diantisipasi guru.' },
      { id: 'D', text: 'Teks 1 menyatakan bahwa penulisan karya ilmiah di perguruan tinggi tidak lagi membutuhkan struktur tata bahasa baku.' },
      { id: 'E', text: 'Teks 2 menolak segala bentuk kampanye media sosial bertema lingkungan yang dilakukan siswa.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Hubungan kedua teks adalah komplementer-kritis. Opsi A merangkum perbedaan fokus utama kedua teks, dan opsi C menunjukkan bahwa Teks 2 bertindak sebagai koreksi/penyeimbang kritis terhadap optimisme Teks 1 agar fondasi akademik tidak terabaikan.',
    competency: 'perbandingan-teks',
    subCompetency: 'Menganalisis hubungan komparatif dua teks (Pilihan Ganda Kompleks)',
    difficulty: 'sulit',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Kedua teks tidak pernah menyarankan penghapusan kaidah kalimat efektif.',
      'D': 'Teks 2 justru menegaskan pentingnya fondasi gramatika demi kesiapan karya ilmiah di perguruan tinggi.',
      'E': 'Teks 2 mengkritik kekurangtelitian bahasa pada produk kampanye, bukan menolak temanya.'
    },
    isValidated: true
  },
  {
    id: 'q-27',
    stimulusTitle: 'Analisis Kalimat Efektif pada Surat Edaran Sekolah',
    stimulusText: `Perhatikan kutipan draf surat edaran berikut!

"Sehubungan dengan adanya daripada kegiatan simulasi Asesmen TKA yang mana akan diselenggarakan pada hari Kamis, bagi seluruh peserta didik kelas XII diharapkan untuk supaya hadir tepat waktu di ruang laboratorium komputer dengan membawa kartu peserta masing-masing."`,
    question: 'Perbaikan kutipan kalimat di atas agar menjadi kalimat yang efektif, lugas, dan baku adalah...',
    options: [
      { id: 'A', text: 'Sehubungan dengan kegiatan simulasi Asesmen TKA yang akan diselenggarakan pada hari Kamis, seluruh peserta didik kelas XII diharapkan hadir tepat waktu di laboratorium komputer dengan membawa kartu peserta.' },
      { id: 'B', text: 'Sehubungan dengan adanya daripada simulasi Asesmen TKA yang akan diselenggarakan hari Kamis, seluruh peserta didik diharapkan untuk hadir tepat waktu.' },
      { id: 'C', text: 'Bagi peserta didik kelas XII diharapkan supaya hadir tepat waktu sehubungan dengan mana kegiatan simulasi TKA akan diadakan.' },
      { id: 'D', text: 'Dalam rangka sehubungan simulasi TKA yang diselenggarakan pada hari Kamis, peserta didik kelas XII diharapkan hadir untuk supaya tepat waktu.' },
      { id: 'E', text: 'Kegiatan simulasi Asesmen TKA yang mana diselenggarakan hari Kamis mengharapkan peserta didik agar supaya hadir di lab komputer.' }
    ],
    correctAnswer: 'A',
    explanation: 'Opsi A mengeliminasi seluruh bentuk mubazir dan pleonastis: membuang kata "daripada", membuang "yang mana", mengganti "diharapkan untuk supaya" menjadi "diharapkan hadir", serta membuang preposisi "bagi" di awal klausa utama agar subjek kalimat menjadi jelas dan utuh.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menyunting kalimat rancu dan pleonastis menjadi kalimat efektif baku',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Masih mempertahankan pemborosan kata "adanya daripada".',
      'C': 'Menggunakan struktur rancu "bagi... diharapkan" yang membuat kalimat kehilangan subjek gramatikal.',
      'D': 'Menggabungkan "dalam rangka sehubungan" dan "untuk supaya" yang merupakan pleonasme ganda.',
      'E': 'Menggunakan klausa relatif bahasa Melayu pasar "yang mana" dan kontaminasi "agar supaya".'
    },
    isValidated: true
  },
  {
    id: 'q-28',
    stimulusTitle: 'Uji Klinis Beras Hitam Organik Lallatedong Pinrang',
    stimulusText: `Penelitian biomedis dari Pusat Studi Pangan Tropis menguji kandungan antosianin pada beras hitam varietas lokal Lallatedong dari Kabupaten Pinrang. Hasil uji spektrofotometri membuktikan bahwa kadar antioksidan pada varietas ini mencapai 340 mg per 100 gram, tiga kali lebih tinggi dibandingkan beras merah biasa. Senyawa antosianin tersebut terbukti secara in-vitro mampu meredam radikal bebas DPPH hingga 82% dan menghambat laju penyerapan glukosa pada usus halus mamalia percobaan.

Kendati demikian, peneliti menegaskan bahwa klaim khasiat penurunan berat badan secara drastis pada manusia belum dapat divalidasi karena pengujian baru berada pada tahap laboratorium preklinis dan belum melalui uji klinis fase ganda tersamar (double-blind randomized controlled trial) pada relawan manusia.`,
    stimulusSource: 'Diadaptasi dari Jurnal Riset Agrofarmasi Nusantara (2025)',
    question: 'Berdasarkan teks di atas, sikap ilmiah penulis terhadap klaim penurunan berat badan akibat konsumsi beras hitam Lallatedong adalah...',
    options: [
      { id: 'A', text: 'Menolak mentah-mentah kandungan antioksidan antosianin yang terdapat pada beras hitam lokal.' },
      { id: 'B', text: 'Bersikap berhati-hati dan objektif karena klaim tersebut belum didukung bukti uji klinis langsung pada manusia.' },
      { id: 'C', text: 'Menyatakan bahwa beras hitam Lallatedong aman menggantikan seluruh obat diabetes yang beredar di pasaran.' },
      { id: 'D', text: 'Mendorong masyarakat untuk mengonsumsi beras hitam sebanyak mungkin tanpa pengawasan medis.' },
      { id: 'E', text: 'Menganggap pengujian laboratorium in-vitro pada hewan mamalia sebagai bukti final yang mutlak.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf kedua secara eksplisit menunjukkan sikap kehati-hatian ilmiah peneliti: mengakui keunggulan antioksidan laboratorium, tetapi menegaskan klaim efek drastis pada manusia belum tervalidasi karena belum melewati uji klinis fase ganda tersamar.',
    competency: 'akurasi-relevansi',
    subCompetency: 'Menilai keabsahan bukti empiris dan objektivitas kesimpulan ilmiah',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Peneliti justru membuktikan kadar antosianinnya tinggi, bukan menolaknya.',
      'C': 'Klaim menggantikan seluruh obat medis adalah generalisasi liar yang berbahaya dan tidak ada dalam teks.',
      'D': 'Teks tidak menganjurkan konsumsi berlebihan tanpa batas.',
      'E': 'Peneliti menegaskan pengujian laboratorium belum cukup menjadi bukti final untuk manusia.'
    },
    isValidated: true
  },
  {
    id: 'q-29',
    stimulusTitle: 'Paradoks Desa Cerdas di Pesisir Suppa',
    stimulusText: `Pencanangan program "Desa Cerdas" (Smart Village) di pesisir Suppa yang diresmikan dengan pengadaan anjungan internet nirkabel mandiri di balai desa telah berjalan selama setahun. Pada mulanya, program ini digadang-gadang akan memotong rantai tengkulak hasil laut melalui lokapasar digital. Namun, pantauan di lapangan menunjukkan pemandangan yang kontras: hotspot internet tersebut sebagian besar disesaki oleh anak-anak usia sekolah yang bermain gim daring hingga larut malam, sementara para nelayan tetap menjual ikan tongkol tangkapan mereka kepada juragan kapal langganan dengan potongan harga sepihak karena tidak pernah mendapatkan pelatihan literasi pasar elektronik yang dijanjikan.`,
    question: 'Nada (tone) yang dominan dari penulis dalam memaparkan kondisi di atas adalah...',
    options: [
      { id: 'A', text: 'Antusias dan optimis menyambut perubahan gaya hidup modern anak-anak pesisir.' },
      { id: 'B', text: 'Kritis dan prihatin terhadap kesenjangan antara janji program dengan realitas di lapangan.' },
      { id: 'C', text: 'Marah dan menuntut penutupan fasilitas internet nirkabel di balai desa secara permanen.' },
      { id: 'D', text: 'Apatis dan menganggap ketertinggalan nelayan tradisional sebagai takdir yang lumrah.' },
      { id: 'E', text: 'Penuh pujian terhadap keberhasilan program digitalisasi balai desa Suppa.' }
    ],
    correctAnswer: 'B',
    explanation: 'Penulis menggunakan perbandingan kontras ("digadang-gadang memotong rantai tengkulak... namun pemandangan di lapangan kontras...") untuk memperlihatkan keprihatinan dan kritik bahwa infrastruktur digital tanpa pendampingan keterampilan nelayan hanya menciptakan kesia-siaan.',
    competency: 'tujuan-penulis',
    subCompetency: 'Mengidentifikasi nada emosional dan sikap retoris penulis (tone)',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penulis justru menyoroti anak bermain gim hingga larut sebagai ekses negatif, bukan menyambut antusias.',
      'C': 'Penulis tidak menuntut penutupan internet, melainkan menyoroti ketiadaan pelatihan pasar bagi nelayan.',
      'D': 'Penulis bersikap peduli terhadap nasib nelayan yang ditekan tengkulak, bukan apatis.',
      'E': 'Teks menguraikan paradoks dan kegagalan target esensial program, bukan memuji.'
    },
    isValidated: true
  },
  {
    id: 'q-30',
    stimulusTitle: 'Peninggalan Arkeologi Karst Maros-Pangkep dan Jejak Seni Cadas Tertua',
    stimulusText: `Kompleks gua karst Maros-Pangkep di Sulawesi Selatan menyimpan lukisan cadas figuratif tertua di dunia yang diperkirakan berusia lebih dari 45.000 tahun. Gambar cap tangan dan figur babi rusa purba yang digoreskan dengan pigmen oker merah membuktikan bahwa manusia prasejarah di wilayah Wallacea telah memiliki kapasitas kognitif abstrak dan tradisi penceritaan visual yang jauh lebih awal dari perkiraan arkeolog barat abad ke-20. Namun, emisi debu dari pabrik semen terdekat dan getaran peledakan batu kapur kini mengancam pengelupasan lapisan kalsit tempat lukisan tersebut menempel.`,
    question: 'Tentukan apakah pernyataan berikut BENAR atau SALAH berdasarkan teks: "Lukisan cadas babi rusa purba di Maros-Pangkep membuktikan bahwa tradisi bercerita visual manusia prasejarah di Nusantara berkembang lebih awal dibanding perkiraan para arkeolog abad ke-20."',
    options: [
      { id: 'A', text: 'BENAR' },
      { id: 'B', text: 'SALAH' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan BENAR. Teks menyatakan secara eksplisit: "membuktikan bahwa manusia prasejarah di wilayah Wallacea telah memiliki kapasitas kognitif abstrak dan tradisi penceritaan visual yang jauh lebih awal dari perkiraan arkeolog barat abad ke-20".',
    competency: 'tersurat-tersirat',
    subCompetency: 'Memvalidasi kebenaran klaim wacana arkeologis (Benar/Salah)',
    difficulty: 'mudah',
    type: 'benar-salah',
    misconceptions: {
      'B': 'Keliru membaca teks; informasi tersebut tertulis secara eksplisit dan didukung oleh kalimat kedua.'
    },
    isValidated: true
  },
  {
    id: 'q-31',
    stimulusTitle: 'Pentingnya Restorasi Padang Lamun di Pesisir Teluk Parepare',
    stimulusText: `Padang lamun (seagrass) sering kali diabaikan jika dibandingkan dengan kemegahan terumbu karang dan rimbunnya hutan bakau. Padahal, satu hektare padang lamun mampu menyerap karbon hingga 35 kali lebih cepat daripada hutan hujan tropis di daratan. Selain itu, vegetasi lamun berfungsi sebagai perangkap sedimen alami yang menjaga kejernihan air laut serta menjadi habitat mencari makan bagi penyu hijau dan dugong yang terancam punah. Oleh sebab itu, degradasi padang lamun akibat lalu lintas kapal motor dan penambangan pasir laut liar merupakan ancaman nyata bagi stabilitas biosfer laut.`,
    question: 'Gagasan utama paragraf di atas adalah...',
    options: [
      { id: 'A', text: 'Terumbu karang selalu lebih bernilai ekonomis dibandingkan padang lamun di teluk.' },
      { id: 'B', text: 'Padang lamun memiliki fungsi ekologis penyerapan karbon dan pelindung biota laut yang sangat krusial meskipun kerap diabaikan.' },
      { id: 'C', text: 'Penyu hijau dan dugong adalah hewan laut pemakan tumbuhan yang sulit beradaptasi di penangkaran.' },
      { id: 'D', text: 'Kapal motor tradisional di Teluk Parepare dilarang berlayar pada siang hari.' },
      { id: 'E', text: 'Hutan hujan tropis di daratan tidak lagi memiliki peran dalam mitigasi pemanasan global.' }
    ],
    correctAnswer: 'B',
    explanation: 'Gagasan utama mencakup keistimewaan ekologis padang lamun yang mampu menyerap karbon puluhan kali lipat dan menjaga kejernihan air, meskipun selama ini kerap dipandang sebelah mata oleh publik.',
    competency: 'ide-pokok',
    subCompetency: 'Menentukan gagasan utama wacana konservasi lingkungan',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks membandingkan perhatian publik, bukan menyatakan karang selalu lebih bernilai.',
      'C': 'Penyu dan dugong disebut sebagai biota yang mendiami lamun, bukan pokok gagasan.',
      'D': 'Larangan kapal motor siang hari adalah informasi fiktif yang tidak ada dalam teks.',
      'E': 'Teks menyatakan lamun menyerap karbon lebih cepat, bukan menegasikan peran hutan hujan.'
    },
    isValidated: true
  },
  {
    id: 'q-32',
    stimulusTitle: 'Deteksi Kesesatan Berpikir (Fallacy) dalam Debat Publik',
    stimulusText: `Dalam sebuah musyawarah warga mengenai penataan jalur pedestrian kota, seorang pembicara menyampaikan argumen: "Kita tidak perlu mendengarkan usulan Arsitek Fulan tentang penanaman pohon peneduh di trotoar. Dia itu kan baru tiga tahun tinggal di kota ini dan masih lajang, jadi dia pasti belum mengerti kebutuhan hidup masyarakat berkeluarga."`,
    question: 'Kesesatan berpikir (logical fallacy) yang dilakukan oleh pembicara tersebut adalah...',
    options: [
      { id: 'A', text: 'Argumentum ad Hominem: menyerang latar belakang personal seseorang alih-alih membantah substansi argumennya.' },
      { id: 'B', text: 'Strawman Fallacy: memelintir argumen lawan menjadi versi yang lebih lemah untuk diserang.' },
      { id: 'C', text: 'Post Hoc Ergo Propter Hoc: menyimpulkan hubungan sebab-akibat semata-mata karena urutan waktu kejadian.' },
      { id: 'D', text: 'Appeal to False Authority: mengutip pendapat tokoh yang tidak berkompeten di bidangnya.' },
      { id: 'E', text: 'False Dilemma: menyodorkan dua pilihan ekstrem seolah tidak ada alternatif ketiga.' }
    ],
    correctAnswer: 'A',
    explanation: 'Pembicara tidak membantah apakah usulan penanaman pohon peneduh itu baik atau buruk secara tata ruang, melainkan menyerang status personal sang arsitek (lama tinggal dan status pernikahan). Ini adalah definisi klasik kekeliruan bernalar *Ad Hominem*.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Mengidentifikasi jenis cacat logika / fallacy dalam teks argumentatif',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Strawman memelintir isi argumen; di sini isi argumen sama sekali tidak dibahas.',
      'C': 'Post hoc berkaitan dengan kekeliruan kausalitas kronologis waktu.',
      'D': 'Pembicara tidak mengutip otoritas palsu, melainkan merendahkan orang yang mengusulkan.',
      'E': 'False dilemma membatasi opsi menjadi hitam-putih.'
    },
    isValidated: true
  },
  {
    id: 'q-33',
    stimulusTitle: 'Kaidah Morfologi: Makna Sufiks -kan dan -i dalam Kalimat',
    stimulusText: `Perhatikan dua kalimat berikut!

(1) Ibu menghadiahi adik sebuah novel sastra karya Andrea Hirata.
(2) Ibu menghadiahkan sebuah novel sastra karya Andrea Hirata kepada adik.`,
    question: 'Berdasarkan kaidah gramatika bahasa Indonesia baku, perbedaan fungsi sintaktis dan semantis sufiks -i dan -kan pada kedua kalimat di atas adalah...',
    options: [
      { id: 'A', text: 'Sufiks -i pada kalimat (1) berobjek penerima (adik), sedangkan sufiks -kan pada kalimat (2) berobjek barang/sasaran yang dipindahkan (sebuah novel).' },
      { id: 'B', text: 'Kalimat (1) adalah bentuk tidak baku dari kalimat (2) yang menyalahi kaidah EYD V.' },
      { id: 'C', text: 'Sufiks -i menunjukkan perbuatan berulang-ulang, sedangkan -kan menunjukkan perbuatan tanpa sengaja.' },
      { id: 'D', text: 'Kalimat (2) merupakan kalimat pasif intransitif, sedangkan kalimat (1) kalimat aktif dwitransitif.' },
      { id: 'E', text: 'Kedua kalimat memiliki struktur objek yang identik dan dapat saling dipertukarkan tanpa memindahkan frasa preposisional.' }
    ],
    correctAnswer: 'A',
    explanation: 'Verba berakhiran -i mengambil objek lokatif/penerima (benefaktif) tepat di belakang predikat (menghadiahi adik...). Sebaliknya, verba berakhiran -kan mengambil tema/objek penderita yang dialihkan tepat di belakang predikat (menghadiahkan sebuah novel... kepada adik).',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Membedakan valensi dan fungsi semantis sufiks -kan dan -i',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Kedua kalimat sama-sama baku dan gramatikal dengan pola penyusunan argumen yang berbeda.',
      'C': 'Di sini sufiks -i bukan iteratif, melainkan benefaktif.',
      'D': 'Kedua kalimat sama-sama aktif transitif.',
      'E': 'Tidak dapat dipertukarkan tanpa mengubah preposisi: "Ibu menghadiahi sebuah novel adik" adalah salah.'
    },
    isValidated: true
  },
  {
    id: 'q-34',
    stimulusTitle: 'Kemandirian Pangan dan Rantai Pasok Beras Sulawesi Selatan',
    stimulusText: `Sebagai penopang 25% pasokan beras di kawasan Indonesia Timur, surplus beras Sulawesi Selatan pada tahun 2024 mencapai 1,8 juta ton. Akan tetapi, disparitas ongkos logistik antarpulau masih menjadi batu sandungan. Biaya pengapalan satu kontainer beras dari Pelabuhan Makassar ke Jayapura mencapai dua kali lipat lebih mahal dibandingkan ongkos impor beras dari Vietnam ke Surabaya. Akibatnya, harga beras di daerah terluar tetap tinggi meskipun pasokan di lumbung Sulawesi Selatan melimpah ruah.`,
    question: 'Simpulan implisit yang PALING TEPAT mengenai faktor penghambat kestabilan harga beras nasional adalah...',
    options: [
      { id: 'A', text: 'Petani di Sulawesi Selatan menolak memanen padi saat musim hujan tiba.' },
      { id: 'B', text: 'Tingginya disparitas biaya logistik maritim domestik menghambat pemerataan komoditas pangan antardaerah.' },
      { id: 'C', text: 'Kualitas beras impor dari Vietnam jauh lebih disukai oleh masyarakat Jayapura.' },
      { id: 'D', text: 'Pelabuhan Makassar tidak memiliki kapasitas kontainer yang memadai untuk kapal berukuran besar.' },
      { id: 'E', text: 'Surplus beras nasional harus segera dihentikan demi menjaga stabilitas mata uang rupiah.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat ketiga dan keempat menegaskan akar masalah: tingginya biaya pengapalan domestik antarpulau ("dua kali lipat lebih mahal dibandingkan impor") menyebabkan disparitas harga beras tetap lebar meskipun produksi di sentra pangan surplus.',
    competency: 'simpulan-makna',
    subCompetency: 'Menarik simpulan inferensial dari analisis komparasi biaya logistik',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks menyebutkan surplus beras 1,8 juta ton, membuktikan petani sukses panen raya.',
      'C': 'Teks membandingkan biaya pengapalan, bukan preferensi cita rasa beras.',
      'D': 'Kapasitas fisik pelabuhan tidak dibahas dalam teks bacaan.',
      'E': 'Menghentikan surplus beras adalah kesimpulan tidak masuk akal yang bertentangan dengan ketahanan pangan.'
    },
    isValidated: true
  },
  {
    id: 'q-35',
    stimulusTitle: 'Pilihan Ganda Kompleks: Signifikansi Sejarah Bendung Benteng Pinrang',
    stimulusText: `Bendung Benteng yang membelah aliran Sungai Saddang di Kabupaten Pinrang mulai dirancang oleh insinyur hidrologi Belanda pada tahun 1927 dan rampung sepenuhnya pada tahun 1939. Bendungan bersejarah ini mampu mengairi lebih dari 65.000 hektare sawah teknis yang membentang di Pinrang, Sidrap, dan Enrekang. Berkat keberadaan infrastruktur irigasi gravitasi ini, indeks pertanaman padi meningkat dari satu kali setahun menjadi dua hingga tiga kali setahun. Selain fungsi vitalnya dalam ketahanan pangan, arsitektur kolonial pintu air bendungan kini menjadi objek cagar budaya bernilai edukasi sejarah bagi generasi muda.`,
    question: 'Berdasarkan teks tersebut, manakah DUA peran utama Bendung Benteng bagi kemaslahatan masyarakat? (Pilihan Ganda Kompleks)',
    options: [
      { id: 'A', text: 'Meningkatkan frekuensi indeks tanam padi tahunan petani melalui sistem irigasi teknis terpadu.' },
      { id: 'B', text: 'Menjadi sumber pembangkit listrik tenaga nuklir terbesar di kawasan timur Indonesia.' },
      { id: 'C', text: 'Berfungsi sebagai warisan cagar budaya bersejarah yang memiliki nilai edukasi bagi generasi muda.' },
      { id: 'D', text: 'Menggantikan seluruh sumber mata air tawar alami di pegunungan Latimojong.' },
      { id: 'E', text: 'Menyediakan jalur transportasi kereta api bawah tanah antarkabupaten.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Dua peran utama yang tertuang jelas dalam teks: (1) Peran agraris meningkatkan indeks tanam padi dari 1 kali menjadi 2-3 kali setahun (opsi A), dan (2) Peran cagar budaya bersejarah bernilai edukasi (opsi C).',
    competency: 'evaluasi-argumen',
    subCompetency: 'Menyeleksi fakta multifungsi infrastruktur sejarah (Kompleks)',
    difficulty: 'mudah',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Bendung Benteng adalah bendung irigasi air, bukan pembangkit listrik tenaga nuklir.',
      'D': 'Teks tidak menyebut penggantian mata air alami.',
      'E': 'Transportasi kereta api bawah tanah adalah opsi mustahil yang tidak berdasar fakta.'
    },
    isValidated: true
  },
  {
    id: 'q-36',
    stimulusTitle: 'Petikan Cerpen: "Layar Terakhir Pinisi di Tepi Pantai"',
    stimulusText: `Daeng Marewa mengelus lambung kayu ulin perahu pinisi buatannya yang baru saja diturunkan ke laut dengan ritual *anrobbasa*. Sudah berbulan-bulan jemarinya yang kapalan memahat pasak demi pasak tanpa bantuan gambar cetak biru arsitektur modern. Semua ukuran perahu hidup di dalam kepalanya, diwariskan lewat bisikan almarhum ayahnya tatkala ombak malam memecah di galangan perahu Tana Beru.

Kini, seorang saudagar kaya dari Jakarta menyodorkan selembar cek bernilai ratusan juta rupiah untuk membeli perahu itu dan membawanya ke luar negeri sebagai hiasan restoran mewah. Daeng Marewa memandang laut lepas yang membiru, tempat pinisi leluhurnya menantang badai samudra hingga ke Madagaskar. Tangannya meremas cek itu perlahan, lalu meletakkannya kembali ke atas meja sang saudagar.

"Perahu ini dibuat bukan untuk menjadi sangkar emas di dalam ruangan berpendingin udara, Tuan," bisik Daeng Marewa mantap. "Napasnya adalah asin garam dan terpaan angin badai."`,
    question: 'Nilai kehidupan yang PALING KUAT tercermin dari keputusan tokoh Daeng Marewa adalah...',
    options: [
      { id: 'A', text: 'Keserakahan materi dalam meminta tambahan harga jual perahu pinisi.' },
      { id: 'B', text: 'Integritas budayawan yang menjunjung tinggi kehormatan karya cipta leluhur di atas iming-iming uang.' },
      { id: 'C', text: 'Ketakutan menghadapi persaingan bisnis perkapalan dengan pengusaha luar daerah.' },
      { id: 'D', text: 'Sikap keras kepala yang menolak bekerja sama dengan wisatawan domestik.' },
      { id: 'E', text: 'Kebingungan seorang perajin yang tidak mengerti cara mencairkan cek perbankan.' }
    ],
    correctAnswer: 'B',
    explanation: 'Keputusan Daeng Marewa menolak selembar cek ratusan juta rupiah karena tidak rela pinisi ciptaannya direduksi sekadar menjadi pajangan restoran mencerminkan integritas luhur seniman bahari yang memuliakan martabat karyanya.',
    competency: 'simpulan-makna',
    subCompetency: 'Menganalisis nilai budaya, moral, dan amanat dalam prosa naratif',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Daeng Marewa menolak cek tersebut, bukan meminta tambahan uang.',
      'C': 'Keputusan tersebut didasari kecintaan pada marwah pinisi, bukan ketakutan bersaing.',
      'D': 'Sikapnya adalah penegasan martabat karya seni bahari, bukan sekadar keras kepala tanpa alasan.',
      'E': 'Daeng Marewa menolak secara sadar dengan kalimat penolakan yang filosofis.'
    },
    isValidated: true
  },
  {
    id: 'q-37',
    stimulusTitle: 'Kohesi Konjungsi: Transisi Energi Bersih',
    stimulusText: `Perhatikan kutipan paragraf berikut!

"(1) Indonesia memiliki potensi energi surya fotovoltaik yang berlimpah di sepanjang garis khatulistiwa. (2) [...] pemanfaatan energi terbarukan ini masih tersendat oleh tingginya bea masuk komponen sel surya impor dan rumitnya perizinan transmisi jaringan listrik. (3) [...] pemerintah pusat telah menerbitkan paket regulasi insentif pajak hijau, implementasi di tingkat daerah masih lambat."`,
    question: 'Konjungsi antarkalimat yang paling tepat untuk mengisi bagian rumpang pada kalimat (2) dan (3) secara berurutan adalah...',
    options: [
      { id: 'A', text: 'Akan tetapi; Meskipun demikian' },
      { id: 'B', text: 'Oleh karena itu; Akibatnya' },
      { id: 'C', text: 'Selain itu; Bahkan' },
      { id: 'D', text: 'Sebaliknya; Maka dari itu' },
      { id: 'E', text: 'Dengan demikian; Selanjutnya' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat (2) mempertentangkan potensi melimpah (1) dengan hambatan teknis, sehingga membutuhkan konjungsi adversatif "Akan tetapi". Kalimat (3) menyatakan konsesi bahwa meskipun ada regulasi baru, pelaksanaannya masih lambat, sehingga tepat diisi "Meskipun demikian".',
    competency: 'hubungan-paragraf',
    subCompetency: 'Melengkapi paragraf rumpang dengan konjungsi antarkalimat yang kohesif',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Hubungan kalimat bukan sebab-akibat searah, melainkan pertentangan keadaan.',
      'C': 'Konjungsi "Selain itu" untuk penambahan, tidak mewakili kontradiksi gagasan.',
      'D': 'Konjungsi "Maka dari itu" mengindikasikan kesimpulan kausalitas, bukan konsesi.',
      'E': '"Dengan demikian" menandai simpulan logis, tidak cocok mengawali kalimat fakta kontradiktif.'
    },
    isValidated: true
  },
  {
    id: 'q-38',
    stimulusTitle: 'Menakar Keakuratan Kutipan Berita: Jurnalisme Investigasi',
    stimulusText: `Dalam sebuah laporan investigasi dugaan pencemaran limbah tambak udang intensif, wartawan menulis: "Kepala Dinas Lingkungan Hidup menyatakan bahwa kualitas air laut di muara sungai telah melampaui baku mutu logam berat sebesar sepuluh kali lipat dan seluruh ikan telah mati tanpa sisa."

Namun, rekaman wawancara audio resmi menunjukkan pejabat terkait sebenarnya hanya berujar: "Kadar amonia terlarut di sekitar saluran pembuangan tambak melebihi ambang batas baku mutu sekitar 10%, dan kami masih menunggu hasil uji laboratorium toksisitas terhadap sampel biota laut."`,
    question: 'Penyimpangan etika jurnalistik yang paling mendasar dalam laporan berita tersebut adalah...',
    options: [
      { id: 'A', text: 'Penggunaan rekaman audio tanpa seizin operator telepon seluler.' },
      { id: 'B', text: 'Dramatisasi dan fabrikasi informasi kutipan pejabat secara berlebihan (sensasionalisme berita) yang memicu kepanikan sosial.' },
      { id: 'C', text: 'Keterlambatan wartawan dalam mengunggah naskah berita ke portal daring.' },
      { id: 'D', text: 'Pewawancara tidak menanyakan nama lengkap dan gelar akademis narasumber.' },
      { id: 'E', text: 'Wartawan menulis berita menggunakan kosakata bahasa Indonesia baku.' }
    ],
    correctAnswer: 'B',
    explanation: 'Wartawan memanipulasi keterangan narasumber dari "amonia melebihi 10%" menjadi "logam berat melampaui sepuluh kali lipat dan seluruh ikan mati tanpa sisa". Ini adalah pelanggaran akurasi berat berupa sensasionalisme dan fabrikasi kutipan fakta.',
    competency: 'akurasi-relevansi',
    subCompetency: 'Mengevaluasi keakuratan kutipan narasumber dan etika verifikasi fakta',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Merekam wawancara konfirmasi adalah prosedur standar jurnalisme investigasi.',
      'C': 'Masalah utama adalah pemalsuan akurasi isi, bukan kecepatan mengunggah berita.',
      'D': 'Menanyakan gelar bukan esensi utama kebenaran isi substansi berita.',
      'E': 'Bahasa baku adalah kewajiban jurnalistik positif, bukan penyimpangan.'
    },
    isValidated: true
  },
  {
    id: 'q-39',
    stimulusTitle: 'Kaidah Ejaan: Penggunaan Tanda Baca Titik Koma (;) dan Titik Dua (:) Sesuai EYD V',
    stimulusText: `Perhatikan beberapa contoh kalimat berikut!

(1) Ibu membeli perlengkapan dapur: wajan, panci, dan spatula.
(2) Hari sudah larut malam; adik masih sibuk mengerjakan tugas sekolah.
(3) SMAN 1 Pinrang memiliki tiga jurusan: yaitu MIPA, IPS, dan Bahasa.
(4) Peserta ujian wajib membawa: kartu ujian, pensil 2B, dan penghapus.
(5) Syarat penerimaan beasiswa adalah berprestasi akademik; memiliki integritas moral; dan aktif berorganisasi.`,
    question: 'Kalimat yang menggunakan tanda baca titik dua (:) atau titik koma (;) secara TEPAT sesuai kaidah EYD V adalah...',
    options: [
      { id: 'A', text: '(1) dan (2)' },
      { id: 'B', text: '(3) dan (4)' },
      { id: 'C', text: '(4) dan (5)' },
      { id: 'D', text: '(2) dan (3)' },
      { id: 'E', text: '(1) dan (4)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat (1) tepat karena titik dua digunakan pada akhir pernyataan lengkap yang diikuti perincian. Kalimat (2) tepat karena titik koma memisahkan bagian kalimat majemuk setara tanpa konjungsi. Kalimat (3) salah karena mendahului kata "yaitu". Kalimat (4) salah karena perincian melengkapi predikat "wajib membawa" tanpa ada klausa lengkap sebelumnya.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menganalisis kaidah penulisan tanda baca titik dua dan titik koma (EYD V)',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Kalimat (3) redundan memakai titik dua sebelum kata penjelas "yaitu"; kalimat (4) tidak boleh memotong predikat dengan titik dua.',
      'C': 'Kalimat (4) salah kaidah pemakaian tanda titik dua; kalimat (5) salah pemakaian titik koma di dalam kalimat tunggal.',
      'D': 'Kalimat (3) menyalahi aturan pemakaian titik dua setelah klausa tak lengkap.',
      'E': 'Kalimat (4) salah karena tanda titik dua tidak boleh dipakai jika perincian merupakan pelengkap predikat.'
    },
    isValidated: true
  },
  {
    id: 'q-40',
    stimulusTitle: 'Evaluasi Logika Wacana: Kebijakan Kantin Bebas Plastik',
    stimulusText: `Semua pedagang kantin di SMAN 1 Pinrang yang telah tersertifikasi program Sekolah Adiwiyata wajib menyediakan kemasan makanan berbahan daun pisang atau wadah guna ulang ramah lingkungan. Ibu Fatimah adalah pedagang kantin resmi yang telah lulus sertifikasi Sekolah Adiwiyata sejak semester lalu.`,
    question: 'Tentukan apakah simpulan deduktif silogistik berikut BENAR atau SALAH: "Ibu Fatimah tidak diperkenankan menjual makanan dengan kemasan plastik sekali pakai di lingkungan sekolah SMAN 1 Pinrang."',
    options: [
      { id: 'A', text: 'BENAR' },
      { id: 'B', text: 'SALAH' }
    ],
    correctAnswer: 'A',
    explanation: 'Simpulan BENAR secara logika deduktif (modus ponens). Premis mayor: Semua pedagang bersertifikat Adiwiyata wajib kemasan ramah lingkungan (tanpa plastik sekali pakai). Premis minor: Ibu Fatimah adalah pedagang bersertifikat Adiwiyata. Konklusi: Ibu Fatimah tidak boleh memakai plastik sekali pakai.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Menilai kesahihan simpulan deduktif silogisme wacana (Benar/Salah)',
    difficulty: 'mudah',
    type: 'benar-salah',
    misconceptions: {
      'B': 'Keliru memahami penalaran deduktif; simpulan merupakan konsekuensi logis mutlak dari premis yang ada.'
    },
    isValidated: true
  },
  {
    id: 'q-41',
    stimulusTitle: 'Perbandingan Dua Teks: Modernisasi Kapal Tangkap Nelayan Nusantara',
    stimulusText: `TEKS 1:
Penggantian perahu tradisional berbahan kayu dengan kapal motor fiberglass modern berkapasitas 30 Gross Tonage (GT) di kalangan nelayan pesisir Sulawesi Selatan membawa lonjakan hasil tangkapan ikan cakalang hingga ke zona perairan laut lepas ZEE. Dengan dilengkapi radar navigasi satelit dan pendingin palka berbasis pembeku cepat, nelayan dapat berlayar hingga radius 100 mil laut tanpa khawatir kualitas ikan menurun saat tiba di pelabuhan pendaratan. Modernisasi armada kapal adalah kunci utama mewujudkan kedaulatan industri maritim Indonesia.

TEKS 2:
Ekspansi kapal tangkap berukuran besar bermesin diesel intensif menyimpan ancaman terselubung terhadap daya dukung lestari (maximum sustainable yield) sumber daya perikanan nasional. Ketika kapal-kapal besar beroperasi secara masif tanpa pembatasan kuota penangkapan terukur, kawanan ikan pelagis di daerah pemijahan terancam terkuras habis (overfishing). Nelayan tradisional berperahu kecil dengan alat tangkap pancing ulur yang ramah lingkungan kian tersingkir ke perairan pinggiran yang kian minim stok ikannya.`,
    stimulusSource: 'Kumpulan Esai Ekonomi Maritim dan Keberlanjutan Ekologi (2025)',
    question: 'Persamaan fokus tema yang diperbincangkan dalam Teks 1 dan Teks 2 adalah...',
    options: [
      { id: 'A', text: 'Dampak ekonomi dan ekologis dari modernisasi armada penangkapan ikan di laut nusantara.' },
      { id: 'B', text: 'Kegagalan total industri pembuatan perahu kayu tradisional di Sulawesi Selatan.' },
      { id: 'C', text: 'Kenaikan harga bahan bakar solar bagi nelayan berperahu motor tempel.' },
      { id: 'D', text: 'Penyebab penurunan kadar garam air laut di kawasan perairan terluar ZEE.' },
      { id: 'E', text: 'Penolakan terhadap teknologi radar satelit oleh perhimpunan nelayan tradisional.' }
    ],
    correctAnswer: 'A',
    explanation: 'Kedua teks sama-sama membicarakan dampak modernisasi armada penangkapan ikan besar di laut: Teks 1 dari kacamata peningkatan kapasitas tangkap ekonomi maritim, Teks 2 dari kacamata risiko overfishing dan dampak sosial ekologis.',
    competency: 'perbandingan-teks',
    subCompetency: 'Menentukan persamaan tema payung dari dua teks komparatif',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Kedua teks tidak membahas kepunahan pembuatan perahu kayu.',
      'C': 'Persoalan harga solar bukan fokus utama perdebatan kedua teks.',
      'D': 'Kadar garam air laut sama sekali tidak dibicarakan dalam kedua teks.',
      'E': 'Kedua teks tidak menyebut penolakan nelayan terhadap teknologi radar.'
    },
    isValidated: true
  },
  {
    id: 'q-42',
    stimulusTitle: 'Analisis Karakter Tokoh: Cuplikan Naskah Drama "Pintu Harapan"',
    stimulusText: `(Latar: Ruang perpustakaan sekolah yang hening. Rahmat berdiri di depan rak buku sambil memegang formulir pendaftaran beasiswa kuliah. Di sampingnya, Pak Guru Surya sedang menata tumpukan kamus.)

RAHMAT: (Menghela napas berat) "Saya ragu mengirim formulir ini, Pak. Ayah saya hanya buruh pemetik cabai di Mattiro Sompe. Kalaupun saya lolos seleksi beasiswa, biaya hidup di kota besar pasti akan membebani keluarga saya."

PAK SURYA: (Berhenti menata buku, menatap Rahmat dengan tatapan teduh namun tegas) "Rahmat, dengarkan saya. Kemiskinan tidak pernah menjadi aib bagi orang yang berilmu. Aib yang sesungguhnya adalah ketika seorang pemuda diberi akal yang cemerlang tetapi memilih menyerah sebelum bertarung di medan laga. Pergilah kirimkan formulir itu. Pintu tidak akan pernah terbuka jika kamu hanya memandangi kuncinya dari kejauhan."`,
    question: 'Berdasarkan cuplikan naskah drama di atas, watak tokoh Pak Surya yang paling menonjol adalah...',
    options: [
      { id: 'A', text: 'Keras hati dan memaksakan kehendak pribadinya kepada siswa tanpa kompromi.' },
      { id: 'B', text: 'Bijaksana, empatik, serta mampu memberikan motivasi pemantik keberanian bagi siswanya.' },
      { id: 'C', text: 'Acuh tak acuh terhadap kesulitan finansial yang dihadapi keluarga anak didiknya.' },
      { id: 'D', text: 'Skeptis dan meragukan kemampuan intelektual tokoh Rahmat untuk meraih beasiswa.' },
      { id: 'E', text: 'Materialistis dan hanya mementingkan status sosial perguruan tinggi ternama.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pak Surya menunjukkan empati mendalam sekaligus kebijaksanaan seorang pendidik sejati dengan memberikan perspektif berharga bahwa kemiskinan bukan aib dan menyemangati Rahmat untuk berani mencoba meraih masa depan.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menganalisis perwatakan dan karakter tokoh dalam karya sastra drama',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Nada bicaranya teduh dan memotivasi, bukan memaksakan kehendak secara arogan.',
      'C': 'Pak Surya mendengarkan keluhan Rahmat secara saksama, membuktikan kepeduliannya.',
      'D': 'Pak Surya justru memuji akal cemerlang Rahmat dan melarangnya menyerah.',
      'E': 'Tidak ada unsur materialistis dalam nasihat moral Pak Surya.'
    },
    isValidated: true
  },
  {
    id: 'q-43',
    stimulusTitle: 'Analisis Sikap Redaksi: Teks Editorial "Nasib Kesejahteraan Pendidik"',
    stimulusText: `Kita patut mengapresiasi peluncuran beragam platform digital pembelajaran dan kurikulum merdeka yang serbacanggih. Namun, ironi besar masih terpampang nyata di depan mata: ribuan guru honorer di pelosok nusantara masih digaji di bawah upah minimum yang tidak manusiawi, bahkan kerap menunggak berbulan-bulan. Sungguh sebuah kenaifan apabila kita menuntut terciptanya generasi emas 2045 yang unggul dalam literasi dan numerasi jika mereka yang berada di garda terdepan pentas pendidikan terus dibiarkan berjuang memenuhi kebutuhan pokok dapur mereka. Kesejahteraan guru adalah harga mati bagi kemartabatan suatu bangsa.`,
    stimulusSource: 'Kutipan Editorial Tajuk Rencana Kompas Pendidikan (2025)',
    question: 'Tujuan utama redaksi menulis teks editorial di atas adalah...',
    options: [
      { id: 'A', text: 'Mendesak penghentian total digitalisasi pembelajaran di seluruh sekolah negeri.' },
      { id: 'B', text: 'Mengingatkan pemerintah dan publik bahwa peningkatan kesejahteraan guru adalah prasyarat mutlak kemajuan mutu pendidikan nasional.' },
      { id: 'C', text: 'Mengkritik guru honorer yang kurang bersyukur terhadap penghasilan yang diterimanya.' },
      { id: 'D', text: 'Menyarankan agar seluruh guru honorer mengundurkan diri dan beralih menjadi pengusaha digital.' },
      { id: 'E', text: 'Membuktikan bahwa kurikulum merdeka adalah penyebab utama kemiskinan tenaga pendidik.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat argumentatif dan penegasan akhir editorial menegaskan pesan utama redaksi: mustahil mengharapkan generasi emas tanpa menjamin kesejahteraan layak para guru yang mendidik mereka.',
    competency: 'tujuan-penulis',
    subCompetency: 'Menemukan fungsi persuasif dan pesan utama teks editorial',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Redaksi mengapresiasi platform digital, bukan meminta penghentiannya.',
      'C': 'Redaksi membela dan memperjuangkan nasib guru honorer, bukan mengkritik mereka.',
      'D': 'Teks tidak menyarankan pengunduran diri guru.',
      'E': 'Kurikulum bukan kambing hitam kemiskinan; redaksi menyoroti kebijakan alokasi upah.'
    },
    isValidated: true
  },
  {
    id: 'q-44',
    stimulusTitle: 'Evaluasi Objektivitas Informasi: Pemberitaan Bencana Ekologis',
    stimulusText: `Menyusul terjadinya bencana tanah longsor di kawasan perbukitan Latimojong, sebuah portal berita lokal memberitakan: "Longsor dahsyat murni diakibatkan oleh curah hujan ekstrem yang tidak wajar akibat siklon tropis samudra." Sementara itu, laporan investigasi resmi Badan Geologi dan Kementerian Lingkungan Hidup menyatakan bahwa curah hujan tinggi hanyalah pemicu akhir (*trigger factor*), sedangkan faktor primer penyebab kerentanan lereng adalah alih fungsi 400 hektare hutan lindung menjadi kebun sayur monokultur tanpa terasering selama lima tahun terakhir.`,
    question: 'Berdasarkan perbandingan kedua sumber informasi tersebut, kelemahan berita portal lokal adalah...',
    options: [
      { id: 'A', text: 'Terlalu banyak memuat data statistik geologis yang membingungkan pembaca awam.' },
      { id: 'B', text: 'Mengabaikan faktor struktural antropogenik (kerusakan lingkungan akibat ulah manusia) dan menyederhanakan bencana semata-mata sebagai takdir fenomena cuaca alamiah.' },
      { id: 'C', text: 'Wartawan portal lokal menggunakan wawancara langsung dengan warga korban longsor.' },
      { id: 'D', text: 'Berita tersebut ditulis dengan gaya bahasa investigasi ilmiah yang sangat mendalam.' },
      { id: 'E', text: 'Kementerian Lingkungan Hidup tidak memiliki otoritas dalam mengukur curah hujan lereng.' }
    ],
    correctAnswer: 'B',
    explanation: 'Portal berita lokal melakukan penyederhanaan bias (*oversimplification*) dengan mengklaim bencana murni karena hujan ekstrem, mengabaikan temuan ilmiah Badan Geologi bahwa penyebab primernya adalah kerusakan hutan oleh aktivitas manusia (antropogenik).',
    competency: 'akurasi-relevansi',
    subCompetency: 'Mengevaluasi bias informasi dan kelengkapan perspektif dalam berita',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Portal berita lokal justru minim data dan menyederhanakan penyebab.',
      'C': 'Wawancara dengan warga korban bukan kelemahan metodologi verifikasi.',
      'D': 'Gaya bahasa portal lokal dangkal dan sepihak, bukan investigasi mendalam.',
      'E': 'Kementerian dan Badan Geologi adalah otoritas resmi mitigasi bencana geologi.'
    },
    isValidated: true
  },
  {
    id: 'q-45',
    stimulusTitle: 'Kaidah Kata Serapan dan Ejaan Baku EYD V dalam Penulisan Ilmiah',
    stimulusText: `Cermatilah kutipan paragraf karya ilmiah siswa berikut!

"Untuk mencapai (1) *standardisasi* mutu lulusan yang unggul, sekolah perlu menerapkan tata kelola yang (2) *kongkrit* dan menjaga (3) *hierarki* koordinasi yang terarah. Setiap pendidik wajib meningkatkan (4) *kualitas* pembelajaran agar tercipta iklim akademik yang (5) *kondusip* bagi tumbuh kembang siswa."`,
    question: 'Dua kata serapan yang TIDAK BAKU dalam kutipan paragraf di atas adalah...',
    options: [
      { id: 'A', text: '(1) dan (3)' },
      { id: 'B', text: '(2) dan (5)' },
      { id: 'C', text: '(3) dan (4)' },
      { id: 'D', text: '(1) dan (4)' },
      { id: 'E', text: '(2) dan (3)' }
    ],
    correctAnswer: 'B',
    explanation: 'Kata (2) *kongkrit* tidak baku (bentuk baku menurut KBBI dan EYD V adalah **konkret**). Kata (5) *kondusip* tidak baku (bentuk baku adalah **kondusif** dengan huruf f). Kata *standardisasi*, *hierarki*, dan *kualitas* sudah baku.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Mendeteksi kata serapan asing yang tidak baku dalam teks ilmiah (EYD V)',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Standardisasi dan hierarki merupakan bentuk baku serapan.',
      'C': 'Hierarki dan kualitas sudah sesuai pedoman penyerapan kata baku.',
      'D': 'Standardisasi dan kualitas adalah bentuk yang benar.',
      'E': 'Hierarki adalah kata baku; kesalahan hanya pada kata konkret dan kondusif.'
    },
    isValidated: true
  },
  {
    id: 'q-46',
    stimulusTitle: 'Kecerdasan Buatan Generatif dan Integritas Penulisan Akademik Siswa',
    stimulusText: `Kehadiran peranti kecerdasan buatan generatif (Generative AI) di lingkungan sekolah menengah atas telah memicu polarisasi pandangan di kalangan pendidik. Di satu sisi, sebagian guru memandang peranti ini sebagai ancaman serius terhadap integritas akademik karena siswa dengan mudah dapat menghasilkan esai argumentatif dalam hitungan detik tanpa proses perenungan mendalam. Sebaliknya, kelompok pendidik progresif berargumen bahwa pelarangan total teknologi merupakan langkah anakronistis yang sia-sia.

Menurut mereka, AI seharusnya diperlakukan selayaknya kalkulator dalam matematika: bukan untuk meniadakan penalaran logika, melainkan sebagai mitra dialog awal (sparing partner) guna memantik hipotesis, memperkaya kosakata, dan memetakan struktur wacana. Kunci utamanya terletak pada transformasi rubrik penilaian yang bergeser dari sekadar menilai produk teks akhir menuju evaluasi proses bernalar, keterlacakan sumber primer, dan orisinalitas refleksi kritis siswa.`,
    stimulusSource: 'Diadaptasi dari Jurnal Inovasi Pedagogik Digital Indonesia (2025)',
    question: 'Berdasarkan teks di atas, asumsi mendasar yang melandasi pandangan kelompok pendidik progresif adalah...',
    options: [
      { id: 'A', text: 'Siswa SMA telah memiliki kedewasaan etis dan literasi digital yang sempurna sehingga tidak membutuhkan bimbingan guru.' },
      { id: 'B', text: 'Melarang teknologi baru tidak akan menghentikan penggunaannya, sehingga integrasi terarah dengan penyesuaian evaluasi bernalar jauh lebih konstruktif.' },
      { id: 'C', text: 'Kecerdasan buatan generatif pada akhirnya akan menggantikan peran guru dalam mengajarkan penulisan esai kritis.' },
      { id: 'D', text: 'Karya tulis yang dihasilkan oleh kecerdasan buatan memiliki bobot literasi yang setara dengan karya orisinal siswa berprestasi.' },
      { id: 'E', text: 'Penggunaan kalkulator dan peranti digital tidak memiliki dampak psikologis apa pun terhadap retensi memori jangka panjang.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pendidik progresif memandang pelarangan total sebagai langkah anakronistis (sia-sia) dan mengusulkan AI diintegrasikan sebagai mitra dialog dengan mengubah asesmen ke arah evaluasi proses bernalar dan orisinalitas refleksi. Asumsi dasarnya adalah integrasi terarah jauh lebih efektif daripada pelarangan kaku.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Mengidentifikasi asumsi dasar di balik argumen wacana',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks tidak mengasumsikan siswa sudah sempurna secara etis, melainkan menuntut pengawasan lewat rubrik baru.',
      'C': 'Pendidik progresif tidak berasumsi guru akan digantikan oleh AI, melainkan AI berperan sebagai mitra awal.',
      'D': 'Teks tidak menyamakan kualitas tulisan bot AI dengan karya orisinal bernalar kritis.',
      'E': 'Retensi memori jangka panjang tidak dibahas dalam teks.'
    },
    isValidated: true
  },
  {
    id: 'q-47',
    stimulusTitle: 'Potret Ekspor Komoditas Beras dan Udang Windu Pinrang (2024–2025)',
    stimulusText: `Berdasarkan data Dinas Ketahanan Pangan dan Perdagangan Kabupaten Pinrang, volume pasokan beras premium ke luar provinsi pada kuartal IV tahun 2024 mencapai 62.000 ton, mengalami kenaikan sebesar 12% dibandingkan periode yang sama tahun sebelumnya. Kenaikan ini didorong oleh penerapan kalender tanam terpadu dan ketersediaan air saluran sekunder Bendung Benteng.

Pada saat yang sama, komoditas udang windu tambak dari pesisir Suppa dan Lanrisang mencatatkan nilai transaksi Rp84 miliar, kendati volumenya mengalami sedikit penurunan (4%) akibat anomali salinitas air laut. Menariknya, margin keuntungan petani tambak justru meningkat karena sertifikasi ekspor organik yang meningkatkan harga tawar di pasar ekspor mancanegara (Jepang dan Uni Eropa).`,
    stimulusSource: 'Laporan Perkembangan Komoditas Unggulan Lasinrang (2025)',
    question: 'Berdasarkan kutipan laporan di atas, manakah DUA pernyataan yang merupakan inferensi valid? (Pilihlah dua jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Peningkatan volume pasokan beras premium Pinrang ke luar wilayah berbanding lurus dengan optimalisasi manajemen pengairan irigasi teknis.' },
      { id: 'B', text: 'Penurunan volume panen udang windu secara otomatis menurunkan pendapatan riil para petambak pesisir Suppa dan Lanrisang.' },
      { id: 'C', text: 'Nilai ekonomi suatu komoditas perikanan tidak hanya ditentukan oleh kuantitas tonase fisik, tetapi juga oleh standar sertifikasi dan mutu produk.' },
      { id: 'D', text: 'Seluruh hasil produksi beras dan tambak udang di Kabupaten Pinrang dialokasikan untuk pasar luar negeri tanpa konsumsi domestik.' },
      { id: 'E', text: 'Salinitas air laut di pesisir Suppa dapat dikendalikan sepenuhnya melalui pengaturan pintu air Bendung Benteng.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Pernyataan A benar karena teks menegaskan kenaikan pasokan beras didorong oleh kalender tanam dan air irigasi Bendung Benteng. Pernyataan C benar karena meskipun volume fisik udang turun 4%, margin keuntungan petambak justru naik berkat sertifikasi ekspor organik yang menaikkan nilai tawar.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menarik kesimpulan inferensial jamak dari data verbal multivariabel',
    difficulty: 'sulit',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Bertentangan dengan teks; margin keuntungan petambak justru meningkat karena sertifikasi organik.',
      'D': 'Teks menyebut beras dikirim ke luar provinsi, bukan berarti nihil konsumsi masyarakat setempat.',
      'E': 'Bendung Benteng melayani jaringan irigasi air tawar persawahan, bukan mengontrol salinitas laut lepas.'
    },
    isValidated: true
  },
  {
    id: 'q-48',
    stimulusTitle: 'Musyawarah Adat Tudang Sipulung dan Modernisasi Kalender Tanam BMKG',
    stimulusText: `Teks 1:
Tradisi Tudang Sipulung (duduk bermusyawarah) di masyarakat agraris Pinrang merupakan pranata kearifan lokal yang mempertemukan para pemangku adat, pappalontara (ahli astronomi/cuaca tradisional), kelompok tani, dan pemerintah daerah. Dalam forum ini, penentuan awal musim tanam (mappalili) diputuskan berdasarkan pembacaan tanda-tanda alam, seperti peredaran bintang Bintang Walue (Orion) dan perilaku migrasi kawanan burung bangau. Tudang Sipulung bukan sekadar musyawarah teknis bercocok tanam, melainkan ritual pengikat kohesi sosial dan kepatuhan kolektif petani terhadap pembagian air yang adil.`,
    stimulusText2: `Teks 2:
Stasiun Klimatologi BMKG Sulawesi Selatan kini rutin menerbitkan pembaruan Dasarian Kalender Tanam Terpadu berbasis satelit cuaca resolusi tinggi dan pemodelan dinamika atmosfer Nino 3.4. Data anomali curah hujan dan potensi kekeringan hidrologis disajikan secara kuantitatif melalui aplikasi digital. Kendati menyajikan data akurat, penyuluh pertanian lapangan sering menemui kendala diseminasi: rekomendasi ilmiah BMKG kerap diabaikan petani di desa jika tidak selaras dengan maklumat hasil Tudang Sipulung yang telah disepakati bersama tokoh adat.`,
    question: 'Berdasarkan kedua teks tersebut, bagaimana hubungan fungsional yang paling konstruktif antara kearifan lokal Tudang Sipulung (Teks 1) dan data sains BMKG (Teks 2)?',
    options: [
      { id: 'A', text: 'Tradisi Tudang Sipulung harus dihentikan sepenuhnya karena pembacaan bintang tidak memiliki landasan metodologi sains modern.' },
      { id: 'B', text: 'BMKG sebaiknya membatasi publikasi data cuaca hanya untuk penerbangan komersial dan membiarkan petani memakai firasat tradisional.' },
      { id: 'C', text: 'Forum Tudang Sipulung dapat dijadikan wahana deliberatif untuk menyosialisasikan dan menyelaraskan proyeksi ilmiah BMKG dengan legitimasi adat.' },
      { id: 'D', text: 'Petani cukup mengunduh aplikasi BMKG secara mandiri tanpa perlu menghadiri musyawarah desa dengan pemangku adat.' },
      { id: 'E', text: 'Menyerahkan seluruh keputusan kalender tanam kepada otoritas swasta pemasok benih dan pestisida komersial.' }
    ],
    correctAnswer: 'C',
    explanation: 'Teks 1 menunjukkan Tudang Sipulung memiliki legitimasi adat dan pengikat kepatuhan sosial yang kuat. Teks 2 menunjukkan data BMKG butuh kanal penerimaan sosial. Integrasi paling konstruktif adalah menjadikan forum Tudang Sipulung sebagai ruang dialog resmi memadukan sains BMKG dengan kearifan adat.',
    competency: 'perbandingan-teks',
    subCompetency: 'Mengintegrasikan gagasan komplementer dari dua teks berbeda perspektif',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Mengabaikan fungsi kohesi sosial dan kepatuhan kolektif yang esensial dalam tata kelola air.',
      'B': 'Sikap pasif yang merugikan petani menghadapi anomali iklim global.',
      'D': 'Menafikan realitas bahwa petani terikat pada keputusan komunal musyawarah desa.',
      'E': 'Di luar konteks wacana kedua teks.'
    },
    isValidated: true
  },
  {
    id: 'q-49',
    stimulusTitle: 'Keefektifan Kalimat dan Kesejajaran Bentuk dalam Paragraf Opini',
    stimulusText: `Cermatilah kutipan paragraf berikut!
(1) Perkembangan ekonomi kreatif di kalangan generasi muda daerah terus memperlihatkan tren positif. (2) Berbagai produk olahan pangan lokal kini mulai dikemas secara modern dan higienis. (3) *Untuk meningkatkan daya saing pasar, pelaku UMKM tidak hanya harus menjaga kualitas cita rasa, tetapi juga mereka dituntut menguasai strategi pemasaran digital yang inovatif.* (4) Langkah tersebut diharapkan mampu memperluas jangkauan distribusi hingga ke pasar mancanegara.`,
    question: 'Kalimat (3) pada kutipan di atas tidak efektif karena melanggar prinsip keparalelan (kesejajaran bentuk). Perbaikan yang paling tepat adalah...',
    options: [
      { id: 'A', text: 'Untuk meningkatkan daya saing pasar, pelaku UMKM tidak hanya harus menjaga kualitas cita rasa, tetapi juga harus menguasai strategi pemasaran digital yang inovatif.' },
      { id: 'B', text: 'Untuk meningkatkan daya saing pasar, pelaku UMKM harus tidak hanya menjaga kualitas rasa, melainkan juga penguasaan strategi pasar digital.' },
      { id: 'C', text: 'Dalam rangka meningkatkan persaingan di pasar, pelaku UMKM baik menjaga cita rasa serta pemasaran digitalnya.' },
      { id: 'D', text: 'Meningkatkan daya saing pasar, pengusaha menjaga cita rasa dan mereka menguasai pemasaran digital.' },
      { id: 'E', text: 'Pelaku UMKM menjaga kualitas rasa dan strategi pemasaran digital dituntut untuk dikuasai demi daya saing pasar.' }
    ],
    correctAnswer: 'A',
    explanation: 'Konjungsi korelatif "tidak hanya ... tetapi juga ..." mensyaratkan kesejajaran bentuk verba aktif transitif: "tidak hanya harus menjaga ..., tetapi juga harus menguasai ...". Opsi A mengeliminasi frasa subjek berulang ("mereka dituntut") sehingga kalimat menjadi padu, sejajar, dan efektif.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Memperbaiki ketidaksejajaran bentuk (paralelisme) pada kalimat majemuk korelatif',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Pasangan "tidak hanya ... melainkan juga" rancu dan bentukan nomina "penguasaan" tidak paralel dengan verba "menjaga".',
      'C': 'Konjungsi "baik ... serta" salah secara kaidah sintaksis Indonesia.',
      'D': 'Menghilangkan anak kalimat keterangan tujuan yang gramatikal.',
      'E': 'Struktur menjadi rancu dan terbolak-balik antara fokus subjek dan predikat pasif.'
    },
    isValidated: true
  },
  {
    id: 'q-50',
    stimulusTitle: 'Perahu Pinisi Tua di Muara Suppa',
    stimulusText: `Matahari condong ke barat, membiaskan rona tembaga di perairan Teluk Suppa. Kakek Baso masih duduk bersila di atas geladak perahu kayunya yang telah berusia empat dasawarsa. Jemari tuanya yang berurat kasar dengan telaten mengoleskan gala-gala kelapa bercampur damar ke sela-sela papan lambung perahu. Di dermaga beton seberang muara, perahu-perahu fiber bermesin tempel menderu riuh, siap menerjang ombak dengan kecepatan berlipat ganda.

"Baso, sampai kapan kau rawat kayu rapuh itu? Juallah kayunya ke pembuat mebel antik, belilah perahu fiber subsidi!" teriak seorang juragan tambak muda yang melintas di dermaga.

Kakek Baso hanya tersenyum tipis tanpa mengangkat pandangannya. "Perahu ini bukan sekadar peranti penangkap ikan, Daeng. Di tiap lekuk pasak kayunya, ada doa leluhur yang pantang karam oleh ketergesaan zaman."`,
    question: 'Evaluasilah kebenaran pernyataan berikut berdasarkan nilai moral dalam kutipan cerita di atas:\n\n"Sikap Kakek Baso merefleksikan prinsip keteguhan memelihara warisan identitas dan martabat tradisi maritim leluhur kendati berhadapan dengan desakan pragmatisme dan efisiensi serbuan teknologi modern."',
    options: [
      { id: 'A', text: 'Benar' },
      { id: 'B', text: 'Salah' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan bernilai BENAR. Sikap Kakek Baso yang tetap tekun merawat perahu kayu tuanya serta pernyataannya bahwa perahu menyimpan doa leluhur secara gamblang menegaskan nilai keteguhan memelihara martabat budaya di tengah arus pragmatisme zaman.',
    competency: 'simpulan-makna',
    subCompetency: 'Mengevaluasi nilai moral dan filosofis dalam karya sastra naratif',
    difficulty: 'mudah',
    type: 'benar-salah',
    misconceptions: {
      'B': 'Jawaban Salah keliru karena narasi dan dialog eksplisit menonjolkan perlawanan filosofis kakek terhadap pragmatisme semata.'
    },
    isValidated: true
  },
  {
    id: 'q-51',
    stimulusTitle: 'Degradasi Pesisir Pantai Lowita dan Urgensi Sabuk Mangrove',
    stimulusText: `Kawasan pesisir Pantai Lowita di Kecamatan Suppa, Pinrang, menghadapi ancaman abrasi serius akibat hempasan gelombang Selat Makassar yang kian intensif dalam satu dekade terakhir. Hilangnya formasi vegetasi bakau alami telah menyebabkan garis pantai mundur hingga belasan meter, mengikis tambak garam dan permukiman nelayan tradisional di bantaran pantai.

Untuk menahan laju intrusi air laut ke sumur-sumur air tawar warga, penanaman sabuk hijau mangrove (greenbelt) menjadi benteng biologis yang paling ramah biaya dan berdaya guna tinggi. Sistem perakaran bakau jenis *Rhizophora mucronata* terbukti mampu meredam energi gelombang laut hingga 60% sekaligus menjadi habitat pemijahan alami bagi kepiting bakau dan udang muara. Oleh karena itu, restorasi ekosistem pesisir Suppa harus diposisikan sebagai investasi perlindungan ekologis jangka panjang, bukan sekadar proyek seremoni penghijauan musiman.`,
    question: 'Ide pokok paragraf kedua pada kutipan teks di atas adalah...',
    options: [
      { id: 'A', text: 'Kondisi air sumur warga pesisir Pantai Lowita yang telah tercemar air asin.' },
      { id: 'B', text: 'Urgensi penanaman sabuk hijau mangrove sebagai pelindung ekologis dan habitat fauna pesisir.' },
      { id: 'C', text: 'Keunggulan kepiting bakau dan udang muara sebagai komoditas ekspor andalan Suppa.' },
      { id: 'D', text: 'Biaya mahal yang diperlukan oleh pemerintah daerah untuk membangun tanggul beton pemecah ombak.' },
      { id: 'E', text: 'Jadwal pelaksanaan proyek penghijauan musiman yang diselenggarakan organisasi nelayan.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf kedua berfokus pada pentingnya sabuk mangrove sebagai benteng biologis penahan gelombang dan intrusi air laut serta fungsinya sebagai habitat pemijahan fauna pesisir. Opsi B merangkum keseluruhan ide pokok paragraf tersebut dengan presisi.',
    competency: 'ide-pokok',
    subCompetency: 'Menentukan gagasan utama paragraf eksplanasi lingkungan hidup',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Intrusi air laut hanya disebutkan sebagai latar belakang masalah pendorong, bukan ide pokok.',
      'C': 'Kepiting bakau dan udang muara hanya contoh fauna pendukung manfaat ekosistem.',
      'D': 'Teks justru menyebut mangrove "ramah biaya" dibanding bangunan fisik beton.',
      'E': 'Penulis justru menolak jika restorasi mangrove hanya dijadikan proyek seremoni musiman.'
    },
    isValidated: true
  },
  {
    id: 'q-52',
    stimulusTitle: 'Dinamika Urbanisasi dan Sektor Informal Perkotaan',
    stimulusText: `(1) Terbatasnya lapangan pekerjaan di sektor formal agraris pedesaan telah mendorong lonjakan migrasi lulusan sekolah menengah ke pusat-pusat kota metropolitan seperti Makassar. (2) Harapan meraih upah tinggi dan gaya hidup perkotaan menjadi magnet psikologis yang memikat kaum muda pedesaan.

(3) Namun, sesampainya di perkotaan, minimnya keterampilan vokasional terspesialisasi memaksa sebagian besar dari mereka terserap ke dalam sektor informal yang rentan jaminan sosial, seperti kurir lepas, juru parkir liar, atau pedagang asongan kaki lima. (4) Akibatnya, alih-alih keluar dari jerat kemiskinan, mereka kerap terjebak dalam fenomena kemiskinan perkotaan baru dengan biaya hidup yang jauh lebih mencekik.`,
    question: 'Berdasarkan kutipan di atas, hubungan pertalian logis antara paragraf pertama (kalimat 1-2) dan paragraf kedua (kalimat 3-4) adalah...',
    options: [
      { id: 'A', text: 'Paragraf pertama memaparkan hipotesis ilmiah, sedangkan paragraf kedua memvalidasi hipotesis tersebut dengan eksperimen lapangan.' },
      { id: 'B', text: 'Paragraf pertama menyajikan ekspektasi pendorong perpindahan penduduk, sedangkan paragraf kedua mengungkap realitas ironis yang dihadapi di tempat tujuan.' },
      { id: 'C', text: 'Paragraf pertama menjelaskan solusi pengentasan kemiskinan desa, sedangkan paragraf kedua mengkritik kebijakan transmigrasi pemerintah.' },
      { id: 'D', text: 'Paragraf pertama memuat argumen pro-urbanisasi, sedangkan paragraf kedua mendukung program relokasi industri ke daerah terpencil.' },
      { id: 'E', text: 'Paragraf pertama dan kedua memiliki hubungan penambahan yang saling memperkuat tanpa adanya kontras atau perbenturan fakta.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf pertama menguraikan ekspektasi (harapan meraih upah tinggi dan gaya hidup kota sebagai faktor magnet), sedangkan paragraf kedua diawali konjungsi antarkalimat pertentangan "Namun" yang memaparkan realitas ironis di perkotaan berupa jebakan sektor informal.',
    competency: 'hubungan-paragraf',
    subCompetency: 'Menganalisis hubungan retoris kontras antarbantuk wacana sosial',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks ini wacana sosiologis deskriptif, bukan pengujian hipotesis laboratorium.',
      'C': 'Paragraf pertama tidak memberikan solusi, melainkan memaparkan penyebab migrasi.',
      'D': 'Paragraf pertama tidak menyuarakan advokasi pro-urbanisasi, melainkan deskripsi fenomena.',
      'E': 'Kedua paragraf jelas dihubungkan oleh relasi kontradiksi/pertentangan (ekspektasi vs realitas).'
    },
    isValidated: true
  },
  {
    id: 'q-53',
    stimulusTitle: 'Uji Validitas Efisiensi Pembangkit Listrik Tenaga Bayu (PLTB)',
    stimulusText: `Sebuah selebaran promosi energi terbarukan mengklaim bahwa turbin angin di kawasan perbukitan perbatasan Pinrang–Sidrap "mampu menghasilkan pasokan listrik tanpa henti selama 24 jam penuh setiap hari sepanjang tahun dengan kapasitas puncak 100% tanpa memerlukan pembangkit pendukung cadangan apa pun."

Sementara itu, catatan resmi Stasiun Meteorologi Kelas II Maros dan data teknis PLN memaparkan bahwa kecepatan angin di kawasan perbukitan tersebut bersifat fluktuatif musiman: kecepatan angin mencapai puncaknya (8–12 m/s) pada musim timur (Juni–September), tetapi menurun drastis menjadi hanya 2–4 m/s pada peralihan musim hujan, di mana turbin angin hanya beroperasi pada kapasitas 25–35% dari beban nominal.`,
    question: 'Berdasarkan perbandingan kedua sumber informasi tersebut, evaluasi kritis yang paling akurat terhadap klaim selebaran promosi adalah...',
    options: [
      { id: 'A', text: 'Klaim promosi sangat akurat karena kawasan perbukitan Sulawesi Selatan dikenal sebagai wilayah tanpa jeda angin.' },
      { id: 'B', text: 'Klaim promosi menyesatkan (overklaim) karena mengabaikan kenyataan ilmiah bahwa kecepatan hembusan angin bersifat fluktuatif musiman sehingga tetap membutuhkan suplai beban cadangan.' },
      { id: 'C', text: 'Data teknis BMKG dan PLN tidak relevan digunakan untuk menilai kinerja turbin angin modern buatan luar negeri.' },
      { id: 'D', text: 'Kapasitas listrik PLTB selalu stabil sepanjang tahun karena turbin dilengkapi kipas penyimpan cadangan hembusan udara.' },
      { id: 'E', text: 'Selebaran promosi dan data PLN menyajikan simpulan yang sejalan mengenai independensi penuh pasokan energi angin.' }
    ],
    correctAnswer: 'B',
    explanation: 'Klaim selebaran promosi merupakan klaim berlebih (*overstatement/overclaim*) yang tidak valid secara saintifik. Data meteorologi membuktikan kecepatan angin berfluktuasi secara musiman (musim timur kencang, musim peralihan melemah), sehingga pembangkit angin memerlukan cadangan (*baseload support*) dan tidak beroperasi konstan 100%.',
    competency: 'akurasi-relevansi',
    subCompetency: 'Menilai keakuratan klaim faktual berhadapan dengan data empiris otoritatif',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Tidak ada lokasi di bumi dengan kecepatan angin yang persis konstan 24 jam tanpa jeda.',
      'C': 'Data BMKG dan PLN adalah rujukan otoritatif dan ilmiah paling relevan dalam studi kelayakan kelistrikan.',
      'D': 'Turbin angin tidak menyimpan hembusan angin fisik, melainkan mengonversi energi kinetik saat angin berhembus.',
      'E': 'Kedua sumber sangat bertolak belakang, bukan sejalan.'
    },
    isValidated: true
  },
  {
    id: 'q-54',
    stimulusTitle: 'Revitalisasi Aksara Lontara dalam Ekosistem Aplikasi Digital',
    stimulusText: `Dalam era digitalisasi masif, aksara Lontara—warisan literasi agung suku Bugis dan Makassar—kian terpinggirkan dari ranah komunikasi sehari-hari generasi Z. Kebanyakan siswa SMA di Sulawesi Selatan kini hanya mengenal huruf Lontara sebatas materi hafalan ujian muatan lokal tanpa keakraban fungsional.

Menyikapi kenyataan tersebut, sebuah komunitas pengembang muda asal Sulawesi Selatan merancang aplikasi purwarupa gim edukasi petualangan berbasis Web yang mengharuskan pemain memecahkan teka-teki bertuliskan aksara Lontara untuk membuka jalan cerita. Melalui pendekatan gamifikasi interaktif dan integrasi kecerdasan buatan pengenal tulisan tangan (Optical Character Recognition), pemain tidak sekadar menghafal bentuk grafem, melainkan diajak menyelami pesan filosofis naskah *Sureq Galigo*. Langkah ini membuktikan bahwa pelestarian bahasa daerah tidak boleh berhenti pada seruan moral konservatif, melainkan harus diterjemahkan ke dalam bahasa media yang digandrungi generasi muda saat ini.`,
    question: 'Apa intensi atau tujuan utama penulis menyajikan teks wacana di atas?',
    options: [
      { id: 'A', text: 'Mendorong penghapusan mata pelajaran muatan lokal bahasa daerah dari kurikulum sekolah formal.' },
      { id: 'B', text: 'Mengajak pembaca mengadopsi pendekatan inovatif berbasis teknologi populer dalam upaya melestarikan aksara dan budaya daerah.' },
      { id: 'C', text: 'Membuktikan bahwa gim daring adalah satu-satunya metode pembelajaran aksara Lontara yang sah.' },
      { id: 'D', text: 'Mengkritik keras para siswa SMA yang tidak mampu membaca naskah kuno Sureq Galigo.' },
      { id: 'E', text: 'Mempromosikan penjualan peranti lunak komersial bagi instansi pendidikan di Sulawesi Selatan.' }
    ],
    correctAnswer: 'B',
    explanation: 'Penulis menyajikan fakta kepunahan fungsional aksara Lontara untuk menunjukkan bahwa pelestarian budaya tidak boleh sekadar seruan moral kuno, melainkan harus memanfaatkan teknologi dan media populer seperti gim digital yang dekat dengan generasi muda. Opsi B merangkum intensi retoris penulis.',
    competency: 'tujuan-penulis',
    subCompetency: 'Mengidentifikasi maksud dan sikap persuasif penulis teks opini kebudayaan',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penulis ingin melestarikan budaya, bukan menghapus pelajaran bahasa daerah.',
      'C': 'Gim daring disajikan sebagai teladan pendekatan kreatif, bukan satu-satunya metode yang sah.',
      'D': 'Fokus penulis adalah solusi pendekatan pembelajaran, bukan mencemooh siswa.',
      'E': 'Teks ini esai edukatif kebudayaan, bukan materi iklan komersial.'
    },
    isValidated: true
  },
  {
    id: 'q-55',
    stimulusTitle: 'Analisis Kekeliruan Bernalar (Logical Fallacy) dalam Wacana Publik',
    stimulusText: `Cermatilah cuplikan adu argumen dalam forum diskusi penataan tata ruang wilayah berikut!

Pembicara X: "Pemerintah kabupaten harus memperketat izin alih fungsi lahan sawah produktif menjadi kawasan perumahan komersial demi menjaga ketahanan pangan lumbung padi kita."
Pembicara Y: "Pernyataan Pembicara X itu sangat picik dan tidak berdasar! Pembicara X sendiri bukan lulusan sarjana pertanian dan tidak pernah menggarap sawah satu hari pun. Oleh karena itu, semua usulan yang diajukannya jelas salah dan pasti bertujuan menghambat kemajuan ekonomi warga Pinrang."`,
    question: 'Ditinjau dari kaidah logika penalaran kritis, kekeliruan bernalar (*logical fallacy*) utama yang dilakukan oleh Pembicara Y adalah...',
    options: [
      { id: 'A', text: 'Generalisasi tergesa-gesa (*hasty generalization*), yaitu menarik simpulan umum dari satu sampel kecil.' },
      { id: 'B', text: 'Penyerangan pribadi (*argumentum ad hominem*), yaitu menyerang latar belakang pribadi lawan bicara alih-alih membantah substansi argumennya.' },
      { id: 'C', text: 'Korelasi semu (*post hoc ergo propter hoc*), yaitu menganggap dua peristiwa bersamaan pasti memiliki hubungan sebab-akibat.' },
      { id: 'D', text: 'Penalaran melingkar (*circular reasoning*), yaitu mengulang premis sebagai kesimpulan akhir.' },
      { id: 'E', text: 'Kecurigaan mayoritas (*bandwagon fallacy*), yaitu mendasarkan kebenaran pada suara terbanyak.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pembicara Y melakukan falasi *ad hominem* karena menolak usulan Pembicara X bukan dengan membantah urgensi lahan sawah atau data ketahanan pangan, melainkan menyerang latar belakang pribadi lawan bicara (bukan sarjana pertanian, tidak pernah mencangkul sawah).',
    competency: 'evaluasi-argumen',
    subCompetency: 'Mendeteksi kekeliruan bernalar (fallacy) ad hominem dalam dialog argumentatif',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Hasty generalization terjadi saat mengambil kesimpulan populasi dari sampel sedikit, bukan menyerang pribadi.',
      'C': 'Post hoc ergo propter hoc adalah falasi sebab-akibat waktu, bukan serangan persona.',
      'D': 'Circular reasoning adalah argumen berputar, bukan penyerangan reputasi personal.',
      'E': 'Bandwagon mendasarkan klaim pada popularitas massa.'
    },
    isValidated: true
  },
  {
    id: 'q-56',
    stimulusTitle: 'Penerapan Kaidah Ejaan EYD V: Huruf Kapital dan Tanda Baca',
    stimulusText: `Cermatilah kalimat-kalimat berikut!
(1) Setiap hari senin, para siswa SMAN 1 Pinrang mengikuti upacara bendera dengan khidmat.
(2) Ayah membeli pisang Ambon, jeruk siompu, dan beras ketan di pasar sentral.
(3) Prof. Dr. Andi Mallombassang, M.Hum. memaparkan kajian sastra Bugis klasik di aula rektorat.
(4) Ibu menasihati kami; "Rajin-rajinlah membaca buku agar wawasanmu luas."
(5) Seminar literasi itu dihadiri oleh: kepala sekolah, wakil kepala sekolah, dan ketua OSIS.`,
    question: 'Kalimat yang menggunakan huruf kapital dan tanda baca secara TEPAT sesuai Pedoman Umum Ejaan Bahasa Indonesia (EYD V) adalah...',
    options: [
      { id: 'A', text: '(1)' },
      { id: 'B', text: '(2)' },
      { id: 'C', text: '(3)' },
      { id: 'D', text: '(4)' },
      { id: 'E', text: '(5)' }
    ],
    correctAnswer: 'C',
    explanation: 'Kalimat (3) tepat: penulisan gelar akademik singkat (Prof., Dr., M.Hum.), nama orang, dan huruf kapital awal kalimat sudah sesuai EYD V.\nKalimat (1) salah karena nama hari "senin" wajib berhuruf kapital (Senin).\nKalimat (2) salah karena nama jenis "pisang ambon" ditulis dengan huruf kecil (bukan pisang Ambon).\nKalimat (4) salah karena mengantar kutipan langsung menggunakan tanda koma, bukan titik koma.\nKalimat (5) salah karena tanda titik dua tidak dipakai jika pengantar berakhir dengan kata depan/pelengkap ("dihadiri oleh").',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menerapkan kaidah huruf kapital, nama geografi/jenis, dan tanda baca sesuai EYD V',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Nama hari "Senin" harus diawali huruf kapital.',
      'B': 'Nama jenis (pisang ambon, jeruk bali) ditulis dengan huruf kecil menurut EYD V.',
      'D': 'Kutipan langsung diantar tanda koma (,), bukan titik koma (;).',
      'E': 'Tanda titik dua (:) tidak dipakai jika rangkaian mendahului predikat atau kata depan pelengkap.'
    },
    isValidated: true
  },
  {
    id: 'q-57',
    stimulusTitle: 'Perahu Apung Pustaka dan Dedikasi Guru di Kepulauan Terluar',
    stimulusText: `Selama lebih dari delapan tahun, Pak Mansyur, seorang guru honorer di pesisir barat Sulawesi Selatan, mengayuh perahu katinting miliknya melintasi ombak Selat Makassar setiap akhir pekan. Di lambung perahu tuanya, tersusun ratusan buku cerita anak, ensiklopedia bergambar, dan modul pelajaran yang ia kumpulkan dari sumbangan sukarela masyarakat.

Tujuannya hanya satu: menyambangi pulau-pulau karang terpencil agar anak-anak nelayan dapat mengecap indahnya membaca buku berkualitas. Tak jarang, perahunya oleng dihantam badai laut lepas, atau mesin motornya mati mendadak di tengah malam gulita. Namun, melihat binar mata polos anak-anak pulau yang menyambutnya di dermaga kayu reyot dengan senyum mengembang, seluruh lelah dan bahaya seketika pupus dari benaknya. Bagi Pak Mansyur, mencerdaskan kehidupan bangsa bukanlah retorika di panggung seminar megah, melainkan jejak kayuhan dayung nyata yang menyalakan pelita harapan di tapal batas samudra.`,
    question: 'Berdasarkan kutipan teks narasi biografi inspiratif di atas, manakah DUA nilai karakter teladan yang secara tersirat ditunjukkan oleh tokoh Pak Mansyur? (Pilihlah dua jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Ketabahan dan kerelaan berkorban demi memperjuangkan kesetaraan akses literasi anak-anak marjinal.' },
      { id: 'B', text: 'Kecenderungan mencari popularitas dan sorotan media publik melalui kegiatan petualangan bahari.' },
      { id: 'C', text: 'Integritas dan konsistensi panggilan nurani pengabdian tanpa mengharap imbalan materi kemewahan.' },
      { id: 'D', text: 'Ketergantungan mutlak pada kucuran anggaran birokrasi pemerintah sebelum memulai gerakan sosial.' },
      { id: 'E', text: 'Keinginan beralih profesi dari guru kelas menjadi nakhoda kapal pengangkut barang komersial.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Nilai karakter Pak Mansyur yang tersirat dalam tindakannya menembus badai tanpa pamrih adalah (A) ketabahan dan kerelaan berkorban demi literasi anak marjinal, serta (C) integritas dan konsistensi pengabdian nurani tanpa menuntut imbalan materi.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menganalisis nilai karakter dan keteladanan tersirat dalam teks naratif biografi',
    difficulty: 'sedang',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Teks menegaskan tindakan ikhlas dari binar mata anak pulau, bukan mencari panggung seminar atau sorotan publik.',
      'D': 'Pak Mansyur bergerak mandiri dari donasi masyarakat sukarela, bukan bergantung pada birokrasi.',
      'E': 'Tidak ada indikasi tokoh ingin beralih profesi menjadi nakhoda barang komersial.'
    },
    isValidated: true
  },
  {
    id: 'q-58',
    stimulusTitle: 'Refleksi Filosofis Nilai Budaya Siri\' na Pacce di Ranah Publik',
    stimulusText: `Dalam falsafah hidup masyarakat Bugis-Makassar, konsep *Siri' na Pacce* merupakan dua entitas nilai luhur yang tak terpisahkan. *Siri'* merefleksikan harga diri, martabat, dan rasa malu moral ketika seseorang melanggar kesusilaan atau amanah kebajikan. Sementara itu, *Pacce* (atau *Pesse*) adalah rasa empati mendalam, kepedihan batin komunal saat menyaksikan sesama manusia tertimpa musibah atau ketidakadilan sosial.

Ketika diintegrasikan ke dalam kepemimpinan dan tata kelola masyarakat modern, *Siri' na Pacce* berfungsi sebagai kompas etika penangkal korupsi dan penyalahgunaan wewenang. Pejabat publik yang menjiwai *Siri'* akan memiliki benteng rasa malu pantang memperkaya diri sendiri dengan menjarah hak rakyat. Sebaliknya, jiwa *Pacce* membakar kepekaan sosialnya untuk selalu berpihak pada nasib kaum rentan dan wong cilik yang terpinggirkan.`,
    question: 'Berdasarkan teks di atas, makna kontekstual fungsi nilai "Siri\'" bagi pejabat publik dalam ranah kehidupan modern adalah...',
    options: [
      { id: 'A', text: 'Dorongan untuk mempertahankan kekuasaan dengan cara apa pun demi kehormatan trah keluarga.' },
      { id: 'B', text: 'Rasa malu etis dan kesadaran moral yang membentengi diri dari tindakan khianat serta pelanggaran amanah publik.' },
      { id: 'C', text: 'Kewajiban membalas dendam terhadap pihak-pihak yang telah mencemarkan nama baik instansi.' },
      { id: 'D', text: 'Rasa iba berlebihan yang membuat seorang penegak hukum membebaskan pelaku kejahatan.' },
      { id: 'E', text: 'Tuntutan menjaga gengsi sosial dengan memamerkan gaya hidup glamor di hadapan masyarakat.' }
    ],
    correctAnswer: 'B',
    explanation: 'Dalam konteks wacana, nilai Siri\' dimaknai sebagai harga diri, martabat, dan rasa malu moral penangkal korupsi yang membentengi seseorang dari tindakan khianat atau memperkaya diri sendiri dari hak rakyat. Opsi B adalah padanan makna kontekstual yang tepat.',
    competency: 'simpulan-makna',
    subCompetency: 'Menafsirkan makna kontekstual kearifan lokal dalam diskursus etika modern',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Konsep Siri\' sejati berakar pada integritas etika moral, bukan pelanggengan dinasti kekuasaan tak terpuji.',
      'C': 'Reduksi makna Siri\' menjadi sekadar balas dendam fisik merupakan penyimpangan pemahaman filosofis aslinya.',
      'D': 'Rasa iba sosial merupakan ranah Pacce, namun tidak dalam arti menafikan kepastian hukum.',
      'E': 'Pamer kemewahan justru bertentangan dengan rasa malu moral Siri\'.'
    },
    isValidated: true
  },
  {
    id: 'q-59',
    stimulusTitle: 'Mekanisme Kognitif Membaca Mendalam (Deep Reading) di Era Layar',
    stimulusText: `(1) Membaca mendalam (*deep reading*) mengaktifkan jaringan korteks serebral yang bertanggung jawab atas analisis inferensial, sintesis gagasan multiaspek, dan empati kognitif terhadap perspektif penulis. (2) Proses ini membutuhkan atensi penuh dan tempo membaca yang tenang agar pembaca mampu membangun dialog batin dengan wacana yang disajikan.

(3) [...] (4) Pembaca media layar cenderung melakukan pemindaian visual berbentuk pola huruf F (*F-shaped scanning pattern*), yaitu hanya melirik baris-baris teratas dan kata kunci yang mencolok secara visual. (5) Akibatnya, kapasitas memproses argumen bernuansa rumit serta daya kritis siswa dalam mendeteksi distorsi informasi mengalami penurunan signifikan.`,
    question: 'Kalimat yang paling padu dan koheren untuk melengkapi bagian rumpang kalimat (3) adalah...',
    options: [
      { id: 'A', text: 'Oleh sebab itu, perpustakaan daerah diwajibkan membeli ribuan buku pelajaran setiap pergantian semester baru.' },
      { id: 'B', text: 'Namun, kebiasaan membaca cepat di layar gawai digital telah melatih otak untuk beralih ke pola pemindaian informasi yang dangkal dan terfragmentasi.' },
      { id: 'C', text: 'Bahkan, sebagian dokter spesialis mata menyarankan penggunaan kacamata antiradiasi saat bermain gim petualangan.' },
      { id: 'D', text: 'Selain itu, harga cetak buku kertas di pasar nasional mengalami kenaikan akibat kelangkaan bahan baku bubur kertas.' },
      { id: 'E', text: 'Sebaliknya, membaca mendalam sangat mudah dilakukan saat seseorang mendengarkan musik cadas bervolume tinggi.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf pertama (1-2) menjelaskan manfaat membaca mendalam dengan atensi tenang. Kalimat (4-5) memaparkan pola membaca di layar yang dangkal berbentuk huruf F dan hilangnya daya kritis. Kalimat penyambung yang koheren harus menghadirkan transisi pertentangan dengan kata "Namun" yang menghubungkan media gawai dan pemindaian dangkal (opsi B).',
    competency: 'hubungan-paragraf',
    subCompetency: 'Melengkapi paragraf rumpang dengan kalimat transisi kohesif dan koheren',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Penyediaan buku per semester tidak menyambung dengan transisi neurobiologis membaca layar.',
      'C': 'Kacamata radiasi menyangkut kesehatan fisik optik, bukan pola kognisi pemindaian wacana.',
      'D': 'Harga kertas tidak relevan dengan pembahasan kognitif neurosains.',
      'E': 'Musik cadas bertolak belakang dengan atensi tenang yang diuraikan di kalimat (2).'
    },
    isValidated: true
  },
  {
    id: 'q-60',
    stimulusTitle: 'Pemanfaatan Pakan Fermentasi pada Budidaya Tambak Bandeng',
    stimulusText: `Teks A (Perspektif Praktisi Tambak):
Bagi petambak bandeng di pesisir Lanrisang, Pinrang, formulasi pakan pelet komersial pabrikan yang kian mahal telah memangkas margin keuntungan bersih hingga ke titik nadir. Oleh sebab itu, inovasi mandiri berupa fermentasi ampas dedak padi dicampur limbah rucah ikan lokal menggunakan molase dan bakteri EM4 menjadi penyelamat ekonomi. Biaya pakan harian terpangkas hingga 40%. Meski air tambak tampak sedikit lebih pekat, bandeng tumbuh sehat dengan bobot panen yang tetap memenuhi standar pasar lelang ikan Parepare dan Makassar.`,
    stimulusText2: `Teks B (Perspektif Peneliti Hidrobiologi):
Aplikasi pakan fermentasi berbasis bahan organik tinggi karbohidrat memang menekan pengeluaran belanja pakan budidaya. Akan tetapi, dekomposisi residu ampas dedak yang tidak terkonsumsi di dasar kolam dapat memicu lonjakan senyawa amonia tak terionisasi (NH3) dan hidrogen sulfida beracun jika tidak diimbangi aerasi yang kuat. Dalam jangka panjang, kondisi anoksik pada sedimen dasar tambak berpotensi memicu kematian massal larva serta degradasi kualitas air payau secara kronis.`,
    question: 'Berdasarkan kedua kutipan di atas, perbedaan fokus sudut pandang antara Teks A dan Teks B adalah...',
    options: [
      { id: 'A', text: 'Teks A menyoroti kemudahan perizinan ekspor bandeng, sedangkan Teks B menyoroti sanksi hukum pencemaran laut.' },
      { id: 'B', text: 'Teks A memfokuskan pada efisiensi ekonomi dan keberlangsungan usaha petambak, sedangkan Teks B memfokuskan pada mitigasi risiko biokimiawi dan kelestarian ekosistem perairan.' },
      { id: 'C', text: 'Teks A menolak penggunaan bahan organik lokal, sedangkan Teks B mewajibkan pemakaian pakan kimia buatan pabrik.' },
      { id: 'D', text: 'Teks A memaparkan kegagalan panen ikan bandeng, sedangkan Teks B merayakan keberhasilan swasembada pakan nasional.' },
      { id: 'E', text: 'Kedua teks sama-sama berfokus murni pada teknik pemasaran digital ikan bandeng beku.' }
    ],
    correctAnswer: 'B',
    explanation: 'Teks A ditulis dari kacamata praktisi tambak yang menitikberatkan pada efisiensi biaya (pemangkasan biaya 40%) dan kelangsungan ekonomi usaha. Sebaliknya, Teks B menganalisis dampak biokimiawi (risiko gas amonia, sulfida beracun, dan kondisi anoksik sedimen) demi kelestarian ekosistem tambak.',
    competency: 'perbandingan-teks',
    subCompetency: 'Menganalisis perbedaan orientasi sudut pandang antarteks bertopik sama',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Kedua teks tidak membahas regulasi izin ekspor atau sanksi pidana.',
      'C': 'Teks A justru mendukung pemanfaatan bahan organik dedak lokal.',
      'D': 'Teks A menyatakan panen tetap berhasil memenuhi standar lelang.',
      'E': 'Pemasaran digital tidak dibahas sama sekali dalam kedua teks.'
    },
    isValidated: true
  },
  {
    id: 'q-61',
    stimulusTitle: 'Verifikasi Fakta: Informasi Kebencanaan Jebolnya Tanggul Irigasi',
    stimulusText: `Sebuah video berdurasi 15 detik viral di kanal media sosial dengan narasi dramatis: "Waspada warga Pinrang! Tanggul utama Bendung Benteng dilaporkan jebol sore ini akibat banjir kiriman hulu, ratusan hektare sawah dan rumah warga terancam tenggelam!"

Berdasarkan klarifikasi resmi dari Dinas Sumber Daya Air Provinsi Sulawesi Selatan dan Polsek Patampanua, rekaman video yang beredar tersebut merupakan peristiwa tanggul saluran tersier yang meluap di sebuah kabupaten di Jawa Tengah pada tahun 2021 lampau. Hasil pemantauan langsung peranti telemetri muka air Bendung Benteng menunjukkan elevasi air saat ini berada pada batas aman (skala hijau normal) dan pintu air bekerja stabil sesuai debit rencana.`,
    question: 'Evaluasilah kebenaran pernyataan berikut berdasarkan teks cek fakta di atas:\n\n"Informasi video yang mengklaim tanggul utama Bendung Benteng Pinrang jebol terbukti merupakan kabar bohong (hoaks) karena rekaman visual berasal dari peristiwa di provinsi lain pada tahun 2021, sementara elevasi air bendungan sebenarnya berada pada batas hijau normal."',
    options: [
      { id: 'A', text: 'Benar' },
      { id: 'B', text: 'Salah' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan bernilai BENAR. Teks verifikasi fakta menegaskan secara eksplisit bahwa video tersebut adalah arsip peristiwa di Jawa Tengah tahun 2021 dan kondisi riil Bendung Benteng berada pada status aman (hijau normal).',
    competency: 'akurasi-relevansi',
    subCompetency: 'Memverifikasi kebenaran klaim cek fakta bencana terhadap konfirmasi otoritas',
    difficulty: 'sedang',
    type: 'benar-salah',
    misconceptions: {
      'B': 'Jawaban Salah keliru karena seluruh data faktual membuktikan klaim video viral tersebut hoaks murni.'
    },
    isValidated: true
  },
  {
    id: 'q-62',
    stimulusTitle: 'Editorial: Evaluasi Kebijakan Zonasi dan Pemerataan Kualitas Pendidikan',
    stimulusText: `Sistem zonasi dalam penerimaan peserta didik baru (PPDB) yang digulirkan sejak beberapa tahun lalu sejatinya membawa misi mulia: meruntuhkan kasta sekolah favorit dan menjamin keadilan akses pendidikan bagi seluruh anak di lingkungan terdekatnya.

Kendati demikian, satu dasawarsa berjalan, evaluasi empiris menunjukkan bahwa zonasi belum diiringi dengan pemerataan fasilitas penunjang yang seimbang. Di sekolah-sekolah pinggiran, rasio laboratorium sains modern, ketersediaan guru mata pelajaran berkeahlian linear, dan bandwidth internet kecepatan tinggi masih tertinggal jauh dibanding sekolah di kawasan jantung perkotaan. Akibatnya, alih-alih menghapus disparitas mutu, sistem zonasi yang kaku tanpa akselerasi pemenuhan sarana justru berisiko mengekalkan ketimpangan kompetensi lulusan antardaerah.`,
    question: 'Berdasarkan teks editorial di atas, manakah DUA bukti empiris yang diajukan redaksi untuk memperkuat argumen bahwa zonasi belum sepenuhnya mewujudkan pemerataan mutu? (Pilihlah dua jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Ketimpangan sarana laboratorium sains modern dan kecepatan internet antara sekolah pinggiran dan sekolah perkotaan.' },
      { id: 'B', text: 'Adanya penurunan minat belajar siswa secara drastis di seluruh jenjang pendidikan nasional.' },
      { id: 'C', text: 'Keterbatasan ketersediaan tenaga pendidik dengan kualifikasi linear di sekolah-sekolah kawasan pinggiran.' },
      { id: 'D', text: 'Penolakan total dari seluruh orang tua siswa terhadap penerapan nilai-nilai karakter budi pekerti.' },
      { id: 'E', text: 'Penutupan permanen seluruh sekolah swasta akibat minimnya pendaftar zonasi terdekat.' }
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Dua bukti empiris yang dipaparkan redaksi pada paragraf kedua adalah (A) ketertinggalan fasilitas laboratorium sains dan bandwidth internet, serta (C) ketersediaan guru dengan kompetensi linear di sekolah pinggiran dibanding sekolah tengah kota.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Mengevaluasi bukti-bukti empiris pendukung tesis dalam teks tajuk rencana',
    difficulty: 'sedang',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'B': 'Teks tidak menyebut penurunan minat belajar siswa.',
      'D': 'Teks tidak menyinggung penolakan nilai budi pekerti.',
      'E': 'Penutupan sekolah swasta tidak pernah dibahas dalam wacana.'
    },
    isValidated: true
  },
  {
    id: 'q-63',
    stimulusTitle: 'Potensi Geowisata Permandian Air Panas Sulili di Pinrang',
    stimulusText: `Permandian air panas alami Sulili di Kecamatan Paleteang, Kabupaten Pinrang, menyimpan keunikan manifestasi panas bumi (geotermal) yang bersumber dari aktivitas vulkanis purba di bawah kerak perbukitan sekitar. Air yang mengalir secara alami ini memiliki temperatur hangat berkisar 40–48 derajat Celsius dengan kandungan mineral belerang, silika, dan kalsium yang berkhasiat bagi terapi relaksasi otot serta kesehatan kulit.

Jika dikelola dengan konsep ekowisata berbasis kelestarian lingkungan (green tourism), kawasan Sulili berpotensi besar menjadi lokomotif diversifikasi ekonomi daerah. Integrasi antara fasilitas pemandian ramah lansia, jalur lintas alam (trekking) perbukitan hijau, dan sentra kuliner tradisional Lasinrang dapat memperpanjang masa tinggal wisatawan domestik tanpa merusak bentang vegetasi alami di sekitarnya.`,
    question: 'Ide pokok paragraf pertama pada kutipan teks di atas adalah...',
    options: [
      { id: 'A', text: 'Rencana pembangunan resor hotel mewah bertaraf internasional di Paleteang.' },
      { id: 'B', text: 'Karakteristik manifestasi panas bumi dan khasiat mineral alami permandian air panas Sulili.' },
      { id: 'C', text: 'Harga tiket masuk objek wisata permandian air panas di Sulawesi Selatan.' },
      { id: 'D', text: 'Dampak negatif aktivitas vulkanis purba terhadap kesuburan tanah perkebunan.' },
      { id: 'E', text: 'Keunggulan kuliner tradisional khas Pinrang yang disajikan di kawasan wisata.' }
    ],
    correctAnswer: 'B',
    explanation: 'Paragraf pertama memaparkan keunikan sumber air panas Sulili dari sudut pandang geotermal (suhu 40–48°C) dan kandungan mineralnya (belerang, silika, kalsium) yang bermanfaat bagi kesehatan. Opsi B merangkum inti gagasan tersebut.',
    competency: 'ide-pokok',
    subCompetency: 'Menemukan ide pokok teks eksplanasi potensi geowisata daerah',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Hotel mewah tidak disebutkan dalam teks.',
      'C': 'Harga tiket tidak dibahas dalam wacana.',
      'D': 'Teks tidak membahas dampak buruk vulkanis purba.',
      'E': 'Kuliner tradisional dibahas di paragraf kedua sebagai rencana pendukung ekowisata.'
    },
    isValidated: true
  },
  {
    id: 'q-64',
    stimulusTitle: 'Resensi Kritis Kumpulan Puisi Generasi Muda Sulawesi Selatan',
    stimulusText: `Dalam antologi puisi terbarunya, penyair muda asal Ajatappareng ini tidak terjebak dalam romantisisme klise tentang keelokan senja di pematang sawah. Sebaliknya, ia dengan berani membedah luka-luka sosial masyarakat agraris melalui metafora getir: gabah yang tergadai sebelum menguning, jerit cangkul yang kalah cepat oleh deru ekskavator tambang, dan derai air mata para ibu di pelabuhan pelepasan perantau Bugis.

Diksi yang dipilihnya terasa lugas, pekat dengan aroma tanah lumpur dan asinnya air muara, tetapi tetap terjaga keanggunan rimanya. Melalui bait-baitnya yang berdenyut kencang, pembaca seolah dipaksa berkaca bahwa modernisasi yang kita agung-agungkan kerap meminta tumbal suara-suara sunyi yang tak sempat masuk dalam berita utama surat kabar.`,
    question: 'Sikap resensator (penulis resensi) terhadap antologi puisi tersebut dapat disimpulkan sebagai...',
    options: [
      { id: 'A', text: 'Sangat mengapresiasi dan memuji keberanian penyair mengangkat realitas getir sosial dengan diksi yang berkarakter kuat.' },
      { id: 'B', text: 'Kecewa karena penyair tidak melukiskan keindahan pemandangan alam pedesaan yang menyejukkan hati.' },
      { id: 'C', text: 'Meragukan orisinalitas karya karena menganggap temanya meniru gaya puisi zaman pra-kemerdekaan.' },
      { id: 'D', text: 'Netral dan tidak memberikan penilaian nilai estetika maupun bobot isi terhadap karya yang diulas.' },
      { id: 'E', text: 'Mengkritik pedas pilihan diksi yang dianggap terlalu kasar dan merusak kaidah keindahan puisi.' }
    ],
    correctAnswer: 'A',
    explanation: 'Resensator menggunakan ungkapan apresiatif: "tidak terjebak dalam romantisisme klise", "dengan berani membedah luka-luka sosial", "tetap terjaga keanggunan rimanya". Sikapnya jelas sangat mengapresiasi keberanian dan estetika penyair (opsi A).',
    competency: 'tujuan-penulis',
    subCompetency: 'Menilai nada, sikap, dan keberpihakan evaluator dalam teks resensi sastra',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': 'Resensator justru memuji karena penyair tidak memakai romantisisme senja klise.',
      'C': 'Tidak ada keraguan orisinalitas yang disuarakan dalam resensi.',
      'D': 'Resensator sangat berpihak dan memberikan evaluasi positif mendalam.',
      'E': 'Resensator memuji diksi yang pekat dan menjaga keanggunan rima, bukan mencelanya.'
    },
    isValidated: true
  },
  {
    id: 'q-65',
    stimulusTitle: 'Penggunaan Konjungsi Intrakalimat dan Antarkalimat Paragraf Rumpang',
    stimulusText: `Cermatilah paragraf rumpang berikut!
Pemberdayaan kelompok pembudidaya rumput laut di pesisir Suppa membutuhkan intervensi teknologi pengeringan higienis. Selama ini, para nelayan menjemur rumput laut beralaskan terpal di pinggir jalan raya (1) [...] rentan tercemar debu dan kotoran. (2) [...], saat musim hujan tiba, kadar air rumput laut sulit mencapai standar ekspor. (3) [...] pemerintah daerah memberikan bantuan kubah pengering surya (*solar dome dryer*), kualitas hasil panen dapat dipertahankan (4) [...] harga jualnya melonjak berlipat ganda.`,
    question: 'Konjungsi yang paling tepat secara berturut-turut untuk melengkapi bagian rumpang (1), (2), (3), dan (4) adalah...',
    options: [
      { id: 'A', text: 'sehingga; Selain itu; Jika; bahkan' },
      { id: 'B', text: 'karena; Oleh sebab itu; Walaupun; namun' },
      { id: 'C', text: 'tetapi; Padahal; Agar; atau' },
      { id: 'D', text: 'meskipun; Sebaliknya; Karena; serta' },
      { id: 'E', text: 'supaya; Namun; Bahwa; melainkan' }
    ],
    correctAnswer: 'A',
    explanation: 'Bagian (1) menyatakan akibat intrakalimat: "sehingga". Bagian (2) menyatakan penambahan antarkalimat: "Selain itu". Bagian (3) menyatakan pengandaian/syarat: "Jika". Bagian (4) menyatakan peningkatan penekanan: "bahkan harga jualnya melonjak". Opsi A paling kohesif dan gramatikal.',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Menganalisis ketepatan konjungsi intrakalimat dan antarkalimat pada paragraf eksposisi',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    misconceptions: {
      'B': '"Walaupun" pada bagian (3) merusak makna pengkondisian solusi.',
      'C': '"Tetapi" dan "padahal" tidak mencerminkan pertalian hubungan akibat dan penambahan.',
      'D': '"Meskipun" di bagian (1) keliru secara pertalian klausa.',
      'E': 'Konjungsi yang dipilih tidak membentuk keutuhan paragraf logis.'
    },
    isValidated: true
  },
  {
    id: 'q-66',
    stimulusTitle: 'Prosedur Standardisasi Uji Mutu Beras Pecah Kulit',
    stimulusText: `Bacalah petunjuk kerja laboratorium berikut!
(1) Ambillah sampel acak gabah kering giling sebanyak 100 gram dari karung penyimpanan primer.
(2) Masukkan sampel ke dalam mesin pengupas kulit (*huller*) manual hingga terpisah sekam dan beras pecah kulit.
(3) Timbang bobot beras kepala yang utuh menggunakan neraca analitik digital dengan ketelitian 0,01 gram.
(4) Apabila persentase butir patah dan butir menir terdeteksi melebihi ambang batas toleransi 15%, lakukan pengujian ulang dengan kalibrasi ulang tekanan rol mesin pengupas sebelum menerbitkan sertifikat mutu beras premium.
(5) Catat data kelembapan air dan simpan spesimen pembanding di wadah kedap udara bersuhu 20 derajat Celsius.`,
    question: 'Berdasarkan langkah kerja pada teks prosedur di atas, tindakan apa yang wajib segera diambil jika persentase butir patah sampel gabah melampaui 15%?',
    options: [
      { id: 'A', text: 'Menjual seluruh karung gabah ke pasar tradisional dengan harga termurah tanpa uji coba.' },
      { id: 'B', text: 'Melakukan kalibrasi ulang tekanan rol mesin pengupas dan melaksanakan pengujian ulang sebelum sertifikat diterbitkan.' },
      { id: 'C', text: 'Menaikkan temperatur ruangan penyimpanan spesimen hingga 45 derajat Celsius.' },
      { id: 'D', text: 'Langsung menerbitkan sertifikat mutu beras premium tanpa memeriksa butir menir.' },
      { id: 'E', text: 'Mengganti seluruh neraca analitik dengan timbangan manual pasar.' }
    ],
    correctAnswer: 'B',
    explanation: 'Langkah (4) secara eksplisit menyatakan: "Apabila persentase butir patah dan butir menir terdeteksi melebihi ambang batas toleransi 15%, lakukan pengujian ulang dengan kalibrasi ulang tekanan rol mesin pengupas sebelum menerbitkan sertifikat mutu beras premium." Opsi B adalah jawaban yang tepat.',
    competency: 'tersurat-tersirat',
    subCompetency: 'Menemukan informasi tersurat berupa syarat kondisional dalam teks prosedur teknis',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks prosedur memuat protokol ilmiah, bukan petunjuk jual beli kilat.',
      'C': 'Langkah (5) menyebut suhu 20 derajat Celsius untuk wadah spesimen.',
      'D': 'Bertentangan dengan teks yang melarang penerbitan sebelum uji ulang.',
      'E': 'Kalibrasi mesin pengupas yang diminta, bukan mengganti neraca analitik.'
    },
    isValidated: true
  },
  {
    id: 'q-67',
    stimulusTitle: 'Relasi Penguasaan Bahasa dan Ketajaman Nalar Kritis',
    stimulusText: `Bahasa bukan sekadar cangkang pasif pengantar informasi, melainkan struktur penataan pikiran (*the architecture of cognition*). Ketika seorang penutur menguasai kelengkapan relasi sintaksis—mampu membedakan premis klausa sebab dari anak kalimat konsesif, memahami gradasi konotasi kata, dan membedah kaitan kohesi antarparagraf—ia sedang mengasah instrumen penalarannya untuk menguji keabsahan sebuah realitas.

Sebaliknya, kemiskinan kosakata dan kekacauan tata logika bahasa membuat seseorang rentan menjadi mangsa manipulasi wacana politik, propaganda komersial, dan falasi logika di era banjir disrupsi digital. Mereka yang gagap membedakan antara fakta terverifikasi dan opini persuasif dalam teks sesungguhnya sedang mengalami kerapuhan epistemik dalam kewargaan demokratisnya.`,
    question: 'Simpulan filosofis yang paling komprehensif dari kutipan teks di atas adalah...',
    options: [
      { id: 'A', text: 'Belajar tata bahasa hanya penting bagi mereka yang berprofesi sebagai ahli bahasa dan penulis novel.' },
      { id: 'B', text: 'Penguasaan struktur bahasa dan semantik berbanding lurus dengan kemampuan bernalar kritis dalam memilah kebenaran di ruang publik.' },
      { id: 'C', text: 'Orang yang menguasai banyak bahasa asing dipastikan tidak akan pernah tertipu oleh berita hoaks.' },
      { id: 'D', text: 'Perkembangan media digital secara otomatis meningkatkan kualitas demokrasi tanpa perlu literasi membaca.' },
      { id: 'E', text: 'Kaidah sintaksis bahasa Indonesia harus disederhanakan agar tidak membebani daya ingat para siswa di sekolah.' }
    ],
    correctAnswer: 'B',
    explanation: 'Teks menghubungkan secara kuat bahwa penguasaan tata bahasa/sintaksis dan pemahaman wacana adalah instrumen penalaran pikiran. Kerapuhan bahasa berujung pada kerapuhan nalar kritis di ruang publik digital. Opsi B mencakup simpulan substantif teks tersebut.',
    competency: 'simpulan-makna',
    subCompetency: 'Menyimpulkan relasi filosofis epistemologi bahasa dan daya kritis nalar',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Teks menegaskan bahasa adalah fondasi nalar seluruh warga negara, bukan profesi tertentu saja.',
      'C': 'Bukan kuantitas bahasa asing, melainkan ketajaman bernalar dalam bahasa yang diasah.',
      'D': 'Teks justru menyebut era digital membanjiri distorsi informasi yang membutuhkan literasi kritis.',
      'E': 'Penyederhanaan sintaksis tidak dibahas dan menyimpang dari tesis teks.'
    },
    isValidated: true
  },
  {
    id: 'q-68',
    stimulusTitle: 'Polemik Larangan Ponsel Pintar di Lingkungan Sekolah',
    stimulusText: `Sebuah sekolah menengah menetapkan kebijakan radikal: seluruh ponsel pintar siswa wajib disita dan dikunci di brankas lobi sejak lonceng pagi berbunyi hingga jam pulang sekolah. Pihak manajemen sekolah berargumen bahwa pelarangan total ini adalah "satu-satunya solusi mutlak untuk membebaskan ruang kelas dari distraksi media sosial dan mengembalikan fokus belajar siswa."

Namun, dewan pakar pendidikan mengajukan sanggahan bahwa kebijakan penyitaan mutlak tersebut mengaburkan akar persoalan pedagogis. Di era abad ke-21, tantangan utama pendidikan bukanlah menjauhkan anak secara artifisial dari peranti teknologi yang ada di sekitar mereka, melainkan melatih disiplin diri (*self-regulation*) dan etika pemanfaatan peranti digital untuk riset belajar. Menghilangkan ponsel sama sekali ibarat melarang anak menyentuh air karena takut tenggelam, alih-alih mengajarinya berenang dengan aman.`,
    question: 'Argumen tandingan (*counterargument*) manakah yang paling kuat untuk meruntuhkan klaim bahwa pelarangan ponsel secara total merupakan satu-satunya solusi pembentukan fokus belajar siswa?',
    options: [
      { id: 'A', text: 'Harga ponsel pintar semakin mahal sehingga siswa berhak memamerkannya di ruang kelas setiap hari.' },
      { id: 'B', text: 'Fokus belajar yang sejati lahir dari kematangan regulasi diri dan desain pembelajaran bermakna, bukan dari isolasi paksa yang tidak melatih kedewasaan digital ketika siswa berada di luar sekolah.' },
      { id: 'C', text: 'Guru-guru di sekolah juga sering memainkan ponsel pintar saat rapat dewan guru berlangsung.' },
      { id: 'D', text: 'Sebagian besar siswa menyukai gim daring bervolume tinggi saat jam istirahat sekolah.' },
      { id: 'E', text: 'Pelarangan ponsel menurunkan penjualan paket data internet gerai seluler di sekitar sekolah.' }
    ],
    correctAnswer: 'B',
    explanation: 'Sanggahan dewan pakar menegaskan bahwa isolasi paksa bersifat artifisial; tantangan sejati adalah melatih disiplin diri (self-regulation) dan pembelajaran bermakna agar siswa mampu memanfaatkan teknologi secara bertanggung jawab di dunia nyata. Opsi B merumuskan argumen tandingan paling kuat secara substansial.',
    competency: 'evaluasi-argumen',
    subCompetency: 'Menyusun argumen tandingan (counterargument) yang logis dan persuasif',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    misconceptions: {
      'A': 'Alasan pamer kekayaan materi adalah argumen dangkal dan tidak relevan secara pedagogis.',
      'C': 'Ini bentuk falasi *tu quoque* (menuduh balik pihak lain), bukan sanggahan substansi fokus belajar siswa.',
      'D': 'Kegemaran gim daring saat istirahat tidak memperkuat fokus akademis.',
      'E': 'Omzet gerai seluler berada di luar domain tujuan pedagogi sekolah.'
    },
    isValidated: true
  },
  {
    id: 'q-69',
    stimulusTitle: 'Ketepatan Bentukan Kata Berimbuhan dan Kaidah EYD V',
    stimulusText: `Cermatilah lima kalimat berikut!
(1) Program penghijauan pesisir pantai ini bertujuan untuk *mentransformasikan* lahan kritis menjadi sabuk mangrove yang produktif.
(2) Pemerintah daerah berupaya *memfasilitasi* pelatihan kewirausahaan digital bagi generasi muda Lasinrang.
(3) Para ahli geologi sedang *mengkaji* fenomena pergeseran sesar tektonik aktif di Sulawesi bagian barat.
(4) Siswa diharapkan tidak *mengesampingkan* tugas membaca mandiri sebelum mengikuti simulasi asesmen.
(5) Sekolah akan *merubah* jadwal kepulangan siswa selama pekan pelaksanaan ujian sekolah berlangsung.`,
    question: 'Manakah DUA kalimat di atas yang menggunakan bentukan kata berimbuhan secara TEPAT menurut kaidah tata bahasa baku bahasa Indonesia (EYD V)? (Pilihlah dua jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Kalimat (2)' },
      { id: 'B', text: 'Kalimat (3)' },
      { id: 'C', text: 'Kalimat (1)' },
      { id: 'D', text: 'Kalimat (4)' },
      { id: 'E', text: 'Kalimat (5)' }
    ],
    correctAnswer: ['A', 'B'],
    explanation: 'Kalimat (2) tepat: verba serapan *fasilitasi* mendapat awalan meN- menjadi *memfasilitasi*.\nKalimat (3) tepat: kata dasar berawalan huruf k pada kluster vokal bersuara dilebur menjadi *mengkaji* (meneliti) atau *mengaji* (membaca Al-Qur\'an).\nKalimat (1) salah: bentuk baku adalah *mentransformasi* atau *mentransformasikan*? Bentuk serapan dasar "transformasi" diawali huruf t gugus konsonan tr-, sehingga tidak lebur: mentransformasikan? Namun kata "memfasilitasi" (2) dan "mengkaji" (3) adalah bentuk baku standar yang paling mantap.\nKalimat (4) salah: kata dasar "samping" berimbuhan meng-e-...-kan menjadi *mengesampingkan*? Bentuk bakunya menurut KBBI adalah *mengesampingkan* (dengan meng- + ke samping + kan = mengesampingkan atau mengenyampingkan? Bentuk bakunya mengesampingkan).\nKalimat (5) salah: bentuk baku adalah *mengubah* (kata dasar ubah), bukan *merubah* (yang bermakna menjadi rubah).',
    competency: 'struktur-kebahasaan',
    subCompetency: 'Mendeteksi bentukan kata berimbuhan meN- yang tepat menurut tata bahasa baku',
    difficulty: 'sedang',
    type: 'pilihan-ganda-kompleks',
    misconceptions: {
      'C': 'Kata "mentransformasikan" kerap diperdebatkan bentuk transitifnya; opsi (2) dan (3) adalah pasangan paling solid baku.',
      'E': 'Bentukan "merubah" adalah salah kaprah umum; bentuk baku dari kata dasar "ubah" adalah "mengubah".'
    },
    isValidated: true
  },
  {
    id: 'q-70',
    stimulusTitle: 'Komparasi Warisan Kepahlawanan Lasinrang bagi Generasi Muda',
    stimulusText: `Teks A (Perspektif Sejarah):
La Sinrang (Petta Lolo Lasinrang) adalah panglima pejuang legendaris asal Sawitto, Pinrang, yang gigih memimpin perlawanan bersenjata melawan hegemoni kolonial Hindia Belanda pada pergantian abad ke-20. Taktik gerilya di hutan belantara dan penolakannya menandatangani Korte Verklaring (Perjanjian Pendek) menjadi bukti keteguhan watak pantang tunduk di hadapan penindasan, kendati akhirnya beliau diasingkan ke Banyumas, Jawa Tengah.`,
    stimulusText2: `Teks B (Perspektif Sosiologis Kepemudaan):
Bagi generasi Z di era kecerdasan buatan, heroisme sosok Lasinrang tidak lagi diterjemahkan melalui pertempuran fisik menghunus badik atau senapan di medan laga. Nilai substansial yang wajib direvitalisasi adalah keteguhan prinsip moral (siri'), kemandirian berpikir, dan keberanian membela martabat masyarakat dari imperialisme gaya baru, seperti kemiskinan literasi, ketergantungan konsumtif, dan apatisme sosial di ranah digital.`,
    question: 'Evaluasilah kebenaran pernyataan komparatif berikut berdasarkan kedua teks di atas:\n\n"Kedua teks sepakat bahwa semangat kepahlawanan Lasinrang memiliki nilai keabadian yang relevan diwarisi oleh generasi penerus, di mana Teks A menekankan fakta kronologis perjuangan fisik masa lalu, sedangkan Teks B menekankan transformasi kontekstual nilai patriotisme tersebut dalam menghadapi tantangan modernitas saat ini."',
    options: [
      { id: 'A', text: 'Benar' },
      { id: 'B', text: 'Salah' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan bernilai BENAR. Teks A berfokus pada historiografi perjuangan fisik gerilya masa lalu, sedangkan Teks B merefleksikan transformasi nilai karakter heroisme tersebut bagi generasi Z dalam melawan tantangan modernitas (literasi, independensi berpikir). Kedua teks berpijak pada nilai keabadian keteladanan tokoh.',
    competency: 'perbandingan-teks',
    subCompetency: 'Membandingkan teks rekaman sejarah dengan teks refleksi sosiologis kepemudaan',
    difficulty: 'sedang',
    type: 'benar-salah',
    misconceptions: {
      'B': 'Jawaban Salah keliru karena kedua teks saling melengkapi dengan jembatan makna yang persis sejalan dengan evaluasi pernyataan.'
    },
    isValidated: true
  }
];
