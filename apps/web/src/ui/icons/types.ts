import type React from "react";
import type { RemoveFields, TsxTargetedExp } from "@/types/helpers";

// https://www.svgviewer.dev/

export type IconNode = [
  elementName: keyof React.ReactSVG,
  attrs: Record<string, string>
][];

export type ElementAttributePicker<
  T extends keyof React.JSX.IntrinsicElements
> = React.RefAttributes<TsxTargetedExp<T, "element">> &
  Partial<TsxTargetedExp<T, "attribute">>;

export interface LucideProps extends ElementAttributePicker<"svg"> {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = React.ForwardRefExoticComponent<
  RemoveFields<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

/**
 * Convert a type string from camelCase to PascalCase
 *
 * @example
 * type Test = CamelToPascal<'fooBar'> // 'FooBar'
 */
export type CamelToPascal<T extends string> =
  T extends `${infer FirstChar}${infer Rest}`
    ? `${Capitalize<FirstChar>}${Rest}`
    : never;

/**
 * Creates a list of components from a list of component names and a component type
 */
export type ComponentList<ComponentNames, ComponentType> = {
  [Prop in keyof ComponentNames as CamelToPascal<Prop & string>]: ComponentType;
};

export const mergeClasses = <ClassType = string | undefined | null>(
  ...classes: ClassType[]
) =>
  classes
    .filter((className, index, array) => {
      return (
        Boolean(className) &&
        (className as string).trim() !== "" &&
        array.indexOf(className) === index
      );
    })
    .join(" ")
    .trim();
