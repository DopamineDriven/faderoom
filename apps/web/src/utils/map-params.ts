export const mapParams = <const T extends readonly [string, string][]>(
  params: T
) =>
  params
    .reduce<string[]>((arr, [k, v]) => {
      if (v) arr.push(`${k}=${encodeURIComponent(v)}`);
      return arr;
    }, [])
    .join("&");
