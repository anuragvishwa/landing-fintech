"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { type LucideIcon } from "lucide-react";

// Animation variants for steps list
const stepVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
      delay: i * 0.12,
    },
  }),
};

interface Step {
  label: string;
  icon: LucideIcon;
}

interface AIOverlayProps {
  isScanning: boolean;
  isBuilding: boolean;
  buildProgress: number;
  showSteps: boolean;
  steps: Step[];
  visibleSteps: number;
  currentStepIndex: number;
  isExecuting: boolean;
  isSuccess: boolean;
}

export function AIOverlay({
  isScanning,
  isBuilding,
  buildProgress,
  showSteps,
  steps,
  visibleSteps,
  currentStepIndex,
  isExecuting,
  isSuccess,
}: AIOverlayProps) {
  return (
    <>
      {/* Scanning overlay - purple sweep */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, 320, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              style={{ top: 60 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              className="absolute inset-0 bg-purple-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Building phase overlay - Generating guidance */}
      <AnimatePresence>
        {isBuilding && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-6 left-6 right-6 z-30"
          >
            <div className="bg-secondary-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-secondary-700">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full"
                />
                <span className="text-white text-sm font-medium">
                  Generating guidance
                </span>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-primary-400 text-sm"
                >
                  ...
                </motion.span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1 bg-secondary-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${buildProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating steps card */}
      <AnimatePresence>
        {showSteps && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            className="absolute top-12 right-4 z-25 w-64"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-secondary-200/50">
              <div className="flex items-center gap-2 mb-3 text-xs text-secondary-500">
                <Sparkles className="w-3 h-3 text-primary-500" />
                <span>Generated {steps.length}-step guidance</span>
              </div>
              <div className="space-y-2">
                {steps.map((step, i) => {
                  const StepIcon = step.icon;
                  const isVisible = i < visibleSteps || isExecuting || isSuccess;
                  const isCompleted = isSuccess || (isExecuting && i < currentStepIndex);
                  const isActive = isExecuting && i === currentStepIndex;

                  return (
                    <motion.div
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      variants={stepVariants}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary-50/80 border border-primary-200"
                          : isCompleted
                            ? "bg-green-50/50"
                            : "bg-secondary-50/50"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                              ? "bg-primary-500 text-white"
                              : "bg-secondary-200 text-secondary-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <StepIcon
                        className={`w-4 h-4 ${
                          isCompleted
                            ? "text-green-500"
                            : isActive
                              ? "text-primary-500"
                              : "text-secondary-400"
                        }`}
                      />
                      <span
                        className={`text-sm flex-1 ${
                          isCompleted
                            ? "text-green-700 line-through"
                            : isActive
                              ? "text-primary-700 font-medium"
                              : "text-secondary-600"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-primary-500"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
