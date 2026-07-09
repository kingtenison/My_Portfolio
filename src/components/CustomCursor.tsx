"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 25, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25, mass: 0.5 });

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 25, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 25, mass: 0.3 });

  useEffect(() => {
    const checkTouch = () => {
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        setIsTouch(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target?.matches(
        'a, button, input, textarea, select, [role="button"], [data-cursor-interactive]'
      );
      setIsPointer(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("pointerover", handlePointerOver);

    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsVisible(true), 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring - gradient accent */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 56 : 28,
          height: isPointer ? 56 : 28,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 250, damping: 18 },
          height: { type: "spring", stiffness: 250, damping: 18 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "2px solid",
            borderColor: isPointer ? "#DC2626" : "#DC2626",
            background: isPointer
              ? "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.08))"
              : "transparent",
            boxShadow: isPointer
              ? "0 0 20px rgba(220,38,38,0.25), inset 0 0 20px rgba(220,38,38,0.05)"
              : "0 0 10px rgba(220,38,38,0.1)",
            transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
          }}
        />
        {isPointer && (
          <span
            className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: "#DC2626" }}
          >
            Click
          </span>
        )}
      </motion.div>

      {/* Inner dot - gradient */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#DC2626",
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 6px rgba(220,38,38,0.3)",
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
}
