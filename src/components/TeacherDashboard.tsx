import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  PlusCircle,
  Edit3,
  Trash2,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Search,
  BookOpen,
  GraduationCap,
  Save,
  RotateCcw
} from 'lucide-react';
import {
  Question,
  Competency,
  DifficultyLevel,
  QuestionType,
  COMPETENCY_LABELS,
  TeacherConfig,
  ClassStudentData,
  CLASS_OPTIONS
} from '../types';
import {
  getStoredQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getTeacherConfig,
  saveTeacherConfig,
  getStoredStudents
} from '../services/storage';
import { validateQuestionWithAI, ValidationResponse } from '../services/api';
import { CLASS_COMPETENCY_STATS } from '../data/teacherData';

interface TeacherDashboardProps {
  questions: Question[];
  onRefreshQuestions: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  questions,
  onRefreshQuestions
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'analisis' | 'kelola-soal' | 'tambah-soal' | 'pengaturan'>('analisis');
  const [teacherConfig, setTeacherConfigState] = useState<TeacherConfig>(getTeacherConfig());
  const [studentsList] = useState<ClassStudentData[]>(getStoredStudents());
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('Semua');

  // New question form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formStimulusTitle, setFormStimulusTitle] = useState('');
  const [formStimulusText, setFormStimulusText] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState<{ id: string; text: string }[]>([
    { id: 'A', text: '' },
    { id: 'B', text: '' },
    { id: 'C', text: '' },
    { id: 'D', text: '' },
    { id: 'E', text: '' }
  ]);
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('A');
  const [formExplanation, setFormExplanation] = useState('');
  const [formCompetency, setFormCompetency] = useState<Competency>('ide-pokok');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('sedang');
  const [formSubCompetency, setFormSubCompetency] = useState('');

  // AI Validator state
  const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Filter students
  const filteredStudents =
    selectedClassFilter === 'Semua'
      ? studentsList
      : studentsList.filter((s) => s.className === selectedClassFilter);

  // Calculate Class Metrics
  const avgClassScore = Math.round(
    filteredStudents.reduce((acc, s) => acc + s.averageScore, 0) / (filteredStudents.length || 1)
  );
  const highestClassScore = Math.max(...filteredStudents.map((s) => s.highestScore), 0);
  const lowestClassScore = Math.min(...filteredStudents.map((s) => s.averageScore), 100);

  // Sorted Class Competency stats
  const sortedCompetencies = Object.entries(CLASS_COMPETENCY_STATS).sort(
    (a, b) => a[1].averageAccuracy - b[1].averageAccuracy
  );

