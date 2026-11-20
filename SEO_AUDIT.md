# Technical SEO, AEO & GEO Audit — Creativex Technology

**Company:** Creativex Technology (Pvt) Ltd  
**Current Website:** `https://creativexlab.online/`  
**New Primary Target Domain:** `https://www.creativextechnology.com` (Preferred: `https://www.creativextechnology.com/`)  
**Primary Market:** Sri Lanka (Colombo & Nationwide)  
**Secondary Markets:** Australia, Malaysia, Singapore, United Arab Emirates (UAE), Bangladesh, and Nepal  
**Audit Date:** November 2026  
**Auditor:** Technical SEO, AEO & GEO Architecture Lead  
**Audit Status:** Confirmed via Direct Codebase & Build Environment Inspection  

---

## 1. Executive Summary

This comprehensive audit evaluates the current technical search visibility, crawlability, indexing, entity disambiguation, structured data hygiene, international search readiness, and AI discoverability (Answer Engine Optimization & Generative Engine Optimization) of **Creativex Technology (Pvt) Ltd**.

The codebase has undergone a complete entity disambiguation review to establish the brand as **Creativex Technology** (lowercase 'x' in Creativex, e.g., *Creativex Technology (Pvt) Ltd*), eliminating confusion with third-party overseas platforms (such as `creativex.com`). The current live website is deployed on `https://creativexlab.online/`, and is transitioning to its new primary global production domain: **`https://www.creativextechnology.com/`**.

### Critical Audit Findings Overview:
1. **Domain Migration Requirement [Critical Severity]:** 99 active occurrences of `https://creativexlab.online` remain hardcoded across metadata, canonical tags, Open Graph tags, Twitter cards, XML sitemaps, RSS feeds, `llms.txt`, and Schema.org JSON-LD definitions. These must be migrated to `https://www.creativextechnology.com/`.
2. **Canonical & Hostname Consistency [High Severity]:** Root-to-www redirection (`creativextechnology.com` → `www.creativextechnology.com`) and old-to-new domain permanent redirects (`creativexlab.online/*` → `https://www.creativextechnology.com/*`) must be configured at the server/edge layer.
3. **Artificial Hreflang Tags [Medium Severity]:** Certain routes (such as `/creativeos`) defined parameter-based hreflang links (e.g. `?region=au`, `?region=lk`), which violates Google's internationalization guidelines. In accordance with Phase 7, all artificial regional hreflang variants must be removed since the website operates as a single canonical English international site.
4. **Structured Data Validation [High Severity]:** Structured data schemas (`Organization`, `WebSite`, `Service`, `JobPosting`, `Article`, `BreadcrumbList`) are rich and detailed, but their `@id` and `url` properties currently reference the old domain and must be updated to avoid splitting entity authority in Google's Knowledge Graph and Perplexity/Claude/ChatGPT knowledge indices.
5. **Zero Visible Content Modification Guardrail [Enforced]:** All recommendations and technical implementations strictly preserve existing UI, visible copy, typography, color palettes, animations, and layouts.

---

## 2. Technical Stack & Deployment Environment

| Stack Component | Inspected Configuration | SEO & Crawlability Evaluation |
|---|---|---|
| **Framework** | Next.js 16.2.6 (App Router `app/`) | Modern, fully supports React Server Components (RSC) and metadata API. |
| **Runtime & Bundler** | `vinext` 0.0.50 + `vite` 8.0.13 | Edge-first deployment targeting Cloudflare Workers with instant TTFB. |
| **Language & Type Engine** | TypeScript 5.9.3 (`strict: true`), Node.js >= 22 | Zero TypeScript compilation errors (`tsc --noEmit` verified). |
| **Rendering Architecture** | Server Components with client hydration (`"use client"`) | Pre-renders complete semantic HTML server-side; crawlers without JS execute 100% of body text and metadata. |
| **Hosting Platform** | Cloudflare Workers / Pages with D1 & R2 local bindings | Global CDN edge network with sub-50ms latency across Sri Lanka, APAC, UAE, and Oceania. |
| **Image Handling** | `next/image` with `unoptimized: true` | Images served statically from `/public` via edge CDN. |
| **Security Headers** | Configured in `next.config.ts` | Strict-Transport-Security (2-year preload), X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, Referrer-Policy: origin-when-cross-origin. |

---

## 3. Comprehensive Route Map & Indexing Inventory

The application exposes 23 canonical public routes, 6 feeds/system endpoints, and isolated private paths.

