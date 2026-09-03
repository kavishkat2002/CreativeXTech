"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// These are inlined at build time when available (local dev).
// On Cloudflare Workers the runtime fetches them from /_env/supabase instead.
let _client: SupabaseClient | null = null;

let _isPlaceholder = true;

function makePlaceholder(): SupabaseClient {
  return createClient(
    "https://placeholder.supabase.co",
    "placeholder-key-this-will-not-work"
  );
}

function buildClient(url: string, key: string): SupabaseClient {
  if (!url || !key) return makePlaceholder();
  _isPlaceholder = false;
  return createClient(url, key);
}

// Eagerly try the build-time vars (works in local dev).
const buildUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const buildKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (buildUrl && buildKey) {
  _client = buildClient(buildUrl, buildKey);
}

/**
 * Returns a Supabase client, fetching runtime config from the Worker if
 * the build-time env vars were not inlined (Cloudflare Workers deployment).
 */
export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (_client && !_isPlaceholder) {
    return _client;
  }

  try {
    const res = await fetch("/_env/supabase", { cache: "no-store" });
    if (res.ok) {
      const { url, key } = await res.json() as { url: string; key: string };
      if (url && key) {
        _client = buildClient(url, key);
        return _client;
      }
    }
  } catch {
    // silently fall through to placeholder
  }

  _client = makePlaceholder();
  return _client;
}

/**
 * Synchronous placeholder — use getSupabaseClient() for reliable access.
 * This exists only for legacy call sites that need a sync reference.
 */
export const supabaseBrowserClient: SupabaseClient =
  _client ?? makePlaceholder();
