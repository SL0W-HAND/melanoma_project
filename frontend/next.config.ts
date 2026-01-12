import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smart.servier.com',
      },
      {
        protocol: 'https',
        hostname: 'www.kaggle.com',
      },
    ],
  },
};

export default nextConfig;
