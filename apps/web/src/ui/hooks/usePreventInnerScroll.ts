"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

const SCROLL_RESET_DELAY = 3000; // 3 seconds

export function usePreventInnerScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startY: number | null = null;
    let startScrollTop: number | null = null;
    let isScrolling = false;
    let lastTouchTime = 0;
    let scrollResetTimeout: NodeJS.Timeout | null = null;

    const resetScrollState = () => {
      startY = null;
      startScrollTop = null;
      isScrolling = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.pageY ?? null;
      startScrollTop = element.scrollTop;
      isScrolling = false;
      lastTouchTime = Date.now();
      if (scrollResetTimeout) {
        clearTimeout(scrollResetTimeout);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null || startScrollTop === null) return;

      const currentY = e.touches[0]?.pageY;
      if (currentY === undefined) return;

      const deltaY = currentY - startY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTouchTime;

      // If the user has been touching for more than 100ms, allow scrolling
      if (timeDiff > 100) {
        isScrolling = true;
      }

      if (!isScrolling) {
        // Prevent scrolling for quick touches or if at the top/bottom of the container
        if (
          (element.scrollTop === 0 && deltaY > 0) ||
          (element.scrollHeight - element.scrollTop <= element.clientHeight &&
            deltaY < 0)
        ) {
          e.preventDefault();
        }
      } else {
        // Once scrolling has started, make it easier to continue scrolling
        if (Math.abs(deltaY) > 5) {
          e.preventDefault();
          element.scrollTop = startScrollTop - deltaY;
        }
      }

      lastTouchTime = currentTime;
    };

    const handleTouchEnd = () => {
      scrollResetTimeout = setTimeout(resetScrollState, SCROLL_RESET_DELAY);
    };

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      if (scrollResetTimeout) {
        clearTimeout(scrollResetTimeout);
      }
    };
  }, [ref]);
}
