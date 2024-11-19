export function urlHelper(target: "images" | "reviews" | "image_by_id" | "login") {
  switch(target) {
    case (target = "image_by_id"): {
      function imgById<const ID extends string>(id: ID) {
        return `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&image_id=${id}` as const
      }
      return imgById;
    }
    case (target="images"): {
      function imgsPerPage<const Count extends string | number>(count: Count) {
        return `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/images?category=biz_photo&images_per_page=${count}` as const
      };
      return imgsPerPage;
    }
    case (target="reviews"): {
      function reviewsPerPageAndByPage({count, pageNumber=1}:{count: string | number; pageNumber?: string | number;}) {
        return `https://us.booksy.com/api/us/2/business_api/me/businesses/481001/reviews/?reviews_page=${pageNumber}&reviews_per_page=${count}` as const
      };
      return reviewsPerPageAndByPage;
    }
    default: {
      function login(apiKey: string, x_fingerprint: string) {
        return `https://us.booksy.com/api/us/2/business_api/account/login?x-api-key=${apiKey}&x-fingerprint=${x_fingerprint}` as const;
      }
      return login;
    }
  }
}
export async function fetchBooksy<const T, const U extends string>(
  query: T,
  url: U,
  variables?: { [key: string]: unknown }
) {

  const body = JSON.stringify({
    query,
    variables: {
      ...variables

    }
  });


  const res = await fetch(url, {
    headers: {
      "X-Api-Key":"web-biz-66e84d5a-d8cf-498f-9123-cc8aec9cdf4d",
      "X-fingerprint": "s-0123456789abcdef"
    },
    method: "POST",
    body,
    cache: "default",
    next: {
      tags: ["wordpress"]
    }
  });

  const json = (await res.json()) as Record<string, T>;
  if (json.errors) {
    console.error(json.errors);
    throw new Error(`WPGraphQL Fetcher Failed`);
  }
  return json.data;
}
