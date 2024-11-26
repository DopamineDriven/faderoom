import { cn } from "@/lib/utils";
import styles from "./dots.module.css";

export function LoadingDots({ color = "#d7be69" }: { color?: string }) {
  return (
    <span className={cn(styles.loading, "inline-flex w-full mx-auto justify-center")}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
}
