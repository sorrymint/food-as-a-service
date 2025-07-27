import type { NextConfig } from 'next';

// @ts-ignore
// @ts-ignore
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    //nodeMiddleware: true,
    clientSegmentCache: true
  }

};

export default nextConfig;
