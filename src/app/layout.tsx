import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Syne_Mono } from "next/font/google";
import localFont from "next/font/local";
import { RevealObserver } from "@/components/reveal/reveal-observer";
import { description, openGraph, url } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "200 700",
  variable: "--font-general",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-syne-mono",
});

const title = "Indomptable, digital transformation studio";

// Pages set their own canonical URL, so none is inherited by mistake.
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: title, template: "%s | Indomptable" },
  description,
  openGraph: { ...openGraph, title, description, url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#161616",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(
        "dark",
        generalSans.variable,
        instrumentSerif.variable,
        syneMono.variable,
      )}
      lang="en"
    >
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
