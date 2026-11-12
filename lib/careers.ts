import { supabaseSelect } from "./supabase";
import { getTalentPoolJobPost, isTalentPoolSlug } from "./talent-pool";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JobPost {
  id?: string;
  slug: string;
  number: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  salary_range?: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  required_skills: string[];
  nice_to_have: string[];
  benefits: string[];
  media_url?: string | null;
  ats_threshold: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JDRequirementMatch {
  text: string;
  type: "requirement" | "responsibility";
  matched: boolean;
  matchRatio: number;
  matchedTerms: string[];
  missingTerms: string[];
}

export interface ATSResult {
  score: number;
  verdict: "shortlisted" | "review" | "filtered_out";
  threshold: number;
  matchedSkills: string[];
  missingSkills: string[];
  bonusSkills: string[];
  detectedSignals: {
    hasEmail: boolean;
    hasPhoneOrLink: boolean;
    hasExperienceSection: boolean;
    hasSkillsSection: boolean;
    hasEducationSection: boolean;
    wordCount: number;
    bulletCount: number;
    atsFormatScore: number;
  };
  jdRequirementMatches: JDRequirementMatch[];
  jdMatchPercentage: number;
  summary: string;
}

export interface JobApplication {
  id?: string;
  job_id?: string;
  job_slug: string;
  job_title: string;
  applicant_name: string;
  applicant_email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  years_experience?: number;
  resume_filename?: string;
  resume_url?: string;
  resume_text: string;
  cover_letter?: string;
  ats_score: number;
  ats_status: "shortlisted" | "review" | "filtered_out";
  ats_matched_skills: string[];
  ats_missing_skills: string[];
  ats_bonus_skills?: string[];
  ats_jd_matches: JDRequirementMatch[];
  ats_signals?: ATSResult["detectedSignals"];
  ats_summary: string;
  status: "new" | "shortlisted" | "interviewing" | "rejected" | "hired";
  created_at?: string;
  updated_at?: string;
}

// ─── Database row mapper ──────────────────────────────────────────────────────

function normalizeStringArray(val: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(val)) return val.map((v) => String(v));
  if (typeof val === "string" && val.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map((v) => String(v));
    } catch {
      // ignore invalid JSON
    }
  }
  return fallback;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapJobRow(row: any, fallback?: JobPost): JobPost {
  return {
    id: row.id ?? fallback?.id,
    slug: String(row.slug ?? fallback?.slug ?? "").trim(),
    number: row.number || fallback?.number || "01",
    title: row.title || fallback?.title || "",
    department: row.department || fallback?.department || "Engineering",
    location: row.location || fallback?.location || "Remote / Colombo",
    type: row.type || fallback?.type || "Full-time",
    level: row.level || fallback?.level || "Mid-Senior",
    salary_range: row.salary_range ?? fallback?.salary_range ?? "",
    summary: row.summary || fallback?.summary || "",
    description: row.description || fallback?.description || "",
    responsibilities: normalizeStringArray(row.responsibilities, fallback?.responsibilities ?? []),
    requirements: normalizeStringArray(row.requirements, fallback?.requirements ?? []),
    required_skills: normalizeStringArray(row.required_skills, fallback?.required_skills ?? []),
    nice_to_have: normalizeStringArray(row.nice_to_have, fallback?.nice_to_have ?? []),
    benefits: normalizeStringArray(row.benefits, fallback?.benefits ?? []),
    media_url: row.media_url !== undefined ? row.media_url : (fallback?.media_url ?? null),
    ats_threshold:
      typeof row.ats_threshold === "number"
        ? row.ats_threshold
        : (fallback?.ats_threshold ?? 60),
    published:
      row.published === false || row.is_published === false
        ? false
        : (row.published ?? fallback?.published ?? true),
    created_at: row.created_at ?? fallback?.created_at,
    updated_at: row.updated_at ?? fallback?.updated_at,
  };
}

// ─── Static Fallback Jobs ─────────────────────────────────────────────────────

