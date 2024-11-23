import { BooksyService } from "./booksy";

const booksyService = new BooksyService(process.cwd());

Promise.all([booksyService.exeGenerateImagesAndImageData()])
  .catch(err => console.error(err));
