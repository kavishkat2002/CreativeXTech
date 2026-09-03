"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// This client is safe to use in browser environments (Client Components).
// Do not use this in server components or API routes during local dev
// to avoid the Miniflare fetch conflict.
export const supabaseBrowserClient: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (createClient(
        "https://placeholder.supabase.co",
        "placeholder-key-this-will-not-work"
      ) as SupabaseClient);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase-client] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. " +
      "Add them to your Cloudflare Pages environment variables. Admin and data features will not work."
  );
}
