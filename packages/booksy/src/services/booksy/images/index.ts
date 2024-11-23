import * as dotenv from "dotenv";
import type {
  BooksyImagesByPageNumberAndCount,
  BooksyLoginPayload
} from "@/types/booksy.js";
import type { CoercionUnion, Unenumerate } from "@/types/fs.js";
import { ConfigHandler } from "@/services/config/index.js";

dotenv.config();

export class BooksyService extends ConfigHandler {
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

  public cleanDataUrl(props: string) {
    return props.replace(
      /^data:(image|application|video|text|font)\/[A-Za-z0-9+-.]+;base64,/,
      ""
    );
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
      body: JSON.stringify({ ...body })
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

  // public getAccessToken(accessTokenHelper = Array.of<string>()) {
  //   try {
  //     (() =>
  //       this.fetchBooksyLogin<BooksyLoginPayload>().then(data => {
  //         accessTokenHelper.push(data.access_token);
  //         return data.access_token;
  //       }))().catch(err => console.error(err));
  //     return accessTokenHelper["0"];
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
  // }

  // public get accessToken() {
  //   return this.getAccessToken() ?? "";
  // }

  public async fetchBooksyGET(url: string, accessToken: string) {
    return await fetch(url, {
      headers: this.booksyHeadersGET(accessToken),
      method: "GET",
      cache: "default"
    });
  }

  public async fetchBooksyReviewsPerPageByPage<const T>({
    reviewsPerPage,
    reviewsPageNumber = 1
  }: {
    reviewsPerPage: string | number;
    reviewsPageNumber?: string | number;
  }) {
    const [payload] = await Promise.all([
      this.fetchBooksyLogin<BooksyLoginPayload>()
    ]);
    return (await this.fetchBooksyGET(
      `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/reviews/?reviews_page=${reviewsPageNumber}&reviews_per_page=${reviewsPerPage}`,
      payload.access_token
    ).then(data => data.json())) as T;
  }

  public async fetchBooksyPhotosPerPage<const T>({
    imagesPerPage,
    imagesPage
  }: {
    imagesPerPage: string | number;
    imagesPage: string | number;
  }) {
    const [payload] = await Promise.all([
      this.fetchBooksyLogin<BooksyLoginPayload>()
    ]);
    return (await this.fetchBooksyGET(
      `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&images_page=${imagesPage}&images_per_page=${imagesPerPage}`,
      payload.access_token
    ).then(data => data.json())) as T;
  }

  public mapperIIFE(
    t: Unenumerate<BooksyImagesByPageNumberAndCount["images"]>
  ) {
    return (async () => {
      const [{ b64encodedData, extension }] = await Promise.all([
        this.assetToBuffer(t.image)
      ]);
      return {
        image_id: t.image_id,
        width: t.width,
        height: t.height,
        image: b64encodedData,
        file_extension: extension
      };
    })().then(data => data);
  }

  public mapperAlt(props: BooksyImagesByPageNumberAndCount) {
    const data = props.images.map(t => {
      return this.mapperIIFE(t);
    });
    return data;
  }

  public mapper(props: BooksyImagesByPageNumberAndCount) {
    return props?.images?.map(async t => {
      return await (async () => {
        const { b64encodedData, extension } = await this.assetToBuffer(t.image);
        return {
          image_id: t.image_id,
          image: b64encodedData,
          file_extension: extension
        };
      })();
    });
  }

  public writeTarget<
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

      const base64Data = this.cleanDataUrl(image);

      this.writeTarget(
        `public/booksy/images/${image_id}.${file_extension}`,
        Buffer.from(base64Data, "base64")
      );
    });
  }

  public omitFileExtension(v: string) {
    return v.split(/(\.)/g)?.[0] ?? "";
  }

  public async exeGenerateImagesAndImageData(
    arrHelper = Array.of<{
      readonly id: number;
      readonly width: number;
      readonly height: number;
      readonly file_extension: string;
      readonly relative_path: `/booksy/images/${number}`;
    }>()
  ) {
    const [data] = await Promise.all([
      this.fetchBooksyPhotosPerPage<BooksyImagesByPageNumberAndCount>({
        imagesPerPage: 40,
        imagesPage: 1
      })
    ]);

    const derivedData = this.mapperAlt(data);

    try {
      return derivedData.map(async v => {
        const vv = await v;
        const workup = {
          id: vv.image_id,
          width: vv.width,
          height: vv.height,
          file_extension: vv.file_extension,
          relative_path: `/booksy/images/${vv.image_id}`
        } as const;
        arrHelper.push(workup);
        const base64Data = this.cleanDataUrl(vv.image);
        const toJson = JSON.stringify({ data: arrHelper }, null, 2);
        this.writeTarget(
          `src/utils/__generated__/image-data.ts`,
          `export const imageData = ${toJson} as const;`
        );
        this.writeTarget(
          `public/booksy/images/${vv.image_id}.${vv.file_extension}`,
          Buffer.from(base64Data, "base64")
        );
      });
    } catch (err) {
      console.error(err);
    }
  }

  public arrayOfImageIds() {
    const getIds = this.readDir({
      cwd: this.cwd,
      path: "public/booksy/images"
    });

    const imgTuple = getIds.map(
      v => [v.split(/(\.)/g)[0] ?? "", `/booksy/images/${v}`] as const
    );
    const toJson = JSON.stringify({ imgIdAndPathTuple: imgTuple }, null, 2);

    this.writeTarget(
      `src/utils/__generated__/image-tuples.ts`,
      `export const imageTuple = ${toJson} as const; `
    );
  }
}
