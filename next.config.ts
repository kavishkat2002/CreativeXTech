import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // ─────────────────────────────────────────────────────────────────────
      // Hostname-level redirects:
      //   creativexlab.online (old domain) → www.creativextechnology.com
      //   creativextechnology.com (apex, non-www) → www.creativextechnology.com
      //
      // NOTE: These redirects require the new domain to be configured in
      // DNS and in Cloudflare before they take effect in production.
      // For Cloudflare Workers / Pages, also configure a Cloudflare Redirect
      // Rule or Page Rule at the edge for creativexlab.online → creativextechnology.com
      // because hostname-level Next.js redirects only fire when the request
      // is already reaching the Next.js application on that domain.
      // ─────────────────────────────────────────────────────────────────────
      {
        // Redirect non-www new domain to www
        source: "/:path*",
        has: [{ type: "host", value: "creativextechnology.com" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
      {
        // Redirect old domain root to new domain (preserves path)
        source: "/:path*",
        has: [{ type: "host", value: "creativexlab.online" }],
        destination: "https://www.creativextechnology.com/:path*",
        permanent: true,
      },
      {
        // Redirect old domain with www prefix (if ever used)
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
