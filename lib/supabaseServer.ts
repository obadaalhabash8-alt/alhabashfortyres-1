import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazily create the admin client so it only initializes at request time (not build time)
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Missing Supabase server env vars')
    _admin = createClient(url, key)
  }
  return _admin
}

// Convenience alias — server-side only, never expose client-side
export const supabaseAdmin = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseAdmin().from(...args),
}
