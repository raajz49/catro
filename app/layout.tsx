import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatSpark - Random Video Chat",
  description:
    "Connect with strangers around the world through random video chat. Start meaningful conversations with ChatSpark.",
  authors: [{ name: "ChatSpark" }],
  openGraph: {
    title: "ChatSpark - Random Video Chat",
    description:
      "Connect with strangers around the world through random video chat. Start meaningful conversations with ChatSpark.",
    type: "website",
    images: ["https://shapes.inc/api/public/avatar/johnnysins-rvhd"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@chatspark_app",
    title: "ChatSpark - Random Video Chat",
    description:
      "Connect with strangers around the world through random video chat",
    images: ["https://shapes.inc/api/public/avatar/johnnysins-rvhd"],
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
