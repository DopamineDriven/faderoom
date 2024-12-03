import * as dotenv from "dotenv";
import { FsService } from "@/services/fs";
import type { PlacesResponse } from "@/types/google";

dotenv.config();

const fsservice = new FsService(process.cwd());

// async function places() {return await new googlePlaces.v1.PlacesClient({apiKey: process.env.GOOGLE_MAPS_API_KEY }).getPlace({name: "places/ChIJWR1tbabBD4gRrUSmN1K2TPw"}, { otherArgs: {
//   ["X-Goog-FieldMask"]: "*"
// }}).then((data) => {
//   console.log(data);
//   return data;
// })}

// places();
async function fetcher() {
  const googleKey = process.env.GOOGLE_MAPS_API_KEY ?? "";
  return await fetch(
    `https://places.googleapis.com/v1/places/ChIJWR1tbabBD4gRrUSmN1K2TPw`,
    {
      headers: {
        Connection: "keep-alive",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "*",
        "X-Goog-Api-Key": googleKey
      },
      method: "GET",
      credentials: "include",
      keepalive: true
    }
  ).then(res => res);
}

(async () => {
  return (await fetcher()).json() as Promise<PlacesResponse>;
})().then(data => {
  console.log(data.reviews);
  fsservice.withWs({
    data: JSON.stringify(data, null, 2),
    cwd: fsservice.cwd,
    path: "src/utils/__generated__/google/response.json"
  });
  return data;
});
