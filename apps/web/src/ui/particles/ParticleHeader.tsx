// import { useEffect, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadFull } from "tsparticles";
// import type { Container, ISourceOptions } from "@tsparticles/engine";
import { cn } from "@/lib/utils";
import { ParticleOverlayImageGrid } from "./ParticleOverlayImageGrid";

export function ParticleHeaderComponent() {
  // const [init, setInit] = useState(false);

  // useEffect(() => {
  //   initParticlesEngine(async engine => {
  //     await loadFull(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  // const _particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log(container);
  // };

  // const _options = {
  //   background: {
  //     color: {
  //       value: "#141415"
  //     }
  //   },
  //   fpsLimit: 120,
  //   fullScreen: { enable: false },
  //   interactivity: {
  //     events: {
  //       onClick: {
  //         enable: true,
  //         mode: "push"
  //       },
  //       onHover: {
  //         enable: true,
  //         mode: "repulse"
  //       },
  //       resize: { enable: true }
  //     },
  //     modes: {
  //       bubble: {
  //         distance: 400,
  //         duration: 2,
  //         opacity: 0.9,
  //         size: 40
  //       },
  //       push: {
  //         quantity: 4
  //       },
  //       repulse: {
  //         distance: 200,
  //         duration: 0.4
  //       }
  //     }
  //   },
  //   particles: {
  //     color: {
  //       value: "#d7be69"
  //     },
  //     links: {
  //       color: "#d7be69",
  //       distance: 150,
  //       enable: true,
  //       opacity: 0.5,
  //       width: 1
  //     },
  //     collisions: {
  //       enable: true
  //     },
  //     move: {
  //       direction: "none",
  //       enable: true,
  //       outModes: {
  //         default: "bounce"
  //       },
  //       random: false,
  //       speed: 2,
  //       straight: false
  //     },
  //     number: {
  //       density: {
  //         enable: true,
  //         height: 800,
  //         width: 800
  //       },
  //       value: 80
  //     },
  //     opacity: {
  //       value: 0.5
  //     },
  //     shape: {
  //       type: "circle"
  //     },
  //     size: {
  //       value: { min: 1, max: 5 }
  //     }
  //   },
  //   detectRetina: true
  // } satisfies ISourceOptions;

  return (
    <div
      className={cn(
        "relative sm:h-screen h-[75vh]"
      )}>
      <div className="absolute inset-0 flex flex-col" aria-hidden="true">
        <div className="relative w-full flex-1">
          <div className="absolute inset-0 overflow-hidden">
            {/* {init && (
              <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="h-full w-full object-cover object-center"
              />
            )} */}
          </div>
          <div className="absolute inset-0 opacity-50" />
        </div>
        <div className="inset-0 w-full bg-[#141415]" />
      </div>
      <ParticleOverlayImageGrid />
      {/* <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <h1
          className={cn(
            `mb-4 text-balance text-center font-basis-grotesque-pro-bold text-4xl tracking-tight text-fr-300 sm:text-5xl`
          )}>
          {"The Fade Room Inc."}
        </h1>
        <p className="mx-auto mb-4 max-w-xl text-pretty px-2 text-center font-basis-grotesque-pro-light-italic text-[1.25rem] leading-[1.5rem] tracking-tight text-fr-300 sm:max-w-2xl">
          {`Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.`}
        </p>
      </div> */}
    </div>
  );
}
