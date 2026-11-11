import { NextResponse } from "next/server";

import { getJobs } from "@/lib/careers";

export const dynamic = "force-dynamic";

const baseUrl = "https://creativexlab.online";

export async function GET() {
  const jobs = await getJobs();

  const itemsXml = jobs
    .map((job) => {
      const pubDate = new Date(
        job.updated_at || job.created_at || "2026-10-01T00:00:00.000Z"
      ).toUTCString();
      const link = `${baseUrl}/careers/${job.slug}`;
      const skillsText = job.required_skills?.length
        ? ` Required skills: ${job.required_skills.join(", ")}.`
        : "";
      return `
    <item>
      <title><![CDATA[${job.title} — ${job.department} (${job.location})]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${job.summary}${skillsText}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${job.department}</category>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CreativeX Technology AI Careers &amp; Open Positions</title>
    <link>${baseUrl}/careers</link>
    <description>Live AI engineering, full-stack software, and product design job openings at CreativeX Technology AI.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/careers/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}

