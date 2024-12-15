import type { Metadata } from "next";
import type { ReviewsAndServicesSectionProps } from "@/ui/reviews-paginated";
import Carousel from "@/ui/carousel";
import { OptimizedCTA } from "@/ui/cta";
// import { Cards } from "@/ui/cards";
import { ParticleOverlayImageGrid } from "@/ui/particles/ParticleOverlayImageGrid";
import { ReviewsAndServicesSection } from "@/ui/reviews-paginated";
import { imageData as imageObject } from "@/utils/__generated__/image-object";
import reviewData from "@/utils/__generated__/reviews.json";

export const metadata = {
  title: "The Fade Room Inc."
} satisfies Metadata;

export default function Home() {
  return (
    <>
      <ParticleOverlayImageGrid />
      <OptimizedCTA />
      <ReviewsAndServicesSection
        reviews={reviewData.reviews as ReviewsAndServicesSectionProps}>
        <Carousel imageData={imageObject} />
      </ReviewsAndServicesSection>
    </>
  );
}
