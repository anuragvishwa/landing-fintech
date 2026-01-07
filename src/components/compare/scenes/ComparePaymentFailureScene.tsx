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
  Bot,
  Sparkles,
} from "lucide-react";
import { SceneProps } from "@/lib/video/types";
import { CommandBar, AIOverlay, SuccessSparkles } from "../../video/shared";
import { ChatbotPanel } from "../ChatbotPanel";

// Steps for this scenario
const steps = [
  { label: "Check card status", icon: Eye },
  { label: "Update card details", icon: Edit },
  { label: "Retry payment", icon: RefreshCw },
];

// Traditional chatbot response
const CHATBOT_RESPONSE = `Payment failures can occur for several reasons. Here are the most common causes and how to resolve them:

1. Expired Card: Check if your card has expired. You can update your card details in Settings > Payment Methods.

2. Insufficient Funds: Ensure your account has sufficient balance to cover the payment amount.

3. Incorrect Card Details: Verify that the card number, expiration date, and CVV are entered correctly.

4. Bank Decline: Your bank may have declined the transaction. Contact your bank for more information.

5. Fraud Prevention: Some banks flag unusual transactions. You may need to authorize the payment with your bank.

To update your payment method:
- Go to Settings > Payment Methods
- Click "Edit" on the card you want to update
- Enter the new card details
- Click "Save" and try the payment again

If the issue persists, please contact our support team with your transaction ID.`;

export function ComparePaymentFailureScene({
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
      <div className="w-full max-w-7xl">
        {/* Labels row */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex items-center gap-2 px-4">
            <Bot className="w-5 h-5 text-secondary-400" />
            <span className="text-sm font-medium text-secondary-600">Traditional Chatbot</span>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium text-primary-600">Flexdash AI</span>
          </div>
        </div>

        {/* Main comparison grid */}
        <div className="grid grid-cols-2 gap-6 h-[500px]">
          {/* Left: Traditional Chatbot */}
          <ChatbotPanel
            sceneTime={sceneTime}
            userMessage="Why did my payment fail?"
            botResponse={CHATBOT_RESPONSE}
            userTypingStart={1000}
            userTypingDuration={2000}
            botTypingStart={3500}
            botTypingDuration={1500}
            botResponseStart={5000}
            botResponseDuration={5000}
            readingTimeSeconds={60}
            isSuccess={isSuccess}
          />

          {/* Right: Flexdash Interactive */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl border border-secondary-200 overflow-hidden relative h-full"
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
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "calc(100% - 52px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 text-sm">
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
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200"
                    >
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-800 text-sm">Payment Failed</p>
                        <p className="text-xs text-red-600">
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
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-800 text-sm">
                          Payment Successful!
                        </p>
                        <p className="text-xs text-green-600">
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
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    cardFixed
                      ? "border-green-300 bg-green-50/50"
                      : cardHighlighted
                        ? "border-primary-500 bg-primary-50"
                        : "border-red-300 bg-red-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-800 text-sm">
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
                        className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  {/* Card update form - shown during step 2 */}
                  <AnimatePresence>
                    {cardUpdating && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-secondary-200"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-secondary-500 block mb-1">
                              Expiry Date
                            </label>
                            <motion.div
                              animate={{
                                borderColor: ["#E5E7EB", "#3B82F6", "#22C55E"],
                              }}
                              transition={{ duration: 1.5 }}
                              className="px-2 py-1.5 border-2 rounded text-xs bg-white"
                            >
                              12/2027
                            </motion.div>
                          </div>
                          <div>
                            <label className="text-xs text-secondary-500 block mb-1">
                              CVV
                            </label>
                            <div className="px-2 py-1.5 border-2 border-secondary-200 rounded text-xs bg-white">
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
                  className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
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
                originX={200}
                originY={200}
              />
            </motion.div>
          </div>
        </div>

        {/* Status indicators row */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="px-4 text-sm text-secondary-500">
            {isSuccess ? (
              <span>User still reading instructions...</span>
            ) : sceneTime >= 10000 ? (
              <span>Reading documentation... ~{Math.max(0, Math.ceil((60000 - (sceneTime - 10000)) / 1000))}s remaining</span>
            ) : (
              <span>Estimated reading time: ~60 seconds</span>
            )}
          </div>
          <div className="px-4 text-sm">
            {isSuccess ? (
              <span className="text-green-600 font-medium">Task completed in ~12 seconds</span>
            ) : (
              <span className="text-primary-600">AI-guided execution in progress...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
