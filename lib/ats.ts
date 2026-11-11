import type { ATSResult, JDRequirementMatch, JobPost } from "./careers";

// ─── Skill & Alias Normalization Dictionary ───────────────────────────────────

const SKILL_ALIASES: Record<string, string[]> = {
  "typescript": ["typescript", "ts", "tsx"],
  "javascript": ["javascript", "js", "es6", "ecmascript", "jsx"],
  "next.js": ["next.js", "nextjs", "next js", "app router"],
  "react": ["react", "react.js", "reactjs", "react 18", "react 19"],
  "node.js": ["node.js", "nodejs", "node js"],
  "python": ["python", "py", "fastapi", "django", "flask"],
  "postgresql": ["postgresql", "postgres", "pgvector", "psql", "sql"],
  "supabase": ["supabase", "postgrest"],
  "tailwind css": ["tailwind css", "tailwindcss", "tailwind"],
  "cloudflare workers": ["cloudflare workers", "cloudflare", "wrangler", "workers"],
  "llm": ["llm", "llms", "large language model", "large language models", "gpt", "claude", "gemini"],
  "ai agents": ["ai agents", "ai agent", "agentic", "multi-agent", "tool calling", "function calling"],
  "rag": ["rag", "retrieval augmented generation", "retrieval-augmented generation", "vector search", "embeddings"],
  "rest api": ["rest api", "restful", "rest apis", "webhooks", "http api"],
  "graphql": ["graphql", "gql"],
  "docker": ["docker", "container", "containers", "kubernetes", "k8s"],
  "git": ["git", "github", "gitlab", "version control"],
  "ci/cd": ["ci/cd", "github actions", "continuous integration", "deployment pipeline"],
  "figma": ["figma", "figjam", "auto-layout", "auto layout"],
  "design systems": ["design systems", "design system", "design tokens", "component library", "ui kit"],
  "ui/ux": ["ui/ux", "ui ux", "user interface", "user experience", "interaction design", "product design"],
  "prototyping": ["prototyping", "prototype", "interactive prototype", "framer"],
  "user research": ["user research", "usability testing", "discovery", "user interviews"],
  "wireframing": ["wireframing", "wireframe", "wireframes", "user flows"],
  "saas": ["saas", "b2b", "enterprise software", "dashboard", "control tower"],
  "drizzle orm": ["drizzle", "drizzle orm", "prisma", "orm"],
  "technical seo": ["technical seo", "seo", "geo", "json-ld", "structured data", "core web vitals"],
  "openai api": ["openai", "openai api", "gpt-4", "gpt-4o"],
  "gemini api": ["gemini", "gemini api", "google ai", "vertex ai"],
  "pgvector": ["pgvector", "pinecone", "qdrant", "weaviate", "vector database"],
  "html": ["html", "html5", "semantic html", "accessibility", "wcag", "a11y"],
  "css": ["css", "css3", "scss", "sass", "responsive design"],
  "playwright": ["playwright", "cypress", "testing", "e2e", "unit test", "vitest", "jest"],
  "vite": ["vite", "webpack", "turbopack"],
  "motion design": ["motion design", "animation", "micro-interactions", "gsap"],
  "ai product design": ["ai product design", "ai interfaces", "copilot", "conversational ui"],
  "aws": ["aws", "amazon web services", "s3", "lambda", "ec2"],
  "gcp": ["gcp", "google cloud", "cloud run"],
  "b2b sales": ["b2b sales", "software sales", "solution selling", "enterprise sales", "it sales"],
  "business development": ["business development", "bizdev", "bd", "new business", "client acquisition"],
  "lead generation": ["lead generation", "prospecting", "lead outreach", "outbound"],
  "cold calling": ["cold calling", "cold call", "outbound calls", "telemarketing"],
  "sales pipeline": ["sales pipeline", "pipeline management", "sales targets", "monthly targets", "deal closing", "closing sales"],
  "client relationships": ["client relationships", "relationship building", "relationship-building", "account management", "client meetings"],
  "negotiation": ["negotiation", "negotiations", "deal closing", "follow-ups", "follow ups"],
  "presentation skills": ["presentation skills", "presentations", "pitching", "demos", "product demo"],
  "proposal writing": ["proposal writing", "proposals", "rfp", "quotations"],
  "linkedin outreach": ["linkedin", "linkedin outreach", "networking", "social selling"],
  "communication": ["communication", "english", "sinhala", "tamil"],
  "marketing": ["marketing", "digital marketing", "business management", "business administration"],
  "crm": ["crm", "hubspot", "salesforce", "pipedrive", "zoho"],
};

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "your", "you", "are", "was",
  "were", "will", "have", "has", "had", "our", "out", "all", "can", "able", "about", "across",
  "using", "used", "use", "work", "working", "team", "teams", "build", "building", "strong",
  "experience", "years", "year", "solid", "good", "great", "including", "such", "well", "high",
  "plus", "preferred", "required", "skills", "knowledge", "understanding", "ability", "close",
  "closely", "directly", "modern", "production", "practical", "systems", "system", "platform",
  "platforms", "applications", "application", "solutions", "solution", "design", "develop",
  "engineer", "engineering", "role", "position", "must", "should", "within", "through", "more",
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^a-z0-9.+#/\-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(normalizedHaystack: string, rawTerm: string): boolean {
  const normalizedTerm = normalizeText(rawTerm);
  if (!normalizedTerm) return false;

  const aliases = SKILL_ALIASES[normalizedTerm] ?? [normalizedTerm];
  for (const alias of aliases) {
    const clean = normalizeText(alias);
    if (!clean) continue;
    const pattern = new RegExp(`(^|\\s|/|,|\\()${escapeRegex(clean)}($|\\s|/|,|\\.|\\))`, "i");
    if (pattern.test(normalizedHaystack) || (clean.length >= 4 && normalizedHaystack.includes(clean))) {
      return true;
    }
  }
  return false;
}

