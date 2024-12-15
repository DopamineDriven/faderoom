import type { TsxExclude } from "@/types/helpers";

export const CtaArrow = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      d="M13.9427 0.800781C13.5069 0.800781 13.0891 0.973867 12.781 1.28196C12.4729 1.59006 12.2998 2.00793 12.2998 2.44364C12.2998 2.87935 12.4729 3.29722 12.781 3.60531C13.0891 3.91341 13.5069 4.0865 13.9427 4.0865H18.1911L7.85259 14.425C7.69568 14.5765 7.57052 14.7578 7.48442 14.9583C7.39832 15.1587 7.353 15.3743 7.35111 15.5924C7.34921 15.8105 7.39078 16.0269 7.47338 16.2288C7.55599 16.4307 7.67797 16.6141 7.83223 16.7684C7.98648 16.9226 8.16991 17.0446 8.37181 17.1272C8.57371 17.2098 8.79004 17.2514 9.00818 17.2495C9.22632 17.2476 9.44189 17.2023 9.64233 17.1162C9.84276 17.0301 10.024 16.9049 10.1756 16.748L20.5141 6.4095V10.6579C20.5141 11.0936 20.6872 11.5115 20.9953 11.8196C21.3034 12.1277 21.7212 12.3008 22.1569 12.3008C22.5927 12.3008 23.0105 12.1277 23.3186 11.8196C23.6267 11.5115 23.7998 11.0936 23.7998 10.6579V2.44364C23.7998 2.00793 23.6267 1.59006 23.3186 1.28196C23.0105 0.973867 22.5927 0.800781 22.1569 0.800781H13.9427Z"
      fill="currentColor"
    />
    <path
      d="M4.08552 4.0865C3.21409 4.0865 2.37836 4.43267 1.76217 5.04886C1.14598 5.66505 0.799805 6.50078 0.799805 7.37221V20.5151C0.799805 21.3865 1.14598 22.2222 1.76217 22.8384C2.37836 23.4546 3.21409 23.8008 4.08552 23.8008H17.2284C18.0998 23.8008 18.9355 23.4546 19.5517 22.8384C20.1679 22.2222 20.5141 21.3865 20.5141 20.5151V15.5865C20.5141 15.1508 20.341 14.7329 20.0329 14.4248C19.7248 14.1167 19.3069 13.9436 18.8712 13.9436C18.4355 13.9436 18.0177 14.1167 17.7096 14.4248C17.4015 14.7329 17.2284 15.1508 17.2284 15.5865V20.5151H4.08552V7.37221H9.01409C9.4498 7.37221 9.86767 7.19912 10.1758 6.89103C10.4839 6.58293 10.6569 6.16507 10.6569 5.72935C10.6569 5.29364 10.4839 4.87577 10.1758 4.56768C9.86767 4.25958 9.4498 4.0865 9.01409 4.0865H4.08552Z"
      fill="currentColor"
    />
  </svg>
);

CtaArrow.displayName = "CtaArrow";
