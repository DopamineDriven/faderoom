import * as dotenv from "dotenv";
import type {
  BooksyLoginPayload,
  BooksyReviewsByPagePerPagePayload
} from "@/types/booksy-helpers";
import { formatHelper } from "@/lib/format-helper";
import { FsService } from "@/services/fs";
import {
  fetchBooksyLogin,
  fetchBooksyReviewsPerPageByPage
} from "./fetch-booksy";

dotenv.config();
console.log(process.env.BOOKSY_BIZ_API_KEY);

const fsHandler = new FsService(process.cwd());

(async () => {
  const _data = await fetchBooksyLogin<BooksyLoginPayload>();
  const dataTwo =
    await fetchBooksyReviewsPerPageByPage<BooksyReviewsByPagePerPagePayload>({
      accessToken: "QsV4OU7w19HOe4OUO1g54w3mWkOkmoQs",
      reviewsPerPage: 10,
      reviewsPageNumber: 1
    });
  const s =
    typeof dataTwo === "string" ? dataTwo : JSON.stringify(dataTwo, null, 2);
  const argv3 = process.argv[3] ?? "no-arg";
  if (dataTwo) {
    const templated = `export const ${formatHelper(argv3).split(" ").join("")} = ${s};`;
    fsHandler.withWs({
      data: templated,
      cwd: process.cwd(),
      path: `src/utils/__write__/${process.argv[3]}.ts`
    });
    return dataTwo;
  } else return console.log("there was an error");
})().catch(err => console.error(err));
