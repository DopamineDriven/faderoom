import { useEffect, useState } from "react";

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (typeof window.DocumentTouch === "function" &&
            document instanceof window.DocumentTouch) ||
          (window.matchMedia && window.matchMedia("(any-hover: none)").matches)
      );
    };

    checkTouch();

    window.addEventListener("resize", checkTouch);

    return () => {
      window.removeEventListener("resize", checkTouch);
    };
  }, []);

  return isTouchDevice;
}
