import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Solo aplica el subdirectorio cuando compila en producción para GitHub Pages
  basePath: isProd ? '/marcoslopezsoft' : '',
  assetPrefix: isProd ? '/marcoslopezsoft' : '',
};

export default nextConfig;