import { execSync } from "child_process";
import fsSync, { promises as fsAsync } from "fs";
import { relative } from "path";
import * as dotenv from "dotenv";
import expand from "dotenv-expand";
import type {
  ExecuteCommandProps,
  InferDepth,
  MkDirSyncProps,
  ReadDirOptions,
  ReadDirProps,
  RemoveFields,
  Unenumerate,
  WriteFileAsyncDataUnion,
  WriteFileAsyncProps,
  WriteStreamProps
} from "@/types/fs";
import { ParsedUrlInfo } from "@/types/url";

dotenv.config();

export class FsService {
  constructor(public cwd: string) {}
  private extractTuple<
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T
  >(obj: T, props: V) {
    return [props, obj[props]] as const satisfies readonly [V, T[V]];
  }

  private get myEnv() {
    return dotenv.config({ processEnv: {} });
  }

  public parseDotEnv() {
    return expand.expand(this.myEnv);
  }

  public get booksyEnvKVs():
    | undefined
    | {
        [key: string]: string;
        BOOKSY_BIZ_EMAIL: string;
        BOOKSY_BIZ_PASSWORD: string;
        BOOKSY_BIZ_X_FINGERPRINT: string;
        BOOKSY_BIZ_API_KEY: string;
      } {
    const parsed = this.parseDotEnv()?.parsed;
    if (parsed) {
      return parsed satisfies {
        [key: string]: string;
      } as {
        [key: string]: string;
        BOOKSY_BIZ_EMAIL: string;
        BOOKSY_BIZ_PASSWORD: string;
        BOOKSY_BIZ_X_FINGERPRINT: string;
        BOOKSY_BIZ_API_KEY: string;
      };
    } else return undefined;
  }

  public returnParsedEnv() {
    const secretsConditional = this.parseDotEnv()?.parsed;
    if (secretsConditional) {
      return secretsConditional satisfies {
        [name: string]: string;
      };
    } else return {};
  }

  public readNpmrcConditional() {
    const path = `.npmrc` as const;
    if (this.exists(path)) {
      const fileContents = Buffer.from(
        this.fileToBuffer({ cwd: (this.cwd ??= process.cwd()), path }).toJSON()
          .data
      ).toString("utf-8");
      return [true, fileContents] as const;
    } else return [false, null] as const;
  }

  public handleNpmrc() {
    const arrHelper = Array.of<string>();
    const [doesExist, conditionalContents] = this.readNpmrcConditional();
    if (doesExist === true && typeof conditionalContents === "string") {
      arrHelper.push(conditionalContents);
      const file = conditionalContents;
      try {
        if (/enable-pre-post-scripts=true/g.test(file) === false) {
          arrHelper.push(`enable-pre-post-scripts=true`);
        }
        if (/node-linker=hoisted/g.test(file) === false) {
          arrHelper.push(`node-linker=hoisted`);
        }
      } catch (error) {
        console.error(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        );
      } finally {
        this.withWs({
          data:
            arrHelper.length > 1 ? arrHelper.join(`\n`) : conditionalContents,
          path: ".npmrc",
          cwd: (this.cwd ??= process.cwd())
        });
      }
    } else {
      throw new Error("please create a .npmrc file");
    }
  }

  public sort<
    const S extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const K extends "ASC" | "DESC" | undefined
  >(obj: S, order?: K) {
    return Object.fromEntries(
      Object.entries(obj).sort(([a, _aa], [b, _bb]) =>
        order === "DESC"
          ? b.localeCompare(a) - a.localeCompare(b)
          : a.localeCompare(b) - b.localeCompare(a)
      )
    ) as S;
  }

