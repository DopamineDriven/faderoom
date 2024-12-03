"use client";

import { dateFormatter } from "@/utils/date-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export type OwnerResponseProps = {
  staff: string;
  content: string;
  date: number;
};

export function OwnerResponse({ content, date, staff }: OwnerResponseProps) {
  return (
    <div className="mt-4 border-l-2 border-[#C5A572] pl-8">
      <div className="flex items-start">
        <Avatar className="mr-4">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff}&backgroundColor=d7be69&textColor=1a1d1e`}
            alt="The Fade Room"
          />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <p className="font-semibold text-[#C5A572]">The Fade Room</p>
            <span className="ml-2 text-sm text-zinc-400">
              {dateFormatter(date).ymd}
            </span>
          </div>
          <p className="mt-2 text-zinc-100">{content}</p>
        </div>
      </div>
    </div>
  );
}

OwnerResponse.displayName = "OwnerResponse";
