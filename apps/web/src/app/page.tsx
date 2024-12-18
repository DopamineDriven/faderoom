import type { Metadata } from "next";
import type { ReviewsAndServicesSectionProps } from "@/ui/reviews-paginated";
import Carousel from "@/ui/carousel";
import OptimizedCTA from "@/ui/cta";
import Hero from "@/ui/hero";
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
    <main className="min-h-screen bg-gradient-to-tl from-[#1c1c1c] to-[#2a2a2a] font-basis-grotesque-pro-medium antialiased">
      <Hero />
      <div className="container mx-auto space-y-8 py-4 sm:py-8">
        <OptimizedCTA />
        <GoogleMap />
        <ReviewsAndServicesSection
          reviews={reviewData.reviews as ReviewsAndServicesSectionProps}>
          <Carousel imageData={imageObject} />
        </ReviewsAndServicesSection>
      </div>
    </main>
  );
}
