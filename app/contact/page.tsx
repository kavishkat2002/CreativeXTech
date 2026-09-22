import type { Metadata } from "next";
import { ContactClient } from "@/components/contact-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Contact CreativeX Technology AI | Book a Free AI & Software Consultation",
  description:
    "Get in touch with CreativeX Technology AI to discuss your AI agents, predictive data analytics, IoT operations, cloud, or digital product engineering project.",
  keywords: [
    "Contact CreativeX Technology AI",
    "Book AI Consultation",
    "Enterprise Software Consultation",
    "Hire AI Agents Developers",
    "CreativeX AI Contact",
  ],
  alternates: {
    canonical: `${baseUrl}/contact`,
    languages: {
      "en-US": `${baseUrl}/contact`,
      "x-default": `${baseUrl}/contact`,
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
    title: "Contact CreativeX Technology AI | AI & Software Consultation",
    description:
      "Get in touch with CreativeX Technology AI to discuss your AI, software, or digital product project.",
    url: `${baseUrl}/contact`,
    type: "website",
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Contact CreativeX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CreativeX Technology AI",
    description: "Get in touch with CreativeX Technology AI for custom AI and software engineering.",
    images: [`${baseUrl}/og.png`],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact CreativeX Technology AI",
        url: `${baseUrl}/contact`,
        description: "Schedule an AI and software engineering consultation with CreativeX Technology AI.",
        mainEntity: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${baseUrl}/contact` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c") }}
      />
      <ContactClient />
    </>
  );
}
