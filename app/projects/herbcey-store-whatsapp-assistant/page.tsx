import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Store,
} from "lucide-react";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { HerbceyCaseStudyClient } from "@/components/herbcey-case-study-client";
import { staticProjects } from "@/lib/projects";

const project =
  staticProjects.find((p) => p.slug === "herbcey-store-whatsapp-assistant") ||
  staticProjects[staticProjects.length - 1];

const baseUrl = "https://www.creativextechnology.com";

export const metadata: Metadata = {
  title: "Herbcey Store WhatsApp Assistant — Production Case Study | Creativex Technology",
  description:
    "A production-grade conversational commerce engine for Herbcey featuring Meta Cloud API, live customer consultations, automated orders, and WhatsApp mobile app coexistence with 5-minute human takeover cooldown.",
  keywords: [
    "Herbcey WhatsApp Assistant",
    "WhatsApp Coexistence",
    "Meta Cloud API Webhook",
    "Conversational Commerce",
    "E-Commerce WhatsApp Bot",
    "Order Automation",
    "Creativex Technology Projects",
    "Sri Lanka AI Agency",
  ],
  alternates: {
    canonical: `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
    languages: {
      "en-US": `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
      "x-default": `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
    },
  },
  openGraph: {
    title: "Herbcey Store WhatsApp Assistant — Production Case Study | Creativex Technology",
    description:
      "A production-grade WhatsApp store assistant with Meta Cloud API, live consultations, automated orders, and mobile phone app coexistence.",
    url: `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
    type: "article",
    siteName: "Creativex Technology",
    images: [
      {
        url: `${baseUrl}/images/herbcey-whatsapp-assistant.png`,
        width: 1200,
        height: 630,
        alt: "Herbcey Store WhatsApp Assistant Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbcey Store WhatsApp Assistant — Production Case Study | Creativex Technology",
    description:
      "Production-grade WhatsApp conversational commerce with Meta Cloud API and Echo Active mobile coexistence.",
    images: [`${baseUrl}/images/herbcey-whatsapp-assistant.png`],
  },
};

const workflow = [
  {
    number: "01",
    title: "Inbound Thread Ingestion",
    copy: "Capture buyer inquiries from Meta Click-to-WhatsApp ads, website QR codes, and direct customer messages via verified Meta Cloud API webhooks with sub-second latency.",
  },
  {
    number: "02",
    title: "Product Consultation & SKU Matching",
    copy: "Deliver natural language wellness guidance on herbal formulas, ingredients, and usage, dynamically matching customer questions to live store catalog items.",
  },
  {
    number: "03",
    title: "Automated Order Confirmation",
    copy: "Capture buyer shipping address, contact phone number, and payment preferences directly in the chat, generating a structured order record in the dashboard.",
  },
  {
    number: "04",
    title: "Echo Active Mobile Sync",
    copy: "Mirror all customer threads and bot responses in real-time to the merchant's physical WhatsApp Business mobile app so human staff retain 100% visibility.",
  },
  {
    number: "05",
    title: "Human Takeover Cooldown",
    copy: "When human staff reply on their mobile phone, the assistant detects the outgoing message and enters a 5-minute cooldown to prevent bot collision.",
  },
];

export default function HerbceyCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Herbcey Store WhatsApp Assistant",
    headline: "Live customer inquiries, orders, and WhatsApp mobile app sync",
    description:
      "Production-grade conversational commerce engine and WhatsApp store assistant for Herbcey integrating Meta Cloud API, real-time product consultations, automated orders, and smart WhatsApp coexistence.",
    url: `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Web, WhatsApp, Mobile",
    creator: { "@id": `${baseUrl}/#organization` },
    provider: { "@id": `${baseUrl}/#organization` },
    image: [`${baseUrl}/images/herbcey-whatsapp-assistant.png`],
    about: [
      "Conversational Commerce",
      "WhatsApp Coexistence",
      "Meta Cloud API",
      "Order Automation",
      "Human-in-the-loop AI",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Herbcey — Store WhatsApp Assistant",
        item: `${baseUrl}/projects/herbcey-store-whatsapp-assistant`,
      },
    ],
  };

  return (
    <main id="top" className="site-shell case-study-page">
      <a className="skip-link" href="#case-study-content">
        Skip to case study
      </a>
      <SiteHeader activeSection="projects" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      <div id="case-study-content">
        {/* ── 1. HERO ── */}
        <section className="case-study-hero">
          <div className="case-study-grid" aria-hidden="true" />
          <div className="site-width">
            <Link className="case-study-back" href="/projects">
              <ArrowLeft size={16} /> All projects
            </Link>
            <div className="case-study-hero-layout">
              <div className="case-study-mark" aria-hidden="true">
                <Store />
                <span>09 / CX</span>
              </div>
              <div>
                <p className="section-index">
                  Production System · AI Automation &amp; E-Commerce
                </p>
                <h1>{project.title}</h1>
                <p>
                  {project.headline} A production-grade conversational commerce engine combining
                  Meta Cloud API webhooks with intelligent WhatsApp mobile app coexistence.
                </p>
                <div className="case-study-pills">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. THE OPPORTUNITY & THE PROBLEM SOLVED ── */}
        <section className="case-study-intro">
          <div className="site-width case-study-two-col">
            <p className="section-index">The opportunity / 01</p>
            <div>
              <h2>High customer inquiry volume. Zero frontline staff friction.</h2>
              <p>
                Direct-to-consumer herbal, wellness, and beauty brands in Sri Lanka and regional markets
                rely on WhatsApp as their primary sales channel. With hundreds of inquiries arriving
                daily from Facebook and Instagram Click-to-WhatsApp ads, human response delays lead to
                cart abandonment and wasted ad spend.
              </p>
              <p>
                Traditional chatbot setups create a severe operational bottleneck: they connect exclusively via
                Meta Cloud API and lock store managers out of the official WhatsApp mobile app. Herbcey
                overcomes this with <strong>WhatsApp Coexistence</strong>—allowing AI automation and human sales
                teams to operate harmoniously on the same business phone number without session hijack.
              </p>
              <aside>
                <strong>Production Status</strong>
                <span>
                  Active production deployment for Herbcey Store. Integrates Meta Cloud API v20.0,
                  PostgreSQL conversation state engine, and mobile app echo detection.
                </span>
              </aside>
            </div>
          </div>
        </section>

        {/* ── 3. INTERACTIVE PRODUCTION DASHBOARD SHOWCASE ── */}
        <HerbceyCaseStudyClient />

        {/* ── 4. CONNECTED WORKFLOW ── */}
        <section className="case-study-workflow">
          <div className="site-width">
            <div className="case-study-section-head">
              <p className="section-index">Connected workflow / 02</p>
              <h2>From ad click to confirmed doorstep delivery.</h2>
            </div>
            <div className="case-study-workflow-grid">
              {workflow.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CAPABILITIES & OUTCOMES ── */}
        <section className="case-study-capabilities">
          <div className="site-width case-study-capabilities-grid">
            <p className="section-index">Designed capabilities / 03</p>
            <div>
              {project.capabilities.concat(project.outcomes).map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Check />
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. NEXT STEPS CTA ── */}
        <section className="case-study-next">
          <div className="site-width">
            <p className="section-index">Deploy your store assistant</p>
            <h2>Turn WhatsApp conversations into automated orders.</h2>
            <Link className="contact-action" href="/contact?project=herbcey-store-whatsapp-assistant">
              Discuss an AI WhatsApp Assistant Project <ArrowUpRight />
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
