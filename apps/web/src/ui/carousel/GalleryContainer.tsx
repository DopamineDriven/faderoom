"use client";

import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { Camera } from "lucide-react";
import {
  GalleryContainerCard,
  GalleryContainerCardContent,
  GalleryContainerCardHeader,
  GalleryContainerCardTitle
} from "@/ui/carousel/GalleryContainerCard";

export const GalleryContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GalleryContainerCard className="border-cta-border w-full overflow-hidden bg-zinc-800/50 bg-opacity-50 text-zinc-100">
      <GalleryContainerCardHeader className="">
        <Link
          className="appearance-none scroll-smooth"
          href="/#gallery"
          id="gallery">
          <GalleryContainerCardTitle className="flex items-center text-2xl font-bold text-[hsl(46,58%,63%)] sm:text-3xl">
            <Camera className="mr-2" /> Gallery
          </GalleryContainerCardTitle>
        </Link>
      </GalleryContainerCardHeader>
      <GalleryContainerCardContent className="p-0">
        {children}
      </GalleryContainerCardContent>
    </GalleryContainerCard>
  );
};
