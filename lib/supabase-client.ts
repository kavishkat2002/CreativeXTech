"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ─── Internal state ───────────────────────────────────────────────────────────

let _client: SupabaseClient | null = null;
let _isPlaceholder = true;
let _resolvePromise: Promise<SupabaseClient> | null = null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makePlaceholder(): SupabaseClient {
  return createClient(
    "https://placeholder.supabase.co",
    "placeholder-key-this-will-not-work"
  );
}

function buildRealClient(url: string, key: string): SupabaseClient {
  _isPlaceholder = false;
  return createClient(url, key);
}

// ─── Eager build-time init (works in local dev where env vars are inlined) ────

const _buildUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const _buildKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (_buildUrl && _buildKey) {
  _client = buildRealClient(_buildUrl, _buildKey);
}

// ─── Async resolver (fetches credentials from Worker at runtime) ──────────────

/**
 * Always returns a real SupabaseClient with live credentials.
 * On the first call it fetches /_env/supabase from the Worker to get the
 * Supabase URL & key when they were not inlined at build time.
 *
 * Use this everywhere instead of `supabaseBrowserClient` to guarantee
 * that storage uploads, inserts and queries always work on the live site.
 */
export async function getSupabaseClient(): Promise<SupabaseClient> {
  // Already have a real client — return immediately
  if (_client && !_isPlaceholder) return _client;

  // Deduplicate concurrent calls
  if (_resolvePromise) return _resolvePromise;

  _resolvePromise = (async () => {
    try {
      const res = await fetch("/_env/supabase", { cache: "no-store" });
      if (res.ok) {
        const { url, key } = (await res.json()) as { url: string; key: string };
        if (url && key) {
          _client = buildRealClient(url, key);
          return _client;
        }
      }
    } catch {
      // silently fall through to placeholder
    }
    _client = makePlaceholder();
    return _client;
  })();

  const result = await _resolvePromise;
  _resolvePromise = null; // allow retry on next call if it returned a placeholder
  return result;
}

// ─── Synchronous proxy ────────────────────────────────────────────────────────
//
// `supabaseBrowserClient` is kept for backwards compatibility.
// It is a JS Proxy that forwards every property access to the underlying
// client.  On the first access it checks whether a real client is already
// resolved; if not it kicks off `getSupabaseClient()` in the background
// so that by the time user code awaits any method the client is ready.
//
// NOTE: For storage / insert / update always await `getSupabaseClient()`
// directly so credentials are guaranteed to be loaded before the call.

function getUnderlying(): SupabaseClient {
  if (_client && !_isPlaceholder) return _client;
  // Kick off resolution in background (non-blocking)
  getSupabaseClient().catch(() => {});
  return _client ?? makePlaceholder();
}

export const supabaseBrowserClient = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const underlying = getUnderlying();
    const value = (underlying as any)[prop];
    return typeof value === "function" ? value.bind(underlying) : value;
  },
});
