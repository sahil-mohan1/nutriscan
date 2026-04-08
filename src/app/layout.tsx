import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NutriScan — Know Exactly What Your Body Is Missing",
  description:
    "Log your meals, let AI detect your nutritional gaps, and get a personalized wellness report. Built for the Debug Your Diet hackathon.",
  keywords: ["nutrition", "diet tracker", "AI health", "meal analyzer", "wellness"],
  openGraph: {
    title: "NutriScan — Debug Your Diet",
    description: "AI-powered nutritional gap detection and personalized wellness reports.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
