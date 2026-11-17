import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
    qualities: [75, 90],
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
