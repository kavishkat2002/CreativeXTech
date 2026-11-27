import type { MetadataRoute } from "next";

const baseUrl = "https://www.creativextechnology.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Search engine crawlers ──────────────────────────────────────────
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Googlebot-News",
          "Google-InspectionTool",
          "Bingbot",
          "msnbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "Applebot",
          "Applebot-Extended",
          "LinkedInBot",
          "Twitterbot",
          "facebookexternalhit",
          "FacebookBot",
          "WhatsApp",
        ],
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/api/*",
          "/employee",
          "/employee/",
          "/_env",
          "/rss.xml",
          "/careers/rss.xml",
        ],
      },
      // ── AI / LLM crawlers — allow full content access for GEO/AEO ──────
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "meta-externalagent",
          "DuckAssistBot",
          "Diffbot",
          "YouBot",
          "AnthropicAI",
          "Timpibot",
          "PetalBot",
          "Kangaroo Bot",
        ],
        allow: ["/", "/llms.txt", "/sitemap.xml"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/api/*",
          "/employee",
          "/employee/",
          "/rss.xml",
          "/careers/rss.xml",
        ],
      },
      // ── Wildcard fallback ───────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/api/*",
          "/employee",
          "/employee/",
          "/_env",
          "/rss.xml",
          "/careers/rss.xml",
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
