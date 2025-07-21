import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import clsx from "clsx";
import Summary from "./career/Summary";
import Navbar from "./scaffolding/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sam Clarke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <Summary />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
