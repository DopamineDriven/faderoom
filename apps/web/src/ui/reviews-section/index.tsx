"use client";

import { Star } from "lucide-react";
import type { RemoveFields, Unenumerate } from "@/types/helpers";
import { Card } from "@/ui/reviews-section/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/ui/reviews-section/ui/Carousel";
import {reviews} from "@/utils/__generated__/reviews.json";

export type ReviewsProps = (RemoveFields<
  Unenumerate<typeof reviews>,
  "rank"
> & { rank: 1 | 2 | 3 | 4 | 5 })[];

export function ReviewsSection({ reviews }: { reviews: ReviewsProps }) {
  return (
    <section className="w-full bg-black/40 py-12 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <h2
          className="mb-8 text-center text-3xl font-bold"
          style={{ color: "#C4A962" }}>
          Client Reviews
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="mx-auto w-full max-w-4xl">
          <CarouselContent>
            {reviews.map(review => (
              <CarouselItem
                key={review.id}
                className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-[#C4A962]/20 bg-black/60 p-6">
                  <div className="mb-2 flex">
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
                        className="h-4 w-4 fill-[#C4A962] text-[#C4A962]"
                      />
                    ))}
                  </div>
                  <blockquote className="mb-4 text-gray-200">
                    "{review.review}"
                  </blockquote>
                  <footer>
                    <cite
                      className="block font-semibold"
                      style={{ color: "#C4A962" }}>
                      {review.user}
                    </cite>
                    <span className="text-sm text-gray-400">
                      {new Date(review.created - 21600000)
                        .toISOString()
                        .split(/\./)?.[0]
                        ?.replace("T", " at ") ?? ""}
                    </span>
                  </footer>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#C4A962]/20 text-[#C4A962] hover:bg-[#C4A962]/10" />
          <CarouselNext className="border-[#C4A962]/20 text-[#C4A962] hover:bg-[#C4A962]/10" />
        </Carousel>
      </div>
    </section>
  );
}
