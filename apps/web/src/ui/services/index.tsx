import {
  BeakerIcon as Beard,
  Coffee,
  Medal as HerosIcon,
  Gift as PresidentialIcon,
  Scissors,
  SprayCanIcon as Spray
} from "lucide-react";
import { Towel } from "@/ui/icons/Towel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/ui/reviews-paginated/ui/Card";

const services = [
  {
    icon: Scissors,
    name: "Precision Haircut",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
    price: "$45+"
  },
  {
    icon: Scissors,
    name: "Kids Cut (11 & under)",
    description:
      "Haircut, edge up & neck cleaning with trimmers; hot towel with shampoo; blow dry & style",
    price: "$40"
  },
  {
    icon: Scissors,
    name: "Senior Cut",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
    price: "$40"
  },
  {
    icon: HerosIcon,
    name: "Hero Cut (military/police/firefighters/EMTs)",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style",
    price: "$40"
  },
  {
    icon: Beard,
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
    icon: Beard,
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
    icon: PresidentialIcon,
    name: "Presidential Package",
    description:
      "Haircut, straight razor edge up & neck cleaning; hot towel with shampoo; blow dry & style; hot steam shave or beard cleanup/lineup; black mask pore cleaner; facial",
    price: "$125"
  },
  {
    icon: Towel,
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
    icon: Coffee,
    name: "Hot Towel Shave",
    description: "Relaxing traditional straight razor shave",
    price: "$35+"
  }
] as const;

export function ServicesSection() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-3xl font-bold text-fr-300">Services</h2>
        <p className="text-zinc-400">Popular</p>
      </div>
      <div
        className="flex-grow overflow-y-auto pr-4"
        style={{ height: "calc(100vh - 300px)" }}>
        <div className="space-y-6">
          {services.map((service, index) => (
            <Card key={index} className="border-zinc-800 bg-zinc-900">
              <CardHeader className="flex flex-row items-center gap-4">
                <service.icon className="h-8 w-8 text-fr-300" />
                <div>
                  <CardTitle className="text-fr-300">{service.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{service.description}</p>
                <p className="mt-2 font-semibold text-fr-300">
                  {service.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
