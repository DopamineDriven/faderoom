import type { Config as TailwindConfig } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config = {
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: ["class", 'html[class~="dark"]'],
  darkMode: ["class", 'html[class~="dark"]'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        "basis-grotesque-pro-regular": [
          "var(--font-basis-grotesque-pro-regular)"
        ],
        "basis-grotesque-pro-italic": [
          "var(--font-basis-grotesque-pro-italic)"
        ],
        "basis-grotesque-pro-black": ["var(--font-basis-grotesque-pro-black)"],
        "basis-grotesque-pro-black-italic": [
          "var(--font-basis-grotesque-pro-black-italic)"
        ],
        "basis-grotesque-pro-bold": ["var(--font-basis-grotesque-pro-bold)"],
        "basis-grotesque-pro-bold-italic": [
          "var(--font-basis-grotesque-pro-bold-italic)"
        ],
        "basis-grotesque-pro-light": ["var(--font-basis-grotesque-pro-light)"],
        "basis-grotesque-pro-light-italic": [
          "var(--font-basis-grotesque-pro-light-italic)"
        ],
        "basis-grotesque-pro-medium": [
          "var(--font-basis-grotesque-pro-medium)"
        ],
        "basis-grotesque-pro-medium-italic": [
          "var(--font-basis-grotesque-pro-medium-italic)"
        ]
      },
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }]
      },
      colors: {
        border: "hsl(var(--cta-border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        "fr-bg-main": "#272729",
        "fr-bg-nav": "#1a1a1b",
        "reddit-0": "rgb(var(--reddit-0))",
        "reddit-1:": "rgb(var(--reddit-1:))",
        "reddit-2": "rgb(var(--reddit-2))",
        "reddit-3": "rgb(var(--reddit-3))",
        "primary-0": "rgb(var(--primary-0))",
        "primary-1": "rgb(var(--primary-1))",
        "primary-2": "rgb(var(--primary-2))",
        "primary-3": "rgb(var(--primary-3))",
        "primary-4": "rgb(var(--primary-4))",
        "primary-5": "rgb(var(--primary-5))",
        "primary-6": "rgb(var(--primary-6))",
        "primary-7": "rgb(var(--primary-7))",
        "primary-8": "rgb(var(--primary-8))",
        "primary-9": "rgb(var(--primary-9))",
        "secondary-0": "rgb(var(--secondary-0))",
        "secondary-1": "rgb(var(--secondary-1))",
        "secondary-2": "rgb(var(--secondary-2))",
        "accents-0": "rgb(var(--accents-0))",
        "accents-1": "rgb(var(--accents-1))",
        "accents-2": "rgb(var(--accents-2))",
        "accents-3": "rgb(var(--accents-3))",
        "accents-4": "rgb(var(--accents-4))",
        "accents-5": "rgb(var(--accents-5))",
        "accents-6": "rgb(var(--accents-6))",
        fade50: "rgb(var(--fade50))",
        fade100: "rgb(var(--fade100))",
        fade200: "rgb(var(--fade200))",
        fade300: "rgb(var(--fade300))",
        fade400: "rgb(var(--fade400))",
        fade500: "rgb(var(--fade500))",
        fade600: "rgb(var(--fade600))",
        fade700: "rgb(var(--fade700))",
        fade800: "rgb(var(--fade800))",
        fade900: "rgb(var(--fade900))",
        fade950: "rgb(var(--fade950))",
        fadegray: "rgb(var(--fadegray))",
        fadedark50: "rgb(var(--fadedark50))",
        fadedark100: "rgb(var(--fadedark100))",
        fadedark200: "rgb(var(--fadedark200))",
        fadedark300: "rgb(var(--fadedark300))",
        fadedark400: "rgb(var(--fadedark400))",
        fadedark500: "rgb(var(--fadedark500))",
        fadedark600: "rgb(var(--fadedark600))",
        fadedark700: "rgb(var(--fadedark700))",
        fadedark800: "rgb(var(--fadedark800))",
        fadedark900: "rgb(var(--fadedark900))",
        fadedark1000: "rgb(var(--fadedark1000))",
        fadedark1100: "rgb(var(--fadedark1100))",
        fadedark1200: "rgb(var(--fadedark1200))",
        customgray50: "rgb(var(--customgray50))",
        customgray100: "rgb(var(--customgray100))",
        customgray200: "rgb(var(--customgray200))",
        customgray300: "rgb(var(--customgray300))",
        customgray400: "rgb(var(--customgray400))",
        customgray500: "rgb(var(--customgray500))",
        customgray600: "rgb(var(--customgray600))",
        customgray700: "rgb(var(--customgray700))",
        customgray800: "rgb(var(--customgray800))",
        customgray900: "rgb(var(--customgray900))",
        customgray1000: "rgb(var(--customgray1000))",
        customgray1100: "rgb(var(--customgray1100))",
        customgray1200: "rgb(var(--customgray1200))",
        woodsmoke50: "rgb(var(--woodsmoke50))",
        woodsmoke100: "rgb(var(--woodsmoke100))",
        woodsmoke200: "rgb(var(--woodsmoke200))",
        woodsmoke300: "rgb(var(--woodsmoke300))",
        woodsmoke400: "rgb(var(--woodsmoke400))",
        woodsmoke500: "rgb(var(--woodsmoke500))",
        woodsmoke600: "rgb(var(--woodsmoke600))",
        woodsmoke700: "rgb(var(--woodsmoke700))",
        woodsmoke800: "rgb(var(--woodsmoke800))",
        woodsmoke900: "rgb(var(--woodsmoke900))",
        woodsmoke950: "rgb(var(--woodsmoke950))",
        fuscousgray50: "rgb(var(--fuscousgray50))",
        fuscousgray100: "rgb(var(--fuscousgray100))",
        fuscousgray200: "rgb(var(--fuscousgray200))",
        fuscousgray300: "rgb(var(--fuscousgray300))",
        fuscousgray400: "rgb(var(--fuscousgray400))",
        fuscousgray500: "rgb(var(--fuscousgray500))",
        fuscousgray600: "rgb(var(--fuscousgray600))",
        fuscousgray700: "rgb(var(--fuscousgray700))",
        fuscousgray800: "rgb(var(--fuscousgray800))",
        fuscousgray900: "rgb(var(--fuscousgray900))",
        fuscousgray950: "rgb(var(--fuscousgray950))",
        fr: {
          "50": "#fbf9ef",
          "100": "#f3ecd2",
          "200": "#e6d8a1",
          "300": "#d7be69",
          "400": "#d0ad4f",
          "500": "#c6933a",
          "600": "#af7530",
          "700": "#92592b",
          "800": "#784728",
          "900": "#633b24",
          "950": "#381e10"
        },
        accentFr: {
          "100": "#1a1d1e",
          "200": "#414442",
          "300": "#7d7d7d",
          "400": "#a3a3a3",
          "500": "#cfcece",
          "600": "#e3e3e3",
          "700": "#f5f4f0"
        },
        flirt: {
          "50": "#FFF0FD",
          "100": "#FFE3FC",
          "200": "#FFC7FA",
          "300": "#FF9AF3",
          "400": "#FF5CE8",
          "500": "#FF2CD8",
          "600": "#FA08BD",
          "700": "#DA009A",
          "800": "#AC0079",
          "900": "#95066A",
          "950": "#5D003D"
        },
        banner: {
          "50": "#F7F7F8",
          "100": "#EEEEF0",
          "200": "#D9D9DE",
          "300": "#B9BAC0",
          "400": "#92939E",
          "500": "#757682",
          "600": "#5E5E6B",
          "700": "#4D4D57",
          "800": "#42424A",
          "900": "#3A3A40",
          "950": "#131315"
        },
        "stone-mist": {
          "50": "#F6F6F7",
          "100": "#EEEFF1",
          "200": "#E1E1E4",
          "300": "#CECFD3",
          "400": "#B9B9C0",
          "500": "#A5A6AF",
          "600": "#9797A1",
          "700": "#7C7C86",
          "800": "#66666D",
          "900": "#55555A",
          "950": "#323135"
        },
        dcs: {
          "50": "#f3f6fc",
          "100": "#e6edf8",
          "200": "#c8daef",
          "300": "#98bce1",
          "400": "#6098d0",
          "500": "#3c7bbb",
          "600": "#2b609e",
          "700": "#244d80",
          "800": "#234670",
          "900": "#203a5a",
          "950": "#16253b"
        },
        frdark: {
          "50": "#bf9f33",
          "100": "#af922f",
          "200": "#a0852b",
          "300": "#907826",
          "400": "#816b22",
          "500": "#715e1e",
          "600": "#62511a",
          "700": "#524516",
          "800": "#433812",
          "900": "#332b0e",
          "1000": "#241e0a",
          "1100": "#141105",
          "1200": "#050401"
        },
        cgray: {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b",
          "1000": "#09090b",
          "1100": "#111113",
          "1200": "#0a0a0b"
        },
        fgray: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#505050",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#262626"
        },
        woodsmk: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#151515"
        },
        alpha: {
          "50": "#102a42",
          "100": "#243a52",
          "200": "#324d67",
          "300": "#48647f",
          "400": "#617d98",
          "500": "#829ab0",
          "600": "#9eb2c7",
          "700": "#bcccdc",
          "800": "#dae2ec",
          "900": "#f1f5f8"
        },
        beta: {
          "100": "#d7be69",
          "200": "#486581",
          "300": "#9fb3c8"
        },
        frgray: "#565656"
      },
      ringWidth: {
        "3": "3px",
        "5": "5px",
        "6": "6px",
        "7": "7px"
      },
      maxWidth: {
        "10xl": "173.75rem",
        "9xl": "121rem",
        "8xl": "96rem"
      },
      width: {
        "9xl": "120rem",
        "8xl": "96rem"
      },
      dropShadow: {
        testimonial: "1px 1px 5px 0px rgba(0, 0, 0, 0.84)"
      },
      boxShadow: {
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
        refinement: "0px 2px 5px 0px #d7d7d7",
        testimonial: "5px 5px 5px 0px rgba(0, 0, 0, 0.35)",
        titleShadow: "0 1px 0 0 rgb(35 38 59 / 5%)",
        embla: "inset 0 0 0 0.2rem rgb(54 49 61 / 1)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
        cardHover:
          "0 4px 4.1px rgba(0, 0, 0, 0.012),0 4.9px 5.8px rgba(0, 0, 0, 0.018),0 6.3px 8.4px rgba(0, 0, 0, 0.029),0 8.8px 12.9px rgba(0, 0, 0, 0.05),0 15px 23px rgba(0, 0, 0, 0.11)",
        activeShadow:
          "inset 0 1px 4px 0 rgb(119 122 175 / 40%), inset 0 1px 1px 0 rgb(119 122 175 / 40%), 0 1px 0 0 rgb(35 38 59 / 5%)"
      },
      keyframes: ({ theme: _theme }) => ({
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        blink: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        loading: {
          "0%": { opacity: ".2" },
          "20%": { opacity: "1", transform: "translateX(1px)" },
          to: { opacity: ".2" }
        },
        wave: {
          "0%, 100%": { transform: "rotate(0)" },
          "20%, 60%": { transform: "rotate(-25deg)" },
          "40%, 80%": { transform: "rotate(10deg)" }
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        translateXReset: { "100%": { transform: "translateX(0)" } },
        fadeToTransparent: {
          "0%": { opacity: "1" },
          "40%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      }),
      transitionDelay: {
        "400": "400ms"
      },
      animation: {
        wiggle: "wiggle 10s ease-in-out infinite",
        hero: "hero 1s ease-in-out infinite",
        slowPing: "pulse 10s cubic-bezier(0, 0, 0.2, 1) infinite",
        slowWave: "wave 10s ease-in-out",
        wave: "wave 560ms ease-in-out",
        blink: "blink 1.4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      height: {
        "slide-height": "var(--slide-height)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    forms,
    require("@headlessui/tailwindcss"),
    typography,
    require("@xpd/tailwind-3dtransforms")
  ]
} satisfies TailwindConfig;
export default config;
