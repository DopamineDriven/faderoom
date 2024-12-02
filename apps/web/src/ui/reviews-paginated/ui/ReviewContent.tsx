"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export function ReviewContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p className={`text-zinc-100 ${isExpanded ? "" : "line-clamp-3"}`}>
        {content}
      </p>
      {content.length > 150 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-[#C5A572] hover:bg-zinc-800 hover:text-[#C5A572]"
          onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
