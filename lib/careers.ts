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
    location: "Colombo / Remote",
    type: "Full-time",
    level: "Senior",
    salary_range: "Competitive + Performance Equity",
    summary:
      "Architect production multi-agent workflows, RAG pipelines, and tool-calling orchestration layers for enterprise customers across commerce, logistics, and hospitality.",
    description:
      "We are looking for a Senior AI Systems Engineer to design and ship deterministic, observable AI agent systems into live client operations. You will work directly with founding engineers to build LLM orchestration, structured evaluation harnesses, retrieval pipelines, and human-in-the-loop escalation workflows using TypeScript, Python, Next.js, and Supabase/PostgreSQL.",
    responsibilities: [
      "Design and implement production multi-agent workflows with reliable tool calling, guardrails, and human handoffs.",
      "Build hybrid RAG pipelines using vector embeddings, PostgreSQL (pgvector), and structured metadata filtering.",
      "Develop automated evaluation suites and telemetry dashboards to measure latency, accuracy, and hallucination rates.",
      "Integrate AI agents with WhatsApp, Meta messaging APIs, CRMs, ERPs, and REST/GraphQL webhooks.",
      "Collaborate with product designers to craft transparent, controllable AI operator consoles.",
    ],
    requirements: [
      "3+ years of production software engineering experience in TypeScript, Node.js, or Python.",
      "Hands-on experience building LLM-powered applications, AI agents, function calling, or RAG architectures.",
      "Strong command of relational databases (PostgreSQL / Supabase) and API design.",
      "Experience deploying low-latency services on edge/serverless infrastructure such as Cloudflare Workers or Vercel.",
      "Practical understanding of prompt evaluation, caching, rate limiting, and security boundaries.",
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
    ],
    benefits: [
      "Remote-first flexibility with collaborative Colombo studio access",
      "Direct ownership on flagship AI systems and client deployments",
      "Dedicated AI tooling & conference/learning stipend",
      "Performance-linked bonuses and rapid growth track",
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
    location: "Remote / Hybrid",
    type: "Full-time",
    level: "Mid-Senior",
    salary_range: "Competitive",
    summary:
      "Build fast, resilient web platforms, client control towers, and edge-deployed SaaS products using Next.js, React, TypeScript, Tailwind CSS, and Cloudflare Workers.",
    description:
      "As a Full-Stack Next.js & Edge Engineer at CreativeX Technology, you will translate complex operational workflows into crisp, high-speed web applications. From server-rendered public platforms with strong technical SEO/GEO to real-time client dashboards backed by Supabase and edge workers, you will own features end-to-end.",
    responsibilities: [
      "Architect and deliver full-stack web applications using Next.js App Router, React 19, and TypeScript.",
      "Implement responsive, accessible UI systems with Tailwind CSS and Radix/shadcn primitives.",
      "Build secure API routes, authentication flows, and database schemas in Supabase / PostgreSQL / Drizzle ORM.",
      "Optimize Core Web Vitals, structured data (JSON-LD), caching, and Cloudflare Workers edge performance.",
      "Write clean, testable code and participate in architecture reviews.",
    ],
    requirements: [
      "2+ years of experience with React, Next.js, and modern TypeScript.",
      "Solid experience with Tailwind CSS, responsive design, and accessible UI engineering.",
      "Familiarity with SQL databases (PostgreSQL, Supabase, or Drizzle ORM) and RESTful APIs.",
      "Strong understanding of Git workflows, CI/CD, and web performance optimization.",
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
    ],
    benefits: [
      "Flexible working hours & outcome-focused culture",
      "Work across diverse high-impact industries (logistics, SaaS, retail)",
      "Annual hardware & workspace upgrade allowance",
      "Health & wellness coverage",
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
    location: "Colombo / Remote",
    type: "Full-time",
    level: "Mid-Senior",
    salary_range: "Competitive",
    summary:
      "Shape human-centered interfaces for autonomous business agents, logistics control towers, and editorial brand experiences with strong typographic discipline.",
    description:
      "We are seeking a Product Designer who bridges systems thinking and sharp visual craft. You will design intuitive command centers, AI copilot experiences, design systems, and brand-aligned digital products that make complex automation legible and trustworthy for operators.",
    responsibilities: [
      "Design end-to-end user flows, wireframes, and high-fidelity interfaces for AI agents and B2B operational platforms.",
      "Maintain and evolve CreativeX design tokens, component libraries, and motion guidelines in Figma.",
      "Partner closely with frontend engineers to ensure pixel-accurate implementation and micro-interaction polish.",
      "Conduct stakeholder discovery sessions and usability testing on live workflows.",
    ],
    requirements: [
      "2+ years of product design experience across SaaS, dashboards, or enterprise web applications.",
      "Expert proficiency in Figma, component architecture, auto-layout, and design systems.",
      "Strong portfolio demonstrating typographic hierarchy, information density management, and UX problem solving.",
      "Ability to collaborate directly with engineering teams and understand HTML/CSS constraints.",
    ],
    required_skills: [
      "Figma",
      "Design Systems",
      "UI/UX",
      "Prototyping",
      "User Research",
      "Wireframing",
      "SaaS",
    ],
    nice_to_have: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Motion Design",
      "AI Product Design",
    ],
    benefits: [
      "High creative autonomy and direct client impact",
      "Modern design stack & studio collaboration",
      "Flexible hybrid/remote schedule",
      "Learning & design conference budget",
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

