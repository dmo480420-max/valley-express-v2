import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sovereign AI Builder | Jazzo + G&CO. + Zite",
  description: "Luxury Digital Infrastructure for Sovereign Entrepreneurs. AI-powered no-code platform with cinematic aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
