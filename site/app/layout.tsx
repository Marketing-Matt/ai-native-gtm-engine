import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gtmstack.ai"),
  title: "gtmstack.ai — Unfiltered AI marketing. Built live.",
  description:
    "A learning-in-public skills platform for B2B marketing leaders. Every skill, every agent, every workflow built live — using Claude.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "gtmstack.ai — Unfiltered AI marketing. Built live.",
    description:
      "A learning-in-public skills platform for B2B marketing leaders.",
    url: "https://gtmstack.ai",
    siteName: "gtmstack.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "gtmstack.ai — Unfiltered AI marketing. Built live.",
    description:
      "A learning-in-public skills platform for B2B marketing leaders.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gtmstack.ai#organization",
      name: "gtmstack.ai",
      url: "https://gtmstack.ai",
      description:
        "A learning-in-public skills platform for B2B marketing leaders.",
      logo: "https://gtmstack.ai/favicon.svg",
      founder: { "@type": "Person", name: "Matt Browning" },
      sameAs: [
        "https://github.com/Marketing-Matt/gtmstack",
        "https://newsletter.gtmstack.ai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://gtmstack.ai#website",
      url: "https://gtmstack.ai",
      name: "gtmstack.ai",
      description: "Unfiltered AI marketing. Built live.",
      publisher: { "@id": "https://gtmstack.ai#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexMono.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
