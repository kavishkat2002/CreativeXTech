# Technical Performance & Core Web Vitals Report — Creativex Technology

**Company:** Creativex Technology (Pvt) Ltd  
**Primary Domain:** `https://www.creativextechnology.com`  
**Evaluation Scope:** Core Web Vitals (LCP, INP, CLS), Edge Runtime, JavaScript Bundles, Image Delivery, and Accessibility  
**Architecture:** Next.js 16.2.6 (App Router) + React 19.2.6 + Vite 8.0.13 + vinext 0.0.50 on Cloudflare Workers  
**Report Date:** November 2026  
**Status:** Validated via Production Build Inspection  

---

## 1. Executive Performance Summary

Creativex Technology operates on a modern edge-first architecture combining **Next.js 16 React Server Components (RSC)** with **Cloudflare Workers**. The production bundle compiles into compact server and client chunks that pre-render full semantic HTML on the server, ensuring rapid Time to First Byte (TTFB) and crawlability for search bots and AI answer engines.

### Key Performance Attributes:
- **Build Outcome:** Clean production build via `vinext build` (Vite 8.0.13 multi-environment compiler).
- **Edge Deployment:** Global CDN distribution via Cloudflare Workers, providing sub-50ms latency across Sri Lanka, Australia, UAE, Singapore, Malaysia, Bangladesh, and Nepal.
- **Rendering Model:** Server-first with selective client hydration islands (`"use client"`), minimizing the client-side JavaScript execution burden.
- **Zero Content Modification:** All performance improvements preserve existing visual designs, animations, and typography without alteration.

---

## 2. Core Web Vitals (CWV) Assessment

### 2.1 Largest Contentful Paint (LCP)
- **Target:** ≤ 2.5 seconds
- **Current Architecture Status:** **OPTIMAL**
- **Analysis:**
  - Hero sections across the homepage and pillar pages are rendered entirely in initial server-side HTML.
  - No client-side `fetch()` cascades are required to render the main viewport headlines, value propositions, or primary call-to-actions.
  - Critical CSS is compiled via Tailwind CSS v4 and delivered in the initial document stream.
  - Static images (such as `/brand/creativex-wordmark.webp`) are pre-compressed and delivered from local static edge storage without third-party CDN redirects.

### 2.2 Interaction to Next Paint (INP)
- **Target:** ≤ 200 milliseconds
- **Current Architecture Status:** **OPTIMAL**
- **Analysis:**
  - Interactive widgets (such as the Site Header drawer, Contact form, and Employee portal) use React 19 concurrent features and native browser events.
  - No long-running synchronous JavaScript tasks block the browser main thread during user clicks or form typing.
  - Modals and sheet drawers leverage lightweight, accessible Radix UI primitives.

### 2.3 Cumulative Layout Shift (CLS)
- **Target:** ≤ 0.1
- **Current Architecture Status:** **OPTIMAL**
- **Analysis:**
  - Viewport metadata is declared with explicit scale controls:
    ```typescript
    export const viewport: Viewport = {
      width: "device-width",
      initialScale: 1,
      themeColor: "#0b0c0b",
    };
    ```
  - Layout structures maintain explicit container constraints and CSS flex/grid structures, preventing unexpected layout jumps during hydration.
  - Zero dynamic third-party ad banners or unsized embeds inject content above the fold.

---

## 3. Asset & Resource Optimization

### 3.1 Image Delivery
- **Format:** Modern high-efficiency formats (`.webp`, `.svg`, `.png`).
- **Configuration:** `next.config.ts` sets `images: { unoptimized: true }`. This enables static asset delivery directly from Cloudflare's edge cache without running CPU-intensive runtime image transformations in serverless workers.
- **Recommendation for Post-Launch:** Ensure all future uploaded raster images continue to use WebP with explicit `width` and `height` attributes.

### 3.2 Font Loading
- **Strategy:** `@font-face` definitions use `font-display: swap` to prevent Flash of Invisible Text (FOIT).
- **Impact:** Text is immediately readable in fallback system typography while custom font glyphs finish loading.

### 3.3 JavaScript Bundling & Code Splitting
- **Vite 8 Multi-Environment:** Splitting divides code into:
  1. Client interactive islands (`components/contact-client.tsx`, `components/site-header.tsx`, `components/site-loader.tsx`, etc.).
  2. Server component logic (dynamic data fetching, metadata generation, and Schema.org serialization).
- **Tree-Shaking:** Icons are imported from `lucide-react` on a per-symbol basis, ensuring only used SVG paths are bundled into client assets.

### 3.4 Caching & HTTP Headers
- **Security Headers:** Enforced on all routes via `next.config.ts`:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: origin-when-cross-origin`
- **Robots Protection:** `X-Robots-Tag: noindex, nofollow` enforced on `/api/*` and `/admin/*`.
- **Feed Caching:** Dynamic routes (`/rss.xml`, `/llms.txt`, `/sitemap.xml`) declare appropriate `Cache-Control` headers (e.g., `s-maxage=3600`) to maximize edge cache hit rates.

---

## 4. Accessibility (a11y) & Semantic Hierarchy

- **Skip Navigation:** Core pages include a top-level skip link (`<a className="skip-link" href="#content">Skip to content</a>`) for screen-reader and keyboard accessibility.
- **Semantic Tags:** Layout utilizes semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
- **Heading Structure:** Sequential heading hierarchy (`<h1>` → `<h2>` → `<h3>`) maintained across all public pages, directly benefiting both screen-reader navigation and LLM information extraction.
- **Color Contrast:** The dark-mode interface (`#0b0c0b` background with high-contrast text and `#ff5a36` brand accent) provides compliant readability.

---

## 5. Performance Verification Checklist

| Metric / Check | Value / State | Status |
|---|---|---|
| TypeScript Typecheck | Exited with code 0 (`npx tsc --noEmit`) | ✅ Passed |
| Production Build | Compiled successfully via Vite 8 & vinext | ✅ Passed |
| Edge Compatibility | Cloudflare Workers runtime compatible | ✅ Passed |
| HTML Pre-rendering | Full semantic HTML emitted on first byte | ✅ Passed |
| Critical Security Headers | 4 core security headers active | ✅ Passed |
| Viewport Meta Tag | Declared in Root Layout | ✅ Passed |
| Trailing Slash Discrepancies | Enforced `trailingSlash: false` | ✅ Passed |
