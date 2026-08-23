import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@it-daily-store/banner"],
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
      },
    ],
  }
};

export default nextConfig;
