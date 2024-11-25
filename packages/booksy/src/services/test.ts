import { BooksyReviewsService } from "./booksy/reviews/index.js";

// type VercelBlobShape = {
//   url: string;
//   downloadUrl: string;
//   pathname: string;
//   size: number;
//   uploadedAt: string;
// };
// const handler = new ConfigHandler(process.cwd());
const booksyReviews = new BooksyReviewsService(process.cwd());

booksyReviews.generateReviews();
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
