import type { JobPost } from "./careers";

export type TalentPoolLevel = "intern" | "associate" | "senior";

export type TalentPoolDiscipline =
  | "AI & Agents"
  | "Full-Stack & Edge Engineering"
  | "Product Design & UX"
  | "Business Development & Sales"
  | "Multi-Disciplinary";

export interface TalentPoolTrack {
  id: TalentPoolLevel;
  jobSlug: `talent-pool-${TalentPoolLevel}`;
  number: string;
  levelLabel: string;
  title: string;
  experienceHint: string;
  commitment: string;
  atsThreshold: number;
  summary: string;
  description: string;
  expectations: string[];
  requiredSkills: string[];
  niceToHave: string[];
  highlights: string[];
}

export const TALENT_POOL_DISCIPLINES: TalentPoolDiscipline[] = [
  "AI & Agents",
  "Full-Stack & Edge Engineering",
  "Product Design & UX",
  "Business Development & Sales",
  "Multi-Disciplinary",
];

const DISCIPLINE_SKILLS: Record<
  TalentPoolDiscipline,
  { required: string[]; niceToHave: string[] }
> = {
  "AI & Agents": {
    required: ["Python", "TypeScript", "LLM", "AI Agents", "RAG", "REST API"],
    niceToHave: ["PostgreSQL", "Supabase", "OpenAI API", "Gemini API", "pgvector"],
  },
  "Full-Stack & Edge Engineering": {
    required: ["TypeScript", "Next.js", "React", "PostgreSQL", "REST API", "Git"],
    niceToHave: ["Tailwind CSS", "Supabase", "Cloudflare Workers", "Docker", "CI/CD"],
  },
  "Product Design & UX": {
    required: ["Figma", "UI/UX", "Design Systems", "Prototyping", "Wireframing", "SaaS"],
    niceToHave: ["User Research", "HTML", "CSS", "Tailwind CSS", "AI Product Design"],
  },
  "Business Development & Sales": {
    required: [
      "Business Development",
      "B2B Sales",
      "Lead Generation",
      "Communication",
      "Client Relationships",
      "Sales Pipeline",
    ],
    niceToHave: ["Cold Calling", "LinkedIn Outreach", "Proposal Writing", "Negotiation", "CRM"],
  },
  "Multi-Disciplinary": {
    required: ["TypeScript", "Communication", "AI Agents", "REST API", "Git"],
    niceToHave: ["Next.js", "Python", "Figma", "Business Development", "Supabase"],
  },
};

