import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 dipakai untuk screenshot project (banyak teks kecil) agar tetap tajam.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Root layout ada di app/[lang], jadi 404 untuk URL yang tidak cocok ditangani di sini.
    globalNotFound: true,
  },
};

export default nextConfig;
