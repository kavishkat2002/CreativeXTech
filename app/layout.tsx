import type { Metadata } from "next";
import { SiteLoader } from "@/components/site-loader";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CreativeX Technology AI | AI & Software Engineering Company",
    template: "%s | CreativeX Technology AI",
  },
  description:
    "A premium global tech consultancy delivering highly innovative AI & software engineering solutions. We build AI agents, predictive data analytics, IoT platforms, and scalable cloud software for real business operations worldwide.",
  applicationName: "CreativeX Technology AI",
  authors: [{ name: "CreativeX Technology AI", url: baseUrl }],
  creator: "CreativeX Technology AI",
  publisher: "CreativeX Technology AI",
  category: "AI and software engineering",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "x-default": baseUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "CreativeX Technology AI | AI & Software Engineering Company",
    description:
      "Global AI agents, predictive analytics, IoT, cloud platforms, and digital product engineering designed for high-performance operations.",
    type: "website",
    url: "/",
    siteName: "CreativeX Technology AI",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "CreativeX Technology AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreativeX Technology AI | AI & Software Engineering Company",
    description:
      "Global AI agents, analytics, IoT, cloud, and digital product engineering for real enterprise operations.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "CreativeX Technology AI",
        alternateName: ["CreativeX", "CreativeX Tech", "CreativeX AI Lab"],
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        email: "info@creativexlab.online",
        description:
          "Global AI and software engineering consultancy delivering autonomous AI agents, predictive analytics, smart IoT operations, resilient cloud platforms, and digital products.",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Worldwide" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Singapore" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Sri Lanka" },
        ],
        knowsAbout: [
          "Artificial Intelligence & Autonomous AI Agents",
          "Predictive Analytics & Machine Learning",
          "Internet of Things (IoT) & Smart Asset Management",
          "Web & Mobile Digital Product Engineering",
          "Cloud Native Infrastructure & Serverless Systems",
          "Generative Engine Optimization (GEO) & AI Solutions",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "info@creativexlab.online",
            contactType: "customer service",
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            email: "info@creativexlab.online",
            contactType: "sales",
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "16/B Perera Mawatha",
          addressLocality: "Rajagiriya",
          addressCountry: "LK",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "CreativeX Technology AI",
        description:
          "AI and software engineering services, enterprise industry solutions, software product concepts, and advanced Generative Engine Optimization research.",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="codex-preview" content="development" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Summary" />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('creativex-loader-seen')==='true')document.documentElement.classList.add('cx-loader-seen')}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased">
        <SiteLoader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
