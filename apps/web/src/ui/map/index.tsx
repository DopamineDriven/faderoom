"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  CtaCard,
  CtaCardContent,
  CtaCardHeader,
  CtaCardTitle
} from "@/ui/cta/ui/CtaCard";
import { LocationMap } from "@/ui/map/LocationMap";

export function GoogleMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,marker&mapIds=2959b320759c0047&v=beta`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      const script = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <CtaCard className="border-border w-full bg-zinc-900 text-zinc-100">
      <CtaCardHeader>
        <CtaCardTitle className="flex items-center text-xl font-bold text-fr-300 sm:text-2xl">
          <MapPin className="mr-2" /> Find Us
        </CtaCardTitle>
      </CtaCardHeader>
      <CtaCardContent>
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-zinc-800">
          {isLoaded && <LocationMap />}
        </div>
        <p className="mt-4 text-zinc-300">
          229 Skokie Valley Rd suite 5, Highland Park, IL 60035
        </p>
      </CtaCardContent>
    </CtaCard>
  );
}
