import { relative } from "path";
import { FsService } from "./fs";

export class SitemapService extends FsService {
  constructor(
    public docs: typeof import("@/utils/__generated__/image-object").imageData.data,
    public override cwd: string
  ) {
    super((cwd ??= process.cwd()));
  }
  public get productionUrl() {
    return "https://www.thefaderoominc.com" as const;
  }
  public get previewUrl() {
    return "https://thefaderoominc-dev.vercel.app" as const;
  }
  public get localUrl() {
    return "http://localhost:3007" as const;
  }

  public get siteUrl() {
    return process.env.VERCEL_ENV === "production"
      ? this.productionUrl
      : process.env.VERCEL_ENV === "preview"
        ? this.previewUrl
        : process.env.NODE_ENV === "development"
          ? this.localUrl
          : this.localUrl;
  }
  get targetObj() {
    return {
      alpha: 0,
      beta: 1
    } as const;
  }

  public handleDynamics = <const T extends keyof typeof this.targetObj>(
    props: string,
    target: T
  ) => {
    return props.split(/\//g)[this.targetObj[target]] satisfies string[][{
      readonly alpha: 0;
      readonly beta: 1;
    }[T]] satisfies string[][(typeof this.targetObj)[T]];
  };

  get nested() {
    return this.docs.map(post => {
      return `photos/${post.id.toString()}`;
    });
  }

  public mapper = (data: string[]) =>
    data.map(path => {
      return path.length < 1
        ? this.siteUrl
        : (`${this.siteUrl}/${path}` as const);
    });

  get allPaths() {
    return this.mapper(
      ["robots.txt", "thefaderoominc.svg", "womens-undercut.png", "apple-icon.png", "favicon.ico", "manifest.webmanifest", ""].concat(
        this.nested
      )
    ).sort((a, b) => a.localeCompare(b) - b.localeCompare(a));
  }

  public templatedData(allPaths: string[]) {
    return allPaths
      .map(path => {
        // prettier-ignore
        return  `<url><loc>${path}</loc><lastmod>${new Date(Date.now()).toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`
      })
      .join("\n");
  }

  public templated() {
    // prettier-ignore
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${this.templatedData(this.allPaths)}
</urlset>` as const
  }

  public wait<const T extends number>(ms: T) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async exe() {
    this.withWs({
      data: this.templated(),
      path: relative(this.cwd, "public/sitemap.xml"),
      cwd: this.cwd
    });
  }
}
