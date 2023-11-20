import { createClient } from '@supabase/supabase-js'

export type Database = {}

const supabaseeURL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseeURL, supabaseAnonKey)

export default supabase
