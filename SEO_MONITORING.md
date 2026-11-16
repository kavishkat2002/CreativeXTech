# Organic Search, AEO/GEO & Technical Performance Monitoring Plan
**Company:** CreativeX Technology (Pvt) Ltd  
**Website:** https://creativexlab.online/  
**Reporting Frequency:** Monthly & Quarterly  

---

## 1. Measurement Architecture & Tooling

To ensure scientific measurement without fabricated rankings or synthetic figures, tracking must be established across the following official consoles:

### 1.1 Google Search Console (GSC)
- **Property:** `https://creativexlab.online/` (Domain or URL-prefix)
- **Verification Token:** `vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg` (Configured in Next.js `metadata.verification`)
- **Key Dashboards to Monitor:**
  - *Performance (Search Results):* Total clicks, total impressions, average CTR, average position.
  - *Geographic Breakdown:* Clicks/Impressions filtered by Country: **Sri Lanka** (Primary KPI), followed by Australia, Malaysia, UAE, United Kingdom, and United States.
  - *Page-Level Drilldowns:* Track indexation and queries for `/ai-development-sri-lanka`, `/erp-solutions-sri-lanka`, `/it-solutions-sri-lanka`, and `/custom-software-development`.
  - *Sitemaps:* Verify `sitemap.xml` status (Success, URL count, last read timestamp).

### 1.2 Bing Webmaster Tools
- **Property:** `https://creativexlab.online/`
- **Verification Token:** `BCF31216FC65CB0D5A1BBDC8BB3E4983` (Configured in `metadata.verification`)
- **Key Dashboards:** IndexNow status, Bing crawler health, Copilot source referrals.

### 1.3 Google Analytics 4 (GA4)
- **Measurement ID:** Configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Event Tracking Required:**
  - `click_contact_cta` (Clicks on "Book a Free Call", "Talk with Team Creative")
  - `form_submit_inquiry` (Submissions on `/contact` form)
  - `whatsapp_click` (Engagement with floating WhatsApp widget)
  - `career_application_submit` (Job applications and talent pool signups)

### 1.4 AEO / GEO Tracking (Generative AI Referrals)
- Monitor referral traffic from:
  - `chatgpt.com` / `android-app://com.openai.chatgpt`
  - `perplexity.ai`
  - `gemini.google.com`
  - `copilot.microsoft.com`
- Set up custom regex filters in GA4 referral sources for `.*(openai|perplexity|gemini|copilot).*`.

---

## 2. Monthly SEO Reporting Template

```markdown
# CreativeX Technology — Monthly SEO Performance Report
**Reporting Month:** [Month Year]  
**Website:** https://creativexlab.online/

### 1. High-Level Search Metrics (Google Search Console)
- Total Organic Impressions: [Number] (MoM: +/-% )
- Total Organic Clicks: [Number] (MoM: +/-% )
- Overall Average CTR: [Percent]%
- Average Position across Core Clusters: [Position]

### 2. Country Breakdown
- Sri Lanka: [Clicks] clicks | [Impressions] impressions
- Australia: [Clicks] clicks | [Impressions] impressions
- UAE: [Clicks] clicks | [Impressions] impressions
- Malaysia: [Clicks] clicks | [Impressions] impressions
- Others: [Clicks] clicks

### 3. Priority Keyword Position Tracking (Sri Lanka)
| Keyword Target | Target Landing Page | Current Avg Position | Impressions | Clicks | MoM Trend |
|---|---|---|---|---|---|
| AI company in Sri Lanka | /ai-development-sri-lanka | -- | -- | -- | -- |
| AI development company in Sri Lanka | /ai-development-sri-lanka | -- | -- | -- | -- |
| ERP solutions provider Sri Lanka | /erp-solutions-sri-lanka | -- | -- | -- | -- |
| IT solutions provider in Sri Lanka | /it-solutions-sri-lanka | -- | -- | -- | -- |
| Software development company Sri Lanka | /custom-software-development | -- | -- | -- | -- |
| Custom ERP development Sri Lanka | /erp-solutions-sri-lanka | -- | -- | -- | -- |
| WhatsApp AI chatbot Sri Lanka | /services/ai-automation-agents | -- | -- | -- | -- |

### 4. Technical Crawl & Indexation Health
- Total Indexed Pages (GSC): [Count]
- Total Excluded / Canonical Non-Index: [Count]
- Core Web Vitals (Mobile): LCP [x]s | INP [x]ms | CLS [x]
- Core Web Vitals (Desktop): LCP [x]s | INP [x]ms | CLS [x]

### 5. Conversion Actions
- Consultation Form Inquiries: [Count]
- Direct WhatsApp Inquiries: [Count]
- Talent Pool Submissions: [Count]

### 6. Action Items for Next Sprints
- [List content expansions, case study publications, and schema iterations]
```

