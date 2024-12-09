import type { TsxExclude } from "@/types/helpers";

export function Facial({
  ...svg
}: TsxExclude<"svg", "viewBox" | "xmlns" | "fill">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}>
      <path
        d="M7.29825 7.85718C6.88022 8.27521 6.50564 8.72465 6.17578 9.19945C6.87267 9.65371 7.5727 9.78979 7.58011 9.79115C8.88666 10.0329 10.2048 9.75215 11.2962 9.00154C12.3875 8.25098 13.1213 7.12026 13.3621 5.81784L13.3651 5.8026C13.3658 5.79904 13.433 5.46201 13.4637 5.0459C11.1397 5.20077 8.97052 6.18487 7.29825 7.85718Z"
        fill="currentColor"
      />
      <path
        d="M15.5244 6.24257C15.3734 6.09149 15.2192 5.94482 15.0626 5.80176C15.0368 5.97538 15.0139 6.09449 15.0072 6.12838C14.7713 7.39659 14.1866 8.51357 13.3711 9.39932C14.3438 9.8863 15.3984 10.0335 16.3727 9.80052C17.0212 9.64541 17.5177 9.3778 17.7847 9.21018C17.1782 8.13759 16.4214 7.13948 15.5244 6.24257Z"
        fill="currentColor"
      />
      <path
        d="M5.88105 2.23242H5.58812C4.45042 3.13589 3.50275 4.28044 2.8338 5.56627C2.07494 7.02502 1.67383 8.67075 1.67383 10.3255C1.67383 12.0038 2.07658 13.5896 2.79011 14.992V14.6714C2.79011 11.6568 3.97056 8.81606 6.11402 6.67266C7.69886 5.08777 9.66512 4.03013 11.8008 3.58613C9.97473 2.70066 7.9622 2.23242 5.88105 2.23242Z"
        fill="currentColor"
      />
      <path
        d="M11.9991 0C10.6715 0 9.38056 0.248906 8.17578 0.729844C11.3877 1.21308 14.3573 2.70778 16.7081 5.05852C19.4085 7.75889 20.9792 11.2761 21.1846 15.039C21.913 13.6252 22.3247 12.0226 22.3247 10.3256C22.3247 4.63205 17.6926 0 11.9991 0Z"
        fill="currentColor"
      />
      <path
        d="M18.5205 10.7244C18.1231 10.9575 17.5225 11.2476 16.7624 11.4293C16.3296 11.5328 15.8873 11.5837 15.4427 11.5837C14.2637 11.5837 13.0694 11.225 11.995 10.541C10.9632 11.1852 9.75375 11.5497 8.48897 11.5497C8.09002 11.5497 7.68558 11.5134 7.27955 11.4383C7.2398 11.4311 6.30717 11.2576 5.34309 10.6541C4.76827 11.9002 4.46484 13.2638 4.46484 14.6719V18.4748C4.46489 21.5217 6.94364 24.0004 9.99047 24.0004H14.0091C17.0559 24.0004 19.5346 21.5217 19.5346 18.4748V15.8863C19.5346 14.0892 19.1857 12.3433 18.5205 10.7244ZM8.37187 17.5818C7.293 17.5818 6.41841 16.7072 6.41841 15.6284C6.41841 14.5495 7.293 13.6749 8.37187 13.6749C9.45075 13.6749 10.3253 14.5495 10.3253 15.6284C10.3253 16.7072 9.45075 17.5818 8.37187 17.5818ZM11.9998 20.6516C11.2291 20.6516 10.6044 20.0268 10.6044 19.2562H13.3951C13.3951 20.0269 12.7704 20.6516 11.9998 20.6516ZM15.6277 17.5818C14.5488 17.5818 13.6742 16.7072 13.6742 15.6284C13.6742 14.5495 14.5488 13.6749 15.6277 13.6749C16.7065 13.6749 17.5811 14.5495 17.5811 15.6284C17.5811 16.7072 16.7065 17.5818 15.6277 17.5818Z"
        fill="currentColor"
      />
    </svg>
  );
}

Facial.displayName = "Facial";