export const getProductionUrl = "https://thefaderoominc.vercel.app" as const;

export const getPreviewUrl = "https://thefaderoominc-dev.vercel.app" as const;

export const getLocalUrl = "http://localhost:3007" as const;

export const envMediatedBaseUrl = (env: typeof process.env.NODE_ENV) =>
  process.env.VERCEL_ENV === "development" ||
  process.env.VERCEL_ENV === "preview"
    ? getPreviewUrl
    : env === "development"
      ? getLocalUrl
      : env === "production" || process.env.VERCEL_ENV === "production"
        ? getProductionUrl
        : env === "test"
          ? getLocalUrl
          : getPreviewUrl;

export const getSiteUrl = (
  env: "development" | "production" | "test" | undefined
) =>
  process.env.VERCEL_ENV === "development"
    ? getPreviewUrl
    : !env || env === "development"
      ? getLocalUrl
      : process.env.VERCEL_ENV
        ? process.env.VERCEL_ENV === "preview"
          ? getPreviewUrl
          : getProductionUrl
        : getPreviewUrl;
