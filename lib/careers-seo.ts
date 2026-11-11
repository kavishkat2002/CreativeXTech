import type { JobPost } from "./careers";

export const CAREERS_BASE_URL = "https://creativexlab.online";

export function mapEmploymentType(type: string): string {
  const normalized = type.toLowerCase().trim();
  if (normalized.includes("part")) return "PART_TIME";
  if (normalized.includes("contract") || normalized.includes("freelance")) {
    return "CONTRACTOR";
  }
  if (normalized.includes("intern")) return "INTERN";
  if (normalized.includes("temp")) return "TEMPORARY";
  return "FULL_TIME";
}

export function isRemoteLocation(location: string): boolean {
  const lower = location.toLowerCase();
  return (
    lower.includes("remote") ||
    lower.includes("hybrid") ||
    lower.includes("global") ||
    lower.includes("worldwide")
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatJobHtmlDescription(job: JobPost): string {
  const parts: string[] = [];
  if (job.summary) {
    parts.push(`<p><strong>${escapeHtml(job.summary)}</strong></p>`);
  }
  if (job.description) {
    parts.push(`<p>${escapeHtml(job.description)}</p>`);
  }
  if (job.responsibilities?.length) {
    parts.push(
      `<h3>Key Responsibilities</h3><ul>${job.responsibilities
        .map((r) => `<li>${escapeHtml(r)}</li>`)
        .join("")}</ul>`
    );
  }
  if (job.requirements?.length) {
    parts.push(
      `<h3>Requirements</h3><ul>${job.requirements
        .map((r) => `<li>${escapeHtml(r)}</li>`)
        .join("")}</ul>`
    );
  }
  if (job.required_skills?.length) {
    parts.push(
      `<p><strong>Core Skills:</strong> ${escapeHtml(
        job.required_skills.join(", ")
      )}</p>`
    );
  }
  if (job.benefits?.length) {
    parts.push(
      `<h3>Benefits</h3><ul>${job.benefits
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("")}</ul>`
    );
  }
  return parts.join("");
}

function getValidDates(job: JobPost): { datePosted: string; validThrough: string } {
  const rawPosted = job.updated_at || job.created_at || "2026-10-01T00:00:00.000Z";
  const parsed = new Date(rawPosted);
  const postedDate = Number.isNaN(parsed.getTime())
    ? new Date("2026-10-01T00:00:00.000Z")
    : parsed;
  const expiryDate = new Date(postedDate.getTime() + 90 * 24 * 60 * 60 * 1000);

  return {
    datePosted: postedDate.toISOString(),
    validThrough: expiryDate.toISOString(),
  };
}

export function buildJobPostingJsonLd(
  job: JobPost,
  baseUrl = CAREERS_BASE_URL
) {
  const { datePosted, validThrough } = getValidDates(job);
  const remote = isRemoteLocation(job.location || "");
  const allSkills = Array.from(
    new Set([...(job.required_skills ?? []), ...(job.nice_to_have ?? [])])
  );

  return {
    "@type": "JobPosting",
    "@id": `${baseUrl}/careers/${job.slug}#jobposting`,
    url: `${baseUrl}/careers/${job.slug}`,
    title: job.title,
    description: formatJobHtmlDescription(job),
    identifier: {
      "@type": "PropertyValue",
      name: "CreativeX Technology PVT LTD",
      value: job.slug,
    },
    datePosted,
    validThrough,
    employmentType: mapEmploymentType(job.type || "Full-time"),
    directApply: true,
    occupationalCategory: job.department,
    hiringOrganization: {
      "@type": "Organization",
      name: "CreativeX Technology PVT LTD",
      alternateName: "CreativeX Technology AI",
      sameAs: baseUrl,
      logo: `${baseUrl}/brand/creativex-wordmark.webp`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Colombo",
        addressCountry: "LK",
      },
    },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: "Worldwide",
          },
        }
      : {}),
    ...(allSkills.length > 0 ? { skills: allSkills.join(", ") } : {}),
    ...(job.requirements?.length
      ? { qualifications: job.requirements.join(" ") }
      : {}),
    ...(job.responsibilities?.length
      ? { responsibilities: job.responsibilities.join(" ") }
      : {}),
    ...(job.benefits?.length ? { jobBenefits: job.benefits.join(", ") } : {}),
  };
}

export interface CareerFaqItem {
  question: string;
  answer: string;
}

export function buildCareersHubFaqItems(
  jobs: JobPost[],
  baseUrl = CAREERS_BASE_URL
): CareerFaqItem[] {
  const openTitles =
    jobs.length > 0
      ? jobs
          .map((j) => `${j.title} (${j.department}, ${j.location})`)
          .join("; ")
      : "AI engineering, full-stack software development, and product design roles";

  const allSkills = Array.from(
    new Set(jobs.flatMap((j) => j.required_skills ?? []))
  ).slice(0, 14);

  return [
    {
      question: "What jobs are currently open at CreativeX Technology AI?",
      answer: `CreativeX Technology AI currently lists ${jobs.length} open position${
        jobs.length === 1 ? "" : "s"
      } on ${baseUrl}/careers: ${openTitles}. Every active role can be explored and applied for directly online.`,
    },
    {
      question:
        "Does CreativeX Technology AI offer remote or hybrid software and AI engineering roles?",
      answer:
        "Yes. Most engineering, AI systems, and product design roles at CreativeX Technology AI support remote or hybrid collaboration between our Colombo studio and distributed global teams.",
    },
    {
      question:
        "What technical skills and stack does CreativeX Technology hire for?",
      answer:
        allSkills.length > 0
          ? `Depending on the role, CreativeX hires for ${allSkills.join(
              ", "
            )}, alongside strong production engineering and system design fundamentals.`
          : "CreativeX hires across TypeScript, Next.js, Python, LLM/RAG AI agents, PostgreSQL/Supabase, Cloudflare Workers, and Figma product design.",
    },
    {
      question: "How do I apply for a job at CreativeX Technology AI?",
      answer: `Visit ${baseUrl}/careers, open the specific role page, upload your CV or resume (PDF, DOCX, or TXT), write a cover letter, and submit your application directly. Our system automatically evaluates job description fit and forwards qualified profiles to the hiring team.`,
    },
  ];
}

export function buildJobDetailFaqItems(
  job: JobPost,
  baseUrl = CAREERS_BASE_URL
): CareerFaqItem[] {
  const skillsText =
    job.required_skills?.length > 0
      ? job.required_skills.join(", ")
      : "modern AI and software engineering";

  return [
    {
      question: `What does the ${job.title} role at CreativeX Technology AI involve?`,
      answer: `${job.summary} ${job.description}`.trim(),
    },
    {
      question: `What skills are required for ${job.title} at CreativeX Technology?`,
      answer: `Core skills for this ${job.level} ${job.department} role include ${skillsText}. ${
        job.requirements?.[0] ?? ""
      }`.trim(),
    },
    {
      question: `Where is the ${job.title} position located?`,
      answer: `This ${job.type} position is based in ${job.location}. CreativeX Technology AI supports collaborative workflows across Colombo and remote team environments.`,
    },
    {
      question: `How can candidates apply for ${job.title}?`,
      answer: `Candidates can apply directly at ${baseUrl}/careers/${job.slug} by uploading their resume (PDF, DOCX, or TXT) and submitting a cover letter.`,
    },
  ];
}

export function buildFaqPageJsonLd(
  faqs: CareerFaqItem[],
  pageUrl: string
) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

