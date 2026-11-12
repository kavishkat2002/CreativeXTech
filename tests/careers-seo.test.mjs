import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("Careers SEO/AEO/GEO helpers generate Google Jobs JobPosting and FAQPage schemas", async (t) => {
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
  const {
    buildJobPostingJsonLd,
    buildCareersHubFaqItems,
    buildJobDetailFaqItems,
    buildFaqPageJsonLd,
    mapEmploymentType,
    isRemoteLocation,
    parseSalaryRange,
  } = await vite.ssrLoadModule("/lib/careers-seo.ts");

  const futureJob = {
    ...staticJobs[0],
    slug: "ai-platform-architect-2027",
    title: "AI Platform Architect",
    location: "Remote (Global)",
    type: "Contract",
    salary_range: "LKR 280,000 – 450,000 / month",
    required_skills: ["TypeScript", "LLM", "Kubernetes"],
  };

  assert.equal(mapEmploymentType("Full-time"), "FULL_TIME");
  assert.equal(mapEmploymentType("Contract"), "CONTRACTOR");
  assert.equal(isRemoteLocation(futureJob.location), true);

  const parsedSalary = parseSalaryRange(futureJob.salary_range);
  assert.equal(parsedSalary?.currency, "LKR");
  assert.equal(parsedSalary?.minValue, 280000);
  assert.equal(parsedSalary?.maxValue, 450000);

  const schema = buildJobPostingJsonLd(futureJob);
  assert.equal(schema["@type"], "JobPosting");
  assert.equal(schema.directApply, true);
  assert.equal(schema.jobLocationType, "TELECOMMUTE");
  assert.equal(schema.employmentType, "CONTRACTOR");
  assert.ok(schema.validThrough);
  assert.match(schema.skills, /TypeScript/);
  assert.match(schema.description, /<h3>Requirements<\/h3>/);
  assert.equal(schema.baseSalary?.currency, "LKR");
  assert.equal(schema.baseSalary?.value?.minValue, 280000);
  assert.equal(schema.baseSalary?.value?.maxValue, 450000);
  assert.ok(Array.isArray(schema.applicantLocationRequirements));
  assert.ok(schema.applicantLocationRequirements.some((r) => r.name === "LK"));
  assert.ok(schema.applicantLocationRequirements.some((r) => r.name === "Worldwide"));

  const hubFaqs = buildCareersHubFaqItems();
  assert.ok(hubFaqs.length >= 6);
  assert.ok(hubFaqs.some((f) => /Sri Lankan/i.test(f.question)));
  assert.ok(hubFaqs.some((f) => /international|foreign/i.test(f.question)));
  assert.ok(hubFaqs.some((f) => /problem-solving/i.test(f.answer)));

  const detailFaqs = buildJobDetailFaqItems(futureJob);
  const faqSchema = buildFaqPageJsonLd(
    detailFaqs,
    "https://creativexlab.online/careers/ai-platform-architect-2027"
  );
  assert.equal(faqSchema["@type"], "FAQPage");
  assert.equal(faqSchema.mainEntity.length, detailFaqs.length);
});

test("mergeJobsWithStatic keeps unseeded static jobs visible alongside Supabase rows", async (t) => {
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

  const { mergeJobsWithStatic, staticJobs } = await vite.ssrLoadModule("/lib/careers.ts");

  // 1. Empty DB rows still return all published static jobs
  const fromEmpty = mergeJobsWithStatic([], false);
  assert.equal(fromEmpty.length, staticJobs.length);
  assert.ok(fromEmpty.some((j) => j.slug === "business-development-intern"));

  // 2. Partial DB rows (e.g. only older job 01) do not hide newer static jobs
  const partialDbRows = [
    {
      id: "db-1",
      slug: "senior-ai-systems-engineer",
      number: "01",
      title: "Principal AI Systems Engineer",
      published: true,
    },
    {
      id: "db-2",
      slug: "fullstack-nextjs-edge-engineer",
      number: "02",
      title: "Full-Stack Next.js & Edge Engineer",
      published: false,
    },
  ];

  const mergedPublished = mergeJobsWithStatic(partialDbRows, false);
  assert.equal(
    mergedPublished.find((j) => j.slug === "senior-ai-systems-engineer")?.title,
    "Principal AI Systems Engineer"
  );
  assert.equal(
    mergedPublished.some((j) => j.slug === "fullstack-nextjs-edge-engineer"),
    false
  );
  assert.ok(mergedPublished.some((j) => j.slug === "business-development-intern"));
  assert.equal(mergedPublished.length, staticJobs.length - 1);

  // 3. includeUnpublished = true includes the unpublished DB row too
  const mergedAll = mergeJobsWithStatic(partialDbRows, true);
  assert.equal(mergedAll.length, staticJobs.length);
});

