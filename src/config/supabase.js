import { createClient } from '@supabase/supabase-js';
import { ENV } from '../../env.js';

const supabaseUrl = process.env.SUPABASE_URL || ENV.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith('https')) {
  throw new Error("ERROR: SUPABASE_URL no definida o inválida.");
}


export const supabase = createClient(supabaseUrl, supabaseKey);