import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CallSpark - Random Video Chat",
  description:
    "Connect with strangers around the world through random video chat. Start meaningful conversations with CallSpark.",
  authors: [{ name: "CallSpark" }],
  openGraph: {
    title: "CallSpark - Random Video Chat",
    description:
      "Connect with strangers around the world through random video chat. Start meaningful conversations with CallSpark.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@callspark_app",
    title: "CallSpark - Random Video Chat",
    description:
      "Connect with strangers around the world through random video chat",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
