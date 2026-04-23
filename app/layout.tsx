import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminous Sovereign | Valley Express Logistics Engine",
  description: "The sovereign logistics engine for the Arizona industrial and medical corridors. Precision B2B transport, HIPAA-compliant medical handling, and autonomous fleet intelligence.",
  keywords: ["Sovereign Logistics", "Medical Courier Phoenix", "Middle Mile Freight Arizona", "Autonomous Logistics Engine", "Valley Express Redesign"],
  icons: {
    icon: "/favicon.ico",
  },
};


import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white selection:bg-gold selection:text-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
