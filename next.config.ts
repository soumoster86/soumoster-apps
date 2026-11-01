import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Play listings must keep working if a privacy path is ever renamed.
    // /privacy itself stays the studio policy. Only /privacy/<slug> aliases an app policy.
    return [
      {
        source: "/privacy/:slug",
        destination: "/apps/:slug/privacy",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
