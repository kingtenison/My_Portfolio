"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0, rotateX: 0, rotateY: 0 };
      case "down":
        return { y: -distance, x: 0, rotateX: 0, rotateY: 0 };
      case "left":
        return { x: distance, y: 0, rotateX: 0, rotateY: 0 };
      case "right":
        return { x: -distance, y: 0, rotateX: 0, rotateY: 0 };
      case "none":
      default:
        return { x: 0, y: 0, rotateX: 0, rotateY: 0 };
    }
  };

  const initialValues = getDirectionValues();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          ...initialValues,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
              }
            : {
                opacity: 0,
                ...initialValues,
              }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
