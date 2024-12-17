export type PersistentContext = Record<string, unknown>;
export class Serializer<T> {
  public serialize(inp: T): string {
    return JSON.stringify(inp);
  }
  public deserialize(inp: string) {
    return JSON.parse(inp);
  }
}

export type Widget = {
  toJSON(): {
    kind: "Widget";
    date: Date;
  };
};

export type Item = {
  text: string;
  count: number;
  // preserve options
  choice: "yes" | "no" | null;
  // drop functions
  func: () => void;
  nested: {
    isSaved: boolean;
    data: [1, undefined, 2];
  };
  // pointer to another type
  widget: Widget;
  // Same obj referenced again
  children?: Item[];
};

export type JSONified<T> = JSONifiedValue<
  T extends { toJSON(): infer U } ? U : T
>;

export type JSONifiedValue<T> = T extends string | number | boolean | null
  ? T
  : T extends (...args: any) => any
    ? never
    : T extends object
      ? JSONifiedObject<T>
      : T extends (infer U)[] | readonly (infer U)[]
        ? JSONifiedArray<U>
        : never;

export type JSONifiedObject<T> = {
  [P in keyof T]: JSONifiedObject<T[P]>;
};

export type UndefinedAsNull<T> = T extends undefined ? null : T;

export type JSONifiedArray<T> = UndefinedAsNull<JSONified<T>>[];

// general helpers

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>;
};

function range(from: number, to: number): number[] {
  const values: number[] = [];
  for (let i = from; i < to; i++) {
    values.push(i);
  }
  return values;
}

export const isPrimeNumber = (n: number) => {
  for (let i = 2; n > i; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
};

export const acceptor = (num: number) =>
  [...Array(num !== 0 ? num : range((num = -101), (num = 101))).keys()]
    .reverse()
    .filter(isPrimeNumber);
