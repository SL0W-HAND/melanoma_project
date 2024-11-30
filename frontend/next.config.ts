import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'smart.servier.com' },
      { protocol: 'https', hostname: 'www.kaggle.com' },
      {protocol: 'http',hostname:'165.227.99.181:8000'}
    ],
  },
};

export default nextConfig;
