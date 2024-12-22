import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/map/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/ui/map/ui/Table";

interface BusinessHoursProps {
  day: string;
  open: string;
  close: string;
}

const BUSINESS_HOURS = [
  { day: "Monday", open: "Closed", close: "Closed" },
  { day: "Tuesday", open: "9:00 am", close: "5:00 pm" },
  { day: "Wednesday", open: "9:00 am", close: "7:00 pm" },
  { day: "Thursday", open: "9:00 am", close: "2:00 pm" },
  { day: "Friday", open: "8:00 am", close: "8:00 pm" },
  { day: "Saturday", open: "6:30 am", close: "5:00 pm" },
  { day: "Sunday", open: "Closed", close: "Closed" }
] satisfies BusinessHoursProps[];

export function BusinessHours() {
  return (
    <Card className="border-cta-border w-full bg-zinc-900 font-basis-grotesque-pro-medium text-zinc-100">
      <CardHeader>
        <Link
          className="appearance-none scroll-smooth"
          href="/#hours"
          id="hours">
          <CardTitle className="flex items-center text-lg font-bold text-[hsl(46,58%,63%)] sm:text-xl md:text-2xl">
            <Clock className="mr-2" /> Business Hours
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-zinc-800">
                <TableHead className="text-xs font-semibold text-[hsl(46,58%,63%)] sm:text-sm">
                  DAY
                </TableHead>
                <TableHead className="text-xs font-semibold text-[hsl(46,58%,63%)] sm:text-sm">
                  OPEN
                </TableHead>
                <TableHead className="text-xs font-semibold text-[hsl(46,58%,63%)] sm:text-sm">
                  CLOSE
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BUSINESS_HOURS.map(schedule => (
                <TableRow
                  key={schedule.day}
                  className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50">
                  <TableCell className="p-2 text-xs font-medium text-zinc-100 sm:p-4 sm:text-sm">
                    {schedule.day}
                  </TableCell>
                  <TableCell className="p-2 text-xs text-[hsl(46,58%,63%)] sm:p-4 sm:text-sm">
                    {schedule.open}
                  </TableCell>
                  <TableCell className="p-2 text-xs text-[hsl(46,58%,63%)] sm:p-4 sm:text-sm">
                    {schedule.close}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
