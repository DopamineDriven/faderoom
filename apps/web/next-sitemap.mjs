const productionUrl = "https://www.thefaderoominc.com";

const previewUrl = "https://thefaderoominc-dev.vercel.app";

const localUrl = "http://localhost:3007";

/**
 * @param {"development" | "production" | "test" | undefined} env
 */
const getSiteUrl = env =>
  process.env.VERCEL_ENV === "production"
    ? productionUrl
    : process.env.VERCEL_ENV === "preview"
      ? previewUrl
      : !env || env === "development"
        ? localUrl
        : previewUrl;

// @ts-check
/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: getSiteUrl(process.env.NODE_ENV),
  changefreq: "daily",
  priority: 0.9,
  exclude: ["/_*"],
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/*"]
      },
      {
        userAgent: "*",
        disallow: ["/_*"]
      }
    ]
  }
};
