# Domain Migration Plan — Creativex Technology
**Company:** Creativex Technology (Pvt) Ltd  
**Old Domain (Origin):** `https://creativexlab.online`  
**New Primary Production Domain:** `https://www.creativextechnology.com`  
**Migration Type:** Full permanent domain migration with path preservation  
**Migration Date Implemented:** November 2026  
**Status:** Code changes implemented — Requires Cloudflare & DNS deployment to go live.

---

## 1. Migration Summary

This document defines the complete domain migration plan from the legacy `creativexlab.online` domain to the new primary production domain `https://www.creativextechnology.com`, in accordance with Google's domain migration guidelines and the Creativex Technology SEO, AEO & GEO Technical Optimisation project.

### Migration Principles
1. **Path Preservation:** Every URL path is preserved exactly. No URLs are consolidated into the homepage.
2. **Permanent 301 Redirects:** All old-domain URLs return HTTP 301 (permanent) status codes to signal link equity transfer to Googlebot and all other crawlers.
3. **No Content Loss:** The old domain remains live and active while the redirects are verified, before decommissioning.
4. **Entity Continuity:** All Schema.org JSON-LD `@id` entity anchors are updated from `https://creativexlab.online/#organization` to `https://www.creativextechnology.com/#organization` to maintain Knowledge Graph entity consistency.

---

## 2. URL Redirect Inventory

See companion file `URL_REDIRECT_MAPPING.csv` for the full 1-to-1 mapping (38 unique URL paths).

| Source Pattern | Target Pattern | Status Code |
|---|---|---|
| `https://creativexlab.online/*` | `https://www.creativextechnology.com/*` | 301 |
| `https://www.creativexlab.online/*` | `https://www.creativextechnology.com/*` | 301 |
| `https://creativextechnology.com/*` | `https://www.creativextechnology.com/*` | 301 |

---

## 3. Code Changes Implemented

### 3.1 Next.js Application (`next.config.ts`)
Added `async redirects()` configuration with three redirect rules:
1. **Apex-to-www (new domain):** `creativextechnology.com/:path*` → `https://www.creativextechnology.com/:path*` (301)
2. **Old domain redirect:** `creativexlab.online/:path*` → `https://www.creativextechnology.com/:path*` (301)
3. **Old domain www redirect:** `www.creativexlab.online/:path*` → `https://www.creativextechnology.com/:path*` (301)

> **Note:** Next.js hostname-based redirects using `has: [{ type: "host" }]` require the application to be reachable on the source hostname. For cross-domain redirects from `creativexlab.online` → `creativextechnology.com`, a Cloudflare-level redirect rule is also required.

### 3.2 Cloudflare Redirect Rules (`public/_redirects`)
Created `public/_redirects` file compatible with Cloudflare Pages. Contains:
```
https://creativextechnology.com/* https://www.creativextechnology.com/:splat 301
https://creativexlab.online/* https://www.creativextechnology.com/:splat 301
https://www.creativexlab.online/* https://www.creativextechnology.com/:splat 301
```

### 3.3 Base URL Migration (27 Source Files)
Updated `const baseUrl = "https://creativexlab.online"` to `const baseUrl = "https://www.creativextechnology.com"` across all public-facing metadata, sitemap, robot, and feed files.

Specifically updated:
- `app/layout.tsx` — Root metadata base, JSON-LD Organization, WebSite schemas
- `app/robots.ts` — Sitemap and host directives
- `app/sitemap.ts` — All `<loc>` entries
- `app/rss.xml/route.ts` — Feed channel links and item links
- `app/careers/rss.xml/route.ts` — Feed channel links and item links
- `app/llms.txt/route.ts` — LLM manifest URLs
- `lib/careers-seo.ts` — `CAREERS_BASE_URL` constant (used by careers pages)
- `components/contact-client.tsx` — ContactPage JSON-LD schema URL
- `components/project-detail-client.tsx` — Project JSON-LD baseUrl
- All 18 individual `app/*/page.tsx` files — Page-level metadata and JSON-LD
- `app/creativeos/page.tsx` — Also removed artificial query-parameter hreflang variants

### 3.4 Hardcoded URL Fixes (alexa-business-agent)
Updated two hardcoded non-dynamic URLs in `app/projects/alexa-business-agent/page.tsx`:
- `url: "https://creativexlab.online/projects/alexa-business-agent"` → new domain
- `creator: { "@id": "https://creativexlab.online/#organization" }` → new domain

### 3.5 Hreflang Cleanup (creativeos)
Removed artificial `?region=xx` query parameter hreflang variants in `app/creativeos/page.tsx` metadata `alternates.languages`. The page now has a single self-referencing canonical with no hreflang (correct for a single-language English website without genuine localized alternates).

