import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminLogin } from './_core.js';
import { RATE_LIMITS, checkRateLimit } from './_rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }
  if (!(await checkRateLimit(req, RATE_LIMITS.adminLogin))) {
    res.status(429).json({ ok: false, error: 'Terlalu banyak percobaan. Coba lagi sebentar.' });
    return;
  }
  try {
    const { username, password } = req.body || {};
    const result = adminLogin(username, password);
    res.status(result.ok ? 200 : 401).json(result);
  } catch {
    res.status(500).json({ ok: false, error: 'Kredensial admin belum dikonfigurasi.' });
  }
}