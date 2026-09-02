import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, BookOpen, Braces, ChartNoAxesCombined, Gauge, Network, ScanSearch } from "lucide-react";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { articles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Technology, SEO & GEO Insights | CreativeX Technology AI",
  description: "Practical CreativeX field notes on technical SEO, generative engine optimization, structured data, content systems, performance, and AI visibility.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "CreativeX Technology Insights",
    description: "Practical thinking for discoverable, useful, and dependable technology.",
    url: "/blog",
    type: "website",
  },
};

const icons = [ScanSearch, Network, Braces, BookOpen, Gauge, ChartNoAxesCombined];

export default function BlogPage() {
  const [featured, ...rest] = articles;
  const FeaturedIcon = icons[0];
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CreativeX Technology Insights",
    description: "Original, evidence-led articles about AI products, technical SEO, generative engine optimization, structured data, performance, and dependable software.",
    url: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/blog",
    publisher: { "@id": "https://creativex-ai.kavishkathilakarathn.chatgpt.site/#organization" },
    inLanguage: "en",
    blogPost: articles.map((article) => ({
      "@type": "TechArticle",
      headline: article.title,
      url: `https://creativex-ai.kavishkathilakarathn.chatgpt.site/blog/${article.slug}`,
      datePublished: article.publishedDate,
      dateModified: article.updatedDate,
    })),
  };

  return (
    <main id="top" className="site-shell blog-page">
      <a className="skip-link" href="#blog-content">Skip to articles</a>
      <SiteHeader activeSection="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c") }} />

      <section className="blog-hero">
        <div className="blog-grid-overlay" aria-hidden="true" />
        <div className="site-width blog-hero-layout">
          <p className="section-index">CreativeX field notes / 2026</p>
          <div>
            <p className="blog-kicker">Technology · Search · Generative discovery</p>
            <h1>Ideas for discoverable, useful technology.</h1>
            <p>Clear, evidence-led thinking for teams building AI products, digital platforms, and the content systems people use to understand them.</p>
            <a href="#blog-content">Explore the library <ArrowDownRight /></a>
          </div>
        </div>
        <span className="blog-hero-word" aria-hidden="true">SIGNAL</span>
      </section>

      <section id="blog-content" className="blog-library">
        <div className="site-width">
          <div className="blog-library-head">
            <div>
              <p className="section-index">Featured perspective</p>
              <h2>Start with the signal.</h2>
            </div>
            <p>Original explainers grounded in primary documentation and current research. No ranking promises. No manufactured certainty.</p>
          </div>

          <a className="blog-feature-card" href={`/blog/${featured.slug}`}>
            <div className="blog-feature-visual">
              <span>{featured.number} / {String(articles.length).padStart(2, "0")}</span>
              <FeaturedIcon aria-hidden="true" />
              <i aria-hidden="true" />
              <small>Research note · {featured.category}</small>
            </div>
            <div className="blog-feature-copy">
              <div className="blog-card-meta">
                <span>{featured.category}</span>
                <time dateTime={featured.publishedDate}>{formatArticleDate(featured.publishedDate)}</time>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="blog-tag-list">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="blog-card-action"><span>{featured.readTime}</span><strong>Read article <ArrowUpRight /></strong></div>
            </div>
          </a>

          <div className="blog-card-grid">
            {rest.map((article, index) => {
              const Icon = icons[index + 1];
              return (
                <a className="blog-card" href={`/blog/${article.slug}`} key={article.slug}>
                  <div className="blog-card-visual">
                    <span>{article.number}</span>
                    <Icon aria-hidden="true" />
                    <i aria-hidden="true" />
                  </div>
                  <div className="blog-card-copy">
                    <div className="blog-card-meta"><span>{article.category}</span><time dateTime={article.publishedDate}>{formatArticleDate(article.publishedDate)}</time></div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="blog-card-action"><span>{article.readTime}</span><strong>Read <ArrowUpRight /></strong></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="blog-cta">
        <div className="site-width blog-cta-layout">
          <p className="section-index">Turn knowledge into an operating advantage</p>
          <div><h2>Make your expertise easier to find—and trust.</h2><Link href="/#contact">Plan your discoverability system <ArrowUpRight /></Link></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
