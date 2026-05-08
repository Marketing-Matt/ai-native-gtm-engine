import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gtmstack.ai — Unfiltered AI marketing. Built live.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:wght@${weight}`;
  const css = await (
    await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
      },
    })
  ).text();
  const match = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (!match) {
    throw new Error(`Could not extract font URL for ${family} ${weight}`);
  }
  return await (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[] = [];
  try {
    const [bold, regular] = await Promise.all([
      loadGoogleFont("IBM Plex Mono", 700),
      loadGoogleFont("IBM Plex Mono", 400),
    ]);
    fonts = [
      { name: "IBM Plex Mono", data: bold, weight: 700, style: "normal" },
      { name: "IBM Plex Mono", data: regular, weight: 400, style: "normal" },
    ];
  } catch {
    // Font load failed — fall back to Satori default so we never serve a blank PNG.
  }

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
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
