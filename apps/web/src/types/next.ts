import type { Unenumerate, RemoveFields } from "@/types/helpers";
/**
 * RT->ReturnType
 *
 * P->Parameters
 *
 * B->Both->{ readonly params: P; readonly returnType: RT; }
 */

export type InferIt<T, V extends "RT" | "P" | "B"> = T extends (
  ...args: infer P
) => infer RT | Promise<infer RT> | PromiseLike<infer RT> | Awaited<infer RT>
  ? V extends "B"
    ? { readonly params: P; readonly returnType: RT }
    : V extends "RT"
      ? RT
      : V extends "P"
        ? P
        : T
  : T;

/**
 * usage with dynamic page routes in nextjs app directory
 *
 * ```tsx
  export default async function DynamicPage({
    params
  }: InferGSPRT<typeof generateStaticParams>) {
    // your code here
  }
  ```
*/

export type InferGSPRT<V extends (...args: any) => any> = {
  params: Promise<Unenumerate<InferIt<V, "RT">>>;
};



export type LinkPropsInferred = InferIt<
  typeof import("next/link.js").default,
  "P"
>["0"];

export type LinkPropsTargeted<T extends keyof LinkPropsInferred> = {
  [P in T]: LinkPropsInferred[P];
};

export type LinkPropsExclude<T extends keyof LinkPropsInferred> = RemoveFields<
  LinkPropsTargeted<keyof LinkPropsInferred>,
  T
>;

export type LinkPropsInclude<T extends keyof LinkPropsInferred> = RemoveFields<
  LinkPropsTargeted<keyof LinkPropsInferred>,
  Exclude<keyof LinkPropsInferred, T>
>;

export type ImagePropsInferred = InferIt<
  typeof import("next/image.js").default,
  "P"
>["0"];
export type ImagePropsTargeted<T extends keyof ImagePropsInferred> = {
  [P in T]: ImagePropsInferred[P];
};

export type ImagePropsExclude<T extends keyof ImagePropsInferred> =
  RemoveFields<ImagePropsTargeted<keyof ImagePropsInferred>, T>;

export type ImagePropsInclude<T extends keyof ImagePropsInferred> =
  RemoveFields<
    ImagePropsTargeted<keyof ImagePropsInferred>,
    Exclude<keyof ImagePropsInferred, T>
  >;
