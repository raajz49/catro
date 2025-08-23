import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/page";
import { CountryProvider } from "@/context/CountryContext";

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
      <body
        className={`${inter.className} bg-gray-900 text-white flex flex-col min-h-screen`}
      >
        {" "}
        {/* Added flex-col and min-h-screen for sticky footer */}
        <Providers>
          <CountryProvider>
            <Navbar />
            <main className="flex-grow">
              {" "}
              {/* Added flex-grow to main content */}
              {children}
            </main>
            <Toaster />
            <Sonner />
            <Footer /> {/* Render the Footer component here */}
          </CountryProvider>
        </Providers>
      </body>
    </html>
  );
}
