import type { Metadata, Viewport } from "next";
import React from "react";
import { getSiteUrl } from "@/lib/site-url";
import {
  BasisGrotesqueProBlack,
  BasisGrotesqueProBlackItalic,
  BasisGrotesqueProBold,
  BasisGrotesqueProBoldItalic,
  BasisGrotesqueProItalic,
  BasisGrotesqueProLight,
  BasisGrotesqueProLightItalic,
  BasisGrotesqueProMedium,
  BasisGrotesqueProMediumItalic,
  BasisGrotesqueProRegular
} from "@/styles/fonts";
import "./global.css";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import { Footer } from "@/ui/footer";
import { Nav } from "@/ui/nav/Nav";
// import { Footer } from "@/ui/sections/Footer";
// import { Nav } from "@/ui/sections/Nav";
import * as myGtag from "@/utils/analytics";

export const viewport = {
  colorScheme: "normal",
  userScalable: true,
  themeColor: "#d7be69",
  viewportFit: "auto",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width"
} satisfies Viewport;

export const metadata = {
  metadataBase: new URL(getSiteUrl(process.env.NODE_ENV)),
  title: {
    default: "The Fade Room Inc.",
    template: "%s | The Fade Room Inc."
  },
  description: "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.",
  appleWebApp: {
    capable: true,
    title: "The Fade Room Inc.",
    statusBarStyle: "black-translucent",
    startupImage: [{ url: "/apple-icon.png" }]
  },
  authors: [{ name: "Andrew Ross", url: "https://github.com/DopamineDriven" }],
  icons: [
    {
      type: "image/png",
      rel: "apple-touch-icon",
      url: new URL(
        "/meta/apple-touch-icon.png",
        getSiteUrl(process.env.NODE_ENV)
      ),
      sizes: "180x180"
    },
    {
      type: "image/svg+xml",
      rel: "mask-icon",
      url: new URL(
        "/meta/safari-pinned-tab.svg",
        getSiteUrl(process.env.NODE_ENV)
      )
    },
    {
      type: "image/png",
      rel: "icon",
      url: new URL("/meta/favicon-32x32.png", getSiteUrl(process.env.NODE_ENV)),
      sizes: "32x32"
    },
    {
      type: "image/png",
      rel: "icon",
      url: new URL("/meta/favicon-16x16.png", getSiteUrl(process.env.NODE_ENV)),
      sizes: "16x16"
    }
  ],
  openGraph: { countryName: "US" },
  robots: {
    googleBot: {
      follow: true,
      index: true,
      indexifembedded: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    },
    follow: true,
    index: true,
    indexifembedded: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1
  }
} satisfies Metadata;

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang="en"
        className={`h-full ${BasisGrotesqueProBlack.variable} ${BasisGrotesqueProBlackItalic.variable} ${BasisGrotesqueProBold.variable} ${BasisGrotesqueProBoldItalic.variable} ${BasisGrotesqueProItalic.variable} ${BasisGrotesqueProLight.variable} ${BasisGrotesqueProLightItalic.variable} ${BasisGrotesqueProMedium.variable} ${BasisGrotesqueProMediumItalic.variable} ${BasisGrotesqueProRegular.variable}`}>
        <body className="bg-fr-bg antialiased">
          <div className="m-0 flex min-h-full flex-col justify-between p-0">
            <Nav />
            <main className="">
              {children}
              {modal}
            </main>
            <Footer />
          </div>
          <div id="modal-root" />
        </body>
        <Script
          async
          strategy="afterInteractive"
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${myGtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
         `
          }}
        />
        <Script
          async
          id={myGtag.GA_TRACKING_ID}
          data-test={myGtag.GA_TRACKING_ID}
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${myGtag.GA_TRACKING_ID}`}
        />
      </html>
    </ViewTransitions>
  );
}