export const TALENT_POOL_TRACKS: TalentPoolTrack[] = [
  {
    id: "intern",
    jobSlug: "talent-pool-intern",
    number: "01",
    levelLabel: "Intern",
    title: "Intern Talent Pool",
    experienceHint: "0–1 years · Undergraduates & Freshers",
    commitment: "Internship · Full-time / Part-time · Remote or Colombo",
    atsThreshold: 45,
    summary:
      "Join our priority pipeline for upcoming AI engineering, full-stack web, product design, and business development internships.",
    description:
      "Our Intern Talent Pool is built for motivated students, recent graduates, and self-taught builders who learn quickly and want hands-on exposure to production AI agents, edge platforms, design systems, or B2B technology growth. When new internship cohorts or project squads open, we review the Intern pool before posting publicly.",
    expectations: [
      "Foundational projects, coursework, portfolio work, or open-source contributions you can walk us through.",
      "Curiosity about AI workflows, modern software products, or B2B technology operations.",
      "Clear written and verbal communication with strong ownership of assigned deliverables.",
      "Availability for a structured mentorship track (remote or hybrid in Colombo).",
    ],
    requiredSkills: ["Communication", "Git", "TypeScript", "Python", "Figma", "Business Development"],
    niceToHave: ["Next.js", "React", "LLM", "Tailwind CSS", "LinkedIn Outreach"],
    highlights: [
      "Priority consideration before public internship postings",
      "Direct mentorship from senior engineers, designers, and founders",
      "Pathway to Associate full-time roles based on performance",
    ],
  },
  {
    id: "associate",
    jobSlug: "talent-pool-associate",
    number: "02",
    levelLabel: "Associate",
    title: "Associate Talent Pool",
    experienceHint: "1–3 years · Early-Career Specialists",
    commitment: "Full-time · Colombo Hybrid or Remote",
    atsThreshold: 55,
    summary:
      "Fast-track consideration for Associate Engineers, AI Developers, Product Designers, and Growth Associates shipping live client systems.",
    description:
      "The Associate Talent Pool connects early-career builders (1–3 years of industry or production experience) directly with CreativeX squad leads. Associates own meaningful features across Next.js platforms, LLM agent integrations, enterprise UX, and client delivery—with rapid progression toward mid-senior ownership.",
    expectations: [
      "1–3 years of practical experience shipping software, AI applications, digital products, or B2B pipelines.",
      "Comfort taking well-scoped features from design or specification through testing and deployment.",
      "Strong collaboration across engineering, design, and client operations in async/remote workflows.",
      "Evidence of shipped work—live products, repositories, case studies, or measurable growth outcomes.",
    ],
    requiredSkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "REST API", "Git"],
    niceToHave: ["LLM", "AI Agents", "Supabase", "Figma", "Tailwind CSS", "B2B Sales"],
    highlights: [
      "Matched automatically to new Associate roles as client squads expand",
      "Direct technical or portfolio review without repetitive screening hoops",
      "High-velocity ownership on real AI and enterprise products",
    ],
  },
  {
    id: "senior",
    jobSlug: "talent-pool-senior",
    number: "03",
    levelLabel: "Senior",
    title: "Senior Talent Pool",
    experienceHint: "3+ years · Senior, Lead & Principal",
    commitment: "Full-time / Fractional Lead · Global Remote or Colombo",
    atsThreshold: 65,
    summary:
      "Direct executive pipeline for Senior AI Systems Engineers, Full-Stack Architects, and Lead Product Designers ready to architect flagship platforms.",
    description:
      "Our Senior Talent Pool is reserved for experienced engineers, architects, and product designers who can own ambiguous problem spaces end-to-end. Whether we are spinning up a new autonomous agent deployment, logistics control tower, or high-throughput SaaS architecture, Senior pool members are our first call for leadership and principal delivery roles.",
    expectations: [
      "3+ years leading architecture, production reliability, or end-to-end product design on complex systems.",
      "Track record designing scalable data models, LLM orchestration/evaluation, edge infrastructure, or enterprise design systems.",
      "Ability to mentor Associate and Intern builders while interfacing directly with client stakeholders.",
      "Strong judgment around latency, security boundaries, maintainability, and business outcomes.",
    ],
    requiredSkills: ["TypeScript", "Python", "LLM", "AI Agents", "RAG", "PostgreSQL", "Next.js"],
    niceToHave: [
      "Cloudflare Workers",
      "Supabase",
      "Docker",
      "CI/CD",
      "Design Systems",
      "System Architecture",
    ],
    highlights: [
      "Confidential fast-track directly with CreativeX leadership",
      "Shaped around upcoming Senior, Lead, and Principal engagements",
      "Flexible remote global or Colombo studio leadership options",
    ],
  },
];

export function isTalentPoolSlug(slug?: string | null): boolean {
  if (!slug) return false;
  const normalized = slug.toLowerCase().trim();
  return TALENT_POOL_TRACKS.some((t) => t.jobSlug === normalized);
}

export function getTalentPoolLevelFromSlug(
  slug?: string | null
): TalentPoolLevel | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  const track = TALENT_POOL_TRACKS.find(
    (t) => t.jobSlug === normalized || t.id === normalized
  );
  return track ? track.id : null;
}

export function getTalentPoolTrack(levelOrSlug?: string | null): TalentPoolTrack {
  const normalized = (levelOrSlug ?? "").toLowerCase().trim();
  return (
    TALENT_POOL_TRACKS.find(
      (t) => t.id === normalized || t.jobSlug === normalized
    ) ?? TALENT_POOL_TRACKS[1]
  );
}

export function getTalentPoolJobPost(
  levelOrSlug: string,
  discipline?: TalentPoolDiscipline | string
): JobPost {
  const track = getTalentPoolTrack(levelOrSlug);
  const matchedDiscipline = TALENT_POOL_DISCIPLINES.find(
    (d) => d.toLowerCase() === (discipline ?? "").toLowerCase().trim()
  );
  const disciplineConfig = matchedDiscipline
    ? DISCIPLINE_SKILLS[matchedDiscipline]
    : null;

  return {
    id: track.jobSlug,
    slug: track.jobSlug,
    number: track.number,
    title: matchedDiscipline
      ? `${track.title} — ${matchedDiscipline}`
      : track.title,
    department: matchedDiscipline ?? "Talent Pool",
    location: "Remote / Colombo",
    type: track.id === "intern" ? "Internship" : "Full-time",
    level: track.levelLabel,
    salary_range: track.experienceHint,
    summary: track.summary,
    description: track.description,
    responsibilities: track.highlights,
    requirements: track.expectations,
    required_skills: disciplineConfig?.required ?? track.requiredSkills,
    nice_to_have: disciplineConfig?.niceToHave ?? track.niceToHave,
    benefits: track.highlights,
    media_url: null,
    ats_threshold: track.atsThreshold,
    published: true,
    created_at: "2026-11-12T00:00:00.000Z",
  };
}

