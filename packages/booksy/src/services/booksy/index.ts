import { BooksyImageService } from "./images/index.js";
import { BooksyLoginService } from "./login/index.js";

export interface BooksyServiceProps {
  image: BooksyImageService;
  login: BooksyLoginService;
}

export function booksyService(cwd: string) {
  return {
    image: new BooksyImageService(cwd),
    login: new BooksyLoginService(cwd)
  } satisfies BooksyServiceProps;
}
