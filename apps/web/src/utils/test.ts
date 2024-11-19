import * as dotenv from "dotenv";
dotenv.config();

// (async () => {
//   return await fetch(
//     "https://us.booksy.com/api/us/2/business_api/account/login?x-api-key=web-biz-66e84d5a-d8cf-498f-9123-cc8aec9cdf4d&x-fingerprint=s-0123456789abcdef",
//     {
//       method: "POST",
//       credentials: "include",
//       keepalive: true,
//       headers: {
//         Connection: "keep-alive",
//         Accept: "*/*",
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
//         "Content-Type": "application/json",
//         "X-fingerprint": "s-0123456789abcdef",
//         "X-Api-Key": "web-biz-66e84d5a-d8cf-498f-9123-cc8aec9cdf4d"
//       },
//       body: JSON.stringify({
//         email: "mauryflores33@gmail.com",
//         password: "str8rzr81"
//       })
//     }
//   );
// })()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });
const mapParams = (params: readonly ([string, string])[]) =>
  params
    .reduce<string[]>((arr, [k, v]) => {
      if (v) arr.push(`${k}=${encodeURIComponent(v)}`);
      return arr;
    }, [])
    .join("&");
console.log(mapParams([["x-api-key", process.env.BOOKSY_BIZ_API_KEY ?? ""], ["x-fingerprint", process.env.BOOKSY_BIZ_X_FINGERPRINT ?? ""]] as const))
