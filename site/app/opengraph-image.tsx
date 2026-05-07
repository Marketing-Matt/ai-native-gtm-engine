import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gtmstack.ai — Unfiltered AI marketing. Built live.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            color: "#A6FF00",
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          {">_ gtmstack.ai"}
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 56,
            marginTop: 40,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          Unfiltered AI marketing.
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 56,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          Built live.
        </div>
        <div
          style={{
            color: "#888888",
            fontSize: 26,
            marginTop: 32,
            display: "flex",
          }}
        >
          A learning-in-public skills platform for B2B marketing leaders.
        </div>
      </div>
    ),
    size,
  );
}
