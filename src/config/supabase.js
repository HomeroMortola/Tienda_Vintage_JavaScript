// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // Esto lee tu archivo .env automáticamente en local

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Faltan las credenciales de Supabase en el entorno.");
}

// Exportamos una única instancia (Patrón Singleton)
export const supabase = createClient(supabaseUrl, supabaseKey);