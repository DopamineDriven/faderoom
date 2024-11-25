import type {
  BooksyReviewsByPagePerPagePayload,
  BooksyReviewsByPagePerPagePayloadModified,
  BooksyReviewsEntity
} from "@/types/booksy.js";
import type { CoercionUnion } from "@/types/fs.js";
import type { BooksyConfig } from "@/types/helpers.js";
import { ConfigHandler } from "@/services/config/index.js";

export class BooksyReviewsService extends ConfigHandler {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  public resolveConf<const T extends keyof BooksyConfig>(target: T) {
    return this.resolvedConfig()[target];
  }

  public get booksyXFingerprint() {
    return this.resolveConf("booksyBizXFingerprint");
  }

  public get booksyApiKey() {
    return this.resolveConf("booksyBizApiKey");
  }

  public get accessToken() {
    return this.resolveConf("accessToken");
  }

  public get booksyHeadersGET() {
    return {
      Connection: "keep-alive",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Acccept-Encoding": "gzip, deflate, br",
      "X-fingerprint": this.booksyXFingerprint,
      "X-Access-Token": this.accessToken,
      "X-Api-Key": this.booksyApiKey
    } as const;
  }

  public async fetchBooksyGET(url: string) {
    return await fetch(url, {
      headers: this.booksyHeadersGET,
      method: "GET",
      cache: "default"
    });
  }

  public async fetchBooksyReviewsPerPageByPage<const T>({
    reviewsPerPage,
    reviewsPageNumber = 1
  }: {
    reviewsPerPage: string | number;
    reviewsPageNumber?: string | number;
  }) {
    return (await this.fetchBooksyGET(
      `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/reviews/?reviews_page=${reviewsPageNumber}&reviews_per_page=${reviewsPerPage}`
    ).then(data => data.json())) as T;
  }

  public writeTarget<
    const T extends string,
    const V extends WithImplicitCoercion<CoercionUnion>
  >(target: T, template: V) {
    return this.withWs({
      path: target,
      data: template,
      cwd: this.cwd
    });
  }

  public reviewsDataTransformer(reviews: BooksyReviewsEntity[]) {
    return reviews.map(v => {
      let record = Array.of<string>();
      const {
        anonymized,
        business,
        feedback_status,
        id,
        photos,
        rank,
        reply_content,
        reply_updated,
        review,
        services,
        source,
        staff,
        created,
        updated,
        appointment_date,
        title,
        user,
        verified
      } = v;
      services.forEach(function (service) {
        record.push(service.name);
      });

      const last_name = user.last_name.split("…")?.[0]?.concat(".") ?? "";
      const name = user.first_name.concat(" ").concat(last_name);
      return {
        anonymized: anonymized,
        appointment_date: new Date(
          appointment_date.concat(":00.000Z")
        ).valueOf(),
        business,
        created: new Date(created.concat(":00.000Z")).valueOf(),
        feedback_status,
        id,
        photos: photos.length >= 1 ? photos : null,
        photos_length: photos.length,
        rank,
        reply_content,
        reply_updated:
          reply_updated !== null
            ? new Date(reply_updated.concat(":00.000z")).valueOf()
            : reply_updated,
        review,
        services: record.length > 1 ? record : record[0],
        source,
        staff: staff.find(name => name.name === "Mauricio Flores")
          ? "Mauricio Flores"
          : "Cynthia Sanchez",
        title,
        user: name,
        updated: new Date(updated.concat(":00.000Z")).valueOf(),
        verified
      };
    });
  }

  public async fetchReviews() {
    return await Promise.all([
      this.fetchBooksyReviewsPerPageByPage<BooksyReviewsByPagePerPagePayload>({
        reviewsPerPage: 200,
        reviewsPageNumber: 1
      })
    ])
      .then(([data]) => {
        return this.arrToArrOfArrs({
          arrToFragment: this.reviewsDataTransformer(data.reviews),
          arrOfArrsAggregator:
            Array.of<BooksyReviewsByPagePerPagePayloadModified["reviews"]>(),
          interval: 10
        });
      })
      .then(v => {
        this.writeTarget(
          "src/utils/__generated__/reviews.json",
          JSON.stringify(v, null, 2)
        );
        return v;
      });
  }
}
