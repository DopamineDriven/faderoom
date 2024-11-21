/// <reference types="@edge-runtime/types" />
/// <reference types="google.analytics" />
/// <reference types="gtag.js" />

declare module "@edge-runtime/types";
declare module "google.analytics";
declare module "gtag.js";

declare global {
  interface Window {
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
