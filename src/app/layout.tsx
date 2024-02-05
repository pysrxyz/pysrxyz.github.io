import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";

import FavIcon from "@/assets/favicon.ico";

import "./globals.css";
import { Icon } from "@/components/Icons";
import Link from "next/link";

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
        <h1 className="mt-24 rounded-full">
          <Link href="/">
            <Icon className="h-48 w-auto mx-auto text-white hover:text-blue-500 hover:bg-white p-5 rounded-full hover:fill-blue-50" />
          </Link>
        </h1>
        {children}
        <Footer />
      </body>
    </html>
  );
}
