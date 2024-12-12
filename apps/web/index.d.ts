/// <reference types="@edge-runtime/types" />
/// <reference types="google.analytics" />
/// <reference types="gtag.js" />
/// <reference types="google.maps" />

declare module "@edge-runtime/types";
declare module "google.analytics";
declare module "google.maps";
declare module "gtag.js";

declare global {
  interface Window {
    initMap: () => void;
    dataLayer?: object[];
  }
}

declare module "http" {
  interface IncomingHttpHeaders {
    "X-fingerprint"?: string;
    "X-Access-Token"?: string;
    "X-Api-Key"?: string;
    "X-Vercel-IP-Timezone"?: string;
    "X-Vercel-IP-City"?: string;
    "X-Vercel-IP-Country"?: string;
  }
}

export {};
