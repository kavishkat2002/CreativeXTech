import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/articles";
import { getProjects } from "@/lib/projects";
import { services } from "@/lib/services";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const projects = await getProjects();
  const updated = new Date();

  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedDate ? new Date(article.updatedDate) : updated,
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.85 : 0.75,
  }));

  return [
    ...coreRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: updated,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];
}
