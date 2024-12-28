import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return []
  },

  rewrites: async () => {
    return {


      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://domain.test/:path*'
        },

      ],
    }
  }
};

export default nextConfig;
