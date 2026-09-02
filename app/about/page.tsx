import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Bot, BriefcaseBusiness, ChartNoAxesCombined, CloudCog, Code2, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About CreativeX Technology AI | AI & Software Engineering Company",
  description: "Meet CreativeX Technology AI—an AI and software engineering company designing automation, data, IoT, cloud, and digital product systems around real business operations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CreativeX Technology AI",
    description: "AI and software engineering grounded in real operations, responsible delivery, and measurable business outcomes.",
    url: "/about",
    type: "website",
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
    "@type": "AboutPage",
    name: "CreativeX Technology AI",
    url: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/about",
    description: "AI and software engineering company delivering automation, analytics, IoT, cloud, and digital product systems.",
    about: { "@id": "https://creativex-ai.kavishkathilakarathn.chatgpt.site/#organization" },
    inLanguage: "en",
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
        <div className="site-width about-intro-layout">
          <p className="section-index">Company / 01</p>
          <div>
            <h2>Built for the space between an ambitious idea and daily operations.</h2>
            <div className="about-intro-copy">
              <p>CreativeX is an AI and software engineering company for organizations that need more than a model demonstration. We help teams identify the right problem, shape the experience, engineer the system, and introduce it responsibly into real work.</p>
              <p>Our work spans AI agents, predictive analytics, connected operations, cloud platforms, and web and mobile products. Each engagement is grounded in a business outcome, clear human control, production readiness, and measurable delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="site-width">
          <div className="about-section-head">
            <p className="section-index">What we build / 02</p>
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

      <section className="about-contexts">
        <div className="site-width about-contexts-layout">
          <p className="section-index">Where we focus / 03</p>
          <div>
            <h2>Systems shaped by the operating context.</h2>
            <p>CreativeX works across export and logistics, hospitality and smart facilities, retail and distribution, professional services, and AI-native startup products. The technology changes; the discipline of understanding the work does not.</p>
            <div className="about-context-list">
              {["Export & logistics", "Hospitality & smart facilities", "Retail & distribution", "Professional services", "Startups & SaaS products"].map((item, index) => <a href={`/solutions#${["export-logistics", "hospitality-smart-facilities", "retail-distribution", "professional-services", "startups-saas-products"][index]}`} key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight /></a>)}
            </div>
          </div>
        </div>
      </section>

      <section className="about-approach">
        <div className="site-width about-section-head about-section-head-light">
          <p className="section-index">How we deliver / 04</p>
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
