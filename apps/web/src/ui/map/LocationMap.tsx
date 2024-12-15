"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "lucide-react";
import { MapButton } from "@/ui/map/MapButton";

// TODO https://developers.google.com/maps/documentation/javascript/load-maps-js-api#migrate-to-dynamic
export function LocationMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (typeof window.google !== "undefined" && mapRef.current && !map) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 42.1572639, lng: -87.8041281 },
        zoom: 15,
        mapId: "2959b320759c0047"
      });

      const places = new google.maps.places.PlacesService(mapInstance);

      places.getDetails(
        {
          placeId: "ChIJWR1tbabBD4gRrUSmN1K2TPw",
          fields: ["name", "formatted_address", "geometry"]
        },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            // create a pin
            const pinElement = document.createElement("div");
            pinElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-black">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            `;
            // Add animation
            // pinElement.style.opacity = '0';
            // pinElement.style.transform = 'translate(-50%, -100%) scale(0.8)';
            // pinElement.style.transition = 'opacity 0.3s, transform 0.3s';

            //  setTimeout(() => {
            //  pinElement.style.opacity = '1';
            // pinElement.style.transform = 'translate(-50%, -100%) scale(1)';
            //}, 100);

            const pinEle = new google.maps.marker.PinElement({
              background: "#d7be69",
              borderColor: "#242424",
              glyph: pinElement
            });

            // Create the advanced marker
            const marker = new google.maps.marker.AdvancedMarkerElement({
              map: mapInstance,
              position: place.geometry.location,
              title: "The Fade Room Inc.",
              content: pinEle.element
            });

            marker;

            mapInstance.setCenter(place.geometry.location);

            setMap(mapInstance);
          }
        }
      );
    }
  }, [map]);

  const handleGetDirections = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const button = document.querySelector(
      ".get-directions-button"
    )! as HTMLButtonElement;
    if (button) {
      button.innerHTML =
        '<span class="animate-spin mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg></span>Opening Maps...';

      const lat = 42.1572639;
      const lng = -87.8041281;
      const label = encodeURIComponent("The Fade Room Inc Highland Park IL");

      // apple maps unique id for The Fade Room
      // reference -> https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
      const auid = `14932589762649227325`;
      const appleMapsUrl = `maps://maps.apple.com/?auid=${auid}`;

      // google maps reference -> https://developers.google.com/maps/documentation/urls/get-started#directions-action
      const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}&query_place_id=ChIJWR1tbabBD4gRrUSmN1K2TPw`;

      const androidIntent = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;

      const openInNewTab = (url: string) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      };

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        openInNewTab(appleMapsUrl);
        setTimeout(() => openInNewTab(googleSearchUrl), 2000);
      } else if (/Android/i.test(navigator.userAgent)) {
        openInNewTab(androidIntent);
        setTimeout(() => openInNewTab(googleSearchUrl), 2000);
      } else {
        openInNewTab(googleSearchUrl);
      }

      setTimeout(() => {
        button.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M3 12h18M3 12l4-4m-4 4 4 4"/></svg>Get Directions';
      }, 3000);
    }
  };

  return (
    // <div className="mx-auto w-full max-w-6xl px-6 py-12">
    //   <div className="space-y-8">
    //     <h2 className="text-5xl font-normal text-[#C5A572]">Find Us</h2>
    <>
      <div
        ref={mapRef}
        className="w-full overflow-hidden rounded-lg border border-[#C5A572]/20"
      />
      <MapButton
        variant="default"
        onClick={handleGetDirections}
        className="get-directions-button inline-flex w-full items-center justify-center rounded-md bg-[#C5A572] text-black hover:bg-[#C5A572]/90">
        <Navigation className="mr-2 h-4 w-4" />
        Get Directions
      </MapButton>
    </>
    /* </div>
    </div> */
  );
}
