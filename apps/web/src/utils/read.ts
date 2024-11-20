import { FsService } from "@/services/fs";
import { BooksyReviewsByPagePerPagePayload, BooksyReviewsEntity, BooksyReviewsEntityModified } from "@/types/booksy-helpers";

export class ReaderService extends FsService {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  public async readFiles() {
    const readDir = this.readDir({
      cwd: this.cwd,
      path: "src/utils/__write__"
    }).filter(t => /(booksy-reviews-per-page-[0-9]+)/g.test(t) === true);
    console.log(readDir);
    return readDir;
  }

  public async dynamicallyImportData(
    arr: BooksyReviewsByPagePerPagePayload["reviews"][] = Array.of<
      BooksyReviewsByPagePerPagePayload["reviews"]
    >()
  ) {
    const data = await this.readFiles();
    return data.map(async (file, i) => {
      const fileManipulate =
        file.split(/\./g)[0] ?? `booksy-reviews-per-page-${++i}`;
      const dynamicImport = (await import(
        `@/utils/__write__/${fileManipulate}`
      )) as { default: BooksyReviewsByPagePerPagePayload };
      const dynamic = dynamicImport.default;
      arr.push(dynamic.reviews);

      // console.log(impo);
      return { dynamic, arr };
    });
  }

  public async writeReviews() {
    return this.dynamicallyImportData()
      .then(data => {
        const d = data.map(async v => {
          const vv = await v;
          readService.withWs({
            data: JSON.stringify({ reviews: vv.arr.flat() }, null, 2),
            cwd: process.cwd(),
            path: "src/utils/__write__/all-reviews.json"
          });
          return vv;
        });
        return d;
      })
      .catch(err => console.error(err));
  }

  public convertCreatedDateToTimestamp(props:BooksyReviewsEntity[] ) {
    return props.map((v) => {
      const {created, ...rest} = v;
      const toTimeStamp = created.concat(":00.000Z");
      const toUnix = new Date(toTimeStamp).valueOf();
      return {created: toUnix, ...rest} as BooksyReviewsEntityModified;
    }).sort((a,b) => b.created - a.created);
  }
}

const readService = new ReaderService(process.cwd());

readService
  .dynamicallyImportData()
  .then(data => {
    const d = data.map(async v => {
      const vv = await v;
      console.log(vv.arr.flat());

      readService.withWs({
        data: JSON.stringify({ reviews: readService.convertCreatedDateToTimestamp(vv.arr.flat()) }, null, 2),
        cwd: process.cwd(),
        path: "src/utils/__write__/all-reviews-new.json"
      });
      return vv;
    });
    return d;
  })
  .catch(err => console.error(err));
