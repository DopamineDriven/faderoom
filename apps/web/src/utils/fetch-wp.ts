import { wpHeaders } from "@/lib/constants";

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
  const res = await fetch("https://thefaderoomheadless.com/graphql", {
    headers: wpHeaders,
    method: "POST",
    body,
    keepalive: true,

    cache: "default"
  });

  const json = (await res.json()) as Record<string, T>;
  if (json.errors) {
    console.error(json.errors);
    throw new Error(`WPGraphQL Fetcher Failed`);
  }
  return json.data;
}
