/**
 * Lightweight Supabase REST API helpers for Cloudflare Workers.
 *
 * The @supabase/supabase-js client conflicts with Miniflare's patched fetch
 * in local dev. Using plain fetch() with the PostgREST REST API is the most
 * reliable approach in a Cloudflare Workers / vinext environment.
 */

// These NEXT_PUBLIC_ vars are inlined at build time by Vite, so they're
// available in both client and Worker (server) contexts.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Check your .env.local file."
  );
}

/** Standard headers for all Supabase REST requests. */
function headers(extra?: Record<string, string>): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return [];
  }

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set("select", "*");
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: headers({ Prefer: "return=representation" }),
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
  const url = `${SUPABASE_URL}/rest/v1/${table}`;

  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
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
  const url = `${SUPABASE_URL}/rest/v1/${table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: headers(),
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
  const url = `${SUPABASE_URL}/rest/v1/${table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: headers(),
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

  // If successful, return the public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  return { url: publicUrl };
}
