import { NextResponse } from "next/server";

import { getJobs } from "@/lib/careers";
import { CAREERS_BASE_URL, buildJobPostingJsonLd } from "@/lib/careers-seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await getJobs();

  return NextResponse.json(
    {
      organization: "CreativeX Technology PVT LTD",
      brand: "CreativeX Technology AI",
      careersUrl: `${CAREERS_BASE_URL}/careers`,
      totalOpenPositions: jobs.length,
      updatedAt: new Date().toISOString(),
      positions: jobs.map((job) => ({
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        level: job.level,
        salary_range: job.salary_range || null,
        summary: job.summary,
        required_skills: job.required_skills,
        nice_to_have: job.nice_to_have,
        applyUrl: `${CAREERS_BASE_URL}/careers/${job.slug}`,
        schema: buildJobPostingJsonLd(job, CAREERS_BASE_URL),
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}