### 3.6 Privacy Policy & Terms — Canonical URLs Updated; Legal Body Text Preserved
Updated `alternates.canonical` and `alternates.languages` sections in both legal pages to reference the new domain. The visible legal body text paragraphs that historically reference `https://creativexlab.online` have been **preserved unchanged** as they form part of the legal record of the company's online presence at the time of policy drafting.

---

## 4. Email Addresses — Not Changed

Per implementation requirement #9, all company email addresses remain unchanged:
- `info@creativexlab.online` — Primary company email (visible on website and in JSON-LD)
- `thimathi@creativexlab.online` — Supervisor credential
- `intern.bd@creativexlab.online` — Intern credential
- `supervisor.bd@creativexlab.online` — Supervisor BD credential

These will be updated once the new email service (`@creativextechnology.com`) has been configured, tested, and migrated.

---

## 5. Redirect Loop Prevention

The redirect architecture is designed to be loop-free:

| Request Domain | Next Stop | Final Destination |
|---|---|---|
| `www.creativextechnology.com` | (no redirect — serves content) | `www.creativextechnology.com` |
| `creativextechnology.com` | 301 → `www.creativextechnology.com` | `www.creativextechnology.com` |
| `creativexlab.online` | 301 → `www.creativextechnology.com` | `www.creativextechnology.com` |
| `www.creativexlab.online` | 301 → `www.creativextechnology.com` | `www.creativextechnology.com` |

Maximum redirect hops: **1**. No chains, no loops.

---

## 6. Required Manual Steps Before Going Live

> [!IMPORTANT]
> The following actions require Cloudflare account access and domain registrar access and cannot be automated via code changes.

### Step 1: DNS Configuration (New Domain `creativextechnology.com`)
In the Cloudflare DNS settings for `creativextechnology.com`:
1. Add a `CNAME` record: `www` → `[Cloudflare Pages / Workers deployment URL]` (or `A` record if using an IP).
2. Add a root `@` record: Either a Cloudflare CNAME Flattening record pointing to the same Pages deployment, or a redirect rule at Cloudflare account level that sends `creativextechnology.com/*` → `https://www.creativextechnology.com/*`.
3. Ensure HTTPS is enforced (Cloudflare SSL/TLS mode: Full or Full (Strict)).

### Step 2: Cloudflare Redirect Rule for Old Domain (`creativexlab.online`)
In the Cloudflare dashboard for the `creativexlab.online` zone:
1. Navigate to **Rules → Redirect Rules**.
2. Create a new redirect rule:
   - **Match:** Hostname `creativexlab.online` or `www.creativexlab.online`
   - **Action:** Redirect to `https://www.creativextechnology.com` + URI Path (dynamic, preserve path)
   - **Status code:** 301

> This is required because cross-domain hostname redirects in `next.config.ts` only work when the application is deployed on the source hostname. Since `creativexlab.online` is a separate domain, the redirect must happen at the Cloudflare edge layer.

### Step 3: Custom Domain on Cloudflare Workers / Pages
If the application is deployed on Cloudflare Workers / Pages:
1. Go to **Workers & Pages → [Your Project] → Custom Domains**.
2. Add `www.creativextechnology.com` as a custom domain.
3. Ensure the SSL certificate is issued and active.
4. Optionally add `creativextechnology.com` and configure a Cloudflare Redirect Rule to forward to `www`.

### Step 4: Google Search Console — Change of Address
1. Verify ownership of `https://www.creativextechnology.com` in Google Search Console.
2. Submit XML sitemap at `https://www.creativextechnology.com/sitemap.xml`.
3. Use the **Change of Address** tool under Settings to notify Google of the domain migration from `https://creativexlab.online` to `https://www.creativextechnology.com`.

### Step 5: Bing Webmaster Tools
1. Add and verify `https://www.creativextechnology.com`.
2. Submit sitemap.
3. Update any crawl configuration.

---

## 7. Post-Migration Validation Checklist

After the Cloudflare and DNS changes are deployed:

- [ ] `curl -I https://creativexlab.online/` returns `HTTP/2 301` with `Location: https://www.creativextechnology.com/`
- [ ] `curl -I https://creativextechnology.com/` returns `HTTP/2 301` with `Location: https://www.creativextechnology.com/`
- [ ] `curl -I https://www.creativextechnology.com/` returns `HTTP/2 200`
- [ ] `curl -I https://creativexlab.online/about` returns `HTTP/2 301` with `Location: https://www.creativextechnology.com/about`
- [ ] `curl -I https://www.creativextechnology.com/sitemap.xml` returns valid XML
- [ ] `curl -I https://www.creativextechnology.com/robots.txt` shows `Host: https://www.creativextechnology.com`
- [ ] Google Search Console Change of Address submitted
- [ ] New XML sitemap submitted to Google Search Console
- [ ] New XML sitemap submitted to Bing Webmaster Tools
- [ ] No redirect loops detected (max 1 hop from any source)
