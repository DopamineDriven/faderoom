"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { RemoveFields, Unenumerate } from "@/types/helpers";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/ui/reviews-paginated/ui/Avatar";
import { Button } from "@/ui/reviews-paginated/ui/Button";
import { Card, CardContent } from "@/ui/reviews-paginated/ui/Card";
import { ReviewContent } from "@/ui/reviews-paginated/ui/ReviewContent";
import reviewsData from "@/utils/__generated__/reviews.json";
import { dateFormatter } from "@/utils/date-formatter";
import { OwnerResponse } from "./ui/OwnerResponse";

export type ReviewsProps = (RemoveFields<
  Unenumerate<typeof reviewsData.reviews>,
  "rank"
> & { rank: 1 | 2 | 3 | 4 | 5 })[];

export function ReviewsSectionPaginated({
  reviews
}: {
  reviews: ReviewsProps;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <section className="w-full bg-black/95 py-12">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="mb-2 text-center text-3xl font-bold text-fr-300">
          Customer Reviews
        </h2>
        <p className="mb-8 text-center text-zinc-400">
          {reviews.length} reviews
        </p>
        <div className="mb-8 space-y-6">
          {currentReviews.map(review => (
            <Card key={review.id} className="border-zinc-800 bg-zinc-900">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start">
                  <Avatar className="mr-4">
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
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-fr-300">
                        {review.user}
                      </p>
                      <span className="text-sm text-zinc-400">
                        {dateFormatter(review.created).ymd}
                      </span>
                    </div>
                    <div className="mt-1 flex space-x-1">
                      {(review.rank === 5
                        ? [1, 2, 3, 4, 5]
                        : review.rank === 4
                          ? [1, 2, 3, 4]
                          : review.rank === 3
                            ? [1, 2, 3]
                            : review.rank === 2
                              ? [1, 2]
                              : [1]
                      ).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rank
                              ? "fill-fr-300 text-fr-300"
                              : "text-zinc-600"
                          }`}
                        />
                      ))}
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

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                className="border-fr-300 text-fr-300 hover:bg-fr-300 hover:text-black"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                Previous
              </Button>
              <div className="flex items-center gap-2 px-4 text-zinc-400">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                className="border-fr-300 text-fr-300 hover:bg-fr-300 hover:text-black"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
            <p className="text-zinc-400">
              Showing {indexOfFirstReview + 1}-
              {Math.min(indexOfLastReview, reviews.length)} of {reviews.length}{" "}
              reviews
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
