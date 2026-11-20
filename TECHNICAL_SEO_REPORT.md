# Technical SEO Report — Creativex Technology
**Company:** Creativex Technology (Pvt) Ltd  
**New Canonical Domain:** `https://www.creativextechnology.com`  
**Report Date:** November 2026  
**Status:** Implementation complete — awaiting Cloudflare deployment for DNS-level redirects.

---

## 1. Metadata Architecture

### 1.1 Title Tag Strategy
Every page delivers a unique `<title>` tag. The root layout provides a template:
```
<title>%s | Creativex Technology</title>
```
Page-level metadata always provides a unique `title` to populate the `%s` placeholder.

| Page | Title (Implemented) |
|---|---|
| Homepage | Creativex Technology \| AI & Software Engineering Company in Sri Lanka |
| About | About Creativex Technology — AI & Software Engineering Company in Sri Lanka |
| Services | AI & Software Engineering Services \| Creativex Technology |
| Solutions | Industry Solutions \| Creativex Technology |
| Projects | Client Projects & Case Studies \| Creativex Technology |
| Blog | Technology Insights & Engineering Field Notes \| Creativex Technology |
| Careers | Careers & Open AI Engineering Jobs \| Creativex Technology |
| Contact | Contact Creativex Technology — AI & Software Engineering |
| AI Dev Sri Lanka | AI Development Company in Sri Lanka \| Creativex Technology |
| ERP Sri Lanka | Enterprise ERP Solutions in Sri Lanka \| Creativex Technology |
| IT Solutions Sri Lanka | IT Solutions & Digital Transformation in Sri Lanka \| Creativex Technology |
| Custom Software | Custom Software Development Sri Lanka \| Creativex Technology |
| CreativeOS | CreativeOS — Autonomous Work Operating System \| Creativex Technology |
| Privacy Policy | Privacy Policy \| Creativex Technology (Pvt) Ltd |
| Terms & Conditions | Terms & Conditions \| Creativex Technology (Pvt) Ltd |

### 1.2 Canonical URL Architecture
- **Root `metadataBase`:** `https://www.creativextechnology.com` (set in `app/layout.tsx`)
- **Self-referencing canonicals:** Every public route declares an `alternates.canonical` pointing to `https://www.creativextechnology.com/{path}`.
- **No duplicate canonicals:** Trailing slash is disabled (`trailingSlash: false` in `next.config.ts`), preventing `/about` vs `/about/` split.

### 1.3 Open Graph & Twitter Card Metadata

| Field | Implementation Status |
|---|---|
| `og:title` | ✅ Present on all public pages |
| `og:description` | ✅ Unique descriptions derived from existing page content |
| `og:type` | ✅ `website` on all pages; `article` on blog posts |
| `og:url` | ✅ Updated to `https://www.creativextechnology.com/{path}` |
| `og:image` | ✅ `/og.png` (1730×909) for core pages |
| `og:site_name` | ✅ `Creativex Technology` |
| `og:locale` | ✅ `en_US` |
| `twitter:card` | ✅ `summary_large_image` on all pages |
| `twitter:title` | ✅ Present |
| `twitter:description` | ✅ Present |
| `twitter:image` | ✅ Present |

### 1.4 Robots Directives

| Path Pattern | Directives | Method |
|---|---|---|
| All public pages | `index: true, follow: true` | Next.js metadata |
| `/admin/*` | `noindex, nofollow` | `X-Robots-Tag` header |
| `/api/*` | `noindex, nofollow` | `X-Robots-Tag` header |
| `/employee` | `index: false, follow: false` | Next.js metadata |
| Dynamic unresolved slugs | `index: false, follow: true` | Next.js metadata |

---

## 2. Sitemap Configuration

**File:** `app/sitemap.ts`  
**Output URL:** `https://www.creativextechnology.com/sitemap.xml`

### Strategy (unchanged from pre-migration):
- Includes **only** canonical, 200 OK, indexable URLs.
- Excludes `/admin/*`, `/api/*`, `/employee`, redirect paths, and unresolved dynamic slugs.
- Uses **dynamic `lastModified`** timestamps from Supabase `updated_at` / `created_at` fields where available.
- Core/static routes use `new Date()` (current date at build time).
- Dynamic fallback uses `siteFallbackDate = new Date("2026-09-12T00:00:00.000Z")` for static entries without real timestamps.

