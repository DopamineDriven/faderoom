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
import { SimplifiedJsonLdService } from "@/lib/jsonld-utils";
import ClientToaster from "@/ui/cta/ClientToaster";
import Footer from "@/ui/footer";
import NavBar from "@/ui/nav";
// import { Nav } from "@/ui/nav/Nav";
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
  description:
    "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves. The Fade Room Inc. is Highland Park's premier barbershop, offering expert haircuts, straight razor shaves, and beard grooming services. Located in the Crossroads Shopping Center.",
  applicationName: "The Fade Room Inc.",
  appleWebApp: {
    title: "The Fade Room Inc.",
    statusBarStyle: "black-translucent",
    startupImage: [{ url: "/apple-icon.png" }]
  },
  verification: {
    google: "l8pnpjizOvb6kENsMvlIwjPZ1IobO2K-zhq42q4Jq2E",
    yandex: "11b85dcb9c04999c",
    yahoo: "393664D4A457844259D7FAF5C4458CD5"
  },
  authors: [{ name: "Andrew Ross", url: "https://github.com/DopamineDriven" }],
  creator: "Andrew Ross",
  publisher: "The Fade Room Inc.",
  formatDetection: {
    telephone: true,
    address: true
  },
  category: "Barbershop",
  keywords: [
    "fresh fades",
    "barber",
    "stylist",
    "haircut",
    "hair salon",
    "barbershop highland park",
    "straight razor shave",
    "local barbershop",
    "hair stylist",
    "sculpted beards",
    "beard grooming",
    "hair salon",
    "men's grooming",
    "waxing",
    "facial",
    "hair trim",
    "highland park barber",
    "professional haircuts",
    "men's haircuts",
    "beard trimming",
    "men's hair salon",
    "premium barbershop",
    "hot towel shave",
    "beard sculpting",
    "hair color for men",
    "gray blending",
    "skin fade",
    "taper fade",
    "pompadour",
    "quiff haircut",
    "male grooming",
    "gentleman's cut",
    "classic barbering",
    "modern barbershop",
    "hair styling for men",
    "beard oil",
    "mustache trim",
    "hair products for men",
    "barber near me",
    "best barbershop Highland Park",
    "Crossroads Shopping Center barber",
    "luxury grooming",
    "men's hair care",
    "father and son haircuts",
    "military haircuts",
    "senior discounts haircut",
    "hair texturing",
    "scalp treatments",
    "men's facial grooming",
    "Highland Park men's salon",
    "North Shore barbershop",
    "Chicago suburbs barber",
    "Lake County grooming services",
    "precision haircuts Illinois",
    "beard grooming Highland Park",
    "men's waxing services",
    "straight razor services",
    "barbershop atmosphere",
    "traditional barbering techniques",
    "modern men's hairstyles"
  ],
  classification: "Business/Local Business/Hair Salon",
  openGraph: {
    title: "The Fade Room Inc. - Premier Barbershop in Highland Park",
    description:
      "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves. Visit Highland Park's finest barbershop for expert grooming services. Located in the Crossroads Shopping Center.",
    url: getSiteUrl(process.env.NODE_ENV),
    siteName: "The Fade Room Inc.",
    locale: "en_US",
    type: "website",
    countryName: "US",
    images: [
      {
        url: new URL("/api/og", getSiteUrl(process.env.NODE_ENV)).toString(),
        width: 1200,
        height: 630,
        alt: "The Fade Room Inc. - Premier Barbershop"
      },
      {
        url: new URL(
          "/meta/apple-touch-icon.png",
          getSiteUrl(process.env.NODE_ENV)
        ).toString(),
        width: 180,
        height: 180,
        alt: "The Fade Room Inc. Logo"
      }
    ],
    phoneNumbers: ["+1-847-780-7239"],
    emails: ["thefaderoom81@gmail.com", "andrew@windycitydevs.io"]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "The Fade Room Inc.",
  //   description:
  //     "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves. Located in the Crossroads Shopping Center, Highland Park.",
  //   images: ["/api/og"],
  //   creator: "@thefaderoominc"
  // },
  facebook: {
    appId: "4099530040060253"
  },
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
  const jsonLd = SimplifiedJsonLdService.toJson("HairSalon", {
    "@id": getSiteUrl(process.env.NODE_ENV),
    name: "The Fade Room Inc.",
    image: [
      new URL("/api/og", getSiteUrl(process.env.NODE_ENV)).toString(),
      new URL(
        "/meta/apple-touch-icon.png",
        getSiteUrl(process.env.NODE_ENV)
      ).toString()
    ],
    logo: new URL(
      "/meta/apple-touch-icon.png",
      getSiteUrl(process.env.NODE_ENV)
    ).toString(),
    description:
      "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves. The Fade Room Inc. is Highland Park's premier barbershop, offering expert haircuts, straight razor shaves, and beard grooming services. Located in the Crossroads Shopping Center.",
    url: getSiteUrl(process.env.NODE_ENV),
    telephone: "+1-847-780-7239",
    address: {
      "@type": "PostalAddress",
      streetAddress: "229 Skokie Valley Rd suite 5",
      addressLocality: "Highland Park",
      addressRegion: "IL",
      postalCode: "60035",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.186089,
      longitude: -87.80018
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday"],
        opens: "09:00",
        closes: "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday"],
        opens: "09:00",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday"],
        opens: "09:00",
        closes: "14:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "06:30",
        closes: "17:00"
      }
    ],
    priceRange: "$$",
    servesCuisine: "None",
    sameAs: [
      "https://www.facebook.com/thefaderoominc/",
      "https://www.instagram.com/thefaderoomhighlandpark/"
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Precision Haircut",
        description:
          "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
        price: "45",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Kids Cut",
        description:
          "Haircut, edge up & neck cleaning with trimmers; hot towel with shampoo; blow dry & style (ages 11 and under)",
        price: "40",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Senior Cut",
        description:
          "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
        price: "40",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Hero Cut",
        description:
          "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style (military/police/firefighters/EMTs only)",
        price: "40",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Haircut & Shave",
        description:
          "Haircut (Beard Trim & Lineup); straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; straight razor shave or beard cleanup/lineup",
        price: "75",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Haircut & Basic Beard Trim",
        description:
          "Haircut; straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; beard cleanup/lineup with electric shaver",
        price: "65",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Shave & Mini Facial",
        description:
          "Clean straight razor shave or beard cleanup with lineup; hot towel & mini facial",
        price: "45",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Basic Beard Trim",
        description:
          "Beard cleanup & edge up with trimmers (no straight blade)",
        price: "35",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Presidential Package",
        description:
          "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; hot steam shave or beard cleanup/lineup; black mask pore cleaner; facial",
        price: "125",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Facial",
        description:
          "Relaxing hot towel facial massage; mud scrub; black mask pore cleaning",
        price: "35",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Gray Camouflage",
        description:
          "Not such a drastic change will still have some gray blended with the color gradually",
        price: "35",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Permanent Hair Color",
        description: "A vibrant, long-lasting full color treatment",
        price: "45",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Eyebrow Wax",
        description: "Shaping, trimming, & waxing of eyebrows",
        price: "16",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Nose Wax",
        description: "Waxing of hair within the nostrils",
        price: "10",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Ear Wax",
        description: "Waxing of hair all around the ear",
        price: "10",
        priceCurrency: "USD"
      }
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Highland Park",
        "@id": "https://www.cityhpil.com/"
      },
      {
        "@type": "City",
        name: "Mundelein",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Vernon Hills",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Lincolnshire",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Northbrook",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Libertyville",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Buffalo Grove",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Deerfield",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Lake Zurich",
        addressRegion: "IL"
      },
      {
        "@type": "City",
        name: "Lake Forest",
        addressRegion: "IL"
      }
    ]
  });
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang="en"
        className={`h-full ${BasisGrotesqueProBlack.variable} ${BasisGrotesqueProBlackItalic.variable} ${BasisGrotesqueProBold.variable} ${BasisGrotesqueProBoldItalic.variable} ${BasisGrotesqueProItalic.variable} ${BasisGrotesqueProLight.variable} ${BasisGrotesqueProLightItalic.variable} ${BasisGrotesqueProMedium.variable} ${BasisGrotesqueProMediumItalic.variable} ${BasisGrotesqueProRegular.variable}`}>
        <Script
          id="schema-hairsalon"
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd}
        />
        <body className="relative h-full bg-black">
          <NavBar />
          <div className="relative mx-auto max-w-[1980px]">{children}</div>
          <Footer />
          <ClientToaster />
          {modal}
          <div className="m-auto" id="modal-root" />
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
