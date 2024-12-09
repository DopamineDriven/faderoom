import {
  BeakerIcon as Beard,
  Medal as HerosIcon,
  Scissors,
  SprayCanIcon as Spray,
  Stars,
  Target
} from "lucide-react";
import { Abc } from "@/ui/icons/Abc";
import { Barbershop } from "@/ui/icons/Barbershop";
import { Facial } from "@/ui/icons/Facial";
import { Razor } from "@/ui/icons/Razor";
import { Towel } from "@/ui/icons/Towel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/ui/services/ui/Accordion";

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
    name: "Kids Cut (11 & under)",
    description:
      "Haircut, edge up & neck cleaning with trimmers; hot towel with shampoo; blow dry & style",
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
    name: "Haircut & Shave (Beard Trim & Lineup)",
    description:
      "Haircut; straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; straight razor shave or beard cleanup/lineup",
    price: "$75"
  },
  {
    icon: Beard,
    name: "Haircut & Basic Beard Trim",
    description:
      "Haircut; straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; beard cleanup/lineup with electric shaver",
    price: "$65"
  },
  {
    icon: Razor,
    name: "Shave or Beard Trim & Lineup",
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

export function ServicesSection() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-fr-300">Services</h2>
        <p className="text-zinc-400">Popular</p>
      </div>
      <div
        className="overflow-y-auto pr-4"
        style={{ maxHeight: "calc(100vh - 200px)" }}>
        <Accordion type="single" collapsible className="w-full">
          {services.map((service, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <service.icon className="h-6 w-6 text-fr-300" />
                    <span className="font-semibold text-fr-300">
                      {service.name}
                    </span>
                  </div>
                  <span className="font-semibold text-fr-300">
                    {service.price}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mt-2 text-zinc-400">{service.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
