import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { TalentPoolPanel } from "@/components/talent-pool-panel";
import { CAREERS_BASE_URL } from "@/lib/careers-seo";
import {
  getTalentPoolLevelFromSlug,
  type TalentPoolLevel,
} from "@/lib/talent-pool";

export const dynamic = "force-dynamic";

const baseUrl = CAREERS_BASE_URL;

export const metadata: Metadata = {
  title:
    "Talent Pool (Intern, Associate & Senior Roles) | CreativeX Technology AI",
  description:
    "Join the CreativeX Technology AI Talent Pool for Intern, Associate, and Senior roles in AI systems engineering, full-stack Next.js, product design, and B2B growth.",
  keywords: [
    "CreativeX Talent Pool",
    "AI Engineering Internship Sri Lanka",
    "Associate Software Engineer Talent Pool",
    "Senior AI Systems Engineer Pipeline",
    "CreativeX Technology AI Careers",
  ],
  alternates: {
    canonical: `${baseUrl}/careers/talent-pool`,
    languages: {
      "en-US": `${baseUrl}/careers/talent-pool`,
      "x-default": `${baseUrl}/careers/talent-pool`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title:
      "Talent Pool (Intern, Associate & Senior Roles) | CreativeX Technology AI",
    description:
      "Submit your CV once for priority consideration across Intern, Associate, and Senior level engineering, AI, design, and growth tracks.",
    url: `${baseUrl}/careers/talent-pool`,
    siteName: "CreativeX Technology AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/creativex-robot-lockup.webp`,
        width: 1200,
        height: 630,
        alt: "CreativeX Technology AI Talent Pool",
      },
    ],
  },
};

export default async function TalentPoolPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const resolved = await searchParams;
  const parsedLevel: TalentPoolLevel =
    getTalentPoolLevelFromSlug(resolved?.level) ?? "associate";

  const talentPoolJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/careers/talent-pool#webpage`,
        url: `${baseUrl}/careers/talent-pool`,
        name: "CreativeX Talent Pool — Intern, Associate & Senior Level Roles",
        description:
          "Priority talent pipeline for Intern, Associate, and Senior candidates across AI engineering, full-stack platforms, product design, and B2B sales.",
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Careers",
            item: `${baseUrl}/careers`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Talent Pool",
            item: `${baseUrl}/careers/talent-pool`,
          },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell career-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(talentPoolJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader activeSection="careers" />
      <TalentPoolPanel initialLevel={parsedLevel} />
      <SiteFooter />
    </main>
  );
}

