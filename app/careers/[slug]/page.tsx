import type { Metadata } from "next";

import { CareerApplyPanel } from "@/components/career-apply-panel";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getJob, getJobSlugs } from "@/lib/careers";
import {
  CAREERS_BASE_URL,
  buildFaqPageJsonLd,
  buildJobDetailFaqItems,
  buildJobPostingJsonLd,
} from "@/lib/careers-seo";

export const dynamic = "force-dynamic";

const baseUrl = CAREERS_BASE_URL;

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
      robots: { index: false, follow: true },
    };
  }

  const skills = [...(job.required_skills ?? []), ...(job.nice_to_have ?? [])];
  const seoTitle = `${job.title} (${job.location}) — Careers | CreativeX Technology AI`;
  const seoDescription = `${job.summary} Department: ${job.department}. Type: ${job.type}. Skills: ${
    job.required_skills?.slice(0, 6).join(", ") || job.department
  }. Apply online at CreativeX Technology AI.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      job.title,
      `${job.title} ${job.location}`,
      `${job.title} CreativeX`,
      job.department,
      job.location,
      job.type,
      "CreativeX Technology AI Careers",
      ...skills,
    ],
    alternates: {
      canonical: `${baseUrl}/careers/${job.slug}`,
      languages: {
        "en-US": `${baseUrl}/careers/${job.slug}`,
        "x-default": `${baseUrl}/careers/${job.slug}`,
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
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/careers/${job.slug}`,
      siteName: "CreativeX Technology AI",
      locale: "en_US",
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
      title: seoTitle,
      description: seoDescription,
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

  const faqItems = job ? buildJobDetailFaqItems(job, baseUrl) : [];
  const jobGraphJsonLd = job
    ? {
        "@context": "https://schema.org",
        "@graph": [
          buildJobPostingJsonLd(job, baseUrl),
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Careers",
                item: `${baseUrl}/careers`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: job.title,
                item: `${baseUrl}/careers/${job.slug}`,
              },
            ],
          },
          buildFaqPageJsonLd(faqItems, `${baseUrl}/careers/${job.slug}`),
        ],
      }
    : null;

  return (
    <main id="top" className="site-shell career-detail-page">
      <SiteHeader activeSection="careers" />
      {jobGraphJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobGraphJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <CareerApplyPanel slug={slug} initialJob={job} />
      {job && faqItems.length > 0 && (
        <section
          className="careers-faq-section"
          aria-labelledby="role-faq-title"
        >
          <div className="site-width careers-faq-layout">
            <div>
              <p className="section-index">Role overview / Q&amp;A</p>
              <h2 id="role-faq-title">Quick answers about this position.</h2>
            </div>
            <div className="careers-faq-list">
              {faqItems.map((faq, idx) => (
                <article key={idx} className="careers-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
