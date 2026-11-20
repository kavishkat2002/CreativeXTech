import type { Metadata } from "next";
import { ContactClient } from "@/components/contact-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Contact Creativex Technology | Book an AI & Software Engineering Consultation",
  description:
    "Get in touch with Creativex Technology to discuss your custom AI agents, enterprise ERP systems, cloud platforms, or digital product engineering project.",
  keywords: [
    "Contact Creativex Technology",
    "Book AI Consultation",
    "Enterprise Software Consultation",
    "Hire AI Agents Developers",
    "Creativex Technology Contact",
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
    title: "Contact Creativex Technology | AI & Software Consultation",
    description:
      "Get in touch with Creativex Technology to discuss your AI, enterprise software, or digital product project.",
    url: `${baseUrl}/contact`,
    type: "website",
    siteName: "Creativex Technology",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Contact Creativex Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Creativex Technology",
    description: "Get in touch with Creativex Technology for custom AI and software engineering.",
    images: [`${baseUrl}/og.png`],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact Creativex Technology",
        url: `${baseUrl}/contact`,
        description: "Schedule an AI and software engineering consultation with Creativex Technology.",
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
