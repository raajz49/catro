"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Utility function to combine classes (replaces cn from shadcn)
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

type Provider = "image" | "adsense" | "html";
type Size = "auto" | "leaderboard" | "mobile" | "banner";

export interface BannerAdProps {
  id: string; // unique id for persistence/analytics
  provider?: Provider;

  /** IMAGE mode */
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  rel?: string; // defaults to noopener noreferrer sponsored
  target?: React.HTMLAttributeAnchorTarget; // defaults to _blank

  /** HTML mode */
  html?: string; // sanitized upstream; this component does not sanitize

  /** AdSense mode */
  adsense?: {
    client: string; // ca-pub-XXXX
    slot: string; // data-ad-slot id
    format?: "auto" | "horizontal" | "rectangle" | "vertical";
    responsive?: boolean; // true by default
  };

  /** Layout */
  size?: Size; // auto infers size via CSS; see getSizeClasses
  className?: string;
  containerClassName?: string; // to control the max-width wrapper
  rounded?: boolean; // simplified to boolean

  /** Behavior */
  dismissible?: boolean; // default true
  storageTTLHours?: number; // default 24
  onImpression?: () => void;
  onClick?: () => void;
}

const DEFAULT_TTL_HOURS = 24;

function useLocalStorageTTL(key: string, ttlHours = DEFAULT_TTL_HOURS) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const { until } = JSON.parse(raw);
      if (typeof until === "number" && Date.now() < until) {
        setHidden(true);
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn("Error reading from localStorage:", error);
    }
  }, [key, isClient]);

  const hideForTTL = useCallback(() => {
    if (!isClient) return;

    try {
      const until = Date.now() + ttlHours * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify({ until }));
    } catch (error) {
      console.warn("Error writing to localStorage:", error);
    }
    setHidden(true);
  }, [key, ttlHours, isClient]);

  return { hidden, hideForTTL };
}

function useImpression<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onImpression?: () => void
) {
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current || !onImpression) return;

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !fired.current &&
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.5
          ) {
            fired.current = true;
            onImpression();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, onImpression]);
}

function getSizeClasses(size: Size | undefined) {
  switch (size) {
    case "leaderboard":
      return "h-[90px] md:h-[90px] min-h-[60px]"; // 728x90 style on md+
    case "mobile":
      return "h-[100px]"; // 320x100/300x100 style
    case "banner":
      return "h-[60px] md:h-[60px]"; // 468x60 style
    case "auto":
    default:
      return "h-[100px] md:h-[90px]";
  }
}