  public excludeTargeted = <
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T,
    const S extends Parameters<typeof this.sort>["1"]
  >(
    obj: T,
    props: V[],
    sort?: S
  ) => {
    const resolve = Object.fromEntries(
      Object.entries(obj)
        .map(([key, val]) => {
          if (props.includes(key as V)) {
            return ["omit", "omit"] as const;
          } else return [key, val] as const;
        })
        /* eslint-disable-next-line @typescript-eslint/prefer-includes */
        .filter(([t, _v]) => /omit/.test(t) === false)
    );
    return (
      typeof sort !== "undefined" ? this.sort(resolve, sort) : resolve
    ) as RemoveFields<T, Unenumerate<typeof props>>;
  };

  public includeTargeted = <
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T,
    const S extends Parameters<typeof this.sort>["1"]
  >(
    obj: T,
    props: V[],
    sort?: S
  ) => {
    const resolve = Object.fromEntries(
      props.map(val => this.extractTuple(obj, val))
    );
    return (
      typeof sort !== "undefined" ? this.sort(resolve, sort) : resolve
    ) as Pick<T, Unenumerate<typeof props>>;
  };

  public omitFields<
    const Target extends { [record: string | symbol | number]: unknown },
    const Key extends (keyof Target)[]
  >(target: Target, ...keys: Key[]): Omit<Target, Unenumerate<Key>> {
    /* eslint-disable-next-line @typescript-eslint/no-for-in-array */
    for (const key in keys) {
      delete target[key];
    }
    return target;
  }

  public isComment<const T extends string, const V extends boolean>(
    props: T,
    parse: V
  ):
    | (typeof parse extends true ? RegExpExecArray | null : boolean)
    | (RegExpExecArray | null | boolean) {
    return parse === false
      ? (/\/\*[\s\S]*?\*\/|\/\/.*/gm.test(props) as boolean)
      : (/\/\*[\s\S]*?\*\/|\/\/.*/g.exec(props) as RegExpExecArray | null);
  }

  public parseComments<const T extends string>(
    props: T
  ): T | RegExpMatchArray | null {
    /* eslint-disable-next-line no-useless-escape */
    return /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm.test(
      props
    ) === true
      ? props.match(
          /* eslint-disable-next-line no-useless-escape */
          /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm
        )
      : props;
  }

  public exists<const T extends string>(target: T) {
    return fsSync.existsSync(relative(this.cwd ?? process.cwd(), target));
  }

  public arrToArrOfArrs = <const T, const N extends number>({
    arrToFragment = Array.of<T>(),
    arrOfArrsAggregator = Array.of<T[]>(),
    interval
  }: {
    arrToFragment: T[];
    arrOfArrsAggregator: T[][];
    interval: N;
  }) =>
    new Promise((resolve, _reject) =>
      resolve(
        ((interval: number) => {
          for (let i = 0; i <= arrToFragment.length; i++) {
            if ((i % interval === 0 || i === 0) && i <= arrToFragment.length) {
              /* eslint-disable-next-line prefer-const */
              let segment = arrToFragment.slice(i, i + interval);
              arrOfArrsAggregator.push(segment);
            }
          }
        })(interval)
      )
    ).then(_ => arrOfArrsAggregator);

  public wait<T extends number>(ms: T) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public countsSorter = <
    T extends Record<string, number> | Readonly<Record<string, number>>,
    K extends "ASC" | "DESC" | undefined,
    V extends "ASC" | "DESC" | undefined
  >({
    counter,
    keySort,
    valSort
  }: {
    counter: T;
    keySort?: K;
    valSort?: V;
  }) =>
    Object.fromEntries(
      Object.entries(counter)
        .sort(([aStr, _aNum], [bStr, _bNum]) =>
          keySort === "DESC"
            ? bStr.localeCompare(aStr) - aStr.localeCompare(bStr)
            : aStr.localeCompare(bStr) - bStr.localeCompare(aStr)
        )
        .sort(([_aStr, aNum], [_bStr, bNum]) =>
          valSort === "ASC" ? aNum - bNum : bNum - aNum
        )
    ) satisfies Record<string, number> | Readonly<Record<string, number>>;

