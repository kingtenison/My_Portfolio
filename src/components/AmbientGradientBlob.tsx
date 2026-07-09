"use client";

import { motion } from "framer-motion";

export default function AmbientGradientBlob() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, #0320fc 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        style={{
          background: "radial-gradient(circle, #03c2fc 0%, transparent 70%)",
          bottom: "-150px",
          right: "-150px",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-12"
        style={{
          background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[60px] opacity-10"
        style={{
          background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          bottom: "20%",
          left: "10%",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
