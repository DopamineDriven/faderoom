import * as dotenv from "dotenv";
import { formatHelper } from "@/lib/format-helper";
import { FsService } from "@/services/fs";
import {
  fetchBooksyPhotosPerPage
} from "./fetch-booksy";

dotenv.config();
console.log(process.env.BOOKSY_BIZ_API_KEY);

const fsHandler = new FsService(process.cwd());

(async () => {
  // const _data = await fetchBooksyLogin<BooksyLoginPayload>();
  const dataTwo =
    await fetchBooksyPhotosPerPage({
      accessToken: "QsV4OU7w19HOe4OUO1g54w3mWkOkmoQs",
      imagesPerPage: 40,
      imagesPage: 1
    });
  const s =
    typeof dataTwo === "string" ? dataTwo : JSON.stringify(dataTwo, null, 2);
  const argv3 = process.argv[3] ?? "no-arg";
  if (dataTwo) {
    const templated = `export const ${formatHelper(argv3).split(" ").join("")} = ${s}; \nexport default ${formatHelper(argv3).split(" ").join("")};`;

    fsHandler.withWs({
      data: templated,
      cwd: process.cwd(),
      path: `src/utils/__write__/${process.argv[3]}.ts`
    });
    return dataTwo;
  } else return console.log("there was an error");
})().catch(err => console.error(err));
