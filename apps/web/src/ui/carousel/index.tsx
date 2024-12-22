"use client";

import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
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
  const [direction, setDirection] = useState(0);

  const isInView = useInView(inViewDivRef, { amount: "some", once: true });

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
      const currentIndex = mainApi.selectedScrollSnap();
      setDirection(currentIndex > selectedIndex ? 1 : -1);
      setSelectedIndex(currentIndex);
      updateThumbs(thumbsApi);
      thumbsApi.scrollTo(currentIndex);
    };

    mainApi.on("select", onSelect);
    thumbsApi.on("init", () => updateThumbs(thumbsApi));

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbsApi, updateThumbs, selectedIndex]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowSwipeAnimation(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleGalleryFocus = useCallback(() => {
    setHasInteracted(true);
    setShowSwipeAnimation(false);
  }, []);

  return (
    <div className="bg-transparent">
      <div className="mx-auto px-2 py-4 sm:px-4 sm:py-6">
        <div
          ref={inViewDivRef}
          className="mx-auto max-w-5xl"
          onFocus={handleGalleryFocus}
          tabIndex={0}>
          <div className="relative mb-2 sm:mb-4">
            <div
              className="aspect-[4/3] overflow-hidden rounded-lg"
              ref={mainRef}>
              <div className="flex h-full">
                {imageData.data.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative h-full flex-[0_0_100%]">
                    <AnimatePresence initial={false} custom={direction}>
                      {index === selectedIndex && (
                        <motion.div
                          key={image.id}
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: direction > 0 ? "100%" : "-100%"
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: direction > 0 ? "-100%" : "100%"
                          }}
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                          className="absolute inset-0">
                          <Link
                            href={`/photos/${image.id}`}
                            scroll={false}
                            className="block h-full w-full">
                            <Image
                              src={image.url}
                              alt={image.relative_path}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white sm:text-sm">
                              {index + 1} / {imageData.data.length}
                            </div>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            <button
              aria-label="Previous image"
              className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:left-4 sm:flex sm:h-10 sm:w-10"
              onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 sm:right-4 sm:flex sm:h-10 sm:w-10"
              onClick={scrollNext}>
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>
          <div className="overflow-hidden" ref={thumbsRef}>
            <div className="flex gap-1 sm:gap-2">
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
          <div className="relative mt-2">
            <AnimatePresence>
              {isInView && !hasInteracted && showSwipeAnimation ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: "auto" }}
                  transition={{ duration: 0.3 }}>
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-5">
                    <SwipeGesture isActive={true} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
