import * as dotenv from "dotenv";
import { imageData } from "@/utils/__generated__/image-object";
import { SitemapService } from "./sitemap";

dotenv.config();

const s = new SitemapService(imageData.data, process.cwd());

s.exe();
