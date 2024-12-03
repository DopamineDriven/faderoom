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
      {content.length > 175 && (
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

/*

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useInnerDimensions } from "@/lib/use-inner-dimensions";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export function ReviewContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);
  const r = useInnerDimensions(ref.current);
  const [innerH, setInnerH] = useState(0);

  const refCb = useCallback((props: HTMLParagraphElement | null) => {
    if (!props) {
      return;
    }
    ref.current=props;
    console.log(props);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setInnerH(ref.current.clientHeight);
    }
  }, [])

  return (
    <div>
      <p ref={ref} id="my-content"
        className={`text-zinc-100 w-[60cw] ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}>
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
      <span>{`${r.innerWidth} ${innerH} ${r.innerWidth / r.innerHeight}`}</span>
    </div>
  );
}
*/
