import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadFlow AI — Grow Your Customer Relationships Without The Complexity",
  description: "LeadFlow AI is a simple, AI-assisted CRM designed specifically for small businesses and startups to track customers, manage leads, and never miss a follow-up again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#F8FAFC] text-[#0F172A]`}>
        {children}
      </body>
    </html>
  );
}
