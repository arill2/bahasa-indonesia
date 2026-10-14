import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-only Supabase client. Uses the service role key and must never run in the browser.
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase env vars are not configured');
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return cached;
}