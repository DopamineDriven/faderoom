import { BooksyService } from "./booksy";

const booksyService = new BooksyService(process.cwd());

Promise.all([booksyService.exeVercelBlob()]).catch(err => console.error(err));
