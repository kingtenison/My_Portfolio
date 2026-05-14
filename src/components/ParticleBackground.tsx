"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const colors = [
  "rgba(40, 184, 213, 0.5)",
  "rgba(14, 165, 233, 0.5)",
  "rgba(139, 92, 246, 0.5)",
  "rgba(212, 175, 55, 0.4)",
  "rgba(20, 184, 166, 0.4)",
];

export default function ParticleBackground({ density = 10 }: { density?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>(() => {
    // Generate particles only during client render (component mounted)
    // This initializer runs once per component lifecycle
    const arr: Particle[] = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  });

  // Pause animations when not in viewport
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
          animate={{
            y: isVisible ? [0, -30, 0] : 0,
            x: isVisible ? [0, 15, 0] : 0,
            scale: isVisible ? [1, 1.2, 1] : 1,
            opacity: isVisible ? [0.3, 0.7, 0.3] : 0.3,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
