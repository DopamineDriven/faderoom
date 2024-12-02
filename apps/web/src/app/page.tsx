import type { Metadata } from "next";
import { Suspense } from "react";
import type { ReviewsProps } from "@/ui/reviews-section";
import { Cards } from "@/ui/cards";
import { LoadingDots } from "@/ui/loading/Dots";
import { ParticleHeaderComponent } from "@/ui/particles/ParticleHeader";
import { ReviewsSection } from "@/ui/reviews-section";
import { imageData as imageObject } from "@/utils/__generated__/image-object";
import * as reviewsData from "@/utils/__generated__/reviews.json" with { type: "json" };

export const metadata = {
  title: "The Fade Room Inc."
} satisfies Metadata;

export default function Home() {
  return (
    <>
      <div className="relative">
        <Suspense fallback={<LoadingDots color="#d7be69" />}>
          <ParticleHeaderComponent />
        </Suspense>
        <div className="absolute inset-0 overflow-hidden" />
        <Cards imageData={imageObject} />
      </div>
      <ReviewsSection reviews={reviewsData.reviews as ReviewsProps} />
    </>
  );
}
