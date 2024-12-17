"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { shimmer } from "@/lib/shimmer";
import { Booksy } from "@/ui/icons/Booksy";
import { Razor } from "@/ui/icons/Razor";

const _imageGrid = [
  {
    src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/womens-undercut-q8GneuHKE2mkaOvVebhozFLI89Xpqn.png",
    alt: "Women's undercut with artistic wave pattern",
    className: "col-span-1 row-span-2"
  },
  {
    src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/23808484-j3Nz5AUJVYNxinuh6jeXP78lpsKJAW.jpeg",
    alt: "Young boy with professional fade haircut",
    className: "col-span-1 row-span-1"
  },
  {
    src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/21322177-axdrfZEKboGTD4L7oASwLf6h8p6TPS.jpeg",
    alt: "Young client with fresh fade haircut",
    className: "col-span-1 row-span-1"
  },
  {
    src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/21315053-pCXawbDDWEXWqJlxzmHuCyGokQol0d.jpeg",
    alt: "Long hairstyle with artistic fade design",
    className: "col-span-1 row-span-1"
  },
  {
    src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/23808482-FBAgag1EB7vprvhDpAT6tzKwvx66Mv.jpeg",
    alt: "Professional fade with geometric design",
    className: "col-span-1 row-span-1"
  }
];

const imageLayoutVariants = {
  one: "ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80",
  two: "mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36",
  three: "w-44 flex-none space-y-8 pt-32 sm:pt-0"
} as const;

const imageHeroLayout = [
  {
    id: 1,
    className: imageLayoutVariants.one,
    imageData: [
      {
        id: 1,
        src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/23808484-j3Nz5AUJVYNxinuh6jeXP78lpsKJAW.jpeg",
        alt: "Young boy with professional fade haircut"
      }
    ]
  },
  {
    id: 2,
    className: imageLayoutVariants.two,
    imageData: [
      {
        id: 2,
        alt: "Womens undercut with artistic wave pattern",
        src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/womens-undercut-q8GneuHKE2mkaOvVebhozFLI89Xpqn.png"
      },
      {
        id: 3,
        src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/21322177-axdrfZEKboGTD4L7oASwLf6h8p6TPS.jpeg",
        alt: "Young client with fresh fade haircut"
      }
    ]
  },
  {
    id: 3,
    className: imageLayoutVariants.three,
    imageData: [
      {
        id: 4,
        src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/21315053-pCXawbDDWEXWqJlxzmHuCyGokQol0d.jpeg",
        alt: "Long hairstyle with artistic fade design"
      },
      {
        id: 5,
        src: "https://adgf6mjgcvaeo8u4.public.blob.vercel-storage.com/23808482-FBAgag1EB7vprvhDpAT6tzKwvx66Mv.jpeg",
        alt: "Professional fade with geometric design"
      }
    ]
  }
];

const ImageScaffolder = dynamic(() => import("@/ui/hero/ui/ImageScaffolder"), {
  ssr: false,
  loading: () => (
    <Image src={shimmer([176, 264])} width={176} height={264} alt="shimmer" />
  )
});

function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-zinc-900 pt-16">
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true">
        <defs>
          <pattern
            id="hero-pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-zinc-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#hero-pattern)"
        />
      </svg>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[hsl(38,55%,50%)] to-[hsl(46,58%,63%)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-24 sm:pt-32 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <motion.div
            className="relative mb-20 w-full max-w-lg sm:mb-0 lg:max-w-xl lg:shrink-0 xl:max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 transform blur-3xl"
              aria-hidden="true">
              <div
                className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[hsl(38,55%,50%)] to-[hsl(46,58%,63%)] opacity-20"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                }}
              />
            </div>
            <motion.h1
              className="text-5xl font-bold tracking-tight text-[hsl(46,58%,63%)] sm:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              The Fade Room Inc.
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-zinc-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.
              Experience the art of grooming at its finest.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[hsl(46,58%,63%)] px-5 py-3 text-base font-semibold text-zinc-900 shadow-sm transition-all duration-300 hover:bg-[hsl(46,58%,73%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(46,58%,63%)] sm:w-auto">
                  Book Now
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 1.25, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}>
                    <Booksy className="ml-1 h-6 w-6 stroke-2" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  href="/#services"
                  className="inline-flex w-full items-center justify-center rounded-md border border-[hsl(46,58%,63%)] px-5 py-3 text-base font-semibold text-[hsl(46,58%,63%)] transition-all duration-300 hover:bg-[hsl(46,58%,63%)] hover:text-zinc-900 sm:w-auto">
                  Services
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, -1.25, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}>
                    <Razor className="ml-2 inline-block h-6 w-6 stroke-2" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="mt-20 flex justify-end gap-8 sm:mt-0 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
            {imageHeroLayout.map(props => (
              <div className={props.className} key={`cluster-${props.id}`}>
                {props.imageData.map(img => (
                  <ImageScaffolder src={img.src} alt={img.alt} key={img.id} />
                ))}
              </div>
            ))}
          </div>
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-14 w-full md:w-1/2 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {imageGrid.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className={image.className}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={400}
                    className="h-full w-full rounded-lg object-cover grayscale filter transition-all duration-300 hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}

Hero.displayName = "Hero";

export default Hero;
