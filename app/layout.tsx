import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/page";
import { CountryProvider } from "@/context/CountryContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatSpark - Random Video Chat",
  description:
    "Connect with strangers around the world through random video chat. Start meaningful conversations with ChatSpark.",
  authors: [{ name: "ChatSpark" }],
  keywords: ["random video chat", "chat with strangers", "online video chat"], // <-- Add relevant keywords
  robots: "index, follow", // <-- Ensures pages are indexed
  openGraph: {
    title: "ChatSpark - Random Video Chat",
    description:
      "Connect with strangers around the world through random video chat. Start meaningful conversations with ChatSpark.",
    type: "website",
    url: "https://chatspark.rajkoirala.com.np",
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
  alternates: {
    canonical: "https://chatspark.rajkoirala.com.np", // canonical URL
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
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ChatSpark",
            "url": "https://chatspark.rajkoirala.com.np",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://chatspark.rajkoirala.com.np/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </Script>
      </body>
    </html>
  );
}
