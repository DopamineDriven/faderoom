import type { MetadataRoute } from "next";

export default function manifest() {
  return <MetadataRoute.Manifest>{
    short_name: "Fade Room",
    description: "Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.",
    background_color: "#FFFFFF",
    name: "The Fade Room Inc.",
    theme_color: "#d7be69",
    start_url: "/",
    display: "fullscreen",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
