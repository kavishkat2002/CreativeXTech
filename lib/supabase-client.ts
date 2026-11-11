"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { staticArticles } from "./articles";
import { services } from "./services";
import { staticSolutions } from "./solutions";
import { staticProjects, isExplicitlyHiddenProject } from "./projects";
import { staticJobs } from "./careers";

// ─── Configuration check ──────────────────────────────────────────────────────

function isRealSupabaseConfig(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  if (url.includes("placeholder") || key.includes("placeholder")) return false;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
  return true;
}

// ─── Internal state ───────────────────────────────────────────────────────────

let _client: SupabaseClient | null = null;
let _isPlaceholder = true;
let _resolvePromise: Promise<SupabaseClient> | null = null;

export function isLocalAdminMode(): boolean {
  return _isPlaceholder;
}

// ─── Local / Mock Supabase Client ─────────────────────────────────────────────

function makeMockClient(): SupabaseClient {
  const authListeners = new Set<(event: string, session: any) => void>();

  const getStorageKey = (table: string) => `creativex_db_${table}`;

  const getTableData = (table: string): any[] => {
    if (typeof window === "undefined") {
      if (table === "articles") return staticArticles;
      if (table === "services") return services;
      if (table === "solutions") return staticSolutions;
      if (table === "projects") return staticProjects;
      if (table === "jobs") return staticJobs;
      return [];
    }

    let staticList: any[] = [];
    if (table === "articles") staticList = staticArticles;
    else if (table === "services") staticList = services;
    else if (table === "solutions") staticList = staticSolutions;
    else if (table === "projects") staticList = staticProjects;
    else if (table === "jobs") staticList = staticJobs;

    try {
      const stored = localStorage.getItem(getStorageKey(table));
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && staticList.length > 0) {
          if (table === "projects") {
            const thimathiProject = staticProjects.find((p) => p.slug === "thimathi-dissanayake-portfolio");
            if (thimathiProject) {
              parsed = parsed.map((item: any) => {
                if (
                  item?.slug === "ai-engineer-personal-portfolio" ||
                  item?.slug === "personal-portfolio" ||
                  item?.title === "AI Engineer Personal Portfolio"
                ) {
                  return { ...thimathiProject, id: item.id || thimathiProject.slug };
                }
                return item;
              });
            }
            parsed = parsed.map((item: any) => {
              if (isExplicitlyHiddenProject(item)) {
                return { ...item, published: false, is_published: false };
              }
              return item;
            });
          }
          const existingSlugs = new Set(parsed.map((item: any) => item?.slug || item?.id));
          if (table === "jobs") {
            const bdStatic = staticJobs.find((j) => j.slug === "business-development-intern");
            if (bdStatic) {
              parsed = parsed.map((item: any) =>
                item?.slug === "business-development-intern" &&
                item?.salary_range === "LKR 25,000 – 50,000 + Performance Commission"
                  ? { ...item, salary_range: bdStatic.salary_range, benefits: bdStatic.benefits }
                  : item
              );
            }
          }
          const missing = staticList.filter((item) => !existingSlugs.has(item.slug || item.id));
          if (missing.length > 0) {
            parsed = [...parsed, ...missing];
            localStorage.setItem(getStorageKey(table), JSON.stringify(parsed));
          }
        }
        return parsed;
      }
    } catch {}

    let initial: any[] = [...staticList];

    try {
      localStorage.setItem(getStorageKey(table), JSON.stringify(initial));
    } catch {}
    return initial;
  };

  const saveTableData = (table: string, data: any[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(getStorageKey(table), JSON.stringify(data));
    } catch {}
  };

  const queryBuilder = (table: string) => {
    let filters: Array<(item: any) => boolean> = [];
    let sortFn: ((a: any, b: any) => number) | null = null;
    let limitCount: number | null = null;
    let isSingle = false;
    let mutationOp: (() => any) | null = null;

    const execute = () => {
      if (mutationOp) {
        return mutationOp();
      }
      let rows = [...getTableData(table)];
      for (const filter of filters) {
        rows = rows.filter(filter);
      }
      if (sortFn) {
        rows.sort(sortFn);
      }
      if (limitCount !== null) {
        rows = rows.slice(0, limitCount);
      }
      if (isSingle) {
        return { data: rows[0] || null, error: null };
      }
      return { data: rows, error: null };
    };

    const builder: any = {
      select(_columns = "*") {
        return builder;
      },
      order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
        sortFn = (a: any, b: any) => {
          const valA = a?.[column];
          const valB = b?.[column];
          if (valA === valB) return 0;
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        };
        return builder;
      },
      eq(column: string, value: any) {
        filters.push((item: any) => String(item?.[column]) === String(value));
        return builder;
      },
      neq(column: string, value: any) {
        filters.push((item: any) => String(item?.[column]) !== String(value));
        return builder;
      },
      ilike(column: string, value: string) {
        filters.push((item: any) => {
          const itemVal = String(item?.[column] ?? "").toLowerCase();
          const targetVal = String(value).toLowerCase();
          return itemVal === targetVal;
        });
        return builder;
      },
      like(column: string, value: string) {
        filters.push((item: any) => {
          const itemVal = String(item?.[column] ?? "");
          const targetVal = String(value);
          return itemVal === targetVal;
        });
        return builder;
      },
      limit(count: number) {
        limitCount = count;
        return builder;
      },
      single() {
        isSingle = true;
        return builder;
      },
      insert(rowsToInsert: any[]) {
        mutationOp = () => {
          const current = getTableData(table);
          const newRows = (rowsToInsert || []).map((r, i) => ({
            id: r?.id || `${table}-${Date.now()}-${i}`,
            created_at: r?.created_at || new Date().toISOString(),
            ...r,
          }));
          const updated = [...current, ...newRows];
          saveTableData(table, updated);
          return { data: newRows, error: null };
        };
        return builder;
      },
      update(updates: any) {
        mutationOp = () => {
          let current = getTableData(table);
          current = current.map((row) => {
            const matches = filters.every((fn) => fn(row));
            if (matches) {
              return { ...row, ...updates, updated_at: new Date().toISOString() };
            }
            return row;
          });
          saveTableData(table, current);
          return { data: updates, error: null };
        };
        return builder;
      },
      delete() {
        mutationOp = () => {
          let current = getTableData(table);
          const remaining = current.filter((row) => !filters.every((fn) => fn(row)));
          saveTableData(table, remaining);
          return { data: null, error: null };
        };
        return builder;
      },
      then(onfulfilled?: (val: any) => any, onrejected?: (err: any) => any) {
        try {
          const result = execute();
          return Promise.resolve(result).then(onfulfilled, onrejected);
        } catch (err) {
          return Promise.reject(err).catch(onrejected);
        }
      },
    };

    return builder;
  };

  const mockClient: any = {
    auth: {
      async getSession() {
        if (typeof window === "undefined") return { data: { session: null }, error: null };
        try {
          const raw = localStorage.getItem("creativex_admin_session");
          return { data: { session: raw ? JSON.parse(raw) : null }, error: null };
        } catch {
          return { data: { session: null }, error: null };
        }
      },
      async getUser() {
        const { data } = await mockClient.auth.getSession();
        return { data: { user: data.session?.user || null }, error: null };
      },
      onAuthStateChange(callback: (event: string, session: any) => void) {
        authListeners.add(callback);
        return {
          data: {
            subscription: {
              unsubscribe: () => authListeners.delete(callback),
            },
          },
        };
      },
      async signInWithPassword({ email, password }: { email: string; password?: string }) {
        if (!email) {
          return { data: { session: null, user: null }, error: new Error("Email is required.") };
        }
        const session = {
          access_token: "mock-local-token-" + Date.now(),
          token_type: "bearer",
          expires_in: 86400,
          user: {
            id: "local-admin-" + Date.now(),
            email,
            aud: "authenticated",
            role: "authenticated",
            user_metadata: { name: "Admin" },
          },
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("creativex_admin_session", JSON.stringify(session));
        }
        authListeners.forEach((cb) => cb("SIGNED_IN", session));
        return { data: { session, user: session.user }, error: null };
      },
      async signOut() {
        if (typeof window !== "undefined") {
          localStorage.removeItem("creativex_admin_session");
        }
        authListeners.forEach((cb) => cb("SIGNED_OUT", null));
        return { error: null };
      },
    },
    storage: {
      from(bucket: string) {
        return {
          async upload(filePath: string, file: File) {
            let publicUrl = "";
            if (typeof window !== "undefined" && file) {
              try {
                if (file.type?.startsWith("image/") && file.size <= 2 * 1024 * 1024) {
                  publicUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
                    reader.onerror = () => resolve("");
                    reader.readAsDataURL(file);
                  });
                }
                if (!publicUrl) {
                  publicUrl = URL.createObjectURL(file);
                }
                try {
                  localStorage.setItem(`creativex_file_${bucket}_${filePath}`, publicUrl);
                } catch {
                  sessionStorage.setItem(`file_${bucket}_${filePath}`, publicUrl);
                }
              } catch {}
            }
            return { data: { path: filePath, publicUrl }, error: null };
          },
          getPublicUrl(filePath: string) {
            let publicUrl = "";
            if (typeof window !== "undefined") {
              publicUrl =
                localStorage.getItem(`creativex_file_${bucket}_${filePath}`) ||
                sessionStorage.getItem(`file_${bucket}_${filePath}`) ||
                "";
            }
            if (!publicUrl) {
              publicUrl = "/brand/character-render.png";
            }
            return { data: { publicUrl } };
          },
        };
      },
    },
    from(table: string) {
      return queryBuilder(table);
    },
  };

  return mockClient as SupabaseClient;
}

