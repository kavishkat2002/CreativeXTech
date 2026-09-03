import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/articles";
import { services } from "@/lib/services";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const updated = new Date("2026-09-02");
  const coreRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects/alexa-business-agent", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return [
    ...coreRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: updated,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updatedDate),
      changeFrequency: "monthly" as const,
      priority: article.featured ? 0.8 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
