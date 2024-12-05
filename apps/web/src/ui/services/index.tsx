import {
  BeakerIcon as Beard,
  Coffee,
  Scissors,
  SprayCanIcon as Spray
} from "lucide-react";
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
    description: "Expert styling tailored to your unique look",
    price: "$30+"
  },
  {
    icon: Beard,
    name: "Beard Trim & Shape",
    description: "Sculpt and maintain your facial hair",
    price: "$20+"
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
];

export function ServicesSection() {
  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-fr-300">
        Our Services
      </h2>
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
            <p className="mt-2 font-semibold text-fr-300">{service.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
