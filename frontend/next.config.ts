import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  rewrites: async () => {
    return [
      {
        source: "/api/py/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/:path*"
            : "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
