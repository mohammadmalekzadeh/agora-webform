import { createClient } from "@supabase/supabase-js";

// Service-role client — server-side only (API routes). Never import this
// into a "use client" component; it bypasses row-level security.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars are missing. Check .env.local");
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