  const handleValidateFormWithAI = async () => {
    setIsValidating(true);
    setValidationResult(null);

    const draftQuestion: Partial<Question> = {
      stimulusTitle: formStimulusTitle,
      stimulusText: formStimulusText,
      question: formQuestion,
      options: formOptions,
      correctAnswer: formCorrectAnswer,
      explanation: formExplanation,
      competency: formCompetency,
      difficulty: formDifficulty,
      subCompetency: formSubCompetency
    };

    try {
      const res = await validateQuestionWithAI(draftQuestion);
      setValidationResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveQuestion = () => {
    if (!formStimulusTitle || !formStimulusText || !formQuestion || !formExplanation) {
      setNotificationMsg('Harap lengkapi judul stimulus, teks bacaan, pertanyaan, dan pembahasan.');
      setTimeout(() => setNotificationMsg(null), 3000);
      return;
    }

    const questionPayload: Question = {
      id: editingId || `custom-q-${Date.now()}`,
      stimulusTitle: formStimulusTitle,
      stimulusText: formStimulusText,
      question: formQuestion,
      options: formOptions,
      correctAnswer: formCorrectAnswer,
      explanation: formExplanation,
      competency: formCompetency,
      difficulty: formDifficulty,
      type: 'pilihan-ganda',
      subCompetency: formSubCompetency || 'Penalaran Kontekstual',
      isValidated: validationResult ? validationResult.isValid : true,
      validationNotes: validationResult ? validationResult.analysis : 'Dibuat langsung oleh Guru'
    };

    if (editingId) {
      updateQuestion(questionPayload);
      setNotificationMsg('Soal berhasil diperbarui di Bank Soal!');
    } else {
      addQuestion(questionPayload);
      setNotificationMsg('Soal baru berhasil ditambahkan ke Bank Soal!');
    }

    onRefreshQuestions();
    resetForm();
    setTimeout(() => {
      setNotificationMsg(null);
      setActiveSubTab('kelola-soal');
    }, 1500);
  };

  const handleEditClick = (q: Question) => {
    setEditingId(q.id);
    setFormStimulusTitle(q.stimulusTitle);
    setFormStimulusText(q.stimulusText);
    setFormQuestion(q.question);
    setFormOptions(q.options);
    setFormCorrectAnswer(Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormCompetency(q.competency);
    setFormDifficulty(q.difficulty);
    setFormSubCompetency(q.subCompetency);
    setValidationResult(null);
    setActiveSubTab('tambah-soal');
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Apakah Bapak/Ibu yakin ingin menghapus butir soal ini dari bank soal?')) {
      deleteQuestion(id);
      onRefreshQuestions();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormStimulusTitle('');
    setFormStimulusText('');
    setFormQuestion('');
    setFormOptions([
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' },
      { id: 'E', text: '' }
    ]);
    setFormCorrectAnswer('A');
    setFormExplanation('');
    setFormSubCompetency('');
    setValidationResult(null);
  };

  const handleSaveConfig = () => {
    saveTeacherConfig(teacherConfig);
    setNotificationMsg('Pengaturan profil guru berhasil disimpan.');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Mode Guru */}
      <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            PANEL GURU BAHASA INDONESIA
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Dashboard Pengampu: {teacherConfig.teacherName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            NIP: {teacherConfig.nip} • {teacherConfig.schoolName} • Tahun Ajaran {teacherConfig.academicYear}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-xl text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('analisis')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'analisis' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Analisis Kelas
          </button>
          <button
            onClick={() => setActiveSubTab('kelola-soal')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'kelola-soal' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Kelola Bank Soal ({questions.length})
          </button>
          <button
            onClick={() => {
              resetForm();
              setActiveSubTab('tambah-soal');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'tambah-soal' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            + Buat Soal Baru
          </button>
          <button
            onClick={() => setActiveSubTab('pengaturan')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'pengaturan' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Pengaturan
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notificationMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* SUB-TAB 1: ANALISIS KELAS */}
      {activeSubTab === 'analisis' && (
        <div className="space-y-6">
          {/* Class Filters & Summary Cards */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              Statistik Perkembangan Siswa SMAN 1 Pinrang
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Filter Rombel:</span>
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700"
              >
                <option value="Semua">Semua Rombel (XII A s.d. XII L)</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Rata-Rata Kelas</span>
              <div className="text-3xl font-black text-indigo-700">{avgClassScore}</div>
              <p className="text-[11px] text-slate-400 mt-1">Standar KKM: {teacherConfig.passGrade}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Skor Tertinggi</span>
              <div className="text-3xl font-black text-emerald-600">{highestClassScore}</div>
              <p className="text-[11px] text-slate-400 mt-1">Capaian Maksimal</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Skor Terendah</span>
              <div className="text-3xl font-black text-rose-600">{lowestClassScore}</div>
              <p className="text-[11px] text-slate-400 mt-1">Perlu Remedial</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Siswa Terdata</span>
              <div className="text-3xl font-black text-slate-900">{filteredStudents.length}</div>
              <p className="text-[11px] text-slate-400 mt-1">Aktif Latihan</p>
            </div>
          </div>

          {/* Competency Mastery & Pedagogical Recommendation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Weakest vs Strongest Chart */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">
                  Penguasaan Kompetensi per Indikator (%)
                </h3>
                <span className="text-xs text-slate-400">Sampel Angkatan XII</span>
              </div>

              <div className="space-y-3 pt-1">
                {sortedCompetencies.map(([cKey, stat]) => {
                  const label = COMPETENCY_LABELS[cKey as Competency] || cKey;
                  const isCrit = stat.averageAccuracy < 70;
                  return (
                    <div key={cKey} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{label}</span>
                        <span className={`font-bold ${isCrit ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {stat.averageAccuracy}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isCrit ? 'bg-rose-500' : 'bg-emerald-600'}`}
                          style={{ width: `${stat.averageAccuracy}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Teacher Intervention Recommendation */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
                <Lightbulb className="w-3.5 h-3.5" />
                Rekomendasi Pembelajaran untuk Guru
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug">
                Fokus Penguatan Kelas: Evaluasi Argumen & Literasi Multiteks
              </h4>

              <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
                <p>
                  Berdasarkan pemantauan hasil simulasi, 3 kompetensi yang paling membutuhkan intervensi pembelajaran di kelas:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-700 font-medium">
                  <li><strong>Evaluasi Argumen & Bukti</strong>, rata-rata akurasi: 61%</li>
                  <li><strong>Keakuratan & Relevansi Informasi</strong>, rata-rata akurasi: 65%</li>
                  <li><strong>Membandingkan Dua Teks (Multiteks)</strong>, rata-rata akurasi: 67%</li>
                </ol>
                <div className="p-3 bg-white rounded-xl border border-indigo-100 text-[11px] text-slate-700 space-y-1">
                  <span className="font-bold text-indigo-900 block">Saran Aksi Pedagogis:</span>
                  <p>
                    Berikan tugas analisis teks editorial harian berpasangan untuk mengidentifikasi bias klaim dan keabsahan data statistik sebelum memulai latihan mandiri TKA.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Progress Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                Rekapitulasi Nilai Siswa ({filteredStudents.length} Peserta)
              </h3>
              <span className="text-xs text-slate-400">Terakhir Diperbarui Hari Ini</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Nama Siswa</th>
                    <th className="py-3 px-4 font-bold">NISN</th>
                    <th className="py-3 px-4 font-bold">Kelas</th>
                    <th className="py-3 px-4 font-bold">Tes Diikuti</th>
                    <th className="py-3 px-4 font-bold">Rata-Rata</th>
                    <th className="py-3 px-4 font-bold">Tertinggi</th>
                    <th className="py-3 px-4 font-bold">Titik Lemah</th>
                    <th className="py-3 px-4 font-bold">Aktivitas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{s.nisn}</td>
                      <td className="py-3 px-4 font-medium">{s.className}</td>
                      <td className="py-3 px-4">{s.testsCompleted} sesi</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            s.averageScore >= teacherConfig.passGrade
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {s.averageScore}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{s.highestScore}</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">
                        {COMPETENCY_LABELS[s.weakestCompetency]?.split(' ')[0]}
                      </td>
                      <td className="py-3 px-4 text-slate-400">{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: KELOLA BANK SOAL */}
      {activeSubTab === 'kelola-soal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Butir Soal Terdaftar ({questions.length})
            </h2>
            <button
              onClick={() => {
                resetForm();
                setActiveSubTab('tambah-soal');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Tambah Soal Baru
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{q.stimulusTitle}</h4>
                    </div>
                    <p className="text-xs text-slate-600">{q.question}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700">
                      {COMPETENCY_LABELS[q.competency]}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold capitalize bg-slate-100 text-slate-600">
                      {q.difficulty}
                    </span>

                    <button
                      onClick={() => handleEditClick(q)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Edit Soal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(q.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed font-serif-reading max-h-24 overflow-y-auto">
                  {q.stimulusText}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Kunci Jawaban: <strong>{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}</strong></span>
                  <span>Subkompetensi: {q.subCompetency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TAMBAH / EDIT SOAL & AI VALIDATOR */}
      {activeSubTab === 'tambah-soal' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Butir Soal' : 'Form Penyusunan Butir Soal Baru'}
              </h2>
              <p className="text-xs text-slate-500">
                Lengkapi stimulus, pertanyaan, opsi, dan gunakan Validator AI sebelum menyimpan.
              </p>
            </div>
            {editingId && (
              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg">
                Mode Ubah: #{editingId}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Judul Stimulus */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Judul Wacana Stimulus:
              </label>
              <input
                type="text"
                placeholder="Contoh: Ketahanan Pangan di Bumi Lasinrang..."
                value={formStimulusTitle}
                onChange={(e) => setFormStimulusTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Target Kompetensi */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kompetensi yang Diuji:
              </label>
              <select
                value={formCompetency}
                onChange={(e) => setFormCompetency(e.target.value as Competency)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium"
              >
                {Object.entries(COMPETENCY_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Teks Stimulus */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Teks Wacana Stimulus (Maksimal 3-4 paragraf realistis):
            </label>
            <textarea
              rows={6}
              placeholder="Ketik atau tempel teks stimulus di sini..."
              value={formStimulusText}
              onChange={(e) => setFormStimulusText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 font-serif-reading focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Pertanyaan */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Batang Soal (Stem Pertanyaan):
            </label>
            <input
              type="text"
              placeholder="Contoh: Berdasarkan paragraf kedua, apa simpulan logis mengenai..."
              value={formQuestion}
              onChange={(e) => setFormQuestion(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Opsi Jawaban A - E */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 block">
              Pilihan Jawaban (A s.d. E) & Tandai Kunci:
            </label>
            {formOptions.map((opt, idx) => (
              <div key={opt.id} className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center shrink-0">
                  {opt.id}
                </span>
                <input
                  type="text"
                  placeholder={`Pilihan ${opt.id}...`}
                  value={opt.text}
                  onChange={(e) => {
                    const copy = [...formOptions];
                    copy[idx].text = e.target.value;
                    setFormOptions(copy);
                  }}
                  className="flex-1 p-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500"
                />
                <label className="flex items-center gap-1 text-xs cursor-pointer px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                  <input
                    type="radio"
                    name="correctKey"
                    checked={formCorrectAnswer === opt.id}
                    onChange={() => setFormCorrectAnswer(opt.id)}
                  />
                  <span className="font-semibold text-slate-700">Kunci</span>
                </label>
              </div>
            ))}
          </div>

          {/* Pembahasan & Tingkat Kesulitan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tingkat Kesulitan:
              </label>
              <select
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value as DifficultyLevel)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Subkompetensi / Deskripsi Ringkas:
              </label>
              <input
                type="text"
                placeholder="Contoh: Menarik simpulan berbasis premis teks"
                value={formSubCompetency}
                onChange={(e) => setFormSubCompetency(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Pembahasan Resmi Lengkap:
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan argumen mengapa kunci tersebut benar dan mengapa opsi lain salah..."
              value={formExplanation}
              onChange={(e) => setFormExplanation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* AI Validator Button & Result Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Validator Kualitas Soal AI
                </h4>
                <p className="text-[11px] text-slate-500">
                  Uji butir soal terhadap 8 kriteria mutu asesmen TKA sebelum disimpan.
                </p>
              </div>

              <button
                type="button"
                onClick={handleValidateFormWithAI}
                disabled={isValidating}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs transition-all cursor-pointer"
              >
                {isValidating ? 'Sedang Memeriksa...' : 'Uji Kelayakan Soal'}
              </button>
            </div>

            {validationResult && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  validationResult.isValid
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>Status: {validationResult.statusLabel} (Skor: {validationResult.score}/100)</span>
                  <span className="text-[11px] font-semibold">
                    {validationResult.isValid ? '✓ Memenuhi Standar' : '⚠ Perlu Koreksi'}
                  </span>
                </div>
                <p className="text-slate-700">{validationResult.analysis}</p>
                {validationResult.recommendations && validationResult.recommendations.length > 0 && (
                  <div className="text-[11px] text-slate-600">
                    <span className="font-bold">Saran:</span> {validationResult.recommendations.join(' ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveSubTab('kelola-soal')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSaveQuestion}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Simpan Perubahan' : 'Tambahkan ke Bank Soal'}
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: PENGATURAN PROFIL GURU */}
      {activeSubTab === 'pengaturan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Pengaturan Identitas Pembelajaran</h2>
            <p className="text-xs text-slate-500">
              Konfigurasi data guru pengampu, nama sekolah, dan standar kelulusan KKM.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Guru Pengampu:</label>
              <input
                type="text"
                value={teacherConfig.teacherName}
                onChange={(e) => setTeacherConfigState({ ...teacherConfig, teacherName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">NIP Guru:</label>
              <input
                type="text"
                value={teacherConfig.nip}
                onChange={(e) => setTeacherConfigState({ ...teacherConfig, nip: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Satuan Pendidikan:</label>
              <input
                type="text"
                value={teacherConfig.schoolName}
                onChange={(e) => setTeacherConfigState({ ...teacherConfig, schoolName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tahun Ajaran:</label>
              <input
                type="text"
                value={teacherConfig.academicYear}
                onChange={(e) => setTeacherConfigState({ ...teacherConfig, academicYear: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kriteria Ketuntasan Minimum (KKM Nilai):</label>
              <input
                type="number"
                value={teacherConfig.passGrade}
                onChange={(e) => setTeacherConfigState({ ...teacherConfig, passGrade: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveConfig}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
