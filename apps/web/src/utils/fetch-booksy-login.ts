export const mapParams = (params: readonly [string, string][]) =>
  params
    .reduce<string[]>((arr, [k, v]) => {
      if (v) arr.push(`${k}=${encodeURIComponent(v)}`);
      return arr;
    }, [])
    .join("&");
    
export async function fetchBooksyLogin() {
  const params = mapParams([
    ["x-api-key", process.env.BOOKSY_BIZ_API_KEY ?? ""],
    ["x-fingerprint", process.env.BOOKSY_BIZ_X_FINGERPRINT ?? ""]
  ] as const);
  return await fetch(
    "https://us.booksy.com/api/us/2/business_api/account/login?".concat(params),
    {
      body: JSON.stringify({
        email: process.env.BOOKSY_BIZ_EMAIL,
        password: process.env.BOOKSY_BIZ_PASSWORD
      }),
      headers: {
        Connection: "keep-alive",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Content-Type": "application/json",
        "X-fingerprint": process.env.BOOKSY_BIZ_X_FINGERPRINT ?? "",
        "X-Api-Key": process.env.BOOKSY_BIZ_API_KEY ?? ""
      },
      credentials: "include",
      method: "POST",
      referrerPolicy: "origin-when-cross-origin",
      keepalive: true
    }
  ).then((data) => data.json());
}
