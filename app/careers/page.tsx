import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Cpu, Globe2, ShieldCheck, Sparkles } from "lucide-react";

import { CareersBoard } from "@/components/careers-board";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getJobs } from "@/lib/careers";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Careers & AI Engineering Roles | CreativeX Technology AI",
  description:
    "Join CreativeX Technology AI. Explore open roles in AI agents, full-stack Next.js engineering, and enterprise product design with instant ATS skill matching.",
  keywords: [
    "CreativeX Careers",
    "AI Systems Engineer Jobs",
    "Next.js Engineer Sri Lanka",
    "Remote AI Engineering Roles",
    "Product Designer AI",
    "CreativeX Technology AI Jobs",
  ],
  alternates: {
    canonical: `${baseUrl}/careers`,
    languages: { "en-US": `${baseUrl}/careers`, "x-default": `${baseUrl}/careers` },
  },
  openGraph: {
    title: "Careers at CreativeX Technology AI",
    description:
      "Build deterministic AI agents, edge web platforms, and enterprise operating systems with CreativeX.",
    url: `${baseUrl}/careers`,
    siteName: "CreativeX Technology AI",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/creativex-robot-lockup.webp`,
        width: 1200,
        height: 630,
        alt: "Careers at CreativeX Technology AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at CreativeX Technology AI",
    description:
      "Explore open roles in AI agents, full-stack Next.js engineering, and enterprise product design.",
    images: [`${baseUrl}/brand/creativex-robot-lockup.webp`],
  },
};

const principles = [
  {
    number: "01",
    icon: Cpu,
    title: "Ship real systems",
    copy: "We build production AI agents, control towers, and edge applications—not slideware prototypes.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Transparent ATS matching",
    copy: "Our hiring workflow detects your core stack automatically and filters job requirements openly—no black-box resume ghosting.",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Colombo studio, global reach",
    copy: "Collaborate across time zones with outcome-driven remote flexibility and async engineering rigor.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "High ownership, zero bloat",
    copy: "Small senior-leaning squads where engineers and designers talk directly to systems and customers.",
  },
];

export default async function CareersPage() {
  const jobs = await getJobs();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${baseUrl}/careers` },
    ],
  };

  return (
    <main id="top" className="site-shell careers-page">
      <a className="skip-link" href="#open-roles">
        Skip to open roles
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader activeSection="careers" />

      <section className="careers-hero">
        <div className="careers-hero-grid" aria-hidden="true" />
        <div className="site-width careers-hero-inner">
          <p className="section-index">CreativeX careers / 2026</p>
          <div>
            <p className="careers-kicker">
              AI engineering · Edge platforms · Systems design
            </p>
            <h1>Work on systems that actually operate.</h1>
            <p>
              We are a focused engineering and design consultancy building autonomous business agents, logistics control towers, and AI-native web products. Upload your CV to auto-detect ATS compatibility and filter roles that fit your craft.
            </p>
            <a href="#open-roles">
              Explore open roles <ArrowDownRight />
            </a>

            <div className="careers-hero-stats">
              <div>
                <strong>{String(jobs.length).padStart(2, "0")}</strong>
                <span>Active roles</span>
              </div>
              <div>
                <strong>ATS</strong>
                <span>Instant JD matching</span>
              </div>
              <div>
                <strong>Hybrid</strong>
                <span>Colombo &amp; Remote</span>
              </div>
            </div>
          </div>
        </div>
        <span className="careers-hero-word" aria-hidden="true">
          TALENT
        </span>
      </section>

      <section className="careers-principles">
        <div className="site-width careers-principles-grid">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.number}>
                <div className="careers-principle-top">
                  <span>{item.number}</span>
                  <Icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CareersBoard initialJobs={jobs} />

      <section className="careers-cta">
        <div className="site-width careers-cta-layout">
          <p className="section-index">Don’t see your exact title?</p>
          <div>
            <h2>Tell us what you build best.</h2>
            <Link href="/contact">
              Start an introduction <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

