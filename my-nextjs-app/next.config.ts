import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/home",
      permanent: false,
    },
  ],
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
    localeDetection: false,
  },
};

export default nextConfig;
