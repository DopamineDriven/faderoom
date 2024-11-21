import type { JsonLdProps, JsonReplacer, JsonValue } from "@/types/jsonld";
import { Unenumerate } from "@/types/fs";
import { RemoveFields } from "@/types/helpers";

export class JsonLdService {
  constructor() {}

  private escape_entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  } as const;

  private escape_regex = new RegExp(
    `[${Object.keys(this.escape_entities).join("")}]`,
    "g"
  );

  private escape_replacer<const T extends string>(t: T) {
    return this.escape_entities[t as keyof typeof this.escape_entities];
  }

  private is_never(_: never): void {}

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

  public toJson<T extends string = string>(type: T, jsonld: JsonLdProps) {
    const { ["@id"]: id = undefined } = jsonld;
    const updated = {
      ...(id ? { ["@id"]: id } : {}),
      ...jsonld
    };
    const deleteIdField = this.omitFields(updated, ["@id"]);

    return {
      __html: JSON.stringify(
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
