import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net", // keep if you also need CDN images
      },
      {
        protocol: "https",
        hostname: "myanimelist.net", // add this for your current image
        pathname: "/images/**",      // optional: only allow /images paths
      },
    ],
  },
};


export default nextConfig;