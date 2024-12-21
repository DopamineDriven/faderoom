import type {
  RemoveFields,
  TypedJsonString,
  Unenumerate
} from "@/types/helpers";

export type JsonValueScalar = string | boolean | number;

export type JsonEnumerable<T> = T | T[] | readonly T[];

export type JsonValue =
  | JsonEnumerable<JsonValueScalar>
  | { [key: string]: JsonValue };

export type JsonReplacer = (
  _: string,
  value: JsonValue
) => JsonValue | undefined;

export interface JsonLdProps {
  type?: string;
  scriptId?: string;
  "@id"?: string;
  [key: string]: any;
}

export class JsonLdService {
  // method type overloads
  stringifyJson<
    const T,
    const R extends (string | number)[] | null | undefined,
    const S extends string | number | undefined
  >(json: unknown, replacer: R, space: S): TypedJsonString<T>;
  stringifyJson<
    const T,
    const R extends ((this: any, key: string, value: any) => any) | undefined,
    const S extends string | number | undefined
  >(json: unknown, replacer: R, space: S): TypedJsonString<T>;
  public stringifyJson<
    const T,
    const R extends ((this: any, key: string, value: any) => any) | undefined,
    const S extends string | number | undefined
  >(json: T, replacer: R, space: S) {
    return JSON.stringify(json, replacer, space) as TypedJsonString<T>;
  }

  public parseJson<
    const T,
    const R extends ((this: any, key: string, value: any) => any) | undefined
  >(stringVal: TypedJsonString<T>, reviver: R) {
    return JSON.parse(stringVal, reviver) as T;
  }
  public escape_entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  } as const;

  public escape_regex = new RegExp(
    `[${Object.keys(this.escape_entities).join("")}]`,
    "g"
  );

  public escape_replacer<const T extends string>(t: T) {
    return this.escape_entities[t as keyof typeof this.escape_entities];
  }

  public is_never(_: never): void {}

  public safeJsonLdReplacer: JsonReplacer = (() => {
    return (_: string, value: JsonValue): JsonValue | undefined => {
      switch (typeof value) {
        case "object":
          /* Omit null values. */
          if (value === null) {
            return undefined;
          }
          return value; /* recursively calls replacer via JSON.stringify */
        case "number":
        case "boolean":
        case "bigint":
          return value; /* These values are not risky. */
        case "string":
          /* eslint-disable-next-line @typescript-eslint/unbound-method */
          return value.replace(this.escape_regex, this.escape_replacer);
        default: {
          /* We shouldn't expect other types. */
          this.is_never(value);

          /* JSON.stringify will remove this element. */
          return undefined;
        }
      }
    };
  })();

  public excludeJsonLdField<JsonLdProps, Key extends keyof JsonLdProps>(
    jsonLd: JsonLdProps,
    ...keys: Key[]
  ): Omit<JsonLdProps, Key> {
    for (const key of keys) {
      delete jsonLd[key];
    }
    return jsonLd;
  }

  public omitFields<
    const Target extends JsonLdProps,
    const Key extends keyof Target
  >(
    target: Target,
    keys: Key[]
  ): RemoveFields<Target, Unenumerate<typeof keys>> {
    /* eslint-disable-next-line prefer-const */
    let obj = target;
    keys.forEach(t => {
      if (t in obj) {
        delete obj[t];
        return obj;
      } else {
        return obj;
      }
    });
    return obj;
  }

  public toJson<const T>(type: T, jsonld: JsonLdProps) {
    const { ["@id"]: id = undefined } = jsonld;
    const updated = {
      ...(id ? { ["@id"]: id } : {}),
      ...jsonld
    };
    const deleteIdField = this.omitFields(updated, ["@id"]);

    return {
      __html: this.stringifyJson(
        {
          "@context": "https://schema.org/",
          "@type": type,
          ...deleteIdField
        },
        this.safeJsonLdReplacer,
        2
      )
    };
  }
}