  public chunkArray<T extends number>(
    arr: string[],
    maxChunkLength: T
  ): string[][] {
    const chunks = Array.of<string[]>();
    let currentChunkLength = 0;
    let currentChunk = Array.of<string>();

    for (const [index, val] of arr.entries()) {
      if (val.length + currentChunkLength >= maxChunkLength) {
        if (currentChunk.length) {
          chunks.push(currentChunk);
        }
        currentChunkLength = val.length;
        currentChunk = [val];
      } else {
        currentChunk.push(val);
        currentChunkLength += val.length + 1; // for comma
      }

      if (arr.length === index + 1) {
        chunks.push(currentChunk);
      }
    }
    return chunks.length ? chunks : [arr];
  }

  public hasNpmrcConfig() {
    return fsSync.existsSync(relative(this.cwd, ".gitignore"));
  }

  public handleBuffStrArrUnion<
    const T extends (string | Buffer)[] | readonly (string | Buffer)[]
  >(arr: T) {
    return arr.map(v =>
      Buffer.isBuffer(v) ? Buffer.from(v).toString("utf-8") : v
    );
  }

  public readDir<T extends string>({ cwd, path, options }: ReadDirProps<T>) {
    return this.handleBuffStrArrUnion(
      fsSync.readdirSync(relative(cwd, path), options) satisfies (
        | string
        | Buffer
      )[]
    );
  }

  public executeCommand = <T extends string>({
    command,
    ...options
  }: ExecuteCommandProps<T>) =>
    Buffer.from(
      Buffer.from(execSync(command, { ...options }).toJSON().data)
    ).toString("utf-8");

  public fileGenTimestamp<
    T extends InstanceType<typeof Date> = InstanceType<typeof Date>
  >(d: T) {
    const date = d.toISOString();
    // prettier-ignore
    return `/* file-autogenerated by @fade/web on ${date.split(/([T])/gm)?.[0]} at ${date.split(/([T])/gm)[2]?.split(/([Z])/gm)?.[0]} UTC */` as const;
  }

  public configFileGenTimestamp<T extends InstanceType<typeof Date>>(d: T) {
    return this.fileGenTimestamp(d).replace("/*", "#").replace("*/", "");
  }

  public mdFileGenTimestamp<T extends InstanceType<typeof Date>>(d: T) {
    return this.fileGenTimestamp(d).replace("/*", "<!--").replace("*/", "-->");
  }

  public existsSync<const T extends string>({
    cwd,
    path
  }: {
    cwd: string;
    path: T;
  }) {
    return fsSync.existsSync(relative(this.cwd ?? cwd, path));
  }

  public handleSrcArrStr<K extends string[]>(strArr: K) {
    return strArr.map(x =>
      /src\//gim.test(x) ? x.replace(/src\//gim, "") : x
    ) as K;
  }

  public handleSrcTupleStr<T extends string, V extends string>(
    str: readonly [T, V]
  ) {
    return str.map<T | V>((x, _i) => {
      return /src\//gim.test(x) ? (x.replace(/src\//gim, "") as T | V) : x;
    });
  }

  public inferObj = <J, T extends InferDepth<J>>(props: T) => props;

  public objInference = <T extends Parameters<typeof this.inferObj>["0"]>(
    props: T
  ) => this.inferObj(props);

  public isPlainObject(obj: unknown): obj is Record<string, unknown> {
    const stringifiedObj = "[object Object]" as const;
    return (
      !!obj &&
      typeof obj === "object" &&
      Object.prototype.toString.call<object, [], string>(obj) === stringifiedObj
    );
  }

  public handleSrcStr<T extends string>(str: T) {
    return /src\//gim.test(str) ? str.replace(/src\//gim, "") : str;
  }

  public omitSrcFromPathEnumerable<
    T extends string | string[] = string | string[]
  >(enumerable: T) {
    /* eslint-disable no-extra-boolean-cast */
    return !!Array.isArray(enumerable)
      ? this.handleSrcArrStr(enumerable)
      : this.handleSrcStr(enumerable);
  }

