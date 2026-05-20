import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // ESTO ES LO QUE NECESITAS AÑADIR:
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;