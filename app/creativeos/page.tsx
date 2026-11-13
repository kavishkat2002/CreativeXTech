import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { CreativeOSShowcase } from "@/components/creativeos-showcase";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "CreativeOS — Autonomous Work Operating System & Predictive Capacity Engine | Australia, UK, Nepal & Global",
  description:
    "Enterprise Work Operating System with autonomous agent mesh, statutory labor costing (AU Super 11.5%, UK PAYE/NIC, LK 15% EPF/ETF, Nepal Dashain allowances), regional holiday calendars (Poya, Dashain/Tihar, Bank Holidays), and explainable Meta Prophet & LightGBM capacity forecasting.",
  keywords: [
    // Brand & Category
    "CreativeOS",
    "CreativeX Technology AI",
    "Autonomous Work Operating System",
    "Agentic WorkOS",
    "Predictive Capacity Analytics",
    "Enterprise Workflow Automation",
    // Australia (AU)
    "Work OS Australia",
    "Project capacity management Sydney",
    "Agile squad forecasting Melbourne",
    "Australian Superannuation 11.5% labor loading software",
    "Australian Privacy Principles APPs task management",
    "Remote engineering squad workflow Brisbane",
    // United Kingdom (UK)
    "Work Operating System UK",
    "Agile delivery forecasting London",
    "HMRC PAYE NIC cost loaded project management",
    "UK Working Time Regulations software",
    "UK GDPR compliant project management tool",
    "Manchester tech agency workflow automation",
    // Nepal (NP)
    "IT agency project management Nepal",
    "Kathmandu software company workflow OS",
    "Dashain Tihar holiday calendar project planner",
    "Cross-border tech squad management Pokhara",
    "NPR USD multi-currency agency software",
    // Sri Lanka (LK) & Global
    "Work Operating System Sri Lanka",
    "Poya Holiday Calendar Workflow",
    "15% EPF ETF Labor Cost Tracking Colombo",
    "Sri Lanka SME Project Management",
    "Jira Monday.com alternative for distributed squads",
    "PostgreSQL Row Level Security Work Graph",
  ],
  alternates: {
    canonical: `${baseUrl}/creativeos`,
    languages: {
      "en-AU": `${baseUrl}/creativeos?region=au`,
      "en-GB": `${baseUrl}/creativeos?region=gb`,
      "en-NP": `${baseUrl}/creativeos?region=np`,
      "en-LK": `${baseUrl}/creativeos?region=lk`,
      "en-US": `${baseUrl}/creativeos?region=us`,
      "x-default": `${baseUrl}/creativeos`,
    },
  },
  openGraph: {
    title: "CreativeOS — Autonomous Work Operating System & Predictive Capacity Engine",
    description:
      "One calm, agentic workspace for task execution, client approvals, and predictive project forecasting. Calibrated for Australia, United Kingdom, Nepal, Sri Lanka, and global distributed tech teams.",
    url: `${baseUrl}/creativeos`,
    siteName: "CreativeX Technology AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/creativex-robot-lockup.webp`,
        width: 1200,
        height: 630,
        alt: "CreativeOS Work Operating System & Predictive Capacity Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreativeOS — Autonomous Work Operating System & Predictive Capacity Engine",
    description:
      "Unify multi-jurisdiction teams across Australia, UK, Nepal, and Sri Lanka with autonomous agent mesh and Meta Prophet predictive forecasting.",
    images: [`${baseUrl}/brand/creativex-robot-lockup.webp`],
  },
};

