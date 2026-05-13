"use client";

import { motion, useScroll } from "framer-motion";
import { useMemo } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #28b8d5, #8b5cf6, #d4af37, #ec4899)",
      }}
    />
  );
}

