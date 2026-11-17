import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ChevronUp, Clock3, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Terms & Conditions | CreativeX Technology (Pvt) Ltd",
  description:
    "Read the Terms & Conditions of CreativeX Technology (Pvt) Ltd covering website usage, software development, AI solutions, intellectual property, payments, project delivery, and service agreements.",
  keywords: [
    "Terms and Conditions",
    "CreativeX Technology Terms",
    "Software Development Agreement",
    "Enterprise AI Service Terms",
    "Master Services Agreement Sri Lanka",
    "Intellectual Property Terms",
  ],
  alternates: {
    canonical: "https://creativexlab.online/terms-and-conditions",
    languages: {
      "en-US": "https://creativexlab.online/terms-and-conditions",
      "x-default": "https://creativexlab.online/terms-and-conditions",
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
    title: "Terms & Conditions | CreativeX Technology (Pvt) Ltd",
    description:
      "Read the Terms & Conditions of CreativeX Technology (Pvt) Ltd covering website usage, software development, AI solutions, intellectual property, payments, project delivery, and service agreements.",
    url: `${baseUrl}/terms-and-conditions`,
    type: "website",
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "CreativeX Technology Terms and Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | CreativeX Technology (Pvt) Ltd",
    description:
      "Read the Terms & Conditions of CreativeX Technology (Pvt) Ltd covering website usage, software development, AI solutions, intellectual property, payments, project delivery, and service agreements.",
    images: [`${baseUrl}/og.png`],
  },
};

