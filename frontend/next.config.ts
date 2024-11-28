import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'smart.servier.com' },
      { protocol: 'https', hostname: 'www.kaggle.com' },
    ],
  },
};

export default nextConfig;
