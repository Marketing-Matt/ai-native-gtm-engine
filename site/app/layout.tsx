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
  title: "gtmstack.ai — Unfiltered AI marketing. Built live.",
  description:
    "A learning-in-public skills platform for B2B marketing leaders. Every skill, every agent, every workflow built live — using Claude.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
