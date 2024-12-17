import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div> & {
    gradientDirection?: "bl" | "br" | "tl" | "tr";
  }
>(({ className, gradientDirection = "bl", ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      `rounded-lg border border-border bg-gradient-to-${gradientDirection} from-zinc-900 to-zinc-800 text-zinc-100 shadow-lg`,
      className
    )}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
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
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-zinc-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};
