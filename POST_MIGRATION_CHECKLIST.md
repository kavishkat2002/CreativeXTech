# Post-Migration Verification & Monitoring Checklist — Creativex Technology

**Company:** Creativex Technology (Pvt) Ltd  
**Legacy Domain:** `https://creativexlab.online`  
**New Preferred Production Domain:** `https://www.creativextechnology.com` (Preferred: `https://www.creativextechnology.com/`)  
**Purpose:** Actionable post-launch validation, indexing verification, Search Console tracking, and AEO/GEO monitoring  

---

## 1. Immediate Post-Deployment Smoke Tests (Day 0)

Run these checks immediately after deploying the build and activating the custom domain in Cloudflare:

### 1.1 HTTP Status Code & Redirect Verification
- [ ] `curl -ILs https://www.creativextechnology.com/ | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`
- [ ] `curl -Is https://creativextechnology.com/ | grep -E "HTTP/|location:"`
  - *Expected:* `HTTP/2 301` -> `location: https://www.creativextechnology.com/`
- [ ] `curl -Is https://creativexlab.online/ | grep -E "HTTP/|location:"`
  - *Expected:* `HTTP/2 301` -> `location: https://www.creativextechnology.com/`
- [ ] `curl -Is https://creativexlab.online/about | grep -E "HTTP/|location:"`
  - *Expected:* `HTTP/2 301` -> `location: https://www.creativextechnology.com/about`
- [ ] `curl -Is https://creativexlab.online/services/ai-automation-agents | grep -E "HTTP/|location:"`
  - *Expected:* `HTTP/2 301` -> `location: https://www.creativextechnology.com/services/ai-automation-agents`
- [ ] Verify maximum redirect hop is **1** (no redirect chains or loops).

### 1.2 Public File & Feed Accessibility
- [ ] `curl -ILs https://www.creativextechnology.com/robots.txt | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`, verifies `Host: https://www.creativextechnology.com`
- [ ] `curl -ILs https://www.creativextechnology.com/sitemap.xml | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`, verifies all `<loc>` entries start with `https://www.creativextechnology.com`
- [ ] `curl -ILs https://www.creativextechnology.com/llms.txt | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`
- [ ] `curl -ILs https://www.creativextechnology.com/rss.xml | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`
- [ ] `curl -ILs https://www.creativextechnology.com/careers/rss.xml | grep "HTTP/"`
  - *Expected:* `HTTP/2 200`

---

## 2. Search Console & Webmaster Configuration (Day 1)

### 2.1 Google Search Console
- [ ] Add `https://www.creativextechnology.com` property to Google Search Console.
- [ ] Confirm ownership verification via existing meta tag `vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg`.
- [ ] Submit sitemap URL: `https://www.creativextechnology.com/sitemap.xml`.
- [ ] In the old property `https://creativexlab.online`, go to **Settings → Change of Address** and initiate the 180-day domain move.
- [ ] Test URL Inspection on `https://www.creativextechnology.com/` and request indexing.
- [ ] Test URL Inspection on `https://www.creativextechnology.com/ai-development-sri-lanka` and request indexing.

### 2.2 Bing Webmaster Tools
- [ ] Add `https://www.creativextechnology.com`.
- [ ] Verify ownership via token `BCF31216FC65CB0D5A1BBDC8BB3E4983`.
- [ ] Submit sitemap `https://www.creativextechnology.com/sitemap.xml`.

---

## 3. Structured Data Validation (Day 1 – 3)

- [ ] Test homepage in **Google Rich Results Test** (`https://search.google.com/test/rich-results`):
  - Verify `Organization`, `LocalBusiness`, and `WebSite` schemas pass without errors.
- [ ] Test `/services/ai-automation-agents`:
  - Verify `Service` and `BreadcrumbList` schemas pass.
- [ ] Test `/careers/[slug]`:
  - Verify `JobPosting` schema eligibility for Google Jobs.
- [ ] Test `/blog/[slug]`:
  - Verify `Article` schema eligibility for Google search carousels.

---

## 4. Ongoing Monitoring Protocol (Week 1 – Week 12)

### 4.1 Weekly Indexation & Crawl Health
- [ ] Check Google Search Console **Pages (Indexing)** report for:
  - Rising count of Indexed pages under `www.creativextechnology.com`.
  - Declining count of Indexed pages under `creativexlab.online`.
  - Zero "Page with redirect" errors on the new canonical domain.
  - Zero "Blocked by robots.txt" on public pillar pages.
- [ ] Monitor **Crawl Stats** in Search Console to verify Googlebot is crawling the new host efficiently.

### 4.2 Keyword Visibility & Ranking Tracking
- [ ] Monitor branded queries: `"Creativex Technology"`, `"Creativex Technology (Pvt) Ltd"`.
- [ ] Track primary Sri Lankan commercial queries:
  - *"AI development company in Sri Lanka"*
  - *"ERP software company Sri Lanka"*
  - *"IT solutions provider in Sri Lanka"*
  - *"Custom software development Sri Lanka"*
- [ ] Track regional & offshore international queries:
  - *"Offshore software engineering squads Australia"*
  - *"Work Operating System Australia"*
  - *"Enterprise AI development UAE"*

### 4.3 Generative Engine Optimization (GEO) & AEO Tracking
- [ ] **ChatGPT Search:** Prompt *"What does Creativex Technology do in Sri Lanka?"* and verify citations point to `www.creativextechnology.com`.
- [ ] **Perplexity AI:** Prompt *"Leading AI development and ERP companies in Sri Lanka"* and check source citations.
- [ ] **Google AI Overviews:** Monitor appearances for Sri Lankan enterprise software and AI development queries.
- [ ] **Claude & Gemini:** Query company capabilities and check knowledge retrieval accuracy.

---

## 5. Rollback & Emergency Contingency Plan

If any critical issue arises post-deployment (such as DNS misconfiguration or unexpected SSL delays):
1. **Cloudflare Fallback:** Temporarily point DNS back to the active `creativexlab.online` zone while diagnosing edge issues.
2. **Codebase Rollback:** The codebase is version-controlled via git and can be reverted to any prior commit instantly.
3. **No Downtime:** The old domain remains registered, valid, and operational throughout the transition period.
