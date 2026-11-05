import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: garage doors, gate motors and electric fences`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded preview card shown when a link is shared on WhatsApp, Facebook, X, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #06241b 0%, #0b4a37 100%)",
        color: "#f6f7f4",
      }}
    >
      {/* Top: monogram and name */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#f5c518",
            color: "#0a1f17",
            fontSize: 52,
            fontWeight: 700,
          }}
        >
          OP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 24, color: "#a9bdb4" }}>{site.tagline}</div>
        </div>
      </div>

      {/* Middle: headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        <div>Garage doors,</div>
        <div>gate motors &amp;</div>
        <div style={{ color: "#f5c518" }}>electric fences</div>
      </div>

      {/* Bottom: services line and phone */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 30,
          color: "#a9bdb4",
        }}
      >
        <div>Installations &amp; repairs</div>
        <div style={{ color: "#f5c518", fontWeight: 700 }}>{site.phone}</div>
      </div>
    </div>,
    { ...size },
  );
}
