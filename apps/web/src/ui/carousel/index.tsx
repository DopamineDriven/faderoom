"use client";

import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { SwipeGesture } from "./SwipeGesture";
import { Thumbnail } from "./Thumbnail";
import { motion, AnimatePresence, useInView } from 'motion/react';

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
      <div className="mx-auto px-4 py-6">
        <div
          ref={inViewDivRef}
          className="mx-auto max-w-5xl"
          onFocus={handleGalleryFocus}
          tabIndex={0}>
          <div className="relative mb-4">
            <div className="overflow-hidden rounded-lg aspect-[4/3]" ref={mainRef}>
              <div className="flex h-full">
                {imageData.data.map((image, index) => (
                  <div key={image.id} className="relative flex-[0_0_100%] h-full">
                    <AnimatePresence initial={false} custom={direction}>
                      {index === selectedIndex && (
                        <motion.div
                          key={image.id}
                          custom={direction}
                          initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction > 0 ? '-100%' : '100%' }}
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                          }}
                          className="absolute inset-0"
                        >
                          <Link
                            href={`/photos/${image.id}`}
                            scroll={false}
                            className="block w-full h-full"
                          >
                            <Image
                              src={image.url}
                              alt={image.relative_path}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
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
              className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 flex"
              onClick={scrollPrev}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75 flex"
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
          {isInView && hasInteracted === false && (
            <div
              className={cn(
                "relative my-auto -mt-4 h-12",
                showSwipeAnimation === true ? "" : "hidden"
              )}>
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

