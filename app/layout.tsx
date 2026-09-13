import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteLoader } from "@/components/site-loader";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const baseUrl = "https://creativexlab.online";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0c0b",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CreativeX Technology AI | AI & Software Engineering",
    template: "%s | CreativeX AI",
  },
  description:
    "Global AI & software consultancy building autonomous AI agents, predictive data analytics, IoT platforms, and scalable cloud solutions for enterprise operations.",
  applicationName: "CreativeX Technology AI",
  authors: [{ name: "CreativeX Technology AI", url: baseUrl }],
  creator: "CreativeX Technology AI",
  publisher: "CreativeX Technology AI",
  category: "AI and software engineering",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "x-default": baseUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg",
    other: {
      "msvalidate.01": "BCF31216FC65CB0D5A1BBDC8BB3E4983",
    },
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
    title: "CreativeX Technology AI | AI & Software Engineering",
    description:
      "Global AI agents, predictive analytics, IoT, cloud platforms, and digital product engineering designed for high-performance operations.",
    type: "website",
    url: baseUrl,
    siteName: "CreativeX Technology AI",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "CreativeX Technology AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreativeX Technology AI | AI & Software Engineering",
    description:
      "Global AI agents, analytics, IoT, cloud, and digital product engineering for real enterprise operations.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: "CreativeX Technology AI",
        alternateName: ["CreativeX", "CreativeX Tech", "CreativeX AI Lab"],
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        image: `${baseUrl}/brand/creativex-wordmark.webp`,
        email: "info@creativexlab.online",
        telephone: "+94762345336",
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
        <meta name="google-site-verification" content="vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg" />
        <meta name="msvalidate.01" content="BCF31216FC65CB0D5A1BBDC8BB3E4983" />
        <meta name="codex-preview" content="development" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Summary" />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('creativex-loader-seen')==='true')document.documentElement.classList.add('cx-loader-seen')}catch(e){}",
          }}
        />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <SiteLoader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        {children}
        <Toaster position="top-center" />
        <WhatsAppButton />
      </body>
    </html>
  );
}
