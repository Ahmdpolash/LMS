import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // experimental: {
  //   reactRoot: true,
  //   suspressHydrationWarning: true,
  // },
};

export default nextConfig;
