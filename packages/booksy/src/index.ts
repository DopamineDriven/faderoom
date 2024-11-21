export type * as BooksyTypes from "./types/fs.js";

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
