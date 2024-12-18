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
    <Card className="mt-2 rounded-none border-l-2 border-transparent border-l-[hsl(46,58%,63%)] bg-transparent pl-2 sm:mt-4 sm:pl-4 lg:pl-6">
      <CardContent className="p-2">
        <div className="mb-2 flex items-start">
          <Avatar className="mr-2 flex-shrink-0 sm:mr-4">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff}&backgroundColor=d7be69&textColor=1a1d1e`}
              alt="The Fade Room"
            />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-[hsl(46,58%,63%)] sm:text-base">{`${first} ${lastInitial}`}</p>
                <span className="text-xsx ml-2 text-zinc-400 sm:text-sm">
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

OwnerResponse.displayName = "OwnerResponse";

/*

    <Card className="mt-4 pl-4 rounded-none bg-transparent border-transparent border-l-2 border-l-[hsl(46,58%,63%)]">
      <CardContent className="p-2">
        <div className="flex items-start mb-2">
          <Avatar className="mr-4 flex-shrink-0">
            <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=Mauricio Flores&backgroundColor=d7be69&textColor=1a1d1e" alt="The Fade Room" />
            <AvatarFallback>FR</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <p className="text-[hsl(46,58%,63%)] text-base font-semibold">The Fade Room</p>
                <span className="text-sm text-zinc-400">
                  {new Date(response.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ReviewContent content={response.content} />
      </CardContent>
    </Card>
*/
