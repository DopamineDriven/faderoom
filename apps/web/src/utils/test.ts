// import { put } from "@vercel/blob";
import * as dotenv from "dotenv";
import { FsService } from "@/services/fs";
import data from "./__write__/all-reviews.json";

dotenv.config();

const manipulate = data.reviews.filter(v => v.photos.length > 0);

const mapit = (
  arr = Array.of<{
    id: number;
    url: string;
    published: boolean | null;
    parentId: string;
    name: string;
    review: string;
    date: string;
  }>()
) =>
  manipulate.map((t, v) => {
    try {
      if (t.photos != null) {
        return t.photos.map(p => {
          const parentId = manipulate[v]?.id.toString() ?? "";
          const firstName = manipulate[v]?.user?.first_name ?? "";
          const lastInitial =
            manipulate[v]?.user?.last_name
              ?.split("…")?.[0]
              ?.toUpperCase()
              ?.concat(".") ?? "";
          const name = firstName + " " + lastInitial;
          const review = manipulate[v]?.review ?? "";
          const date = manipulate[v]?.created?.concat(":00.000Z") ?? "";
          arr.push({ parentId, name, review, date, ...p });
        });
      } else return null;
    } catch (err) {
      console.error(err);
    } finally {
      return arr;
    }
  });

const mapper = () =>
  mapit().map(t => {
    const data = t as {
      id: number;
      url: string;
      published: boolean | null;
      parentId: string;
      name: string;
      review: string;
      date: string;
    }[];

    const noPublish = data.map(t => {
      const { published: _published, ...rest } = t;

      const combinedId = rest.parentId.concat("-").concat(rest.id.toString(10));
      return { combinedId, ...rest };
    });

    // console.log(data);
    // eslint-disable-next-line prefer-const
    let r: Record<string, number> = {};
    noPublish.forEach(function (d) {
      // eslint-disable-next-line
      r[d.parentId] = (r[d.parentId] || 0) + 1;
    });

    return noPublish;
  });

// console.log(mapper()[0]?.sort((a, b) => a.id - b.id));

// adding images from reviews
// TODO

const fsService = new FsService(process.cwd());

async function exeGenerateImagesAndImageData() {
  try {
    // eslint-disable-next-line
    const data = mapper()[0]?.sort((a, b) => a.id - b.id)!;
    return data.map(async p => {
      const tob64 = await fsService.assetToBuffer(p.url);
      const cleanUrl = fsService.cleanDataUrlBase64(tob64.b64encodedData);
      fsService.withWs({
        path: `public/booksy/images/${p.combinedId.split("-").join("")}.${tob64.extension}`,
        data: Buffer.from(cleanUrl, "base64"),
        cwd: process.cwd()
      });
    });
  } catch (err) {
    console.error(err);
  }
}
exeGenerateImagesAndImageData();