export const staticJobs: JobPost[] = [
  {
    id: "job-senior-ai-systems-engineer",
    slug: "senior-ai-systems-engineer",
    number: "01",
    title: "Senior AI Systems Engineer",
    department: "AI & Agents",
    location: "Remote · Rajagiriya, Colombo, Sri Lanka",
    type: "Full-time",
    level: "Senior",
    salary_range: "Competitive + Performance Equity",
    summary:
      "Architect CreativeX autonomous AI business agents, hybrid RAG pipelines, and tool-calling orchestration layers for enterprise operations across logistics, hospitality, retail, and SaaS.",
    description:
      "At CreativeX Technology (Pvt) Ltd, we engineer autonomous AI agents, predictive analytics platforms, IoT command centers, and resilient cloud products for clients across Sri Lanka, Malaysia, Australia, the UAE, Nepal, and Bangladesh. We are looking for a Senior AI Systems Engineer to design and ship deterministic, observable AI agent systems—including omnichannel platforms like our Alexa AI Business Agent—into live client operations. You will work directly with founding engineers, product designers, and delivery leads to build LLM orchestration, evaluation harnesses, retrieval pipelines, and human-in-the-loop escalation workflows using TypeScript, Python, Next.js, Supabase/PostgreSQL (pgvector), and Cloudflare Workers.",
    responsibilities: [
      "Architect production multi-agent workflows and deterministic tool-calling orchestration with structured outputs, guardrails, fallback policies, and human-in-the-loop escalation.",
      "Build hybrid RAG and governed knowledge pipelines using vector embeddings, PostgreSQL (pgvector), metadata filtering, and verifiable source citations.",
      "Develop automated evaluation harnesses, regression test suites, and telemetry dashboards to measure accuracy, latency, token cost, and hallucination rates.",
      "Integrate AI agents with omnichannel messaging (WhatsApp Business API, Meta/Instagram/Facebook/TikTok), CRMs, ERPs, automation workflows, and REST/GraphQL webhooks.",
      "Engineer predictive alerting and decision-intelligence services supporting logistics control towers, smart facility IoT hubs, and retail fulfilment platforms.",
      "Partner with Product Designers and Next.js engineers on transparent operator consoles, mentor Associate and Intern engineers, and support technical discovery on enterprise engagements.",
    ],
    requirements: [
      "3+ years of production software engineering experience in TypeScript, Node.js, or Python.",
      "Proven hands-on experience shipping LLM-powered applications, autonomous AI agents, function/tool calling, or production RAG architectures.",
      "Strong command of relational databases (PostgreSQL / Supabase / pgvector) and resilient API/webhook design.",
      "Experience deploying low-latency services on edge/serverless infrastructure such as Cloudflare Workers, Vercel, or containerized cloud runtimes.",
      "Practical rigor around LLM evaluation, semantic caching, rate limiting, observability, and security/data-privacy boundaries.",
      "Clear written and verbal English communication skills for architecture reviews and international client collaboration.",
    ],
    required_skills: [
      "TypeScript",
      "Python",
      "LLM",
      "AI Agents",
      "RAG",
      "PostgreSQL",
      "Supabase",
      "Node.js",
      "REST API",
    ],
    nice_to_have: [
      "Cloudflare Workers",
      "Next.js",
      "pgvector",
      "OpenAI API",
      "Gemini API",
      "Docker",
      "AI & Automation",
    ],
    benefits: [
      "Remote-first flexibility with collaborative Rajagiriya, Colombo studio access",
      "Direct architectural ownership on flagship AI systems (including Alexa AI Business Agent) and global client deployments",
      "Dedicated AI API credits, tooling, hardware, and conference/learning stipend",
      "Performance-linked bonuses, equity track, and technical leadership across engineering squads",
    ],
    media_url: "/brand/creativex-robot-lockup.webp",
    ats_threshold: 60,
    published: true,
    created_at: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "job-fullstack-nextjs-engineer",
    slug: "fullstack-nextjs-edge-engineer",
    number: "02",
    title: "Full-Stack Next.js & Edge Engineer",
    department: "Product Engineering",
    location: "Remote · Rajagiriya, Colombo, Sri Lanka",
    type: "Full-time",
    level: "Mid-Senior",
    salary_range: "Competitive",
    summary:
      "Build fast, resilient web platforms, AI operator consoles, logistics & IoT control towers, and edge-deployed SaaS products using Next.js, React 19, TypeScript, Supabase, and Cloudflare Workers.",
    description:
      "As a Full-Stack Next.js & Edge Engineer at CreativeX Technology (Pvt) Ltd, you will translate complex operational workflows into crisp, high-speed web applications for clients across Sri Lanka, Malaysia, Australia, the UAE, Nepal, and Bangladesh. From server-rendered public platforms with strong technical SEO/GEO to real-time AI agent operator consoles, logistics control towers, and smart-facility dashboards backed by Supabase/PostgreSQL, Drizzle ORM, and Cloudflare Workers, you will own features end-to-end.",
    responsibilities: [
      "Architect and deliver full-stack web applications using Next.js App Router, React 19, TypeScript, and Cloudflare Workers.",
      "Implement responsive, WCAG-accessible UI systems with Tailwind CSS and Radix/shadcn primitives alongside Product Designers.",
      "Build secure API routes, Supabase Auth & Row-Level Security (RLS) policies, and database schemas in PostgreSQL / Supabase / Drizzle ORM.",
      "Connect web platforms to AI agent orchestration endpoints, LLM workflows, omnichannel webhooks, and real-time operational telemetry.",
      "Optimize Core Web Vitals, structured data (JSON-LD), Technical SEO & Generative Engine Optimization (GEO), edge caching, and bundle performance.",
      "Write clean, testable code, participate in architecture and code reviews, and collaborate across engineering, design, and client delivery.",
    ],
    requirements: [
      "2+ years of production experience with React, Next.js (App Router), and modern TypeScript.",
      "Solid experience with Tailwind CSS, responsive design, component architecture, and accessible UI engineering.",
      "Strong command of relational databases (PostgreSQL, Supabase, RLS, or Drizzle ORM) and RESTful/webhook API design.",
      "Experience deploying and optimizing serverless or edge applications (Cloudflare Workers, Vercel, or similar runtimes).",
      "Strong understanding of Git workflows, automated testing, CI/CD, and web performance/security best practices.",
      "Clear written and verbal English communication skills for collaborating with distributed squads and international clients.",
    ],
    required_skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase",
      "Git",
      "REST API",
    ],
    nice_to_have: [
      "Cloudflare Workers",
      "Drizzle ORM",
      "Technical SEO",
      "Vite",
      "Playwright",
      "AI Agents",
    ],
    benefits: [
      "Remote-first flexibility with collaborative Rajagiriya, Colombo studio access",
      "End-to-end ownership across AI agent consoles, logistics/IoT control towers, and global SaaS products",
      "Annual hardware, AI tooling, and workspace upgrade allowance",
      "Health & wellness coverage with performance-linked growth track",
    ],
    media_url: null,
    ats_threshold: 60,
    published: true,
    created_at: "2026-10-05T00:00:00.000Z",
  },
  {
    id: "job-product-designer-ai-systems",
    slug: "product-designer-ai-interfaces",
    number: "03",
    title: "Product Designer — AI & Enterprise Systems",
    department: "Design & UX",
    location: "Remote · Rajagiriya, Colombo, Sri Lanka",
    type: "Full-time",
    level: "Mid-Senior",
    salary_range: "Competitive",
    summary:
      "Shape human-centered interfaces for CreativeX autonomous AI business agents, logistics & IoT control towers, and high-craft enterprise SaaS products.",
    description:
      "At CreativeX Technology (Pvt) Ltd, we build production AI agents, predictive analytics platforms, IoT command centers, and custom web/mobile products for clients across Sri Lanka, Malaysia, Australia, the UAE, Nepal, and Bangladesh. We are seeking a Product Designer who bridges systems thinking and sharp editorial visual craft. You will design intuitive operator consoles, human-in-the-loop AI escalation workflows, high-density logistics and smart-facility dashboards, and scalable Figma design systems aligned with our Next.js, Tailwind CSS, and Radix/shadcn engineering stack.",
    responsibilities: [
      "Design end-to-end product experiences—from discovery and information architecture to wireframes, interactive Figma prototypes, and production-ready UI—for AI agents and B2B operational platforms.",
      "Craft transparent AI interaction patterns including human-in-the-loop handoffs, confidence/citation states, tool-call audit trails, and exception-first operator workflows.",
      "Architect high-density enterprise dashboards (export logistics control towers, IoT facility monitoring, retail demand intelligence) with strong typographic hierarchy and scannability.",
      "Maintain and evolve CreativeX design tokens, component libraries, and motion guidelines in Figma aligned with Tailwind CSS and Radix/shadcn UI primitives.",
      "Partner closely with Next.js/TypeScript engineers during implementation to ensure responsive precision, WCAG accessibility, and micro-interaction polish.",
      "Participate in client discovery sessions, pre-sales solution prototypes, and usability testing on live operational workflows.",
    ],
    requirements: [
      "2+ years of product design experience across B2B SaaS, operational dashboards, or enterprise web and mobile applications.",
      "Expert proficiency in Figma, including component architecture, variants, design tokens/variables, auto-layout, and interactive prototyping.",
      "Strong portfolio demonstrating typographic discipline, complex workflow simplification, information density management, and clear UX problem solving.",
      "Practical understanding of frontend constraints (HTML, CSS, Tailwind CSS, responsive grids, and accessibility standards) for seamless engineering handoff.",
      "Experience conducting stakeholder discovery, user research, and iterative usability validation.",
      "Strong written and verbal English communication skills for collaborating with cross-functional squads and international clients.",
    ],
    required_skills: [
      "Figma",
      "Design Systems",
      "UI/UX",
      "Prototyping",
      "User Research",
      "Wireframing",
      "SaaS",
      "AI Product Design",
    ],
    nice_to_have: [
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Motion Design",
      "Data Visualization",
      "WCAG Accessibility",
    ],
    benefits: [
      "Remote-first flexibility with collaborative Rajagiriya, Colombo studio access",
      "High creative autonomy and direct ownership on flagship AI agents and global client systems",
      "Close collaboration with founding engineers, AI architects, and product leads",
      "Dedicated AI & design tooling, workspace, and learning stipend",
      "Performance-linked growth track with international project exposure",
    ],
    media_url: null,
    ats_threshold: 55,
    published: true,
    created_at: "2026-10-10T00:00:00.000Z",
  },
  {
    id: "job-business-development-intern",
    slug: "business-development-intern",
    number: "04",
    title: "Business Development Intern (IT & Software Products)",
    department: "Business Development & Sales",
    location: "Remote · Rajagiriya, Colombo, Sri Lanka",
    type: "Internship",
    level: "Internship",
    salary_range: "LKR 25,000 – 120,000 (Base + Performance Commission)",
    summary:
      "Proactive, target-driven Business Development Intern to build B2B client relationships, prospect via LinkedIn and calls, present IT & software solutions, and drive sales growth.",
    description:
      "At CreativeX Technology Pvt Ltd, we help businesses solve challenges and explore new opportunities through technology and digital solutions. We are looking for a proactive, target-driven Business Development Intern (IT & Software Products) for a Full-Time Remote Internship (Rajagiriya, Sri Lanka · 9:00 AM – 6:00 PM) to build client relationships, bring in new business, and grow B2B software sales.",
    responsibilities: [
      "Find and approach potential clients through calls, visits, LinkedIn, and networking.",
      "Understand customer needs and present suitable technology solutions with support from our team.",
      "Handle proposals, follow-ups, negotiations, and deal closing.",
      "Maintain a sales pipeline and achieve agreed monthly targets.",
      "Work with our business and technical teams to develop new opportunities.",
    ],
    requirements: [
      "Currently pursuing a degree in Marketing, Sales, Business Management, Business Administration, or a related field.",
      "0–3 months sales or business development experience preferred (freshers are welcome).",
      "Strong communication, presentation, and relationship-building skills.",
      "Confidence in cold calling, client meetings, and closing sales.",
      "A proactive mindset and willingness to learn about technology.",
      "Fluency in English and Sinhala; Tamil is an added advantage.",
    ],
    required_skills: [
      "Business Development",
      "B2B Sales",
      "Lead Generation",
      "Cold Calling",
      "Client Relationships",
      "Communication",
      "Presentation Skills",
      "Sales Pipeline",
      "LinkedIn Outreach",
    ],
    nice_to_have: [
      "Negotiation",
      "Proposal Writing",
      "Marketing",
      "CRM",
    ],
    benefits: [
      "Salary: LKR 25,000 – 120,000 (Base stipend + performance-linked commission)",
      "Performance-based commission linked to successful sales and achievement of agreed targets",
      "Hands-on experience in B2B sales, technology, and digital solutions",
      "Opportunities for career growth based on performance",
      "Full-time Remote Internship (9:00 AM – 6:00 PM, Rajagiriya / Colombo)",
    ],
    media_url: "/careers/business-development-intern-cover.jpg",
    ats_threshold: 50,
    published: true,
    created_at: "2026-11-12T00:00:00.000Z",
  },
  {
    id: "job-pre-sales-intern",
    slug: "pre-sales-intern-it-software",
    number: "05",
    title: "Pre-Sales Intern (IT & Software)",
    department: "Business Development & Sales",
    location: "Remote · Rajagiriya, Colombo, Sri Lanka",
    type: "Full-time / Part-time",
    level: "Internship",
    salary_range: "LKR 25,000 – 120,000",
    summary:
      "Motivated, technology-curious Pre-Sales Intern to bridge prospective clients and technical teams through discovery calls, product demos, customized proposals, and AI/automation solution consulting.",
    description:
      "CreativeX Technology (Pvt) Ltd is a registered software development and IT consulting company specializing in custom software, web and mobile applications, AI/ML solutions, business automation, data & analytics, cloud technologies, and digital transformation across Sri Lanka, Malaysia, Australia, the UAE, Nepal, and Bangladesh. We are looking for a motivated, confident, and technology-curious Pre-Sales Intern (Full-Time / Part-Time Remote Internship · Rajagiriya, Sri Lanka · 9:00 AM – 6:00 PM) to communicate with prospective clients, translate business challenges into practical software solutions, support demos and pitches, and prepare tailored proposals.",
    responsibilities: [
      "Engage with prospective clients to understand their business needs, challenges, objectives, and expectations.",
      "Participate in client discovery calls, meetings, presentations, and requirement-gathering sessions.",
      "Support product demonstrations, solution presentations, and client pitches.",
      "Research client businesses, industries, competitors, and market trends before meetings.",
      "Work closely with technical teams to understand proposed solutions and communicate them clearly to clients.",
      "Translate customer requirements and business challenges into potential technology solutions.",
      "Assist in preparing customized proposals, pitch decks, presentations, quotations, and case studies.",
      "Act as a communication bridge between clients and internal technical, product, sales, and business teams.",
      "Follow up on client discussions, action items, and opportunities while maintaining accurate CRM and sales records.",
      "Explore how AI, automation, cloud technologies, and modern software solutions address real-world business challenges.",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree/diploma in Business Management, Marketing, IT, Computer Science, Software Engineering, Business Information Systems, or a related field (fresh graduates and undergraduates encouraged).",
      "Strong verbal and written English communication skills with confidence presenting ideas to clients.",
      "Strong interpersonal, relationship-building, presentation, and public-speaking abilities.",
      "Strong analytical and problem-solving skills with a customer-focused perspective.",
      "Genuine interest in software, AI, digital products, automation, and emerging technologies.",
      "Ability to research independently, manage multiple priorities, and work both independently and collaboratively.",
      "Familiarity with Google Workspace, Microsoft Office, or similar productivity tools.",
      "Proactive attitude, curiosity, willingness to learn, and strong ownership.",
    ],
    required_skills: [
      "Pre-Sales",
      "Communication",
      "Presentation Skills",
      "Client Relationships",
      "Proposal Writing",
      "Business Analysis",
      "Business Development",
      "Google Workspace",
    ],
    nice_to_have: [
      "AI & Automation",
      "SaaS",
      "CRM",
      "Cloud Technologies",
      "UI/UX",
      "Digital Marketing",
    ],
    benefits: [
      "Salary: LKR 25,000 – 120,000 (Full-time / Part-time Remote Internship · Rajagiriya / Colombo)",
      "Hands-on experience in real-world pre-sales, client discovery, product demos, and proposal preparation",
      "Exposure to AI, automation (n8n, Make, Zapier), cloud, and modern software solution lifecycles",
      "Collaboration with developers, designers, business analysts, and international client projects",
      "Mentorship, professional guidance, and career growth into Pre-Sales, Sales Engineering, BA, or Product",
    ],
    media_url: null,
    ats_threshold: 50,
    published: true,
    created_at: "2026-11-12T00:00:00.000Z",
  },
];

