import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "saasta.buildwithiqra.com",
      }
    ],
  },
}

export default nextConfig
