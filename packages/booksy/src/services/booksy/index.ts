import { BooksyImageService } from "./images/index.js";
import { BooksyLoginService } from "./login/index.js";
import { BooksyReviewsService } from "./reviews/index.js";

export interface BooksyServiceProps {
  images: BooksyImageService;
  login: BooksyLoginService;
  reviews: BooksyReviewsService;
}

export function booksyService(cwd: string) {
  return {
    images: new BooksyImageService(cwd),
    login: new BooksyLoginService(cwd),
    reviews: new BooksyReviewsService(cwd)
  } satisfies BooksyServiceProps;
}
