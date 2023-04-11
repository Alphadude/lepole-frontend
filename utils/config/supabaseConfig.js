import { createClient } from '@supabase/supabase-js'

const url = process.env.REACT_APP_SUPABASE_URL
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY


// Create a single supabase client for interacting with your database
const supabase = createClient(url, anonKey)

export { supabase }