import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbars";
import Footer from "@/components/Footer";

import FavIcon from "@/assets/favicon.ico";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pysr.xyz"),
  title: "pysr personal blog",
  description: "Blog of pysr.xyz",
  icons: {
    icon: {
      url: FavIcon.src,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
