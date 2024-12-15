import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rootClassName = {
  root: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
};

const variants = {
  variant: {
    default: "bg-fr-300 text-black hover:bg-[#C5A572]/90 text-lg",
    destructive:
      "bg-[hsl(0_62.8%_30.6%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_62.8%_30.6%/0.9)]",
    outline:
      "border border-[hsl(39_48%_61%)] hover:bg-[hsl(39_48%_61%)] hover:text-[hsl(0_0%_0%)]",
    secondary:
      "bg-[hsl(0_0%_9%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_0%_9%/0.8)]",
    ghost: "hover:bg-[hsl(39_48%_61%)] hover:text-[hsl(0_0%_0%)]",
    link: "underline-offset-4 hover:underline text-[hsl(39_48%_61%)]"
  },
  size: {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  }
};

const mapButtonVariants = cva(rootClassName, {
  variants,
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export interface MapButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mapButtonVariants> {
  asChild?: boolean;
}

const MapButton = React.forwardRef<HTMLButtonElement, MapButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(mapButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
MapButton.displayName = "MapButton";

export { MapButton, mapButtonVariants };