// ─── Fetch Helpers ────────────────────────────────────────────────────────────

/**
 * Merge live database job rows with `staticJobs` so newly added static roles
 * still appear even when Supabase only contains earlier rows (or is empty),
 * while allowing DB rows to override or unpublish matching slugs.
 */
export function mergeJobsWithStatic(
  rows: unknown[] | null | undefined,
  includeUnpublished = false
): JobPost[] {
  const safeRows = Array.isArray(rows) ? rows : [];
  const staticBySlug = new Map(
    staticJobs.map((job) => [job.slug.toLowerCase().trim(), job])
  );

  const dbJobs = safeRows
    .filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object" && "slug" in row && row.slug))
    .map((row) => {
      const slugNorm = String(row.slug).toLowerCase().trim();
      return mapJobRow(row, staticBySlug.get(slugNorm));
    });

  const dbSlugs = new Set(dbJobs.map((j) => j.slug.toLowerCase().trim()));
  const missingStatic = staticJobs.filter(
    (j) => !dbSlugs.has(j.slug.toLowerCase().trim())
  );

  const combined = [...dbJobs, ...missingStatic].sort((a, b) =>
    String(a.number || "").localeCompare(String(b.number || ""), undefined, {
      numeric: true,
    })
  );

  return includeUnpublished
    ? combined
    : combined.filter((j) => j.published !== false);
}

