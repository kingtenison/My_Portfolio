"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ParallaxTiltProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  speed?: number;
  glare?: boolean;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
}

export default function ParallaxTilt({
  children,
  className = "",
  tiltAmount = 10,
  glare = true,
  scale = 1.02,
  perspective = 1000,
  disabled = false,
}: ParallaxTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = (mouseX - centerX) / (rect.width / 2);
    const deltaY = (mouseY - centerY) / (rect.height / 2);

    setTilt({
      x: deltaY * tiltAmount,
      y: deltaX * tiltAmount,
    });

    // Calculate glare position (percentage)
    const glareX = ((mouseX - rect.left) / rect.width) * 100;
    const glareY = ((mouseY - rect.top) / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
        rotateY: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
        scale: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {children}

      {/* Glare effect */}
      {glare && isHovering && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                circle at ${glarePos.x}% ${glarePos.y}%,
                rgba(255, 255, 255, 0.25) 0%,
                transparent 60%
              )`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
