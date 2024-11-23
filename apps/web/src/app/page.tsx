import type { Metadata } from "next";
import { Suspense } from "react";
import { Cards } from "@/ui/cards";
import { LoadingDots } from "@/ui/loading/Dots";
import { ParticleHeaderComponent } from "@/ui/particles/ParticleHeader";
import { imageObject } from "@/utils/__generated__/image-object";

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
    </>
  );
}
