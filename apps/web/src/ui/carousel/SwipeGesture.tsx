import type { FC } from "react";
import { motion } from "motion/react";
import { HandIcon } from "@/ui/icons/HandIcon";

export interface SwipeGestureProps {
  isActive: boolean;
}

export const SwipeGesture: FC<SwipeGestureProps> = ({ isActive }) => {
  return (
    <div className="relative flex h-12 w-16 items-center justify-center rounded-full bg-transparent">
      <motion.div
        className="text-gray-200"
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
        <HandIcon className="h-6 w-6" />
      </motion.div>
      <span className="sr-only">Swipe to navigate</span>
    </div>
  );
};

SwipeGesture.displayName = "SwipeGesture";
