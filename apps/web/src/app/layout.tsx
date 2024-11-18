import type { Metadata, Viewport } from "next";
import React from "react";
import { ViewTransitions } from "next-view-transitions";
import "./global.css";
import { Geist, Geist_Mono } from "next/font/google";
/* populate relevant values in src/lib/site-url.ts and uncomment for url injetion */
// import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const viewport = {
  colorScheme: "normal",
  userScalable: true,
  themeColor: "#ffffff",
  viewportFit: "auto",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width"
} satisfies Viewport;

export const metadata = {
  /* populate relevant values in src/lib/site-url.ts and uncomment for url injetion */
  // metadataBase: new URL(getSiteUrl(process.env.NODE_ENV)),
  title: {
    default: "@fade/web",
    template: "%s | @fade/web"
  },
  description: "@fade/web created by @d0paminedriven/turbogen"
} satisfies Metadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang='en'>
        <body className={`antialiased ${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
