import { Clock } from "lucide-react";
import {
  CtaCard,
  CtaCardContent,
  CtaCardHeader,
  CtaCardTitle
} from "@/ui/cta/ui/CtaCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/ui/hours/ui/Table";

interface BusinessHour {
  day: string;
  open: string;
  close: string;
}

const businessHours: BusinessHour[] = [
  { day: "Monday", open: "Closed", close: "Closed" },
  { day: "Tuesday", open: "9:00 am", close: "5:00 pm" },
  { day: "Wednesday", open: "9:00 am", close: "7:00 pm" },
  { day: "Thursday", open: "9:00 am", close: "2:00 pm" },
  { day: "Friday", open: "8:00 am", close: "8:00 pm" },
  { day: "Saturday", open: "7:30 am", close: "5:00 pm" },
  { day: "Sunday", open: "Closed", close: "Closed" }
];

export function BusinessHours() {
  return (
    <CtaCard className="border-cta-border w-full bg-zinc-900 text-zinc-100">
      <CtaCardHeader>
        <CtaCardTitle className="flex items-center text-xl font-bold text-fr-300 sm:text-2xl">
          <Clock className="mr-2" /> Business Hours
        </CtaCardTitle>
      </CtaCardHeader>
      <CtaCardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800">
              <TableHead className="font-semibold text-fr-300">DAY</TableHead>
              <TableHead className="font-semibold text-fr-300">OPEN</TableHead>
              <TableHead className="font-semibold text-fr-300">CLOSE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessHours.map(schedule => (
              <TableRow
                key={schedule.day}
                className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50">
                <TableCell className="font-medium text-zinc-100">
                  {schedule.day}
                </TableCell>
                <TableCell className="text-fr-300">{schedule.open}</TableCell>
                <TableCell className="text-fr-300">{schedule.close}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CtaCardContent>
    </CtaCard>
  );
}

BusinessHours.displayName = "BusinessHours";
