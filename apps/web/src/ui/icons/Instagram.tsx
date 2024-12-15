import type { TsxExclude } from "@/types/helpers";

export function InstagramIcon({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}>
      <g clipPath="url(#clip0_2844_19)">
        <path
          d="M7.28754 22.9966H16.713C20.1831 22.9966 22.9966 20.1831 22.9966 16.713V7.28754C22.9966 3.8174 20.1831 1.00391 16.713 1.00391H7.28754C3.8174 1.00391 1.00391 3.8174 1.00391 7.28754V16.713C1.00391 20.1831 3.8174 22.9966 7.28754 22.9966Z"
          stroke="currentColor"
          strokeWidth="0.96"
          strokeMiterlimit="10"
        />
        <path
          d="M12 17.2364C14.892 17.2364 17.2364 14.892 17.2364 12C17.2364 9.10807 14.892 6.76367 12 6.76367C9.10807 6.76367 6.76367 9.10807 6.76367 12C6.76367 14.892 9.10807 17.2364 12 17.2364Z"
          stroke="currentColor"
          strokeWidth="0.96"
          strokeMiterlimit="10"
        />
        <path
          d="M18.2836 6.76447C18.862 6.76447 19.3309 6.29559 19.3309 5.71719C19.3309 5.1388 18.862 4.66992 18.2836 4.66992C17.7052 4.66992 17.2363 5.1388 17.2363 5.71719C17.2363 6.29559 17.7052 6.76447 18.2836 6.76447Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2844_19">
          <rect width="24" height="24" fill="none" />
        </clipPath>
      </defs>
    </svg>
  );
}

InstagramIcon.displayName = "InstagramIcon";

export const Instagram = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9997 11.3703C16.1231 12.2025 15.981 13.0525 15.5935 13.7993C15.206 14.5461 14.5929 15.1517 13.8413 15.53C13.0898 15.9082 12.2382 16.0399 11.4075 15.9062C10.5768 15.7726 9.80947 15.3804 9.21455 14.7855C8.61962 14.1905 8.22744 13.4232 8.09377 12.5925C7.96011 11.7619 8.09177 10.9102 8.47003 10.1587C8.84829 9.40716 9.45389 8.79404 10.2007 8.40654C10.9475 8.01904 11.7975 7.87689 12.6297 8.0003C13.4786 8.12619 14.2646 8.52176 14.8714 9.12861C15.4782 9.73545 15.8738 10.5214 15.9997 11.3703Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 6.5H17.51"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Instagram.displayName = "Instagram" as const;
