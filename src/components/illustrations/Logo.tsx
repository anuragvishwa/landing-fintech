"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showText?: boolean;
}

export function Logo({ className, size = "md", animated = false, showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 5, scale: 1.05 },
  };

  const IconWrapper = animated ? motion.div : "div";
  const iconProps = animated
    ? {
        initial: "initial",
        whileHover: "hover",
        variants: iconVariants,
        transition: { type: "spring", stiffness: 300 },
      }
    : {};

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <IconWrapper
        {...iconProps}
        className={cn(
          "relative rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25",
          sizes[size].icon
        )}
      >
        {/* Layered logo design */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bottom layer - dashboard */}
          <path
            d="M4 10C4 8.89543 4.89543 8 6 8H26C27.1046 8 28 8.89543 28 10V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V10Z"
            fill="white"
            fillOpacity="0.2"
          />
          {/* Middle layer - spotlight circle */}
          <circle
            cx="16"
            cy="16"
            r="6"
            fill="white"
            fillOpacity="0.3"
          />
          {/* Top layer - cursor/pointer */}
          <path
            d="M16 6L20 12H12L16 6Z"
            fill="white"
            fillOpacity="0.9"
          />
          {/* Arrow indicating guidance */}
          <path
            d="M16 14V22M16 22L13 19M16 22L19 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent" />
      </IconWrapper>

      {showText && (
        <span className={cn("font-bold tracking-tight", sizes[size].text)}>
          <span className="text-secondary-900">Flex</span>
          <span className="text-primary-600">dash</span>
        </span>
      )}
    </div>
  );
}

// Animated logo for special uses
export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className={className}
    >
      <Logo animated size="lg" />
    </motion.div>
  );
}
