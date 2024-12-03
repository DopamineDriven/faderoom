"use client";

import * as React from "react";

export function forwardRefEnhanced<
  const T,
  const P = object
>(
  render: React.ForwardRefRenderFunction<T, React.PropsWithoutRef<P>>
): (
  props: React.PropsWithoutRef<P> & React.RefAttributes<T>
) => React.ReactNode {
  return React.forwardRef(render) satisfies React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  >;
}

/* uncomment code below to test */

/*
import { Unenumerate } from "@/types";

const data = [
  {
    color: "blue",
    pet: "dog",
    season: "winter"
  },
  { color: "red", pet: "cat", season: "autumn" }
] as const;

function TableTest<
  const T extends Unenumerate<typeof data>,
  const P extends HTMLTableElement | null
>(
  props: { data: readonly T[] | T[]; renderRow: (row: T) => React.ReactNode },
  ref: React.ForwardedRef<P>
) {
  return (
    <table ref={ref}>
      <tbody>
        {props.data.map((item, i) => (
          <props.renderRow key={i} {...item} />
        ))}
      </tbody>
    </table>
  );
}

const ForwardedTable = forwardRefEnhanced(TableTest);

export const TestFunctionality = ({ ...props }: HTMLTableElement) => {
  return (
    <ForwardedTable
      data={data}
      ref={{ current: { ...props } }}
      renderRow={({ color, pet, season }) => {
        return (
          <span>
            <tr>{color}</tr>
            <tr>{pet}</tr>
            <tr>{season}</tr>
          </span>
        );
      }}
    />
  );
};


*/
