import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  adminLogin,
  studentLogin,
  submitResult,
  listStudents,
  listActivity,
  deleteStudent,
  isAdminToken
} from '../api/_core';
import { isInvalidInput } from '../api/_guards';
import { RATE_LIMITS, checkRateLimit } from '../api/_rateLimit';

async function limit(req: Request, res: Response, rule: typeof RATE_LIMITS.results): Promise<boolean> {
  const ok = await checkRateLimit(req, rule);
  if (!ok) res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar.' });
  return ok;
}

dotenv.config();

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '32kb' }));

// Minimal security headers (helmet-lite) without adding a dependency.
app.use((_req: Request, res: Response, next: () => void) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

function requireAdmin(req: Request, res: Response): boolean {
  if (!isAdminToken(req.headers['x-admin-token'] as string | undefined)) {
    res.status(401).json({ error: 'Akses admin ditolak.' });
    return false;
  }
  return true;
}

app.post('/api/admin-login', async (req: Request, res: Response) => {
  if (!(await limit(req, res, RATE_LIMITS.adminLogin))) return;
  try {
    const { username, password } = req.body || {};
    const result = adminLogin(username, password);
    res.status(result.ok ? 200 : 401).json(result);
  } catch {
    res.status(500).json({ ok: false, error: 'Kredensial admin belum dikonfigurasi.' });
  }
});

app.post('/api/student-login', async (req: Request, res: Response) => {
  if (!(await limit(req, res, RATE_LIMITS.studentLogin))) return;
  const { name, className } = req.body || {};
  if (typeof name !== 'string' || typeof className !== 'string' || !name.trim() || !className.trim()) {
    res.status(400).json({ error: 'Nama dan kelas wajib diisi.' });
    return;
  }
  try {
    const student = await studentLogin(name, className);
    res.json({ ok: true, student });
  } catch (err) {
    console.error('student-login error', err);
    res.status(isInvalidInput(err) ? 400 : 500).json({ error: 'Gagal mencatat login siswa.' });
  }
});

app.post('/api/results', async (req: Request, res: Response) => {
  if (!(await limit(req, res, RATE_LIMITS.results))) return;
  const body = req.body || {};
  if (typeof body.name !== 'string' || typeof body.className !== 'string') {
    res.status(400).json({ error: 'Nama dan kelas wajib diisi.' });
    return;
  }
  try {
    await submitResult(body);
    res.json({ ok: true });
  } catch (err) {
    console.error('results error', err);
    res.status(isInvalidInput(err) ? 400 : 500).json({ error: 'Gagal menyimpan hasil.' });
  }
});

app.get('/api/admin-students', async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;
  if (!(await limit(req, res, RATE_LIMITS.adminRead))) return;
  try {
    res.json({ students: await listStudents() });
  } catch (err) {
    console.error('admin-students error', err);
    res.status(500).json({ error: 'Gagal memuat data siswa.' });
  }
});

app.get('/api/admin-activity', async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;
  if (!(await limit(req, res, RATE_LIMITS.adminRead))) return;
  try {
    res.json({ activity: await listActivity() });
  } catch (err) {
    console.error('admin-activity error', err);
    res.status(500).json({ error: 'Gagal memuat aktivitas.' });
  }
});

app.delete('/api/admin-delete-student', async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;
  if (!(await limit(req, res, RATE_LIMITS.adminRead))) return;
  const { name, className } = req.body || {};
  if (typeof name !== 'string' || typeof className !== 'string' || !name.trim() || !className.trim()) {
    res.status(400).json({ error: 'Nama dan kelas wajib diisi.' });
    return;
  }
  try {
    await deleteStudent(name, className);
    res.json({ ok: true });
  } catch (err) {
    console.error('admin-delete-student error', err);
    res.status(isInvalidInput(err) ? 400 : 500).json({ error: 'Gagal menghapus data siswa.' });
  }
});

// All errors answer as JSON, never as an HTML stack trace. Must sit after every route.
app.use((err: unknown, _req: Request, res: Response, _next: () => void) => {
  console.error('server error', err);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

// Serve the Vite app in development and static files in production.
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.resolve(__dirname, '..', 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server BAHASA XII berjalan di http://localhost:${PORT}`);
  });

  // Never let an async startup failure kill the process silently.
  process.on('unhandledRejection', (reason) => console.error('unhandledRejection', reason));

  ['SIGTERM', 'SIGINT'].forEach((sig) =>
    process.on(sig, () => {
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(0), 3000).unref();
    })
  );
}

startServer();