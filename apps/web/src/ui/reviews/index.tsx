"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import type { Review as _Review } from "./reviewsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/reviews/ui/Avatar";
import { Button } from "@/ui/reviews/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/ui/reviews/ui/Card";
import { reviewsData } from "./reviewsData";

const REVIEWS_PER_PAGE = 10;

export function ReviewsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const totalPages = Math.ceil(reviewsData.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviewsData.slice(startIndex, endIndex);

  const handleLike = (reviewId: number) => {
    setLikedReviews(prev => {
      const newLikedReviews = new Set(prev);
      if (newLikedReviews.has(reviewId)) {
        newLikedReviews.delete(reviewId);
      } else {
        newLikedReviews.add(reviewId);
      }
      return newLikedReviews;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-4">
        {currentReviews.map(review => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.author}`}
                  />
                  <AvatarFallback>
                    {review.author
                      .split("")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{review.author}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.content}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLike(review.id)}
                className={likedReviews.has(review.id) ? "text-blue-600" : ""}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
