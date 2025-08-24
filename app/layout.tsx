import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/page";
import { CountryProvider } from "@/context/CountryContext";
import Script from "next/script";
import BannerAd from "@/components/banner/adBanner";
import { MOCK_BANNERS } from "@/constant/adConstant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatSpark - Random Video Chat",
  description:
    "Connect with strangers around the world through random video chat. Start meaningful conversations with ChatSpark.",
  authors: [{ name: "ChatSpark" }],
  keywords: ["random video chat", "chat with strangers", "online video chat"],
  robots: "index, follow",
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
    canonical: "https://chatspark.rajkoirala.com.np",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomBanner =
    MOCK_BANNERS[Math.floor(Math.random() * MOCK_BANNERS.length)];
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex flex-col min-h-screen`}
      >
        {/* Providers wrap */}
        <Providers>
          <CountryProvider>
            {/* Navbar with glassy style */}
            <div className="sticky top-0 z-50 bg-gray-800/40 backdrop-blur-md border-b border-gray-700 shadow-md">
              <Navbar />
            </div>

            {/* Main content area */}
            <main className="flex-grow relative z-10">{children}</main>

            {/* Notifications */}
            <Toaster />
            <Sonner />
            <BannerAd
              id="chat-bottom-banner"
              provider="image"
              size="leaderboard"
              imageSrc={randomBanner.imageSrc}
              href={randomBanner.href}
            />
            {/* Footer with matching glass style */}
            <div className="bg-gray-800/40 backdrop-blur-md border-t border-gray-700 shadow-inner">
              <Footer />
            </div>
          </CountryProvider>
        </Providers>

        {/* Structured data for SEO */}
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
