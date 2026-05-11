import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zjxhoedilvqnfxbonyjh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeGhvZWRpbHZxbmZ4Ym9ueWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTcyOTksImV4cCI6MjA5MTkzMzI5OX0.0zb1nxwrXw7I_IV2xfr0ZNi6vmz1i7DZhptrPS3dQHo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);