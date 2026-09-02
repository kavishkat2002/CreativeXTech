export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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
  references: { label: string; href: string }[];
};

export const articles: Article[] = [
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
          "For a business, the useful interpretation is simple: publish material that is technically accessible, unambiguous, evidence-led, and genuinely helpful. Google’s current guidance frames optimization for its generative features as part of SEO—not a separate collection of hacks.",
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
    tags: ["Technical SEO", "SaaS", "Architecture"],
    sections: [
      {
        id: "intent-map",
        heading: "Map the site to the buyer’s information journey",
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
      { label: "Google: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Google: Search Essentials", href: "https://developers.google.com/search/docs/essentials" },
      { label: "Google: How Search works", href: "https://developers.google.com/search/docs/fundamentals/how-search-works" },
    ],
  },
  {
    slug: "ai-ready-content-architecture",
    number: "04",
    category: "Content systems",
    title: "From documents to answers: designing AI-ready content architecture",
    excerpt: "A content model for publishing technical knowledge that stays understandable, maintainable, and useful across search and AI interfaces.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "6 min read",
    tags: ["Content design", "Knowledge", "AI discovery"],
    sections: [
      {
        id: "knowledge-model",
        heading: "Model knowledge before writing pages",
        paragraphs: [
          "A useful content system starts with the concepts the business needs to explain: services, solutions, technologies, industries, projects, people, methods, and policies. Define how those concepts relate before choosing page layouts.",
          "This prevents every article from becoming an isolated document and gives editors a predictable way to link explanation, evidence, and action.",
        ],
      },
      {
        id: "answerable-sections",
        heading: "Write sections with a complete purpose",
        paragraphs: [
          "Each section should make sense in the context of its heading and contribute one clear idea. Lead with a direct explanation, then add constraints, examples, and evidence. This improves scanning for people and reduces ambiguity when systems extract passages.",
        ],
        bullets: [
          "Use specific headings rather than clever labels that hide the topic.",
          "Define terms at first use and keep terminology consistent.",
          "State who a recommendation is for and when it does not apply.",
          "Add dates and owners to information that can become stale.",
        ],
      },
      {
        id: "governance",
        heading: "Design for revision, not just publication",
        paragraphs: [
          "AI, cloud, and search guidance changes. Maintain source links, review dates, and a clear editorial owner. Update the canonical article instead of creating a trail of near-duplicates unless the subject truly requires a new version.",
          "A smaller body of accurate, connected material is usually more useful than a large inventory of unmaintained posts.",
        ],
      },
    ],
    takeaways: [
      "Model relationships between business concepts before designing templates.",
      "Give every section a clear question or decision to resolve.",
      "Publish with owners, dates, sources, and a revision path.",
    ],
    references: [
      { label: "Google: Creating helpful content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Google: Using generative AI content", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
      { label: "Google: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
    ],
  },
  {
    slug: "core-web-vitals-ai-discovery",
    number: "05",
    category: "Web performance",
    title: "Core Web Vitals still matter in AI-first discovery",
    excerpt: "Performance is more than a ranking discussion. It shapes whether a prospect can consume, trust, and act on the page that discovery sends them to.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "6 min read",
    tags: ["Performance", "Core Web Vitals", "UX"],
    sections: [
      {
        id: "after-the-click",
        heading: "Discovery only creates an opportunity",
        paragraphs: [
          "Whether a person arrives from a conventional result, an AI answer, a recommendation, or a shared link, the page must earn attention quickly. Slow rendering, shifting layouts, and delayed interaction add friction at the moment interest is highest.",
          "Core Web Vitals provide a shared language for loading, responsiveness, and visual stability. They are not a substitute for relevance, but they are a useful product-quality constraint.",
        ],
      },
      {
        id: "engineering-priorities",
        heading: "Prioritize the systems behind repeated problems",
        paragraphs: [
          "Optimize templates and delivery patterns before polishing individual pages. Control image dimensions, reduce blocking work, keep typography stable, and reserve space for dynamic elements. Measure representative real-user journeys rather than only a fast office connection.",
        ],
        bullets: [
          "Set explicit dimensions and responsive sources for media.",
          "Limit client-side JavaScript to interactions that need it.",
          "Load critical styles and fonts predictably.",
          "Test navigation, forms, and consent interfaces on mid-range mobile devices.",
        ],
      },
      {
        id: "experience-metric",
        heading: "Connect performance to experience and conversion",
        paragraphs: [
          "Track field performance by template and pair it with engagement, form completion, and qualified conversion data. A technically perfect score can still hide confusing copy; a visually impressive page can still fail if interaction is delayed.",
          "The useful goal is a dependable reading and action experience across the devices your customers actually use.",
        ],
      },
    ],
    takeaways: [
      "Treat speed and stability as product experience, not only search inputs.",
      "Fix shared templates before one-off pages.",
      "Measure real-user performance alongside meaningful actions.",
    ],
    references: [
      { label: "Google: Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
      { label: "web.dev: Learn performance", href: "https://web.dev/learn/performance" },
      { label: "Google: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    ],
  },
  {
    slug: "measuring-search-ai-visibility",
    number: "06",
    category: "Measurement",
    title: "Measuring search and AI visibility without vanity metrics",
    excerpt: "A measurement model that connects discovery signals to qualified demand, customer questions, and the commercial work content must support.",
    publishedDate: "2026-09-02",
    updatedDate: "2026-09-02",
    readTime: "7 min read",
    tags: ["Analytics", "AI visibility", "Attribution"],
    sections: [
      {
        id: "measurement-layers",
        heading: "Use three layers of evidence",
        paragraphs: [
          "No single dashboard explains discovery. Combine platform data, site behavior, and commercial outcomes. Platform reports show reach; analytics show what visitors do; CRM and sales evidence show whether that attention becomes relevant demand.",
        ],
        bullets: [
          "Visibility: indexed pages, relevant impressions, citations, and brand presence.",
          "Engagement: useful landing-page sessions, depth, repeat visits, and key interactions.",
          "Business: qualified enquiries, influenced opportunities, sales questions, and revenue outcomes.",
        ],
      },
      {
        id: "query-panel",
        heading: "Maintain a stable query panel for AI systems",
        paragraphs: [
          "Create a small set of real research questions across awareness, comparison, and purchase intent. Test them at a consistent cadence and record whether the brand appears, which pages are referenced, what competitors surface, and whether the answer is accurate.",
          "Do not treat one prompt result as a market share number. Generative outputs vary. A stable panel helps reveal direction without pretending the system is deterministic.",
        ],
      },
      {
        id: "decision-loop",
        heading: "Turn findings into editorial decisions",
        paragraphs: [
          "When an important page is absent, diagnose the reason: weak coverage, ambiguous positioning, missing proof, technical access, or stronger alternatives. Improve the underlying information and measure again.",
          "When visibility rises without qualified action, revisit intent and conversion experience. The purpose of measurement is to choose better work, not to decorate a report.",
        ],
      },
    ],
    takeaways: [
      "Combine visibility, behavior, and commercial evidence.",
      "Use a consistent query panel and record variability honestly.",
      "Let measurement prioritize better information and experiences.",
    ],
    references: [
      { label: "Google: Optimizing for generative AI features", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { label: "Google Search Console documentation", href: "https://support.google.com/webmasters/topic/9128571" },
      { label: "Aggarwal et al.: GEO research paper", href: "https://arxiv.org/abs/2311.09735" },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
