import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import BackgroundAnimations from "@/components/animations/BackgroundAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rishabh Lingam",
  description: "Software engineer & researcher exploring the intersection of systems, machine learning, and human-centered design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Decorative background animations — fixed, non-interactive, behind all content */}
        <BackgroundAnimations />
        <Navigation />
        {/*
          position: relative + z-index: 1 creates a stacking context above the
          background animations (fixed, z-index: 0). Without this, CSS paints
          z-index:0 fixed elements AFTER non-positioned block content, causing
          the dots/lines to bleed over images and cards.
        */}
        <main className="relative" style={{ zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
