import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Industry Solutions | CreativeX Technology AI",
  description: "AI and software solutions for export and logistics, hospitality, retail, professional services, and SaaS products.",
  alternates: { canonical: "/solutions" },
  openGraph: { title: "AI & Software Solutions by Industry | CreativeX", description: "Operational AI and software solutions for logistics, hospitality, retail, professional services, and SaaS businesses.", url: "/solutions", type: "website" },
};

export default function SolutionsPage() {
  const solutionListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CreativeX Technology AI industry solutions",
    itemListElement: solutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://creativex-ai.kavishkathilakarathn.chatgpt.site/solutions#${solution.slug}`,
      name: solution.label,
      description: solution.copy,
    })),
  };
  return (
    <main id="top" className="site-shell solutions-page">
      <a className="skip-link" href="#solutions-content">Skip to solutions</a>
      <SiteHeader activeSection="solutions" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionListJsonLd).replace(/</g, "\\u003c") }} />

      <div id="solutions-content">
        <section className="solutions-page-hero">
          <div className="solutions-page-grid" aria-hidden="true" />
          <div className="site-width solutions-page-hero-inner">
            <p className="section-index">Industry solutions / 01—05</p>
            <div>
              <h1>Software that understands the operation.</h1>
              <p>We combine AI, data, cloud, IoT, and product engineering around the workflows, constraints, and decisions that make each industry move.</p>
            </div>
          </div>
          <div className="solutions-page-word" aria-hidden="true">SOLUTIONS</div>
        </section>

        <nav className="solution-jump-nav" aria-label="Jump to an industry solution">
          <div className="site-width solution-jump-inner">
            <span>Explore by industry</span>
            <div>
              {solutions.map((solution) => (
                <a href={`#${solution.slug}`} key={solution.slug}><span>{solution.number}</span>{solution.label}</a>
              ))}
            </div>
          </div>
        </nav>

        <section className="solution-detail-list" aria-label="Solution details">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article className="solution-page-detail" id={solution.slug} key={solution.slug}>
                <div className="site-width solution-page-detail-grid">
                  <div className="solution-page-meta">
                    <span>{solution.number} / 05</span>
                    <Icon />
                    <p>Industry operating system</p>
                  </div>
                  <div className="solution-page-copy">
                    <p>{solution.label}</p>
                    <h2>{solution.headline}</h2>
                    <p className="solution-page-lead">{solution.copy}</p>

                    <div className="solution-page-columns">
                      <div>
                        <span>What we build</span>
                        <ul>{solution.capabilities.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                      </div>
                      <div>
                        <span>Designed outcomes</span>
                        <ul>{solution.outcomes.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                      </div>
                    </div>

                    <div className="solution-page-footer">
                      <div><span>Typical system shape</span><strong>{solution.system}</strong></div>
                      <Link href="/#contact">Discuss this solution <ArrowUpRight /></Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="solutions-page-cta">
          <div className="site-width">
            <p className="section-index">Your operating context</p>
            <h2>Don’t see your industry?<br />Bring us the workflow.</h2>
            <Link href="/#contact">Start a solution conversation <ArrowUpRight /></Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
