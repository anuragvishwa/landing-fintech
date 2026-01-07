"use client";

import { motion, Variants } from "framer-motion";
import { TransitionType } from "@/lib/video/types";

const transitionVariants: Record<TransitionType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  morph: {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(5px)" },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

interface SceneTransitionProps {
  type: TransitionType;
  duration: number;
  children: React.ReactNode;
}

export function SceneTransition({
  type,
  duration,
  children,
}: SceneTransitionProps) {
  const variants = transitionVariants[type];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration: duration / 1000,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth video feel
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
