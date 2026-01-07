"use client";

import { motion } from "framer-motion";
import { Sparkles, Bot, Zap } from "lucide-react";
import { SceneProps } from "@/lib/video/types";

export function CompareIntroScene({ sceneTime }: SceneProps) {
  const showLogo = sceneTime >= 0;
  const showSubtitle = sceneTime >= 1500;
  const showComparison = sceneTime >= 2500;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          showLogo
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center justify-center gap-3"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
          Flexdash
        </span>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6 }}
        className="text-xl text-secondary-600"
      >
        Side-by-side comparison
      </motion.p>

      {/* Comparison icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showComparison ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-8 mt-4"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-secondary-400" />
          </div>
          <span className="text-sm text-secondary-500">Traditional</span>
        </div>

        <span className="text-2xl text-secondary-300">vs</span>

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-sm text-primary-600 font-medium">Flexdash</span>
        </div>
      </motion.div>
    </div>
  );
}
