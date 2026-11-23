import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { CustomSoftwareClient } from "@/components/custom-software-client";

const baseUrl = "https://www.creativextechnology.com";

export const metadata: Metadata = {
  title: "Custom Software Development Sri Lanka | Software Engineering Company | Creativex Technology",
  description:
    "Creativex Technology is a premier software development company in Sri Lanka. We build custom web apps, mobile applications, enterprise SaaS platforms, and dedicated offshore engineering squads for businesses in Sri Lanka, Australia, UAE, and worldwide.",
  keywords: [
    "Software development company Sri Lanka",
    "Custom software development Sri Lanka",
    "Software engineering company Sri Lanka",
    "Web application development Sri Lanka",
    "Enterprise software development Sri Lanka",
    "SaaS development company Sri Lanka",
    "Mobile app development company Sri Lanka",
    "Offshore software development Sri Lanka",
    "Software development company in Asia",
    "Dedicated developers Colombo",
    "Next.js development Sri Lanka",
    "Flutter app development Sri Lanka",
    "Full stack development Sri Lanka",
  ],
  alternates: {
    canonical: `${baseUrl}/custom-software-development`,
    languages: {
      "en-US": `${baseUrl}/custom-software-development`,
      "en-AU": `${baseUrl}/custom-software-development`,
      "en-LK": `${baseUrl}/custom-software-development`,
      "x-default": `${baseUrl}/custom-software-development`,
    },
  },
  openGraph: {
    title: "Custom Software Development Sri Lanka | Creativex Technology",
    description:
      "Enterprise custom software development, modern web applications, mobile engineering, and dedicated offshore squads in Colombo, Sri Lanka. 100% IP ownership.",
    url: `${baseUrl}/custom-software-development`,
    type: "website",
    siteName: "Creativex Technology",
    locale: "en_US",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Custom Software Development Sri Lanka — Creativex Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creativex_tech",
    title: "Custom Software Development Sri Lanka | Creativex Technology",
    description:
      "Custom software engineering, full-stack web and mobile development, and dedicated squads from Colombo, Sri Lanka.",
    images: [`${baseUrl}/og.png`],
  },
};

const faqs = [
  {
    q: "Why is Sri Lanka considered a premier destination for custom software development?",
    a: "Sri Lanka has established an elite global reputation for high-value software engineering rather than low-end body shopping. The nation produces world-class computer science graduates from prestigious institutions (University of Moratuwa, University of Colombo, SLIIT) with fluent English proficiency, high ethical standards, and low attrition rates. International companies in Australia, the UAE, the UK, and Singapore leverage Sri Lanka to achieve senior engineering velocity at significant cost efficiencies compared to Western tech hubs.",
  },
  {
    q: "How much does custom software development cost in Sri Lanka?",
    a: "Custom software development in Sri Lanka is highly competitive and cost-effective. A focused minimum viable product (MVP) or custom internal portal typically ranges between LKR 850,000 and LKR 2,500,000 ($2,800 to $8,000 USD). Comprehensive multi-tenant SaaS platforms, high-concurrency enterprise applications, and complex mobile ecosystems range from LKR 3,800,000 upwards ($12,000+ USD) depending on architectural complexity, database scale, and third-party integrations.",
  },
  {
    q: "Who owns the software source code, database, and intellectual property?",
    a: "You do. Under our standard software engineering agreements, your organization retains 100% ownership of all source code, database schemas, digital assets, and proprietary algorithms upon milestone completion. We provide full GitHub repository access from Day 1 and operate with strict Non-Disclosure Agreements (NDAs).",
  },
  {
    q: "How do Creativex Technology dedicated squads collaborate with overseas clients?",
    a: "We integrate directly into your existing communication and sprint ecosystem. Our squads operate in your Slack channels, participate in your daily stand-ups via Zoom/Google Meet, track user stories in Jira or Linear, and submit Pull Requests to your GitHub repositories. Timezone overlap with Australia (AEST), the Gulf (GST), and the UK (GMT) ensures real-time collaboration during regular working hours.",
  },
  {
    q: "What engineering standards and testing methodologies do you enforce?",
    a: "We adhere to rigorous production-grade standards: automated unit and integration testing with minimum 85% code coverage, strict TypeScript static typing, automated linting via ESLint and Prettier, automated containerized builds with GitHub Actions, and static application security testing (SAST) to prevent vulnerabilities before deployment.",
  },
  {
    q: "What happens after the software is deployed to production?",
    a: "We provide comprehensive post-launch warranty support on all projects. Additionally, we offer defined Service Level Agreement (SLA) maintenance packages covering 24/7 server monitoring, proactive database backups, third-party API deprecation updates, and continuous performance optimization.",
  },
];

export default function CustomSoftwareDevelopmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/custom-software-development/#webpage`,
        url: `${baseUrl}/custom-software-development`,
        name: "Custom Software Development Sri Lanka | Software Engineering Company | Creativex Technology",
        description:
          "Creativex Technology is a premier custom software development company in Sri Lanka building web apps, mobile platforms, SaaS products, and dedicated offshore squads.",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-US",
        datePublished: "2024-01-01",
        dateModified: "2026-11-24",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${baseUrl}/og.png`,
          width: 1730,
          height: 909,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".services-page-hero", ".about-intro", ".faq-section"],
        },
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/custom-software-development/#service`,
        name: "Custom Software Development & Engineering in Sri Lanka",
        serviceType: "Custom Software Engineering & Dedicated Developer Squads",
        provider: { "@id": `${baseUrl}/#organization` },
        url: `${baseUrl}/custom-software-development`,
        areaServed: [
          { "@type": "City", name: "Colombo", containedInPlace: { "@type": "Country", name: "Sri Lanka" } },
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "AdministrativeArea", name: "Asia-Pacific" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        description:
          "Full-lifecycle custom software development company in Colombo, Sri Lanka engineering production-grade web applications, mobile platforms, enterprise cloud architectures, and dedicated offshore squads.",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "LKR",
          lowPrice: "850000",
          highPrice: "3800000",
          offerCount: 6,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering Disciplines",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Enterprise Web Applications & Cloud Portals" },
            { "@type": "ListItem", position: 2, name: "Cross-Platform Mobile Apps (Flutter & React Native)" },
            { "@type": "ListItem", position: 3, name: "Multi-Tenant SaaS Product Engineering" },
            { "@type": "ListItem", position: 4, name: "API Gateways, Microservices & Event Architecture" },
            { "@type": "ListItem", position: 5, name: "Legacy System Modernization & Cloud Migration" },
            { "@type": "ListItem", position: 6, name: "Dedicated Offshore Engineering Squads" },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/custom-software-development/#faq`,
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
        "@id": `${baseUrl}/custom-software-development/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
          { "@type": "ListItem", position: 3, name: "Custom Software Development Sri Lanka", item: `${baseUrl}/custom-software-development` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell min-h-screen bg-[#0b0c0b]">
      <a className="skip-link" href="#domains">Skip to Engineering Domains</a>
      <SiteHeader activeSection="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CustomSoftwareClient />
    </main>
  );
}
