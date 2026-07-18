import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aditis-shelf.vercel.app"),
  title: "aditi's shelf",
  description: "articles i loved, on one colorful shelf",
  openGraph: {
    title: "aditi's shelf",
    description: "articles i loved, on one colorful shelf",
    url: "https://aditis-shelf.vercel.app",
    siteName: "aditi's shelf",
  },
  twitter: {
    card: "summary_large_image",
    title: "aditi's shelf",
    description: "articles i loved, on one colorful shelf",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={grotesk.className}>{children}</body>
    </html>
  );
}
