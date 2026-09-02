import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/sitemap.xml",
    host: "https://creativex-ai.kavishkathilakarathn.chatgpt.site",
  };
}
