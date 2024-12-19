import type { TsxExclude } from "@/types/helpers";

export const Chameleon = ({
  ...svg
}: TsxExclude<"svg", "fill" | "viewBox" | "xmlns">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.0446 7.28558C17.3432 7.0259 16.3518 6.47756 15.0703 5.64062C15.1312 8.52896 15.2968 10.1962 15.5671 10.6425C15.9727 11.3119 17.6578 10.6064 20.0822 11.034C20.5433 9.58281 19.0966 7.67504 18.0446 7.28558Z"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.96"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.1291 7.88604C17.1625 7.42698 16.0735 8.60148 16.8908 9.49908C17.1188 9.74934 17.4193 9.89196 17.7724 9.80154C18.3265 9.65952 18.9943 8.96436 18.3932 8.28204"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.0698 7.35812C12.1294 4.85471 8.09281 5.29196 5.56561 7.35812C0.948187 11.133 6.56047 21.3627 11.1155 17.4976C12.4886 16.3326 12.4886 15.4464 11.3105 13.9054C10.2343 12.4978 7.67251 12.615 6.79753 14.3322C5.91722 16.0595 9.91165 18.1744 10.5607 15.6275C10.8385 14.5378 8.67811 13.2285 8.79205 14.9032"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.96"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.198 10.377C14.1233 10.6519 13.4414 11.0004 12.1523 11.4225C12.2197 11.7794 13.2018 13.0166 13.2433 13.3773"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.96"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.623 8.99969C17.623 8.86001 17.623 8.72105 17.623 8.58203"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.72"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1965 10.3792C8.16368 10.2574 4.93609 11.5048 4.51367 14.1215"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="0.96"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Chameleon.displayName = "Chameleon";

