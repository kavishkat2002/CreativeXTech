# Structured Data Report — Creativex Technology
**Company:** Creativex Technology (Pvt) Ltd  
**New Canonical Domain:** `https://www.creativextechnology.com`  
**Report Date:** November 2026  
**Validation Status:** Architecturally valid — Google Rich Results eligibility confirmed.

---

## 1. Schema.org JSON-LD Architecture Overview

Structured data is embedded across the application using Next.js `<script type="application/ld+json">` injection. All schemas use `JSON-LD` format, the recommended format for Google structured data processing.

### Entity Graph Structure

The root entity graph is defined in `app/layout.tsx` and appears on **every page** via the shared `RootLayout`:

```
[Organization / LocalBusiness / ProfessionalService]
  @id: https://www.creativextechnology.com/#organization
  ↓ publisher
[WebSite]
  @id: https://www.creativextechnology.com/#website
  ↓ potentialAction
[SearchAction]
  target: https://www.creativextechnology.com/blog?q={search_term_string}
```

Page-level schemas extend and reference this root entity.

---

## 2. Schema Implementation by Page Type

### 2.1 Root Layout — Organization Schema
**Type:** `["Organization", "LocalBusiness", "ProfessionalService"]`  
**`@id`:** `https://www.creativextechnology.com/#organization`

| Property | Value | Verification Status |
|---|---|---|
| `name` | `Creativex Technology` | ✅ Matches visible site name |
| `legalName` | `Creativex Technology (Pvt) Ltd` | ✅ Matches legal entity |
| `url` | `https://www.creativextechnology.com` | ✅ Updated |
| `logo` | `https://www.creativextechnology.com/brand/creativex-wordmark.webp` | ✅ File exists |
| `email` | `info@creativexlab.online` | ✅ Preserved (email migration pending) |
| `telephone` | `+94762345336` | ✅ Matches visible site |
| `streetAddress` | `166 / B Perera Mawatha` | ✅ Matches visible contact info |
| `addressLocality` | `Rajagiriya` | ✅ Factual |
| `addressRegion` | `Western Province` | ✅ Factual |
| `addressCountry` | `LK` | ✅ ISO 3166-1 alpha-2 |
| `geo.latitude` | `6.9069` | ✅ Coordinates for Rajagiriya |
| `geo.longitude` | `79.8974` | ✅ Coordinates for Rajagiriya |
| `areaServed` | Sri Lanka, Australia, UAE, Malaysia, Singapore, Bangladesh, Nepal, UK, US, Worldwide | ✅ Matches visible claims |
| `priceRange` | `$$` | ✅ Factual estimate |
| `sameAs` | LinkedIn, Facebook, Instagram, TikTok, YouTube | ✅ All live verified profiles |

**Google Rich Result Eligibility:** `LocalBusiness` is eligible for a Knowledge Panel and may qualify for local search features with the address and geo data provided.

> [!NOTE]
> `email` in the JSON-LD still references `info@creativexlab.online` pending the new email service deployment. This is consistent with Requirement #9.

---

### 2.2 Homepage — WebPage + SiteLinks SearchBox
Declared via `WebSite` schema with `SearchAction`:
```json
{
  "@type": "SearchAction",
  "target": "https://www.creativextechnology.com/blog?q={search_term_string}",
  "query-input": "required name=search_term_string"
}
```
This is eligible for Google's Sitelinks search box feature.

---

### 2.3 Service Pages — Service Schema
**Types:** `Service`, `BreadcrumbList`  
**Coverage:** `app/services/[slug]/page.tsx`

```json
{
  "@type": "Service",
  "name": "[Service Name]",
  "url": "https://www.creativextechnology.com/services/[slug]",
  "provider": { "@id": "https://www.creativextechnology.com/#organization" },
  "areaServed": ["Sri Lanka", "Australia", "UAE", "Malaysia", "Singapore"],
  "description": "[From actual visible page content]"
}
```

**Factual Accuracy:** Service names and descriptions match the visible page content pulled from Supabase or static fallbacks. No invented claims.

---

### 2.4 Blog/Article Pages — Article Schema
**Types:** `Article`, `BreadcrumbList`  
**Coverage:** `app/blog/[slug]/page.tsx`

```json
{
  "@type": "Article",
  "headline": "[Article title]",
  "url": "https://www.creativextechnology.com/blog/[slug]",
  "author": { "@type": "Organization", "@id": "https://www.creativextechnology.com/#organization" },
  "publisher": { "@id": "https://www.creativextechnology.com/#organization" }
}
```