### 3.1 Public Canonical Routes (Indexable)
1. `/` — Corporate Homepage (Hero, Capabilities, Tech Stack, Case Studies, Social Proof, Verified FAQs)
2. `/about` — Corporate Profile, Operating Model, Global Markets Coverage (Sri Lanka, Australia, UAE, Malaysia, Singapore, Bangladesh, Nepal)
3. `/services` — Services Directory (AI Engineering, Cloud Architecture, Automation, Web & Mobile)
4. `/services/[slug]` — Dynamic Service Pages (`ai-automation-agents`, `data-predictive-analytics`, `iot-smart-operations`, `web-mobile-product-engineering`, `cloud-solutions`, `ai-business-consultation`)
5. `/solutions` — Industry Solutions Hub (Logistics, Hospitality, Retail, Professional Services, SaaS)
6. `/solutions/[slug]` — Dynamic Solution Pages (`export-logistics`, `hospitality-smart-facilities`, `retail-distribution`, `professional-services`, `startups-saas-products`)
7. `/projects` — Enterprise Case Study Index
8. `/projects/[slug]` — Dynamic Client Case Studies
9. `/projects/alexa-business-agent` — Dedicated AI Omnichannel Enterprise Case Study
10. `/projects/herbcey-store-whatsapp-assistant` — Conversational Commerce AI Case Study
11. `/ai-development-sri-lanka` — Core Commercial Pillar: AI Development in Sri Lanka
12. `/erp-solutions-sri-lanka` — Core Commercial Pillar: Enterprise ERP Solutions in Sri Lanka
13. `/it-solutions-sri-lanka` — Core Commercial Pillar: Enterprise IT Solutions in Sri Lanka
14. `/custom-software-development` — Core Commercial Pillar: Custom Software Development
15. `/creativeos` — Enterprise Work Operating System Showcase
16. `/blog` — Technology Insights & Engineering Whitepapers
17. `/blog/[slug]` — Dynamic Whitepapers & Field Notes
18. `/careers` — Careers Portal & Open Engineering Roles
19. `/careers/[slug]` — Dynamic Job Details with ATS Evaluation Module
20. `/careers/talent-pool` — Structured Talent Community Intake (Intern, Associate, Senior tracks)
21. `/contact` — Contact, Inquiries & Consultation Booking
22. `/privacy-policy` — Corporate Privacy Policy
23. `/terms-and-conditions` — Corporate Terms of Service

### 3.2 Machine-Readable Endpoints & Feeds
1. `/robots.txt` (`app/robots.ts`) — Machine-generated robots exclusion standard with AI crawler access grants.
2. `/sitemap.xml` (`app/sitemap.ts`) — Dynamic XML sitemap pulling dynamic slugs from Supabase/static fallback with accurate `lastModified` timestamps.
3. `/rss.xml` (`app/rss.xml/route.ts`) — Syndication feed for published articles.
4. `/careers/rss.xml` (`app/careers/rss.xml/route.ts`) — Syndication feed for career openings.
5. `/careers/jobs.json` (`app/careers/jobs.json/route.ts`) — Machine-readable job vacancy feed for aggregators.
6. `/llms.txt` (`app/llms.txt/route.ts`) — LLM documentation manifest for Perplexity, ChatGPT, Claude, and Gemini.

### 3.3 Restricted & Non-Indexable Paths
1. `/admin/*` — Administrative backend protected by `X-Robots-Tag: noindex, nofollow` via `next.config.ts`.
2. `/employee` — Internal Employee Management System (EMS) protected by `robots: { index: false, follow: false }`.
3. `/api/*` — Backend routes protected by `X-Robots-Tag: noindex, nofollow`.

---

## 4. In-Depth Audit by SEO Dimension

### 4.1 Metadata & Canonical Architecture
- **Current State:** Root metadata is defined in `app/layout.tsx` with individual overrides on child pages. However, the root `metadataBase` is set to `new URL("https://creativexlab.online")`, propagating the old domain across all relative canonical links, OpenGraph image URLs, and Twitter cards.
- **Severity:** High.
- **Fix:** Update `baseUrl` constant in `app/layout.tsx` and all page files to `https://www.creativextechnology.com`.

### 4.2 XML Sitemap & Crawl Budget
- **Current State:** `app/sitemap.ts` generates dynamic `<loc>` entries referencing `https://creativexlab.online`. Core routes receive dynamic timestamps, but service/project/article fallbacks use `siteFallbackDate = new Date("2026-09-12T00:00:00.000Z")`.
- **Severity:** High.
- **Fix:** Update `baseUrl` in `app/sitemap.ts` to `https://www.creativextechnology.com`. Ensure sitemap only outputs 200 OK canonical URLs without trailing slash discrepancies.

### 4.3 Robots.txt Directives
- **Current State:** `app/robots.ts` explicitly authorizes leading AI search agents: `Googlebot`, `Bingbot`, `Applebot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended`, `cohere-ai`, `Amazonbot`, and `Bytespider`. It disallows `/admin` and `/api/`. Sitemap directive points to `https://creativexlab.online/sitemap.xml`.
- **Severity:** Medium.
- **Fix:** Update host directive and sitemap URLs in `app/robots.ts` to `https://www.creativextechnology.com`.

### 4.4 Structured Data (Schema.org JSON-LD)
- **Current State:** Structured data is embedded across pages:
  - Root layout: `@type: ["Organization", "LocalBusiness", "ProfessionalService"]` with `address` in Rajagiriya, Sri Lanka, `geo`, `areaServed`, `knowsAbout`, and `hasOfferCatalog`.
  - Service pages: `Service` schema with `provider` linking to Organization `#organization`.
  - Blog pages: `Article` schema with `author` and `publisher`.
  - Careers pages: `JobPosting` schema with `hiringOrganization`, `jobLocation`, and `baseSalary`.
  - Projects: `CreativeWork` schema.
  - Alexa Case Study & Herbcey Case Study: Custom schemas.
