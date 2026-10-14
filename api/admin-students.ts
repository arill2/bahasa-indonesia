import type { VercelRequest, VercelResponse } from '@vercel/node';
import { listStudents } from './_core';
import { guardAdmin } from './_guards';
import { RATE_LIMITS, checkRateLimit } from './_rateLimit';

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
    const students = await listStudents();
    res.status(200).json({ students });
  } catch (err) {
    console.error('admin-students error', err);
    res.status(500).json({ error: 'Gagal memuat data siswa.' });
  }
}