  public parseFileFromPath(path: string) {
    return /\//g.test(path) === true
      ? path?.split(/([/])/gim)?.reverse()?.[0]
      : path;
  }

  public pathHandler<T extends string>(path: T) {
    return /\//g.test(path) === true
      ? path
          /* eslint-disable-next-line no-useless-escape */
          .split(/([\/])/gim)
          .reverse()
          .slice(2)
          .reverse()
          .join("")
      : path;
  }

  public mkdirSync<T extends string>({
    cwd,
    path,
    options
  }: MkDirSyncProps<T>) {
    return fsSync.mkdirSync(relative(cwd, path), options);
  }

  public fileSizeMb<T extends string>(path: T) {
    return (
      fsSync.statSync(relative(this.cwd ?? process.cwd(), path)).size /
      (1024 * 1024)
    );
  }

  public generateDirIfDNE<T extends string>({
    path,
    cwd,
    options
  }: MkDirSyncProps<T>) {
    const doesExist = this.existsSync({ path, cwd });
    if (doesExist === true) return;
    else {
      return this.mkdirSync({ cwd, path, options });
    }
  }

  public withWs<T extends string>({ data, cwd, path }: WriteStreamProps<T>) {
    try {
      if (/\//g.test(path) === true) {
        return this.generateDirIfDNE({
          path: this.pathHandler(path),
          cwd: cwd ?? this.cwd ?? process.cwd(),
          options: { recursive: true }
        });
      } else return path;
    } catch (error) {
      console.error(
        `[withWs error]: `.concat(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        )
      );
    } finally {
      return fsSync
        .createWriteStream(relative(cwd, path), { autoClose: true })
        .write(Buffer.from(Buffer.from(data).toJSON().data));
    }
  }

