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
    default: "Creativex Technology | AI & Software Engineering Company in Sri Lanka",
    template: "%s | Creativex Technology",
  },
  description:
    "Creativex Technology (Pvt) Ltd is a premier AI and software engineering company in Sri Lanka. We engineer custom AI solutions, enterprise ERP systems, business automation, cloud platforms, and web & mobile applications for businesses in Sri Lanka and worldwide.",
  applicationName: "Creativex Technology",
  authors: [{ name: "Creativex Technology (Pvt) Ltd", url: baseUrl }],
  creator: "Creativex Technology (Pvt) Ltd",
  publisher: "Creativex Technology (Pvt) Ltd",
  category: "AI, Custom Software & Enterprise ERP Solutions",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "en-LK": baseUrl,
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
    title: "Creativex Technology | AI & Software Engineering Company in Sri Lanka",
    description:
      "Premier AI development, custom software engineering, enterprise ERP solutions, and business automation for organizations in Sri Lanka and worldwide.",
    type: "website",
    url: baseUrl,
    siteName: "Creativex Technology",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Creativex Technology - AI & Software Engineering Company in Sri Lanka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativex Technology | AI & Software Engineering Company in Sri Lanka",
    description:
      "Premier AI development, custom software engineering, enterprise ERP solutions, and business automation for organizations in Sri Lanka and worldwide.",
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
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${baseUrl}/#organization`,
        name: "Creativex Technology",
        legalName: "Creativex Technology (Pvt) Ltd",
        alternateName: [
          "Creativex Technology",
          "Creativex Tech",
          "Creativex Technology (Pvt) Ltd",
          "Creativex AI Lab",
        ],
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        image: `${baseUrl}/brand/creativex-wordmark.webp`,
        email: "info@creativexlab.online",
        telephone: "+94762345336",
        priceRange: "$$",
        description:
          "Creativex Technology (Pvt) Ltd is a premier AI and software engineering company headquartered in Rajagiriya, Colombo, Sri Lanka. Creativex Technology delivers custom AI development, enterprise ERP systems, IT solutions, business automation, cloud platforms, and full-stack software products for clients across Sri Lanka, Asia-Pacific, and worldwide.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "166 / B Perera Mawatha",
          addressLocality: "Rajagiriya",
          addressRegion: "Western Province",
          addressCountry: "LK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 6.9069,
          longitude: 79.8974,
        },
        areaServed: [
          { "@type": "Country", name: "Sri Lanka" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Malaysia" },
          { "@type": "Country", name: "Singapore" },
          { "@type": "Country", name: "Bangladesh" },
          { "@type": "Country", name: "Nepal" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "United States" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        knowsAbout: [
          "AI Development Company in Sri Lanka",
          "Enterprise ERP Solutions Sri Lanka",
          "Custom Software Development Sri Lanka",
          "IT Solutions Provider in Sri Lanka",
          "AI Automation & Autonomous Agents",
          "WhatsApp AI Chatbots & Business Process Automation",
          "Predictive Analytics & Machine Learning",
          "Cloud Native Infrastructure & DevOps",
          "Web & Mobile Digital Product Engineering",
          "Offshore Software Engineering Squads",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Creativex Technology Core Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Development in Sri Lanka",
                url: `${baseUrl}/ai-development-sri-lanka`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Enterprise ERP Solutions in Sri Lanka",
                url: `${baseUrl}/erp-solutions-sri-lanka`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "IT Solutions & Digital Transformation in Sri Lanka",
                url: `${baseUrl}/it-solutions-sri-lanka`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Software Development in Sri Lanka",
                url: `${baseUrl}/custom-software-development`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation & Autonomous Agents",
                url: `${baseUrl}/services/ai-automation-agents`,
              },
            },
          ],
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "info@creativexlab.online",
            telephone: "+94762345336",
            contactType: "customer service",
            availableLanguage: ["English", "Sinhala"],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            email: "info@creativexlab.online",
            telephone: "+94762345336",
            contactType: "sales",
            availableLanguage: ["English", "Sinhala"],
            areaServed: "Worldwide",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/creativex-technology",
          "https://www.facebook.com/CreativeTechlk",
          "https://www.instagram.com/creativex_tech/",
          "https://www.tiktok.com/@creativex_techno",
          "https://www.youtube.com/@CreativeXTech",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Creativex Technology",
        description:
          "AI and software engineering company in Sri Lanka building AI solutions, ERP systems, custom software, and enterprise automation worldwide.",
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
