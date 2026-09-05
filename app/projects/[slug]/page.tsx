import type { Metadata } from "next";
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
      alternates: { canonical: `/projects/${slug}` },
    };
  }

  return {
    title: `${project.title} | CreativeX Case Study`,
    description: project.headline || project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        "en-US": `${baseUrl}/projects/${project.slug}`,
        "x-default": `${baseUrl}/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.headline || project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
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

  return <ProjectDetailClient initialProject={project} />;
}