  public writeFileAsync = async <const T extends string>({
    data,
    cwd,
    path,
    options
  }: WriteFileAsyncProps<T>) => {
    try {
      if (/\//g.test(path) === true)
        return this.generateDirIfDNE({
          path: this.pathHandler(path),
          cwd: cwd ?? this.cwd,
          options: { recursive: true }
        });
      else return path;
    } catch (error) {
      console.error(
        `[writeFileAsync error]: `.concat(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        )
      );
    } finally {
      return (await fsAsync.writeFile(
        relative(cwd, path),
        Buffer.from(
          Buffer.from(data satisfies WriteFileAsyncDataUnion).toJSON()
            .data satisfies number[]
        ) satisfies Uint8Array,
        options
      )) satisfies void;
    }
  };

  public fileToBuffer = <T extends string>({
    cwd,
    path
  }: {
    cwd: string;
    path: T;
  }) =>
    Buffer.from(
      Buffer.from(
        fsSync.readFileSync(relative(cwd, path)).toJSON()
          .data satisfies number[]
      ) satisfies Buffer
    ) satisfies Buffer;

  public dirContainsDir({
    readDir,
    targetDir,
    options
  }: {
    readDir: string;
    targetDir: string;
    options?: ReadDirOptions;
  }) {
    return this.readDir({
      cwd: this.cwd ?? process.cwd(),
      path: readDir,
      options
    })
      .filter(t => t.split(".").length === 1)
      .includes(targetDir);
  }

  public hasPublicAssetsFolder() {
    return this.dirContainsDir({ readDir: "public", targetDir: "assets" });
  }

  public hasPublicFilesFolder() {
    return this.dirContainsDir({ readDir: "public", targetDir: "files" });
  }

  public cloneRecursive<J, T extends { [P in keyof J]: J[P] }>(object: T) {
    const objectCopy = {} as Record<string, unknown>;
    const objectEntries = Object.entries(object);
    /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
    for (let i = 0; i < objectEntries.length; i++) {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      const [key, value] = objectEntries[i]!;

      if (value && (typeof value) in Object) {
        if (Array.isArray(value)) {
          objectCopy[key] = value.slice();

          for (let j = 0; j < value.length; j++) {
            /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
            (objectCopy[key] as any)[j] = this.cloneRecursive(value[j] as any);
          }
        } else {
          objectCopy[key] = this.cloneRecursive(value);
        }
      } else {
        objectCopy[key] = value;
      }
    }

    return objectCopy as Record<keyof T, T[keyof T]>;
  }

  /**
   * Deep Inference for Arrays or Objects
   */
  public cloneDeepEnumerable<
    const T extends { [record: string | symbol]: any }
  >(object: T) {
    const objectCopy = {} as Record<keyof T, any>;
    const objectEntries = Object.entries(object) as [keyof T, T[keyof T]][];
    /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
    for (let i = 0; i < objectEntries.length; i++) {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      const [key, value] = objectEntries[i]!;

      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
          objectCopy[key] = value.slice();

          for (let j = 0; j < value.length; j++) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            objectCopy[key][j] = this.cloneRecursive(value[j]!);
          }
        } else {
          objectCopy[key] = this.cloneRecursive(value);
        }
      } else {
        objectCopy[key] = value;
      }
    }
    return objectCopy as Record<keyof T, T[keyof T]>;
  }

  /* begin url */

  public isServerSide(): boolean {
    return typeof window === "undefined";
  }
  public isBase64(str: string) {
    if (!str) {
      return false;
    }

    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
      str.replace(/\n/g, "")
    );
  }
  public previewRegex = /\/preview(\/\w|\?)/;

  public isPreviewPath(uri: string) {
    if (typeof uri === "string") {
      return this.previewRegex.test(uri);
    }

    return false;
  }

  public URL_REGEX =
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

  public parseUrl(url: string): ParsedUrlInfo {
    // feeding consistently populated data from a 3rd party SaaS provider to this only
    const parsed = this.URL_REGEX.exec(url) as unknown as RegExpExecArray;

    return {
      href: parsed[0],
      protocol: parsed[1] ?? "",
      baseUrl: `${parsed[1]}${parsed[3]}`,
      host: parsed[4] ?? "",
      pathname: parsed[5] ?? "",
      search: parsed[6] ?? "",
      hash: parsed[8] ?? ""
    } satisfies ParsedUrlInfo;
  }

  /* end url */

  public get gzVal() {
    return (["application/x-gzip", "application/gzip"] as const).reduce(
      vals => vals
    );
  }

  public get zipVal() {
    return (
      ["application/zip", "application/x-zip-compressed"] as const
    ).reduce(vals => vals);
  }

  public get mimeTypeObj() {
    return {
      aac: "audio/aac",
      abw: "application/x-abiword",
      apng: "image/apng",
      arc: "application/x-freearc",
      avif: "image/avif",
      avi: "video/x-msvideo",
      azw: "application/vnd.amazon.ebook",
      bin: "application/octet-stream",
      bmp: "image/bmp",
      bz: "application/x-bzip",
      bz2: "application/x-bzip2",
      cda: "application/x-cdf",
      cjs: "application/javascript",
      csh: "application/x-csh",
      css: "text/css",
      csv: "text/csv",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      eot: "application/vnd.ms-fontobject",
      epub: "application/epub+zip",
      gif: "image/gif",
      gz: this.gzVal,
      htm: "text/html",
      html: "text/html",
      ico: "image/vnd.microsoft.icon",
      ics: "text/calendar",
      jar: "application/java-archive",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "text/javascript",
      json: "application/json",
      jsonld: "application/ld+json",
      m3u8: "application/vnd.apple.mpegurl",
      md: "text/markdown",
      mdx: "application/x-mdx",
      mid: "audio/midi",
      midi: "audio/x-midi",
      mjs: "text/javascript",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mpeg: "video/mpeg",
      mpkg: "application/vnd.apple.installer+xml",
      ndjson: "application/x-ndjson",
      odp: "application/vnd.oasis.opendocument.presentation",
      ods: "application/vnd.oasis.opendocument.spreadsheet",
      odt: "application/vnd.oasis.opendocument.text",
      oga: "audio/ogg",
      ogv: "video/ogg",
      ogx: "application/ogg",
      opus: "audio/ogg",
      otf: "font/otf",
      png: "image/png",
      pdf: "application/pdf",
      php: "application/x-httpd-php",
      pkpass: "application/vnd.apple.pkpass",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      rar: "application/vnd.rar",
      rtf: "application/rtf",
      sh: "application/x-sh",
      svg: "image/svg+xml",
      tar: "application/x-tar",
      tif: "image/tiff",
      tiff: "image/tiff",
      ts: "video/mp2t",
      ttf: "font/ttf",
      txt: "text/plain",
      vsd: "application/vnd.visio",
      wav: "audio/wav",
      weba: "video/webm",
      webp: "image/webp",
      woff: "font/woff",
      woff2: "font/woff2",
      xhtml: "application/xhtml+xml",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xml: "application/xml",
      xul: "application/vnd.mozilla.xul+xml",
      zip: this.zipVal,
      "3gp": "video/3gpp",
      "3g2": "video/3gpp2",
      "7z": "application/x-7z-compressed"
    } as const;
  }

  public assetType<const T extends string>(url: T) {
    return this.parseUrl(url)
      .pathname?.split(/([.])/gim)
      ?.reverse()?.[0] as keyof typeof this.mimeTypeObj;
  }

  public getMime<const S extends ReturnType<typeof this.assetType>>(input: S) {
    return this.mimeTypeObj[input];
  }

  public async assetToBlob(path: string) {
    return await fetch(path).then(res => res.blob());
  }

  public async assetToBuffer<const T extends string>(path: T) {
    const [fetcher] = await Promise.all([
      fetch(path).then(t => t.arrayBuffer())
    ]);

    const b64encodedData =
      `data:${this.getMime(this.assetType(path))};base64, ${Buffer.from(
        Buffer.from(fetcher).toJSON().data
      ).toString("base64")}` as const;
    const extension = this.assetType(path);
    return {
      b64encodedData,
      extension
    } as const;
  }

  public async assetToBufferView<const T extends string>(path: T) {
    const [fetcher] = await Promise.all([
      fetch(path).then(t => t.arrayBuffer())
    ]);
    // const byobRequest = new ReadableStreamBYOBRequest();
    const reader = new ReadableStream({
      type: "bytes",
      async pull(controller) {
        const byobRequest = controller.byobRequest;
        byobRequest?.respond(byobRequest?.view?.byteLength ?? 0);
      }
    });

    const readerByob = new ReadableStreamBYOBReader(reader);
    const readableByteStream = fetcher;
    const data = await readerByob.read(Buffer.from(readableByteStream));
    const b64encodedData =
      `data:${this.getMime(this.assetType(path))};base64, ${Buffer.from(
        Buffer.from(data.value ?? Buffer.alloc(0)).toJSON().data
      ).toString("base64")}` as const;
    const extension = this.assetType(path);
    return {
      b64encodedData,
      extension
    } as const;
  }

  public formatHelper<const T extends string>(f: T) {
    if (/([A-Za-z]+-[A-Za-z]+)/g.test(f) === true) {
      const formatting = f
        .split(/-/g)
        .map(v => v.substring(0, 1).toUpperCase().concat(v.substring(1)))
        .join(" ");
      return formatting;
    } else return f.substring(0, 1).toUpperCase().concat(f.substring(1));
  }

  public cleanDataUrlBase64(props: string) {
    return props.replace(
      /^data:(image|application|video|text|font)\/[A-Za-z0-9+-.]+;base64,/,
      ""
    );
  }
}
