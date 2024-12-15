import type { Metadata } from "next";
import type { ReviewsAndServicesSectionProps } from "@/ui/reviews-paginated";
import Carousel from "@/ui/carousel";
import OptimizedCTA from "@/ui/cta";
import Hero from "@/ui/hero";
import { BusinessHours } from "@/ui/hours";
import { GoogleMap } from "@/ui/map";
import { ReviewsAndServicesSection } from "@/ui/reviews-paginated";
import { imageData as imageObject } from "@/utils/__generated__/image-object";
import reviewData from "@/utils/__generated__/reviews.json";

export const metadata = {
  title: "The Fade Room Inc."
} satisfies Metadata;

export default function Home() {
  // return (
  //   <>
  //     <ParticleOverlayImageGrid />
  //     <OptimizedCTA />
  //     <ReviewsAndServicesSection
  //       reviews={reviewData.reviews as ReviewsAndServicesSectionProps}>
  //       <Carousel imageData={imageObject} />
  //     </ReviewsAndServicesSection>
  //   </>
  // );
  return (
    <main className="min-h-screen font-basis-grotesque-pro-regular">
      <Hero />
      <div className="container mx-auto space-y-8 p-4 sm:p-8">
        <OptimizedCTA />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <BusinessHours />
          <GoogleMap />
        </div>
        <ReviewsAndServicesSection
          reviews={reviewData.reviews as ReviewsAndServicesSectionProps}>
          <Carousel imageData={imageObject} />
        </ReviewsAndServicesSection>
      </div>
    </main>
  );
}
