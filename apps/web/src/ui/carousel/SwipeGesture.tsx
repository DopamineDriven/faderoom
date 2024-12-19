import type { FC } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { HandIcon } from "@/ui/icons/HandIcon";

export interface SwipeGestureProps {
  isActive: boolean;
}

export const SwipeGesture: FC<SwipeGestureProps> = ({ isActive }) => {
  return (
    <div className="relative h-12 w-full">
      <motion.div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 text-gray-200",
          isActive ? "opacity-100" : "opacity-0"
        )}
        initial={{ x: 20, opacity: 0 }}
        animate={
          isActive
            ? {
                x: [null, 0, -20, 0],
                opacity: [null, 1, 1, 0]
              }
            : { x: 0, opacity: 0 }
        }
        transition={{
          duration: 2,
          times: [0, 0.2, 0.8, 1],
          repeat: isActive ? Infinity : 0,
          repeatDelay: 0.25
        }}>
        <HandIcon className="h-6 w-6 sm:h-8 sm:w-8" />
      </motion.div>
      <span className="sr-only">Swipe to navigate</span>
    </div>
  );
};

SwipeGesture.displayName = "SwipeGesture";
