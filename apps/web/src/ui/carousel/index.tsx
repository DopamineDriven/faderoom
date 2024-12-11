"use client";

import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "motion/react";
import { SwipeGesture } from "@/ui/carousel/SwipeGesture";
import { Thumbnail } from "@/ui/carousel/Thumbnail";

export default function Carousel({
  imageData
}: {
  imageData: {
    data: {
      id: number;
      width: number;
      height: number;
      file_extension: string;
      relative_path: string;
      url: string;
    }[];
  };
}) {
  const [mainRef, mainApi] = useEmblaCarousel();

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSwipeAnimation, setShowSwipeAnimation] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [_thumbsSlidesToScroll, setThumbsSlidesToScroll] = useState(0);
  const inViewDivRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(inViewDivRef, { amount: "some" });

  const onThumbClick = useCallback(
    (index: number) => {
      setHasInteracted(true);
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi]
  );

  const scrollPrev = useCallback(() => {
    setHasInteracted(true);
    if (mainApi) mainApi.scrollPrev();
  }, [mainApi]);

  const scrollNext = useCallback(() => {
    setHasInteracted(true);
    if (mainApi) mainApi.scrollNext();
  }, [mainApi]);

  const updateThumbs = useCallback(
    (api: EmblaCarouselType) => {
      const engine = api.internalEngine();
      const scrollSnaps = engine.scrollSnapList;
      const thumbsSlidesToScroll =
        6 - Math.floor((selectedIndex / scrollSnaps.length) * 6) - 1;
      setThumbsSlidesToScroll(thumbsSlidesToScroll);
    },
    [selectedIndex]
  );

  useEffect(() => {
    if (!mainApi || !thumbsApi) return;

    const onSelect = () => {
      setSelectedIndex(mainApi.selectedScrollSnap());
      updateThumbs(thumbsApi);
      thumbsApi.scrollTo(mainApi.selectedScrollSnap());
    };

    mainApi.on("select", onSelect);
    thumbsApi.on("init", () => updateThumbs(thumbsApi));

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbsApi, updateThumbs]);

  useEffect(() => {
    console.log(`isInView=${isInView}`);
    if (isInView === false) {
      setShowSwipeAnimation(true);
      setHasInteracted(false);
    }
  }, [isInView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGalleryFocus = useCallback(() => {
    setHasInteracted(true);
    setShowSwipeAnimation(false);
  }, []);

  return (
    <div className="min-h-[75vh] bg-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <h2
          className="mb-8 text-center text-4xl font-bold text-fr-300 md:text-5xl"
          id="gallery">
          Gallery
        </h2>
        <div
          ref={inViewDivRef}
          className="mx-auto max-w-5xl"
          onFocus={handleGalleryFocus}
          tabIndex={0}>
          <div className="relative mb-4">
            <div className="overflow-hidden rounded-lg" ref={mainRef}>
              <div className="flex">
                {imageData.data.map((image, index) => (
                  <div key={image.id} className="min-w-0 flex-[0_0_100%]">
                    <Link
                      href={`/photos/${image.id}`}
                      scroll={false}
                      className="relative block aspect-[4/3]">
                      <Image
                        src={image.url}
                        alt={image.relative_path}
                        fill
                        // loading="lazy"
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                        {index + 1} / {imageData.data.length}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <button
              aria-label="Previous image"
              className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 md:flex"
              onClick={scrollPrev}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 md:flex"
              onClick={scrollNext}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-hidden" ref={thumbsRef}>
            <div className="flex gap-2">
              {imageData.data.map((image, index) => (
                <Thumbnail
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => onThumbClick(index)}
                  selected={selectedIndex === index}
                />
              ))}
            </div>
          </div>
          {isInView && (
            <div className="relative my-auto -mt-4 h-12">
              <div className="absolute left-1/2 -translate-x-1/2">
                <SwipeGesture isActive={showSwipeAnimation && !hasInteracted} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
