import type { TsxExclude } from "@/types/helpers";

export function Barbershop({
  ...svg
}: TsxExclude<"svg", "viewBox" | "xmlns" | "fill">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}>
      <path
        d="M16 19H15.5V5.00002H16C16.276 5.00002 16.5 4.776 16.5 4.5C16.5 3.12202 15.378 2.00002 14 2.00002C14 0.897 13.103 0 12 0C10.897 0 9.99998 0.897 9.99998 2.00002C8.622 2.00002 7.5 3.12202 7.5 4.5C7.5 4.776 7.72402 5.00002 8.00002 5.00002H8.50003V19H8.00002C7.72402 19 7.5 19.224 7.5 19.5C7.5 20.878 8.622 22 9.99998 22C9.99998 23.103 10.897 24 12 24C13.103 24 14 23.103 14 22C15.378 22 16.5 20.878 16.5 19.5C16.5 19.224 16.276 19 16 19ZM12 0.999984C12.551 0.999984 13 1.449 13 1.99997H11C11 1.449 11.449 0.999984 12 0.999984ZM9.999 3H13.999C14.651 3 15.207 3.41798 15.414 3.99998H8.58502C8.79202 3.41798 9.348 3 9.999 3ZM9.633 13.948C10.026 13.915 10.415 13.865 10.797 13.789C10.85 13.779 10.901 13.763 10.954 13.752C11.3 13.678 11.64 13.584 11.975 13.476C12.058 13.449 12.142 13.424 12.224 13.395C12.588 13.267 12.944 13.12 13.289 12.951C13.355 12.919 13.418 12.883 13.483 12.849C13.79 12.691 14.087 12.519 14.374 12.33C14.414 12.304 14.458 12.285 14.497 12.258V14.008C14.466 14.035 14.431 14.061 14.396 14.087C14.079 14.333 13.75 14.562 13.402 14.762C13.381 14.774 13.359 14.784 13.338 14.796C12.992 14.991 12.631 15.161 12.259 15.311C12.213 15.33 12.168 15.351 12.121 15.369C11.751 15.5109 11.368 15.6249 10.979 15.719C10.907 15.736 10.836 15.754 10.764 15.77C10.379 15.853 9.98695 15.914 9.58997 15.949C9.55997 15.952 9.52997 15.953 9.49898 15.955V13.966C9.54398 13.963 9.588 13.952 9.633 13.948ZM9.49898 12.955V10.969C11.309 10.839 13.039 10.249 14.499 9.26198V11.008C14.466 11.035 14.431 11.061 14.396 11.087C14.079 11.333 13.75 11.562 13.402 11.762C13.381 11.774 13.359 11.784 13.338 11.796C12.9921 11.991 12.631 12.161 12.259 12.311C12.213 12.33 12.168 12.351 12.121 12.369C11.751 12.5109 11.368 12.6249 10.979 12.719C10.907 12.736 10.836 12.754 10.764 12.77C10.379 12.853 9.987 12.914 9.59002 12.949C9.56002 12.952 9.53002 12.953 9.49898 12.955ZM9.50002 16.965C9.54502 16.962 9.58903 16.951 9.63403 16.947C10.027 16.914 10.416 16.864 10.798 16.788C10.851 16.778 10.902 16.762 10.955 16.751C11.301 16.677 11.641 16.583 11.976 16.475C12.059 16.448 12.143 16.423 12.225 16.394C12.589 16.266 12.945 16.119 13.29 15.95C13.356 15.918 13.419 15.882 13.484 15.848C13.791 15.69 14.088 15.518 14.375 15.329C14.415 15.303 14.459 15.284 14.498 15.257V17.017C13.099 18.137 11.347 18.817 9.50002 18.962V16.965ZM14.5 18.25V19H13.195C13.65 18.784 14.084 18.531 14.5 18.25ZM14.266 8.18798C14.06 8.34197 13.847 8.487 13.627 8.622C13.45 8.73098 13.268 8.83298 13.083 8.93002C12.884 9.03403 12.681 9.13102 12.474 9.22102C12.28 9.30502 12.084 9.384 11.885 9.45403C11.645 9.53902 11.4 9.61303 11.152 9.67805C10.976 9.72403 10.799 9.76706 10.62 9.80306C10.327 9.86208 10.03 9.90708 9.73106 9.93806C9.65405 9.94706 9.57708 9.94805 9.50006 9.95405V7.97705C11.31 7.84805 13.041 7.25405 14.5001 6.26906V8.00808C14.423 8.06902 14.345 8.12902 14.266 8.18798ZM9.50002 6.966V5.00002H14.5V5.02003C13.099 6.141 11.349 6.82102 9.50002 6.966ZM12 23C11.449 23 11 22.551 11 22H13C13 22.551 12.551 23 12 23ZM14 21H10C9.34805 21 8.79202 20.582 8.58502 20H15.415C15.208 20.582 14.652 21 14 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

Barbershop.displayName = "Barbershop";
