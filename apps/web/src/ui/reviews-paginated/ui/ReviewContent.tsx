"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export function ReviewContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  function refCb(props: HTMLDivElement | null) {
    props = ref.current;
    if (!props) {
      return;
    } else {
      console.log(
        "innerHeight: ".concat(
          props.getBoundingClientRect().height.toString(10)
        )
      );
    }
  }
  return (
    <>
      <div className="hidden md:visible" ref={refCb}>
        <p
          className={`md:text-zinc-100 ${isExpanded ? "" : "md:line-clamp-3"}`}>
          {content}
        </p>
        {content.length > 150 && (
          <Button
            variant="ghost"
            size="sm"
            className="md:mt-2 md:text-[#C5A572] md:hover:bg-zinc-800 md:hover:text-[#C5A572]"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                Show less <ChevronUp className="md:ml-2 md:h-4 md:w-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="md:ml-2 md:h-4 md:w-4" />
              </>
            )}
          </Button>
        )}
      </div>{" "}
      <div className="visible md:hidden" ref={refCb}>
        <p className={`text-zinc-100 ${isExpanded ? "" : "line-clamp-3"}`}>
          {content}
        </p>
        {content.length > 120 && (
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
    </>
  );
}
