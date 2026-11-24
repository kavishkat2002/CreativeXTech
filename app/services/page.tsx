import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getServices, getServiceIcon } from "@/lib/services";


const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Services | AI, ERP & Software Engineering | Creativex Technology",
  description: "Explore Creativex Technology's full engineering service directory: custom AI development, enterprise ERP systems, IT solutions, cloud platforms, and dedicated offshore software squads in Sri Lanka.",
  keywords: [
    "AI Engineering Services Sri Lanka",
    "Autonomous AI Agents Development",
    "Predictive Analytics Solutions",
    "Smart IoT Asset Management",
    "Custom Web Product Engineering",
    "Mobile Software Development Sri Lanka",
    "Cloud Architecture & Serverless",
    "Enterprise AI Consultation",
    "Software Engineering Services Colombo",
    "ERP Development Services Sri Lanka",
  ],
  alternates: {
    canonical: `${baseUrl}/services`,
    languages: {
      "en-US": `${baseUrl}/services`,
      "en-AU": `${baseUrl}/services`,
      "en-LK": `${baseUrl}/services`,
      "x-default": `${baseUrl}/services`,
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
    title: "Creativex Technology — AI, ERP & Software Engineering Services",
    description: "Full engineering service directory: AI development, ERP solutions, IT services, cloud platforms, and dedicated offshore squads from Colombo, Sri Lanka.",
    url: `${baseUrl}/services`,
    type: "website",
    siteName: "Creativex Technology",
    locale: "en_US",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Creativex Technology Services" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creativex_tech",
    title: "Creativex Technology — AI, ERP & Software Engineering Services",
    description: "Strategy, intelligent systems, and production engineering designed around real business operations.",
    images: [`${baseUrl}/og.png`],
  },
};

export default async function ServicesPage() {
  const allServices = await getServices();
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Creativex Technology services",
        itemListElement: allServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${baseUrl}/services/${service.slug}`,
          name: service.title,
          description: service.copy,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        ],
      },
    ],
  };

  return (
    <main id="top" className="site-shell services-page">
      <a className="skip-link" href="#services-directory">Skip to services</a>
      <SiteHeader activeSection="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c") }} />

      <section className="services-page-hero">
        <div className="services-page-grid" aria-hidden="true" />
        <div className="site-width services-page-hero-layout">
          <p className="section-index">Creativex Technology services / 2026</p>
          <div>
            <p className="services-page-kicker">Strategy · Product · Engineering · Operations</p>
            <h1>Services designed around the work.</h1>
            <p>From AI strategy to production software, Creativex Technology connects the business decision, user experience, data, and engineering required to make intelligent systems useful.</p>
            <a href="#services-directory" className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-all">
              Explore every service <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="services-directory" className="services-directory">
        <div className="site-width">
          <div className="services-directory-head">
            <div><p className="section-index">Capabilities / 01</p><h2>Choose the capability your operation needs.</h2></div>
            <p>Each service can begin as a focused engagement or combine with the others into a complete product and operating system.</p>
          </div>
          <div className="services-directory-grid">
            {allServices.map((service) => {
              const Icon = getServiceIcon(service.slug);
              const serviceHref = `/services/${service.slug}`;
              return (
                <a href={serviceHref} className="service-directory-card" key={service.slug}>
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
