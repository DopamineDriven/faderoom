import type { Config as TailwindConfig } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", 'html[class~="dark"]'],
  future: { hoverOnlyWhenSupported: true },
  /* customize your theme -> https://tailwindcss.com/docs/theme */
  theme: {
    extend: {
      fontFamily: {
        "geist-sans": ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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