import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Cleanly redirect removed SEO pillar pages to core canonical service/solution pages
      {
        source: "/custom-software-development",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/it-solutions-sri-lanka",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/ai-development-sri-lanka",
        destination: "/services/ai-automation-agents",
        permanent: true,
      },
      {
        source: "/erp-solutions-sri-lanka",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/blog/core-web-vitals-ai-discovery",
        destination: "/blog/technical-seo-ai-software-companies",
        permanent: true,
      },
      // Enforce HTTPS on production reverse-proxy requests
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
      // Canonicalize all hostname variations to https://www.creativextechnology.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "creativextechnology.com" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "creativexlab.online" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.creativexlab.online" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
