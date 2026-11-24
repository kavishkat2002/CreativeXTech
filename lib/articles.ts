import { supabaseSelect } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  media_url?: string;
};

export type ArticleReference = {
  label: string;
  href: string;
};

export type Article = {
  slug: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  sections: ArticleSection[];
  takeaways: string[];
  references: ArticleReference[];
  media_url?: string;
};

// ─── Database row → Article mapper ────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Article {
  return {
    slug: row.slug,
    number: row.number,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    publishedDate: row.published_date,
    updatedDate: row.updated_date,
    readTime: row.read_time,
    featured: row.featured ?? false,
    tags: row.tags ?? [],
    sections: row.sections ?? [],
    takeaways: row.takeaways ?? [],
    references: row.references ?? [],
    media_url: row.media_url,
  };
}

// ─── Static Fallback Data ───────────────────────────────────────────────────

export const staticArticles: Article[] = [
  {
    slug: "generative-engine-optimization-practical-guide",
    number: "01",
    category: "Generative discovery",
    title: "Generative Engine Optimization: a practical technical guide",
    excerpt: "A grounded framework for making useful business content easier for search engines and AI answer systems to find, understand, and reference.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "8 min read",
    featured: true,
    tags: ["GEO", "SEO", "Content systems"],
    sections: [
      {
        id: "what-geo-is",
        heading: "GEO is an extension of discoverability—not a shortcut",
        paragraphs: [
          "Generative Engine Optimization, or GEO, describes work intended to improve how content appears in answers assembled by generative search systems. The term was formalized in research that treats these systems as a new discovery interface with its own visibility questions.",
          "For a business, the useful interpretation is simple: publish material that is technically accessible, unambiguous, evidence-led, and genuinely helpful. Google's current guidance frames optimization for its generative features as part of SEO—not a separate collection of hacks.",
        ],
      },
      {
        id: "strong-foundation",
        heading: "Build the foundation before optimizing the answer",
        paragraphs: [
          "An AI system cannot reliably use a page it cannot discover or interpret. Clear information architecture, descriptive page titles, internal links, stable URLs, fast delivery, and indexable HTML remain the operational baseline.",
        ],
        bullets: [
          "Give every important service, solution, and case study a focused canonical page.",
          "Use descriptive headings that match the questions decision-makers actually ask.",
          "Connect related pages with contextual links instead of relying only on navigation menus.",
          "Keep core explanations in accessible HTML and make important evidence easy to verify.",
        ],
      },
      {
        id: "answer-quality",
        heading: "Design information that can survive summarization",
        paragraphs: [
          "Strong answer-ready content establishes the subject early, defines unfamiliar terms, separates facts from opinion, and supports claims with primary sources. It should still read naturally to a person; artificial repetition and mass-produced pages weaken trust.",
          "Use concise summaries where they improve comprehension, then provide the context, method, limitations, and examples a serious reader needs. The goal is not to write for a robot. It is to remove ambiguity for every reader.",
        ],
      },
      {
        id: "measurement",
        heading: "Measure business progress, not citation theatre",
        paragraphs: [
          "Generative visibility changes quickly and differs by system, prompt, location, and time. Treat mentions and citations as directional signals. Connect them to qualified visits, demo requests, assisted conversions, and the questions sales teams hear from prospects.",
          "Run a repeatable query set, record the sources surfaced, and improve pages only when the change also makes the content more accurate or useful. Visibility without relevance is not a business outcome.",
        ],
      },
    ],
    takeaways: [
      "Treat GEO as discoverability work built on technical SEO and people-first content.",
      "Make claims explicit, attributable, and easy to verify.",
      "Evaluate visibility alongside qualified business outcomes.",
    ],
    references: [
      { label: "Google: Optimizing for generative AI features", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { label: "Aggarwal et al.: GEO research paper", href: "https://arxiv.org/abs/2311.09735" },
      { label: "Google: Helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
  },
  {
    slug: "structured-data-entities-evidence",
    number: "02",
    category: "Semantic systems",
    title: "Structured data, entities, and evidence: making your business easier to understand",
    excerpt: "How consistent naming, clear relationships, first-party proof, and valid schema help machines interpret what your company actually does.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "7 min read",
    featured: false,
    tags: ["Structured data", "Entities", "Schema.org"],
    sections: [
      {
        id: "clarity-first",
        heading: "Start with clarity in the visible page",
        paragraphs: [
          "Structured data is a description of page content, not a replacement for it. Before adding markup, make the company name, service, audience, location, authorship, and evidence clear to a person reading the page.",
          "Use the same core naming across the website, business profiles, social accounts, and trusted directories. Consistency reduces ambiguity; it does not require every description to be identical.",
        ],
      },
      {
        id: "choose-schema",
        heading: "Choose schema that matches the page",
        paragraphs: [
          "Use Organization details for the business, Service where a page describes an offering, and Article or TechArticle for editorial content. Mark up only information that is present and accurate. More properties do not automatically produce a better result.",
        ],
        bullets: [
          "Use JSON-LD that reflects the primary purpose of the page.",
          "Keep names, dates, authors, and canonical URLs synchronized with visible content.",
          "Validate syntax and monitor reports after deployment.",
          "Never manufacture ratings, reviews, or credentials for markup.",
        ],
      },
      {
        id: "evidence-layer",
        heading: "Build an evidence layer around important claims",
        paragraphs: [
          "A credible technology company should show how it works, not only what it promises. Case studies, named methods, technical documentation, security practices, and appropriately attributed research give readers a path to verification.",
          "When a result cannot be publicly named, label the work as representative rather than implying a verified client outcome. Precision is a stronger brand signal than inflated proof.",
        ],
      },
    ],
    takeaways: [
      "Visible clarity comes before machine-readable markup.",
      "Use the narrowest accurate schema type for each page.",
      "Treat evidence and honest labeling as part of information architecture.",
    ],
    references: [
      { label: "Google: Introduction to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "Schema.org: TechArticle", href: "https://schema.org/TechArticle" },
      { label: "Schema.org: Organization", href: "https://schema.org/Organization" },
    ],
  },
  {
    slug: "technical-seo-ai-software-companies",
    number: "03",
    category: "Technical SEO",
    title: "Technical SEO for AI and software companies: foundations that compound",
    excerpt: "A practical architecture for turning complex services, products, documentation, and case studies into a site people and crawlers can navigate.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "7 min read",
    featured: false,
    tags: ["Technical SEO", "SaaS", "Architecture"],
    sections: [
      {
        id: "intent-map",
        heading: "Map the site to the buyer's information journey",
        paragraphs: [
          "AI companies often compress several distinct ideas into one homepage: capabilities, industries, products, methods, and proof. That creates a striking pitch but a weak research experience. Give each durable topic its own page and connect it to the next logical question.",
        ],
        bullets: [
          "Service pages explain what the team can deliver and how engagements work.",
          "Solution pages connect capabilities to a specific operating context.",
          "Project pages show constraints, system design, human controls, and outcomes.",
          "Articles answer technical and commercial questions with depth.",
        ],
      },
      {
        id: "crawlable-system",
        heading: "Make the publishing system crawlable by default",
        paragraphs: [
          "Use stable descriptive URLs, server-rendered core content, canonical metadata, a maintained sitemap, and crawlable internal links. Avoid hiding essential information inside interactions that require a person to reveal every state.",
          "A clean error strategy matters too: removed content should return a meaningful status, redirects should be intentional, and duplicate routes should converge on one canonical location.",
        ],
      },
      {
        id: "operations",
        heading: "Treat SEO as an operating practice",
        paragraphs: [
          "Technical quality decays when ownership is unclear. Add metadata, internal linking, accessibility, performance, and structured-data checks to the same definition of done used for product releases.",
          "Monitor indexing, query coverage, broken links, template regressions, and conversions. The compounding advantage comes from a system that stays coherent as the company grows.",
        ],
      },
    ],
    takeaways: [
      "Separate services, solutions, projects, and editorial knowledge into clear page types.",
      "Keep primary information server-rendered, linked, and addressable.",
      "Make discoverability part of release quality—not a cleanup project.",
    ],
    references: [
      { label: "Google: Search Engine Optimization Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Google: Creating helpful content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
  },

  {
    slug: "ai-development-companies-sri-lanka-guide",
    number: "04",
    category: "AI Engineering",
    title: "AI Development Companies in Sri Lanka: How to Choose the Right Partner",
    excerpt: "A practical evaluation framework for business leaders seeking to select an artificial intelligence development company in Sri Lanka, focusing on engineering capability, data security, and verifiable production delivery.",
    publishedDate: "2026-10-15",
    updatedDate: "2026-10-15",
    readTime: "7 min read",
    tags: ["AI Development Sri Lanka", "AI Companies Colombo", "Enterprise AI Partner"],
    sections: [
      {
        id: "evaluating-ai-partners",
        heading: "Look beyond conversational hype to production engineering",
        paragraphs: [
          "The commercial interest surrounding artificial intelligence has led many conventional IT agencies in Sri Lanka to rebrand as AI companies. For decision-makers, evaluating an AI development partner requires looking beyond generic chatbot wrappers and wrapper scripts.",
          "A competent AI engineering partner demonstrates deep competence in data engineering, retrieval-augmented generation (RAG) architecture, local or sovereign model hosting, and strict role-based access control. The right partner asks about your data lineage and operational bottlenecks before pitching algorithms.",
        ],
      },
      {
        id: "core-evaluation-criteria",
        heading: "Four essential criteria for selecting an AI vendor in Colombo",
        paragraphs: [
          "First, verify data privacy and security governance. Ensure that your proprietary business data will never be ingested for public model training. Second, evaluate system integration capability—an AI model must connect with your existing ERP, CRM, and communication channels.",
          "Third, insist on human-in-the-loop controls. Automated workflows must include transparent confidence scoring, fallback behavior, and approval mechanisms for high-consequence business actions.",
        ],
        bullets: [
          "Strict data isolation and zero third-party training on client data",
          "Seamless REST/GraphQL API integration with ERP and CRM platforms",
          "Transparent human-in-the-loop review thresholds for automated decisions",
          "Defined SLAs for model latency, drift monitoring, and uptime",
        ],
      },
      {
        id: "creativex-approach",
        heading: "How Creativex Technology approaches enterprise AI delivery",
        paragraphs: [
          "At Creativex Technology (Pvt) Ltd in Rajagiriya, Colombo, we design AI systems grounded in real operational work. Our squads build autonomous AI agents, predictive demand forecasting models, and omnichannel WhatsApp bots designed for measurable business results.",
          "We offer fixed-scope discovery prototypes allowing enterprises to prove economic value and operational feasibility before committing to full-scale rollout.",
        ],
      },
    ],
    takeaways: [
      "Prioritize vendors with verified production engineering and data security over superficial AI demos.",
      "Ensure the proposed AI system integrates natively with your existing business management software.",
      "Insist on transparent human-in-the-loop oversight for consequential operational decisions.",
    ],
    references: [
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
      { label: "Google Cloud: Responsible AI Principles", href: "https://cloud.google.com/responsible-ai" },
    ],
  },
  {
    slug: "how-ai-is-transforming-sri-lankan-businesses",
    number: "05",
    category: "Business Transformation",
    title: "How AI Is Transforming Sri Lankan Businesses",
    excerpt: "Examining practical, real-world applications of artificial intelligence across Sri Lankan export logistics, retail chains, hospitality, and manufacturing.",
    publishedDate: "2026-10-20",
    updatedDate: "2026-10-20",
    readTime: "6 min read",
    tags: ["Sri Lanka Business", "Enterprise AI", "Operational Automation"],
    sections: [
      {
        id: "operational-reality",
        heading: "From speculative innovation to daily operational efficiency",
        paragraphs: [
          "Across Sri Lanka, forward-thinking enterprises are shifting away from experimental AI novelties toward high-impact operational deployments. In logistics, predictive analytics engines anticipate shipping exceptions and container delays before port congestion strikes.",
          "In multi-branch retail, automated inventory intelligence models analyze historical sales patterns against festive seasons and currency fluctuations to prevent stockouts while reducing excess working capital lockup.",
        ],
      },
      {
        id: "sector-breakdown",
        heading: "Key industry applications in the Sri Lankan economy",
        paragraphs: [
          "In the hospitality sector, smart facility algorithms monitor energy consumption across hotel properties, balancing guest comfort with peak tariff reduction. In professional services, automated document triage models extract key contract clauses, invoice data, and compliance records in seconds.",
        ],
        bullets: [
          "Export & Logistics: Predictive shipment tracking and automated customs document validation",
          "Retail & Distribution: Demand forecasting and automated supplier purchase order generation",
          "Hospitality: Automated multilingual guest inquiries and energy optimization",
          "Customer Support: Trilingual WhatsApp customer service bots operating 24/7",
        ],
      },
    ],
    takeaways: [
      "AI creates the greatest ROI when deployed into high-friction, repetitive business processes.",
      "Sri Lankan enterprises can begin with focused modular deployments rather than high-risk overhauls.",
      "Predictive data analytics turns fragmented operational logs into actionable executive decisions.",
    ],
    references: [
      { label: "Creativex Technology: Industry AI Solutions", href: "/solutions" },
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
    ],
  },
  {
    slug: "ai-automation-small-business-sri-lanka",
    number: "06",
    category: "Automation",
    title: "AI Automation for Small Businesses in Sri Lanka",
    excerpt: "A practical guide for Sri Lankan SMEs to implement accessible, low-friction AI workflow automation that reduces overhead and accelerates customer response times.",
    publishedDate: "2026-10-25",
    updatedDate: "2026-10-25",
    readTime: "5 min read",
    tags: ["SME Automation", "Sri Lanka AI", "Business Efficiency"],
    sections: [
      {
        id: "sme-automation-opportunity",
        heading: "Automating routine tasks without enterprise budgets",
        paragraphs: [
          "Small and medium enterprises (SMEs) in Sri Lanka often face severe staffing constraints, with founders and key managers bogged down by manual quotation drafting, invoice reconciliation, and customer messaging.",
          "AI automation provides a level playing field. By connecting messaging apps like WhatsApp with cloud databases, SMEs can automate lead qualification, quotation dispatch, and payment reminders around the clock.",
        ],
      },
      {
        id: "low-friction-entrypoints",
        heading: "Where small businesses should begin automating",
        paragraphs: [
          "The highest ROI entry points for Sri Lankan SMEs include automated WhatsApp customer inquiries, digital receipt processing, and social media lead routing. These workflows require minimal technical restructuring and deliver immediate productivity gains.",
        ],
      },
    ],
    takeaways: [
      "AI automation helps SMEs operate with enterprise responsiveness without massive payroll overhead.",
      "Begin by automating high-volume, repetitive interactions such as WhatsApp customer FAQs.",
      "Ensure all automated workflows connect directly into a single central customer record.",
    ],
    references: [
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
      { label: "Creativex Technology: CreativeOS Work OS for SMEs", href: "/creativeos" },
    ],
  },
  {
    slug: "how-to-choose-erp-provider-sri-lanka",
    number: "07",
    category: "Enterprise Systems",
    title: "How to Choose an ERP Provider in Sri Lanka",
    excerpt: "Key evaluation criteria, technical requirements, and strategic questions for Sri Lankan enterprises selecting an enterprise resource planning software partner.",
    publishedDate: "2026-10-28",
    updatedDate: "2026-10-28",
    readTime: "8 min read",
    tags: ["ERP Sri Lanka", "ERP Provider Colombo", "Enterprise Software"],
    sections: [
      {
        id: "erp-partner-evaluation",
        heading: "Selecting a partner for the central backbone of your business",
        paragraphs: [
          "An Enterprise Resource Planning (ERP) system is the central nervous system of any growing business. Choosing the wrong software partner leads to extended implementation delays, workflow resistance, and ballooning consulting invoices.",
          "When evaluating ERP providers in Sri Lanka, leadership teams must scrutinize local compliance support (VAT, SVAT, EPF/ETF), architectural flexibility, and the long-term total cost of ownership (TCO).",
        ],
      },
      {
        id: "critical-questions",
        heading: "Five questions to ask every ERP vendor in Sri Lanka",
        paragraphs: [
          "1. What is the total cost of ownership over 5 years, including user seat expansion? 2. Will our business own the custom code, or are we locked into proprietary licenses? 3. How does the system handle Sri Lankan statutory tax updates? 4. Can the platform connect with third-party APIs like banks and WhatsApp? 5. What is the guaranteed SLA for on-site or remote emergency support?",
        ],
      },
    ],
    takeaways: [
      "Avoid vendors with opaque pricing models that penalize your company as employee headcount grows.",
      "Verify that the ERP platform natively supports local Sri Lankan tax and reporting compliance.",
      "Insist on an API-first architecture that allows seamless future integrations.",
    ],
    references: [
      { label: "Creativex Technology: Enterprise & Industry Solutions", href: "/solutions" },
      { label: "Creativex Technology: Retail & Distribution Solution", href: "/solutions" },
    ],
  },
  {
    slug: "custom-erp-vs-ready-made-erp",
    number: "08",
    category: "Enterprise Systems",
    title: "Custom ERP vs Ready-Made ERP: What Sri Lankan Enterprises Need to Know",
    excerpt: "An in-depth architectural and financial comparison between custom ERP development and commercial off-the-shelf software packages like SAP, NetSuite, and Odoo.",
    publishedDate: "2026-11-01",
    updatedDate: "2026-11-01",
    readTime: "7 min read",
    tags: ["Custom ERP", "Off-The-Shelf ERP", "ERP Comparison Sri Lanka"],
    sections: [
      {
        id: "the-dilemma",
        heading: "The true financial and operational trade-offs",
        paragraphs: [
          "Enterprise leaders frequently debate whether to purchase commercial off-the-shelf (COTS) ERP software or invest in custom ERP development. While ready-made software promises rapid deployment, it frequently leads to expensive customization workarounds.",
          "Custom ERP development by Creativex Technology offers an alternative: 100% intellectual property ownership, zero per-seat monthly license fees, and software designed precisely around your company's operational differentiators.",
        ],
      },
      {
        id: "financial-comparison",
        heading: "Total Cost of Ownership (TCO) breakdown over 5 years",
        paragraphs: [
          "While off-the-shelf software appears cheaper upfront, recurring per-user fees and mandatory annual support charges escalate dramatically over 3 to 5 years. A company with 50 users often pays tens of thousands of dollars in licensing fees alone.",
          "With custom ERP, the initial capital expenditure creates a lasting digital asset that can scale to hundreds of users across multiple branches without incurring license penalties.",
        ],
      },
    ],
    takeaways: [
      "Custom ERP delivers 100% source code ownership and eliminates recurring user seat taxes.",
      "Ready-made ERP often requires costly ongoing customization to match local operational workflows.",
      "For businesses with unique distribution or manufacturing workflows, custom ERP provides a decisive competitive edge.",
    ],
    references: [
      { label: "Creativex Technology: Enterprise & Industry Solutions", href: "/solutions" },
      { label: "Creativex Technology: Custom Software Development", href: "/services/custom-software-development" },
    ],
  },
  {
    slug: "erp-vs-pos-difference-retail-sri-lanka",
    number: "09",
    category: "Retail & Distribution",
    title: "ERP vs POS: Understanding the Difference for Retail and Distribution",
    excerpt: "Clarifying the critical operational differences between simple Point-of-Sale software and comprehensive Enterprise Resource Planning systems for expanding retail chains in Sri Lanka.",
    publishedDate: "2026-11-04",
    updatedDate: "2026-11-04",
    readTime: "6 min read",
    tags: ["ERP vs POS", "Retail Software Sri Lanka", "Inventory Management"],
    sections: [
      {
        id: "pos-limitations",
        heading: "Why growing retailers hit the limitations of basic POS systems",
        paragraphs: [
          "A Point of Sale (POS) system handles the final customer transaction—scanning barcodes, printing receipts, and recording daily register totals. However, as a retail business expands to multiple stores or warehouses, a standalone POS becomes insufficient.",
          "An ERP system encompasses the entire supply chain: procurement forecasting, inter-branch stock transfers, automated goods receipts, supplier credit management, and statutory tax accounting.",
        ],
      },
      {
        id: "integrated-view",
        heading: "When should a Sri Lankan business transition from POS to ERP?",
        paragraphs: [
          "When stock discrepancies occur between branches, when purchase orders must be drafted manually across spreadsheets, or when management cannot see real-time profitability across outlets, transitioning to an integrated ERP platform becomes essential.",
        ],
      },
    ],
    takeaways: [
      "A POS processes counter transactions; an ERP manages the entire business operating backbone.",
      "Multi-outlet retailers require centralized real-time inventory synchronization to prevent stockouts.",
      "Creativex Technology ERP integrates POS speed with comprehensive enterprise accounting and supply chain control.",
    ],
    references: [
      { label: "Creativex Technology: Enterprise & Industry Solutions", href: "/solutions" },
      { label: "Creativex Technology: Retail Distribution Solutions", href: "/solutions#retail-distribution" },
    ],
  },
  {
    slug: "cost-of-custom-software-development-sri-lanka",
    number: "10",
    category: "Software Engineering",
    title: "Cost of Custom Software Development in Sri Lanka (2026 Guide)",
    excerpt: "A transparent breakdown of custom software development pricing, developer hourly rates, project budgeting models, and ROI considerations in Sri Lanka.",
    publishedDate: "2026-11-06",
    updatedDate: "2026-11-06",
    readTime: "8 min read",
    tags: ["Software Cost Sri Lanka", "Software House Rates Colombo", "Custom Software"],
    sections: [
      {
        id: "pricing-factors",
        heading: "What determines the cost of custom software in Sri Lanka?",
        paragraphs: [
          "Software development pricing in Sri Lanka is determined by architectural scope, integration complexity, user security roles, and expected transaction volumes. Sri Lanka offers world-class software engineering at competitive rates compared to Western and Gulf tech hubs.",
          "Typical project tiers range from focused MVPs (LKR 650,000–LKR 2,200,000) to enterprise-scale platforms (LKR 3,500,000+) designed for high concurrency, automated CI/CD, and long-term maintainability.",
        ],
      },
      {
        id: "engagement-structures",
        heading: "Fixed-price contracts versus dedicated engineering squads",
        paragraphs: [
          "For well-scoped projects with defined specifications, fixed-price milestone delivery provides budget predictability. For evolving SaaS products and ongoing digital platforms, dedicated monthly engineering squads provide agility and continuous velocity.",
        ],
      },
    ],
    takeaways: [
      "Custom software development in Sri Lanka offers substantial cost efficiencies without compromising engineering quality.",
      "Insist on transparent milestone delivery schedules with direct developer communication.",
      "Budget for post-launch maintenance, security updates, and automated database backups.",
    ],
    references: [
      { label: "Creativex Technology: Custom Software Development", href: "/services/custom-software-development" },
      { label: "Creativex Technology: Contact & Quote Calculator", href: "/contact" },
    ],
  },
  {
    slug: "how-to-choose-it-solutions-provider-sri-lanka",
    number: "11",
    category: "IT Infrastructure",
    title: "How to Choose an IT Solutions Provider in Sri Lanka",
    excerpt: "A strategic evaluation framework for corporate boards and business owners selecting an enterprise IT solutions and cloud engineering partner in Sri Lanka.",
    publishedDate: "2026-11-08",
    updatedDate: "2026-11-08",
    readTime: "7 min read",
    tags: ["IT Solutions Sri Lanka", "IT Services Colombo", "Enterprise Tech Partner"],
    sections: [
      {
        id: "infrastructure-dependability",
        heading: "Why your IT provider must understand business continuity",
        paragraphs: [
          "An enterprise IT partner is responsible for the resilience, security, and scalability of your company's operational infrastructure. Selecting a provider solely based on low hourly bids often leads to costly outages and security vulnerabilities.",
          "Top-tier IT solutions providers in Sri Lanka demonstrate proven cloud engineering expertise (AWS, Azure, GCP), proactive monitoring capabilities, structured backup routines, and clear SLA response commitments.",
        ],
      },
      {
        id: "key-competencies",
        heading: "Essential technical capabilities to verify",
        paragraphs: [
          "Look for providers capable of unifying your digital stack: cloud server management, database optimization, zero-trust network access, custom internal tools, and rapid incident response.",
        ],
      },
    ],
    takeaways: [
      "Evaluate IT providers on operational uptime, security standards, and response time SLAs.",
      "Ensure your partner has deep experience in enterprise cloud architecture and automated data backups.",
      "Creativex Technology acts as an accountable technology partner from infrastructure setup to custom software build.",
    ],
    references: [
      { label: "Creativex Technology: Engineering Services", href: "/services" },
      { label: "Creativex Technology: Cloud Solutions Engineering", href: "/services/cloud-solutions" },
    ],
  },
  {
    slug: "whatsapp-ai-chatbots-sri-lankan-businesses",
    number: "12",
    category: "Conversational AI",
    title: "WhatsApp AI Chatbots for Sri Lankan Businesses",
    excerpt: "How Meta WhatsApp Business API chatbots powered by artificial intelligence automate customer service, lead qualification, and order tracking for Sri Lankan enterprises.",
    publishedDate: "2026-11-10",
    updatedDate: "2026-11-10",
    readTime: "6 min read",
    tags: ["WhatsApp AI Chatbot", "Conversational AI Sri Lanka", "WhatsApp Automation"],
    sections: [
      {
        id: "whatsapp-dominance",
        heading: "Why WhatsApp is the primary commercial channel in Sri Lanka",
        paragraphs: [
          "In Sri Lanka, WhatsApp is the dominant communication channel for customer inquiries, sales negotiations, and service updates. However, managing hundreds of incoming chats manually leads to delayed responses, missed sales, and staff burnout.",
          "By deploying official Meta WhatsApp Business API bots powered by AI, businesses can provide instant, 24/7 automated replies in English, Sinhala, and Tamil, while automatically synchronizing contact details with their central CRM or ERP system.",
        ],
      },
      {
        id: "key-capabilities",
        heading: "Automated capabilities built for Sri Lankan commercial workflows",
        paragraphs: [
          "Creativex Technology WhatsApp agents handle automated catalog browsing, order status lookups, automated payment link dispatch, booking appointments, and seamless escalation to human customer service agents when complex questions arise.",
        ],
      },
    ],
    takeaways: [
      "WhatsApp AI bots eliminate customer response delays and capture leads 24/7.",
      "Support for trilingual interactions (English, Sinhala, Tamil) significantly boosts customer satisfaction in Sri Lanka.",
      "Seamless CRM and ERP synchronization prevents data silos and lost opportunities.",
    ],
    references: [
      { label: "Creativex Technology: AI Automation & WhatsApp Agents", href: "/services/ai-automation-agents" },
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
    ],
  },
  {
    slug: "ai-agents-vs-ai-chatbots-difference",
    number: "13",
    category: "AI Engineering",
    title: "AI Agents vs AI Chatbots: What Is the Difference?",
    excerpt: "A technical architectural comparison explaining the fundamental operational differences between simple conversational chatbots and autonomous, action-oriented AI agents.",
    publishedDate: "2026-11-12",
    updatedDate: "2026-11-12",
    readTime: "7 min read",
    tags: ["AI Agents vs Chatbots", "Autonomous AI Agents", "Intelligent Workflows"],
    sections: [
      {
        id: "architectural-distinction",
        heading: "Beyond conversational responses to autonomous task execution",
        paragraphs: [
          "While traditional chatbots are reactive conversational systems that generate text responses based on scripted prompts or knowledge retrieval, autonomous AI agents possess agency: the ability to reason, plan multi-step tasks, access tools, and execute actions across external software systems.",
          "An AI agent does not merely answer questions about an order; it checks the ERP inventory ledger, updates the courier API, modifies customer status in the CRM, and alerts the warehouse manager autonomously.",
        ],
      },
      {
        id: "core-components",
        heading: "The four architectural pillars of autonomous AI agents",
        paragraphs: [
          "1. Perception & Context: Ingesting structured and unstructured signals from email, APIs, and messages. 2. Reasoning & Planning: Decomposing complex goals into sequential action steps. 3. Tool Execution: Using authenticated APIs to read and write database records. 4. Memory & Reflection: Retaining short-term operational state and long-term business rules.",
        ],
      },
    ],
    takeaways: [
      "Chatbots converse; autonomous AI agents coordinate and execute operational work.",
      "Agents require secure tool-use permissions and explicit human approval gates for high-consequence actions.",
      "Creativex Technology designs governed multi-agent mesh systems tailored to enterprise business operations.",
    ],
    references: [
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
      { label: "Creativex Technology: AI Automation & Agents", href: "/services/ai-automation-agents" },
    ],
  },

];

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all articles ordered by their display number. */
export async function getArticles(): Promise<Article[]> {
  try {
    const rows = await supabaseSelect("articles", { order: "number.asc" });
    if (!rows || rows.length === 0) return staticArticles;
    const dbArticles = rows.map(mapRow);
    const dbSlugs = new Set(dbArticles.map((a) => a.slug?.toLowerCase().trim()));
    const missingStatic = staticArticles.filter(
      (sa) => !dbSlugs.has(sa.slug?.toLowerCase().trim())
    );
    return [...dbArticles, ...missingStatic];
  } catch (err) {
    console.error("[articles] Failed to fetch from Supabase:", err);
    return staticArticles;
  }
}

/** Fetch a single article by slug. Returns undefined if not found. */
export async function getArticle(slug: string): Promise<Article | undefined> {
  try {
    const rows = await supabaseSelect("articles", {
      slug: `eq.${slug}`,
      limit: "1",
    });
    if (rows && rows.length > 0) return mapRow(rows[0]);
    return staticArticles.find((a) => a.slug === slug);
  } catch (err) {
    console.error("[articles] Failed to fetch article:", err);
    return staticArticles.find((a) => a.slug === slug);
  }
}

/** Fetch just the slugs — used for generateStaticParams. */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const articles = await getArticles();
    return articles.map((r) => r.slug);
  } catch {
    return staticArticles.map((a) => a.slug);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
