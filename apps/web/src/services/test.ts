import { BooksyService } from "./booksy";
import {list } from "@vercel/blob";

const _booksyService = new BooksyService(process.cwd());

// booksyService.assetToBlob("https://d2zdpiztbgorvt.cloudfront.net/region1/us/481001/biz_photo/fd01f8573c3b48c7a3be1883ad2cfc-the-fade-room-biz-photo-fb5eb06537924c6997402cb05c8489-booksy.jpeg").then((blobby) => {
//   console.log(blobby);
//   return blobby;
// }).catch((err) => console.error(err))

async function listIt() {
  return (await list()).blobs.map((v) => v.pathname);
}

listIt().then((paths) =>paths.map((path) => {
  console.log(path);
}))
