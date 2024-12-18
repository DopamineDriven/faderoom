import { Clock } from "lucide-react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";
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
        <CardTitle className="flex items-center text-lg font-bold text-[hsl(46,58%,63%)] sm:text-xl md:text-2xl">
          <Clock className="mr-2" /> Business Hours
        </CardTitle>
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
// export function BusinessHours() {
//   return (
//     <Card className="w-full bg-zinc-900 text-zinc-100 border-cta-border font-basis-grotesque-pro-medium">
//       <CardHeader>
//         <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(46,58%,63%)] flex items-center">
//           <Clock className="h-6 w-6" />
//           <span className="font-basis-grotesque-pro-medium">
//             Business Hours
//           </span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}>
//           <Table>
//             <TableHeader>
//               <TableRow className="border-b-zinc-800 hover:bg-transparent">
//                 <TableHead className="font-basis-grotesque-pro-medium text-lg font-normal text-fr-300">
//                   DAY
//                 </TableHead>
//                 <TableHead className="font-basis-grotesque-pro-medium text-lg font-normal text-fr-300">
//                   OPEN
//                 </TableHead>
//                 <TableHead className="font-basis-grotesque-pro-medium text-lg font-normal text-fr-300">
//                   CLOSE
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {BUSINESS_HOURS.map((hours, index) => (
//                 <motion.tr
//                   key={hours.day}
//                   className={cn(
//                     "border-b border-zinc-800 transition-colors last:border-b-0 hover:bg-zinc-800/50",
//                     index % 2 === 1 ? "bg-zinc-900/50" : "bg-transparent"
//                   )}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: 0.1 * index }}>
//                   <TableCell className="text-base font-normal text-zinc-100">
//                     {hours.day}
//                   </TableCell>
//                   <TableCell className="text-base font-normal text-fr-300">
//                     {hours.open}
//                   </TableCell>
//                   <TableCell className="text-base font-normal text-fr-300">
//                     {hours.close}
//                   </TableCell>
//                 </motion.tr>
//               ))}
//             </TableBody>
//           </Table>
//         </motion.div>
//       </CardContent>
//     </Card>
//   );
// }
