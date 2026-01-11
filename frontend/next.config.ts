import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  serverExternalPackages: ['onnxruntime-node', 'sharp'],
  // Configuración para Turbopack (Next.js 16+)
  turbopack: {},
};

export default nextConfig;
