# Panduan Desain & Bahasa Visual: BAHASA XII SMAN 1 Pinrang

## 1. Filosofi & Konteks Produk
- **Produk:** Media Pembelajaran & Simulator Mandiri TKA Bahasa Indonesia Kelas XII.
- **Institusi:** SMAN 1 Pinrang, Sulawesi Selatan.
- **Audiens:** Siswa kelas XII (persiapan asesmen akademik / SNBT) dan guru mata pelajaran Bahasa Indonesia.
- **Karakter Visual:** *Serious, Academic, Focused, Calm*. Bukan aplikasi gaming atau promosi marketing, melainkan platform belajar yang mendahulukan keterbacaan teks wacana panjang (*stimulus literacy*), kejernihan nalar ilmiah, dan ketepatan evaluasi.

---

## 2. Dial Desain (Antislop Framework)
- **ENERGY:** `2` (Tenang, akademis, minim distraksi visual; tidak ada pulsating tiada henti atau warna neon).
- **RHYTHM:** `2` (Struktur kartu modular dengan batas tegas `border-stone-200`, hierarki judul-deskripsi yang konsisten).
- **MOTION:** `1` (Animasi mikro seperlunya; transisi hover halus, `animate-fadeIn` saat perpindahan tab, tanpa efek gerak yang mengganggu pembacaan wacana).

---

## 3. Sistem Warna (Color Palette)

### Palet Primer & Sekunder
| Peran | Token Tailwind | Hex Approx | Alasan & Penggunaan |
|---|---|---|---|
| **Primary Brand** | `teal-700` / `teal-800` | `#0f766e` / `#115e59` | Warna dasar institusional solid dan agak gelap untuk suasana akademik yang tenang; mencerminkan ketenangan, fokus studi, dan martabat sekolah. Digunakan pada tombol aksi utama, header identitas, tab aktif. |
| **Dark Neutral Hero** | `stone-900` / `stone-800` | `#1c1917` / `#292524` | Warna gelap hangat berkontras tinggi untuk hero banner dan kartu nilai utama. Solid tanpa gradien ungu/sian atau bola blur dekoratif. |
| **Neutral Surface** | `white` / `stone-50` / `stone-100` | `#ffffff` / `#fafaf9` / `#f5f5f4` | Latar hangat yang nyaman untuk membaca stimulus wacana berparagraf banyak. |
| **Neutral Border** | `stone-200` / `stone-300` | `#e7e5e4` / `#d6d3d1` | Garis batas kartu yang tegas dan rapi, menggantikan bayangan kabur. |
| **Neutral Text** | `stone-900` / `stone-700` / `stone-500` | `#1c1917` / `#44403c` / `#78716c` | Kontras tinggi teks tajam sesuai standar aksesibilitas WCAG untuk teks panjang. |

> [!NOTE]
> **Larangan Gradien AI & Bola Blur (R-01 & R-13):** Seluruh elemen antarmuka menggunakan warna solid (*flat craft*). Dilarang menggunakan gradien acak (mis. `from-teal-950 via-teal-900 to-cyan-950`), gradien tombol mikro, kartu warna pelangi pastel, serta bola blur radial (`blur-3xl`/`blur-2xl`) di latar belakang hero.

### Palet Semantik (Evaluasi & Status)
| Status | Token Tailwind | Penggunaan |
|---|---|---|
| **Sukses / Jawaban Benar** | `emerald-600` / `emerald-50` | Menandai jawaban benar, modul tuntas, skor lulus (solid). |
| **Peringatan / Ragu-ragu** | `amber-500` / `amber-50` | Butir soal yang ditandai ragu-ragu (*flagged*), batas waktu hampir habis. |
| **Kekeliruan / Remidi** | `rose-600` / `rose-50` | Analisis kesalahan nalar siswa, materi yang membutuhkan penguatan (*weak areas*). |

---

## 4. Tipografi

| Kategori | Font / Kelas | Tujuan |
|---|---|---|
| **Antarmuka & Navigasi** | *Sans-serif system / Inter* | Judul, metrik, tombol, label status. Terbaca jelas pada layar ponsel hingga desktop. |
| **Stimulus Soal (Wacana)** | `font-serif-reading` (Serif) | Paragraf teks editorial, artikel opini, dan kutipan sastra. Mengadopsi standar cetak lembar ujian nasional dan jurnal ilmiah untuk mengurangi kelelahan mata siswa saat membaca teks panjang. |
| **Label Navigasi** | *Sentence Case / Title Case* | Menghindari *all-caps* yang terkesan berteriak; menggunakan bahasa Indonesia baku yang lugas (*Beranda*, *Materi*, *Latihan Soal*, dll). |

---

## 5. Komponen & Aksesibilitas Keyboard (R-32)
1. **Modal Dialog:**
   - Semua modal (`AITutorModal`, `StudentNameModal`, `QuestionDetailModal`, drawer navigasi mobile, konfirmasi selesai simulasi, lembar nilai latihan) **wajib** mendengarkan penekanan tombol `Escape` untuk menutup.
2. **Navigasi Ujian & Latihan:**
   - Pilihan ganda dapat dipilih langsung melalui keyboard (`A`, `B`, `C`, `D`, `E`).
   - Navigasi antarsoal menggunakan tombol panah (`ArrowLeft`, `ArrowRight`).
   - Penanda ragu-ragu dapat diaktifkan dengan tombol `F` (*Flag*).

---

## 6. Aturan Penulisan & Ikonografi (Antislop Compliance)
- **Tanda Baca UI (R-02):** Tidak menggunakan em dash (`—`) pada label navigasi atau metadata antarmuka. Digunakan tanda titik tengah (`·`), titik dua (`:`), atau koma. Em dash hanya diizinkan di dalam stimulus kutipan teks sastra/bahasa resmi yang memang menjadi materi ujian.
- **Ikon Berarti (R-04):**
  - XP dan prestasi menggunakan ikon `Star` atau `Award`.
  - Diagnosis AI dan tutor menggunakan `BotMessageSquare` atau `BookOpen`.
  - Latihan terarah / target penguatan menggunakan `Target`.
  - Rekomendasi pedagogis guru menggunakan `Lightbulb`.
  - Validasi mutu butir soal menggunakan `ShieldCheck`.
- **Motion & Pulsing (R-19):** `animate-pulse` dilarang untuk elemen dekoratif statis; hanya diaktifkan jika menandakan status langsung yang sedang aktif (peringatan waktu kritis < 5 menit, audio speech synthesis aktif membaca wacana).
- **Kedalaman & Kaca (R-10 & R-12):** Efek `backdrop-blur` dibatasi hanya untuk overlay modal dialog; permukaan header dan kartu dibuat *solid* dan tegas.
