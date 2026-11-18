import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clock3, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Privacy Policy | CreativeX Technology (Pvt) Ltd",
  description:
    "Learn how CreativeX Technology (Pvt) Ltd collects, uses, processes, and protects personal information when you visit our website or use our technology and digital services.",
  keywords: [
    "Privacy Policy",
    "CreativeX Technology Privacy",
    "Data Protection Sri Lanka",
    "Sri Lanka PDPA Compliance",
    "Enterprise AI Data Security",
    "Confidentiality & Privacy",
  ],
  alternates: {
    canonical: "https://creativexlab.online/privacy-policy",
    languages: {
      "en-US": "https://creativexlab.online/privacy-policy",
      "x-default": "https://creativexlab.online/privacy-policy",
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
    title: "Privacy Policy | CreativeX Technology (Pvt) Ltd",
    description:
      "Learn how CreativeX Technology (Pvt) Ltd collects, uses, processes, and protects personal information when you visit our website or use our technology and digital services.",
    url: `${baseUrl}/privacy-policy`,
    type: "website",
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "CreativeX Technology Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CreativeX Technology (Pvt) Ltd",
    description:
      "Learn how CreativeX Technology (Pvt) Ltd collects, uses, processes, and protects personal information when you visit our website or use our technology and digital services.",
    images: [`${baseUrl}/og.png`],
  },
};

