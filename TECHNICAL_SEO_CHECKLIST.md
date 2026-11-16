# Technical SEO & Quality Assurance Verification Checklist
**Company:** CreativeX Technology (Pvt) Ltd  
**Website:** https://creativexlab.online/  
**Framework:** Next.js 16.2.6 (App Router) on Vite / vinext Cloudflare Workers  

---

## 1. Technical Health & Architecture Checklist

- [x] **Framework Version:** Next.js 16.2.6 (App Router), React 19.2.6, TypeScript 5.9.3.
- [x] **Canonical URLs:** Standardized to `https://creativexlab.online` across all pages (no trailing slash except root).
- [x] **Metadata Configuration:** Comprehensive `Metadata` exports with `title`, `description`, `keywords`, `alternates`, `openGraph`, `twitter`, and `robots`.
- [x] **Search Engine Verification:** Cleanly integrated in `app/layout.tsx` via `metadata.verification` (Google Search Console + Bing Webmaster).
- [x] **Robots.txt (`/robots.txt`):** 
  - Allows all major search engine crawlers (Googlebot, Bingbot, Applebot, Baidu, Yandex).
  - Explicitly allows AI answer bots (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Amazonbot, CCBot, cohere-ai).
  - Restricts `/admin` and `/api/` paths.
  - References `/sitemap.xml`, `/rss.xml`, and `/careers/rss.xml`.
- [x] **XML Sitemap (`/sitemap.xml`):**
  - Includes all public canonical core routes, service hubs, industry solutions, blog posts, projects, and careers.
  - Excludes noindex, administrative, and test paths.
  - Dynamic timestamps from Supabase data and fallback timestamps.
- [x] **LLM Context Manifest (`/llms.txt`):**
  - Provides concise, structured markdown summarizing CreativeX company entity, core capabilities, technological stack, geographic presence, and Q&A blocks.
- [x] **Structured Data (JSON-LD):**
  - Validated Schema.org syntax on all pages:
    - Root: `Organization` (LocalBusiness / ProfessionalService) + `WebSite` with `SearchAction`.
    - Landing pages: `Service` + `BreadcrumbList` + `FAQPage`.
    - Blog: `Blog` / `Article` / `BlogPosting`.
    - Careers: `JobPosting` / `CollectionPage`.
    - CreativeOS: `SoftwareApplication`.
- [x] **Security Headers (`next.config.ts`):**
  - Strict-Transport-Security (HSTS 2 years + preload).
  - X-Content-Type-Options: nosniff.
  - X-Frame-Options: SAMEORIGIN.
  - Referrer-Policy: origin-when-cross-origin.
  - X-Robots-Tag: noindex, nofollow on `/admin/*` and `/api/*`.
- [x] **Accessibility & Semantic HTML:**
  - Skip to content links on major pages (`Skip to content`, `Skip to services`).
  - Single logical `<h1>` on every page.
  - Sequential `<h2>` and `<h3>` heading hierarchies.
  - Descriptive `alt` attributes on imagery.
- [x] **Mobile Responsiveness:**
  - Responsive layouts across 320px, 375px, 640px, 768px, 1024px, 1280px+.
  - Touch-friendly tap targets (>44x44px) for all buttons and interactive elements.
  - Sheet/Drawer navigation menu on mobile viewports.
- [x] **UI & Visual Brand Preservation:**
  - 100% preservation of existing dark corporate aesthetic.
  - Zero neon glows or artificial AI styling.
  - Existing layouts, typography, logos, animations, and loaders intact.

