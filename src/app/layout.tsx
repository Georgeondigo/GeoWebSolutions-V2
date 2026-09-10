import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const agrandir = localFont({
  src: "../fonts/Agrandir/Agrandir-rEGULAR.otf",
  variable: "--font-agrandir",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GeoWeb Solutions",
    template: "%s | GeoWeb Solutions",
  },
  description:
    "GeoWeb Solutions designs and develops websites, web applications and digital solutions that help businesses operate, connect and grow online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${agrandir.variable}`}>
      <body>
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}