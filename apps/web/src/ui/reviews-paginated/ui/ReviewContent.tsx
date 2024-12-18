"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/reviews-paginated/ui/Button";

export type ReviewContentProps = { content: string };

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
        className={cn(
          `text-zinc-100 transition-all sm:text-sm text-xs duration-300`,
          isExpanded ? "" : "line-clamp-3"
        )}>
        {content}
      </p>
      {isTruncated && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-fr-300 hover:bg-zinc-800 hover:text-[hsl(48,58%,77%)]"
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