interface PrivacySection {
  id: string;
  number: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: {
    subheading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    number: "01",
    heading: "Introduction & Scope",
    paragraphs: [
      "CreativeX Technology (Pvt) Ltd (\"CreativeX\", \"we\", \"our\", or \"us\") is committed to protecting the privacy, confidentiality, and security of personal information entrusted to us by clients, website visitors, candidates, and partners.",
      "This Privacy Policy describes our practices regarding the collection, storage, processing, transfer, disclosure, and protection of personal data when you visit our corporate website (https://creativexlab.online), engage our enterprise consulting and software engineering services, use our platforms (such as CreativeOS), or communicate with our engineering squads.",
      "By accessing or using our website and services, you acknowledge that you have read, understood, and agreed to the practices outlined in this Privacy Policy.",
    ],
  },
  {
    id: "data-controller",
    number: "02",
    heading: "Company Identity & Data Controller Information",
    paragraphs: [
      "Under applicable data protection laws, including the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022) and international frameworks such as the General Data Protection Regulation (GDPR), the legal entity responsible for processing your personal information is:",
    ],
    bullets: [
      "Company Name: CreativeX Technology (Pvt) Ltd",
      "Company Registration: Registered Private Limited Company under the Companies Act of Sri Lanka",
      "Headquarters: 166 / B Perera Mawatha, Rajagiriya, Colombo, Western Province, Sri Lanka",
      "Corporate Email: info@creativexlab.online",
      "Telephone Hotline: +94 76 2345 336 (076 2345 336)",
      "Official Domain: https://creativexlab.online",
    ],
  },
  {
    id: "data-collected",
    number: "03",
    heading: "Categories of Personal Data We Collect",
    paragraphs: [
      "We collect only the personal information strictly necessary to fulfill our business objectives, provide high-performance engineering deliverables, evaluate prospective employees, and maintain system security.",
    ],
    subsections: [
      {
        subheading: "A. Information You Voluntarily Provide",
        paragraphs: [
          "When you contact us through our website, request a demonstration, register for CreativeOS, or apply for an engineering position, you may provide:",
        ],
        bullets: [
          "Identity & Contact Details: Full name, business email address, phone number, company name, job designation, and country.",
          "Project Enquiries & Specifications: Project briefs, technical requirements, system architectures, desired timelines, and business challenges.",
          "Careers & Talent Pool Data: Curriculum vitae (CV), resume, portfolio URLs, GitHub profiles, LinkedIn credentials, academic qualifications, and employment histories.",
          "Communication Content: Records, notes, and transcripts of communications sent via web forms, direct email, or authorized messaging channels.",
        ],
      },
      {
        subheading: "B. Automatically Collected Technical Telemetry",
        paragraphs: [
          "When you browse our website, our web servers and performance monitors automatically log technical metadata, which may include:",
        ],
        bullets: [
          "Network Identifiers: Internet Protocol (IP) address, approximate geographic location (city/country level), and internet service provider (ISP).",
          "Device & Environment Specs: Browser type, operating system, device manufacturer, screen resolution, and language settings.",
          "Interaction Telemetry: Referring URLs, exit pages, timestamped access logs, page dwell times, and click patterns.",
        ],
      },
    ],
  },
  {
    id: "collection-methods",
    number: "04",
    heading: "How We Collect Your Personal Information",
    paragraphs: [
      "CreativeX Technology collects personal information through fair, lawful, and transparent channels only:",
    ],
    bullets: [
      "Direct Interactions: Directly from you when you submit a project enquiry, fill in the contact form, request a CreativeOS walkthrough, or apply to our open roles.",
      "Electronic Correspondence: When you exchange emails with our executive team, solution architects, or recruitment leads.",
      "Automated Technologies: Through server logs, secure cookies, and non-invasive performance telemetry when you navigate our digital domains.",
      "Client Engagements: Through mutually executed Master Services Agreements (MSAs), Statements of Work (SOWs), and formal scoping workshops.",
    ],
  },
  {
    id: "legal-bases",
    number: "05",
    heading: "Legal Bases for Processing Personal Data",
    paragraphs: [
      "We process your personal information only when authorized by law. Under Sri Lankan and international data protection standards, our processing is based on the following grounds:",
    ],
    bullets: [
      "Consent: You have granted clear, affirmative consent for us to process your personal data for a specific purpose (e.g., submitting a contact inquiry or subscribing to industry research).",
      "Contractual Necessity: Processing is required to prepare, execute, or perform a contract with you or your organization (e.g., delivering software engineering or ERP deployment sprints).",
      "Legitimate Interests: Processing is necessary for our legitimate commercial interests, provided these are not overridden by your fundamental rights (e.g., maintaining infrastructure security, preventing fraud, and optimizing site performance).",
      "Legal & Regulatory Compliance: Processing is necessary to fulfill statutory obligations under Sri Lankan law, tax authorities, or regulatory reporting mandates.",
    ],
  },
  {
    id: "data-usage",
    number: "06",
    heading: "How We Use Your Personal Information",
    paragraphs: [
      "We use the personal information we collect strictly for legitimate business operations and service delivery:",
    ],
    bullets: [
      "Consulting & Solution Delivery: Scoping, architecting, building, deploying, and supporting custom AI models, ERP software, and bespoke web/mobile platforms.",
      "Customer Relations: Responding to inquiries, scheduling technical discovery calls, coordinating sprint reviews, and providing client support.",
      "Talent Acquisition: Reviewing job applications, conducting candidate evaluations, scheduling interviews, and managing our engineering talent pipeline.",
      "Platform Operation & Optimization: Ensuring website availability, monitoring server health, diagnosing technical issues, and improving user experiences.",
      "Security & Fraud Prevention: Protecting our infrastructure, proprietary codebases, intellectual property, and client workloads against malicious activity.",
      "Legal Compliance: Enforcing our contractual terms, protecting our legal rights, and complying with statutory audit and regulatory disclosures.",
    ],
  },
  {
    id: "ai-safeguards",
    number: "07",
    heading: "Artificial Intelligence, Machine Learning & Client Data Safeguards",
    paragraphs: [
      "As a specialized AI consultancy and software development company, CreativeX Technology enforces rigorous data sovereignty and model isolation principles:",
      "1. Zero Customer Data Used for Public Model Training: CreativeX Technology NEVER uses client-provided confidential data, proprietary databases, internal documents, or customer personal information to train or fine-tune public foundation models (such as public models operated by OpenAI, Google, Anthropic, or Meta).",
      "2. Ring-Fenced Enterprise Environments: Client models, Retrieval-Augmented Generation (RAG) vector embeddings, and autonomous agent instances are deployed inside isolated, private tenant environments with strict VPC peering, zero-retention API policies, and end-to-end encryption.",
      "3. 100% Client Intellectual Property: All custom algorithms, trained model weights, database schemas, and application source code engineered under our enterprise agreements remain the exclusive intellectual property of the client.",
      "4. Human-in-the-Loop Governance: Our AI workflows incorporate human oversight, traceability, deterministic fallbacks, and comprehensive audit logs to ensure responsible and ethical AI deployment.",
    ],
  },
  {
    id: "cookies",
    number: "08",
    heading: "Cookies and Tracking Technologies",
    paragraphs: [
      "Our website utilizes cookies and similar lightweight technologies to enhance navigation, maintain security, and analyze aggregate traffic patterns.",
    ],
    bullets: [
      "Strictly Necessary Cookies: Essential for the core functionality of the website (e.g., routing, security sessions, and font delivery). These cannot be disabled.",
      "Performance & Analytical Cookies: Help us understand how visitors interact with our content in an aggregated, anonymous format without identifying individual visitors.",
      "Cookie Control: You can configure your browser to reject or delete cookies. Disabling cookies will not hinder your ability to view or use core sections of our website.",
    ],
  },
  {
    id: "data-sharing",
    number: "09",
    heading: "Information Sharing, Disclosure & Subprocessors",
    paragraphs: [
      "CreativeX Technology does not sell, rent, lease, or monetize personal information to third-party data brokers, marketers, or advertisers under any circumstances.",
      "We disclose personal information only to trusted service providers and subprocessors who assist us in operating our business under strict confidentiality agreements:",
    ],
    bullets: [
      "Cloud Infrastructure Providers: Enterprise hosting and database platforms (e.g., Cloudflare, Amazon Web Services, Supabase) operating under ISO/IEC 27001 and SOC 2 certifications.",
      "Transactional Communications: Secure email infrastructure services (e.g., Resend) used exclusively for delivering business correspondence and contact confirmations.",
      "Professional Advisors: Legal counsel, auditors, and financial accountants under professional confidentiality obligations.",
      "Legal Authorities: Where disclosure is strictly mandated by law, court order, or binding regulatory subpoena in Sri Lanka or relevant jurisdictions.",
    ],
  },
  {
    id: "international-transfers",
    number: "10",
    heading: "International & Cross-Border Data Transfers",
    paragraphs: [
      "CreativeX Technology serves international clients across Sri Lanka, Australia, the United Kingdom, the United Arab Emirates, Malaysia, Singapore, and the United States. Consequently, your data may be stored or processed in jurisdictions outside your country of residence.",
      "Whenever personal data is transferred across international borders, we ensure that an adequate level of data protection is maintained by implementing recognized safeguards:",
    ],
    bullets: [
      "Standard Contractual Clauses (SCCs) approved by international regulatory authorities.",
      "Data Processing Addenda (DPAs) binding subprocessors to equivalent confidentiality and security standards.",
      "End-to-end transport and storage encryption, minimizing risk during international transit.",
    ],
  },
  {
    id: "data-security",
    number: "11",
    heading: "Data Security, Technical & Organizational Safeguards",
    paragraphs: [
      "We implement industry-grade technical, physical, and organizational security measures to protect personal information against unauthorized access, loss, alteration, or disclosure:",
    ],
    bullets: [
      "Cryptographic Protection: Advanced Encryption Standard (AES-256) for data at rest and Transport Layer Security (TLS 1.3) for all data in transit across public networks.",
      "Access Governance: Principle of Least Privilege (PoLP) and strict Role-Based Access Control (RBAC) enforced across all internal workstations and cloud consoles.",
      "Authentication Controls: Mandatory Multi-Factor Authentication (MFA) for all engineering and administrative staff.",
      "Secure Development Lifecycle: Automated dependency vulnerability scanning, static code analysis, and regular security patching.",
      "Incident Response: Defined incident management procedures to identify, contain, and report any potential data breach in accordance with applicable laws.",
    ],
  },
  {
    id: "retention-schedules",
    number: "12",
    heading: "Data Retention and Destruction Schedules",
    paragraphs: [
      "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with legal and tax obligations, resolve disputes, and enforce our contracts.",
    ],
    bullets: [
      "Client & Project Data: Retained for the duration of the commercial relationship plus statutory tax and accounting retention periods (typically 5–7 years in Sri Lanka).",
      "General Inquiries: Retained for up to 12 months following resolution of the conversation, after which records are archived or securely purged.",
      "Job Applicant Records: Retained for up to 12 months to evaluate candidate fit for future open roles, or deleted earlier upon candidate request.",
      "Secure Disposal: Upon expiration of the applicable retention schedule, data is permanently erased from production databases and digital storage media.",
    ],
  },
  {
    id: "your-rights",
    number: "13",
    heading: "Your Data Protection Rights",
    paragraphs: [
      "Depending on your geographic location and applicable data privacy regulations, you are entitled to exercise the following rights regarding your personal information:",
    ],
    bullets: [
      "Right to Access: Request confirmation of whether we hold personal data concerning you and obtain a copy of that data.",
      "Right to Rectification: Request correction of inaccurate, incomplete, or outdated personal information.",
      "Right to Erasure (\"Right to be Forgotten\"): Request deletion of personal data where there is no overriding legal ground for retention.",
      "Right to Restriction of Processing: Request that we suspend active processing of your data in specific circumstances.",
      "Right to Data Portability: Request transfer of your personal data in a structured, commonly used, and machine-readable format.",
      "Right to Object: Object at any time to processing based on legitimate interests or direct marketing.",
      "Right to Withdraw Consent: Withdraw your previously granted consent at any time without affecting the lawfulness of processing carried out prior to withdrawal.",
    ],
  },
  {
    id: "sri-lanka-pdpa",
    number: "14",
    heading: "Compliance with Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022)",
    paragraphs: [
      "CreativeX Technology (Pvt) Ltd is incorporated and domiciled in Sri Lanka and operates in strict compliance with the Personal Data Protection Act, No. 9 of 2022 (PDPA).",
      "We adhere to the core principles established under the Act:",
    ],
    bullets: [
      "Lawful Processing: Ensuring personal data is processed fairly, transparently, and only with valid statutory justification.",
      "Purpose Limitation: Collecting personal data solely for explicit, specified, and legitimate business purposes.",
      "Data Minimization: Restricting collection to information that is adequate, relevant, and strictly necessary.",
      "Accuracy: Maintaining reasonable processes to ensure data is accurate and updated where required.",
      "Storage Limitation: Retaining data no longer than necessary to satisfy stated processing purposes.",
      "Integrity and Confidentiality: Applying robust technical safeguards to protect against unauthorized access, destruction, or damage.",
    ],
  },
  {
    id: "international-frameworks",
    number: "15",
    heading: "Compliance with International Privacy Frameworks (GDPR, UK GDPR & Australian Privacy Principles)",
    paragraphs: [
      "For clients and contacts located in the European Union, the United Kingdom, or Australia:",
    ],
    bullets: [
      "EU & UK GDPR: We process personal data in accordance with Regulation (EU) 2016/679 and the UK Data Protection Act 2018. Where we act as a Data Processor for enterprise clients, our processing is governed by executed Data Processing Agreements (DPAs).",
      "Australian Privacy Principles (APPs): We adhere to the Australian Privacy Principles set out in the Privacy Act 1988 (Cth), ensuring transparent handling, strict cross-border transfer standards, and responsive dispute resolution for Australian partners.",
      "Supervisory Authorities: You have the right to lodge a complaint with your local supervisory authority (e.g., the Information Commissioner's Office in the UK, the OAIC in Australia, or European data protection authorities) if you believe our processing violates applicable law.",
    ],
  },
  {
    id: "childrens-privacy",
    number: "16",
    heading: "Children's and Minors' Privacy",
    paragraphs: [
      "CreativeX Technology's website, platforms, and services are directed strictly at enterprise organizations, commercial businesses, and professionals aged 18 and older.",
      "We do not knowingly collect, solicit, or maintain personal information from children or minors under the age of 18. If we discover that personal information has been collected from a child under 18 without verifiable parental consent, we will promptly purge that information from our servers.",
    ],
  },
  {
    id: "policy-updates",
    number: "17",
    heading: "Amendments and Policy Updates",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our technology stack, service offerings, operational workflows, or statutory data privacy regulations.",
      "Any revisions will be published on this page with an updated \"Last Updated\" date at the top and bottom of the document. For significant updates, we may also provide prominent notifications on our homepage or communicate directly with active client accounts.",
      "We encourage you to review this Privacy Policy periodically to stay informed about how CreativeX Technology protects your data.",
    ],
  },
  {
    id: "contact-information",
    number: "18",
    heading: "Contact Details and Data Protection Inquiries",
    paragraphs: [
      "If you have questions, feedback, or requests concerning this Privacy Policy, or if you wish to exercise any of your data protection rights, please contact our Data Protection Office directly:",
    ],
    bullets: [
      "Attention: Data Protection Office / Legal Governance",
      "Entity: CreativeX Technology (Pvt) Ltd",
      "Address: 166 / B Perera Mawatha, Rajagiriya, Colombo, Western Province, Sri Lanka",
      "Email: info@creativexlab.online",
      "Hotline: +94 76 2345 336 (076 2345 336)",
      "Website: https://creativexlab.online",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const effectiveDate = "January 1, 2026";
  const lastUpdated = "November 17, 2026";

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/privacy-policy#webpage`,
        url: `${baseUrl}/privacy-policy`,
        name: "Privacy Policy | CreativeX Technology (Pvt) Ltd",
        description:
          "Learn how CreativeX Technology (Pvt) Ltd collects, uses, processes, and protects personal information when you visit our website or use our technology and digital services.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${baseUrl}/privacy-policy` },
          ],
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "CreativeX Technology (Pvt) Ltd",
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "166 / B Perera Mawatha",
          addressLocality: "Rajagiriya",
          addressRegion: "Western Province",
          addressCountry: "LK",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+94762345336",
          contactType: "customer service",
          email: "info@creativexlab.online",
        },
      },
    ],
  };

  return (
    <main id="top" className="site-shell article-page">
      <a className="skip-link" href="#article-content">
        Skip to privacy policy content
      </a>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        <header className="article-hero">
          <div className="article-grid-overlay" aria-hidden="true" />
          <div className="site-width">
            <Link className="article-back" href="/">
              <ArrowLeft size={14} /> Back to homepage
            </Link>
            <div className="article-hero-layout">
              <div className="article-number">
                <span>LEGAL</span>
                <small>Governance</small>
              </div>
              <div>
                <p className="section-index">CreativeX Technology (Pvt) Ltd · Governance</p>
                <h1>Privacy Policy</h1>
                <p className="article-deck">
                  Learn how CreativeX Technology (Pvt) Ltd collects, uses, processes, and protects personal information
                  when you visit our website or use our technology and digital services.
                </p>
                <div className="article-byline">
                  <span>CreativeX Legal &amp; Compliance</span>
                  <time dateTime="2026-11-17">Effective: {effectiveDate}</time>
                  <span>
                    <Clock3 size={13} /> Last Updated: {lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="article-content" className="site-width article-layout">
          {/* ── Table of Contents (Sticky Sidebar) ── */}
          <aside className="article-toc" aria-label="Privacy Policy Table of Contents">
            <p>Table of Contents</p>
            <nav>
              {privacySections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{section.number}</span>
                  {section.heading}
                </a>
              ))}
            </nav>
            <div>
              <span>Legal Framework</span>
              <Link
                href="/terms-and-conditions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "var(--signal)",
                  textDecoration: "underline",
                  marginTop: "6px",
                  width: "100%",
                }}
              >
                <FileText size={13} /> View Terms &amp; Conditions <ArrowUpRight size={11} />
              </Link>
              <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <small>Sri Lanka PDPA</small>
                <small>EU &amp; UK GDPR</small>
                <small>Australian APPs</small>
                <small>ISO 27001 Stds</small>
              </div>
            </div>
          </aside>

          {/* ── Privacy Policy Body (All 18 Sections) ── */}
          <div className="article-body">
            <div className="article-section" style={{ paddingBottom: "32px", borderBottom: "1px solid rgba(11, 12, 11, 0.12)" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--ink)", margin: 0 }}>
                This Privacy Policy is issued by <strong>CreativeX Technology (Pvt) Ltd</strong>, registered in Colombo,
                Sri Lanka. We adhere to privacy-by-design engineering principles and prioritize transparent, lawful, and
                secure data processing across all web assets, custom engineering projects, and internal operating frameworks.
                For commercial terms governing software delivery and intellectual property, please review our{" "}
                <Link href="/terms-and-conditions" style={{ color: "var(--signal)", fontWeight: "600", textDecoration: "underline" }}>
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>

            {privacySections.map((section) => (
              <section id={section.id} className="article-section" key={section.id}>
                <div className="article-section-label">
                  <span>{section.number}</span>
                  <i />
                </div>
                <h2>{section.heading}</h2>

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}

                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <Check size={14} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections &&
                  section.subsections.map((sub, sIdx) => (
                    <div key={sIdx} style={{ marginTop: "24px" }}>
                      <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "16px 0 10px", color: "var(--ink)" }}>
                        {sub.subheading}
                      </h3>
                      {sub.paragraphs.map((subPara, spIdx) => (
                        <p key={spIdx}>{subPara}</p>
                      ))}
                      {sub.bullets && (
                        <ul>
                          {sub.bullets.map((subBullet, sbIdx) => (
                            <li key={sbIdx}>
                              <Check size={14} />
                              <span>{subBullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </section>
            ))}

            {/* ── Bottom Summary & Certification Card (Redesigned Modern User-Friendly Card) ── */}
            <section
              style={{
                marginTop: "48px",
                background: "#ffffff",
                border: "1px solid rgba(11, 12, 11, 0.12)",
                borderTop: "3px solid var(--signal)",
                borderRadius: "16px",
                padding: "36px 32px",
                boxShadow: "0 14px 34px -10px rgba(11, 12, 11, 0.08), 0 2px 6px -2px rgba(11, 12, 11, 0.03)",
              }}
            >
              {/* Header Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255, 90, 54, 0.09)",
                    color: "var(--signal)",
                    border: "1px solid rgba(255, 90, 54, 0.22)",
                    borderRadius: "9999px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <ShieldCheck size={13} /> Data Protection Office
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "rgba(11, 12, 11, 0.04)",
                    color: "rgba(11, 12, 11, 0.72)",
                    borderRadius: "9999px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <Check size={12} style={{ color: "#16a34a" }} /> Annual Audit 2026 Active
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "rgba(11, 12, 11, 0.04)",
                    color: "rgba(11, 12, 11, 0.72)",
                    borderRadius: "9999px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <Check size={12} style={{ color: "#16a34a" }} /> Sri Lanka PDPA Compliant
                </span>
              </div>

              {/* Title & Description */}
              <h2
                style={{
                  fontSize: "clamp(1.65rem, 2.8vw, 2.15rem)",
                  fontWeight: "700",
                  lineHeight: "1.25",
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  margin: "0 0 12px",
                }}
              >
                Commitment to Transparency
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "rgba(11, 12, 11, 0.72)",
                  margin: "0 0 24px",
                  maxWidth: "720px",
                }}
              >
                CreativeX Technology (Pvt) Ltd reviews and audits its data handling practices annually. If you have any
                inquiries, wish to exercise statutory data subject rights, or require data deletion, reach out directly
                to our Data Protection and Compliance team:
              </p>

              {/* Actionable Contact Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "14px",
                  marginBottom: "24px",
                }}
              >
                <a
                  href="mailto:info@creativexlab.online"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(11, 12, 11, 0.025)",
                    border: "1px solid rgba(11, 12, 11, 0.08)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  className="hover:border-[#ff5a36] hover:bg-[#fff9f8] transition-colors"
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255, 90, 54, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--signal)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "rgba(11, 12, 11, 0.55)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Direct DPO Email
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--ink)",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      info@creativexlab.online
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--signal)",
                        marginTop: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        fontWeight: "600",
                      }}
                    >
                      Send inquiry <ArrowUpRight size={11} />
                    </div>
                  </div>
                </a>

                <a
                  href="tel:0762345336"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(11, 12, 11, 0.025)",
                    border: "1px solid rgba(11, 12, 11, 0.08)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  className="hover:border-[#ff5a36] hover:bg-[#fff9f8] transition-colors"
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255, 90, 54, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--signal)",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "rgba(11, 12, 11, 0.55)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Hotline &amp; Telephone
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", marginTop: "2px" }}>
                      076 2345 336
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--signal)",
                        marginTop: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        fontWeight: "600",
                      }}
                    >
                      Call directly <ArrowUpRight size={11} />
                    </div>
                  </div>
                </a>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(11, 12, 11, 0.025)",
                    border: "1px solid rgba(11, 12, 11, 0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255, 90, 54, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--signal)",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "rgba(11, 12, 11, 0.55)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Registered Office
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "var(--ink)",
                        marginTop: "2px",
                        lineHeight: "1.4",
                      }}
                    >
                      166 / B Perera Mawatha, Rajagiriya, Colombo
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(11, 12, 11, 0.55)", marginTop: "3px" }}>
                      Sri Lanka
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Fast Cross-Link Bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderTop: "1px solid rgba(11, 12, 11, 0.08)",
                  paddingTop: "18px",
                  fontSize: "12px",
                  color: "rgba(11, 12, 11, 0.6)",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)" }}>
                  <Clock3 size={13} style={{ color: "var(--signal)" }} />
                  <span>
                    Last Updated: {lastUpdated} · Effective: {effectiveDate} · Colombo, Sri Lanka
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Link
                    href="/terms-and-conditions"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: "600",
                      color: "var(--signal)",
                      textDecoration: "underline",
                    }}
                  >
                    <FileText size={13} /> Terms &amp; Conditions <ArrowUpRight size={11} />
                  </Link>
                  <a
                    href="#top"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: "600",
                      color: "rgba(11, 12, 11, 0.7)",
                      textDecoration: "none",
                    }}
                    className="hover:text-black transition-colors"
                  >
                    Back to top ↑
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
