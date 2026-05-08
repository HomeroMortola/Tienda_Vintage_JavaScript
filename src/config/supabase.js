import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_KEY;

// 2. Si no existen (estás en local), intentamos importar tu env.js
if (!supabaseUrl || !supabaseKey) {
    try {
        // La importación dinámica solo ocurre si las variables de arriba fallan
        const module = await import('../../env.js');
        supabaseUrl = module.ENV.SUPABASE_URL;
        supabaseKey = module.ENV.SUPABASE_KEY;
    } catch (e) {
        console.error("No se encontraron variables de entorno ni archivo env.js local.");
    }
}

export const supabase = createClient(supabaseUrl, supabaseKey);