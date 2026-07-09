"use client";

import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  isHovering: boolean;
  hoverTarget: HTMLElement | null;
}

interface MouseContextType extends MousePosition {
  ref: React.RefObject<HTMLDivElement | null>;
}

const MouseContext = createContext<MouseContextType>({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  isHovering: false,
  hoverTarget: null,
  ref: { current: null },
});

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isHovering: false,
    hoverTarget: null,
  });

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target?.matches(
        'a, button, input, textarea, select, [role="button"], [data-cursor-interactive]'
      );

      setMousePos({
        x,
        y,
        normalizedX: (x / w - 0.5) * 2,
        normalizedY: (y / h - 0.5) * 2,
        isHovering: isInteractive,
        hoverTarget: isInteractive ? target : null,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={{ ...mousePos, ref }}>
      <div ref={ref}>{children}</div>
    </MouseContext.Provider>
  );
}

export function useMousePosition() {
  return useContext(MouseContext);
}
