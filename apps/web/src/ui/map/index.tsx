"use client";

import { useGoogleMapsScript } from "@/ui/hooks/useGoogleMapsScript";
import { LocationMap } from "@/ui/map/LocationMap";

export function GoogleMap() {
  const { isLoaded } = useGoogleMapsScript();
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
      {isLoaded && <LocationMap />}
    </div>
  );
}
