"use client";

import { useCallback, useEffect, useState } from "react";

export function useInnerDimensions<const T extends HTMLParagraphElement | null>(
  container: T
) {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const trackInnerHeight = useCallback(() => {
    if (!container) {
      return;
    }
    setInnerHeight(container.clientHeight);
    setInnerWidth(container.clientWidth);
  }, [container]);

  /** This callback is a useEffect dependency and is invoked whenever inner text is loaded */
  useEffect(() => {
    if (!container) {
      return;
    }

    window.addEventListener("DOMContentLoaded", trackInnerHeight, {
      passive: true
    });

    trackInnerHeight();

    return () => {
      window.removeEventListener("DOMContentLoaded", trackInnerHeight);
    };
  }, [container, trackInnerHeight]);

  return { innerHeight, innerWidth };
}