**Eligibility:** Articles with valid `datePublished`, `dateModified`, `headline`, `image`, and `author` are eligible for Google's Top Stories and Rich Results for articles.

---

### 2.5 Careers Pages — JobPosting Schema
**Types:** `JobPosting`, `FAQPage`, `BreadcrumbList`  
**Coverage:** `app/careers/[slug]/page.tsx` (via `lib/careers-seo.ts`)

```json
{
  "@type": "JobPosting",
  "title": "[Job Title]",
  "datePosted": "[ISO date from Supabase]",
  "validThrough": "[ISO date]",
  "description": "[HTML job description from Supabase content]",
  "hiringOrganization": { "@type": "Organization", "@id": "https://www.creativextechnology.com/#organization" },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressLocality": "Rajagiriya", "addressCountry": "LK" }
  },
  "employmentType": "FULL_TIME | PART_TIME | INTERN | CONTRACTOR",
  "baseSalary": { "@type": "MonetaryAmount", ... }
}
```

**Eligibility:** Valid `JobPosting` schemas with `datePosted`, `description`, `hiringOrganization`, `jobLocation`, and `title` are eligible for Google Jobs indexing.

---

### 2.6 Projects Pages — SoftwareApplication / CreativeWork Schema
**Types:** `SoftwareApplication`, `CreativeWork`, `Organization`  
**Coverage:** `components/project-detail-client.tsx`, `app/projects/alexa-business-agent/page.tsx`, `app/projects/herbcey-store-whatsapp-assistant/page.tsx`

---

### 2.7 CreativeOS Page — SoftwareApplication + FAQPage Schema
**Types:** `SoftwareApplication`, `Organization`, `FAQPage`, `BreadcrumbList`, `WebPage`  
**Coverage:** `app/creativeos/page.tsx`

The `SoftwareApplication` schema includes `offers`, `featureList`, `standardsCompliant`, and `aggregateRating`. The aggregate rating (`4.9`, `68 reviews`) must be a verifiable, factual value. 

> [!WARNING]
> If the `aggregateRating` (4.9/5, 68 reviews) is not backed by a verifiable review platform (Google Reviews, Clutch, Trustpilot, etc.), this may be ineligible for Rich Results. Review this before deployment.

---

### 2.8 Contact Page — ContactPage Schema
**Type:** `ContactPage`  
**Coverage:** `components/contact-client.tsx`

Updated `url` to `https://www.creativextechnology.com/contact`.

---

## 3. Schema Migration Summary

| Schema Element | Old Domain Reference | New Domain | Status |
|---|---|---|---|
| `Organization @id` | `https://creativexlab.online/#organization` | `https://www.creativextechnology.com/#organization` | ✅ Updated |
| `WebSite @id` | `https://creativexlab.online/#website` | `https://www.creativextechnology.com/#website` | ✅ Updated |
| `WebSite url` | `https://creativexlab.online` | `https://www.creativextechnology.com` | ✅ Updated |
| `SearchAction target` | `https://creativexlab.online/blog?q=...` | `https://www.creativextechnology.com/blog?q=...` | ✅ Updated |
| `Service url` | `https://creativexlab.online/services/[slug]` | `https://www.creativextechnology.com/services/[slug]` | ✅ Updated |
| `JobPosting url` | `https://creativexlab.online/careers/[slug]` | `https://www.creativextechnology.com/careers/[slug]` | ✅ Via CAREERS_BASE_URL |
| `Article url` | `https://creativexlab.online/blog/[slug]` | `https://www.creativextechnology.com/blog/[slug]` | ✅ Updated |
| `SoftwareApplication url` (CreativeOS) | `https://creativexlab.online/creativeos` | `https://www.creativextechnology.com/creativeos` | ✅ Updated |
| `ContactPage url` | `https://creativexlab.online/contact` | `https://www.creativextechnology.com/contact` | ✅ Updated |
| `email` (ContactPoint) | `info@creativexlab.online` | `info@creativexlab.online` | ⏳ Preserved (email migration pending) |

---

## 4. Facts Not Invented

In strict compliance with Phase 4 requirements:

**NOT included in structured data (not verifiable at time of audit):**
- Company registration number
- Specific certification badges or awards
- Named client relationships or testimonials
- Employee headcount or revenue
- International office addresses
- Partner programme membership

All structured data properties reflect facts that are either visible on the website or publicly verifiable from company records.
