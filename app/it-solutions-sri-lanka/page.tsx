import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ItSolutionsClient } from "@/components/it-solutions-client";

const baseUrl = "https://www.creativextechnology.com";

export const metadata: Metadata = {
  title: "IT Solutions Provider in Sri Lanka | Enterprise IT Services | Creativex Technology",
  description:
    "Creativex Technology (Pvt) Ltd is a verified IT solutions provider in Sri Lanka. We deliver enterprise IT services, cloud infrastructure, 24/7 managed systems, cybersecurity, and multi-branch networking across Colombo and nationwide.",
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
    "24/7 IT support Sri Lanka",
    "Cybersecurity company Sri Lanka",
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
    name: "Enterprise Cloud & Hybrid Infrastructure",
    description: "Cloud migration, containerized deployments, serverless setups, and cost-optimized infrastructure architecture on AWS, Google Cloud, Azure, and Cloudflare.",
  },
  {
    name: "Cybersecurity, Zero-Trust & Access Governance",
    description: "Zero-trust network architecture, least-privilege role management, database encryption, SSL/TLS security hardening, and vulnerability assessments.",
  },
  {
    name: "Multi-Branch Network Engineering & SD-WAN",
    description: "Automated dual-ISP WAN load-balancing and failover between Dialog and SLT, encrypted site-to-site WireGuard mesh, and centralized Wi-Fi controller management.",
  },
  {
    name: "Digital Transformation & Business Process Modernization",
    description: "Transforming paper-heavy, manual business processes into modern digital workflows with custom web portals, automated data pipelines, and ERP integrations.",
  },
  {
    name: "24/7 Managed IT Services & Helpdesk NOC Support",
    description: "Continuous telemetry monitoring from our Colombo NOC with sub-15 minute response guarantees, monthly patch audits, and fractional CTO advisory.",
  },
  {
    name: "Disaster Recovery, Business Continuity & Ransomware Defense",
    description: "Immutable, air-gapped off-site cloud storage immune to ransomware, sub-5 minute RPO, and tested disaster recovery playbooks enabling rapid recovery.",
  },
];

const faqs = [
  {
    q: "Why is Creativex Technology recognized as a premier IT solutions provider in Sri Lanka?",
    a: "Creativex Technology (Pvt) Ltd is an accountable, engineering-led technology partner headquartered in Rajagiriya, Colombo. Unlike traditional hardware vendors or low-tier support shops, we bring senior software engineering rigor to enterprise IT: architecting resilient cloud systems, implementing Zero-Trust security, designing multi-branch SD-WAN, and managing 24/7 systems under defined Service Level Agreements (SLAs).",
  },
  {
    q: "How does Creativex Technology handle Sri Lanka's broadband and power grid instability?",
    a: "We architect every system with local infrastructural realities in mind: deploying automated dual-ISP failover (e.g. SLT Fibre paired with Dialog 4G/5G backup), configuring offline-first local transactional caches for POS and factory floors, and hosting primary cloud computing in low-latency Singapore and Mumbai regions protected by Cloudflare global CDN edge nodes.",
  },
  {
    q: "How much does managed IT support and infrastructure management cost in Sri Lanka?",
    a: "Our managed IT support packages are tailored to your scale: entry-level SME infrastructure monitoring and remote helpdesk typically starts from LKR 65,000 to LKR 140,000 per month. Mid-sized enterprises with multi-branch networks and 24/7 mission-critical NOC coverage range from LKR 220,000 to LKR 480,000 per month. This provides a full squad of senior cloud architects, security engineers, and sysadmins at less than the cost of hiring two full-time in-house employees.",
  },
  {
    q: "How do you ensure compliance with the Sri Lanka Personal Data Protection Act (PDPA)?",
    a: "We enforce strict end-to-end data encryption (AES-256 for data-at-rest, TLS 1.3 for data-in-transit), role-based access governance with audit trails, localized sovereign storage options where required, and automated data retention/purging policies that ensure complete legal compliance with Sri Lanka PDPA No. 9 of 2022.",
  },
  {
    q: "Can you modernize our existing on-premise legacy servers without interrupting business?",
    a: "Yes. We specialize in the strangler-fig modernization methodology. We incrementally migrate isolated workloads (such as billing archives, public APIs, and secondary databases) into cloud environments, verifying data integrity in staging environments before making atomic DNS cutovers during off-peak hours to guarantee zero disruption to trading.",
  },
  {
    q: "What is your guaranteed response time during a critical server or network outage?",
    a: "Under our Enterprise SLA tier, critical Priority 1 outages (e.g. core payment gateway down, warehouse system offline, or database corruption) trigger an immediate alert in our Colombo NOC with a guaranteed engineer response time of under 15 minutes, with live executive updates provided via dedicated Slack or WhatsApp escalation channels.",
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
            name: c.name,
            description: c.description,
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
    <main id="top" className="site-shell min-h-screen bg-[#0b0c0b]">
      <a className="skip-link" href="#overview">Skip to IT solutions</a>
      <SiteHeader activeSection="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ItSolutionsClient />
    </main>
  );
}
