import { supabaseSelect } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  media_url?: string;
};

export type ArticleReference = {
  label: string;
  href: string;
};

export type Article = {
  slug: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  sections: ArticleSection[];
  takeaways: string[];
  references: ArticleReference[];
  media_url?: string;
};

// ─── Database row → Article mapper ────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Article {
  return {
    slug: row.slug,
    number: row.number,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    publishedDate: row.published_date,
    updatedDate: row.updated_date,
    readTime: row.read_time,
    featured: row.featured ?? false,
    tags: row.tags ?? [],
    sections: row.sections ?? [],
    takeaways: row.takeaways ?? [],
    references: row.references ?? [],
    media_url: row.media_url,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all articles ordered by their display number. */
export async function getArticles(): Promise<Article[]> {
  try {
    const rows = await supabaseSelect("articles", { order: "number.asc" });
    return rows.map(mapRow);
  } catch (err) {
    console.error("[articles] Failed to fetch from Supabase:", err);
    return [];
  }
}

/** Fetch a single article by slug. Returns undefined if not found. */
export async function getArticle(slug: string): Promise<Article | undefined> {
  try {
    const rows = await supabaseSelect("articles", {
      slug: `eq.${slug}`,
      limit: "1",
    });
    if (!rows.length) return undefined;
    return mapRow(rows[0]);
  } catch (err) {
    console.error("[articles] Failed to fetch article:", err);
    return undefined;
  }
}

/** Fetch just the slugs — used for generateStaticParams. */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const rows = await supabaseSelect<{ slug: string }>("articles");
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
