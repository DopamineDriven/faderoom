"use client";

import type { Variants } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// import FrozenRouter from "./FrozenRouter";

export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <motion.div
        ref={overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto grid place-items-center bg-black/60 p-6"
        onClick={onClick}>
        <motion.div
          ref={wrapper}
          variants={
            {
              closed: {
                opacity: 0,
                "--tw-scale-x": 0.9,
                "--tw-scale-y": 0.9,
                "--tw-translate-y": "100px"
              },
              open: {
                opacity: 1,
                "--tw-scale-x": 1,
                "--tw-scale-y": 1,
                "--tw-translate-y": "0px"
              }
            } satisfies Variants
          }
          initial="closed"
          animate="open"
          exit="closed"
          className="w-full max-w-screen-sm transform bg-white p-6">
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
