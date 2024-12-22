"use client";

import type { FC } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { MessageSquare, Star } from "lucide-react";
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

export const ReviewsAndServicesSection: FC<{
  reviews: ReviewsAndServicesSectionProps;
}> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  usePreventInnerScroll(reviewsContainerRef);

  const { containerRef, height } = useAspectRatioLimit(0.5);

  return (
    <section className="w-full">
      <div className="mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:order-1">
            <ServicesSection ref={containerRef} />
          </div>
          <div className="flex flex-col lg:order-2">
            <Card
              className="border-cta-border flex flex-col bg-gradient-to-br from-zinc-900 to-zinc-800"
              style={{ maxHeight: `${height}px` }}>
              <CardHeader className="p-4 sm:p-6">
                <Link href="/#reviews" className="appearance-none scroll-smooth" id="reviews">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-[hsl(46,58%,63%)]" />
                    <CardTitle className="text-xl font-bold text-[hsl(46,58%,63%)] sm:text-2xl md:text-3xl">
                      Customer Reviews
                    </CardTitle>
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="flex flex-col overflow-hidden p-0">
                <div
                  ref={reviewsContainerRef}
                  className="h-full overflow-y-auto px-4 sm:px-6">
                  <div className="space-y-4 sm:space-y-6">
                    {currentReviews.map(review => (
                      <Card
                        key={review.id}
                        className="border-zinc-700 bg-zinc-800/50 bg-opacity-50">
                        <CardContent className="space-y-2 p-4 sm:space-y-4 sm:p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-8 w-8 sm:mr-4 sm:h-10 sm:w-10">
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
                              <div className="flex flex-col">
                                <p className="text-sm font-semibold text-[hsl(46,58%,63%)] sm:text-base">
                                  {review.user}
                                </p>
                                <span className="text-xs text-zinc-400 sm:text-sm">
                                  {
                                    dateFormatter(review.created)
                                      .iso8601DateOnly
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-[0.0625rem] sm:space-x-0.5">
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
                                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                    i < review.rank
                                      ? "fill-[hsl(46,58%,63%)] text-[hsl(46,58%,63%)]"
                                      : "text-zinc-600"
                                  }`}
                                />
                              ))}
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
                <div className="flex flex-col items-center gap-2 border-t border-zinc-800 p-4 sm:gap-8">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      className="border-[hsl(46,58%,63%)] bg-[#1a1a1b] text-xs font-semibold text-[hsl(46,58%,63%)] hover:bg-[hsl(46,58%,63%)] hover:text-[#1a1a1b] sm:text-sm"
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
                    <div className="flex items-center gap-2 px-2 text-xs text-zinc-400 sm:px-4 sm:text-sm">
                      {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      className="border-[hsl(46,58%,63%)] bg-[#1a1a1b] text-xs font-semibold text-[hsl(46,58%,63%)] hover:bg-[hsl(46,58%,63%)] hover:text-[#1a1a1b] sm:text-sm"
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
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    {indexOfFirstReview + 1}-
                    {Math.min(indexOfLastReview, reviews.length)} of{" "}
                    {reviews.length} reviews
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
