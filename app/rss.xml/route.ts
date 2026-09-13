import { NextResponse } from "next/server";

import { getArticles } from "@/lib/articles";

const baseUrl = "https://creativexlab.online";

export async function GET() {
  const articles = await getArticles();

  const itemsXml = articles
    .map((article) => {
      const pubDate = new Date(article.publishedDate || "2026-09-02").toUTCString();
      const link = `${baseUrl}/blog/${article.slug}`;
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${article.category}</category>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CreativeX Technology AI Insights &amp; Engineering</title>
    <link>${baseUrl}/blog</link>
    <description>Engineering articles, Generative Engine Optimization (GEO) guides, and enterprise AI software architecture from CreativeX Technology.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
