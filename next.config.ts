import { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://cdn.chatspark.rajkoirala.com.np/"
      : "", // no prefix in dev
  images: {
    domains: ["cdn.chatspark.rajkoirala.com.np"],
  },
};

export default nextConfig;
