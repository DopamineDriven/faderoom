import { FsService } from "./fs";

export class BooksyService extends FsService {
  constructor(public override cwd: string) {
    super(cwd ??= process.cwd())
  }

  
}
