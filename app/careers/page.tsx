import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Cpu, Globe2, ShieldCheck, Sparkles } from "lucide-react";

import { CareersBoard } from "@/components/careers-board";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getJobs } from "@/lib/careers";
import { TALENT_POOL_TRACKS } from "@/lib/talent-pool";
import {
  CAREERS_BASE_URL,
  buildCareersHubFaqItems,
  buildFaqPageJsonLd,
  buildJobPostingJsonLd,
} from "@/lib/careers-seo";

export const dynamic = "force-dynamic";

const baseUrl = CAREERS_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const jobs = await getJobs();
  const jobTitles = jobs.map((j) => j.title).slice(0, 6);
  const dynamicSkills = Array.from(
    new Set(jobs.flatMap((j) => j.required_skills ?? []))
  ).slice(0, 12);

  const description =
    jobTitles.length > 0
      ? `Explore ${jobs.length} open position${jobs.length === 1 ? "" : "s"} at CreativeX Technology AI (${jobTitles.join(", ")}). Remote & Colombo AI engineering, full-stack, and product design careers.`
      : "Join CreativeX Technology AI. Explore open roles in AI agents, full-stack Next.js engineering, and enterprise product design.";

  return {
    title: "Careers & Open AI Engineering Jobs | CreativeX Technology AI",
    description,
    keywords: [
      "CreativeX Careers",
      "CreativeX Technology AI Jobs",
      "AI Engineer Jobs Sri Lanka",
      "Remote AI Engineering Careers",
      "Next.js Software Engineer Jobs",
      ...jobTitles,
      ...dynamicSkills,
    ],
    alternates: {
      canonical: `${baseUrl}/careers`,
      languages: { "en-US": `${baseUrl}/careers`, "x-default": `${baseUrl}/careers` },
      types: {
        "application/rss+xml": `${baseUrl}/careers/rss.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "Careers & Open AI Engineering Jobs | CreativeX Technology AI",
      description,
      url: `${baseUrl}/careers`,
      siteName: "CreativeX Technology AI",
      locale: "en_US",
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
      title: "Careers & Open AI Engineering Jobs | CreativeX Technology AI",
      description,
      images: [`${baseUrl}/brand/creativex-robot-lockup.webp`],
    },
  };
}

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
    title: "Structured skill matching",
    copy: "Our hiring pipeline evaluates core engineering and design requirements transparently against real project expectations.",
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
  const faqItems = buildCareersHubFaqItems();

  const careersGraphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/careers#webpage`,
        url: `${baseUrl}/careers`,
        name: "Careers & Open Positions at CreativeX Technology AI",
        description:
          "Official hiring portal for CreativeX Technology PVT LTD featuring AI systems engineering, full-stack Next.js, and product design roles.",
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          name: "CreativeX Technology AI",
          url: baseUrl,
        },
        about: {
          "@type": "Organization",
          name: "CreativeX Technology PVT LTD",
          alternateName: "CreativeX Technology AI",
          url: baseUrl,
          logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Careers", item: `${baseUrl}/careers` },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/careers#open-positions`,
        name: "CreativeX Technology AI Open Positions",
        numberOfItems: jobs.length,
        itemListElement: jobs.map((job, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${baseUrl}/careers/${job.slug}`,
          item: buildJobPostingJsonLd(job, baseUrl),
        })),
      },
      buildFaqPageJsonLd(faqItems, `${baseUrl}/careers`),
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
          __html: JSON.stringify(careersGraphJsonLd).replace(/</g, "\\u003c"),
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
              We are a focused engineering and design consultancy building autonomous business agents, logistics control towers, and AI-native web products. Explore open roles across Colombo and remote global squads.
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
                <strong>Direct</strong>
                <span>Online application</span>
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

      {/* CreativeX Talent Pool: Intern, Associate & Senior Tracks */}
      <section
        id="talent-pool"
        className="careers-talent-pool-section"
        aria-labelledby="careers-talent-pool-title"
      >
        <div className="site-width">
          <div className="careers-talent-pool-head">
            <div>
              <p className="section-index">Priority pipeline / 01—03</p>
              <h2 id="careers-talent-pool-title">
                Talent Pool for Intern, Associate &amp; Senior roles.
              </h2>
            </div>
            <p>
              Don&rsquo;t wait for a specific title to open. Submit your profile once to our level-matched Talent Pool and get prioritized before new roles go public.
            </p>
          </div>

          <div className="talent-pool-cards">
            {TALENT_POOL_TRACKS.map((track) => (
              <Link
                key={track.id}
                href={`/careers/talent-pool?level=${track.id}`}
                className="talent-pool-card"
              >
                <div className="talent-pool-card-top">
                  <span>{track.number} / {track.levelLabel}</span>
                  <small>{track.experienceHint}</small>
                </div>
                <h3>{track.title}</h3>
                <p>{track.summary}</p>
                <div className="talent-pool-card-skills">
                  {track.requiredSkills.slice(0, 4).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <div className="talent-pool-card-footer">
                  <span>{track.commitment}</span>
                  <strong>
                    Join {track.levelLabel} Pool <ArrowUpRight size={15} />
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Common FAQ Section */}
      <section className="careers-faq-section" aria-labelledby="careers-faq-title">
        <div className="site-width careers-faq-layout">
          <div>
            <p className="section-index">Common FAQ</p>
            <h2 id="careers-faq-title">Frequently asked questions.</h2>
          </div>
          <div className="careers-faq-list">
            {faqItems.map((faq, idx) => (
              <article key={idx} className="careers-faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="site-width careers-cta-layout">
          <p className="section-index">Don’t see your exact title?</p>
          <div>
            <h2>Tell us what you build best.</h2>
            <Link href="/careers/talent-pool">
              Join the Talent Pool <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
