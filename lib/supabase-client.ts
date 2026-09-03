"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// This client is safe to use in browser environments (Client Components).
// Do not use this in server components or API routes during local dev
// to avoid the Miniflare fetch conflict.
export const supabaseBrowserClient = createClient(supabaseUrl, supabaseAnonKey);
