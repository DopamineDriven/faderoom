"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const GalleryContainerCard = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div> & {
    gradientDirection?: "bl" | "br" | "tl" | "tr";
  }
>(({ className, gradientDirection = "br", ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      `rounded-lg border border-zinc-800 bg-opacity-50 bg-gradient-to-${gradientDirection} from-zinc-900 to-zinc-800 text-zinc-100 shadow-lg`,
      className
    )}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    {...props}
  />
));

GalleryContainerCard.displayName = "GalleryContainerCard";

const GalleryContainerCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

GalleryContainerCardHeader.displayName = "GalleryContainerCardHeader";

const GalleryContainerCardTitle = React.forwardRef<
  React.ElementRef<typeof motion.h3>,
  React.ComponentPropsWithoutRef<typeof motion.h3>
>(({ className, ...props }, ref) => (
  <motion.h3
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    ref={ref}
    className={cn(
      "font-basis-grotesque-pro-medium text-xl font-semibold leading-none tracking-tight text-[hsl(46,58%,63%)] sm:text-2xl",
      className
    )}
    {...props}
  />
));

GalleryContainerCardTitle.displayName = "GalleryContainerCardTitle";

const GalleryContainerCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-zinc-400", className)} {...props} />
));

GalleryContainerCardDescription.displayName = "GalleryContainerCardDescription";

const GalleryContainerCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

GalleryContainerCardContent.displayName = "GalleryContainerCardContent";

const GalleryContainerCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

GalleryContainerCardFooter.displayName = "GalleryContainerCardFooter";

export {
  GalleryContainerCard,
  GalleryContainerCardHeader,
  GalleryContainerCardFooter,
  GalleryContainerCardTitle,
  GalleryContainerCardDescription,
  GalleryContainerCardContent
};
