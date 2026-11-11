import type { Metadata } from "next";

import { CareerApplyPanel } from "@/components/career-apply-panel";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getJob, getJobSlugs } from "@/lib/careers";

const baseUrl = "https://creativexlab.online";

export async function generateStaticParams() {
  const slugs = await getJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Career Role | CreativeX Technology AI",
      description: "Explore engineering and AI roles at CreativeX Technology AI.",
    };
  }

  return {
    title: `${job.title} — Careers | CreativeX Technology AI`,
    description: job.summary,
    keywords: [job.title, job.department, ...(job.required_skills ?? [])],
    alternates: {
      canonical: `${baseUrl}/careers/${job.slug}`,
      languages: {
        "en-US": `${baseUrl}/careers/${job.slug}`,
        "x-default": `${baseUrl}/careers/${job.slug}`,
      },
    },
    openGraph: {
      title: `${job.title} | CreativeX Technology AI`,
      description: job.summary,
      url: `${baseUrl}/careers/${job.slug}`,
      siteName: "CreativeX Technology AI",
      type: "website",
      images: [
        {
          url: job.media_url || `${baseUrl}/brand/creativex-robot-lockup.webp`,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | CreativeX Technology AI`,
      description: job.summary,
      images: [job.media_url || `${baseUrl}/brand/creativex-robot-lockup.webp`],
    },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  const jobPostingJsonLd = job
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: `${job.summary}\n\n${job.description}`,
        employmentType: job.type.toUpperCase().replace("-", "_"),
        datePosted: job.created_at || "2026-10-01",
        hiringOrganization: {
          "@type": "Organization",
          name: "CreativeX Technology PVT LTD",
          sameAs: baseUrl,
          logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
            addressCountry: "LK",
          },
        },
      }
    : null;

  return (
    <main id="top" className="site-shell career-detail-page">
      <SiteHeader activeSection="careers" />
      {jobPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPostingJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <CareerApplyPanel slug={slug} initialJob={job} />
      <SiteFooter />
    </main>
  );
}

