"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TsxTargeted } from "@/types/helpers";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export type ReviewContentProps = TsxTargeted<"div"> & { content: string };

export function ReviewContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        setIsTruncated(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [content]);

  return (
    <div>
      <p
        ref={contentRef}
        className={`text-zinc-100 ${
          isExpanded ? "" : "line-clamp-3"
        } transition-all duration-300`}>
        {content}
      </p>
      {isTruncated && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-fr-300 hover:bg-zinc-800 hover:text-fr-300"
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

ReviewContent.displayName = "ReviewContent";

/*

"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mergeRefs } from "@/lib/merge-refs";
import { TsxTargeted } from "@/types/helpers";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export type ReviewContentProps = TsxTargeted<"div"> & { content: string };

export const ReviewContent = forwardRef<HTMLDivElement, ReviewContentProps>(
  ({ content, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const divRef = useRef<HTMLDivElement | null>(null);
    const merged = mergeRefs([divRef, ref]);
    useLayoutEffect(() => {
      // eslint-disable-next-line
      const height = divRef?.current?.clientHeight!;
      setContentHeight(height);
      console.log("Measured content height: " + height);
    }, []);

    return (
      <div ref={merged} {...props}>
        <p className={`text-zinc-100 ${isExpanded ? "" : "line-clamp-3"}`}>
          {content.concat(`\n ${contentHeight}`)}
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
);

ReviewContent.displayName = "ReviewContent";
*/
