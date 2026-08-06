import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(158,90,42,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(30,58,41,0.55), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#b7b39f",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 86,
            fontWeight: 600,
            color: "#fdfcf8",
            lineHeight: 1.05,
          }}
        >
          OB1 Odysseys
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            maxWidth: 820,
            color: "#d8d5c9",
            lineHeight: 1.4,
          }}
        >
          Real field research. Rigorous data. A case for action you can
          check yourself.
        </div>
      </div>
    ),
    { ...size }
  );
}
