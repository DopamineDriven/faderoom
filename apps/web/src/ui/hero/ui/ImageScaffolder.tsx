"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ImageScaffolder = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
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

export default ImageScaffolder;
