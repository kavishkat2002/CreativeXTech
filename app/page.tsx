import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "CreativeX Technology AI | AI & Software Company",
  description:
    "Global AI & software consultancy engineering autonomous AI agents, predictive analytics, IoT platforms, and scalable cloud solutions for enterprise operations.",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    title: "CreativeX Technology AI | AI & Software Company",
    description:
      "Global AI agents, predictive analytics, IoT, cloud platforms, and digital product engineering designed for high-performance operations.",
    type: "website",
    url: baseUrl,
  },
};

export default function Home() {
  return <HomePageClient />;
}
