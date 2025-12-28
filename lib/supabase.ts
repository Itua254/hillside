import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for public access (client-side capable, restricted by RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
