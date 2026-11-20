import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

const baseUrl = "https://www.creativextechnology.com";

export const metadata: Metadata = {
  title: "AI & Software Engineering Company in Sri Lanka | Creativex Technology",
  description:
    "Creativex Technology is a Sri Lankan AI and software engineering company delivering custom AI solutions, enterprise ERP systems, business automation, web and mobile applications, and IT solutions for businesses in Sri Lanka and worldwide.",
  keywords: [
    "AI Development Company in Sri Lanka",
    "AI Solutions Provider in Sri Lanka",
    "AI Automation Company in Sri Lanka",
    "ERP Solutions Provider in Sri Lanka",
    "IT Solutions Provider in Sri Lanka",
    "Software Development Company in Sri Lanka",
    "Custom Software Development Sri Lanka",
    "AI Development Company in Asia",
    "Software Development Company in Asia",
    "WhatsApp AI Chatbot Sri Lanka",
    "Autonomous AI Agents",
    "Enterprise Software Solutions",
    "Creativex Technology (Pvt) Ltd",
  ],
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "en-LK": baseUrl,
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
    title: "AI & Software Engineering Company in Sri Lanka | Creativex Technology",
    description:
      "Creativex Technology delivers custom AI solutions, enterprise ERP software, business automation, and software engineering for businesses in Sri Lanka and worldwide.",
    type: "website",
    url: baseUrl,
    siteName: "Creativex Technology",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Creativex Technology - AI & Software Engineering in Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Software Engineering Company in Sri Lanka | Creativex Technology",
    description:
      "Creativex Technology delivers custom AI solutions, enterprise ERP software, business automation, and software engineering for businesses in Sri Lanka and worldwide.",
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
        name: "AI & Software Engineering Company in Sri Lanka | Creativex Technology",
        description:
          "Creativex Technology (Pvt) Ltd is an AI and software engineering company in Sri Lanka delivering custom AI development, enterprise ERP systems, IT solutions, and business automation.",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "CreativeOS Work Operating System",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud / Multi-Platform",
        url: `${baseUrl}/creativeos`,
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

