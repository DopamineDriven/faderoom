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
      { hostname: "tailwindui.com", protocol: "https" },
      { hostname: "d2zdpiztbgorvt.cloudfront.net", protocol: "https" },
      { hostname: "thefaderoomheadless.com", protocol: "https" },
      { hostname: "thefaderoominc.com", protocol: "https" },
      { hostname: "thefaderoominc.vercel.app", protocol: "https" },
      { hostname: "thefaderoominc-dev.vercel.app", protocol: "https" },
      {
        hostname: "adgf6mjgcvaeo8u4.public.blob.vercel-storage.com",
        protocol: "https",
        port: ""
      }
    ]
  },
  productionBrowserSourceMaps: true
} satisfies NextConfig);
