"use client";

import { useCallback, useEffect, useState } from "react";

export function useContainerAtBottom<const T extends HTMLDivElement | null>(
  container: T
) {
  const [containerAtBottom, setContainerAtBottom] = useState(false);

  /** This callback is a useEffect dependency and is invoked whenever a user scrolls to track container position in real-time */
  const trackPosition = useCallback(() => {
    if (!container) {
      return;
    }
    setContainerAtBottom(
      window.scrollY + document.body.clientHeight >= container.scrollHeight
    );
  }, [container]);

  useEffect(() => {
    if (!container) {
      return;
    }

    window.addEventListener("scroll", trackPosition, { passive: true });

    trackPosition();

    return () => {
      window.removeEventListener("scroll", trackPosition);
    };
  }, [container, trackPosition]);

  return containerAtBottom;
}
