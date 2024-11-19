import {
  booksyHeadersGet,
  booksyHeadersPost
} from "@/lib/constants";

export async function fetchBooksyApiGet(
  url: string,
  accessToken: string
) {
  return await fetch(url, {
    headers: booksyHeadersGet(accessToken),
    method: "GET",
    cache: "default",
    next: {
      tags: ["booksy"]
    }
  });
}

export async function fetchBooksyApiPost(
  url: string,
  body: {[record: string | number | symbol]: unknown}
) {
  return await fetch(url, {
    headers: booksyHeadersPost,
    method: "POST",
    credentials: "include",
    keepalive: true,
    cache: "default",
    body: JSON.stringify({...body}),
    next: {
      tags: ["booksy"]
    }
  });
}

export async function fetchBooksyLogin<const T>() {
  return await fetchBooksyApiPost(
    `https://us.booksy.com/api/us/2/business_api/account/login?x-api-key=${process.env.BOOKSY_BIZ_API_KEY}&x-fingerprint=${process.env.BOOKSY_BIZ_X_FINGERPRINT}`,
    { email: process.env.BOOKSY_BIZ_EMAIL, password:process.env.BOOKSY_BIZ_PASSWORD }
  ).then((data) => data.json()) as Promise<T>;
}

export async function fetchBooksyReviewsPerPageByPage<const T>({
  reviewsPerPage,
  reviewsPageNumber = 1,
  accessToken
}: {
  reviewsPerPage: string | number;
  accessToken: string;
  reviewsPageNumber?: string | number;
}) {
  return await fetchBooksyApiGet(
    `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/reviews/?reviews_page=${reviewsPageNumber}&reviews_per_page=${reviewsPerPage}`,
    accessToken
  ).then((data) => data.json()) as T;
}

export async function fetchBooksyPhotosPerPage({
  imagesPerPage,
  accessToken
}: {
  imagesPerPage: string | number;
  accessToken: string;
}) {
  return await fetchBooksyApiGet(
    `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&images_per_page=${imagesPerPage}`,
    accessToken
  );
}

export async function fetchBooksyImageById({
  imageId,
  accessToken
}: {
  imageId: string;
  accessToken: string;
}) {
  return await fetchBooksyApiGet(
    `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&image_id=${imageId}`,
    accessToken
  );
}