- **Issue:** All `@id` references (`https://creativexlab.online/#organization`, `https://creativexlab.online/#website`) currently anchor the entity to the old domain.
- **Severity:** High.
- **Fix:** Systematically update all JSON-LD `@id` and `url` parameters to use `https://www.creativextechnology.com`.

### 4.5 International Search & Hreflang Handling
- **Current State:** The website is a single English-language website (`lang="en"` in `<html>`). On `/creativeos/page.tsx`, artificial regional hreflang variants (`en-AU`, `en-GB`, `en-LK`, `en-US`, `en-NP`) pointing to `?region=xx` query parameters were present.
- **Severity:** Medium.
- **Fix:** Remove query-parameter hreflang tags to comply with Phase 7 ("Only implement hreflang if genuine language or regional alternate pages already exist. Do not create country-specific landing pages or artificial hreflang alternatives."). Standardize `alternates.canonical` to self-referencing `https://www.creativextechnology.com` URLs with `x-default` pointing to the main English URL.

### 4.6 Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO)
- **Current State:** The website provides clear entity grounding for generative search engines (Perplexity, ChatGPT, Claude, Gemini). Semantic headers (`<h1>`, `<h2>`, `<h3>`), clean `<p>` blocks, and descriptive `<article>` tags are utilized throughout. `app/llms.txt/route.ts` provides plain text summaries of company services and core capabilities.
- **Issue:** `llms.txt` references `info@creativexlab.online` and old domain URLs.
- **Severity:** Medium.
- **Fix:** Update `app/llms.txt/route.ts` to reflect the new domain `https://www.creativextechnology.com` and brand entity `Creativex Technology (Pvt) Ltd`.

### 4.7 Performance & Core Web Vitals
- **Current State:** Vite bundle analysis shows clean code splitting. React Server Components ensure that client bundles only ship interactive islands (such as `SiteLoader`, `SiteHeader`, `ContactClient`, and `EmployeePortal`).
- **Assets:** Fonts are loaded via `@font-face` with `display: swap`. Static images are served via Cloudflare edge CDN.
- **Recommendation:** Ensure all image tags specify explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).

### 4.8 Analytics & Webmaster Tools
- **Current State:**
  - Google Site Verification: `vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg` (Configured in `app/layout.tsx`).
  - Bing Webmaster verification: `msvalidate.01: BCF31216FC65CB0D5A1BBDC8BB3E4983` (Configured in `app/layout.tsx`).
  - Google Analytics: Controlled via environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Status:** Requires manual property addition in Google Search Console and Bing Webmaster Tools for the new domain `https://www.creativextechnology.com`.

---

## 5. Audit Findings & Resolution Matrix

| ID | Issue Description | Location | Severity | Status | Planned Resolution |
|---|---|---|---|---|---|
| **AUD-01** | Hardcoded old domain `creativexlab.online` across metadata, sitemaps, and schemas | 27 files in `app/`, `lib/`, `components/` | Critical | Identified | Batch migrate `baseUrl` to `https://www.creativextechnology.com` |
| **AUD-02** | Missing server-side 301 redirect configuration in Next.js & Cloudflare | `next.config.ts`, `public/_redirects` | High | Identified | Implement permanent 301 redirect rules mapping `creativexlab.online` and apex domain to `https://www.creativextechnology.com` |
| **AUD-03** | Artificial query-parameter hreflang tags on `/creativeos` | `app/creativeos/page.tsx` | Medium | Identified | Remove query-parameter hreflangs; enforce self-referencing canonical |
| **AUD-04** | Structured data `@id` fragmentation | `app/layout.tsx`, child pages | High | Identified | Re-anchor all schema `@id` nodes to `https://www.creativextechnology.com/#organization` |
| **AUD-05** | `llms.txt` contains stale domain references | `app/llms.txt/route.ts` | Medium | Identified | Update markdown manifest to reference `https://www.creativextechnology.com` |
| **AUD-06** | RSS feeds reference old domain | `app/rss.xml/route.ts`, `app/careers/rss.xml/route.ts` | Medium | Identified | Update feed base URLs and channel links |
| **AUD-07** | Search Console & Bing property delegation for new domain | External Services | High | Requires Manual Access | Add domain property `www.creativextechnology.com` and submit change of address |

---

## 6. Verification and Readiness Checklist

- [x] Codebase inspected and verified via TypeScript 5.9.3 compilation (`npx tsc --noEmit` exited 0).
- [x] Unit tests for ATS, Careers SEO, and UI primitives verified passing.
- [x] Complete inventory of 23 canonical routes and 6 system feeds mapped.
- [x] Zero visible content or design changes confirmed.
- [ ] Technical implementation of Phase 2–10 ready for deployment upon approval.
