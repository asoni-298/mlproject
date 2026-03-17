import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Soni | GenAI Data Scientist Portfolio",
  description:
    "Elegant portfolio for Ashish Soni showcasing enterprise GenAI systems, RAG architectures, forecasting platforms, and business-impact AI work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