// ─── Keyword Extraction from Job Descriptions ─────────────────────────────────

export function extractJobKeywords(job: Partial<JobPost>): string[] {
  const found = new Set<string>();

  for (const skill of job.required_skills ?? []) {
    if (skill.trim()) found.add(skill.trim());
  }

  const corpus = [
    job.title ?? "",
    job.summary ?? "",
    job.description ?? "",
    ...(job.responsibilities ?? []),
    ...(job.requirements ?? []),
  ].join(" ");

  const normalizedCorpus = normalizeText(corpus);

  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    if (aliases.some((alias) => containsTerm(normalizedCorpus, alias))) {
      // Pretty-format known canonical skills
      const prettyMap: Record<string, string> = {
        "typescript": "TypeScript",
        "javascript": "JavaScript",
        "next.js": "Next.js",
        "react": "React",
        "node.js": "Node.js",
        "python": "Python",
        "postgresql": "PostgreSQL",
        "supabase": "Supabase",
        "tailwind css": "Tailwind CSS",
        "cloudflare workers": "Cloudflare Workers",
        "llm": "LLM",
        "ai agents": "AI Agents",
        "rag": "RAG",
        "rest api": "REST API",
        "graphql": "GraphQL",
        "docker": "Docker",
        "git": "Git",
        "ci/cd": "CI/CD",
        "figma": "Figma",
        "design systems": "Design Systems",
        "ui/ux": "UI/UX",
        "prototyping": "Prototyping",
        "user research": "User Research",
        "wireframing": "Wireframing",
        "saas": "SaaS",
        "drizzle orm": "Drizzle ORM",
        "technical seo": "Technical SEO",
        "openai api": "OpenAI API",
        "gemini api": "Gemini API",
        "pgvector": "pgvector",
        "html": "HTML",
        "css": "CSS",
        "playwright": "Playwright",
        "vite": "Vite",
        "motion design": "Motion Design",
        "ai product design": "AI Product Design",
        "aws": "AWS",
        "gcp": "GCP",
        "b2b sales": "B2B Sales",
        "business development": "Business Development",
        "lead generation": "Lead Generation",
        "cold calling": "Cold Calling",
        "sales pipeline": "Sales Pipeline",
        "client relationships": "Client Relationships",
        "negotiation": "Negotiation",
        "presentation skills": "Presentation Skills",
        "proposal writing": "Proposal Writing",
        "linkedin outreach": "LinkedIn Outreach",
        "communication": "Communication",
        "marketing": "Marketing",
        "crm": "CRM",
      };
      found.add(prettyMap[canonical] ?? canonical);
    }
  }

  return Array.from(found);
}

