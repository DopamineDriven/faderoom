"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/ui/reviews-paginated/ui/Avatar";
import { Card, CardContent } from "@/ui/reviews-paginated/ui/Card";
import { ReviewContent } from "@/ui/reviews-paginated/ui/ReviewContent";
import { dateFormatter } from "@/utils/date-formatter";

export type OwnerResponseProps = {
  staff: string;
  content: string;
  date: number;
};

export function OwnerResponse({ content, date, staff }: OwnerResponseProps) {
  const lastInitial = staff.split(" ")?.[1]?.substring(0, 1)?.concat(".") ?? "";
  const first = staff.split(" ")?.[0] ?? "";

  return (
    <Card className="mt-4 rounded-none border-l-2 border-transparent border-l-[hsl(46,58%,63%)] bg-transparent pl-2 sm:pl-4">
      <CardContent className="p-2 sm:p-4">
        <div className="mb-2 flex items-center">
          <Avatar className="mr-2 h-8 w-8 flex-shrink-0 sm:mr-4 sm:h-10 sm:w-10">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff}&backgroundColor=d7be69&textColor=1a1d1e`}
              alt="The Fade Room"
            />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[hsl(46,58%,63%)] sm:text-base">{`${first} ${lastInitial}`}</p>
                <span className="text-xs text-zinc-400 sm:text-sm">
                  {dateFormatter(date).iso8601DateOnly}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ReviewContent content={content} />
      </CardContent>
    </Card>
  );
}
