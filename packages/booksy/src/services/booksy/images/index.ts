import { put } from "@vercel/blob";
import type { BooksyImagesByPageNumberAndCount } from "@/types/booksy.js";
import type { CoercionUnion, Unenumerate, UnwrapPromise } from "@/types/fs.js";
import type { BooksyConfig } from "@/types/helpers.js";
import { ConfigHandler } from "@/services/config/index.js";

export class BooksyImageService extends ConfigHandler {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  public resolveConf<const T extends keyof BooksyConfig>(target: T) {
    return this.resolvedConfig()[target];
  }

  public get booksyXFingerprint() {
    return this.resolveConf("booksyBizXFingerprint");
  }

  public get booksyApiKey() {
    return this.resolveConf("booksyBizApiKey");
  }

  public get accessToken() {
    return this.resolveConf("accessToken");
  }

  public cleanDataUrl(props: string) {
    return props.replace(
      /^data:(image|application|video|text|font)\/[A-Za-z0-9+-.]+;base64,/,
      ""
    );
  }

  public get booksyHeadersGET() {
    return {
      Connection: "keep-alive",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Acccept-Encoding": "gzip, deflate, br",
      "X-fingerprint": this.booksyXFingerprint,
      "X-Access-Token": this.accessToken,
      "X-Api-Key": this.booksyApiKey
    } as const;
  }

  public async fetchBooksyGET(url: string) {
    return await fetch(url, {
      headers: this.booksyHeadersGET,
      method: "GET",
      cache: "default"
    });
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
        file_extension: extension,
        modified: new Date(t.created.concat(":00.000Z")).valueOf()
      };
    })().then(data => data);
  }

  public mapperAlt(props: BooksyImagesByPageNumberAndCount) {
    const data = props.images.map(t => {
      return this.mapperIIFE(t);
    });
    return data;
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

  public async getVercelBlobPaths() {
    return this.vercelData().map(v => v.pathname);
  }

  public async compareVercelBlobPathsToIncomingIds(
    props: UnwrapPromise<Unenumerate<ReturnType<typeof this.mapperAlt>>>
  ) {
    const [blobPaths] = await Promise.all([this.getVercelBlobPaths()]);
    if (blobPaths.includes(`${props.image_id}.${props.file_extension}`)) {
      return true;
    } else {
      return false;
    }
  }

  // TODO change this so that the vercel blob info is output to a __generated__ json file then read from it instead of risking calling the api nth times
  public async exeVercelBlob(
    arrHelper = Array.of<{
      readonly id: number;
      readonly width: number;
      readonly height: number;
      readonly file_extension: string;
      readonly relative_path: `/booksy/images/${number}.${string}`;
      readonly url: string;
    }>()
  ) {
    const [data] = await Promise.all([
      this.fetchBooksyPhotosPerPage<BooksyImagesByPageNumberAndCount>({
        imagesPerPage: 100,
        imagesPage: 1
      })
    ]);

    const derivedData = this.mapperAlt(data);

    try {
      return derivedData.map(async v => {
        const vv = await v;
        const workup = (url: string) =>
          ({
            id: vv.image_id,
            width: vv.width,
            height: vv.height,
            file_extension: vv.file_extension,
            relative_path: `/booksy/images/${vv.image_id}.${vv.file_extension}`,
            url
          }) as const;
        const doesExist = await this.compareVercelBlobPathsToIncomingIds(vv);
        if (doesExist === false) {
          const [blob] = await Promise.all([(await fetch(vv.image)).blob()]);
          const file = new File([blob], `${vv.image_id}.${vv.file_extension}`, {
            lastModified: vv.modified
          });
          const vercelBlob = await put(file.name, file, { access: "public" });
          console.log(`reuploading, didn't detect... ${file.name}`);
          arrHelper.push(workup(vercelBlob.url));
          const base64Data = this.cleanDataUrl(vv.image);
          const toJson = JSON.stringify({ data: arrHelper }, null, 2);
          this.writeTarget(
            `src/utils/__generated__/image-object.ts`,
            `export const imageData = ${toJson};`
          );
          this.writeTarget(
            `public/booksy/images/${vv.image_id}.${vv.file_extension}`,
            Buffer.from(base64Data, "base64")
          );
        } else {
          const blobs = this.vercelData();
          // eslint-disable-next-line
          const getInfo = blobs.find(
            path => path.pathname === `${vv.image_id}.${vv.file_extension}`
          )!;
          console.log(`${getInfo.pathname} blob already exists`);
          arrHelper.push(workup(getInfo.url));
          const base64Data = this.cleanDataUrl(vv.image);
          const toJson = JSON.stringify({ data: arrHelper }, null, 2);
          this.writeTarget(
            `src/utils/__generated__/image-object.ts`,
            `export const imageData = ${toJson};`
          );
          this.writeTarget(
            `public/booksy/images/${vv.image_id}.${vv.file_extension}`,
            Buffer.from(base64Data, "base64")
          );
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}
