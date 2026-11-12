import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { CreativeOSShowcase } from "@/components/creativeos-showcase";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "CreativeOS — Work Operating System & Predictive Analytics | CreativeX",
  description:
    "One calm workspace for task execution, client approvals, and predictive project capacity forecasting. Purpose-built for Sri Lankan business calendars, Poya holidays, and 15% EPF/ETF costs.",
  keywords: [
    "CreativeOS",
    "Work Operating System Sri Lanka",
    "Predictive Capacity Analytics",
    "Sri Lanka SME Project Management",
    "Poya Holiday Calendar Workflow",
    "EPF ETF Labor Cost Tracking",
    "Task Management Software Colombo",
    "Enterprise Workflow Automation",
    "CreativeX Technology AI",
  ],
  alternates: {
    canonical: `${baseUrl}/creativeos`,
    languages: {
      "en-US": `${baseUrl}/creativeos`,
      "en-GB": `${baseUrl}/creativeos`,
      "x-default": `${baseUrl}/creativeos`,
    },
  },
  openGraph: {
    title: "CreativeOS — Work Operating System & Predictive Analytics",
    description:
      "One calm workspace for task execution, client approvals, and predictive project forecasting calibrated for Sri Lankan business operations.",
    url: `${baseUrl}/creativeos`,
    siteName: "CreativeX Technology AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/creativex-robot-lockup.webp`,
        width: 1200,
        height: 630,
        alt: "CreativeOS Work Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreativeOS — Work Operating System & Predictive Analytics",
    description:
      "One calm workspace for task execution, client approvals, and predictive capacity forecasting.",
    images: [`${baseUrl}/brand/creativex-robot-lockup.webp`],
  },
};

export default function CreativeOSPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CreativeOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Web-based, Cross-platform",
    description:
      "A multi-tasking Work Operating System with built-in workflow automation and predictive analytics, engineered for Sri Lankan Startups, Mid-Range SMEs, and High-Scale Enterprises.",
    creator: {
      "@type": "Organization",
      name: "CreativeX Technology (Pvt) Ltd",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rajagiriya",
        addressLocality: "Colombo",
        addressRegion: "Western Province",
        addressCountry: "LK",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "LKR",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: "Startup & Small Business Edition (11–50 staff)",
          category: "SME Software",
        },
        {
          "@type": "Offer",
          name: "Mid-Range SME Edition (51–300 staff)",
          category: "Enterprise Software",
        },
        {
          "@type": "Offer",
          name: "High-Scale Enterprise Edition (300+ staff)",
          category: "Custom Enterprise ERP/OS",
        },
      ],
    },
    featureList: [
      "Multi-Tasking Stage Board with split-screen task inspector",
      "Native Sri Lankan 2026 Poya & Mercantile holiday capacity calendar",
      "Statutory 15% EPF/ETF employer labor cost budget realization (Labor Act No. 15 of 1958 & Act No. 46 of 1980)",
      "Event-Driven Trigger-Condition-Action automation engine with idempotent dispatch",
      "Meta Prophet & LightGBM capacity forecasting ensemble with TreeSHAP mathematical attribution",
      "Tamper-Evident SHA-256 Merkle Chained ActivityEvents append-only audit trail",
      "Kernel-Enforced PostgreSQL Row-Level Security (RLS) & Granular RBAC/ABAC",
      "Strict logical tenant isolation and TLS 1.3/AES-256-GCM encryption",
      "Point-In-Time Recovery (PITR) with continuous WAL archiving (RPO < 15m, RTO < 1h)",
      "99.95% Availability SLA with automated multi-AZ disaster recovery",
    ],
    standardsCompliant: [
      "ISO/IEC 27001:2022 Information Security Management Controls",
      "SOC 2 Type II Trust Services Criteria (Security, Availability, Confidentiality)",
      "Central Bank of Sri Lanka (CBSL) Technology Risk Management Framework",
      "Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022) & GDPR Compliance",
      "NIST AI Risk Management Framework (AI RMF 1.0) & EU AI Act Explainability",
      "FIPS 140-3 Cryptographic Key Management & Storage Encryption",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <SiteHeader activeSection="creativeos" />
      <main className="creativeos-main-wrap">
        <CreativeOSShowcase />
      </main>
      <SiteFooter />
    </>
  );
}

