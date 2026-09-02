import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { articles, formatArticleDate, getArticle } from "@/lib/articles";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | CreativeX Technology AI`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: ["CreativeX Technology AI"],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const nextArticle = articles[(articleIndex + 1) % articles.length];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
    author: { "@type": "Organization", name: "CreativeX Technology AI", url: baseUrl },
    publisher: { "@type": "Organization", name: "CreativeX Technology AI", url: baseUrl },
    keywords: article.tags.join(", "),
    inLanguage: "en",
    isAccessibleForFree: true,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Technology insights", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${baseUrl}/blog/${article.slug}` },
    ],
  };

  return (
    <main id="top" className="site-shell article-page">
      <a className="skip-link" href="#article-content">Skip to article</a>
      <SiteHeader activeSection="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />

      <article>
        <header className="article-hero">
          <div className="article-grid-overlay" aria-hidden="true" />
          <div className="site-width">
            <Link className="article-back" href="/blog"><ArrowLeft /> All field notes</Link>
            <div className="article-hero-layout">
              <div className="article-number"><span>{article.number}</span><small>Research note</small></div>
              <div>
                <p className="section-index">{article.category}</p>
                <h1>{article.title}</h1>
                <p className="article-deck">{article.excerpt}</p>
                <div className="article-byline">
                  <span>CreativeX Editorial</span>
                  <time dateTime={article.publishedDate}>{formatArticleDate(article.publishedDate)}</time>
                  <span><Clock3 /> {article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="article-content" className="site-width article-layout">
          <aside className="article-toc" aria-label="On this page">
            <p>On this page</p>
            <nav>{article.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>0{index + 1}</span>{section.heading}</a>)}</nav>
            <div><span>Topics</span>{article.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
          </aside>

          <div className="article-body">
            {article.sections.map((section, index) => (
              <section id={section.id} className="article-section" key={section.id}>
                <div className="article-section-label"><span>0{index + 1}</span><i /></div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check /> <span>{bullet}</span></li>)}</ul>}
              </section>
            ))}

            <section className="article-takeaways">
              <p className="section-index">Working summary</p>
              <h2>What to carry forward</h2>
              <ol>{article.takeaways.map((takeaway, index) => <li key={takeaway}><span>0{index + 1}</span><p>{takeaway}</p></li>)}</ol>
            </section>

            <section className="article-references">
              <p className="section-index">Primary reading</p>
              <h2>Sources and further reading</h2>
              <div>{article.references.map((reference, index) => <a href={reference.href} target="_blank" rel="noreferrer" key={reference.href}><span>0{index + 1}</span><strong>{reference.label}</strong><ArrowUpRight /></a>)}</div>
              <p>Guidance and platform behavior can change. Review the linked primary sources before making high-impact implementation decisions.</p>
            </section>
          </div>
        </div>
      </article>

      <section className="article-next">
        <div className="site-width article-next-layout">
          <p className="section-index">Next field note / {nextArticle.number}</p>
          <a href={`/blog/${nextArticle.slug}`}><span>{nextArticle.category}</span><h2>{nextArticle.title}</h2><strong>Continue reading <ArrowUpRight /></strong></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
