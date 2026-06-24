import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super-Control | AI-Powered Classroom Management Platform",
  description:
    "Monitor, assist, and guide students in real time through a secure and intelligent classroom supervision platform. Transform your computer lab management with AI.",
  keywords: [
    "classroom management",
    "AI monitoring",
    "EdTech",
    "computer lab",
    "student supervision",
    "educational technology",
    "Super-Control",
  ],
  authors: [{ name: "Super-Control" }],
  creator: "Super-Control",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://super-control.io",
    title: "Super-Control | AI-Powered Classroom Management",
    description:
      "Transform your computer lab management with AI-powered real-time monitoring and supervision.",
    siteName: "Super-Control",
  },
  twitter: {
    card: "summary_large_image",
    title: "Super-Control | AI-Powered Classroom Management",
    description:
      "Transform your computer lab management with AI-powered real-time monitoring and supervision.",
    creator: "@supercontrolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0F172A] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
