import type { TsxExclude } from "@/types/helpers";

export function LoadingSvg({
  ...svg
}: TsxExclude<"svg", "version" | "viewBox" | "xmlns" | "xmlnsXlink">) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 500 500"
      {...svg}>
      <defs>
        <linearGradient id="g">
          <stop stopColor="#333" offset="20%" />
          <stop stopColor="#d7be69" offset="50%" />
          <stop stopColor="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="500" height="500" fill="#333" />
      <rect id="r" width="500" height="500" fill="url(#g)" />
      <animate
        xlinkHref="#r"
        attributeName="x"
        from="-500"
        to="500"
        dur="1s"
        repeatCount="indefinite"
      />
    </svg>
  );
}
LoadingSvg.displayName="LoadingSvg";
