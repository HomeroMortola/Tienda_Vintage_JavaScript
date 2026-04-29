// src/config/supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zjxhoedilvqnfxbonyjh.supabase.co/"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeGhvZWRpbHZxbmZ4Ym9ueWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTcyOTksImV4cCI6MjA5MTkzMzI5OX0.0zb1nxwrXw7I_IV2xfr0ZNi6vmz1i7DZhptrPS3dQHo" // Reemplaza con tu clave real

if (!supabaseUrl || !supabaseKey) {
  console.error(" Error: SUPABASE_URL o SUPABASE_KEY no están definidas en el .env")
}

// Creamos el cliente oficial de conexión
export const supabase = createClient(supabaseUrl, supabaseKey)