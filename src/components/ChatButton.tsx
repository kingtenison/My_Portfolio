"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [hasUnread] = useState(true);

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#F5F5F0] border border-[#E5E7EB] hover:border-[#DC2626] transition-colors duration-100 group"
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open chat assistant"
    >
      {/* Pulse ring */}
      {hasUnread && !isOpen && (
        <motion.div
          className="absolute inset-0 border border-[#DC2626] opacity-40"
          style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Icon */}
      <motion.svg
        className="w-6 h-6 sm:w-7 sm:h-7 text-[#6B7280] group-hover:text-[#DC2626] transition-colors duration-100 relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        )}
      </motion.svg>

      {/* Notification dot */}
      {hasUnread && !isOpen && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 border border-[#DC2626]"
          style={{ clipPath: "polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <div className="w-full h-full bg-[#DC2626]" />
        </motion.div>
      )}
    </motion.button>
  );
}
