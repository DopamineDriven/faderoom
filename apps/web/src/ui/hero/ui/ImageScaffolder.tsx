"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ImageScaffolder = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ src, alt, width = 176, height = 264, className, ...rest }, ref) => {
  return (
    <div className="relative">
      <Image
        {...rest}
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "aspect-[2/3] w-full rounded-xl bg-zinc-800/5 object-cover shadow-lg grayscale filter transition-all duration-300 hover:grayscale-0",
          className
        )}
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
    </div>
  );
});

ImageScaffolder.displayName = "ImageScaffolder";

export { ImageScaffolder };
