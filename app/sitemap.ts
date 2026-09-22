import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/articles";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";

const baseUrl = "https://creativexlab.online";
const siteFallbackDate = new Date("2026-09-12T00:00:00.000Z");

/**
 * Advanced XML Sitemap Generator (SEO & GEO Optimized)
 * 
 * Strategy Principles:
 * 1. Include ONLY 200 OK canonical, indexable URLs.
 * 2. Omit priority & changefreq fields (ignored by Googlebot & AI crawlers).
 * 3. Provide accurate, dynamic lastModified timestamps to optimize crawl budget.
 * 4. Exclude noindex, redirect, draft, and administrative paths.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core canonical routes
  const corePaths = [
    "",
    "/services",
    "/solutions",
    "/projects",
    "/blog",
    "/about",
    "/contact",
  ];

  const coreEntries: MetadataRoute.Sitemap = corePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: siteFallbackDate,
  }));

  try {
    const articles = await getArticles();
    const projects = await getProjects();
    const services = await getServices();

    const serviceEntries: MetadataRoute.Sitemap = (services || [])
      .filter((service) => service && service.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: siteFallbackDate,
      }));

    const projectEntries: MetadataRoute.Sitemap = (projects || [])
      .filter((project) => project && project.slug)
      .map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: siteFallbackDate,
      }));

    const articleEntries: MetadataRoute.Sitemap = (articles || [])
      .filter((article) => article && article.slug)
      .map((article) => {
        const dateStr = article.updatedDate || article.publishedDate;
        const parsedDate = dateStr ? new Date(dateStr) : siteFallbackDate;
        const validDate = isNaN(parsedDate.getTime()) ? siteFallbackDate : parsedDate;
        return {
          url: `${baseUrl}/blog/${article.slug}`,
          lastModified: validDate,
        };
      });

    return [
      ...coreEntries,
      ...serviceEntries,
      ...projectEntries,
      ...articleEntries,
    ];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return coreEntries;
  }
}

