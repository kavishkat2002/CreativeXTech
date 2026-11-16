import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Cpu,
  Database,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "AI Development Company in Sri Lanka | CreativeX Technology",
  description:
    "CreativeX Technology (Pvt) Ltd is a premier AI development company in Sri Lanka. We build custom AI software, autonomous AI agents, machine learning models, and enterprise automation for businesses in Sri Lanka and Asia-Pacific.",
  keywords: [
    "AI company in Sri Lanka",
    "AI development company in Sri Lanka",
    "Best AI company in Sri Lanka",
    "AI solutions provider in Sri Lanka",
    "AI software development company Sri Lanka",
    "Artificial intelligence company Sri Lanka",
    "Machine learning development company Sri Lanka",
    "Generative AI development company Sri Lanka",
    "AI agent development company Sri Lanka",
    "Enterprise AI solutions Sri Lanka",
    "AI development company in Asia",
  ],
  alternates: {
    canonical: `${baseUrl}/ai-development-sri-lanka`,
    languages: {
      "en-US": `${baseUrl}/ai-development-sri-lanka`,
      "en-LK": `${baseUrl}/ai-development-sri-lanka`,
      "x-default": `${baseUrl}/ai-development-sri-lanka`,
    },
  },
  openGraph: {
    title: "AI Development Company in Sri Lanka | CreativeX Technology",
    description:
      "Custom AI development, machine learning models, autonomous AI agents, and enterprise AI solutions engineered by CreativeX Technology in Colombo, Sri Lanka.",
    url: `${baseUrl}/ai-development-sri-lanka`,
    type: "website",
    siteName: "CreativeX Technology",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "AI Development Company in Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Company in Sri Lanka | CreativeX Technology",
    description:
      "Custom AI development, machine learning, and autonomous agent engineering for enterprises in Sri Lanka and worldwide.",
    images: [`${baseUrl}/og.png`],
  },
};

const aiCapabilities = [
  {
    number: "01",
    title: "Autonomous AI Agents & Multi-Agent Mesh",
    copy: "Task-specific AI agents that understand business context, execute approved actions across ERP/CRM systems, and incorporate human oversight for critical decisions.",
    icon: Bot,
  },
  {
    number: "02",
    title: "Enterprise Machine Learning & Predictive Analytics",
    copy: "Custom predictive models for demand forecasting, inventory optimization, customer churn prediction, and operational anomaly detection.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Generative AI & Enterprise LLM Integration",
    copy: "Fine-tuned large language models, retrieval-augmented generation (RAG), and proprietary knowledge assistants with strict data privacy governance.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Trilingual Conversational AI & WhatsApp Bots",
    copy: "Meta Business API connected AI chatbots supporting English, Sinhala, and Tamil for customer service, order booking, and lead triage in Sri Lanka.",
    icon: Network,
  },
  {
    number: "05",
    title: "Computer Vision & Visual Quality Inspection",
    copy: "Automated optical inspection, barcode recognition, defect identification, and facility monitoring for manufacturing, retail, and logistics.",
    icon: Cpu,
  },
  {
    number: "06",
    title: "AI Strategy, Readiness & Architecture Advisory",
    copy: "Executive AI feasibility studies, data readiness audits, compliance risk mapping, and step-by-step implementation roadmaps.",
    icon: Layers,
  },
];

const faqs = [
  {
    q: "Which company provides AI development services in Sri Lanka?",
    a: "CreativeX Technology (Pvt) Ltd is a verified AI development company in Rajagiriya, Colombo, Sri Lanka. CreativeX builds custom AI solutions, machine learning models, autonomous agent systems, and enterprise data analytics for domestic and international organizations.",
  },
  {
    q: "What types of AI software can CreativeX develop for businesses?",
    a: "CreativeX develops a wide spectrum of production-ready AI software: autonomous workflow agents, WhatsApp conversational chatbots, predictive demand forecasting engines, intelligent document processing pipelines, and AI-powered operational dashboards tailored to retail, logistics, hospitality, and professional services.",
  },
  {
    q: "How much does AI development cost in Sri Lanka?",
    a: "In Sri Lanka, focused AI proof-of-concepts, automated triage workflows, and task-specific AI agents typically range from LKR 450,000 to LKR 1,800,000. Comprehensive enterprise AI deployments, custom model fine-tuning, and multi-system integrations scale upward depending on data readiness, security parameters, and infrastructure requirements.",
  },
  {
    q: "How does CreativeX ensure business data privacy with AI?",
    a: "We implement strict data isolation protocols: zero training on client private data, encrypted API connections, role-based access control, on-premise or sovereign cloud hosting options, and human-in-the-loop approvals for all sensitive business actions.",
  },
  {
    q: "Can foreign companies hire Sri Lankan AI development squads?",
    a: "Yes. CreativeX Technology provides dedicated AI engineering squads for international clients across Australia, the UAE, Malaysia, the UK, and the US, delivering senior engineering capabilities with competitive cost efficiencies and overlapping timezone coverage.",
  },
];

export default function AiDevelopmentSriLankaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}/ai-development-sri-lanka/#service`,
        name: "AI Development Services in Sri Lanka",
        serviceType: "Artificial Intelligence & Machine Learning Engineering",
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Malaysia" },
          { "@type": "Country", name: "Singapore" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        description:
          "Enterprise AI development company in Sri Lanka specializing in autonomous AI agents, machine learning, generative AI, and intelligent enterprise software.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Development Capabilities",
          itemListElement: aiCapabilities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            description: c.copy,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/ai-development-sri-lanka/#faq`,
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
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
          { "@type": "ListItem", position: 3, name: "AI Development Sri Lanka", item: `${baseUrl}/ai-development-sri-lanka` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell services-page">
      <a className="skip-link" href="#ai-content">Skip to AI capabilities</a>
      <SiteHeader activeSection="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero Section */}
      <section className="services-page-hero">
        <div className="services-page-grid" aria-hidden="true" />
        <div className="site-width services-page-hero-layout">
          <p className="section-index">CreativeX AI Engineering / Sri Lanka</p>
          <div>
            <p className="services-page-kicker">Colombo AI Studio · Global Delivery Squads</p>
            <h1>AI Development Company in Sri Lanka</h1>
            <p>
              CreativeX Technology (Pvt) Ltd is a leading Sri Lankan AI engineering consultancy. We design, build, and deploy production-grade artificial intelligence systems—from autonomous AI agents and predictive analytics to generative LLMs—grounded in real business operations.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#ai-capabilities" className="inline-flex items-center gap-2 text-sm text-[#ff5a36] font-medium hover:underline">
                Explore AI capabilities <ArrowDownRight className="w-4 h-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-[#a0a5a0] hover:text-white">
                Book an AI consultation <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <span className="services-page-word" aria-hidden="true">INTELLIGENCE</span>
      </section>

      {/* Executive Answer Section (AEO) */}
      <section id="ai-content" className="about-intro border-t border-[#1e241e] bg-[#0d0f0d] py-16">
        <div className="site-width">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-[#ff5a36] font-bold block mb-2">
              Strategic AI Engineering for Sri Lankan & Regional Enterprises
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-6">
              Dependable AI systems designed for actual enterprise workflows.
            </h2>
            <p className="text-base text-[#a5aaa5] leading-relaxed mb-4">
              Many AI initiatives fail because they treat machine learning as an isolated novelty rather than an integrated component of business operations. At CreativeX, we bridge the gap between machine intelligence and daily workflows. We connect proprietary enterprise data, existing ERP and CRM software, and human decision points to create systems that reduce manual workload, predict operational risks, and accelerate revenue.
            </p>
            <p className="text-base text-[#a5aaa5] leading-relaxed">
              Headquartered in Rajagiriya, Colombo, our team serves prominent enterprises, retail chains, logistics providers, and tech startups across Sri Lanka, Australia, the UAE, and the wider Asia-Pacific region.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section id="ai-capabilities" className="services-directory py-20">
        <div className="site-width">
          <div className="services-directory-head mb-12">
            <div>
              <p className="section-index">Capabilities / 01—06</p>
              <h2>Comprehensive AI Engineering Spectrum</h2>
            </div>
            <p>From initial proof-of-concept to production deployment and monitoring.</p>
          </div>

          <div className="services-directory-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.number} className="service-directory-card p-6 rounded-lg border border-[#1e241e] bg-[#0e100e]">
                  <header className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#ff5a36]">{cap.number}</span>
                    <Icon className="w-5 h-5 text-[#ff5a36]" aria-hidden="true" />
                  </header>
                  <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-[#8c928c] leading-relaxed mb-6">{cap.copy}</p>
                  <div className="service-directory-card-action text-xs text-[#a5aaa5] flex items-center gap-1">
                    <span>Engineered for scale</span>
                    <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proven Delivery Process */}
      <section className="service-process py-20 border-t border-[#1e241e] bg-[#0c0e0c]">
        <div className="site-width">
          <div className="service-detail-heading mb-12">
            <p className="section-index">Methodology / 04 Steps</p>
            <h2>How CreativeX Delivers AI Solutions in Sri Lanka</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <article className="p-6 rounded-lg border border-[#1e241e] bg-[#090b09]">
              <span className="text-xs font-mono text-[#ff5a36] block mb-2">01 / DISCOVERY</span>
              <h3 className="text-base font-semibold text-white mb-2">Workflow & Data Mapping</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                We audit operational bottlenecks, assess data quality, and identify high-ROI automation opportunities before writing code.
              </p>
            </article>
            <article className="p-6 rounded-lg border border-[#1e241e] bg-[#090b09]">
              <span className="text-xs font-mono text-[#ff5a36] block mb-2">02 / PROTOTYPE</span>
              <h3 className="text-base font-semibold text-white mb-2">Rapid Feasibility Sprint</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                We prototype the core intelligence model with representative enterprise data to validate accuracy and performance early.
              </p>
            </article>
            <article className="p-6 rounded-lg border border-[#1e241e] bg-[#090b09]">
              <span className="text-xs font-mono text-[#ff5a36] block mb-2">03 / INTEGRATION</span>
              <h3 className="text-base font-semibold text-white mb-2">Production Engineering</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                We integrate the model with existing ERP, CRM, and databases, incorporating role-based access, observability, and fallback controls.
              </p>
            </article>
            <article className="p-6 rounded-lg border border-[#1e241e] bg-[#090b09]">
              <span className="text-xs font-mono text-[#ff5a36] block mb-2">04 / OPTIMIZATION</span>
              <h3 className="text-base font-semibold text-white mb-2">Monitoring & Governance</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Continuous evaluation, drift detection, and human feedback loops ensure long-term model reliability and compliance.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (AEO/GEO Section) */}
      <section className="faq-section py-20 border-t border-[#1e241e]">
        <div className="site-width max-w-4xl">
          <div className="mb-12">
            <p className="section-index">Knowledge & FAQ</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Frequently Asked Questions on AI Development</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-[#1e241e] bg-[#0e100e]">
                <h3 className="text-base font-semibold text-white mb-3 flex items-start gap-3">
                  <span className="text-[#ff5a36] font-mono text-sm">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-[#a0a5a0] leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links & Strategic Cross-Linking */}
      <section className="py-12 border-t border-[#1e241e] bg-[#090b09]">
        <div className="site-width">
          <p className="text-xs uppercase tracking-wider text-[#ff5a36] font-semibold mb-4">Related Solutions & Strategic Guides</p>
          <div className="flex flex-wrap gap-4 text-xs text-[#8c928c]">
            <Link href="/erp-solutions-sri-lanka" className="hover:text-white underline">
              ERP Solutions Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/custom-software-development" className="hover:text-white underline">
              Custom Software Development
            </Link>
            <span>·</span>
            <Link href="/it-solutions-sri-lanka" className="hover:text-white underline">
              IT Solutions Provider Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/services/ai-automation-agents" className="hover:text-white underline">
              AI Automation & WhatsApp Agents
            </Link>
            <span>·</span>
            <Link href="/creativeos" className="hover:text-white underline">
              CreativeOS Enterprise Work OS
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-white underline">
              Technology Insights & Research
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="services-page-cta py-20 border-t border-[#1e241e]">
        <div className="site-width services-page-cta-layout">
          <p className="section-index">Initiate Your AI Roadmap</p>
          <div>
            <h2>Ready to build high-impact AI software for your enterprise?</h2>
            <p className="text-sm text-[#8c928c] max-w-xl mb-6">
              Speak directly with our senior AI architects in Colombo. We will evaluate your workflow, review technical feasibility, and map a clear delivery plan.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-6 py-3 rounded text-sm font-medium hover:bg-[#e04826] transition-colors">
              Book a Free AI Strategy Session <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

