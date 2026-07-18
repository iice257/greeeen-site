import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "GREEEEN — Premium flower, grown differently",
    template: "%s — GREEEEN",
  },
  description:
    "An immersive fictional concept for premium flower, sensory strains, and GREEEEN shops across Lagos.",
  applicationName: "GREEEEN",
  category: "Brand experience",
  keywords: ["GREEEEN", "premium flower", "interactive brand concept", "Lagos"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "GREEEEN — Premium flower, grown differently",
    description: "Find your frequency. Meet the fictional flower collection and explore GREEEEN Lagos.",
    siteName: "GREEEEN",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06110d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
