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

export const EnhancedChameleon = ({
  ...svg
}: TsxExclude<"svg", "fill" | "viewBox" | "xmlns">) => (
  <svg
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.039 0.434053C16.1965 0.346657 16.3894 0.353595 16.5402 0.45208C18.2632 1.57734 19.5628 2.29175 20.4554 2.62221C21.3025 2.93579 22.2194 3.80669 22.84 4.81401C23.461 5.82216 23.8709 7.10801 23.4983 8.28099C23.4246 8.51286 23.1907 8.65444 22.9511 8.61218C21.4621 8.34959 20.1885 8.41549 19.1647 8.46848C19.1068 8.47147 19.0497 8.47442 18.9935 8.47727C18.4815 8.50321 17.9962 8.52351 17.6015 8.46939C17.2026 8.41471 16.7784 8.26836 16.5295 7.85756L16.5295 7.85754C16.3928 7.63188 16.2976 7.30908 16.2222 6.94369C16.144 6.56434 16.0772 6.08661 16.0205 5.51561C15.907 4.37272 15.8303 2.822 15.7892 0.868892C15.7854 0.688826 15.8816 0.52145 16.039 0.434053ZM16.7829 1.76111C16.8267 3.2745 16.895 4.49293 16.987 5.41961C17.042 5.97315 17.1046 6.41407 17.1734 6.74749C17.2451 7.09482 17.3145 7.27891 17.3602 7.35427C17.3848 7.39498 17.4499 7.46829 17.7334 7.50716C18.021 7.54658 18.4108 7.53431 18.9443 7.50728C19.0035 7.50429 19.0639 7.50114 19.1256 7.49793C20.0479 7.44996 21.2538 7.38723 22.6559 7.58255C22.7293 6.88026 22.4753 6.07387 22.013 5.32342C21.4585 4.4233 20.6902 3.7448 20.1182 3.53303L20.1182 3.53302C19.272 3.21975 18.157 2.62364 16.7829 1.76111Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5712 4.21115C18.9933 3.70551 19.7444 3.44058 20.454 3.77761C20.5146 3.80638 20.5404 3.8788 20.5116 3.93936C20.4828 3.99993 20.4104 4.02571 20.3498 3.99694C19.7556 3.71473 19.1203 3.93235 18.7576 4.36676C18.5771 4.58297 18.4683 4.84873 18.4655 5.12649C18.4628 5.40257 18.5647 5.69954 18.8214 5.98141C19.108 6.29605 19.4699 6.46131 19.8906 6.35356C20.2357 6.26512 20.6194 6.00145 20.8189 5.65857C20.9174 5.4892 20.9691 5.3042 20.9535 5.1129C20.938 4.92234 20.8551 4.71514 20.6671 4.50171C20.6228 4.45139 20.6276 4.37468 20.678 4.33036C20.7283 4.28604 20.805 4.29089 20.8493 4.3412C21.0667 4.58798 21.1752 4.84315 21.1955 5.09325C21.2158 5.34263 21.1475 5.57661 21.0288 5.78068C20.7937 6.18465 20.3533 6.48564 19.9509 6.58877L19.9509 6.58877C19.4192 6.72496 18.9704 6.50545 18.6419 6.14493L18.6419 6.14491C18.3473 5.82137 18.2194 5.46626 18.2227 5.1241C18.2261 4.78361 18.3593 4.46497 18.5712 4.21115Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.14487 2.79965C6.70728 -0.112882 12.4161 -0.745714 16.5876 2.80585C16.7918 2.97972 16.8164 3.28621 16.6425 3.49042C16.4687 3.69463 16.1622 3.71923 15.958 3.54537C12.1967 0.343029 7.01526 0.889843 3.75962 3.55157L3.75961 3.55158C2.33416 4.71691 1.68184 6.38917 1.61554 8.21177C1.54901 10.0406 2.0763 11.994 2.98144 13.6457C3.88961 15.3029 5.14745 16.6024 6.49402 17.1861C7.80478 17.7543 9.23265 17.6639 10.6246 16.4828L10.6246 16.4828C11.519 15.7239 11.8517 15.1479 11.8756 14.5994C11.9005 14.0273 11.6004 13.3286 10.8159 12.3025L11.2017 12.0075L10.8159 12.3025C10.209 11.5086 9.15617 11.1171 8.09333 11.1989C7.03614 11.2801 6.04607 11.8236 5.54671 12.8036L5.54669 12.8037C5.35012 13.1894 5.40406 13.6172 5.6903 14.0577C5.98174 14.5062 6.49039 14.9179 7.07397 15.1744C7.66041 15.4322 8.25751 15.5058 8.72382 15.3687C9.15608 15.2416 9.53976 14.9169 9.71977 14.2106L9.71978 14.2105C9.76893 14.0177 9.71959 13.7715 9.54636 13.5039C9.37462 13.2385 9.11417 13.0079 8.85711 12.8749C8.5771 12.73 8.42592 12.7579 8.39106 12.7763L8.39097 12.7763C8.38361 12.7802 8.35764 12.7938 8.3308 12.8628C8.30052 12.9405 8.27286 13.0832 8.289 13.3205C8.30721 13.5881 8.10505 13.8198 7.83747 13.838C7.56989 13.8562 7.33821 13.6541 7.32001 13.3865C7.27653 12.7474 7.43899 12.1794 7.93924 11.9165C8.39586 11.6766 8.92102 11.8144 9.30352 12.0123C9.70898 12.2222 10.0972 12.5675 10.3617 12.9761C10.6247 13.3825 10.7991 13.9083 10.6609 14.4505C10.4031 15.4619 9.78495 16.069 8.99778 16.3005C8.24465 16.5219 7.40474 16.3808 6.68311 16.0635C5.95863 15.745 5.28814 15.2213 4.87591 14.5869C4.45847 13.9445 4.28419 13.142 4.68135 12.3627C5.36228 11.0263 6.69021 10.3326 8.01888 10.2305C9.3419 10.1287 10.7428 10.6077 11.5875 11.7126C12.3922 12.7652 12.8867 13.7035 12.8459 14.6416C12.804 15.6033 12.2107 16.4108 11.253 17.2234C9.57261 18.6492 7.74997 18.7891 6.10773 18.0772C4.50131 17.3808 3.10369 15.8898 2.12971 14.1124C1.15271 12.3296 0.571182 10.2042 0.644947 8.17646C0.718938 6.14249 1.45601 4.18033 3.14487 2.79965Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.222 6.77685C15.4808 6.84712 15.6337 7.11391 15.5634 7.37274C15.4989 7.61034 15.3298 7.78904 15.1745 7.91702C15.0091 8.05328 14.7962 8.18299 14.5504 8.30866C14.1588 8.5088 13.6416 8.71965 13.0057 8.94193C13.0081 8.94604 13.0106 8.95018 13.013 8.95434C13.1348 9.15898 13.2886 9.39581 13.4511 9.6459C13.4645 9.66648 13.478 9.68716 13.4914 9.7079C13.6649 9.97506 13.846 10.2555 13.9872 10.5013C14.0579 10.6244 14.1234 10.747 14.1745 10.8609C14.2215 10.9658 14.2736 11.1004 14.2894 11.2373C14.3201 11.5037 14.1289 11.7446 13.8625 11.7752C13.596 11.8059 13.3552 11.6148 13.3245 11.3483C13.3248 11.3512 13.3251 11.3526 13.325 11.3527C13.3245 11.3528 13.318 11.3245 13.2882 11.2582C13.2558 11.1858 13.2078 11.0944 13.1451 10.9851C13.0193 10.7661 12.853 10.508 12.6769 10.2369C12.6628 10.2151 12.6485 10.1932 12.6343 10.1713C12.4749 9.92606 12.3104 9.673 12.1783 9.45083C12.1061 9.32942 12.039 9.20975 11.9855 9.09972C11.9359 8.99761 11.8818 8.87161 11.8581 8.74592C11.8129 8.50628 11.9524 8.27028 12.1842 8.19439C13.0449 7.91256 13.6818 7.66187 14.1083 7.44384C14.3224 7.33444 14.467 7.24149 14.5568 7.1675C14.6053 7.12752 14.6264 7.10245 14.6336 7.09323C14.7138 6.84968 14.9716 6.70888 15.222 6.77685Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.7199 4.46484C19.9211 4.46484 20.0842 4.62799 20.0842 4.82923V5.3929C20.0842 5.59415 19.9211 5.75729 19.7199 5.75729C19.5186 5.75729 19.3555 5.59415 19.3555 5.3929V4.82923C19.3555 4.62799 19.5186 4.46484 19.7199 4.46484Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.55414 7.93626C7.81836 7.06118 11.0157 6.68233 15.1078 6.76499C15.376 6.7704 15.5889 6.99217 15.5835 7.26031C15.5781 7.52846 15.3563 7.74144 15.0882 7.73602C11.0425 7.6543 7.99389 8.03459 5.90427 8.84219C3.83205 9.64307 2.76486 10.8336 2.51588 12.376C2.47314 12.6407 2.22385 12.8207 1.95908 12.778C1.69431 12.7352 1.51432 12.486 1.55706 12.2212C1.8779 10.2337 3.27253 8.81807 5.55414 7.93626Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
  </svg>
);

EnhancedChameleon.displayName = "EnhancedChameleon";
