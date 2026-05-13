import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress bundles (default: true)
  compress: true,
  
  // Optimize images with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Output standalone for smaller deployment
  output: "standalone",
  
  // Optimize package imports for frequently used libraries
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "react-markdown"],
  },
};

export default nextConfig;
