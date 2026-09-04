import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Prefijo necesario para que GitHub Pages cargue los estilos y scripts desde el subdirectorio del repo
  basePath: '/marcoslopezsoft',
  assetPrefix: '/marcoslopezsoft',
};

export default nextConfig;