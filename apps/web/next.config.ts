import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

export default withPWAInit({ dest: "public", register: true, scope: "/app" })({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: "./tsconfig.json" },
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3007",
        protocol: "http"
      },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "tailwindui.com", protocol: "https" }
    ]
  },
  productionBrowserSourceMaps: true
} satisfies NextConfig);