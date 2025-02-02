export {
  generateImagesData,
  generateReviewsData,
  generateScaffold,
  vercelWorkup
} from "@/bin/init.js";
export { ConfigHandler } from "@/services/config/index.js";
export { BooksyImageService } from "@/services/booksy/images/index.js";
export { BooksyLoginService } from "@/services/booksy/login/index.js";
export { BooksyReviewsService } from "@/services/booksy/reviews/index.js";
export { booksyService } from "@/services/booksy/index.js";
export type { BooksyServiceProps } from "@/services/booksy/index.js";
export type {
  Abortable,
  ArrayBufferView,
  ArrayOrReadOnlyArray,
  BashEnv,
  BufferEncodingUnion,
  CoercionUnion,
  CommonExecOptions,
  CommonOptions,
  ConditionalPromise,
  ConditionalToRequired,
  Depth,
  Dict,
  Equal,
  ExcludeFieldEnumerable,
  ExecSyncOptions,
  ExecSyncOptionsWithBufferEncoding,
  ExecSyncOptionsWithStringEncoding,
  ExecuteCommandProps,
  Expect,
  Extends,
  FieldToConditionallyNever,
  IOType,
  InferDepth,
  InjectScriptsProps,
  MkDirOptions,
  MkDirSyncProps,
  Mode,
  ObjEncodingOptions,
  OmitSrc,
  OpenMode,
  ProcessEnv,
  ProcessEnvOptions,
  ReadDirOptions,
  ReadDirProps,
  RemoveFields,
  RequiredToConditional,
  Signals,
  StdioOptions,
  TypedArray,
  Unenumerate,
  UnwrapPromise,
  Without,
  WriteFileAsyncDataUnion,
  WriteFileAsyncProps,
  WriteStreamProps,
  XOR
} from "@/types/fs.js";
export type {
  BooksyImageBusinessProps,
  BooksyImageMetaProps,
  BooksyImageProps,
  BooksyImagePropsByVersion,
  BooksyImageResponseV2,
  BooksyImageThumbnails,
  BooksyImagesByPageNumberAndCount,
  BooksyLoginPayload,
  BooksyPropsObj,
  BooksyReviewsByPagePerPagePayload,
  BooksyReviewsByPagePerPagePayloadModified,
  BooksyReviewsEntity,
  BooksyReviewsEntityModified
} from "./types/booksy.js";
export type { ParsedUrlInfo } from "@/types/url.js";
export type { BooksyConfig, VercelBlobShape } from "@/types/helpers.js";
export type {
  Item,
  JSONified,
  JSONifiedArray,
  JSONifiedObject,
  JSONifiedValue,
  PersistentContext,
  RecursivePartial,
  RecursiveRequired,
  UndefinedAsNull,
  Widget
} from "@/types/json.js";
export { Serializer } from "@/types/json.js";

/**
 * augmenting the "node/http.d.ts" module to inject known booksy
 * and vercel headers of utility into the root of this package
 **/
declare module "http" {
  export interface IncomingHttpHeaders {
    "X-fingerprint"?: string;
    "X-Access-Token"?: string;
    "X-Api-Key"?: string;
    "X-Vercel-IP-Timezone"?: string;
    "X-Vercel-IP-City"?: string;
    "X-Vercel-IP-Country"?: string;
  }
}
