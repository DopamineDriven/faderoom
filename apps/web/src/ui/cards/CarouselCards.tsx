"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { shimmer } from "@/lib/shimmer";
import { cn } from "@/lib/utils";
import { CarouselButton } from "@/ui/cards/CarouselButton";
import css from "./carousel-cards.module.css";
import Link from "next/link";

export function CarouselCards({imageData}: {imageData: {
  data: {
      id: number;
      width: number;
      height: number;
      file_extension: string;
      relative_path: string;
      url: string;
  }[];
}}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      loop: false
    },
    [ClassNames()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);



  return (
    <div className={cn("relative", css.embla)}>
      <div className={css.embla__viewport} ref={emblaRef}>
        <div className={cn(css.embla__container, "h-[75vh] sm:h-[30rem]")}>
          {imageData.data.map((img) => (
            <div
              key={img.id}
              className={cn(
                css.embla__slide,
                "embla__class-names relative isolate flex flex-col"
              )}>
                <Link href={`/photos/${img.id}`} passHref className="appearance-none">
              <Image
                alt={img.relative_path}
                src={img.url}
                width={img.width}
                height={img.height}
                placeholder="blur"
                blurDataURL={shimmer([img.width, img.height])}
                className="absolute inset-0 -z-10 h-full w-full object-cover group-hover:opacity-75"
                style={{ objectFit: "cover" }}
              />

              <h3
                className={cn(
                  "mt-3 font-basis-grotesque-pro-medium text-[1.25rem] font-semibold leading-[1.75rem] tracking-tight"
                )}>
                <span className="absolute -translate-y-20 translate-x-3 appearance-none">
                  <span className="z-[100] mx-1 my-2 bg-black/50 bg-clip-text text-white">
                    {img.id}
                  </span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />{" "}
                </span>
              </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <CarouselButton
        variant='outline'
        size='icon'
        className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full'
        onClick={scrollPrev}>
        <ChevronLeft className='h-4 w-4' />
        <span className='sr-only'>Previous slide</span>
      </CarouselButton>
      <CarouselButton
        variant='outline'
        size='icon'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full'
        onClick={scrollNext}>
        <ChevronRight className='h-4 w-4' />
        <span className='sr-only'>Next slide</span>
      </CarouselButton> */}
      <div className="mt-4 flex justify-center">
        {imageData.data.map((_, index) => (
          <CarouselButton
            key={index}
            variant="ghost"
            size="sm"
            className={`mx-1 h-2 w-2 rounded-full p-0 ${
              index === selectedIndex ? "bg-[#18181b]" : "bg-gray-300"
            }`}
            onClick={() => scrollTo(index)}>
            <span className="sr-only">Go to slide {index + 1}</span>
          </CarouselButton>
        ))}
      </div>
    </div>
  );
}
