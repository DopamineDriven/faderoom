import * as React from "react"

import { cn } from "@/lib/utils"

const CtaCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm",
      className
    )}
    {...props}
  />
))
CtaCard.displayName = "CtaCard"

const CtaCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CtaCardHeader.displayName = "CtaCardHeader"

const CtaCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-fr-300",
      className
    )}
    {...props}
  />
))
CtaCardTitle.displayName = "CtaCardTitle"

const CtaCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-zinc-400", className)}
    {...props}
  />
))
CtaCardDescription.displayName = "CtaCardDescription"

const CtaCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CtaCardContent.displayName = "CtaCardContent"

const CtaCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CtaCardFooter.displayName = "CtaCardFooter"

export { CtaCard, CtaCardHeader, CtaCardFooter, CtaCardTitle, CtaCardDescription, CtaCardContent }

