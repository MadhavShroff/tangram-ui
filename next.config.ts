import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "saasta.buildwithiqra.com",
      }, {
        hostname: "e1.pngegg.com",
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
}

export default nextConfig
