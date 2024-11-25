import { ConfigHandler } from "@/services/config/index.js";

export class BooksyLogin extends ConfigHandler {
  constructor(public override cwd: string) {
    super(cwd??=process.cwd());
  }
  public get booksyHeadersPOST() {
    // eslint-disable-next-line
    const {BOOKSY_BIZ_API_KEY, BOOKSY_BIZ_X_FINGERPRINT}= this.booksyEnvKVs!;
    return {
      Connection: "keep-alive",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Content-Type": "application/json",
      "X-fingerprint": BOOKSY_BIZ_X_FINGERPRINT,
      "X-Api-Key": BOOKSY_BIZ_API_KEY
    } as const;
  }

  public async fetchBooksyPOST(
    url: string,
    body: { [record: string | number | symbol]: unknown }
  ) {
    return await fetch(url, {
      headers: this.booksyHeadersPOST,
      method: "POST",
      credentials: "include",
      keepalive: true,
      cache: "default",
      body: JSON.stringify({ ...body })
    });
  }

  public async fetchBooksyLogin<const T>() {
    // eslint-disable-next-line
   const {BOOKSY_BIZ_EMAIL, BOOKSY_BIZ_PASSWORD, BOOKSY_BIZ_API_KEY, BOOKSY_BIZ_X_FINGERPRINT}= this.booksyEnvKVs!;
    return (await this.fetchBooksyPOST(
      `https://us.booksy.com/api/us/2/business_api/account/login?x-api-key=${BOOKSY_BIZ_API_KEY}&x-fingerprint=${BOOKSY_BIZ_X_FINGERPRINT}`,
      {
        email: BOOKSY_BIZ_EMAIL,
        password: BOOKSY_BIZ_PASSWORD
      }
    ).then(data => data.json())) as Promise<T>;
  }

}
