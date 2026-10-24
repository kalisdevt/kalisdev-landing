import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Одна страница 404 на весь сайт: у русской и английской версии
    // разные корневые layout, см. app/global-not-found.tsx
    globalNotFound: true,
  },
};

export default nextConfig;
