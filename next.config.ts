import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress bundles
  compress: true,
  
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Experimental: Reduce JavaScript payload
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "react-markdown"],
  },
  
  // Output standalone for smaller deployment
  output: "standalone",
};

export default nextConfig;