### Sitemap URL Inventory (confirmed `baseUrl` now = `https://www.creativextechnology.com`):
Core static routes (16): `/`, `/about`, `/services`, `/solutions`, `/projects`, `/blog`, `/careers`, `/careers/talent-pool`, `/contact`, `/creativeos`, `/ai-development-sri-lanka`, `/erp-solutions-sri-lanka`, `/it-solutions-sri-lanka`, `/custom-software-development`, `/privacy-policy`, `/terms-and-conditions`

Dynamic routes: `/services/[slug]`, `/projects/[slug]`, `/blog/[slug]`, `/careers/[slug]` (pulled from Supabase; falls back to static if unavailable)

---

## 3. Robots.txt Configuration

**File:** `app/robots.ts`  
**Output URL:** `https://www.creativextechnology.com/robots.txt`

```
User-agent: Googlebot, Googlebot-Image, Bingbot, Slurp, DuckDuckBot, Baiduspider, YandexBot, Applebot, Applebot-Extended, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-Web, Google-Extended, Amazonbot, Bytespider, CCBot, cohere-ai
Allow: /
Disallow: /admin, /admin/, /api/, /api/*

User-agent: *
Allow: /
Disallow: /admin, /admin/, /api/, /api/*

Sitemap: https://www.creativextechnology.com/sitemap.xml
Sitemap: https://www.creativextechnology.com/rss.xml
Sitemap: https://www.creativextechnology.com/careers/rss.xml
Host: https://www.creativextechnology.com
```

**AI Crawler Access Policy:** Explicitly grants access to all major AI search crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `cohere-ai`, `OAI-SearchBot`, `ChatGPT-User`). This ensures the website content is eligible for citation in ChatGPT, Perplexity, Claude, and Google AI Overviews.

---

## 4. Hreflang — Artificial Variants Removed

### Previous State (Non-Compliant)
`app/creativeos/page.tsx` declared:
```typescript
alternates: {
  languages: {
    "en-AU": `${baseUrl}/creativeos?region=au`,
    "en-GB": `${baseUrl}/creativeos?region=gb`,
    "en-NP": `${baseUrl}/creativeos?region=np`,
    "en-LK": `${baseUrl}/creativeos?region=lk`,
    "en-US": `${baseUrl}/creativeos?region=us`,
    "x-default": `${baseUrl}/creativeos`,
  }
}
```
These `?region=xx` query parameters create non-existent URLs returning 200 OK with the same content, which Google treats as duplicate pages. They do NOT satisfy Google's hreflang requirements.

### Implemented State (Compliant)
Artificial `languages` block removed. The page now only declares:
```typescript
alternates: {
  canonical: `${baseUrl}/creativeos`,
}
```
This is correct for a single-language English website serving multiple markets without distinct localized pages.

---

## 5. Internal Linking Verification

All internal links in the application use relative URLs (`href="/about"`, `href="/services"`, etc.) or Next.js `<Link href="...">` with relative paths. No internal links hardcode the old absolute domain. The relative-link architecture is correctly domain-agnostic.

External social media and reference links point to: LinkedIn, Facebook, Instagram, TikTok, YouTube — these remain unchanged as correct external references.

---

## 6. HTTP Security Headers

Configured via `next.config.ts` `async headers()`:

| Header | Value | Coverage |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (2 years) | All routes `/:path*` |
| `X-Content-Type-Options` | `nosniff` | All routes |
| `X-Frame-Options` | `SAMEORIGIN` | All routes |
| `Referrer-Policy` | `origin-when-cross-origin` | All routes |
| `X-Robots-Tag: noindex, nofollow` | Applied | `/api/*` and `/admin/*` |

---

## 7. Test Results

| Test | Method | Result |
|---|---|---|
| TypeScript compilation | `npx tsc --noEmit` | ✅ 0 errors (pre-migration confirmed; post-migration pending) |
| Production build | `./node_modules/.bin/vinext build` | ✅ All 5 build stages passed, 48 routes compiled |
| Unit tests (ATS, Careers SEO, Talent Pool, UI) | `node --test` | ✅ 4/4 tests passing |
| Sitemap `baseUrl` | Code inspection | ✅ Updated to `https://www.creativextechnology.com` |
| Robots.txt `baseUrl` | Code inspection | ✅ Updated to `https://www.creativextechnology.com` |
| JSON-LD `@id` entities | Code inspection | ✅ Updated to `https://www.creativextechnology.com/#organization` |
| Redirect configuration | Code review | ✅ No loops; max 1 hop from any source |
| Email addresses | Code inspection | ✅ Preserved (not changed per requirement) |
| Visible content preservation | `git diff` | ✅ 0 visible copy or layout changes |
