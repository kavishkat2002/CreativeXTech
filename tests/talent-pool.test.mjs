import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("Talent Pool provides Intern, Associate, and Senior tracks compatible with ATS and getJob", async (t) => {
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

  const {
    TALENT_POOL_TRACKS,
    getTalentPoolJobPost,
    getTalentPoolLevelFromSlug,
    isTalentPoolSlug,
  } = await vite.ssrLoadModule("/lib/talent-pool.ts");
  const { getJob } = await vite.ssrLoadModule("/lib/careers.ts");
  const { analyzeApplicationATS } = await vite.ssrLoadModule("/lib/ats.ts");

  assert.deepEqual(
    TALENT_POOL_TRACKS.map((track) => track.id),
    ["intern", "associate", "senior"]
  );
  assert.deepEqual(
    TALENT_POOL_TRACKS.map((track) => track.jobSlug),
    ["talent-pool-intern", "talent-pool-associate", "talent-pool-senior"]
  );

  assert.equal(isTalentPoolSlug("talent-pool-intern"), true);
  assert.equal(isTalentPoolSlug("talent-pool-associate"), true);
  assert.equal(isTalentPoolSlug("talent-pool-senior"), true);
  assert.equal(isTalentPoolSlug("senior-ai-systems-engineer"), false);

  assert.equal(getTalentPoolLevelFromSlug("talent-pool-associate"), "associate");
  assert.equal(getTalentPoolLevelFromSlug("senior"), "senior");
  assert.equal(getTalentPoolLevelFromSlug("senior-ai-systems-engineer"), null);

  for (const slug of [
    "talent-pool-intern",
    "talent-pool-associate",
    "talent-pool-senior",
  ]) {
    const resolved = await getJob(slug);
    assert.ok(resolved, `Expected getJob("${slug}") to resolve`);
    assert.equal(resolved.slug, slug);
  }

  const seniorAiJob = getTalentPoolJobPost("senior", "AI & Agents");
  assert.equal(seniorAiJob.level, "Senior");
  assert.equal(seniorAiJob.ats_threshold, 65);
  assert.ok(seniorAiJob.required_skills.includes("LLM"));

  const atsResult = analyzeApplicationATS(
    seniorAiJob,
    `
      Jane Doe — Senior AI Systems Architect
      Skills: TypeScript, Python, LLM, AI Agents, RAG, REST API, PostgreSQL, Supabase.
      Experience: 5 years building production LLM orchestration and RAG pipelines.
      Education: BSc Computer Science.
    `
  );
  assert.ok(atsResult.score >= 65);
  assert.equal(atsResult.verdict, "shortlisted");
});

