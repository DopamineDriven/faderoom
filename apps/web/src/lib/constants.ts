import * as dotenv from "dotenv";

dotenv.config();
export const wpApiUrl = process.env.WORDPRESS_API_URL ?? "";

export const wpAuthToken = process.env.WORDPRESS_AUTH_REFRESH_TOKEN ?? "";

export const booksyFingerprint = process.env.BOOKSY_BIZ_X_FINGERPRINT ?? "";

export const booksyApiKey = process.env.BOOKSY_BIZ_API_KEY ?? "";

export const booksyEmail = process.env.BOOKSY_BIZ_EMAIL ?? "";

export const booksyPassword = process.env.BOOKSY_BIZ_PASSWORD ?? "";

console.log(booksyApiKey);

export const wpHeaders = {
  "Content-Type": "application/json",
  Accept: "*/*",
  "Cache-Control": "no-cache",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  Authorization: `Bearer ${wpAuthToken}`
} as const;

export const booksyHeadersPost = {
  Connection: "keep-alive",
  Accept: "*/*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
  "Content-Type": "application/json",
  "X-fingerprint": booksyFingerprint,
  "X-Api-Key": booksyApiKey
} as const;

export const booksyHeadersGet = (acccessToken: string) =>
  ({
    Connection: "keep-alive",
    Accept: "*/*",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
    "Acccept-Encoding": "gzip, deflate, br",
    "X-fingerprint": booksyFingerprint,
    "X-Access-Token": acccessToken,
    "X-Api-Key": booksyApiKey
  }) as const;
