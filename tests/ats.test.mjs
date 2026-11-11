import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("ATS engine detects signals, scores candidate, and filters JD requirements", async (t) => {
  const vite = await createServer({
    appType: "custom",
    configFile: false,
    root,
    resolve: { alias: { "@": root } },
    server: { middlewareMode: true },
  });

  t.after(async () => {
    await vite.close();
  });

  const { staticJobs } = await vite.ssrLoadModule("/lib/careers.ts");
  const { analyzeApplicationATS, extractJobKeywords, matchResumeAgainstJobs } =
    await vite.ssrLoadModule("/lib/ats.ts");

  const aiEngineerJob = staticJobs[0];

  const strongResume = `
    Alex Silva
    alex.silva@example.com | +94 77 555 1234 | https://github.com/alexsilva

    EXPERIENCE
    Senior AI Engineer - Acme Cloud (2022 - Present)
    - Built multi-agent LLM orchestration workflows with tool calling and human handoffs using TypeScript, Node.js, and Python.
    - Architected hybrid RAG pipelines using PostgreSQL, pgvector, and Supabase for real-time retrieval.
    - Deployed low-latency REST API webhooks on Cloudflare Workers and Next.js.

    SKILLS
    TypeScript, Python, LLM, AI Agents, RAG, PostgreSQL, Supabase, Node.js, REST API, Cloudflare Workers, Docker

    EDUCATION
    B.Sc. Computer Science
  `;

  const weakResume = `
    Sam Fernando
    sam@example.com
    EXPERIENCE
    Graphic Designer and Office Coordinator
    - Created flyers in Photoshop and Illustrator and managed front desk schedules.
  `;

  const strongResult = analyzeApplicationATS(aiEngineerJob, strongResume);
  assert.ok(
    strongResult.score >= aiEngineerJob.ats_threshold,
    `Expected strong resume score >= ${aiEngineerJob.ats_threshold}, got ${strongResult.score}`
  );
  assert.equal(strongResult.verdict, "shortlisted");
  assert.ok(strongResult.detectedSignals.hasEmail);
  assert.ok(strongResult.detectedSignals.hasExperienceSection);
  assert.ok(strongResult.detectedSignals.hasSkillsSection);
  assert.ok(strongResult.matchedSkills.includes("TypeScript"));
  assert.ok(strongResult.matchedSkills.includes("AI Agents"));
  assert.ok(
    strongResult.jdRequirementMatches.some((m) => m.matched),
    "Expected JD requirement lines to match"
  );

  const weakResult = analyzeApplicationATS(aiEngineerJob, weakResume);
  assert.equal(weakResult.verdict, "filtered_out");
  assert.ok(weakResult.score < aiEngineerJob.ats_threshold);
  assert.ok(weakResult.missingSkills.length > 0);

  const extracted = extractJobKeywords({
    title: "Next.js Engineer",
    description: "Build apps with Next.js, TypeScript, Tailwind CSS, and Supabase.",
  });
  assert.ok(extracted.includes("Next.js"));
  assert.ok(extracted.includes("TypeScript"));
  assert.ok(extracted.includes("Tailwind CSS"));
  assert.ok(extracted.includes("Supabase"));

  const ranked = matchResumeAgainstJobs(staticJobs, strongResume);
  assert.equal(ranked[0].job.slug, aiEngineerJob.slug);
});

