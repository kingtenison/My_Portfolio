"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right"
}: ButtonProps) => {
  // Size variants
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-8 py-3.5 text-base gap-2.5",
    lg: "px-10 py-4 text-lg gap-3",
    xl: "px-12 py-5 text-xl gap-3",
  };

  // Style variants
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-start to-primary-end
      bg-[length:200%_100%]
      hover:from-primary-start hover:to-gold
      text-white
      border-2 border-primary-start
      hover:border-gold
      shadow-[0_4px_12px_rgba(30,58,95,0.25)]
      hover:shadow-[0_8px_24px_rgba(212,175,55,0.35)]
    `,
    secondary: `
      bg-gradient-to-r from-gold to-gold
      bg-[length:200%_100%]
      hover:from-gold hover:to-primary-start
      text-primary-start
      border-2 border-gold
      hover:border-primary-start
      shadow-[0_4px_12px_rgba(212,175,55,0.25)]
      hover:shadow-[0_8px_24px_rgba(30,58,95,0.35)]
    `,
    outline: `
      bg-transparent
      text-primary-start
      border-2 border-primary-start
      hover:bg-primary-start hover:text-white
      hover:border-primary-start
      shadow-none
      hover:shadow-[0_4px_12px_rgba(30,58,95,0.2)]
    `,
    ghost: `
      bg-transparent
      text-white
      border-2 border-white/30
      hover:bg-card-bg/10 hover:border-white
      shadow-none
    `,
    gradient: `
      bg-gradient-to-r from-primary-start via-accent-purple to-gold
      bg-[length:200%_100%]
      hover:from-primary-start hover:via-accent-purple hover:to-gold
      text-white
      border-2 border-primary-start/30
      shadow-[0_4px_15px_rgba(40,184,213,0.3)]
      hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)]
      animate-gradient-x
    `,
  };

  // Animation variants
   const animationProps = {
     initial: { opacity: 0, y: 15 } as const,
     animate: { opacity: 1, y: 0 },
     transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
   };

  const hoverAnimation = !disabled ? {
    scale: 1.02,
    boxShadow: variant === "primary" 
      ? "0 8px 24px rgba(212, 175, 55, 0.4)"
      : variant === "secondary"
      ? "0 8px 24px rgba(30, 58, 95, 0.4)"
      : "0 4px 12px rgba(0, 0, 0, 0.15)",
    y: -2
  } : undefined;

  const tapAnimation = !disabled ? {
    scale: 0.98,
    y: 0
  } : undefined;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center justify-center
        ${sizeClasses[size]}
        font-cinzel font-semibold tracking-wider uppercase
        ${variantClasses[variant]}
        rounded-xl
        cursor-pointer
        transition-all duration-300 ease-out
        relative overflow-hidden
        group
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:shadow-none
        ${variant === "gradient" ? "animate-gradient-x" : ""}
        ${className}
      `}
      {...animationProps}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      style={{
        WebkitTapHighlightColor: "transparent"
      }}
    >
      {/* Subtle shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Glow effect for primary variant */}
      {variant === "primary" && (
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-gold/20 to-gold/20 opacity-0 group-hover:opacity-100 blur-md -z-10"
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Icon positioning */}
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0 transition-transform group-hover:-translate-x-1">
          {icon}
        </span>
      )}

      {/* Button text/content */}
      <span className="relative z-10">
        {children}
      </span>

      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0 transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}

      {/* Focus ring for accessibility */}
      <motion.div
        className="absolute inset-0 rounded-lg ring-2 ring-white/50 opacity-0"
        whileFocus={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default Button;