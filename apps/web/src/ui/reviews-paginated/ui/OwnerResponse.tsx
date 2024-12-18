"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/ui/reviews-paginated/ui/Avatar";
import { ReviewContent } from "@/ui/reviews-paginated/ui/ReviewContent";
import { dateFormatter } from "@/utils/date-formatter";

export type OwnerResponseProps = {
  staff: string;
  content: string;
  date: number;
};

export function OwnerResponse({ content, date, staff }: OwnerResponseProps) {
  const staffPrecise = (["Cinthia Sanchez", "Mauricio Flores"] as const).reduce(
    d => d
  );
  const handleStaff = (p: string) => {
    const pp = p as typeof staffPrecise;
    if (pp.includes(staffPrecise)) {
      if (pp === "Cinthia Sanchez") {
        return "Cinthia S.";
      } else return "Mauricio F.";
    } else return "The Fade Room";
  };
  return (
    <div className="mt-2 border-l-2 border-fr-300 pl-4 sm:mt-4 sm:pl-8">
      <div className="flex items-start">
        <Avatar className="mr-2 sm:mr-4">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff}&backgroundColor=d7be69&textColor=1a1d1e`}
            alt="The Fade Room"
          />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <p className="font-semibold text-fr-300 sm:text-sm text-xs">{handleStaff(staff)}</p>
            <span className="ml-2 text-zinc-400 sm:text-sm text-xs">
              {dateFormatter(date).ymd}
            </span>
          </div>
          <ReviewContent content={content} />
        </div>
      </div>
    </div>
  );
}

OwnerResponse.displayName = "OwnerResponse";
