"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Check, Navigation, Target, Layers, Bot, Sparkles } from "lucide-react";
import { SceneProps } from "@/lib/video/types";
import { CommandBar, AIOverlay, SuccessSparkles } from "../../video/shared";
import { ChatbotPanel } from "../ChatbotPanel";

// Steps for this scenario
const steps = [
  { label: "Go to Tax Settings", icon: Navigation },
  { label: "Click Add Tax Rule", icon: Target },
  { label: "Select jurisdiction & rate", icon: Layers },
];

// Tax form fields
const taxFields = [
  {
    id: "taxId",
    label: "Tax ID / VAT Number",
    placeholder: "Enter your Tax ID",
    value: "",
    filledValue: "EU372849501",
  },
  {
    id: "region",
    label: "Tax Region",
    placeholder: "Select region",
    value: "European Union",
    filledValue: "European Union",
  },
  {
    id: "rate",
    label: "Default Tax Rate",
    placeholder: "Enter rate",
    value: "20%",
    filledValue: "20%",
  },
  {
    id: "footer",
    label: "Invoice Footer",
    placeholder: "Add company registration",
    value: "",
    filledValue: "Reg. No: 12345678 | VAT: EU372849501",
  },
];

// Traditional chatbot response
const CHATBOT_RESPONSE = `To set up tax rules in your billing system, follow these steps:

1. Navigate to Settings in the main menu
2. Click on "Tax Configuration" under the Billing section
3. Click the "Add New Tax Rule" button
4. Select your tax jurisdiction from the dropdown (e.g., European Union, United States, etc.)
5. Enter your Tax ID or VAT number in the designated field
6. Set the default tax rate percentage
7. Optionally, add any invoice footer text for compliance
8. Click "Save Changes" to apply

Note: Make sure you have the correct tax identification numbers before proceeding. Tax rules will apply to all new invoices automatically.

If you need help with specific jurisdictions, please consult our documentation or contact support.`;

export function CompareTaxSetupScene({ sceneTime, phase, currentAction }: SceneProps) {
  // Phase detection from timing
  const isTyping = currentAction?.id === "user-question";
  const showOptions = currentAction?.id === "show-options";
  const isSelecting = currentAction?.id === "selecting";
  const isScanning = currentAction?.id === "analyzing";
  const isBuilding = currentAction?.id === "generating-guidance";
  const isShowingSteps =
    currentAction?.id?.startsWith("reveal-step-") ||
    phase === "executing" ||
    phase === "success";
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  // Typing animation
  const typingText = "How do I set up tax rules?";
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

  // Calculate visible steps (staggered reveal starting at 7000ms)
  const visibleSteps =
    sceneTime < 7000
      ? 0
      : Math.min(steps.length, Math.floor((sceneTime - 7000) / 600) + 1);

  // Current executing step
  const getCurrentStep = () => {
    if (currentAction?.id === "execute-step-1") return 0;
    if (currentAction?.id === "execute-step-2") return 1;
    if (currentAction?.id === "execute-step-3") return 2;
    return -1;
  };
  const currentStepIndex = getCurrentStep();

  // Which field is highlighted
  const getFieldHighlighted = (fieldId: string) => {
    if (currentStepIndex === 1 && fieldId === "taxId") return true;
    if (currentStepIndex === 2 && fieldId === "footer") return true;
    return false;
  };

  // Field value during execution
  const getFieldValue = (field: (typeof taxFields)[0]) => {
    if (isSuccess) return field.filledValue;
    if (currentStepIndex >= 1 && field.id === "taxId") return field.filledValue;
    if (currentStepIndex >= 2 && field.id === "footer") return field.filledValue;
    return field.value;
  };

  const getFieldValid = (field: (typeof taxFields)[0]) => {
    const value = getFieldValue(field);
    return value !== "";
  };

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
            userMessage="How do I set up tax rules?"
            botResponse={CHATBOT_RESPONSE}
            userTypingStart={1000}
            userTypingDuration={2000}
            botTypingStart={3500}
            botTypingDuration={1500}
            botResponseStart={5000}
            botResponseDuration={4000}
            readingTimeSeconds={45}
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
                    billing.yourapp.com/settings/tax
                  </span>
                </div>
              </div>

              {/* App content - Tax form */}
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "calc(100% - 52px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 text-sm">
                    Tax Configuration
                  </h3>
                </div>

                {/* Tax fields */}
                {taxFields.map((field) => {
                  const isHighlighted = getFieldHighlighted(field.id);
                  const isValid = getFieldValid(field);
                  const value = getFieldValue(field);

                  return (
                    <motion.div
                      key={field.id}
                      animate={
                        isHighlighted
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
                        repeat: isHighlighted ? Infinity : 0,
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                        isHighlighted
                          ? "border-primary-500 bg-primary-50"
                          : isValid
                            ? "border-green-300 bg-green-50/50"
                            : "border-secondary-200 bg-secondary-50/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-secondary-700">
                          {field.label}
                        </span>
                        {isValid && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div
                        className={`text-xs px-2 py-1.5 rounded border ${
                          value
                            ? "bg-white border-secondary-200 text-secondary-800"
                            : "bg-secondary-100 border-secondary-200 text-secondary-400"
                        }`}
                      >
                        {value || field.placeholder}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Save button */}
                <motion.button
                  animate={
                    currentStepIndex === 2 ? { scale: [1, 1.05, 1] } : {}
                  }
                  transition={{
                    duration: 0.8,
                    repeat: currentStepIndex === 2 ? Infinity : 0,
                  }}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                    isSuccess
                      ? "bg-green-500 text-white"
                      : currentStepIndex === 2
                        ? "bg-primary-500 text-white"
                        : "bg-secondary-200 text-secondary-600"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved Successfully
                    </>
                  ) : (
                    "Save Changes"
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

              {/* AI overlays - scanning, building, steps */}
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
            ) : sceneTime >= 9000 ? (
              <span>Reading documentation... ~{Math.max(0, Math.ceil((45000 - (sceneTime - 9000)) / 1000))}s remaining</span>
            ) : (
              <span>Estimated reading time: ~45 seconds</span>
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
