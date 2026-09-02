import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "AI & Software Engineering Services | CreativeX Technology AI",
  description: "Explore CreativeX services across AI automation, predictive analytics, IoT, web and mobile product engineering, cloud solutions, and AI business consultation.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "CreativeX AI & Software Engineering Services",
    description: "Strategy, intelligent systems, and production engineering designed around real business operations.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CreativeX Technology AI services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://creativex-ai.kavishkathilakarathn.chatgpt.site/services/${service.slug}`,
      name: service.title,
      description: service.copy,
    })),
  };
  return (
    <main id="top" className="site-shell services-page">
      <a className="skip-link" href="#services-directory">Skip to services</a>
      <SiteHeader activeSection="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd).replace(/</g, "\\u003c") }} />

      <section className="services-page-hero">
        <div className="services-page-grid" aria-hidden="true" />
        <div className="site-width services-page-hero-layout">
          <p className="section-index">CreativeX services / 2026</p>
          <div>
            <p className="services-page-kicker">Strategy · Product · Engineering · Operations</p>
            <h1>Services designed around the work.</h1>
            <p>From AI strategy to production software, CreativeX connects the business decision, user experience, data, and engineering required to make intelligent systems useful.</p>
            <a href="#services-directory">Explore every service <ArrowDownRight /></a>
          </div>
        </div>
        <span className="services-page-word" aria-hidden="true">BUILD</span>
      </section>

      <section id="services-directory" className="services-directory">
        <div className="site-width">
          <div className="services-directory-head">
            <div><p className="section-index">Capabilities / 01</p><h2>Choose the capability your operation needs.</h2></div>
            <p>Each service can begin as a focused engagement or combine with the others into a complete product and operating system.</p>
          </div>
          <div className="services-directory-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a href={`/services/${service.slug}`} className="service-directory-card" key={service.slug}>
                  <header><span>{service.number}</span><Icon aria-hidden="true" /></header>
                  <p>{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                  <div className="service-directory-card-copy">{service.copy}</div>
                  <div className="service-directory-card-action"><span>Explore service</span><ArrowUpRight /></div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-page-cta">
        <div className="site-width services-page-cta-layout"><p className="section-index">Not sure where to start?</p><div><h2>Bring the workflow. We’ll shape the right engagement.</h2><a href="/contact">Talk with Team Creative <ArrowUpRight /></a></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
