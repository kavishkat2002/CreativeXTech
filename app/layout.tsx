import type { Metadata } from "next";
import { SiteLoader } from "@/components/site-loader";
import "./globals.css";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "CreativeX Technology AI | AI & Software Engineering Company",
  description:
    "A premium tech consultancy delivering highly innovative and strategic solutions to help businesses scale and thrive. We build AI agents, data analytics, and cloud software for real business operations.",
  applicationName: "CreativeX Technology AI",
  authors: [{ name: "CreativeX Technology AI", url: baseUrl }],
  creator: "CreativeX Technology AI",
  publisher: "CreativeX Technology AI",
  category: "AI and software engineering",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "CreativeX Technology AI | AI & Software Engineering Company",
    description:
      "AI agents, analytics, IoT, cloud, and digital product engineering designed around real business operations.",
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
      "AI agents, analytics, IoT, cloud, and digital product engineering for real operations.",
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
        url: baseUrl,
        logo: `${baseUrl}/brand/creativex-wordmark.webp`,
        email: "info@creativexlab.online",
        description: "AI and software engineering company delivering AI automation, predictive analytics, IoT, cloud platforms, and web and mobile products.",
        areaServed: "Worldwide",
        knowsAbout: ["AI automation and agents", "predictive analytics", "IoT and smart operations", "web and mobile product engineering", "cloud solutions", "AI business consultation"],
        contactPoint: { "@type": "ContactPoint", email: "info@creativexlab.online", contactType: "sales and project enquiries", availableLanguage: "English" },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "CreativeX Technology AI",
        description: "AI and software engineering services, industry solutions, project concepts, and practical technology research from CreativeX.",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="codex-preview" content="development" />
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
      </body>
    </html>
  );
}