interface TermsSection {
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

const termsSections: TermsSection[] = [
  {
    id: "acceptance-of-terms",
    number: "01",
    heading: "Introduction & Acceptance of Terms",
    paragraphs: [
      "These Terms and Conditions (\"Terms\", \"Agreement\") constitute a legally binding agreement between you (whether individually or on behalf of an enterprise entity, \"Client\", \"User\", or \"you\") and CreativeX Technology (Pvt) Ltd (\"CreativeX\", \"Company\", \"we\", \"us\", or \"our\"), a private limited company incorporated and operating under the laws of the Democratic Socialist Republic of Sri Lanka.",
      "These Terms govern your access to and use of the CreativeX Technology website (https://creativexlab.online), digital tools, client portals (including the CreativeX Employee Management System and CreativeOS demo environments), and any commercial software engineering, artificial intelligence (AI) consulting, ERP implementation, mobile development, or cloud architecture services provided by us.",
      "By accessing our website, executing a Statement of Work (SOW), submitting a project brief, or engaging our engineering squads, you explicitly represent that you have read, understood, and agreed to be bound by these Terms in full. If you do not agree to these Terms, you must immediately discontinue use of our website and services.",
    ],
  },
  {
    id: "definitions",
    number: "02",
    heading: "Definitions & Interpretation",
    paragraphs: [
      "In these Terms, unless the context otherwise requires, capitalized terms shall have the meanings ascribed below:",
    ],
    bullets: [
      "\"Deliverables\" means all custom source code, documentation, software configurations, database schemas, algorithms, user interfaces, wireframes, and project artifacts specifically engineered for and delivered to Client under a mutually executed Statement of Work.",
      "\"Statement of Work\" (SOW) means any formal written proposal, quotation, scope document, or sprint agreement executed between CreativeX and Client specifying technical deliverables, milestones, fees, and timelines.",
      "\"Intellectual Property Rights\" (IPR) means all patents, copyrights, database rights, design rights, trademarks, trade secrets, moral rights, and confidential technical know-how worldwide.",
      "\"Client Content\" means all data, documentation, branding assets, credentials, proprietary data, and technical specifications provided by Client to CreativeX for project execution.",
      "\"CreativeX Background IP\" means all pre-existing software libraries, architectural frameworks, boilerplate templates, utility modules, and internal development tools owned or licensed by CreativeX prior to or independently of the SOW.",
    ],
  },
  {
    id: "scope-of-services",
    number: "03",
    heading: "Scope of Services & Engagement Models",
    paragraphs: [
      "CreativeX Technology provides premium technical consulting and full-stack software development services across four primary operational disciplines:",
      "1. Artificial Intelligence & Machine Learning: Engineering autonomous AI agents, Retrieval-Augmented Generation (RAG) vector pipelines, natural language processing tools, predictive analytics, and trilingual conversational systems (English, Sinhala, Tamil).",
      "2. Enterprise ERP & Automation Systems: Designing bespoke cloud ERP platforms, multi-warehouse inventory systems, procurement tracking, and compliance workflows with zero recurring per-seat software license fees.",
      "3. Custom Software & Digital Products: Building high-performance Next.js web applications, Flutter mobile apps (iOS & Android), microservices backends, and multi-tenant SaaS architectures.",
      "4. Cloud Infrastructure & Security Governance: Setting up cloud architectures on AWS, Cloudflare, and Supabase, implementing automated CI/CD pipelines, container orchestration, and zero-trust network configurations.",
      "Services may be delivered through Fixed-Scope Milestone sprints, Dedicated Agile Offshore Squads, or Time & Materials (T&M) consulting arrangements as specified in the applicable SOW.",
    ],
  },
  {
    id: "statements-of-work",
    number: "04",
    heading: "Statements of Work (SOW) & Project Scoping",
    paragraphs: [
      "Each commercial engagement between CreativeX and Client shall be documented in an individual Statement of Work (SOW). Each SOW shall set forth technical specifications, acceptance criteria, milestone schedules, financial budgets, and designated project coordinators.",
      "In the event of any direct conflict or inconsistency between the terms of an executed SOW and these general Terms and Conditions, the provisions of the specific SOW shall prevail solely with respect to the deliverables covered therein.",
      "No verbal commitment, discussion, or email exchange shall alter the scope of an SOW unless formalized in writing through our structured Change Request Process.",
    ],
  },
  {
    id: "client-responsibilities",
    number: "05",
    heading: "Client Responsibilities, Dependencies & Cooperation",
    paragraphs: [
      "Successful delivery of enterprise software solutions requires timely collaboration and active input from the Client. The Client agrees to:",
    ],
    bullets: [
      "Designate a Point of Contact: Appoint a qualified technical or operational Project Sponsor authorized to make binding approvals and clarify requirements without delay.",
      "Provide Timely Dependencies: Furnish necessary third-party API credentials, staging server access, domain DNS configurations, brand guidelines, and test data in a timely manner.",
      "Prompt Feedback & Approvals: Review milestone deliverables, sprint demos, and user acceptance testing (UAT) releases within five (5) business days of submission by CreativeX.",
      "Accreditation of Data: Guarantee that all data, images, text, and technical materials provided to CreativeX are legally owned by Client or properly licensed, free from third-party infringement.",
    ],
  },
  {
    id: "intellectual-property",
    number: "06",
    heading: "Intellectual Property Rights & Deliverables Ownership",
    paragraphs: [
      "CreativeX operates on an uncompromised client ownership model for custom commercial software engagements:",
      "1. Transfer of Custom Deliverables: Upon full and final settlement of all applicable invoices and project fees under the SOW, CreativeX assigns to Client all right, title, and interest in and to the custom Deliverables engineered specifically for Client.",
      "2. 100% Client Code Ownership: Client maintains full ownership of custom application source code, databases, business logic, workflows, and user interfaces, with zero recurring vendor lock-in or proprietary licensing barriers.",
      "3. Client Content: All trademarks, trade secrets, confidential customer data, and proprietary assets supplied by Client remain the sole and exclusive property of Client throughout the engagement.",
    ],
  },
  {
    id: "background-ip",
    number: "07",
    heading: "Pre-Existing IP, Frameworks & Background Technology",
    paragraphs: [
      "CreativeX retains sole ownership of all CreativeX Background IP, including proprietary software engines (e.g., core components of CreativeOS), internal boilerplates, algorithmic libraries, and standard developer utilities developed independently of the SOW.",
      "To the extent any CreativeX Background IP or standard open-source library is incorporated into a Deliverable, CreativeX hereby grants Client a perpetual, irrevocable, worldwide, non-exclusive, royalty-free license to use, execute, reproduce, and maintain such Background IP solely as integrated within the Deliverable.",
    ],
  },
  {
    id: "ai-data-sovereignty",
    number: "08",
    heading: "Artificial Intelligence, Model Training & Data Sovereignty",
    paragraphs: [
      "Given CreativeX Technology's core specialization in enterprise AI systems, we establish strict, enforceable commitments regarding data sovereignty:",
      "1. No Training on Public Models: CreativeX Technology NEVER uses client confidential data, customer records, database inputs, or proprietary code to train, fine-tune, or calibrate public artificial intelligence foundation models (including those of OpenAI, Google, Anthropic, or Meta).",
      "2. Private Vector Embeddings & RAG Isolation: All document vector embeddings, knowledge bases, and custom RAG indexes engineered for Client are strictly isolated within Client's dedicated virtual private tenant or cloud sandbox.",
      "3. Commercial API Privacy Protections: Where commercial model APIs are integrated, CreativeX enforces enterprise zero-data-retention (ZDR) agreements and encryption policies to guarantee that third-party model providers do not retain or train on Client telemetry.",
      "4. Deterministic Guardrails: Autonomous agents and LLM tools engineered by CreativeX incorporate strict verification layers, audit trails, and human-in-the-loop controls to prevent hallucination risks.",
    ],
  },
  {
    id: "confidentiality",
    number: "09",
    heading: "Confidentiality & Non-Disclosure",
    paragraphs: [
      "\"Confidential Information\" refers to all non-public information disclosed by one party (\"Disclosing Party\") to the other party (\"Receiving Party\"), whether orally or in writing, including source code, trade secrets, business strategies, pricing structures, customer lists, and system architectures.",
      "The Receiving Party agrees to: (a) protect Confidential Information with the same degree of care it uses for its own confidential assets (and not less than reasonable care); (b) not disclose Confidential Information to any third party except authorized employees, contractors, and legal advisors on a need-to-know basis; and (c) use Confidential Information strictly for performing obligations under this Agreement.",
      "Confidentiality obligations shall persist for a period of five (5) years following the termination of this Agreement, save that trade secrets and proprietary algorithms shall be maintained confidential in perpetuity.",
    ],
  },
  {
    id: "data-protection",
    number: "10",
    heading: "Data Protection, Security & Compliance",
    paragraphs: [
      "Both parties agree to comply with applicable data protection regulations, including the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022) and, where applicable, the EU/UK General Data Protection Regulation (GDPR) and the Australian Privacy Principles (APPs).",
      "Where CreativeX processes personal data on behalf of Client during software testing, data migration, or system hosting, CreativeX acts strictly as a Data Processor and shall execute a formal Data Processing Addendum (DPA) incorporating technical security measures.",
      "For comprehensive details on how CreativeX Technology collects, stores, and processes information, please review our official Privacy Policy at https://creativexlab.online/privacy-policy.",
    ],
  },
  {
    id: "payment-terms",
    number: "11",
    heading: "Fees, Payment Terms, Taxes & Currency",
    paragraphs: [
      "Client shall pay all fees specified in the mutually approved Statement of Work or invoice according to the following financial terms:",
    ],
    bullets: [
      "Milestone Invoicing: Fixed-price sprint projects are invoiced in accordance with agreed milestone delivery schedules (e.g., initial mobilization advance, milestone completion, and final UAT sign-off).",
      "Payment Timeline: All invoices are payable within fourteen (14) calendar days from the invoice date, unless explicitly agreed otherwise in writing.",
      "Currency: Payments may be invoiced and settled in Sri Lankan Rupees (LKR), United States Dollars (USD), Australian Dollars (AUD), or British Pounds (GBP) as specified in the SOW.",
      "Taxes & Levies: Fees are exclusive of applicable government taxes, Value Added Tax (VAT), Simplified VAT (SVAT), or withholding taxes, which shall be borne by Client in accordance with statutory regulations.",
      "Late Payments: Overdue balances unpaid after thirty (30) days from the due date may accrue interest at the rate of 1.5% per month or the maximum statutory rate permitted under Sri Lankan law.",
    ],
  },
  {
    id: "change-requests",
    number: "12",
    heading: "Change Request Process & Scope Adjustments",
    paragraphs: [
      "If Client or CreativeX identifies a requirement to modify project specifications, add new functional modules, or adjust delivery schedules, the following Change Request Process shall apply:",
      "1. Submission: The requesting party shall submit a written description of the requested scope enhancement.",
      "2. Impact Assessment: CreativeX shall evaluate the technical feasibility and provide a formal Change Order detailing the impact on project costs, technical dependencies, and milestone delivery dates.",
      "3. Approval: No change shall take effect until both parties have formally executed the Change Order in writing. CreativeX shall continue work under the original SOW pending approval.",
    ],
  },
  {
    id: "milestone-acceptance",
    number: "13",
    heading: "Project Timelines, Milestone Delivery & Acceptance Testing",
    paragraphs: [
      "CreativeX shall use commercially reasonable efforts to deliver project milestones in accordance with the timelines estimated in the SOW. Target dates represent good-faith technical projections dependent on Client inputs and third-party API availability.",
      "Upon completion of a sprint or milestone, CreativeX will deploy Deliverables to a staging environment for Client User Acceptance Testing (UAT). Client shall have ten (10) business days to review and test the Deliverables against the agreed specifications.",
      "If Client does not report any substantiated non-conformities in writing within the 10-day UAT review window, or if Client deploys the Deliverables into live production, the Deliverables shall be deemed accepted in full.",
    ],
  },
  {
    id: "warranties",
    number: "14",
    heading: "Warranties, Guarantees & Bug-Fix Period",
    paragraphs: [
      "CreativeX warrants that:",
      "1. Professional Standards: Services will be performed in a professional, workmanlike manner adhering to high engineering standards and industry best practices.",
      "2. Thirty (30) Day Warranty Period: Unless extended by a formal SLA, CreativeX provides a thirty (30) calendar day warranty starting immediately upon final UAT acceptance. During this warranty window, CreativeX will rectify any demonstrable, reproducible bugs or deviations from the SOW specifications at no additional cost.",
      "3. Exclusions: This warranty does not cover issues resulting from Client's unauthorized code alterations, third-party hosting failures, deprecated external APIs, or hardware malfunctions.",
      "4. Disclaimer: Except as explicitly stated herein, software Deliverables are provided on an \"as is\" and \"as available\" basis without warranties of uninterrupted or error-free operation.",
    ],
  },
  {
    id: "limitation-of-liability",
    number: "15",
    heading: "Limitation of Liability & Consequential Damages Exclusion",
    paragraphs: [
      "To the maximum extent permitted under applicable law:",
      "1. Exclusion of Indirect Damages: Neither party shall be liable to the other for any indirect, incidental, special, exemplary, punitive, or consequential damages, including loss of profits, loss of revenue, business interruption, loss of goodwill, or loss of corrupted data, even if advised of the possibility of such damages.",
      "2. Aggregate Liability Cap: The total cumulative liability of CreativeX Technology (Pvt) Ltd arising out of or related to this Agreement or any SOW, whether in contract, tort (including negligence), or otherwise, shall not exceed the total fees actually received by CreativeX under the specific Statement of Work giving rise to the claim during the twelve (12) months preceding the event.",
    ],
  },
  {
    id: "indemnification",
    number: "16",
    heading: "Indemnification & Third-Party Claims",
    paragraphs: [
      "1. CreativeX Indemnity: CreativeX agrees to defend and indemnify Client against substantiated third-party claims alleging that the custom software Deliverables (excluding Client Content and open-source packages) infringe any copyright or trademark valid in Sri Lanka, provided Client promptly notifies CreativeX in writing and allows CreativeX sole control over the defense.",
      "2. Client Indemnity: Client agrees to defend, indemnify, and hold harmless CreativeX, its directors, officers, and engineers from any claims, damages, or legal expenses arising out of: (a) Client Content or materials infringing third-party rights; (b) Client's violation of applicable laws; or (c) unauthorized use of software Deliverables in breach of these Terms.",
    ],
  },
  {
    id: "termination",
    number: "17",
    heading: "Term, Suspension & Termination Provisions",
    paragraphs: [
      "This Agreement commences upon your first access to our website or execution of an SOW and remains in effect until terminated in accordance with this Section:",
      "1. Termination for Convenience: Unless otherwise stipulated in an SOW, either party may terminate an ongoing project agreement for convenience by providing thirty (30) calendar days' advance written notice to the other party.",
      "2. Termination for Material Breach: Either party may terminate this Agreement immediately if the other party breaches any material term and fails to remedy such breach within fourteen (14) calendar days of receiving written notice specifying the breach.",
      "3. Insolvency: Either party may terminate immediately if the other party becomes insolvent, enters into liquidation, or makes an assignment for the benefit of creditors.",
      "4. Right of Suspension: CreativeX reserves the right to suspend ongoing engineering sprints and access to hosted staging sandboxes if invoiced payments remain overdue beyond fourteen (14) days.",
    ],
  },
  {
    id: "consequences-of-termination",
    number: "18",
    heading: "Consequences of Termination & Handover Protocols",
    paragraphs: [
      "Upon termination of an SOW or this Agreement for any reason:",
      "1. Payment for Completed Work: Client shall immediately pay CreativeX for all completed Deliverables, billable engineering hours, and non-cancellable third-party commitments incurred up to the effective termination date.",
      "2. Code Handover: Subject to full payment of all amounts due, CreativeX will deliver to Client all completed and work-in-progress code files, repositories, database backups, and documentation.",
      "3. Return of Confidential Assets: Each party will promptly return or destroy all Confidential Information of the other party in its possession.",
      "4. Survival: Provisions regarding Intellectual Property, Confidentiality, Limitation of Liability, Indemnification, Governing Law, and Severability shall survive termination.",
    ],
  },
  {
    id: "third-party-services",
    number: "19",
    heading: "Third-Party Services, APIs & Cloud Providers",
    paragraphs: [
      "CreativeX software architectures frequently integrate enterprise third-party platforms, such as cloud infrastructure (AWS, Cloudflare, Supabase), payment gateways (Stripe, PayHere), communication APIs (Meta WhatsApp Business Cloud API, Resend), and external AI model endpoints.",
      "CreativeX is not responsible for unexpected outages, pricing revisions, rate limiting, or policy updates imposed by third-party API providers. Any third-party software licensing fees, domain registrations, or hosting consumption charges shall be billed directly to Client by the respective providers.",
    ],
  },
  {
    id: "support-maintenance",
    number: "20",
    heading: "Software Support, SLA & Maintenance Engagements",
    paragraphs: [
      "Following the expiration of the initial 30-day warranty period, ongoing technical maintenance, security patch updates, operational monitoring, and feature enhancements are governed by a separate Service Level Agreement (SLA) or monthly retainer agreement.",
      "In the absence of an active SLA or support retainer, any maintenance requests, technical troubleshooting, bug resolutions, or server migrations will be estimated and billed at CreativeX's standard hourly or sprint consulting rates.",
    ],
  },
  {
    id: "non-solicitation",
    number: "21",
    heading: "Non-Solicitation of Personnel",
    paragraphs: [
      "To protect CreativeX's investment in elite engineering talent, Client agrees that during the term of any active engagement and for a period of twelve (12) months following its conclusion, Client shall not directly or indirectly solicit, recruit, employ, or contract with any software engineer, consultant, or employee of CreativeX who was directly involved in the project.",
      "If Client breaches this non-solicitation covenant, Client agrees to pay CreativeX as liquidated damages an amount equal to 50% of the relevant employee's annual gross compensation.",
    ],
  },
  {
    id: "force-majeure",
    number: "22",
    heading: "Force Majeure & Unforeseen Events",
    paragraphs: [
      "Neither party shall be held liable or deemed in default for any failure or delay in performing its obligations under this Agreement (other than payment obligations) resulting from acts of God, war, civil disturbance, terrorism, national grid power failures, widespread telecommunications blackouts, government embargoes, natural disasters, or pandemics.",
      "The affected party shall promptly notify the other in writing and use reasonable efforts to resume performance as soon as practically possible.",
    ],
  },
  {
    id: "dispute-resolution",
    number: "23",
    heading: "Dispute Resolution, Negotiation & Arbitration",
    paragraphs: [
      "1. Informal Executive Negotiation: In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the designated executive representatives of both parties shall meet within fourteen (14) calendar days to resolve the dispute amicably.",
      "2. Commercial Arbitration: If the dispute is not settled through executive negotiations within thirty (30) calendar days, it shall be referred to and finally resolved by commercial arbitration in accordance with the Arbitration Act No. 11 of 1995 of Sri Lanka or the Rules of the Sri Lanka National Arbitration Centre (SLNAC).",
      "3. Language & Seat: The seat of arbitration shall be Colombo, Sri Lanka, and proceedings shall be conducted in the English language.",
    ],
  },
  {
    id: "governing-law",
    number: "24",
    heading: "Governing Law & Legal Jurisdiction",
    paragraphs: [
      "These Terms and Conditions, all Statements of Work, and any contractual or non-contractual claims arising hereunder shall be governed by, construed, and enforced in accordance with the substantive laws of the Democratic Socialist Republic of Sri Lanka, without regard to conflict of law principles.",
      "Subject to Section 23 (Dispute Resolution), the courts located in Colombo, Sri Lanka shall have exclusive jurisdiction over any legal proceedings arising out of this Agreement.",
    ],
  },
  {
    id: "severability",
    number: "25",
    heading: "Severability, Entire Agreement & Waiver",
    paragraphs: [
      "1. Severability: If any provision of these Terms is determined by a court of competent jurisdiction to be invalid, unlawful, or unenforceable, such provision shall be severed from the remainder of the Terms, which shall continue in full force and effect.",
      "2. Entire Agreement: These Terms, together with any executed SOWs and the Privacy Policy, constitute the complete and exclusive understanding between the parties regarding the subject matter hereof, superseding all prior oral or written agreements.",
      "3. Waiver: The failure of either party to enforce any right or provision of these Terms shall not be deemed a waiver of such right or future enforcement.",
    ],
  },
  {
    id: "amendments",
    number: "26",
    heading: "Amendments, Modifications & Versioning",
    paragraphs: [
      "CreativeX Technology reserves the right to modify or replace these Terms and Conditions periodically to reflect evolving legal frameworks, technological capabilities, and service models.",
      "Revisions will become effective immediately upon publication on this page with an updated \"Last Updated\" timestamp. Your continued use of our website or engagement of our engineering services after any update constitutes full acceptance of the revised Terms.",
    ],
  },
  {
    id: "notices-contact",
    number: "27",
    heading: "Notices, Communications & Official Corporate Contact Information",
    paragraphs: [
      "All formal notices, legal demands, or inquiries regarding these Terms and Conditions shall be delivered in writing to the following official corporate channels:",
    ],
    bullets: [
      "Legal Entity: CreativeX Technology (Pvt) Ltd",
      "Corporate Headquarters: 166 / B Perera Mawatha, Rajagiriya, Colombo, Western Province, Sri Lanka",
      "Legal & Business Email: info@creativexlab.online",
      "Direct Hotline: +94 76 2345 336 (076 2345 336)",
      "Official Domain: https://creativexlab.online",
      "Privacy Policy Reference: https://creativexlab.online/privacy-policy",
    ],
  },
];

export default function TermsAndConditionsPage() {
  const effectiveDate = "January 1, 2026";
  const lastUpdated = "November 17, 2026";

  const termsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/terms-and-conditions#webpage`,
        url: `${baseUrl}/terms-and-conditions`,
        name: "Terms & Conditions | CreativeX Technology (Pvt) Ltd",
        description:
          "Read the Terms & Conditions of CreativeX Technology (Pvt) Ltd covering website usage, software development, AI solutions, intellectual property, payments, project delivery, and service agreements.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: `${baseUrl}/terms-and-conditions` },
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
        Skip to terms and conditions content
      </a>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd).replace(/</g, "\\u003c") }}
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
                <span>TERMS</span>
                <small>Commercial</small>
              </div>
              <div>
                <p className="section-index">CreativeX Technology (Pvt) Ltd · Master Agreement</p>
                <h1>Terms &amp; Conditions</h1>
                <p className="article-deck">
                  Read the Terms &amp; Conditions of CreativeX Technology (Pvt) Ltd covering website usage, software
                  development, AI solutions, intellectual property, payments, project delivery, and service agreements.
                </p>
                <div className="article-byline">
                  <span>CreativeX Legal &amp; Governance</span>
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
          <aside className="article-toc" aria-label="Terms and Conditions Table of Contents">
            <p>Table of Contents</p>
            <nav style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
              {termsSections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{section.number}</span>
                  {section.heading}
                </a>
              ))}
            </nav>
            <div>
              <span>Related Legal Documents</span>
              <Link
                href="/privacy-policy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "var(--signal)",
                  textDecoration: "underline",
                  marginTop: "6px",
                }}
              >
                <ShieldCheck size={13} /> View Privacy Policy <ArrowUpRight size={11} />
              </Link>
            </div>
          </aside>

          {/* ── Terms Body (All 27 Sections) ── */}
          <div className="article-body">
            <div
              className="article-section"
              style={{ paddingBottom: "32px", borderBottom: "1px solid rgba(11, 12, 11, 0.12)" }}
            >
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--ink)", margin: 0 }}>
                These Terms and Conditions govern commercial software engineering, artificial intelligence (AI) consulting,
                custom ERP delivery, and website usage provided by <strong>CreativeX Technology (Pvt) Ltd</strong>. For data
                protection, telemetry, and privacy commitments, please also refer to our official{" "}
                <Link href="/privacy-policy" style={{ color: "var(--signal)", fontWeight: "600", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {termsSections.map((section) => (
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

            {/* ── Bottom Summary & Cross-Link Card ── */}
            <section className="article-takeaways">
              <p className="section-index">Master Legal Framework</p>
              <h2>Questions Regarding These Terms?</h2>
              <p>
                If your organization requires a dedicated Master Services Agreement (MSA), customized Service Level
                Agreement (SLA), or specific Statement of Work (SOW) review, our executive and legal team is available to
                assist. Contact us directly at{" "}
                <a href="mailto:info@creativexlab.online" style={{ color: "var(--signal)", textDecoration: "underline" }}>
                  info@creativexlab.online
                </a>{" "}
                or call our hotline at{" "}
                <a href="tel:0762345336" style={{ color: "var(--signal)", textDecoration: "underline" }}>
                  076 2345 336
                </a>
                .
              </p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderTop: "1px solid rgba(11, 12, 11, 0.12)",
                  paddingTop: "16px",
                }}
              >
                <div style={{ fontSize: "12px", color: "rgba(11, 12, 11, 0.55)", fontFamily: "var(--font-mono)" }}>
                  Last Updated: {lastUpdated} · Effective: {effectiveDate} · Colombo, Sri Lanka
                </div>
                <a
                  href="#top"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--signal)",
                    textDecoration: "none",
                  }}
                >
                  <ChevronUp size={14} /> Back to top
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

