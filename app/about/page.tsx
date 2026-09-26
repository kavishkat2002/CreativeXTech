import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Bot, BriefcaseBusiness, ChartNoAxesCombined, CloudCog, Code2, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { GlobalReachSection } from "@/components/global-reach-section";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "About CreativeX Technology AI | Global AI & Software Engineering Consultancy",
  description: "Learn about CreativeX Technology AI—an elite AI and software engineering consultancy building autonomous AI agents, predictive data analytics, smart IoT operations, and cloud platforms for global businesses.",
  keywords: [
    "About CreativeX Technology AI",
    "AI Consultancy Global",
    "Software Engineering Team",
    "Autonomous AI Agents Expertise",
    "Enterprise AI Solutions Company",
  ],
  alternates: {
    canonical: `${baseUrl}/about`,
    languages: { "en-US": `${baseUrl}/about`, "x-default": `${baseUrl}/about` },
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
    title: "About CreativeX Technology AI",
    description: "Enterprise AI and software engineering grounded in real operations, responsible AI delivery, and measurable business outcomes.",
    url: `${baseUrl}/about`,
    type: "website",
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "About CreativeX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CreativeX Technology AI",
    description: "Enterprise AI and software engineering grounded in real operations, responsible AI delivery, and measurable business outcomes.",
    images: [`${baseUrl}/og.png`],
  },
};

const capabilities = [
  { number: "01", title: "AI Automation & Agents", copy: "Task-specific agents, business knowledge, workflow orchestration, and clear human decision points.", icon: Bot },
  { number: "02", title: "Data & Predictive Analytics", copy: "Reliable data foundations, forecasting models, and decision tools built for operational use.", icon: ChartNoAxesCombined },
  { number: "03", title: "IoT & Smart Operations", copy: "Connected assets, real-time telemetry, alerts, and field workflows that turn signals into action.", icon: RadioTower },
  { number: "04", title: "Web & Mobile Engineering", copy: "Secure customer platforms, internal tools, portals, and mobile products from discovery to release.", icon: Code2 },
  { number: "05", title: "Cloud Solutions", copy: "Resilient platforms with security, observability, delivery, and operating cost designed in from the start.", icon: CloudCog },
  { number: "06", title: "AI Business Consultation", copy: "Readiness assessment, use-case prioritization, governance, and an executable adoption roadmap.", icon: BriefcaseBusiness },
];

const approach = [
  ["01", "Understand the work", "We begin with the people, decisions, systems, data, and constraints inside the real operating environment."],
  ["02", "Prove the behavior", "We prototype the riskiest interaction early, using representative scenarios before committing to a larger build."],
  ["03", "Engineer for production", "We design integrations, permissions, evaluation, observability, and fallback behavior as part of the product."],
  ["04", "Improve with evidence", "We observe use, measure the operating result, and expand only when the evidence supports the next investment."],
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About CreativeX Technology AI",
        url: `${baseUrl}/about`,
        description: "AI and software engineering company delivering automation, analytics, IoT, cloud, and digital product systems worldwide.",
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell about-page">
      <a className="skip-link" href="#about-content">Skip to company overview</a>
      <SiteHeader activeSection="about" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c") }} />

      <section className="about-hero">
        <div className="about-grid-overlay" aria-hidden="true" />
        <div className="site-width about-hero-layout">
          <p className="section-index">About CreativeX / 2026</p>
          <div>
            <p className="about-kicker">AI strategy · Product design · Software engineering</p>
            <h1>Technology should leave the business clearer.</h1>
            <p>CreativeX Technology AI designs intelligent systems around the way people actually work—connecting AI, data, software, cloud, and operations into dependable products.</p>
            <a href="#about-content">Meet the company <ArrowDownRight /></a>
          </div>
        </div>
        <span className="about-hero-word" aria-hidden="true">ABOUT</span>
      </section>

      <section id="about-content" className="about-intro">
        <div className="site-width about-intro-container">
          <div className="about-intro-top">
            <div className="about-intro-heading-col">
              <div className="reach-kicker">
                <span className="reach-kicker-num">02</span>
                <span className="reach-kicker-sep">/</span>
                <span className="reach-kicker-title">OUR STORY</span>
                <span className="reach-kicker-bar" aria-hidden="true" />
              </div>
              <h2>Built for the space between an ambitious idea and daily operations.</h2>
            </div>
            <div className="about-intro-copy-col">
              <p>CreativeX Technology is a Sri Lanka based AI and software engineering company. We help businesses turn complex real-world problems into practical, scalable digital solutions using AI, automation and modern software engineering.</p>
              <p>Our work spans AI agents, predictive analytics, connected operations, cloud platforms, and web & mobile products. Each engagement is grounded in a business outcome, clear human control, production readiness and measurable delivery.</p>
            </div>
          </div>

          <div className="about-intro-divider" aria-hidden="true" />

          <div className="about-intro-stats-grid">
            <div className="about-intro-stat-col">
              <span className="about-intro-stat-label">Markets Reached</span>
              <strong className="about-intro-stat-val">06+</strong>
            </div>
            <div className="about-intro-stat-col">
              <span className="about-intro-stat-label">Projects Delivered</span>
              <strong className="about-intro-stat-val">20+</strong>
            </div>
            <div className="about-intro-stat-col">
              <span className="about-intro-stat-label">Businesses Supported</span>
              <strong className="about-intro-stat-val">50+</strong>
            </div>
            <div className="about-intro-stat-col">
              <span className="about-intro-stat-label">AI & Automation Capabilities</span>
              <strong className="about-intro-stat-val">24/7</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="site-width">
          <div className="about-section-head">
            <div className="reach-kicker">
              <span className="reach-kicker-num">03</span>
              <span className="reach-kicker-sep">/</span>
              <span className="reach-kicker-title">WHAT WE BUILD</span>
              <span className="reach-kicker-bar" aria-hidden="true" />
            </div>
            <div><h2>One technology partner across the operating stack.</h2><p>Strategy and engineering stay connected, so the product is designed for the business context it must survive.</p></div>
          </div>
          <div className="about-capability-grid">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return <article key={capability.number}><header><span>{capability.number}</span><Icon aria-hidden="true" /></header><h3>{capability.title}</h3><p>{capability.copy}</p></article>;
            })}
          </div>
        </div>
      </section>

      <GlobalReachSection />

      <section className="about-approach">
        <div className="site-width about-section-head about-section-head-light">
          <div className="reach-kicker reach-kicker-light">
            <span className="reach-kicker-num">05</span>
            <span className="reach-kicker-sep">/</span>
            <span className="reach-kicker-title">HOW WE DELIVER</span>
            <span className="reach-kicker-bar" aria-hidden="true" />
          </div>
          <div><h2>Senior thinking stays close to the build.</h2><p>Decisions remain visible from the first workflow map through production learning.</p></div>
        </div>
        <div className="site-width about-approach-grid">
          {approach.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="about-cta">
        <div className="site-width about-cta-layout"><p className="section-index">Start with one useful problem</p><div><h2>Let’s work out what the system should do.</h2><a href="/contact">Talk with Team Creative <ArrowUpRight /></a></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
