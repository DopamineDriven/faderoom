"use client";

import Image from "next/image";
import Link from "next/link";
import { shimmer } from "@/lib/shimmer";
import { cn } from "@/lib/utils";
import { imageTuple } from "@/utils/__generated__/image-tuples";
import { CarouselCards } from "./CarouselCards";

export function Cards() {
  return (
    <div className="bg-fr-bg-main py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-0 lg:px-8">
        <div className="mx-auto max-w-3xl pb-10 text-center">
          <h2 className="text-balance font-basis-grotesque-pro-regular text-4xl tracking-tight text-fr-300 sm:text-5xl">
            {"GALLERY"}
          </h2>
        </div>
        {/* viewports lg or bigger render Classic Cards (below) */}
        <div
          className={cn(
            "hidden lg:mx-0 lg:mt-20 lg:grid lg:max-w-none lg:auto-rows-fr lg:grid-cols-3 lg:gap-6"
          )}>
          {imageTuple["imgIdAndPathTuple"].map(img => (
            <article
              key={`${img["0"]}`}
              className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
              <Image
                alt={img["0"]}
                src={img["1"]}
                width={176}
                height={274}
                placeholder="blur"
                blurDataURL={shimmer([176, 274])}
                className="absolute inset-0 -z-10 h-full w-full object-cover group-hover:opacity-75"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              <h3 className="mt-3 font-basis-grotesque-pro-regular text-lg/6 font-semibold text-fr-300">
                {img["0"]}
                <Link
                  href={`/photos/${img["0"]}`}
                  passHref
                  className="appearance-none">
                  <span className="absolute inset-0" />
                  {img["0"]}
                </Link>
              </h3>
            </article>
          ))}
        </div>
        {/* viewports md or smaller render Carousel Cards */}
        <CarouselCards />
      </div>
    </div>
  );
}
