import { createClient } from '@supabase/supabase-js';
import { ENV } from '../../env.js';

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_KEY;

// 2. Si no existen (estás en local), intentamos importar tu env.js
if (!supabaseUrl || !supabaseKey) {
  try {
    const { ENV } = await import('../../env.js');
    supabaseUrl = ENV.SUPABASE_URL;
    supabaseKey = ENV.SUPABASE_KEY;
  } catch (error) {
    console.warn("Archivo env.js no encontrado, usando variables de entorno del sistema.");
  }
}

export const supabase = createClient(supabaseUrl, supabaseKey);