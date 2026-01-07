"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuccessSparklesProps {
  isVisible: boolean;
  originX?: number;
  originY?: number;
}

export function SuccessSparkles({
  isVisible,
  originX = 200,
  originY = 150,
}: SuccessSparklesProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 40 + Math.random() * 60;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.cos(angle) * distance],
                  y: [0, Math.sin(angle) * distance],
                }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="absolute z-50 pointer-events-none"
                style={{ left: originX, top: originY }}
              >
                <Sparkles
                  className={`${i % 2 === 0 ? "w-4 h-4" : "w-3 h-3"} text-yellow-400`}
                />
              </motion.div>
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
}
