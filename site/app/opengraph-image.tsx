import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gtmstack.ai — Unfiltered AI marketing. Built live.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PLEX_MONO_BOLD =
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5/files/ibm-plex-mono-latin-700-normal.woff2";
const PLEX_MONO_REGULAR =
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5/files/ibm-plex-mono-latin-400-normal.woff2";

export default async function Image() {
  const [plexBold, plexRegular] = await Promise.all([
    fetch(PLEX_MONO_BOLD).then((r) => r.arrayBuffer()),
    fetch(PLEX_MONO_REGULAR).then((r) => r.arrayBuffer()),
  ]);

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
          fontFamily: "IBM Plex Mono",
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
            fontWeight: 700,
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
            fontWeight: 700,
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
            fontWeight: 400,
            marginTop: 32,
            display: "flex",
          }}
        >
          A learning-in-public skills platform for B2B marketing leaders.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: plexBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "IBM Plex Mono",
          data: plexRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
