import type { TsxExclude } from "@/types/helpers";

export function FacebookIcon({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}>
      <path
        d="M12.0003 1.00391C5.92713 1.00391 1.00391 5.92713 1.00391 12.0003C1.00391 17.5131 5.06523 22.0656 10.3566 22.8605V14.9148H7.63576V12.0244H10.3566V10.101C10.3566 6.91681 11.9081 5.5187 14.5546 5.5187C15.8223 5.5187 16.4925 5.61243 16.8099 5.65537V8.17825H15.0049C13.8817 8.17825 13.489 9.24332 13.489 10.444V12.0238H16.7821L16.3355 14.9143H13.4895V22.8841C18.8562 22.1562 22.9966 17.567 22.9966 12.0003C22.9966 5.92713 18.0734 1.00391 12.0003 1.00391Z"
        stroke="currentColor"
        strokeWidth="0.96"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

FacebookIcon.displayName = "FacebookIcon";

export const Facebook = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
Facebook.displayName = "Facebook" as const;
