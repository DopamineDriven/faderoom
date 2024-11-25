#!/usr/bin/env node
import type { BooksyLoginPayload } from "@/types/booksy.js";
import { BooksyImageService } from "@/services/booksy/images/index.js";
import { BooksyLoginService } from "@/services/booksy/login/index.js";
import { BooksyReviewsService } from "@/services/booksy/reviews/index.js";
import { ConfigHandler } from "@/services/config/index.js";

export async function generateScaffold() {
  const handler = new ConfigHandler(process.cwd());
  const booksy = new BooksyLoginService(handler.cwd);
  const [login] = await Promise.all([
    booksy.fetchBooksyLogin<BooksyLoginPayload>()
  ]);
  handler.withWs({
    data: handler.generateYaml(login.access_token),
    cwd: handler.cwd,
    path: "booksy.config.yaml"
  });
  return login;
}

export async function generateImagesData() {
  const handler = new ConfigHandler(process.cwd());
  const booksy = new BooksyImageService(handler.cwd);
  return await booksy.exeVercelBlob();
}

export async function generateReviewsData() {
  const handler = new ConfigHandler(process.cwd());
  const reviews = new BooksyReviewsService(handler.cwd);
  return await reviews.fetchReviews();
}

export async function vercelWorkup() {
  const handler = new ConfigHandler(process.cwd());
  handler.listVercelBlobs();
}

if (process.argv[2] === "init") {
  Promise.all([generateScaffold()]);
}

if (process.argv[2] === "generate-images") {
  Promise.all([generateImagesData()]);
}

if (process.argv[2] === "generate-reviews") {
  Promise.all([generateReviewsData()]);
}

if (process.argv[2] === "workup") {
  Promise.all([vercelWorkup()]);
}
