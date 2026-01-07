"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Check,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  Edit,
  Navigation,
} from "lucide-react";
import { SceneProps } from "@/lib/video/types";
import { CommandBar, AIOverlay, SuccessSparkles } from "../shared";

// Steps for this scenario
const steps = [
  { label: "Check card status", icon: Eye },
  { label: "Update card details", icon: Edit },
  { label: "Retry payment", icon: RefreshCw },
];

export function PaymentFailureScene({
  sceneTime,
  phase,
  currentAction,
}: SceneProps) {
  // Phase detection
  const isTyping = currentAction?.id === "user-question";
  const showOptions = currentAction?.id === "show-options";
  const isSelecting = currentAction?.id === "selecting";
  const isScanning = currentAction?.id === "analyzing";
  const isBuilding = currentAction?.id === "generating-guidance";
  const isShowingSteps =
    currentAction?.id?.startsWith("reveal-step-") ||
    currentAction?.id === "show-diagnosis" ||
    phase === "executing" ||
    phase === "success";
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  // Typing animation
  const typingText = "Why did my payment fail?";
  const typingProgress = isTyping
    ? Math.min(1, (sceneTime - 1000) / 2000)
    : sceneTime > 3000
      ? 1
      : 0;
  const displayedText = typingText.slice(
    0,
    Math.floor(typingText.length * typingProgress)
  );

  // Build progress (5500-7000ms)
  const buildProgress = isBuilding
    ? Math.min(100, ((sceneTime - 5500) / 1500) * 100)
    : sceneTime >= 7000
      ? 100
      : 0;

  // Visible steps (staggered reveal starting at 7500ms)
  const visibleSteps =
    sceneTime < 7500
      ? 0
      : Math.min(steps.length, Math.floor((sceneTime - 7500) / 600) + 1);

  // Current executing step
  const getCurrentStep = () => {
    if (currentAction?.id === "execute-step-1") return 0;
    if (currentAction?.id === "execute-step-2") return 1;
    if (currentAction?.id === "execute-step-3") return 2;
    return -1;
  };
  const currentStepIndex = getCurrentStep();

  // Card states
  const cardHighlighted = currentStepIndex === 0 || currentStepIndex === 1;
  const cardUpdating = currentStepIndex === 1;
  const cardFixed = isSuccess || currentStepIndex === 2;
  const showNewExpiry = currentStepIndex >= 1;

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-4xl relative">
        {/* Full-screen mock app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl border border-secondary-200 overflow-hidden relative"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary-50 border-b border-secondary-200">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-secondary-400 bg-white px-3 py-1 rounded border border-secondary-200">
                billing.yourapp.com/payment-methods
              </span>
            </div>
          </div>

          {/* App content - Payment methods */}
          <div className="p-6 space-y-4 min-h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-secondary-900">
                Payment Methods
              </h3>
            </div>

            {/* Failed payment alert */}
            <AnimatePresence>
              {!cardFixed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200"
                >
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800">Payment Failed</p>
                    <p className="text-sm text-red-600">
                      Your last payment of $299.00 could not be processed
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success alert */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200"
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">
                      Payment Successful!
                    </p>
                    <p className="text-sm text-green-600">
                      $299.00 charged to card ending in 4242
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card */}
            <motion.div
              animate={
                cardHighlighted && !cardFixed
                  ? {
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(59,130,246,0)",
                        "0 0 0 4px rgba(59,130,246,0.3)",
                        "0 0 0 0 rgba(59,130,246,0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: cardHighlighted && !cardFixed ? Infinity : 0,
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                cardFixed
                  ? "border-green-300 bg-green-50/50"
                  : cardHighlighted
                    ? "border-primary-500 bg-primary-50"
                    : "border-red-300 bg-red-50/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-800">
                      •••• •••• •••• 4242
                    </p>
                    <p
                      className={`text-xs ${cardFixed ? "text-green-600" : "text-red-600"}`}
                    >
                      {cardFixed || showNewExpiry
                        ? "Expires 12/2027"
                        : "Expired 12/2023"}
                    </p>
                  </div>
                </div>
                {cardFixed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              {/* Card update form - shown during step 2 */}
              <AnimatePresence>
                {cardUpdating && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pt-4 border-t border-secondary-200"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-secondary-500 block mb-1">
                          Expiry Date
                        </label>
                        <motion.div
                          animate={{
                            borderColor: ["#E5E7EB", "#3B82F6", "#22C55E"],
                          }}
                          transition={{ duration: 1.5 }}
                          className="px-3 py-2 border-2 rounded text-sm bg-white"
                        >
                          12/2027
                        </motion.div>
                      </div>
                      <div>
                        <label className="text-xs text-secondary-500 block mb-1">
                          CVV
                        </label>
                        <div className="px-3 py-2 border-2 border-secondary-200 rounded text-sm bg-white">
                          •••
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action button */}
            <motion.button
              animate={
                currentStepIndex === 1 || currentStepIndex === 2
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{
                duration: 0.8,
                repeat: currentStepIndex === 1 || currentStepIndex === 2 ? Infinity : 0,
              }}
              className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isSuccess
                  ? "bg-green-500 text-white"
                  : currentStepIndex >= 1
                    ? "bg-primary-500 text-white"
                    : "bg-secondary-200 text-secondary-600"
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Payment Complete
                </>
              ) : currentStepIndex === 2 ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : currentStepIndex === 1 ? (
                <>
                  <Check className="w-4 h-4" />
                  Save & Retry
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Update Card
                </>
              )}
            </motion.button>
          </div>

          {/* Command bar overlay */}
          <CommandBar
            displayText={displayedText}
            isTyping={isTyping}
            showCursor={sceneTime % 1000 < 500}
            showOptions={showOptions}
            isSelecting={isSelecting}
            isAnalyzing={isScanning}
          />

          {/* AI overlays */}
          <AIOverlay
            isScanning={isScanning}
            isBuilding={isBuilding}
            buildProgress={buildProgress}
            showSteps={isShowingSteps}
            steps={steps}
            visibleSteps={visibleSteps}
            currentStepIndex={currentStepIndex}
            isExecuting={isExecuting}
            isSuccess={isSuccess}
          />

          {/* Success sparkles */}
          <SuccessSparkles
            isVisible={isSuccess}
            originX={400}
            originY={280}
          />
        </motion.div>
      </div>
    </div>
  );
}
