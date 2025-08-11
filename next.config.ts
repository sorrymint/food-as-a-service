import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
   //n ppr: true,
    clientSegmentCache: true,
    nodeMiddleware: true
  }
};

export default nextConfig;
