import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { TsxTargeted } from "@/types/helpers";
import { cn } from "@/lib/utils";

const rootClassName = {
  default: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none
  focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4
  [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300`
};

const variants = {
  variant: {
    default:
      "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
    destructive:
      "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
    outline:
      "border border-neutral-200 text-neutral-900 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
    secondary:
      "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
    ghost:
      "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
    link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
    dcs: "mx-auto items-center justify-center border border-transparent text-[#243b53] bg-opacity-25 bg-white ring-2 ring-[#243b53] ring-inset hover:bg-[#d9e2ec] hover:text-[#102a43] z-50 transition-colors duration-150",
    dcs_dark:
      "mx-auto items-center justify-center border border-transparent text-[#f0f4f8] bg-transparent ring-white ring-2 ring-inset hover:bg-[#f0f4f8] hover:bg-opacity-75 hover:text-[#102a43] z-50 transition-colors duration-150"
  },
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
    dcs: "px-4 py-3 w-full sm:w-auto sm:px-8 rounded-full text-lg font-semibold shadow-sm"
  }
};

const buttonVariants = cva(rootClassName.default, {
  variants,
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export interface ParticleButtonProps
  extends TsxTargeted<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const ParticleButton = asChild ? Slot : "button";
    return (
      <ParticleButton
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ParticleButton.displayName = "ParticleButton";

export { ParticleButton, buttonVariants };
