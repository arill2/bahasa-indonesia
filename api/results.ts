import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitResult } from './_core.js';
import { isInvalidInput } from './_guards.js';
import { RATE_LIMITS, checkRateLimit } from './_rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!(await checkRateLimit(req, RATE_LIMITS.results))) {
    res.status(429).json({ error: 'Terlalu banyak pengiriman nilai. Coba lagi sebentar.' });
    return;
  }
  const body = (req.body || {}) as Record<string, unknown>;
  if (typeof body.name !== 'string' || typeof body.className !== 'string') {
    res.status(400).json({ error: 'Nama dan kelas wajib diisi.' });
    return;
  }
  try {
    await submitResult(body as never);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('results error', err);
    res.status(isInvalidInput(err) ? 400 : 500).json({ error: 'Gagal menyimpan hasil.' });
  }
}