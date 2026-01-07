"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SceneProps } from "@/lib/video/types";

export function IntroScene({ sceneTime }: SceneProps) {
  const showLogo = sceneTime >= 0;

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Logo only */}
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
    </div>
  );
}
