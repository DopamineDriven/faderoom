import type { TsxExclude } from "@/types/helpers";

export function ChevronUp({
  ...props
}: TsxExclude<"svg", "viewBox" | "xmlns">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414"
        clipRule="evenodd"
      />
    </svg>
  );
}

ChevronUp.displayName = "ChevronUp";
