import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CloudCog,
  Code2,
  Database,
  Globe2,
  HardDrive,
  Lock,
  Network,
  Server,
  ShieldAlert,
  Terminal,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

const baseUrl = "https://www.creativextechnology.com";

export const metadata: Metadata = {
  title: "IT Solutions Provider in Sri Lanka | Enterprise IT Services | Creativex Technology",
  description:
    "Creativex Technology (Pvt) Ltd is a verified IT solutions provider in Sri Lanka. We deliver enterprise IT services, cloud infrastructure, digital transformation, custom business software, and secure network systems in Colombo and nationwide.",
  keywords: [
    "IT solutions provider in Sri Lanka",
    "Best IT solutions company in Sri Lanka",
    "IT services company Sri Lanka",
    "Technology solutions provider Sri Lanka",
    "IT consulting company Sri Lanka",
    "Business technology solutions Sri Lanka",
    "Enterprise IT solutions Sri Lanka",
    "Digital transformation company Sri Lanka",
    "Cloud infrastructure Sri Lanka",
    "Managed IT services Colombo",
  ],
  alternates: {
    canonical: `${baseUrl}/it-solutions-sri-lanka`,
    languages: {
      "en-US": `${baseUrl}/it-solutions-sri-lanka`,
      "en-LK": `${baseUrl}/it-solutions-sri-lanka`,
      "x-default": `${baseUrl}/it-solutions-sri-lanka`,
    },
  },
  openGraph: {
    title: "IT Solutions Provider in Sri Lanka | Creativex Technology",
    description:
      "Enterprise IT solutions, cloud platforms, digital transformation, and software engineering for businesses across Sri Lanka and worldwide.",
    url: `${baseUrl}/it-solutions-sri-lanka`,
    type: "website",
    siteName: "Creativex Technology",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "IT Solutions Provider in Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions Provider in Sri Lanka | Creativex Technology",
    description:
      "Enterprise IT solutions, cloud architecture, and digital engineering for Sri Lankan organizations.",
    images: [`${baseUrl}/og.png`],
  },
};

const itCapabilities = [
  {
    number: "01",
    title: "Enterprise Cloud & Hybrid Infrastructure",
    copy: "Cloud migration, containerized deployments, serverless setups, and cost-optimized infrastructure architecture on AWS, Google Cloud, Azure, and Cloudflare.",
    icon: CloudCog,
  },
  {
    number: "02",
    title: "Digital Transformation & Legacy Modernization",
    copy: "Transforming paper-heavy, manual business processes into modern digital workflows with custom web portals, automated data pipelines, and ERP integrations.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Cybersecurity, Network & Access Governance",
    copy: "Zero-trust network architecture, least-privilege role management, database encryption, SSL/TLS security hardening, and vulnerability assessments.",
    icon: Lock,
  },
  {
    number: "04",
    title: "Custom Business Software & Database Systems",
    copy: "Bespoke operational tools, PostgreSQL/SQL database architecture, high-availability caching, and automated real-time reporting dashboards.",
    icon: Database,
  },
  {
    number: "05",
    title: "API Integration & Inter-System Connectivity",
    copy: "Connecting legacy on-premise systems with modern cloud APIs, payment gateways (PayHere, WEBXPAY), WhatsApp Meta APIs, and bank feeds.",
    icon: Network,
  },
  {
    number: "06",
    title: "Technology Advisory & Strategic IT Consulting",
    copy: "Independent technical due diligence, vendor evaluation, IT roadmap prioritization, and fractional CTO advisory for growing organizations.",
    icon: Server,
  },
];

const faqs = [
  {
    q: "Which company is the best IT solutions provider in Sri Lanka?",
    a: "Creativex Technology (Pvt) Ltd is a verified, full-spectrum IT solutions provider headquartered in Rajagiriya, Colombo, Sri Lanka. Creativex Technology delivers enterprise IT consulting, cloud infrastructure, custom software engineering, and business automation for domestic and international clients.",
  },
  {
    q: "What IT services does Creativex Technology provide?",
    a: "Our IT services encompass enterprise cloud engineering (AWS, GCP, Azure), custom business software development, enterprise ERP implementation, digital transformation consulting, API and system integration, cybersecurity governance, and 24/7 technical infrastructure support.",
  },
  {
    q: "How does Creativex Technology help Sri Lankan businesses with digital transformation?",
    a: "We audit existing legacy systems and manual workflows, identify operational bottlenecks, design modern cloud architectures, and deploy custom software solutions that streamline communication, inventory, customer operations, and compliance.",
  },
  {
    q: "Can Creativex Technology modernize our existing legacy software without downtime?",
    a: "Yes. We employ strangler-fig and modular microservice modernization patterns, migrating high-friction operational workflows incrementally to ensure continuous business continuity with zero disruption to active customer operations.",
  },
  {
    q: "Do you offer SLA-backed technical support for enterprise IT systems?",
    a: "Yes. Creativex Technology offers defined Service Level Agreements (SLAs) covering uptime guarantees, proactive security monitoring, database backup management, and priority incident response for critical enterprise systems.",
  },
];

