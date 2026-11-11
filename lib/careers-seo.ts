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

export function buildCareersHubFaqItems(jobs: JobPost[]): CareerFaqItem[] {
  const openTitles =
    jobs.length > 0
      ? jobs.map((j) => `${j.title} (${j.location})`).join(", ")
      : "AI engineering, full-stack software development, and product design roles";

  const allSkills = Array.from(
    new Set(jobs.flatMap((j) => j.required_skills ?? []))
  ).slice(0, 12);

  return [
    {
      question: "What does the hiring process look like?",
      answer:
        "Our process is straightforward and respectful of your time: an initial application and portfolio review, a 30-minute technical or design conversation with the team, a practical real-world system discussion, and a final chat with leadership—typically completed within 1 to 2 weeks.",
    },
    {
      question: "Are positions remote, hybrid, or based in Colombo?",
      answer:
        "We support flexible remote and hybrid work arrangements between our Colombo studio and distributed global collaborators, depending on the role and project delivery needs.",
    },
    {
      question: "What roles and technical skills are you hiring for right now?",
      answer: `We currently have ${jobs.length} open position${
        jobs.length === 1 ? "" : "s"
      }: ${openTitles}.${
        allSkills.length > 0
          ? ` Core capabilities we look for include ${allSkills.join(", ")}.`
          : ""
      }`,
    },
    {
      question: "What do I need to submit when applying?",
      answer:
        "Open the role you want to apply for, upload your CV or resume (PDF, DOCX, TXT, or Markdown), include your contact details and optional LinkedIn or GitHub/portfolio links, and write a brief cover letter (minimum 100 characters) explaining your relevant work.",
    },
    {
      question: "How long does it take to hear back after submitting an application?",
      answer:
        "Every application is screened automatically against the role requirements and reviewed by our hiring team. Shortlisted candidates usually hear back within 3 to 5 business days.",
    },
    {
      question: "Can I still apply if I don’t see my exact title listed?",
      answer:
        "Yes. We regularly meet talented AI engineers, full-stack builders, and systems designers ahead of formal openings—feel free to send us an introduction and portfolio link via our Contact page.",
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

