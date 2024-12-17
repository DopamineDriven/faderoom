"use client";

import React from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import type { TsxExclude } from "@/types/helpers";
import { CtaButton } from "@/ui/cta/ui/CtaButton";
import { useToast } from "@/ui/hooks/useToast";
import { Facebook } from "@/ui/icons/Facebook";
import { Instagram } from "@/ui/icons/Instagram";
import { SquareUp } from "@/ui/icons/SquareUp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/ui/map/ui/Card";

interface PromoCode {
  code: string;
  discount: string;
  threshold: string;
}

interface SocialProps {
  icon: {
    ({
      ...svg
    }: TsxExclude<"svg", "fill" | "viewBox" | "xmlns">): React.JSX.Element;
    displayName: "Facebook" | "Instagram" | "SquareUp";
  };
  href: string;
}

const social = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/thefaderoominc/"
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/thefaderoomhighlandpark/?hl=en"
  },
  {
    icon: SquareUp,
    href: "https://squareup.com/gift/MLHZCDVC0MKB1/order"
  }
] as const satisfies readonly SocialProps[];

const OptimizedCTA = () => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const promoCodes = [
    { code: "FADEROOM10OFF", discount: "$10", threshold: "$60" },
    { code: "FADEROOM20OFF", discount: "$20", threshold: "$120" },
    { code: "FADEROOM30OFF", discount: "$30", threshold: "$180" }
  ] as const satisfies readonly PromoCode[];

  const copyToClipboard = (code: string) => {
    console.log("Copying code:", code);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCode(code);
        toast({
          title: "Code Copied!",
          description: `${code} has been copied to your clipboard.`
        });
        setTimeout(() => setCopiedCode(null), 3000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Copy failed",
          description: "Please try again.",
          variant: "destructive"
        });
      });
  };

  return (
    <Card className="border-cta-border mx-auto w-full max-w-3xl bg-zinc-900 p-2 font-basis-grotesque-pro-medium text-zinc-100 sm:p-4">
      <CardHeader className="mb-4 p-0">
        <div className="rounded-t-lg bg-fr-300 p-2 font-basis-grotesque-pro-bold font-bold tracking-tight text-zinc-900">
          <p className="text-center text-xs sm:text-sm">
            HAIRCUTS BY APPOINTMENT ONLY
          </p>
          <p className="text-center text-xs sm:text-sm">
            ANY SERVICE SCHEDULED BEFORE 7:30AM IS PRE-PAID
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="text-xl font-bold text-fr-300 sm:text-2xl">
          EXCLUSIVE OFFERS
        </CardTitle>
        <a
          href="https://squareup.com/gift/MLHZCDVC0MKB1/order"
          className="group relative inline-block"
          target="_blank"
          rel="noopener noreferrer">
          <motion.h2
            className="inline-flex items-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            initial="initial"
            whileHover="hover"
            animate="initial"
            exit="exit">
            <motion.span className="relative">
              Look Fresh For Less
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-fr-300"
                variants={{
                  initial: { width: 0 },
                  hover: { width: "100%" },
                  exit: { width: 0 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 100
                }}
                style={{ originX: 1 }}
              />
            </motion.span>
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 5 },
                exit: { x: 0 }
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 100
              }}>
              <ArrowUpRight className="inline-block h-7 w-7 text-fr-300 sm:h-9 sm:w-9" />
            </motion.span>
          </motion.h2>
        </a>
        <ul className="space-y-1 text-xs sm:space-y-2 sm:text-sm md:text-base lg:text-lg">
          {promoCodes.map(({ code, discount, threshold }) => (
            <li
              key={code}
              className="flex cursor-pointer items-center justify-between rounded-md p-1 transition-colors duration-200 hover:bg-zinc-800 sm:p-2"
              onClick={() => copyToClipboard(code)}>
              <span>
                Use code{" "}
                <span className="font-semibold text-fr-300">{code}</span> to
                save {discount} on {threshold}
              </span>
              <span className="text-fr-300">
                {copiedCode === code ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="font-basis-grotesque-pro-italic text-xxs text-zinc-400 sm:text-xs md:text-sm">
          Promo codes are valid for the current month
        </p>
      </CardContent>
      <CardFooter className="items-center justify-between">
        <div className="flex space-x-2 sm:space-x-4">
          {social.map(prop => (
            <a
              key={prop.icon.displayName}
              href={prop.href}
              target="_blank"
              className="text-fr-300 hover:text-[hsl(46,58%,73%)]"
              rel="noopener noreferrer">
              <prop.icon className="h-5 w-5 sm:h-7 sm:w-7" />
            </a>
          ))}
        </div>
        <a
          className="appearance-none"
          href="https://booksy.com/en-us/481001_the-fade-room_barber-shop_18688_highland-park"
          target="_blank"
          rel="noopener noreferrer">
          <CtaButton
            variant="default"
            className="bg-fr-300 text-xs text-zinc-900 hover:bg-[hsl(46,58%,73%)] sm:text-sm">
            Book Now
          </CtaButton>
        </a>
      </CardFooter>
    </Card>
  );
};

export default OptimizedCTA;

OptimizedCTA.displayName = "OptimizedCTA";
