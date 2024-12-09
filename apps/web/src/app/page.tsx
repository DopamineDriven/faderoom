import type { Metadata } from "next";
import { Suspense } from "react";
import type { ReviewsAndServicesSectionProps } from "@/ui/reviews-paginated";
// import { Cards } from "@/ui/cards";
import { LoadingDots } from "@/ui/loading/Dots";
import { ParticleOverlayImageGrid } from "@/ui/particles/ParticleOverlayImageGrid";
import { ReviewsAndServicesSection } from "@/ui/reviews-paginated";
import { imageData as imageObject } from "@/utils/__generated__/image-object";
import reviewData from "@/utils/__generated__/reviews.json";
import Carousel from "@/ui/carousel";

export const metadata = {
  title: "The Fade Room Inc."
} satisfies Metadata;

export default function Home() {
  return (
    <>
      <div className="relative">
        <Suspense fallback={<LoadingDots color="#d7be69" />}>
          <ParticleOverlayImageGrid />
        </Suspense>
        <div className="absolute inset-0 overflow-hidden" />
      </div>
      <ReviewsAndServicesSection
        reviews={reviewData.reviews as ReviewsAndServicesSectionProps}
      />
      <Carousel imageData={imageObject} />
    </>
  );
}
