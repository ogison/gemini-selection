import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  redirects: async () => [
    {
      source: "/",
      destination: "/home",
      permanent: false,
    },
  ],
};

export default nextConfig;
