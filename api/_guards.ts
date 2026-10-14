import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdminToken } from './_core';

export function guardAdmin(req: VercelRequest, res: VercelResponse): boolean {
  if (!isAdminToken(req.headers['x-admin-token'] as string | undefined)) {
    res.status(401).json({ error: 'Akses admin ditolak.' });
    return false;
  }
  return true;
}

export function readBody(
  body: unknown,
  fields: string[],
  maxLength = 80
): Record<string, string> | null {
  const b = (body || {}) as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const f of fields) {
    const v = b[f];
    if (typeof v !== 'string') return null;
    const t = v.trim().replace(/\s+/g, ' ').slice(0, maxLength);
    if (!t) return null;
    out[f] = t;
  }
  return out;
}

export function isInvalidInput(err: unknown): boolean {
  return err instanceof Error && err.message === 'invalid-input';
}