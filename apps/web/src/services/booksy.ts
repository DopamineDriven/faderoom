import type {
  BooksyImagesByPageNumberAndCount,
  BooksyLoginPayload
} from "@/types/booksy-helpers";
import type { CoercionUnion } from "@/types/fs";
import { FsService } from "@/services/fs";
import * as dotenv from "dotenv";
dotenv.config();

export class BooksyService extends FsService {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  private get booksyXFingerprint() {
    return this.booksyEnvKVs?.BOOKSY_BIZ_X_FINGERPRINT ?? "";
  }

  private get booksyApiKey() {
    return this.booksyEnvKVs?.BOOKSY_BIZ_API_KEY ?? "";
  }

  private get booksyEmail() {
    return this.booksyEnvKVs?.BOOKSY_BIZ_EMAIL ?? "";
  }

  private get booksyPassword() {
    return this.booksyEnvKVs?.BOOKSY_BIZ_PASSWORD ?? "";
  }

  public booksyHeadersGET(accessToken: string) {
    return {
      Connection: "keep-alive",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Acccept-Encoding": "gzip, deflate, br",
      "X-fingerprint": this.booksyXFingerprint,
      "X-Access-Token": accessToken,
      "X-Api-Key": this.booksyApiKey
    } as const;
  }

  public get booksyHeadersPOST() {
    return {
      Connection: "keep-alive",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Content-Type": "application/json",
      "X-fingerprint": this.booksyXFingerprint,
      "X-Api-Key": this.booksyApiKey
    } as const;
  }

  public async fetchBooksyPOST(
    url: string,
    body: { [record: string | number | symbol]: unknown }
  ) {
    return await fetch(url, {
      headers: this.booksyHeadersPOST,
      method: "POST",
      credentials: "include",
      keepalive: true,
      cache: "default",
      body: JSON.stringify({ ...body }),
      next: {
        tags: ["booksy"]
      }
    });
  }

  public async fetchBooksyLogin<const T>() {
    return (await this.fetchBooksyPOST(
      `https://us.booksy.com/api/us/2/business_api/account/login?x-api-key=${this.booksyApiKey}&x-fingerprint=${this.booksyXFingerprint}`,
      {
        email: this.booksyEmail,
        password: this.booksyPassword
      }
    ).then(data => data.json())) as Promise<T>;
  }

  public getAccessToken(accessTokenHelper = Array.of<string>()) {
    try {
      (() =>
        this.fetchBooksyLogin<BooksyLoginPayload>().then(data => {
          accessTokenHelper.push(data.access_token);
          return data.access_token;
        }))().catch(err => console.error(err));
      return accessTokenHelper["0"];
    } catch (err) {
      console.error(err);
      return;
    }
  }

  public get accessToken() {
    return this.getAccessToken() ?? "";
  }

  public async fetchBooksyGET(url: string) {
    return await fetch(url, {
      headers: this.booksyHeadersGET(this.accessToken),
      method: "GET",
      cache: "default",
      next: {
        tags: ["booksy"]
      }
    });
  }

  public async fetchBooksyReviewsPerPageByPage<const T>({
    reviewsPerPage,
    reviewsPageNumber = 1
  }: {
    reviewsPerPage: string | number;
    reviewsPageNumber?: string | number;
  }) {
    return (await this.fetchBooksyGET(
      `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/reviews/?reviews_page=${reviewsPageNumber}&reviews_per_page=${reviewsPerPage}`
    ).then(data => data.json())) as T;
  }

  public async fetchBooksyPhotosPerPage<const T>({
    imagesPerPage,
    imagesPage
  }: {
    imagesPerPage: string | number;
    imagesPage: string | number;
  }) {
    return (await this.fetchBooksyGET(
      `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&images_page=${imagesPage}&images_per_page=${imagesPerPage}`
    ).then(data => data.json())) as T;
  }

  public mapper(props: BooksyImagesByPageNumberAndCount) {
    return props.images.map(async t => {
      return await (async () => {
        const { b64encodedData, extension } = await this.assetToBufferView(
          t.image
        );
        return {
          image_id: t.image_id,
          image: b64encodedData,
          file_extension: extension
        };
      })().then(data => data);
    });
  }

  private writeTarget<
    const T extends string,
    const V extends WithImplicitCoercion<CoercionUnion>
  >(target: T, template: V) {
    return this.withWs({
      path: target,
      data: template,
      cwd: this.cwd
    });
  }

  public async exeGenerateImages() {
    const [data] = await Promise.all([
      this.fetchBooksyPhotosPerPage<BooksyImagesByPageNumberAndCount>({
        imagesPerPage: 40,
        imagesPage: 1
      })
    ]);
    return this.mapper(data).map(async (v, _i) => {
      const { image, image_id, file_extension } = await v;

      const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

      this.writeTarget(
        `public/booksy/images/${image_id}.${file_extension}`,
        Buffer.from(base64Image, "base64")
      );
    });
  }

  public arrayOfImageIds() {
    const getIds = this.readDir({cwd: this.cwd, path: "public/booksy/images"});
    const imgTuple = getIds.map((v) => [v.split(/(\.)/g)[0] ?? "", `/booksy/images/${v}`] as const);
    const toJson = JSON.stringify({ imgIdAndPathTuple: imgTuple }, null, 2);

    this.writeTarget(`src/utils/__generated__/image-tuples.ts`,`export const imageTuple = ${toJson} as const; `)
  }
}
