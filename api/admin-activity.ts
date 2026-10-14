import type { VercelRequest, VercelResponse } from '@vercel/node';
import { listActivity } from './_core.js';
import { guardAdmin } from './_guards.js';
import { RATE_LIMITS, checkRateLimit } from './_rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!guardAdmin(req, res)) return;
  if (!(await checkRateLimit(req, RATE_LIMITS.adminRead))) {
    res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar.' });
    return;
  }
  try {
    const activity = await listActivity();
    res.status(200).json({ activity });
  } catch (err) {
    console.error('admin-activity error', err);
    res.status(500).json({ error: 'Gagal memuat aktivitas.' });
  }
}