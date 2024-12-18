"use client";

import { useGoogleMapsScript } from "@/ui/hooks/useGoogleMapsScript";
import { LocationMap } from "@/ui/map/LocationMap";

export function GoogleMap() {
  const { isLoaded } = useGoogleMapsScript();
  return (
    <div className="mx-auto w-full">
      {isLoaded && <LocationMap />}
    </div>
  );
}
