import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const base = process.env.REACT_APP_SUPABASE_TOKEN;

export const supabase = createClient(url, base);