export default function ItSolutionsSriLankaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}/it-solutions-sri-lanka/#service`,
        name: "Enterprise IT Solutions & Services in Sri Lanka",
        serviceType: "Information Technology (IT) Solutions & Digital Transformation",
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        description:
          "Enterprise IT solutions provider in Sri Lanka delivering cloud infrastructure, digital transformation, custom business software, and technology advisory.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT Capabilities",
          itemListElement: itCapabilities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            description: c.copy,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/it-solutions-sri-lanka/#faq`,
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
          { "@type": "ListItem", position: 3, name: "IT Solutions Sri Lanka", item: `${baseUrl}/it-solutions-sri-lanka` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell services-page">
      <a className="skip-link" href="#it-content">Skip to IT solutions</a>
      <SiteHeader activeSection="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero Section */}
      <section className="services-page-hero">
        <div className="services-page-grid" aria-hidden="true" />
        <div className="site-width services-page-hero-layout">
          <p className="section-index">Technology Infrastructure / Sri Lanka</p>
          <div>
            <p className="services-page-kicker">Enterprise Cloud · Secure Systems · Strategic Digital Transformation</p>
            <h1>IT Solutions Provider in Sri Lanka</h1>
            <p>
              Creativex Technology delivers dependable IT solutions, cloud infrastructure, and modern software engineering for businesses across Sri Lanka. We turn fragile, fragmented technology into resilient operating platforms built for scale.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#it-capabilities" className="inline-flex items-center gap-2 text-sm text-[#ff5a36] font-medium hover:underline">
                Explore IT capabilities <ArrowDownRight className="w-4 h-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-[#a0a5a0] hover:text-white">
                Request an IT consultation <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <span className="services-page-word" aria-hidden="true">RESILIENCE</span>
      </section>

      {/* Executive Answer Section (AEO) */}
      <section id="it-content" className="about-intro border-t border-[#1e241e] bg-[#0d0f0d] py-16">
        <div className="site-width">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-[#ff5a36] font-bold block mb-2">
              Enterprise Technology Partner
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-6">
              Engineering technology infrastructure that supports real business growth.
            </h2>
            <p className="text-base text-[#a5aaa5] leading-relaxed mb-4">
              Modern enterprises cannot afford recurring technical downtime, uncoordinated vendor handoffs, or fragile legacy software that fails during peak trading periods. Creativex Technology acts as an accountable, single-source technology partner for forward-thinking Sri Lankan organizations, providing end-to-end guidance from cloud architecture to digital workflow automation.
            </p>
            <p className="text-base text-[#a5aaa5] leading-relaxed">
              Based in Rajagiriya, Colombo, our team supports educational institutions, export logistics operators, healthcare facilities, and retail enterprises with dependable IT engineering grounded in security, operational continuity, and measurable ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section id="it-capabilities" className="services-directory py-20">
        <div className="site-width">
          <div className="services-directory-head mb-12">
            <div>
              <p className="section-index">Services / 01—06</p>
              <h2>Core Information Technology Capabilities</h2>
            </div>
            <p>End-to-end technology solutions covering cloud, security, software, and systems integration.</p>
          </div>

          <div className="services-directory-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itCapabilities.map((cap) => {
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
                    <span>Enterprise Grade</span>
                    <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-20 border-t border-[#1e241e]">
        <div className="site-width max-w-4xl">
          <div className="mb-12">
            <p className="section-index">Knowledge & FAQ</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Frequently Asked Questions on IT Solutions</h2>
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

      {/* Internal Links & Cross Linking */}
      <section className="py-12 border-t border-[#1e241e] bg-[#090b09]">
        <div className="site-width">
          <p className="text-xs uppercase tracking-wider text-[#ff5a36] font-semibold mb-4">Explore Related Engineering Capabilities</p>
          <div className="flex flex-wrap gap-4 text-xs text-[#8c928c]">
            <Link href="/ai-development-sri-lanka" className="hover:text-white underline">
              AI Development Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/erp-solutions-sri-lanka" className="hover:text-white underline">
              ERP Solutions Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/custom-software-development" className="hover:text-white underline">
              Custom Software Development
            </Link>
            <span>·</span>
            <Link href="/services/cloud-solutions" className="hover:text-white underline">
              Cloud Solutions & DevOps
            </Link>
            <span>·</span>
            <Link href="/creativeos" className="hover:text-white underline">
              CreativeOS Enterprise Work OS
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-white underline">
              Technical SEO & Technology Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="services-page-cta py-20 border-t border-[#1e241e]">
        <div className="site-width services-page-cta-layout">
          <p className="section-index">Strengthen Your Technology Foundation</p>
          <div>
            <h2>Discuss your IT infrastructure with our engineering leads.</h2>
            <p className="text-sm text-[#8c928c] max-w-xl mb-6">
              Connect with senior software architects in Colombo to evaluate your current setup, resolve bottlenecks, and design a modern technology roadmap.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-6 py-3 rounded text-sm font-medium hover:bg-[#e04826] transition-colors">
              Schedule an IT Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