function buildRealClient(url: string, key: string): SupabaseClient {
  _isPlaceholder = false;
  return createClient(url, key);
}

// ─── Eager build-time init ────────────────────────────────────────────────────

const _buildUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const _buildKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (isRealSupabaseConfig(_buildUrl, _buildKey)) {
  _client = buildRealClient(_buildUrl, _buildKey);
}

// ─── Async resolver ───────────────────────────────────────────────────────────

export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (_client && !_isPlaceholder) return _client;

  if (_resolvePromise) return _resolvePromise;

  _resolvePromise = (async () => {
    try {
      const res = await fetch("/_env/supabase", { cache: "no-store" });
      if (res.ok) {
        const { url, key } = (await res.json()) as { url: string; key: string };
        if (isRealSupabaseConfig(url, key)) {
          _client = buildRealClient(url, key);
          return _client;
        }
      }
    } catch {
      // ignore
    }
    _client = makeMockClient();
    return _client;
  })();

  const result = await _resolvePromise;
  _resolvePromise = null;
  return result;
}

// ─── Synchronous proxy ────────────────────────────────────────────────────────

function getUnderlying(): SupabaseClient {
  if (_client && !_isPlaceholder) return _client;
  getSupabaseClient().catch(() => {});
  return _client ?? makeMockClient();
}

export const supabaseBrowserClient = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const underlying = getUnderlying();
    const value = (underlying as any)[prop];
    return typeof value === "function" ? value.bind(underlying) : value;
  },
});
