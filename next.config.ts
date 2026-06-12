import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'my1-cdn.pgimgs.com',
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Hide the floating Next.js dev-tools button (dev mode only; never shown in production)
  devIndicators: false,
};

export default nextConfig;
