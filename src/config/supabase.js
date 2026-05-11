import { createClient } from '@supabase/supabase-js';

// Intentar cargar env.js (local), si falla usar window.__ENV__ (Vercel)
let SUPABASE_URL, SUPABASE_KEY;

try {
  const mod = await import('../../env.js');
  SUPABASE_URL = mod.ENV?.SUPABASE_URL;
  SUPABASE_KEY = mod.ENV?.SUPABASE_KEY;
} catch {
  SUPABASE_URL = window.__ENV__?.SUPABASE_URL;
  SUPABASE_KEY = window.__ENV__?.SUPABASE_KEY;
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
