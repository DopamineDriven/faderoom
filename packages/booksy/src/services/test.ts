import * as dotenv from "dotenv";
import { ConfigHandler } from "./config/index.js";

dotenv.config();

const fsService = new ConfigHandler(process.cwd());
type BooksyImagesInspirationCategoryResponse = {
  count: number;
  per_page: number;
  data: {
    id: number;
    tags?: string[];
    description: string;
    category: string;
    is_cover_photo: boolean;
    inspiration_categories: number[];
    order: number;
    url: string;
    width: number;
    height: number;
    active: boolean;
    visible: boolean;
    likes_count: number;
    instagram_id: string | number | null;
  }[];
};

const fetcher = async () => {
  return (
    await fetch(
      "https://us.booksy.com/core/v2/business_api/me/businesses/481001/images/v2?category=inspiration&page=1&per_page=100",
      {
        headers: {
          "X-Access-Token": "7woiVhQmHVQIBChaYAHmCnE74Q7zZalu",
          Connection: "keep-alive",
          Accept: "*/*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
          "Acccept-Encoding": "gzip, deflate, br",
          "X-fingerprint": "s-0123456789abcdef",
          "X-Api-Key": "web-biz-66e84d5a-d8cf-498f-9123-cc8aec9cdf4d"
        },
        method: "GET",
        cache: "default"
      }
    )
  )
    .json()
    .then(res => {
      const data = res as BooksyImagesInspirationCategoryResponse;
      console.log(data.data);
      fsService.withWs({
        data: JSON.stringify(data.data, null, 2),
        cwd: fsService.cwd,
        path: "src/utils/__generated__/inspiration-images.json"
      });
      return data;
    });
};

fetcher();

// import { BooksyReviewsService } from "./booksy/reviews/index.js";

// type VercelBlobShape = {
//   url: string;
//   downloadUrl: string;
//   pathname: string;
//   size: number;
//   uploadedAt: string;
// };
// const handler = new ConfigHandler(process.cwd());
// const booksyReviews = new BooksyReviewsService(process.cwd());

// booksyReviews.generateReviews();
// handler.listVercelBlobs();
// const paths = handler
//   .readDir({ cwd: handler.cwd, path: "src/utils/__generated__/vercel" })
//   .map(v => v.split(/\.json/g)[0] ?? "");

// console.log(paths);

// const fileToBuffer = JSON.parse(Buffer.from(
//   handler
//     .fileToBuffer({
//       cwd: handler.cwd,
//       path: "src/utils/__generated__/vercel/20838044.jpeg.json"
//     })
//     .toJSON().data
// ).toString("utf-8"));

// console.log(fileToBuffer);

// const vercelData = () => {
//   return handler
//     .readDir({ cwd: handler.cwd, path: "src/utils/__generated__/vercel" })
//     .map((v) => {
//       const data = JSON.parse(Buffer.from(
//         handler
//           .fileToBuffer({
//             cwd: handler.cwd,
//             path: `src/utils/__generated__/vercel/${v}`
//           })
//           .toJSON().data
//       ).toString("utf-8")) as VercelBlobShape;
//       return data;
//     });
// };

// console.log(vercelData());
