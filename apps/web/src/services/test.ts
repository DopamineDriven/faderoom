import { BooksyService } from "./booksy";

const booksyService = new BooksyService(process.cwd());

booksyService.assetToBuffer("https://d2zdpiztbgorvt.cloudfront.net/region1/us/481001/review_photos/4d1ff0fdc22c417e9e4ff1b7a9147ad0.jpeg").then((blobby) => {
  console.log(blobby);
  return blobby;
}).catch((err) => console.error(err))

