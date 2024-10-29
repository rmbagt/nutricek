import type { Metadata } from "next";
import localFont from "next/font/local";
import { Signika } from "next/font/google";
import "./globals.css";

import SessionWrapper from "@/components/session-wrapper";
import QueryProvider from "@/components/query-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const signika = Signika({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-signika",
});

export const metadata: Metadata = {
  title: "NutriCek",
  description: "Cek your food and drink products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SessionWrapper>
        <html lang="en" suppressHydrationWarning>
          <body className={`font-signika antialiased`}>{children}</body>
        </html>
      </SessionWrapper>
    </QueryProvider>
  );
}
