import type { VercelRequest, VercelResponse } from '@vercel/node';
import { deleteStudent } from './_core.js';
import { guardAdmin, readBody, isInvalidInput } from './_guards.js';
import { RATE_LIMITS, checkRateLimit } from './_rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!guardAdmin(req, res)) return;
  if (!(await checkRateLimit(req, RATE_LIMITS.adminRead))) {
    res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar.' });
    return;
  }
  const body = readBody(req.body, ['name', 'className']);
  if (!body) {
    res.status(400).json({ error: 'Nama dan kelas wajib diisi.' });
    return;
  }
  try {
    await deleteStudent(body.name, body.className);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('admin-delete-student error', err);
    res.status(isInvalidInput(err) ? 400 : 500).json({ error: 'Gagal menghapus data siswa.' });
  }
}