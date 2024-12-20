"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { MapButton } from "@/ui/map/MapButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/map/ui/Card";
import "./map-styles.css";
import { BusinessHours } from "./BusinessHours";
import { svgFadeString } from "./FadeSvgString";

// TODO https://developers.google.com/maps/documentation/javascript/load-maps-js-api#migrate-to-dynamic

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );
  const [isInfoWindowVisible, setIsInfoWindowVisible] = useState(true);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    if (typeof window.google !== "undefined" && mapRef.current && !map) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 42.1572639, lng: -87.8041281 },
        zoom: 15,
        mapId: "2959b320759c0047"
      });

      const contentString = `
      <div class="info-window-content">
        <button class="info-window-close" aria-label="Close info window">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <h2 class="info-window-title">The Fade Room</h2>
        <p class="info-window-address">229 Skokie Valley Rd suite 5,<br/>Highland Park, IL 60035</p>
        <div class="info-window-rating">
          <span class="rating-score">4.8</span>
          <div class="rating-stars">★★★★★</div>
          <a href="https://www.google.com/maps/place/The+Fade+Room+Inc/@42.1572639,-87.8041281,15z/reviews"
             class="review-link" target="_blank">
            41 reviews
          </a>
        </div>
        <a href="https://www.google.com/maps/place/The+Fade+Room+Inc/@42.1572639,-87.8041281,15z"
           class="view-map-link" target="_blank">
          View larger map
        </a>
      </div>
    `;

      const infoWindowInstance = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "The Fade Room",
        maxWidth: 300,
        pixelOffset: new google.maps.Size(0, -5)
      });

      google.maps.event.addListenerOnce(infoWindowInstance, "domready", () => {
        const closeButton = document.querySelector(".info-window-close");
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            setIsInfoWindowVisible(false);
            infoWindowInstance.close();
          });
        }
      });

      const places = new google.maps.places.PlacesService(mapInstance);

      places.getDetails(
        {
          placeId: "ChIJWR1tbabBD4gRrUSmN1K2TPw",
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "rating",
            "user_ratings_total"
          ]
        },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const pinElement = document.createElement("div");

            pinElement.innerHTML = svgFadeString({
              className: "w-6 h-6 z-10",
              width: 24,
              height: 24
            });

            const pinEle = new google.maps.marker.PinElement({
              background: "#242424",
              borderColor: "#d7be69",
              glyphColor: "#1a1a1b",
              scale: 1,
              glyph: pinElement
            });

            // Create the advanced marker
            const marker = new google.maps.marker.AdvancedMarkerElement({
              map: mapInstance,
              position: place.geometry.location,
              collisionBehavior:
                google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
              title: "The Fade Room Inc.",
              content: pinEle.element
            });

            // Set the marker position
            setMarkerPosition(place.geometry.location);

            infoWindowInstance.open({
              anchor: marker,
              map: mapInstance,
              // prevents side-effect panning on infoWindow toggle (show/hide)
              shouldFocus: false
            });

            marker.addEventListener("gmp-click", () => {
              if (
                !isInfoWindowVisible &&
                infoWindowInstance &&
                markerPosition
              ) {
                infoWindowInstance.setPosition(markerPosition);
                infoWindowInstance.open({
                  map: mapInstance,
                  shouldFocus: false
                });
                setIsInfoWindowVisible(true);
              }
            });

            mapInstance.setCenter(place.geometry.location);
            setInfoWindow(infoWindowInstance);
            setMap(mapInstance);
          }
        }
      );
    }
  }, [map, isInfoWindowVisible, markerPosition]);

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

      /** apple maps unique id (auid) for The Fade Room @url https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html */
      const auid = `14932589762649227325`;
      const appleMapsUrl = `maps://maps.apple.com/?auid=${auid}`;

      /**  google maps @url https://developers.google.com/maps/documentation/urls/get-started#directions-action */
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

  const handleInfoClick = () => {
    if (infoWindow && map && markerPosition) {
      infoWindow.setPosition(markerPosition);
      infoWindow.open({
        map,
        shouldFocus: false
      });
      setIsInfoWindowVisible(true);
    }
  };
  google.maps.importLibrary;
  return (
    <div className="space-y-4 sm:space-y-8" id="contact-us">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-2 mx-auto">
        <Card className="flex h-[500px] sm:h-[600px] flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl font-bold text-fr-300 sm:text-2xl">
              <MapPin className="mr-2 h-6 w-6" /> Find Us
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 flex flex-grow flex-col">
            <motion.div
              className="relative mb-2 sm:mb-4 flex-grow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <div
                ref={mapRef}
                className="absolute inset-0 overflow-hidden rounded-lg shadow-lg touch-pan-x touch-pan-y"
              />
              {!isInfoWindowVisible && (
                <motion.button
                  onClick={handleInfoClick}
                  className="absolute bottom-4 left-4 z-10 rounded-full bg-fr-300 p-2 shadow-md transition-colors hover:bg-fr-300/90"
                  aria-label="Show info window"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-black">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </motion.button>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              <MapButton
                variant="default"
                onClick={handleGetDirections}
                className="get-directions-button mt-auto inline-flex w-full items-center justify-center rounded-md border border-fr-300/20 bg-fr-300 text-black transition-colors hover:bg-fr-300/90">
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </MapButton>
            </motion.div>
          </CardContent>
        </Card>
        <BusinessHours />
      </div>
    </div>
  );
}

/* <address className="mt-4 text-center font-basis-grotesque-pro-medium-italic not-italic text-zinc-300">
  229 Skokie Valley Rd suite 5, Highland Park, IL 60035
</address> */
