import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress bundles (default: true)
  compress: true,
  
  // Optimize images with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  // Output standalone for smaller deployment
  output: "standalone",
  
  // Optimize package imports for frequently used libraries
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "react-markdown"],
  },

  // Enable performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: "framer-motion",
            chunks: "all",
          },
          vendor: {
            test: /[\\/]node_modules[\\/](?!framer-motion)[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
