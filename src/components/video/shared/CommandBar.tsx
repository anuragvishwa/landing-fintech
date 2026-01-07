"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, MessageSquare, Loader2, CornerDownLeft } from "lucide-react";

interface CommandBarProps {
  displayText: string;
  isTyping: boolean;
  showCursor: boolean;
  showOptions: boolean;
  isSelecting: boolean;
  isAnalyzing: boolean;
}

export function CommandBar({
  displayText,
  isTyping,
  showCursor,
  showOptions,
  isSelecting,
  isAnalyzing,
}: CommandBarProps) {
  const isVisible = isTyping || showOptions || isSelecting || isAnalyzing;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.5,
          }}
          className="absolute top-12 left-4 right-4 z-30"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-secondary-200/50">
            {/* Search input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-secondary-100/50 bg-white/50">
              <Search className="w-4 h-4 text-secondary-400" />
              <div className="flex-1 flex items-center">
                <span className="text-sm text-secondary-900">{displayText}</span>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    className="w-0.5 h-4 bg-secondary-400 ml-0.5"
                  />
                )}
              </div>
              <kbd className="px-2 py-1 text-[10px] bg-secondary-100/80 rounded-md text-secondary-500 font-medium border border-secondary-200/50 flex items-center gap-1">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
            </div>

            {/* Options UI */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-2 bg-white/30 space-y-2"
                >
                  {/* Primary option - Show me how */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: 0.05,
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 bg-primary-50/80 rounded-lg border border-primary-200/50 cursor-pointer hover:bg-primary-100/80"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-secondary-900">
                        Show me how
                      </div>
                      <div className="text-xs text-secondary-500">
                        Interactive step-by-step guidance
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-primary-600 font-semibold flex items-center gap-1"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Secondary option - Just tell me */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: 0.12,
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 bg-secondary-50/50 rounded-lg border border-secondary-200/30"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary-200 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-secondary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-secondary-700">
                        Just tell me
                      </div>
                      <div className="text-xs text-secondary-500">Text answer only</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selecting state */}
            <AnimatePresence>
              {isSelecting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-2 bg-white/30"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 0.98, 1.01, 1] }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-primary-500 bg-primary-50"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-primary-700">
                        Show me how
                      </div>
                      <div className="text-xs text-primary-500">
                        Starting interactive guidance...
                      </div>
                    </div>
                    <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
