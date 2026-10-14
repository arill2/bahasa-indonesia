import React from 'react';
import { ClipboardList, BookOpenCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-200 mt-16 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Identitas Platform */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold text-stone-900 tracking-tight text-base">
                BAHASA XII · SMAN 1 PINRANG
              </span>
            </div>
            <p className="text-xs text-stone-500 mb-3 leading-relaxed">
              Media pembelajaran terpadu Bahasa Indonesia Kelas XII, latihan soal penalaran literasi, dan simulator mandiri Asesmen Akademik.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>SMAN 1 Pinrang, Sulawesi Selatan</span>
            </div>
          </div>

          {/* Pedoman Akademik */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 mb-2.5 flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-teal-600" />
              Fokus Kompetensi Kelas XII
            </h4>
            <ul className="text-xs text-stone-500 space-y-1.5">
              <li>· Membaca dan Memahami Berbagai Teks</li>
              <li>· Analisis Argumen, Bukti, Fakta & Opini</li>
              <li>· Sintesis Teks Komparatif (Multiteks)</li>
              <li>· Kaidah Kalimat Efektif & Ejaan Bahasa Indonesia (EYD V)</li>
            </ul>
          </div>

          {/* Legalitas & Catatan Penting */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 mb-2.5 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              Catatan Asesmen
            </h4>
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
              <p className="font-semibold mb-1">Pemberitahuan Pembelajaran:</p>
              <p className="text-[11px] text-amber-800">
                Platform ini merupakan media pembelajaran internal dan simulasi latihan mandiri siswa SMAN 1 Pinrang. Hasil dan skor simulasi bukan merupakan hasil resmi TKA ataupun seleksi nasional lainnya.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© 2026 SMAN 1 Pinrang. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-medium text-stone-600">
            Guru Pembimbing: Muhammad Ali Rahman, S.Pd., M.Pd.
          </p>
          <p className="text-stone-500">
            Dev by <span className="font-semibold text-teal-700">Syahrir Hamdani XII.G</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
