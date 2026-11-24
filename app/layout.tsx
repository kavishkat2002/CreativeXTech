import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteLoader } from "@/components/site-loader";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const baseUrl = "https://www.creativextechnology.com";
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
  category: "Technology — AI & Enterprise Software Engineering",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "en-AU": baseUrl,
      "en-LK": baseUrl,
      "x-default": baseUrl,
    },
  },
  verification: {
    google: [
      "GVZZ1telPd2vPJ5mQlTB7Up1pyeP94YYIVAL0UfYwqc",
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "vb3sWn18iqKIyBI2czOJNniLqFLtlg2mJBl6uxgQkLg",
    ],
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
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "Creativex Technology - AI & Software Engineering Company in Sri Lanka",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creativex_tech",
    creator: "@creativex_tech",
    title: "Creativex Technology | AI & Software Engineering Company in Sri Lanka",
    description:
      "Premier AI development, custom software engineering, enterprise ERP solutions, and business automation for organizations in Sri Lanka and worldwide.",
    images: [{ url: "/og.png", alt: "Creativex Technology" }],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "og:locale:alternate": ["en_LK", "en_GB", "en_AU"],
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
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: `${baseUrl}/brand/creativex-wordmark.webp`,
          contentUrl: `${baseUrl}/brand/creativex-wordmark.webp`,
          width: 400,
          height: 100,
          caption: "Creativex Technology Logo",
        },
        image: {
          "@type": "ImageObject",
          url: `${baseUrl}/og.png`,
          width: 1730,
          height: 909,
        },
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
          postalCode: "10100",
          addressCountry: "LK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 6.9069,
          longitude: 79.8974,
        },
        hasMap: "https://maps.google.com/?q=Rajagiriya,+Colombo,+Sri+Lanka",
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
        knowsLanguage: ["en", "si", "ta"],
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Creativex Technology Core Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation & Autonomous Agents",
                url: `${baseUrl}/services/ai-automation-agents`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Data & Predictive Analytics",
                url: `${baseUrl}/services/data-predictive-analytics`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Cloud Solutions",
                url: `${baseUrl}/services/cloud-solutions`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Software Development",
                url: `${baseUrl}/services/custom-software-development`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web & Mobile Product Engineering",
                url: `${baseUrl}/services/web-mobile-product-engineering`,
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
            availableLanguage: [
              { "@type": "Language", name: "English" },
              { "@type": "Language", name: "Sinhala" },
              { "@type": "Language", name: "Tamil" },
            ],
            areaServed: "Worldwide",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
          {
            "@type": "ContactPoint",
            email: "info@creativexlab.online",
            telephone: "+94762345336",
            contactType: "sales",
            availableLanguage: [
              { "@type": "Language", name: "English" },
              { "@type": "Language", name: "Sinhala" },
            ],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            contactType: "technical support",
            email: "info@creativexlab.online",
            areaServed: "Worldwide",
            availableLanguage: [{ "@type": "Language", name: "English" }],
          },
        ],
        founder: {
          "@type": "Person",
          "@id": `${baseUrl}/#founder`,
          name: "Kavishka Thilakarathna",
          jobTitle: "Executive Director & Technology Lead",
          worksFor: { "@id": `${baseUrl}/#organization` },
        },
        foundingDate: "2024",
        foundingLocation: {
          "@type": "Place",
          name: "Rajagiriya, Colombo, Sri Lanka",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rajagiriya",
            addressRegion: "Western Province",
            addressCountry: "LK",
          },
        },
        slogan: "Engineering Tomorrow's Intelligence Today",
        currenciesAccepted: "LKR, USD, AUD, GBP, EUR, AED, SGD",
        paymentAccepted: "Bank Transfer, Credit Card, Wire Transfer",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/creativex-technology",
          "https://www.facebook.com/CreativeTechlk",
          "https://www.instagram.com/creativex_tech/",
          "https://www.tiktok.com/@creativex_techno",
          "https://www.youtube.com/@CreativeXTech",
          "https://twitter.com/creativex_tech",
        ],
        // Speakable: key factual content blocks readable by voice assistants & AI
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".about-intro", ".services-directory-head", ".faq-section"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Creativex Technology",
        alternateName: ["Creativex Tech", "Creativex AI Lab"],
        description:
          "AI and software engineering company in Sri Lanka building AI solutions, ERP systems, custom software, and enterprise automation worldwide.",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: ["en-US", "en-LK"],
        copyrightYear: new Date().getFullYear(),
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#navigation`,
        name: "Primary Site Navigation",
        description: "Core sitelinks and primary sections of Creativex Technology",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Services",
            description: "Explore our full-lifecycle engineering services across custom AI development, enterprise ERP systems, and cloud platforms.",
            url: `${baseUrl}/services`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Careers",
            description: "Explore open engineering and AI roles at Creativex Technology in Colombo and global remote squads.",
            url: `${baseUrl}/careers`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "About Us",
            description: "Learn about Creativex Technology—a premier Sri Lankan AI and software engineering consultancy delivering autonomous AI agents and cloud solutions worldwide.",
            url: `${baseUrl}/about`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Solutions",
            description: "Industry-tailored AI automation, enterprise ERP software, predictive data models, and IoT operations.",
            url: `${baseUrl}/solutions`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 5,
            name: "CreativeOS",
            description: "Autonomous Work Operating System with workflow automation and predictive capacity analytics.",
            url: `${baseUrl}/creativeos`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 6,
            name: "Projects",
            description: "Representative engineering projects and verified AI and software deployments.",
            url: `${baseUrl}/projects`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 7,
            name: "Contact Us",
            description: "Talk to our engineering team in Colombo about your AI, ERP, or custom software project.",
            url: `${baseUrl}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="GVZZ1telPd2vPJ5mQlTB7Up1pyeP94YYIVAL0UfYwqc" />
        <meta name="codex-preview" content="development" />
        <meta name="format-detection" content="telephone=no" />
        {/* Core Web Vitals — resource hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* AEO/GEO — LLM manifests for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Summary (Compact)" />
        {/* Canonical brand identity */}
        <link rel="me" href="https://www.linkedin.com/company/creativex-technology" />
        <link rel="me" href="https://twitter.com/creativex_tech" />
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
