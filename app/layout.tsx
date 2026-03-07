import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rishabh Lingam",
    template: "%s · Rishabh Lingam",
  },
  description:
    "Software engineer & researcher exploring the intersection of systems, machine learning, and human-centered design.",
  keywords: ["software engineer", "machine learning", "research", "portfolio"],
  authors: [{ name: "Rishabh Lingam" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rishabh Lingam",
    title: "Rishabh Lingam",
    description:
      "Software engineer & researcher exploring the intersection of systems, machine learning, and human-centered design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Lingam",
    description:
      "Software engineer & researcher exploring the intersection of systems, machine learning, and human-centered design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
