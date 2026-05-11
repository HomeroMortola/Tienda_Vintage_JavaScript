import { createClient } from '@supabase/supabase-js';

let SUPABASE_URL, SUPABASE_KEY;

try {
  const mod = await import('../../env.js');
  SUPABASE_URL = mod.ENV?.SUPABASE_URL;
  SUPABASE_KEY = mod.ENV?.SUPABASE_KEY;
} catch {
  // En Vercel las variables vienen de process.env
  SUPABASE_URL = process.env.SUPABASE_URL;
  SUPABASE_KEY = process.env.SUPABASE_KEY;
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);