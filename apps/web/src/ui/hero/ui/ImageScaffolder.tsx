"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { InferIt } from "@/types/next";

const ImageScaffolder = ({
  src,
  alt,
  width = 176,
  height = 264,
  className,
  ...rest
}: InferIt<typeof import("next/image").default, "P">["0"]) => {
  return (
    <div className="relative">
      <Image
        {...rest}
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
};

ImageScaffolder.displayName = "ImageScaffolder";

export { ImageScaffolder };
