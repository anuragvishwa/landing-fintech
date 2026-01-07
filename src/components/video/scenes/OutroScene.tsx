"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { SceneProps } from "@/lib/video/types";

export function OutroScene({ sceneTime }: SceneProps) {
  const showCTA = sceneTime >= 0;
  const showLogo = sceneTime >= 2200;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-10">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showCTA ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h3 className="text-xl text-secondary-700">
            Ready to transform your billing workflow?
          </h3>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/30"
          >
            Book Demo
            <ArrowRight className="w-5 h-5" />
          </motion.div>
          <p className="text-sm text-secondary-400">
            No credit card required
          </p>
        </motion.div>

        {/* Logo fade */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={showLogo ? { opacity: 0.5 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 pt-4"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-secondary-400">
            Flexdash
          </span>
        </motion.div>
      </div>
    </div>
  );
}
