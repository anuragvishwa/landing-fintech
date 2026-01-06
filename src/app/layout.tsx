import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flexdash for Fintech - Turn Billing Confusion Into Completed Checkouts",
  description: "On-demand UI support for billing & invoicing SaaS. Flexdash guides users through tax setup, payment failures, exports, and integrations with dynamic overlays and verified outcomes.",
  keywords: ["fintech", "billing support", "invoicing", "subscription management", "payment ops", "UI guidance", "SaaS", "customer support"],
  authors: [{ name: "Flexdash" }],
  openGraph: {
    title: "Flexdash for Fintech - Billing Setup Made Easy",
    description: "Turn billing setup confusion into completed checkouts, paid invoices, and fewer tickets.",
    type: "website",
    siteName: "Flexdash",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexdash for Fintech",
    description: "On-demand UI support that shows users what to do in your billing and invoicing flows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
