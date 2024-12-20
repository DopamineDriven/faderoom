"use client";

import type { Variants } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  BeakerIcon as Beard,
  ChevronDown,
  Medal as HerosIcon,
  Scissors,
  SprayCanIcon as Spray,
  Stars,
  Target
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Unenumerate } from "@/types/helpers";
import { cn } from "@/lib/utils";
import { usePreventInnerScroll } from "@/ui/hooks/usePreventInnerScroll";
import { Abc } from "@/ui/icons/Abc";
import { Barbershop } from "@/ui/icons/Barbershop";
import { Chameleon } from "@/ui/icons/Chameleon";
import { Ear } from "@/ui/icons/Ear";
import { Eyebrow } from "@/ui/icons/Eyebrow";
import { Facial } from "@/ui/icons/Facial";
import { Nose } from "@/ui/icons/Nose";
import { Razor } from "@/ui/icons/Razor";
import { Towel } from "@/ui/icons/Towel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/ui/reviews-paginated/ui/Card";

const services = [
  {
    icon: Target,
    name: "Precision Haircut",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
    price: "$45"
  },
  {
    icon: Abc,
    name: "Kids Cut",
    description:
      "Haircut, edge up & neck cleaning with trimmers; hot towel with shampoo; blow dry & style (ages 11 and under)",
    price: "$40"
  },
  {
    icon: Barbershop,
    name: "Senior Cut",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
    price: "$40"
  },
  {
    icon: HerosIcon,
    name: "Hero Cut",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style (military/police/firefighters/EMTs only)",
    price: "$40"
  },
  {
    icon: Razor,
    name: "Haircut & Shave",
    description:
      "Haircut (Beard Trim & Lineup); straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; straight razor shave or beard cleanup/lineup",
    price: "$75"
  },
  {
    icon: Scissors,
    name: "Haircut & Basic Beard Trim",
    description:
      "Haircut; straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; beard cleanup/lineup with electric shaver",
    price: "$65"
  },
  {
    icon: Towel,
    name: "Shave & Mini Facial",
    description:
      "Clean straight razor shave or beard cleanup with lineup; hot towel & mini facial",
    price: "$45"
  },
  {
    icon: Beard,
    name: "Basic Beard Trim",
    description: "Beard cleanup & edge up with trimmers (no straight blade)",
    price: "$35"
  },
  {
    icon: Stars,
    name: "Presidential Package",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; hot steam shave or beard cleanup/lineup; black mask pore cleaner; facial",
    price: "$125"
  },
  {
    icon: Facial,
    name: "Facial",
    description:
      "Relaxing hot towel facial massage; mud scrub; black mask pore cleaning",
    price: "$35"
  },
  {
    icon: Chameleon,
    name: "Gray Camouflage",
    description:
      "Not such a drastic change will still have some gray blended with the color gradually ",
    price: "$35"
  },
  {
    icon: Spray,
    name: "Permanent Hair Color ",
    description: "A vibrant, long-lasting full color treatment",
    price: "$45"
  },
  {
    icon: Eyebrow,
    name: "Eyebrow Wax",
    description: "Shaping, trimming, & waxing of eyebrows",
    price: "$16"
  },
  {
    icon: Nose,
    name: "Nose Wax",
    description: "Waxing of hair within the nostrils",
    price: "$10"
  },
  {
    icon: Ear,
    name: "Ear Wax",
    description: "Waxing of hair all around the ear",
    price: "$10"
  }
] as const;

interface AccordionProps {
  service: Unenumerate<typeof services>;
  index: number;
  expanded: false | number;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
}

const Accordion: React.FC<AccordionProps> = ({
  service,
  index,
  expanded,
  setExpanded
}) => {
  const isOpen = index === expanded;
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && accordionRef.current) {
      setTimeout(() => {
        accordionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }
  }, [isOpen]);

  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  } satisfies Variants;

  const iconVariants = {
    open: {
      rotate: 180,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    closed: {
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } satisfies Variants;

  return (
    <div
      ref={accordionRef}
      className="border-b border-zinc-700 transition-colors duration-200 hover:bg-zinc-800/50">
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isOpen ? "rgba(24, 24, 27, 0.5)" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setExpanded(isOpen ? false : index)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-4 sm:px-6">
        <div className="font-basis-font-basis-grotesque-pro-medium flex items-center gap-4">
          <service.icon className="h-6 w-6 text-[hsl(46,58%,63%)] sm:h-7 sm:w-7" />
          <span className="text-sm font-semibold text-[hsl(46,80%,70%)] sm:text-base">
            {service.name}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm font-semibold text-[hsl(46,40%,60%)] sm:text-base">
            {service.price}
          </span>
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={iconVariants}>
            <ChevronDown className="h-4 w-4 shrink-0 text-fr-300" />
          </motion.div>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={accordionVariants}>
            <div className="px-4 pb-4 pt-2 sm:px-6">
              <p className="text-sm text-zinc-300 sm:text-base">
                {service.description}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  usePreventInnerScroll(scrollContainerRef);
  const [expanded, setExpanded] = useState<false | number>(false);

  return (
    <Card
      className={cn(
        `border-cta-border bg-gradient-to-br from-zinc-900 to-zinc-800`,
        className
      )}
      ref={ref}
      {...props}>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <Scissors className="h-6 w-6 text-[hsl(46,58%,63%)]" />
          <CardTitle className="text-2xl font-bold text-[hsl(46,58%,63%)] sm:text-3xl">
            Our Services
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0 sm:max-h-[800px]">
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto pb-5"
          style={{ maxHeight: "calc(100vh - 200px)" }}>
          {services.map((service, index) => (
            <Accordion
              key={index}
              service={service}
              index={index}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

ServicesSection.displayName = "ServicesSection";

export { ServicesSection };
