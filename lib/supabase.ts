/**
 * Lightweight Supabase REST API helpers for Cloudflare Workers.
 *
 * The @supabase/supabase-js client conflicts with Miniflare's patched fetch
 * in local dev. Using plain fetch() with the PostgREST REST API is the most
 * reliable approach in a Cloudflare Workers / vinext environment.
 */

// These are inlined at build time by Vite/Next when available.
// On Cloudflare Workers they may be empty — we fall back to the
// runtime /_env/supabase endpoint exposed by worker/index.ts.
let _SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
let _SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
let _envFetched = false;

async function resolveEnv(): Promise<{ url: string; key: string }> {
  if ((_SUPABASE_URL && _SUPABASE_ANON_KEY) || _envFetched) {
    return { url: _SUPABASE_URL, key: _SUPABASE_ANON_KEY };
  }
  try {
    const res = await fetch("/_env/supabase", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json() as { url: string; key: string };
      if (json.url && json.key) {
        _SUPABASE_URL = json.url;
        _SUPABASE_ANON_KEY = json.key;
      }
    }
  } catch {
    // ignore — will return empty strings and caller handles it
  }
  _envFetched = true;
  return { url: _SUPABASE_URL, key: _SUPABASE_ANON_KEY };
}

if (!_SUPABASE_URL || !_SUPABASE_ANON_KEY) {
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Will attempt to resolve from /_env/supabase at runtime."
  );
}

/** Standard headers for all Supabase REST requests. */
function makeHeaders(key: string, extra?: Record<string, string>): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
    ...extra,
  };
}

/** GET rows from a table with optional PostgREST query params. */
export async function supabaseSelect<T = unknown>(
  table: string,
  params?: Record<string, string>
): Promise<T[]> {
  const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = await resolveEnv();
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set("select", "*");
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: makeHeaders(SUPABASE_ANON_KEY, { Prefer: "return=representation" }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[supabase] GET ${table} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T[]>;
}

/** INSERT a single row into a table. Returns the error message or null on success. */
export async function supabaseInsert(
  table: string,
  row: Record<string, unknown>
): Promise<string | null> {
  const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = await resolveEnv();
  const url = `${SUPABASE_URL}/rest/v1/${table}`;

  const res = await fetch(url, {
    method: "POST",
    headers: makeHeaders(SUPABASE_ANON_KEY),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return `Supabase insert failed (${res.status}): ${text}`;
  }

  return null;
}

/** UPDATE a single row in a table by column matching. Returns error message or null. */
export async function supabaseUpdate(
  table: string,
  matchColumn: string,
  matchValue: string,
  row: Record<string, unknown>
): Promise<string | null> {
  const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = await resolveEnv();
  const url = `${SUPABASE_URL}/rest/v1/${table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: makeHeaders(SUPABASE_ANON_KEY),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return `Supabase update failed (${res.status}): ${text}`;
  }

  return null;
}

/** DELETE a single row in a table by column matching. Returns error message or null. */
export async function supabaseDelete(
  table: string,
  matchColumn: string,
  matchValue: string
): Promise<string | null> {
  const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = await resolveEnv();
  const url = `${SUPABASE_URL}/rest/v1/${table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: makeHeaders(SUPABASE_ANON_KEY),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return `Supabase delete failed (${res.status}): ${text}`;
  }

  return null;
}

/** UPLOAD media to Supabase Storage and return the public URL. */
export async function supabaseUploadMedia(
  bucket: string,
  path: string,
  file: File
): Promise<{ url?: string; error?: string }> {
  const { url: SUPABASE_URL, key: SUPABASE_ANON_KEY } = await resolveEnv();
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { error: `Supabase upload failed (${res.status}): ${text}` };
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  return { url: publicUrl };
}
