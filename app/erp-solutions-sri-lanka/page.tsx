import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ErpSolutionClient } from "@/components/erp-solution-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "ERP Solutions Provider in Sri Lanka | Custom ERP Software | CreativeX",
  description:
    "CreativeX Technology delivers custom ERP solutions in Sri Lanka. Tailored enterprise software for inventory management, supply chain, multi-branch retail, distribution, and manufacturing without recurring per-seat license fees.",
  keywords: [
    "ERP software company Sri Lanka",
    "ERP solutions provider Sri Lanka",
    "ERP development company Sri Lanka",
    "Custom ERP development Sri Lanka",
    "Business management software Sri Lanka",
    "Enterprise software solutions Sri Lanka",
    "Inventory management software Sri Lanka",
    "ERP software for SMEs Sri Lanka",
    "Distribution management software Sri Lanka",
    "Manufacturing ERP Sri Lanka",
  ],
  alternates: {
    canonical: `${baseUrl}/erp-solutions-sri-lanka`,
    languages: {
      "en-US": `${baseUrl}/erp-solutions-sri-lanka`,
      "en-LK": `${baseUrl}/erp-solutions-sri-lanka`,
      "x-default": `${baseUrl}/erp-solutions-sri-lanka`,
    },
  },
  openGraph: {
    title: "ERP Solutions Provider in Sri Lanka | CreativeX Technology",
    description:
      "Modern, custom ERP development for Sri Lankan enterprises and growing SMEs. Connect inventory, billing, procurement, and accounts with 100% IP ownership.",
    url: `${baseUrl}/erp-solutions-sri-lanka`,
    type: "website",
    siteName: "CreativeX Technology",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "ERP Solutions Provider in Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERP Solutions Provider in Sri Lanka | CreativeX Technology",
    description:
      "Custom ERP development, inventory systems, and enterprise management software built for Sri Lankan businesses.",
    images: [`${baseUrl}/og.png`],
  },
};

const faqs = [
  {
    q: "Why should a Sri Lankan company choose custom ERP over SAP, NetSuite, or Odoo?",
    a: "Commercial off-the-shelf (COTS) ERP software imposes heavy ongoing costs: monthly per-user licensing ($60–$150/user), mandatory annual maintenance fees, and expensive customization contracts whenever your workflows change. Furthermore, foreign software is not designed for Sri Lankan realities—such as local VAT/SVAT schedules, van-sales credit cycles, and offline-first POS requirements. CreativeX provides 100% intellectual property ownership, zero recurring seat fees, and a platform engineered precisely around your business differentiators.",
  },
  {
    q: "How does CreativeX ERP handle Sri Lankan VAT, SVAT, and statutory taxes?",
    a: "Our accounting module is engineered specifically for Sri Lankan Inland Revenue Department (IRD) regulations. It automatically categorizes input/output VAT, generates RAMIS-compliant tax schedules, manages SVAT credit vouchers, and tracks Withholding Tax (WHT). Tax rate adjustments can be updated in seconds via system configuration without hiring expensive consultants.",
  },
  {
    q: "Can our cashiers continue billing if the Internet or power drops?",
    a: "Yes. Retail outlets in Sri Lanka require offline resilience. CreativeX POS terminals utilize an offline-first architecture. If your Internet connection drops, cashiers continue scanning barcodes, calculating totals, and printing receipts locally. The second connection restores, the local transaction buffer automatically synchronizes with the head office cloud database.",
  },
  {
    q: "What is the typical implementation timeline for a CreativeX ERP project?",
    a: "We deploy using an agile, phased modular methodology. Core modules (Inventory, Multi-Branch Billing, and Basic Accounting) typically go live within 8 to 12 weeks. Subsequent modules (Van-Sales, Procurement, HR/Payroll) rollout in planned 2-to-4 week sprints, ensuring zero disruption to your daily trading operations.",
  },
  {
    q: "How do you migrate our historical data from Excel or older legacy software?",
    a: "Our data engineering squad manages the entire migration pipeline. We extract, sanitize, deduplicate, and validate your existing customer registries, vendor ledgers, opening stock counts, and chart of accounts. We perform dry-run migrations in staging environments to verify financial balances before production cutover.",
  },
  {
    q: "Who owns the software source code and data?",
    a: "You do. Under our bespoke enterprise contracts, your organization owns 100% of the deployed software intellectual property, database schemas, and proprietary code. You can host the system on your own private cloud (AWS, Azure, Google Cloud) or on-premise local servers.",
  },
];

export default function ErpSolutionsSriLankaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}/erp-solutions-sri-lanka/#service`,
        name: "ERP Solutions & Enterprise Software in Sri Lanka",
        serviceType: "Enterprise Resource Planning (ERP) & Business Software Development",
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "AdministrativeArea", name: "Asia-Pacific" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        description:
          "Custom ERP development company in Sri Lanka engineering tailored business management systems, inventory tracking, distribution management, and accounting software.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "ERP Modules & Capabilities",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inventory & Warehouse Management (WMS)" },
            { "@type": "ListItem", position: 2, name: "Multi-Branch Billing & POS Synchronization" },
            { "@type": "ListItem", position: 3, name: "Procurement, Vendor & Purchase Order Tracking" },
            { "@type": "ListItem", position: 4, name: "Distribution & Fleet Van-Sale Management (DMS)" },
            { "@type": "ListItem", position: 5, name: "Financial Accounting & Statutory Tax (VAT/SVAT)" },
            { "@type": "ListItem", position: 6, name: "HR, Payroll & Employee Attendance Integration" },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/erp-solutions-sri-lanka/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${baseUrl}/solutions` },
          { "@type": "ListItem", position: 3, name: "ERP Solutions Sri Lanka", item: `${baseUrl}/erp-solutions-sri-lanka` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell min-h-screen bg-[#0b0c0b]">
      <a className="skip-link" href="#modules">Skip to ERP modules</a>
      <SiteHeader activeSection="solutions" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ErpSolutionClient />
    </main>
  );
}
