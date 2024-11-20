import { shimmer } from "@/lib/shimmer";
import Image from "next/image";

export function ParticleOverlay() {
  return (
    <>
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-[#141415] lg:block">
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-pretty text-5xl font-basis-grotesque-pro-bold tracking-tight text-fr-300 sm:text-7xl">
                  Data to enrich your business
                </h1>
                <p className="mt-8 text-pretty text-lg font-basis-grotesque-pro-medium text-fr-300 sm:text-xl/8">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-fr-300 px-3.5 py-2.5 text-sm font-semibold text-[#141415] shadow-sm hover:bg-fr-300/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-400">
                    Get started
                  </a>
                  <a href="#" className="text-sm/6 font-semibold text-fr-300">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-current lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            blurDataURL={shimmer([1587,1190])}
            placeholder="blur"
            alt="test"
            width={1587}
            height={1190}
            src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            className="aspect-[3/2] object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </>
  );
}
