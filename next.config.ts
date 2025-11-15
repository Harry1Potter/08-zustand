import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_NOTEHUB_TOKEN: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
};

export default nextConfig;