export async function getJobs(includeUnpublished = false): Promise<JobPost[]> {
  try {
    const rows = await supabaseSelect("jobs", {
      order: "number.asc",
    });
    return mergeJobsWithStatic(rows, includeUnpublished);
  } catch (err) {
    console.warn("[careers] Failed to fetch jobs from Supabase, using static fallback:", err);
  }
  return mergeJobsWithStatic([], includeUnpublished);
}

export async function getJob(slug: string): Promise<JobPost | null> {
  const slugNorm = slug.toLowerCase().trim();
  const staticMatch =
    staticJobs.find((j) => j.slug.toLowerCase().trim() === slugNorm) ?? null;

  try {
    const rows = await supabaseSelect("jobs", {
      slug: `eq.${slug}`,
      limit: "1",
    });
    if (rows && rows.length > 0) {
      return mapJobRow(rows[0], staticMatch ?? undefined);
    }
  } catch (err) {
    console.warn(`[careers] Failed to fetch job ${slug} from Supabase:`, err);
  }
  if (staticMatch) return staticMatch;
  if (isTalentPoolSlug(slugNorm)) return getTalentPoolJobPost(slugNorm);
  return null;
}

export async function getJobSlugs(): Promise<string[]> {
  const jobs = await getJobs();
  return jobs.map((j) => j.slug);
}

