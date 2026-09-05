import type { Metadata } from "next";
import { ContactClient } from "@/components/contact-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "Contact CreativeX Technology AI | Book a Free AI & Software Consultation",
  description:
    "Get in touch with CreativeX Technology AI to discuss your AI agents, predictive data analytics, IoT operations, cloud, or digital product engineering project.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en-US": `${baseUrl}/contact`,
      "x-default": `${baseUrl}/contact`,
    },
  },
  openGraph: {
    title: "Contact CreativeX Technology AI | AI & Software Consultation",
    description:
      "Get in touch with CreativeX Technology AI to discuss your AI, software, or digital product project.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
