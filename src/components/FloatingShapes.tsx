"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloatingShape {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  bgOpacity1: number;
  bgOpacity2: number;
  blur: number;
  yAnim: number;
  xAnim: number;
  duration: number;
  delay: number;
}

const FloatingShapes = () => {
  const [shapes, setShapes] = useState<FloatingShape[]>(() => {
    // Generate 6 shapes with deterministic random values (only on client)
    const arr: FloatingShape[] = [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 60 + 30,
      height: Math.random() * 60 + 30,
      bgOpacity1: Math.random() * 0.08 + 0.04,
      bgOpacity2: Math.random() * 0.08 + 0.04,
      blur: Math.random() * 25 + 15,
      yAnim: Math.random() * 60 - 30,
      xAnim: Math.random() * 60 - 30,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    return arr;
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: shape.width,
            height: shape.height,
            background: `linear-gradient(135deg, 
              rgba(40, 184, 213, ${shape.bgOpacity1}),
              rgba(139, 92, 246, ${shape.bgOpacity2}))`,
            filter: `blur(${shape.blur}px)`,
          }}
          animate={{
            y: [0, shape.yAnim, 0],
            x: [0, shape.xAnim, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Floating rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border-2 border-primary-start/10 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
            width: 120 - i * 20,
            height: 120 - i * 20,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
