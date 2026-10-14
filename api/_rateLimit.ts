import { getSupabase } from './_supabase';

export interface RateLimitRule {
  name: string;
  limit: number;
  windowMs: number;
}

export const RATE_LIMITS: Record<string, RateLimitRule> = {
  results: { name: 'results', limit: 30, windowMs: 60_000 },
  studentLogin: { name: 'student-login', limit: 10, windowMs: 60_000 },
  adminLogin: { name: 'admin-login', limit: 5, windowMs: 60_000 },
  adminRead: { name: 'admin-read', limit: 120, windowMs: 60_000 }
};

// On Vercel the platform owns x-forwarded-for and overwrites client-supplied values,
// so trusting it there is safe. Locally (plain Express) we use the socket address,
// which cannot be spoofed by headers.
export function getClientId(req: {
  headers: Record<string, unknown>;
  socket?: { remoteAddress?: string };
}): string {
  if (process.env.VERCEL) {
    const fwd = String(req.headers['x-forwarded-for'] || '');
    const ip = fwd.split(',')[0].trim();
    if (ip) return ip;
  }
  return String(req.socket?.remoteAddress || 'unknown');
}

// Atomic per-IP counter in Postgres. DB failure closes the gate (deny), never opens it.
export async function checkRateLimit(
  req: { headers: Record<string, unknown>; socket?: { remoteAddress?: string } },
  rule: RateLimitRule
): Promise<boolean> {
  const dbKey = `${rule.name}:${getClientId(req)}`.slice(0, 200);
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.rpc('rate_limit_increment', {
      p_key: dbKey,
      p_window_ms: rule.windowMs,
      p_limit: rule.limit
    });
    if (error) throw error;
    return data === true;
  } catch (err) {
    console.error('rate-limit failed closed', err);
    return false;
  }
}