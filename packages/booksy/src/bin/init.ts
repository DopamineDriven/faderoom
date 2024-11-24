#!/usr/bin/env node
import { ConfigHandler } from "@/services/config/index.js";
import { BooksyImageService } from "@/services/booksy/images/index.js";
import { BooksyLoginService } from "@/services/booksy/login/index.js";
import type { BooksyLoginPayload } from "@/types/booksy.js";

export async function generateScaffold() {
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

export async function vercelWorkup() {
  const handler = new ConfigHandler(process.cwd());
  handler.listVercelBlobs();
}


if (process.argv[2] === "init") {
  Promise.all([generateScaffold()]);
}

if (process.argv[2] === "generate") {
  Promise.all([generateData()]);
}

if (process.argv[2] === "workup") {
  Promise.all([vercelWorkup()]);
}
