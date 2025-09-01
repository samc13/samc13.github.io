import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import clsx from "clsx";
import Header from "./structure/Header";
import Navbar from "./structure/Navbar";
import classes from './scaffolding/content.module.scss';

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
        className={clsx(geistSans.variable, geistMono.variable, 'antialiased', classes['main-content'])}
      >
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
