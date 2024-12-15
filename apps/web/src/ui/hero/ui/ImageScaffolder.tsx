"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ImageScaffolder = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ src, alt, width = 176, height = 264, className, ...rest }, ref) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <Image
          {...rest}
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "aspect-[2/3] w-full rounded-xl bg-zinc-800/5 object-cover shadow-lg transition-all duration-300",
            className
          )}
        />
        <motion.div
          className="absolute inset-0 rounded-xl bg-black"
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10" />
    </motion.div>
  );
});

ImageScaffolder.displayName = "ImageScaffolder";

export default ImageScaffolder;