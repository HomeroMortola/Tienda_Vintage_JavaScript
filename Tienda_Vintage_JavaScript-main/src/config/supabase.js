import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(" Error: SUPABASE_URL o SUPABASE_KEY no están definidas en el .env")
}

// Creamos el cliente oficial de conexión
export const supabase = createClient(supabaseUrl, supabaseKey)