import { createHmac, timingSafeEqual } from 'crypto';
import { getSupabase } from './_supabase';

export interface ResultPayload {
  name: string;
  className: string;
  activityType?: string;
  title?: string;
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
}

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // admin sessions end after 8 hours

export function adminCredentials(): { username: string; password: string } {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new Error('ADMIN_USERNAME / ADMIN_PASSWORD belum diset');
  }
  return { username, password };
}

function sessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || `bahasa-xii:${adminCredentials().password}`;
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function sign(payload: string): string {
  return createHmac('sha256', sessionSecret()).update(payload).digest('hex').slice(0, 32);
}

export function adminLogin(username?: string, password?: string): { ok: boolean; token?: string } {
  const { username: u, password: p } = adminCredentials();
  // Compare against a fixed-length signature to avoid leaking length info.
  const ok = safeEqual(sign(String(username ?? '')), sign(u)) && safeEqual(sign(String(password ?? '')), sign(p));
  if (!ok) return { ok: false };
  const issuedAt = Date.now().toString(36);
  return { ok: true, token: `${issuedAt}.${sign(issuedAt)}` };
}

export function isAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const [issuedAt, signature] = token.split('.');
  const ts = Number.parseInt(issuedAt || '', 36);
  if (!Number.isFinite(ts) || !signature) return false;
  if (!safeEqual(signature, sign(issuedAt))) return false;
  return Date.now() - ts <= TOKEN_TTL_MS;
}

export async function studentLogin(name: string, className: string) {
  const cleanName = cleanText(name, 80);
  const cleanClass = cleanText(className, 20);
  if (!cleanName || !cleanClass) throw new Error('invalid-input');

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('students')
    .upsert(
      { name: cleanName, class_name: cleanClass, last_login_at: new Date().toISOString() },
      { onConflict: 'name,class_name' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

const MAX_TEXT = 120;
const VALID_ACTIVITY_TYPES = new Set(['latihan', 'adaptif', 'simulasi']);

function cleanText(value: unknown, max = MAX_TEXT): string {
  const s = String(value ?? '').trim().replace(/\s+/g, ' ');
  return s.slice(0, max);
}

export async function submitResult(p: ResultPayload) {
  const cleanName = cleanText(p.name, 80);
  const cleanClass = cleanText(p.className, 20);
  if (!cleanName || !cleanClass) throw new Error('invalid-input');

  const activityType = VALID_ACTIVITY_TYPES.has(String(p.activityType))
    ? String(p.activityType)
    : 'latihan';

  const total = Math.max(0, Math.floor(Number(p.totalQuestions) || 0));
  const correct = Math.min(total, Math.max(0, Math.floor(Number(p.correctCount) || 0)));
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const score = total > 0
    ? Math.min(100, Math.max(0, Math.round(percentage)))
    : 0;

  const supabase = getSupabase();
  // A submitted result implies the student exists; keep last_active fresh.
  const { error: upsertError } = await supabase
    .from('students')
    .upsert(
      { name: cleanName, class_name: cleanClass, last_login_at: new Date().toISOString() },
      { onConflict: 'name,class_name' }
    );
  if (upsertError) throw upsertError;

  const { error } = await supabase.from('exam_results').insert({
    name: cleanName,
    class_name: cleanClass,
    activity_type: activityType,
    title: cleanText(p.title) || null,
    score,
    correct_count: correct,
    total_questions: total,
    percentage
  });

  if (error) throw error;
  return true;
}

export async function listStudents() {
  const supabase = getSupabase();
  const [{ data: students, error: sErr }, { data: results, error: rErr }] = await Promise.all([
    supabase.from('students').select('*').order('last_login_at', { ascending: false }),
    supabase.from('exam_results').select('*').order('created_at', { ascending: false })
  ]);
  if (sErr) throw sErr;
  if (rErr) throw rErr;

  const byKey = new Map<string, any[]>();
  for (const r of results || []) {
    const key = `${r.name}||${r.class_name}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(r);
  }

  return (students || []).map((s) => {
    const list = byKey.get(`${s.name}||${s.class_name}`) || [];
    const scores = list.map((r) => r.score);
    const testsCompleted = list.length;
    const averageScore = testsCompleted
      ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / testsCompleted)
      : 0;
    const highestScore = testsCompleted ? Math.max(...scores) : 0;
    const latest = list[0] || null;

    return {
      id: s.id,
      name: s.name,
      className: s.class_name,
      lastActive: s.last_login_at,
      testsCompleted,
      averageScore,
      highestScore,
      latestExamResult: latest
        ? {
            score: latest.score,
            correctCount: latest.correct_count,
            totalQuestions: latest.total_questions,
            percentage: latest.percentage,
            date: latest.created_at
          }
        : null
    };
  });
}

export async function listActivity() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('exam_results')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;

  return (data || []).map((r) => ({
    id: r.id,
    name: r.name,
    className: r.class_name,
    activityType: r.activity_type,
    title: r.title,
    score: r.score,
    correctCount: r.correct_count,
    totalQuestions: r.total_questions,
    percentage: r.percentage,
    timestamp: r.created_at
  }));
}

export async function deleteStudent(name: string, className: string) {
  const cleanName = cleanText(name, 80);
  const cleanClass = cleanText(className, 20);
  if (!cleanName || !cleanClass) throw new Error('invalid-input');

  const supabase = getSupabase();
  const { error: resultsError } = await supabase
    .from('exam_results')
    .delete()
    .eq('name', cleanName)
    .eq('class_name', cleanClass);
  if (resultsError) throw resultsError;

  const { error } = await supabase
    .from('students')
    .delete()
    .eq('name', cleanName)
    .eq('class_name', cleanClass);
  if (error) throw error;
  return true;
}