export default function CreativeOSPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/creativeos#software`,
        name: "CreativeOS",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "ProjectManagementApplication",
        operatingSystem: "Cloud, Web-based, Cross-platform (macOS, Windows, Linux, iOS, Android)",
        description:
          "An autonomous, agentic Work Operating System with built-in workflow automation and predictive capacity analytics. Engineered for multi-jurisdiction engineering squads and SMEs across Australia, the United Kingdom, Nepal, Sri Lanka, and globally.",
        url: `${baseUrl}/creativeos`,
        softwareVersion: "3.4.2",
        author: {
          "@type": "Organization",
          name: "CreativeX Technology (Pvt) Ltd",
          url: baseUrl,
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "12",
          highPrice: "48",
          offerCount: "4",
          offers: [
            {
              "@type": "Offer",
              name: "Startup & Small Business Edition (11–50 staff)",
              category: "SME Software",
              price: "12",
              priceCurrency: "USD",
              eligibleRegion: ["LK", "NP", "AU", "GB", "US"],
            },
            {
              "@type": "Offer",
              name: "Mid-Range SME Edition (51–300 staff)",
              category: "Mid-Market Enterprise Software",
              price: "24",
              priceCurrency: "USD",
              eligibleRegion: ["LK", "NP", "AU", "GB", "US"],
            },
            {
              "@type": "Offer",
              name: "High-Scale Enterprise Edition (300+ staff)",
              category: "Custom Enterprise WorkOS",
              price: "48",
              priceCurrency: "USD",
              eligibleRegion: ["LK", "NP", "AU", "GB", "US"],
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "68",
          bestRating: "5",
          worstRating: "1",
        },
        featureList: [
          "Autonomous Agent Mesh with background copilot actions and approval gating",
          "Multi-jurisdiction statutory labor cost loading (AU Superannuation 11.5%, UK PAYE/NIC 13.8%, LK 15% EPF/ETF, Nepal festival allowances)",
          "Localized cultural and holiday calendar engines (2026 Poya days, Dashain/Tihar, UK Bank Holidays, Australian public holidays)",
          "Meta Prophet & LightGBM ensemble capacity forecasting with TreeSHAP mathematical attribution",
          "Tamper-Evident SHA-256 Merkle-Chained ActivityEvents append-only audit trail",
          "Kernel-enforced PostgreSQL Row-Level Security (RLS) & Granular RBAC/ABAC",
          "Real-time Change Data Capture (CDC) with idempotent event-driven trigger automation",
          "Multi-currency support: AUD, GBP, NPR, LKR, USD, EUR",
          "Point-In-Time Recovery (PITR) with RPO < 15m and RTO < 1h",
          "99.95% availability SLA with multi-AZ active-passive disaster recovery",
        ],
        standardsCompliant: [
          "ISO/IEC 27001:2022 Information Security Management Controls",
          "SOC 2 Type II Trust Services Criteria (Security, Availability, Confidentiality)",
          "UK Data Protection Act 2018 & UK GDPR",
          "Australian Privacy Principles (APPs, Privacy Act 1988)",
          "Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022)",
          "Central Bank of Sri Lanka (CBSL) Technology Risk Management Framework",
          "NIST AI Risk Management Framework (AI RMF 1.0)",
          "FIPS 140-3 Cryptographic Key Management",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: "CreativeX Technology (Pvt) Ltd",
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-robot-lockup.webp`,
        sameAs: [
          "https://www.linkedin.com/company/creativex-technology",
          "https://github.com/creativex-tech",
          "https://twitter.com/creativex_tech",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rajagiriya",
          addressLocality: "Colombo",
          addressRegion: "Western Province",
          addressCountry: "LK",
        },
        areaServed: [
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Nepal" },
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Singapore" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/creativeos#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is CreativeOS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CreativeOS is an autonomous, agentic Work Operating System developed by CreativeX Technology. It unifies stage-gated project management, real-time client approvals, autonomous AI copilot agents, and predictive capacity analytics powered by Meta Prophet and LightGBM. It is specifically calibrated for multi-jurisdiction engineering squads operating across Australia, the UK, Nepal, Sri Lanka, and global markets.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS compare to Jira, Monday.com, and ClickUp?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike generic project management tools that only display static burndown charts, CreativeOS integrates an autonomous agent mesh, native statutory labor costing (AU 11.5% Super, UK 13.8% NIC, LK 15% EPF/ETF), localized calendar engines (Poya, Dashain/Tihar, Bank Holidays), explainable machine learning forecasting (Meta Prophet + LightGBM), and a tamper-evident SHA-256 Merkle audit trail for enterprise compliance.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS support Australian technology companies and engineering squads?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For Australian tech teams in Sydney, Melbourne, and Brisbane, CreativeOS provides native AEST/AEDT timezone alignment, Australian Privacy Principles (APPs, Privacy Act 1988) compliance, automated 11.5% Superannuation Guarantee statutory labor costing, AUD multi-currency invoicing, and cross-border sprint balancing for nearshore engineering squads.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS comply with United Kingdom labor laws and UK GDPR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CreativeOS natively supports UK organizations by modeling HMRC PAYE and Employer Class 1 NIC (13.8%) statutory overheads, tracking UK Working Time Regulations (maximum 48-hour weekly limits), synchronizing England, Scotland, and Northern Ireland Bank Holiday schedules, and enforcing strict UK GDPR and Data Protection Act 2018 technical controls.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS help tech agencies and software teams in Nepal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For Nepal's expanding tech hub across Kathmandu and Pokhara, CreativeOS provides specialized South Asian festival calendar integrations (including multi-day Dashain and Tihar sprint pauses), statutory Dashain festival expense loading, multi-currency invoicing in NPR and USD, and asynchronous client communication bridges for cross-border export agencies.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS handle Sri Lankan statutory labor laws and Poya holidays?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CreativeOS factors in mandatory 15% EPF/ETF employer labor loadings under Sri Lanka Labor Act No. 15 of 1958 and Act No. 46 of 1980. It natively imports the complete 2026 Full Moon Poya and Mercantile calendar, preventing deadline collisions and recalculating sprint capacity automatically.",
            },
          },
          {
            "@type": "Question",
            name: "What machine learning models power CreativeOS predictive capacity forecasting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CreativeOS deploys an ensemble of Meta Prophet (additive time-series regression for seasonal trends, public holidays, and cyclic velocity) and LightGBM (gradient boosting decision trees for task complexity and reviewer lag). Every prediction provides exact mathematical feature attribution via TreeSHAP values, ensuring zero black-box decisions.",
            },
          },
          {
            "@type": "Question",
            name: "How does CreativeOS ensure enterprise security, data privacy, and tenant isolation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CreativeOS enforces kernel-level PostgreSQL Row-Level Security (RLS), tenant-isolated schemas, AES-256-GCM encryption at rest, TLS 1.3 in transit, and immutable SHA-256 Merkle-chained audit logs. It is architected to exceed ISO/IEC 27001:2022, SOC 2 Type II, and Central Bank of Sri Lanka (CBSL) Technology Risk Management standards.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/creativeos#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: `${baseUrl}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "CreativeOS Work Operating System",
            item: `${baseUrl}/creativeos`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/creativeos#webpage`,
        url: `${baseUrl}/creativeos`,
        name: "CreativeOS — Work Operating System & Predictive Analytics",
        description:
          "One calm workspace for task execution, client approvals, and predictive capacity forecasting for Australia, UK, Nepal, Sri Lanka, and global enterprise teams.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          url: baseUrl,
          name: "CreativeX Technology",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".cos-aeo-summary",
            ".cos-hero-headline",
            ".cos-hero-subheadline",
            ".cos-corridor-heading",
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />
      <SiteHeader activeSection="creativeos" />
      <main className="creativeos-main-wrap">
        <CreativeOSShowcase />
      </main>
      <SiteFooter />
    </>
  );
}
