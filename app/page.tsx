import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "CreativeX Technology AI | AI & Software Engineering Company",
  description:
    "A premium global tech consultancy delivering highly innovative AI & software engineering solutions. We build AI agents, predictive data analytics, IoT platforms, and scalable cloud software for real business operations worldwide.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": baseUrl,
      "en-GB": baseUrl,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    title: "CreativeX Technology AI | AI & Software Engineering Company",
    description:
      "Global AI agents, predictive analytics, IoT, cloud platforms, and digital product engineering designed for high-performance operations.",
    type: "website",
    url: "/",
  },
};

export default function Home() {
  return <HomePageClient />;
}
