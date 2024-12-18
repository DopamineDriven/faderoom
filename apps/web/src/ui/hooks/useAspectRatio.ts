"use client";

import { useEffect, useRef, useState } from "react";

export function useAspectRatioLimit(minRatio = 0.5) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRatioExceeded, setIsRatioExceeded] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const checkAspectRatio = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;

        const currentRatio = offsetWidth / offsetHeight;

        console.log(`[calculated-aspect-ratio]: ${offsetWidth / offsetHeight}`);
        setWidth(offsetWidth);
        setHeight(offsetHeight);
        setIsRatioExceeded(currentRatio < minRatio);
      }
    };

    checkAspectRatio();

    window.addEventListener("resize", checkAspectRatio);

    return () => {
      window.removeEventListener("resize", checkAspectRatio);
    };
  }, [minRatio]);

  return { containerRef, isRatioExceeded, width, height };
}
