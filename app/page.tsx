import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "CreativeX Technology AI | Global AI Agents & Enterprise Software Consultancy",
  description:
    "Global AI & software consultancy engineering autonomous AI agents, predictive data analytics, IoT platforms, resilient cloud infrastructure, and custom web & mobile software solutions worldwide.",
  keywords: [
    "Autonomous AI Agents",
    "Enterprise Artificial Intelligence",
    "Predictive Data Analytics",
    "IoT Platforms",
    "Cloud Software Engineering",
    "Generative Engine Optimization",
    "GEO Solutions",
    "Global AI Consultancy",
    "CreativeX Technology AI",
  ],
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "x-default": baseUrl,
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
    title: "CreativeX Technology AI | Global AI & Software Engineering",
    description:
      "Enterprise autonomous AI agents, predictive analytics, IoT platforms, and digital product engineering built for global operations.",
    type: "website",
    url: baseUrl,
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "CreativeX Technology AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreativeX Technology AI | Global AI & Software Consultancy",
    description:
      "Enterprise autonomous AI agents, predictive analytics, IoT platforms, and digital product engineering built for global operations.",
    images: [`${baseUrl}/og.png`],
  },
};

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "CreativeX Technology AI | Global AI Agents & Enterprise Software",
        description:
          "Global AI & software consultancy engineering autonomous AI agents, predictive analytics, IoT platforms, and scalable cloud solutions for enterprise operations.",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "CreativeX Autonomous AI Agent Suite",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud / Multi-Platform",
        url: baseUrl,
        publisher: { "@id": `${baseUrl}/#organization` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${baseUrl}/contact`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c") }}
      />
      <HomePageClient />
    </>
  );
}

