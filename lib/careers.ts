import { supabaseSelect } from "./supabase";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapJobRow(row: any): JobPost {
  return {
    id: row.id,
    slug: row.slug,
    number: row.number || "01",
    title: row.title,
    department: row.department || "Engineering",
    location: row.location || "Remote / Colombo",
    type: row.type || "Full-time",
    level: row.level || "Mid-Senior",
    salary_range: row.salary_range || "",
    summary: row.summary || "",
    description: row.description || "",
    responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
    requirements: Array.isArray(row.requirements) ? row.requirements : [],
    required_skills: Array.isArray(row.required_skills) ? row.required_skills : [],
    nice_to_have: Array.isArray(row.nice_to_have) ? row.nice_to_have : [],
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    media_url: row.media_url || null,
    ats_threshold: typeof row.ats_threshold === "number" ? row.ats_threshold : 60,
    published: row.published ?? true,
    created_at: row.created_at,
    updated_at: row.updated_at,
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
];

// ─── Fetch Helpers ────────────────────────────────────────────────────────────

export async function getJobs(includeUnpublished = false): Promise<JobPost[]> {
  try {
    const rows = await supabaseSelect("jobs", {
      order: "number.asc",
    });
    if (rows && rows.length > 0) {
      const mapped = rows.map(mapJobRow);
      return includeUnpublished ? mapped : mapped.filter((j) => j.published !== false);
    }
  } catch (err) {
    console.warn("[careers] Failed to fetch jobs from Supabase, using static fallback:", err);
  }
  return includeUnpublished ? staticJobs : staticJobs.filter((j) => j.published !== false);
}

export async function getJob(slug: string): Promise<JobPost | null> {
  try {
    const rows = await supabaseSelect("jobs", {
      slug: `eq.${slug}`,
      limit: "1",
    });
    if (rows && rows.length > 0) {
      return mapJobRow(rows[0]);
    }
  } catch (err) {
    console.warn(`[careers] Failed to fetch job ${slug} from Supabase:`, err);
  }
  return staticJobs.find((j) => j.slug === slug) ?? null;
}

export async function getJobSlugs(): Promise<string[]> {
  const jobs = await getJobs();
  return jobs.map((j) => j.slug);
}

