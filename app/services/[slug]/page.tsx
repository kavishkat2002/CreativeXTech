import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getService, services } from "@/lib/services";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | CreativeX Technology AI`,
    description: service.copy,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.copy, url: `/services/${service.slug}`, type: "website" },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const ServiceIcon = service.icon;
  const serviceIndex = services.findIndex((item) => item.slug === service.slug);
  const nextService = services[(serviceIndex + 1) % services.length];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.copy,
    url: `${baseUrl}/services/${service.slug}`,
    serviceType: service.title,
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", audienceType: "Organizations improving business operations with AI and software" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.features.map((feature, index) => ({ "@type": "ListItem", position: index + 1, name: feature })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${baseUrl}/services/${service.slug}` },
    ],
  };

  return (
    <main id="top" className="site-shell service-detail-page">
      <a className="skip-link" href="#service-overview">Skip to service details</a>
      <SiteHeader activeSection="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />

      <section className="service-detail-hero">
        <div className="service-detail-grid" aria-hidden="true" />
        <div className="site-width">
          <Link className="service-detail-back" href="/services"><ArrowLeft /> All services</Link>
          <div className="service-detail-hero-layout">
            <div className="service-detail-mark"><ServiceIcon aria-hidden="true" /><span>{service.number} / 06</span></div>
            <div>
              <p className="section-index">{service.eyebrow}</p>
              <h1>{service.title}</h1>
              <p>{service.headline}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="service-overview" className="service-overview">
        <div className="site-width service-overview-layout">
          <p className="section-index">Service overview / 01</p>
          <div><h2>{service.headline}</h2><p>{service.overview}</p><div className="service-detail-tags">{service.details.map((detail) => <span key={detail}>{detail}</span>)}</div></div>
        </div>
      </section>

      <section className="service-deliverables">
        <div className="site-width service-detail-heading">
          <p className="section-index">What we deliver / 02</p>
          <h2>A complete capability—not an isolated feature.</h2>
        </div>
        <div className="site-width service-deliverable-grid">
          {service.features.map((feature, index) => <article key={feature}><span>0{index + 1}</span><Check aria-hidden="true" /><h3>{feature}</h3></article>)}
        </div>
      </section>

      <section className="service-use-cases">
        <div className="site-width service-use-case-layout">
          <div><p className="section-index">Where it creates value / 03</p><h2>Use cases grounded in operational work.</h2></div>
          <div className="service-use-case-list">{service.useCases.map((useCase, index) => <div key={useCase}><span>0{index + 1}</span><strong>{useCase}</strong></div>)}</div>
        </div>
      </section>

      <section className="service-process">
        <div className="site-width service-detail-heading service-detail-heading-light">
          <p className="section-index">How we deliver / 04</p>
          <h2>From operating question to measured release.</h2>
        </div>
        <div className="site-width service-process-grid">
          {service.process.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3></article>)}
        </div>
      </section>

      <section className="service-controls">
        <div className="site-width service-controls-layout">
          <div><p className="section-index">Built-in controls / 05</p><ShieldCheck aria-hidden="true" /><h2>Trust is part of the system design.</h2><p>Controls are defined with the workflow, not added as a final compliance layer.</p></div>
          <div>{service.controls.map((control, index) => <div key={control}><span>0{index + 1}</span><strong>{control}</strong><Check /></div>)}</div>
        </div>
      </section>

      <section className="service-outcomes">
        <div className="site-width service-detail-heading"><p className="section-index">Designed outcomes / 06</p><h2>What better operation should feel like.</h2></div>
        <div className="site-width service-outcome-grid">{service.outcomes.map((outcome, index) => <article key={outcome}><span>0{index + 1}</span><h3>{outcome}</h3></article>)}</div>
      </section>

      <section className="service-next">
        <div className="site-width service-next-layout">
          <div><p className="section-index">Start a {service.title.toLowerCase()} conversation</p><h2>Begin with the workflow and the result you need.</h2><a href="/contact">Discuss this service <ArrowUpRight /></a></div>
          <a className="service-next-card" href={`/services/${nextService.slug}`}><span>Next service / {nextService.number}</span><strong>{nextService.title}</strong><ArrowUpRight /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
