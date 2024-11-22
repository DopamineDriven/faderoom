import { BooksyService } from "./booksy";

const booksyService = new BooksyService(process.cwd());

Promise.all([booksyService.exeGenerateImages()])
  .catch(err => console.error(err))
  .then(_ => booksyService.wait(200))
  .then(_ => {
    return booksyService.arrayOfImageIds();
  })
  .catch(err => console.error(err));
