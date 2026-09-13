import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/project-detail-client";
import { staticProjects, getProjects } from "@/lib/projects";

const baseUrl = "https://creativexlab.online";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug) || staticProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | CreativeX Technology AI",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const ogImage = (project as any).media_url || `${baseUrl}/brand/creativex-robot-lockup.webp`;

  return {
    title: `${project.title} | CreativeX Project Case Study`,
    description: project.headline || project.summary,
    keywords: project.tags,
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
      languages: {
        "en-US": `${baseUrl}/projects/${project.slug}`,
        "x-default": `${baseUrl}/projects/${project.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${project.title} | CreativeX AI Case Study`,
      description: project.headline || project.summary,
      url: `${baseUrl}/projects/${project.slug}`,
      type: "article",
      siteName: "CreativeX Technology AI",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | CreativeX Case Study`,
      description: project.headline || project.summary,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug) || staticProjects.find((p) => p.slug === slug) || null;

  if (!project) {
    notFound();
  }

  const projectBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${baseUrl}/projects/${project.slug}` },
    ],
  };

  const projectArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.summary,
    url: `${baseUrl}/projects/${project.slug}`,
    image: (project as any).media_url || `${baseUrl}/brand/creativex-robot-lockup.webp`,
    publisher: {
      "@type": "Organization",
      name: "CreativeX Technology AI",
      url: baseUrl,
      logo: `${baseUrl}/brand/creativex-wordmark.webp`,
    },
    author: {
      "@type": "Organization",
      name: "CreativeX Technology AI",
    },
    about: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.category,
      operatingSystem: "Cloud / Web / AI",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectBreadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectArticleJsonLd).replace(/</g, "\\u003c") }}
      />
      <ProjectDetailClient initialProject={project} />
    </>
  );
}