// ─── Resume File Text Extraction (PDF / DOCX / TXT) ────────────────────────────

async function inflateBytes(bytes: Uint8Array, format: "deflate" | "deflate-raw"): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === "undefined") return null;
  try {
    const stream = new DecompressionStream(format);
    const writer = stream.writable.getWriter();
    const copy = new Uint8Array(bytes.byteLength);
    copy.set(bytes);
    await writer.write(copy);
    await writer.close();
    const buffer = await new Response(stream.readable).arrayBuffer();
    return new Uint8Array(buffer);
  } catch {
    return null;
  }
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const decoder = new TextDecoder("utf-8", { fatal: false });
  let offset = 0;

  while (offset + 30 < bytes.length) {
    // ZIP Local File Header signature: 0x04034b50
    if (view.getUint32(offset, true) !== 0x04034b50) {
      offset++;
      continue;
    }

    const compression = view.getUint16(offset + 8, true);
    const compressedSize = view.getUint32(offset + 18, true);
    const fileNameLen = view.getUint16(offset + 26, true);
    const extraLen = view.getUint16(offset + 28, true);
    const nameStart = offset + 30;
    const dataStart = nameStart + fileNameLen + extraLen;
    const fileName = decoder.decode(bytes.subarray(nameStart, nameStart + fileNameLen));

    if (fileName === "word/document.xml" && dataStart + compressedSize <= bytes.length) {
      const compressedData = bytes.subarray(dataStart, dataStart + compressedSize);
      let xmlBytes: Uint8Array | null = null;
      if (compression === 0) {
        xmlBytes = compressedData;
      } else if (compression === 8) {
        xmlBytes = await inflateBytes(compressedData, "deflate-raw");
      }
      if (xmlBytes) {
        const xml = decoder.decode(xmlBytes);
        return xml
          .replace(/<w:p[^>]*>/g, "\n")
          .replace(/<w:tab[^>]*\/>/g, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/[ \t]+/g, " ")
          .replace(/\n\s*\n+/g, "\n")
          .trim();
      }
    }

    offset = Math.max(offset + 1, dataStart + compressedSize);
  }

  return "";
}

function decodePdfLiteralStrings(content: string): string[] {
  const chunks: string[] = [];
  const btRegex = /BT[\s\S]*?ET/g;
  const blocks = content.match(btRegex) ?? [content];

  for (const block of blocks) {
    const tjRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)\s*Tj|\[\s*([^\]]+)\s*\]\s*TJ/g;
    let match: RegExpExecArray | null;
    while ((match = tjRegex.exec(block)) !== null) {
      if (match[1]) {
        const cleaned = match[1]
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, " ")
          .replace(/\\t/g, " ")
          .replace(/\\([()\\])/g, "$1");
        chunks.push(cleaned);
      } else if (match[2]) {
        const innerRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)/g;
        let innerMatch: RegExpExecArray | null;
        const lineParts: string[] = [];
        while ((innerMatch = innerRegex.exec(match[2])) !== null) {
          lineParts.push(
            innerMatch[1]
              .replace(/\\n/g, "\n")
              .replace(/\\([()\\])/g, "$1")
          );
        }
        if (lineParts.length > 0) chunks.push(lineParts.join(""));
      }
    }
  }

  return chunks;
}

async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buffer);
  const latin1 = new TextDecoder("latin1").decode(bytes);
  const extractedParts: string[] = [];

  // 1. Check uncompressed BT/ET blocks directly
  extractedParts.push(...decodePdfLiteralStrings(latin1));

  // 2. Inflate FlateDecode streams
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match: RegExpExecArray | null;
  let streamCount = 0;

  while ((match = streamRegex.exec(latin1)) !== null && streamCount < 60) {
    streamCount++;
    const rawStream = match[1];
    if (!rawStream || rawStream.length < 10) continue;

    const streamBytes = new Uint8Array(rawStream.length);
    for (let i = 0; i < rawStream.length; i++) {
      streamBytes[i] = rawStream.charCodeAt(i) & 0xff;
    }

    const inflated = await inflateBytes(streamBytes, "deflate");
    if (inflated) {
      const decoded = new TextDecoder("latin1").decode(inflated);
      if (decoded.includes("Tj") || decoded.includes("TJ")) {
        extractedParts.push(...decodePdfLiteralStrings(decoded));
      }
    }
  }

  const combined = extractedParts
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  // Filter out PDF structural noise if nothing meaningful extracted
  if (combined.length < 25) return "";
  return combined;
}

