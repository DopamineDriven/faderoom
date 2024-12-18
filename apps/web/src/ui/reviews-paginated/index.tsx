"use client";

import type { FC, PropsWithChildren } from "react";
import { useRef, useState } from "react";
import { Star } from "lucide-react";
import type { ArrFieldReplacer } from "@/types/helpers";
import { useAspectRatioLimit } from "@/ui/hooks/useAspectRatio";
import { usePreventInnerScroll } from "@/ui/hooks/usePreventInnerScroll";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/ui/reviews-paginated/ui/Avatar";
import { Button } from "@/ui/reviews-paginated/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/ui/reviews-paginated/ui/Card";
import { ServicesSection } from "@/ui/services";
import reviewsData from "@/utils/__generated__/reviews.json";
import { dateFormatter } from "@/utils/date-formatter";
import { OwnerResponse } from "./ui/OwnerResponse";
import { ReviewContent } from "./ui/ReviewContent";

interface OwnerResponse {
  id: number;
  content: string;
  date: string;
}

// Sample review data with owner responses

export type ReviewsAndServicesSectionProps = ArrFieldReplacer<
  typeof reviewsData.reviews,
  "rank",
  true,
  {
    rank: 1 | 2 | 3 | 4 | 5;
  }
>;

export const ReviewsAndServicesSection: FC<
  PropsWithChildren<{ reviews: ReviewsAndServicesSectionProps }>
> = ({ reviews, children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  usePreventInnerScroll(reviewsContainerRef);

  const { containerRef, height } = useAspectRatioLimit(0.5);
  console.log(height);
  return (
    <section className="w-full">
      <div className="mx-auto">
        <div className="grid gap-8 py-8 sm:py-12 lg:grid-cols-2">
          <div className="lg:order-1" id="services">
            <ServicesSection ref={containerRef} />
          </div>
          <div className="flex flex-col lg:order-2" id="reviews">
            <Card
              className="border-cta-border flex flex-col bg-gradient-to-br from-zinc-900 to-zinc-800"
              style={{ maxHeight: `${height}px` }}>
              <CardHeader>
                <CardTitle className="mb-2 text-center text-2xl font-bold text-[hsl(46,58%,63%)] sm:text-3xl">
                  Customer Reviews
                </CardTitle>
                <p className="mb-6 text-center text-zinc-400">
                  {reviews.length} reviews
                </p>
              </CardHeader>
              <CardContent className="flex flex-col overflow-hidden">
                <div
                  ref={reviewsContainerRef}
                  className="h-full overflow-y-auto pr-1 sm:pr-4">
                  <div className="space-y-6 pr-1 sm:pr-4">
                    {currentReviews.map(review => (
                      <Card
                        key={review.id}
                        className="border-zinc-700 bg-zinc-800/50 bg-opacity-50">
                        <CardContent className="mb-4 space-y-2 p-6">
                          <div className="my-0 flex items-center">
                            <Avatar className="mr-2 sm:mr-3">
                              <AvatarImage
                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.user}&backgroundColor=d7be69&textColor=1a1d1e`}
                                alt={review.user}
                              />
                              <AvatarFallback>
                                {review.user
                                  .split(" ")
                                  .map(n => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="my-auto flex items-start justify-between">
                                <div className="flex flex-col">
                                  <p className="text-xs font-semibold text-[hsl(46,58%,63%)] sm:text-base">
                                    {review.user}
                                  </p>
                                  <span className="text-xs text-zinc-400 sm:text-sm">
                                    {
                                      dateFormatter(review.created)
                                        .iso8601DateOnly
                                    }
                                  </span>
                                </div>
                                <div className="flex space-x-0.5 sm:space-x-1">
                                  {(review.rank === 5
                                    ? [1, 2, 3, 4, 5]
                                    : review.rank === 4
                                      ? [1, 2, 3, 4]
                                      : review.rank === 3
                                        ? [1, 2, 3]
                                        : review.rank === 2
                                          ? [1, 2]
                                          : [review.rank]
                                  ).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${
                                        i < review.rank
                                          ? "fill-[hsl(46,58%,63%)] text-[hsl(46,58%,63%)]"
                                          : "text-zinc-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <ReviewContent content={review.review} />
                          {review.reply_content && (
                            <OwnerResponse
                              content={review.reply_content}
                              date={review.reply_updated}
                              staff={review.staff}
                            />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 border-t border-zinc-800 p-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      className="border-[hsl(46,58%,63%)] bg-[#1a1a1b] font-semibold text-[hsl(46,58%,63%)] hover:bg-[hsl(46,58%,63%)] hover:text-[#1a1a1b]"
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        setTimeout(() => {
                          if (reviewsContainerRef.current) {
                            reviewsContainerRef.current.scrollTop = 0;
                          }
                        }, 100);
                      }}
                      disabled={currentPage === 1}>
                      Previous
                    </Button>
                    <div className="flex items-center gap-2 px-4 text-zinc-400">
                      {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      className="border-[hsl(46,58%,63%)] bg-[#1a1a1b] font-semibold text-[hsl(46,58%,63%)] hover:bg-[hsl(46,58%,63%)] hover:text-[#1a1a1b]"
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        setTimeout(() => {
                          if (reviewsContainerRef.current) {
                            reviewsContainerRef.current.scrollTop = 0;
                          }
                        }, 100);
                      }}
                      disabled={currentPage === totalPages}>
                      Next
                    </Button>
                  </div>
                  <p className="text-zinc-400">
                    Showing {indexOfFirstReview + 1}-
                    {Math.min(indexOfLastReview, reviews.length)} of{" "}
                    {reviews.length} reviews
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
};
