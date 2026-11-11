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
  } = await vite.ssrLoadModule("/lib/careers-seo.ts");

  const futureJob = {
    ...staticJobs[0],
    slug: "ai-platform-architect-2027",
    title: "AI Platform Architect",
    location: "Remote (Global)",
    type: "Contract",
    required_skills: ["TypeScript", "LLM", "Kubernetes"],
  };

  assert.equal(mapEmploymentType("Full-time"), "FULL_TIME");
  assert.equal(mapEmploymentType("Contract"), "CONTRACTOR");
  assert.equal(isRemoteLocation(futureJob.location), true);

  const schema = buildJobPostingJsonLd(futureJob);
  assert.equal(schema["@type"], "JobPosting");
  assert.equal(schema.directApply, true);
  assert.equal(schema.jobLocationType, "TELECOMMUTE");
  assert.equal(schema.employmentType, "CONTRACTOR");
  assert.ok(schema.validThrough);
  assert.match(schema.skills, /TypeScript/);
  assert.match(schema.description, /<h3>Requirements<\/h3>/);

  const hubFaqs = buildCareersHubFaqItems([...staticJobs, futureJob]);
  assert.ok(hubFaqs.length >= 4);
  assert.ok(hubFaqs.some((f) => /AI Platform Architect/.test(f.answer)));

  const detailFaqs = buildJobDetailFaqItems(futureJob);
  const faqSchema = buildFaqPageJsonLd(
    detailFaqs,
    "https://creativexlab.online/careers/ai-platform-architect-2027"
  );
  assert.equal(faqSchema["@type"], "FAQPage");
  assert.equal(faqSchema.mainEntity.length, detailFaqs.length);
});

