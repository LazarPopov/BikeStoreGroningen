// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true, // This triggers a 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;