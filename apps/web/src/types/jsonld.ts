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