export async function extractTextFromResumeFile(
  file: File
): Promise<{ text: string; method: string; warning?: string }> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".txt") || fileName.endsWith(".md") || fileName.endsWith(".csv")) {
    const text = (await file.text()).trim();
    return { text, method: "plain-text" };
  }

  const buffer = await file.arrayBuffer();

  if (fileName.endsWith(".docx")) {
    const text = await extractDocxText(buffer);
    if (text.length >= 20) {
      return { text, method: "docx-xml" };
    }
    return {
      text: "",
      method: "docx-fallback",
      warning: "Could not parse DOCX XML content cleanly. Please paste your resume text below for full ATS detection.",
    };
  }

  if (fileName.endsWith(".pdf")) {
    const text = await extractPdfText(buffer);
    if (text.length >= 30) {
      return { text, method: "pdf-stream" };
    }
    return {
      text: "",
      method: "pdf-fallback",
      warning: "This PDF appears scanned or uses custom font encoding. Please paste your resume text below so the ATS engine can scan and filter requirements accurately.",
    };
  }

  return {
    text: "",
    method: "unsupported",
    warning: "Supported formats for automatic text extraction: PDF, DOCX, TXT, MD. You can also paste your resume text directly.",
  };
}

// ─── ATS Detection & Job Description Filtering Engine ─────────────────────────

function extractSignificantWords(sentence: string): string[] {
  const normalized = normalizeText(sentence);
  return normalized
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

function evaluateJDLine(
  line: string,
  type: "requirement" | "responsibility",
  normalizedResume: string
): JDRequirementMatch {
  const terms = new Set<string>();
  const normalizedLine = normalizeText(line);

  // Pull known skills mentioned in this JD line
  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    if (aliases.some((alias) => containsTerm(normalizedLine, alias))) {
      terms.add(canonical);
    }
  }

  // Also include key domain words from the line
  for (const word of extractSignificantWords(line)) {
    if (terms.size < 8) {
      terms.add(word);
    }
  }

  const termList = Array.from(terms);
  if (termList.length === 0) {
    return {
      text: line,
      type,
      matched: true,
      matchRatio: 1,
      matchedTerms: [],
      missingTerms: [],
    };
  }

  const matchedTerms: string[] = [];
  const missingTerms: string[] = [];

  for (const term of termList) {
    if (containsTerm(normalizedResume, term) || normalizedResume.includes(term)) {
      matchedTerms.push(term);
    } else {
      missingTerms.push(term);
    }
  }

  const matchRatio = matchedTerms.length / termList.length;
  return {
    text: line,
    type,
    matched: matchRatio >= 0.35 || matchedTerms.length >= 2,
    matchRatio: Math.round(matchRatio * 100),
    matchedTerms,
    missingTerms,
  };
}

export function detectATSSignals(resumeText: string): ATSResult["detectedSignals"] {
  const raw = resumeText || "";
  const lower = raw.toLowerCase();
  const words = raw.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(raw);
  const hasPhoneOrLink =
    /(\+?\d[\d\s\-()]{7,}\d)|(https?:\/\/|linkedin\.com|github\.com|portfolio)/i.test(raw);
  const hasExperienceSection =
    /\b(experience|employment|work history|career|projects|roles)\b/i.test(lower);
  const hasSkillsSection =
    /\b(skills|technologies|tech stack|tools|competencies|proficiencies)\b/i.test(lower);
  const hasEducationSection =
    /\b(education|university|degree|bachelor|master|b\.sc|m\.sc|certification)\b/i.test(lower);

  const bulletCount = (raw.match(/(^|\n)\s*[-•*]/g) ?? []).length;

  let atsFormatScore = 0;
  if (hasEmail) atsFormatScore += 20;
  if (hasPhoneOrLink) atsFormatScore += 15;
  if (hasExperienceSection) atsFormatScore += 20;
  if (hasSkillsSection) atsFormatScore += 20;
  if (hasEducationSection) atsFormatScore += 10;
  if (wordCount >= 80) atsFormatScore += 15;
  else if (wordCount >= 30) atsFormatScore += 8;

  return {
    hasEmail,
    hasPhoneOrLink,
    hasExperienceSection,
    hasSkillsSection,
    hasEducationSection,
    wordCount,
    bulletCount,
    atsFormatScore: Math.min(100, atsFormatScore),
  };
}

