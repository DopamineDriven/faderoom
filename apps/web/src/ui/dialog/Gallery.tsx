"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryButton } from "@/ui/dialog/GalleryButton";

// This would typically come from a database or API
const images = [
  { id: 1, src: "/globe.svg?height=600&width=800", alt: "Image 1" },
  { id: 2, src: "/next.svg?height=600&width=800", alt: "Image 2" },
  { id: 3, src: "/vercel.svg?height=600&width=800", alt: "Image 3" },
  { id: 4, src: "/file.svg?height=400&width=600", alt: "Image 4" },
  { id: 5, src: "/window.svg?height=400&width=600", alt: "Image 5" }
];

export default function GalleryPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Image Gallery</h1>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map(image => (
              <div
                key={image.id}
                className="min-w-0 flex-[0_0_100%] p-2 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]">
                <Link href={`/image/${image.id}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="rounded-lg transition-opacity hover:opacity-80"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <GalleryButton
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 transform"
          onClick={scrollPrev}>
          <ChevronLeft className="h-4 w-4" />
        </GalleryButton>
        <GalleryButton
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          onClick={scrollNext}>
          <ChevronRight className="h-4 w-4" />
        </GalleryButton>
      </div>
      <div className="mt-4 flex justify-center">
        {images.map((_, index) => (
          <GalleryButton
            key={index}
            variant="outline"
            size="sm"
            className={`mx-1 ${
              index === selectedIndex
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}>
            {index + 1}
          </GalleryButton>
        ))}
      </div>
    </div>
  );
}
