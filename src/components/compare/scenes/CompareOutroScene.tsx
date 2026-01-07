"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bot, Zap, Clock, Check } from "lucide-react";
import { SceneProps } from "@/lib/video/types";

export function CompareOutroScene({ sceneTime }: SceneProps) {
  const showStats = sceneTime >= 0;
  const showCTA = sceneTime >= 1500;
  const showLogo = sceneTime >= 3500;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Comparison stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showStats ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-12"
        >
          {/* Traditional chatbot */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-secondary-100 flex items-center justify-center mx-auto mb-3">
              <Bot className="w-8 h-8 text-secondary-400" />
            </div>
            <p className="text-sm text-secondary-500 mb-2">Traditional Chatbot</p>
            <div className="flex items-center justify-center gap-2 text-secondary-400">
              <Clock className="w-4 h-4" />
              <span className="text-lg font-semibold">~60 seconds</span>
            </div>
            <p className="text-xs text-secondary-400 mt-1">Reading + manual steps</p>
          </div>

          {/* VS */}
          <div className="text-3xl font-bold text-secondary-300">vs</div>

          {/* Flexdash */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-sm text-primary-600 font-medium mb-2">Flexdash AI</p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-lg font-semibold">~12 seconds</span>
            </div>
            <p className="text-xs text-green-600 mt-1">AI-guided execution</p>
          </div>
        </motion.div>

        {/* Time savings highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showStats ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block px-6 py-3 bg-gradient-to-r from-green-50 to-primary-50 rounded-full border border-green-200"
        >
          <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-primary-600 bg-clip-text text-transparent">
            5x faster task completion
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showCTA ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 pt-4"
        >
          <h3 className="text-xl text-secondary-700">
            Ready to transform your workflow?
          </h3>
          <motion.a
            href="https://cal.com/anuragvishwa/ui-15"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/30 cursor-pointer"
          >
            Book Demo
            <ArrowRight className="w-5 h-5" />
          </motion.a>
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