export function analyzeApplicationATS(
  job: JobPost,
  resumeText: string,
  options?: { coverLetter?: string; yearsExperience?: number }
): ATSResult {
  const combinedText = [resumeText, options?.coverLetter ?? ""].filter(Boolean).join("\n");
  const normalizedResume = normalizeText(combinedText);
  const threshold = typeof job.ats_threshold === "number" ? job.ats_threshold : 60;

  const detectedSignals = detectATSSignals(resumeText);

  // 1. Required skills matching
  const requiredSkills =
    job.required_skills && job.required_skills.length > 0
      ? job.required_skills
      : extractJobKeywords(job);

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of requiredSkills) {
    if (containsTerm(normalizedResume, skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  // 2. Nice-to-have bonus skills
  const bonusSkills: string[] = [];
  for (const skill of job.nice_to_have ?? []) {
    if (containsTerm(normalizedResume, skill)) {
      bonusSkills.push(skill);
    }
  }

  // 3. Job Description requirements & responsibilities filtering
  const jdLines: Array<{ text: string; type: "requirement" | "responsibility" }> = [
    ...(job.requirements ?? []).map((text) => ({ text, type: "requirement" as const })),
    ...(job.responsibilities ?? []).map((text) => ({ text, type: "responsibility" as const })),
  ];

  const jdRequirementMatches = jdLines.map((item) =>
    evaluateJDLine(item.text, item.type, normalizedResume)
  );

  const matchedJdCount = jdRequirementMatches.filter((m) => m.matched).length;
  const jdMatchPercentage =
    jdRequirementMatches.length > 0
      ? Math.round((matchedJdCount / jdRequirementMatches.length) * 100)
      : 100;

  // 4. Weighted ATS Score calculation (0 - 100)
  const requiredScore =
    requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) * 55 : 45;

  const jdScore =
    jdRequirementMatches.length > 0
      ? (jdRequirementMatches.reduce((acc, item) => acc + item.matchRatio / 100, 0) /
          jdRequirementMatches.length) *
        25
      : 20;

  const bonusScore =
    (job.nice_to_have?.length ?? 0) > 0
      ? (bonusSkills.length / job.nice_to_have.length) * 10
      : 5;

  const signalScore = (detectedSignals.atsFormatScore / 100) * 10;

  const rawTotal = normalizedResume.length < 15 ? 0 : Math.round(requiredScore + jdScore + bonusScore + signalScore);
  const score = Math.max(0, Math.min(100, rawTotal));

  let verdict: ATSResult["verdict"] = "filtered_out";
  if (score >= threshold) {
    verdict = "shortlisted";
  } else if (score >= Math.max(35, threshold - 20)) {
    verdict = "review";
  }

  const summary =
    score >= threshold
      ? `Strong ATS match (${score}% >= ${threshold}% threshold). Matched ${matchedSkills.length}/${requiredSkills.length} required skills and ${matchedJdCount}/${jdRequirementMatches.length} JD criteria.`
      : verdict === "review"
      ? `Partial ATS match (${score}%). Candidate covers ${matchedSkills.length}/${requiredSkills.length} core skills; manual review recommended for gaps in ${missingSkills.slice(0, 3).join(", ") || "specific JD requirements"}.`
      : `Filtered below ATS threshold (${score}% < ${threshold}%). Missing key JD skills: ${missingSkills.slice(0, 4).join(", ") || "core role requirements"}.`;

  return {
    score,
    verdict,
    threshold,
    matchedSkills,
    missingSkills,
    bonusSkills,
    detectedSignals,
    jdRequirementMatches,
    jdMatchPercentage,
    summary,
  };
}

export function matchResumeAgainstJobs(
  jobs: JobPost[],
  resumeText: string
): Array<{ job: JobPost; ats: ATSResult }> {
  return jobs
    .map((job) => ({
      job,
      ats: analyzeApplicationATS(job, resumeText),
    }))
    .sort((a, b) => b.ats.score - a.ats.score);
}

