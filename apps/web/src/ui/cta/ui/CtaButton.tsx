import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rootClassName = {
  root: `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[hsl(20_14%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fr-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
};

const ctaVariants = {
  variant: {
    default: "bg-fr-300 text-[hsl(240_5.9%_10%)] hover:bg-fr-300/90",
    destructive:
      "bg-[hsl(0_62.8%_30.6%)] text-[hsl(0_0%_98%)] hover:bg-[hsl(0_62.8%_30.6%/0.9)]",
    outline:
      "border border-[hsl(240_3.7%_15.9%)] bg-[hsl(20_14%_4%)] hover:bg-[hsl(240_3.7%_15.9%)] hover:text-[hsl(0_0%_98%)]",
    secondary:
      "bg-[hsl(240_3.7%_15.9%)] text-[hsl(0_0%_98%)] hover:bg-[hsl(240_3.7%_15.9%/0.8)]",
    ghost: "hover:bg-[hsl(240_3.7%_15.9%)] hover:text-[hsl(0_0%_98%)]",
    link: "text-fr-300 underline-offset-4 hover:underline"
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  }
};

const ctaButtonVariants = cva(rootClassName.root, {
  variants: ctaVariants,
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {
  asChild?: boolean;
}

const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(ctaButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CtaButton.displayName = "CtaButton";

export { CtaButton, ctaButtonVariants };
