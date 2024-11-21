import { FsService } from "@/services/fs";
// import { BooksyImagesPage1 } from "./__write__/booksy-images-page-1";
import type { BooksyImagesByPageNumberAndCount } from "@/types/booksy-helpers";
// import {
//   fetchBooksyPhotosPerPage
// } from "./fetch-booksy";
import * as dotenv from "dotenv";
dotenv.config();

export class BooksyImageHandler extends FsService{
  constructor(public override cwd: string) {
    super(cwd ??=process.cwd())
  }

  public tester() {
    return this.booksyFingerPrint;
  }
}

export const assetType = (path: string) =>
  path?.split(/([.])/gim)?.reverse()?.[0] as
    | "avif"
    | "bmp"
    | "cjs"
    | "css"
    | "csv"
    | "doc"
    | "docx"
    | "eot"
    | "gif"
    | "htm"
    | "html"
    | "gz"
    | "js"
    | "mjs"
    | "ico"
    | "jpeg"
    | "jpg"
    | "json"
    | "jsonld"
    | "m3u8"
    | "md"
    | "mp4"
    | "ndjson"
    | "pkpass"
    | "png"
    | "svg"
    | "tif"
    | "tiff"
    | "ts"
    | "ttf"
    | "webp"
    | "woff"
    | "woff2";

export const deriveAssetMimeType = (path: string) =>
  assetType(path) === "avif"
    ? ("image/avif" as const)
    : assetType(path) === "bmp"
      ? ("image/bmp" as const)
      : assetType(path) === "cjs"
        ? ("application/javascript" as const)
        : assetType(path) === "gif"
          ? ("image/gif" as const)
          : assetType(path) === "jpg"
            ? ("image/jpeg" as const)
            : assetType(path) === "jpeg"
              ? ("image/jpeg" as const)
              : assetType(path) === "js"
                ? ("application/javascript" as const)
                : assetType(path) === "json"
                  ? ("application/json" as const)
                  : assetType(path) === "jsonld"
                    ? ("application/ld+json" as const)
                    : assetType(path) === "m3u8"
                      ? (`application/vnd.apple.mpegurl` as const)
                      : assetType(path) === "mjs"
                        ? ("application/javascript" as const)
                        : assetType(path) === "mp4"
                          ? ("video/mp4" as const)
                          : assetType(path) === "ndjson"
                            ? ("application/x-ndjson" as const)
                            : assetType(path) === "pkpass"
                              ? ("application/vnd.apple.pkpass" as const)
                              : assetType(path) === "png"
                                ? ("image/png" as const)
                                : assetType(path) === "tif"
                                  ? ("image/tif" as const)
                                  : assetType(path) === "tiff"
                                    ? ("image/tif" as const)
                                    : assetType(path) === "webp"
                                      ? ("image/webp" as const)
                                      : assetType(path) === "md"
                                        ? ("text/markdown" as const)
                                        : ("application/octet-stream" as const);

export const AssetToBufferView = async <const T extends string>(path: T) => {
  const fetcher = await fetch(path).then(t => t.arrayBuffer());
  const reader = new ReadableStream({
    type: "bytes",

    async pull(controller) {
      const byobRequest = controller.byobRequest;
      byobRequest?.respond(byobRequest?.view?.byteLength ?? 0);
    }
  });
  const readerByob = new ReadableStreamBYOBReader(reader);
  const readableByteStream = fetcher;
  const data = await readerByob.read(Buffer.from(readableByteStream));
  return `data:${deriveAssetMimeType(path)};base64, ${Buffer.from(
    Buffer.from(data.value ?? Buffer.alloc(0)).toJSON().data
  ).toString("base64")}` as const;
};

export function mapper(props: BooksyImagesByPageNumberAndCount) {
  return props.images.map(async t => {
    return await (async () => {
      return { image_id: t.image_id, image: await AssetToBufferView(t.image) };
    })().then(data => data);
  });
}

// const fsService = new FsService(process.cwd());



// // eslint-disable-next-line
// mapper(BooksyImagesPage1).map(async (v, i) => {
//   const { image, image_id } = await v;

//   const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

//   fsService.withWs({
//     cwd: process.cwd(),
//     path: `src/utils/__data__/images/${++i}-${image_id}.jpg`,
//     data: Buffer.from(base64Image, "base64")
//   });
// });
const test = new BooksyImageHandler(process.cwd());

console.log(test.BooksyHeadersGET("QsV4OU7w19HOe4OUO1g54w3mWkOkmoQs"))
