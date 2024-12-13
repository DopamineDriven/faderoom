"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

export function usePreventInnerScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startY: number | null = null;
    let startScrollTop: number | null = null;
    let touchStartTime: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.pageY ?? null;
      startScrollTop = element.scrollTop;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null || startScrollTop === null || touchStartTime === null)
        return;

      const currentY = e.touches[0]?.pageY;
      if (currentY === undefined) return;

      const deltaY = currentY - startY;
      const touchDuration = Date.now() - touchStartTime;

      // If the touch duration is short and there's significant vertical movement,
      // assume the user is trying to scroll the page
      if (touchDuration < 100 && Math.abs(deltaY) > 10) {
        e.preventDefault();
        return;
      }

      if (
        (element.scrollTop === 0 && deltaY > 0) ||
        (element.scrollHeight - element.scrollTop <= element.clientHeight &&
          deltaY < 0)
      ) {
        e.preventDefault();
      }
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref]);
}
