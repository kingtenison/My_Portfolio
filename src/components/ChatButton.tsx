"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [hasUnread, setHasUnread] = useState(true);
  
   return (
     <motion.button
       onClick={onClick}
       className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full
                  bg-gradient-to-r from-primary-start to-primary-end
                  border-2 border-gold
                  shadow-[0_8px_24px_rgba(30,58,95,0.4)]
                  hover:shadow-[0_12px_32px_rgba(212,175,55,0.5)]
                  transition-all duration-300 ease-out group"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       aria-label="Open chat assistant"
     >
      {/* Pulse animation for unread indicator */}
      {hasUnread && !isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gold/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Icon */}
      <motion.svg
        className="w-7 h-7 text-white relative z-10"
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
          className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        />
      )}
    </motion.button>
  );
}
