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
import { Facial } from "@/ui/icons/Facial";
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
    icon: Scissors,
    name: "Haircut & Shave",
    description:
      "Haircut (Beard Trim & Lineup); straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; straight razor shave or beard cleanup/lineup",
    price: "$75"
  },
  {
    icon: Razor,
    name: "Haircut & Basic Beard Trim",
    description:
      "Haircut; straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; beard cleanup/lineup with electric shaver",
    price: "$65"
  },
  {
    icon: Razor,
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
    icon: Spray,
    name: "Hair Coloring",
    description: "Vibrant, long-lasting color treatments",
    price: "$50+"
  },
  {
    icon: Towel,
    name: "Hot Towel Shave",
    description: "Relaxing traditional straight razor shave",
    price: "$35+"
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
      accordionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
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
          backgroundColor: isOpen ? "rgba(24, 24, 27, 0.5)" : "rgba(24, 24, 27, 0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setExpanded(isOpen ? false : index)}
        className="flex w-full cursor-pointer items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <service.icon className="h-6 w-6 text-[hsl(46,58%,63%)]" />
          <span className="font-semibold text-[hsl(46,80%,70%)]">
            {service.name}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 font-semibold text-[hsl(46,40%,60%)]">
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
            <div className="pb-4 pt-2">
              <p className="text-zinc-300">{service.description}</p>
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
      <CardHeader>
        <CardTitle className="mb-2 text-center text-2xl sm:text-3xl font-bold text-[hsl(46,58%,63%)]">
          Services
        </CardTitle>
        <p className="text-center text-zinc-400">Popular</p>
      </CardHeader>
      <CardContent className="flex max-h-[800px] flex-col">
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto pr-4"
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
