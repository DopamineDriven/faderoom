import type { TsxExclude } from "@/types/helpers";

export function SquareSpace({
  ...svg
}: TsxExclude<"svg", "viewBox" | "fill" | "xmlns">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}>
      <path
        d="M8.20946 3.83789L2.90498 9.14237C1.5941 10.4533 1.59409 12.583 2.90546 13.8939C4.21634 15.2053 6.3461 15.2048 7.65698 13.8939L14.4015 7.14941"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="79.8403"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M16.7772 4.82141C15.4664 3.51005 13.3366 3.51005 12.0257 4.82141L5.76172 11.0849"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="79.8403"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M15.7916 19.68L21.0956 14.3755C22.4065 13.0646 22.4065 10.9348 21.0951 9.62397C19.7843 8.3126 17.6545 8.31309 16.3436 9.62397L9.59961 16.3684"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="79.8403"
        strokeLinejoin="round"
      />
      <path
        d="M7.22363 18.6952C8.53451 20.0065 10.6643 20.0065 11.9752 18.6952L18.2396 12.4316"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="79.8403"
        strokeLinejoin="round"
      />
    </svg>
  );
}
SquareSpace.displayName = "SquareSpace";