export default function BannerAd({
  id,
  provider = "image",
  href,
  imageSrc,
  imageAlt = "Advertisement",
  rel,
  target,
  html,
  adsense,
  size = "auto",
  className,
  containerClassName,
  rounded = true,
  dismissible = true,
  storageTTLHours = DEFAULT_TTL_HOURS,
  onImpression,
  onClick,
}: BannerAdProps) {
  const storageKey = `bannerad:${id}:hidden`;
  const { hidden, hideForTTL } = useLocalStorageTTL(
    storageKey,
    storageTTLHours
  );
  const ref = useRef<HTMLDivElement>(null);
  const [adsenseLoaded, setAdsenseLoaded] = useState(false);

  useImpression(ref, onImpression);

  const wrapperClasses = useMemo(
    () =>
      cn(
        "w-full mx-auto",
        // constrain width similar to content container
        "p-4 md:px-6",
        containerClassName
      ),
    [containerClassName]
  );

  const adClasses = useMemo(
    () =>
      cn(
        "relative overflow-hidden border bg-gradient-to-br from-gray-50 to-white",
        "shadow-sm flex items-center justify-center",
        rounded ? "rounded-2xl" : "",
        getSizeClasses(size),
        className
      ),
    [className, rounded, size]
  );

  // Load AdSense script and initialize
  useEffect(() => {
    if (provider !== "adsense" || typeof window === "undefined") return;

    let script = document.querySelector<HTMLScriptElement>(
      "script[src*='adsbygoogle.js']"
    );

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.crossOrigin = "anonymous";

      script.onload = () => {
        setAdsenseLoaded(true);
      };

      script.onerror = () => {
        console.warn("Failed to load AdSense script");
      };

      document.head.appendChild(script);
    } else {
      setAdsenseLoaded(true);
    }
  }, [provider]);

  // Initialize AdSense ad units after script loads and component mounts
  useEffect(() => {
    if (provider !== "adsense" || !adsenseLoaded || !ref.current) return;

    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn("Error initializing AdSense:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [provider, adsenseLoaded]);

  // Don't render anything if hidden
  if (hidden) return null;

  const renderContent = () => {
    if (provider === "image" && imageSrc) {
      const imageElement = (
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill // makes the image cover the container
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority={false} // set true if you want to pre-load
          />
        </div>
      );

      if (href) {
        return (
          <a
            href={href}
            onClick={onClick}
            target={target ?? "_blank"}
            rel={rel ?? "nofollow noopener noreferrer sponsored"}
            className="block w-full h-full"
          >
            {imageElement}
          </a>
        );
      }

      return imageElement;
    }

    if (provider === "adsense" && adsense) {
      return (
        <ins
          className="adsbygoogle block w-full h-full"
          style={{ display: "block" }}
          data-ad-client={adsense.client}
          data-ad-slot={adsense.slot}
          data-ad-format={adsense.format ?? "auto"}
          data-full-width-responsive={String(adsense.responsive ?? true)}
        />
      );
    }

    if (provider === "html" && html) {
      return (
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // Fallback skeleton
    return (
      <div className="w-full h-full grid place-items-center">
        <div className="text-xs text-gray-500 inline-flex items-center gap-1">
          <Info className="h-4 w-4" />
          No ad configured
        </div>
      </div>
    );
  };

  const content = (
    <div
      ref={ref}
      role="complementary"
      aria-label="Advertisement"
      className={adClasses}
    >
      {/* Sponsored Label */}
      <div className="absolute left-2 top-2 text-[10px] uppercase tracking-wide text-gray-600 bg-black backdrop-blur px-1.5 py-2 rounded-lg">
        Sponsored
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          aria-label="Hide this ad"
          onClick={hideForTTL}
          className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-black hover:bg-gray-50 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Ad Content */}
      {renderContent()}
    </div>
  );

  return (
    <div className={wrapperClasses}>
      <AnimatePresence mode="wait">
        {!hidden && (
          <motion.div
            key={`banner-${id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Demo component to show usage
function BannerAdDemo() {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Banner Ad Examples</h2>

      {/* Image Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image Banner</h3>
        <BannerAd
          id="demo-image-banner"
          provider="image"
          size="auto"
          imageSrc="https://via.placeholder.com/728x90/4F46E5/FFFFFF?text=Your+Ad+Here"
          href="https://example.com"
          onImpression={() => console.log("Image banner impression")}
          onClick={() => console.log("Image banner clicked")}
        />
      </div>

      {/* HTML Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">HTML Banner</h3>
        <BannerAd
          id="demo-html-banner"
          provider="html"
          size="leaderboard"
          html={`
            <div style="width: 100%; height: 100%; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-family: Arial, sans-serif;">
              <div style="text-align: center;">
                <h3 style="margin: 0; font-size: 18px;">Custom HTML Ad</h3>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Build anything you want!</p>
              </div>
            </div>
          `}
          onImpression={() => console.log("HTML banner impression")}
        />
      </div>

      {/* AdSense Banner (won't work without real credentials) */}
      <div>
        <h3 className="text-lg font-semibold mb-2">AdSense Banner (Demo)</h3>
        <BannerAd
          id="demo-adsense-banner"
          provider="adsense"
          size="auto"
          adsense={{
            client: "ca-pub-XXXXXXXXXXXXXXXXX",
            slot: "XXXXXXXXXX",
          }}
          onImpression={() => console.log("AdSense banner impression")}
        />
      </div>

      {/* Different sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Mobile Banner</h3>
        <BannerAd
          id="demo-mobile-banner"
          provider="image"
          size="mobile"
          imageSrc="https://via.placeholder.com/320x100/10B981/FFFFFF?text=Mobile+Banner"
          href="https://example.com"
        />
      </div>
    </div>
  );
}

export { BannerAdDemo };
