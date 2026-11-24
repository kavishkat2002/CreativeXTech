import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/articles";
import { getJobs } from "@/lib/careers";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

const baseUrl = "https://www.creativextechnology.com";

/**
 * Last-modified date for static core pages.
 * Update this when making content/structural changes to these pages.
 */
const CORE_LAST_MODIFIED = new Date("2026-11-25T00:00:00.000Z");

/** Fallback date when dynamic content has no timestamp */
const siteFallbackDate = new Date("2026-09-12T00:00:00.000Z");

/**
 * Advanced XML Sitemap Generator — SEO, AEO & GEO Optimised
 *
 * Strategy Principles:
 * 1. Include ONLY 200 OK canonical, indexable URLs for https://www.creativextechnology.com.
 * 2. Omit priority & changefreq fields (ignored by Googlebot & AI crawlers).
 * 3. Provide accurate, meaningful lastModified timestamps to signal crawl priority.
 * 4. Exclude noindex, redirect, draft, admin, and API paths.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * Core canonical routes with accurate lastModified signals.
   */
  const corePaths: Array<{ path: string; date: Date }> = [
    { path: "", date: CORE_LAST_MODIFIED },
    { path: "/creativeos", date: CORE_LAST_MODIFIED },
    { path: "/services", date: CORE_LAST_MODIFIED },
    { path: "/solutions", date: CORE_LAST_MODIFIED },
    { path: "/projects", date: CORE_LAST_MODIFIED },
    { path: "/blog", date: CORE_LAST_MODIFIED },
    { path: "/careers", date: CORE_LAST_MODIFIED },
    { path: "/careers/talent-pool", date: CORE_LAST_MODIFIED },
    { path: "/about", date: CORE_LAST_MODIFIED },
    { path: "/contact", date: CORE_LAST_MODIFIED },
    { path: "/privacy-policy", date: new Date("2026-09-01T00:00:00.000Z") },
    { path: "/terms-and-conditions", date: new Date("2026-09-01T00:00:00.000Z") },
  ];

  const coreEntries: MetadataRoute.Sitemap = corePaths.map(({ path, date }) => ({
    url: `${baseUrl}${path}`,
    lastModified: date,
  }));

  try {
    const articles = await getArticles();
    const projects = await getProjects();
    const services = await getServices();
    const jobs = await getJobs();

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

    const jobEntries: MetadataRoute.Sitemap = (jobs || [])
      .filter((job) => job && job.slug)
      .map((job) => {
        const dateStr = job.updated_at || job.created_at;
        const parsedDate = dateStr ? new Date(dateStr) : siteFallbackDate;
        const validDate = isNaN(parsedDate.getTime()) ? siteFallbackDate : parsedDate;
        return {
          url: `${baseUrl}/careers/${job.slug}`,
          lastModified: validDate,
        };
      });

    return [
      ...coreEntries,
      ...serviceEntries,
      ...projectEntries,
      ...articleEntries,
      ...jobEntries,
    ];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return coreEntries;
  }
}
