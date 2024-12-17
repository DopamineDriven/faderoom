/// <reference types="@edge-runtime/types" />
/// <reference types="google.analytics" />
/// <reference types="gtag.js" />
/// <reference types="google.maps" />

declare module "@edge-runtime/types";
declare module "google.analytics";
declare module "google.maps";
declare module "gtag.js";

declare interface Touch {
  identifier: number;
  target: EventTarget;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  radiusX?: number;
  radiusY?: number;
  rotationAngle?: number;
  force?: number;
}

declare interface TouchList {
  length: number;
  item(index: number): Touch | null;
  [index: number]: Touch;
}

declare interface TouchEvent extends UIEvent {
  touches: TouchList;
  targetTouches: TouchList;
  changedTouches: TouchList;
  altKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}

declare interface DocumentTouch extends Document {
  createTouch(
    view: Window,
    target: EventTarget,
    identifier: number,
    pageX: number,
    pageY: number,
    screenX: number,
    screenY: number
  ): Touch;
  createTouchList(...touches: Touch[]): TouchList;
}

declare global {
  interface Window {
    DocumentTouch: new () => DocumentTouch;
    matchMedia(query: string): MediaQueryList;
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
