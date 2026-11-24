import type { Metadata } from "next";
import { ContactClient } from "@/components/contact-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Contact Us | Talk to Creativex Technology Engineers",
  description:
    "Talk to our engineering team in Colombo about your AI, ERP, or custom software project. Book a consultation or prepare your project brief with Creativex Technology.",
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
      "en-AU": `${baseUrl}/contact`,
      "en-LK": `${baseUrl}/contact`,
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
    locale: "en_US",
    images: [{ url: `${baseUrl}/og.png`, width: 1730, height: 909, alt: "Contact Creativex Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creativex_tech",
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
        "@id": `${baseUrl}/contact/#contactpage`,
        name: "Contact Creativex Technology",
        url: `${baseUrl}/contact`,
        description: "Schedule an AI and software engineering consultation with Creativex Technology.",
        mainEntity: { "@id": `${baseUrl}/#organization` },
        isPartOf: { "@id": `${baseUrl}/#website` },
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".contact-hero"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/contact/#breadcrumb`,
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
