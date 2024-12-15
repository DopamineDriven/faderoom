import type { TsxExclude } from "@/types/helpers";

export const Fallback = ({
  ...svg
}: TsxExclude<"svg", "version" | "xmlns" | "xmlnsXlink" | "viewBox">) => (
  <svg
    viewBox="0 0 500 500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
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

Fallback.displayName = "Fallback";

/* <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M500 0H0V500H500V0Z" fill="url(#paint0_linear_2851_14)"/>
<defs>
<linearGradient id="paint0_linear_2851_14" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0.2" stop-color="#333333"/>
<stop offset="0.5" stop-color="#D7BE69"/>
<stop offset="0.7" stop-color="#333333"/>
</linearGradient>
</defs>
</svg>
 */
