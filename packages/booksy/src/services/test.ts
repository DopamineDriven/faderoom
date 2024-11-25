import { ConfigHandler } from "@/services/config/index.js";
import { BooksyLoginService } from "@/services/booksy/login/index.js";
import type { BooksyLoginPayload } from "@/types/booksy.js";
import { BooksyImageService } from "./booksy/images/index.js";

async function generateScaffold() {
  const handler = new ConfigHandler(process.cwd());
  const booksy = new BooksyLoginService(handler.cwd);
  const [login] = await Promise.all([booksy.fetchBooksyLogin<BooksyLoginPayload>()]);
  handler.withWs({data: handler.generateYaml(login.access_token), cwd: handler.cwd, path: "booksy.config.yaml"});
  return login;
}

export async function generateData() {
  const handler = new ConfigHandler(process.cwd());
  const booksy = new BooksyImageService(handler.cwd);
  return await booksy.exeVercelBlob()
}

if (process.argv[2] === "init") {
  Promise.all([generateScaffold()]);
}
if (process.argv[2]==="generate") {
  Promise.all([generateData()]);
}
