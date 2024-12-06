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
