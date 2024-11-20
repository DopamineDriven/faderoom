import { wpHeaders, wpApiUrl } from "@/lib/constants";

export async function fetchWpAPI<const T>(
  query: string,
  variables?: { [key: string]: unknown }
) {
  const body = JSON.stringify({
    query,
    variables: {
      ...variables
    }
  });
  const res = await fetch(wpApiUrl, {
    headers: wpHeaders,
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
