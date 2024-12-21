import { ImageResponse } from "next/og";
// import { getSiteUrl } from "@/lib/site-url";

export const runtime = "edge";
export async function GET() {
  // const baseUrl = getSiteUrl(process.env.NODE_ENV);
  // const absoluteUrl = new URL("/thefaderoominc.svg", baseUrl);
  try {
    // const logoSvg = await fetch(absoluteUrl).then(res => res.text());
    const logoSvg = await fetch(
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thefaderoominc-bToio8JBCTJGJGHUESKjYov57ryROc.svg'
    ).then(res => res.text())
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px"
            }}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
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
                color: "transparent",
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
      console.error(e.stack); // output stack trace for detailed debugging
    } else {
      console.error("An unknown error occurred while generating OG image:", e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
