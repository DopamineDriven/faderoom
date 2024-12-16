"use client";

import { MapPin } from "lucide-react";
import {
  CtaCard,
  CtaCardContent,
  CtaCardHeader,
  CtaCardTitle
} from "@/ui/cta/ui/CtaCard";
import { useGoogleMapsScript } from "@/ui/hooks/useGoogleMapsScript";
import { LocationMap } from "@/ui/map/LocationMap";

export function GoogleMap() {
  const { isLoaded } = useGoogleMapsScript();
  return (
    <CtaCard className="border-cta-border relative w-full bg-zinc-900 text-zinc-100">
      <CtaCardHeader>
        <CtaCardTitle className="flex items-center pb-5 text-xl font-bold text-fr-300 sm:pb-8 sm:text-2xl">
          <MapPin className="mr-2 h-7 w-7" /> Find Us
        </CtaCardTitle>
      </CtaCardHeader>
      <CtaCardContent>
        <div className="my-2 flex h-64 min-h-full w-full flex-row items-center justify-center space-y-2 rounded-lg pt-5">
          {isLoaded && <LocationMap />}
        </div>
      </CtaCardContent>
    </CtaCard>
  );
}

// const [isLoaded, setIsLoaded] = useState(false);

// useEffect(() => {
//   const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
//   const loadGoogleMapsScript = () => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,marker&mapIds=2959b320759c0047&v=beta`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => setIsLoaded(true);
//     document.body.appendChild(script);
//   };

//   loadGoogleMapsScript();

//   return () => {
//     const script = document.querySelector(
//       'script[src^="https://maps.googleapis.com/maps/api/js"]'
//     );
//     if (script) {
//       document.body.removeChild(script);
//     }
//   };
// }, []);
