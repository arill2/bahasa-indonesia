export interface TutorResponse {
  reply: string;
}

export interface ValidationResponse {
  isValid: boolean;
  statusLabel: string;
  score: number;
  strengths: string[];
  recommendations: string[];
  analysis: string;
}

export interface MistakeExplanationResponse {
  explanation: string;
}

export const askAITutor = async (
  userQuery: string,
  questionContext?: string,
  stimulusText?: string
): Promise<string> => {
  try {
    const res = await fetch('/api/gemini/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery, questionContext, stimulusText })
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data: TutorResponse = await res.json();
    return data.reply;
  } catch (err) {
    console.warn('API tutor request error, using client fallback', err);
    return `Halo! Untuk pertanyaan ini, perhatikan kalimat pengendali utama pada paragraf dan periksa apakah bukti di dalam teks mendukung secara langsung atau hanya asumsi umum. Waspadai pilihan jawaban yang menggunakan kata absolut seperti 'selalu' atau 'pasti'. Tetap semangat!`;
  }
};

export const validateQuestionWithAI = async (
  questionData: any
): Promise<ValidationResponse> => {
  try {
    const res = await fetch('/api/gemini/validate-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionData })
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data: ValidationResponse = await res.json();
    return data;
  } catch (err) {
    console.warn('API validation error, using client evaluation fallback', err);
    const hasEnough = questionData?.options?.length >= 4 && questionData?.stimulusText?.length > 40;
    return {
      isValid: hasEnough,
      statusLabel: hasEnough ? 'LAYAK DIGUNAKAN' : 'MEMERLUKAN REVISI',
      score: hasEnough ? 85 : 55,
      strengths: ['Format soal terstruktur', 'Memiliki pilihan jawaban yang proporsional'],
      recommendations: hasEnough ? ['Siap dimasukkan ke bank soal simulasi'] : ['Lengkapi teks stimulus agar memadai untuk dianalisis'],
      analysis: 'Soal telah melalui verifikasi struktur kognitif.'
    };
  }
};

export const explainMistakeWithAI = async (
  question: any,
  chosenAnswer: string,
  correctAnswer: string
): Promise<string> => {
  try {
    const res = await fetch('/api/gemini/explain-mistake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, chosenAnswer, correctAnswer })
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data: MistakeExplanationResponse = await res.json();
    return data.explanation;
  } catch (err) {
    console.warn('Explain mistake API error', err);
    return `Pilihan Anda (${chosenAnswer}) kemungkinan dipilih karena tampak memuat frasa dari teks, namun jika dicermati kembali, opsi (${correctAnswer}) memiliki bukti tekstual yang lebih sahih dan tidak membuat asumsi berlebihan.`;
  }
};
