import { getSiteUrl } from "@/lib/site-url";
import { ImageResponse } from "next/og";
const baseUrl = getSiteUrl(process.env.NODE_ENV);
const absoluteUrl = new URL("/thefaderoominc.svg", baseUrl);
export const runtime = "edge";

// const svgUrl =
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thefaderoominc-bToio8JBCTJGJGHUESKjYov57ryROc.svg";

export async function GET() {
  try {
    // Fetch the SVG
    const response = await fetch(absoluteUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();

    // Encode to base64
    const base64Encoded = Buffer.from(arrayBuffer).toString("base64");
    const logoDataUrl = `data:image/svg+xml;base64,${base64Encoded}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            padding: "40px"
          }}>
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="The Fade Room Inc Logo"
            width="300"
            height="300"
            style={{
              objectFit: "cover",
              marginBottom: "40px"
            }}
          />

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center"
            }}>
            <div
              style={{
                background:
                  "linear-gradient(to bottom right, #D4AF37, #C5A028)",
                backgroundClip: "text",
                color: "#D7BE69",
                fontSize: 48,
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                lineHeight: 1.4,
                maxWidth: "800px",
                textAlign: "center"
              }}>
              Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error generating OG image: ${e.message}`);
      console.error(e.stack);  // Log the stack trace for more detailed debugging
    } else {
      console.error('An unknown error occurred while generating OG image:', e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
