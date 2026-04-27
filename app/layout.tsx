import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Inter is the font Linear uses (close cousin). We load it via next/font
// which self-hosts it for performance — no CDN flicker on page load.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// JetBrains Mono — used for dollar amounts and tabular data so columns
// line up vertically (a Linear-style touch).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Clerkie — Debt and money, simplified.",
  description:
    "A different kind of debt repayment and optimization partner. Powered by machine learning and humans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
