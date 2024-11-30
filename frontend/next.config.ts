import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://165.227.99.181:8000/:path*', // Dirección de tu backend
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'smart.servier.com' },
      { protocol: 'https', hostname: 'www.kaggle.com' },
      {protocol: 'http',hostname:'165.227.99.181:8000'}
    ],
  },
};

export default nextConfig;
