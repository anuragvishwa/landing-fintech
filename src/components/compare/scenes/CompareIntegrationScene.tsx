"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plug,
  Check,
  X,
  Loader2,
  AlertTriangle,
  Key,
  Shield,
  Webhook,
  Copy,
  ExternalLink,
  Bot,
  Sparkles,
} from "lucide-react";
import { SceneProps } from "@/lib/video/types";
import { CommandBar, AIOverlay, SuccessSparkles } from "../../video/shared";
import { ChatbotPanel } from "../ChatbotPanel";

// Preflight checks
const checks = [
  { label: "API Key Valid", icon: Key },
  { label: "OAuth Scopes", icon: Shield },
  { label: "Webhook URL", icon: Webhook },
];

// Steps for fixing the issue
const steps = [
  { label: "Copy webhook URL", icon: Copy },
  { label: "Add to Stripe dashboard", icon: ExternalLink },
];

// Traditional chatbot response
const CHATBOT_RESPONSE = `To connect Stripe to your billing system, you'll need to complete the following steps:

1. Log in to your Stripe Dashboard at dashboard.stripe.com
2. Navigate to Developers > API Keys
3. Copy your Publishable Key and Secret Key
4. In our app, go to Settings > Integrations
5. Find Stripe in the list and click "Connect"
6. Paste your API keys in the designated fields
7. Configure your webhook URL:
   - In Stripe Dashboard, go to Developers > Webhooks
   - Click "Add endpoint"
   - Enter your webhook URL: https://api.yourapp.com/webhooks/stripe
   - Select the events you want to receive
8. Copy the Webhook Signing Secret and paste it in our app
9. Click "Save Configuration"
10. Run the preflight check to verify the connection

Common issues:
- Make sure you're using the correct API keys (test vs live)
- Webhook URL must be publicly accessible
- All required OAuth scopes must be enabled

For detailed documentation, visit our integration guide.`;

export function CompareIntegrationScene({
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
  const isRunningChecks =
    currentAction?.id === "check-api-key" ||
    currentAction?.id === "check-oauth" ||
    currentAction?.id === "check-webhook";
  const isShowingFix =
    currentAction?.id === "show-fix-guidance" ||
    currentAction?.id?.startsWith("reveal-fix-step-") ||
    currentAction?.id?.startsWith("execute-step-") ||
    currentAction?.id === "recheck-webhook" ||
    phase === "success";
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  // Typing animation
  const typingText = "How do I connect Stripe?";
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

  // Check status based on timeline
  const getCheckStatus = (index: number) => {
    if (isSuccess) return "pass";

    // API Key check (7000-8000ms)
    if (index === 0) {
      if (currentAction?.id === "check-api-key") return "checking";
      if (sceneTime >= 8000) return "pass";
      if (sceneTime >= 7000) return "checking";
      return "pending";
    }

    // OAuth check (8000-9000ms)
    if (index === 1) {
      if (currentAction?.id === "check-oauth") return "checking";
      if (sceneTime >= 9000) return "pass";
      if (sceneTime >= 8000) return "checking";
      return "pending";
    }

    // Webhook check (9000-10000ms) - initially fails, then passes after fix
    if (index === 2) {
      if (currentAction?.id === "check-webhook") return "checking";
      if (currentAction?.id === "recheck-webhook") return "checking";
      if (sceneTime >= 17000) return "pass"; // After recheck
      if (sceneTime >= 10000) return "fail"; // Initial fail
      if (sceneTime >= 9000) return "checking";
      return "pending";
    }

    return "pending";
  };

  // Fix step status
  const getFixStepStatus = (index: number) => {
    const stepNum = index + 1;
    if (isSuccess) return "completed";
    if (currentAction?.id === `execute-step-${stepNum}`) return "active";
    if (
      (stepNum === 1 && sceneTime >= 14500) ||
      (stepNum === 2 && sceneTime >= 17000)
    )
      return "completed";
    return "pending";
  };

  // Visible fix steps (staggered reveal starting at 10500ms)
  const visibleFixSteps =
    sceneTime < 10500
      ? 0
      : Math.min(steps.length, Math.floor((sceneTime - 10500) / 700) + 1);

  // Current executing step
  const getCurrentStep = () => {
    if (currentAction?.id === "execute-step-1") return 0;
    if (currentAction?.id === "execute-step-2") return 1;
    return -1;
  };
  const currentStepIndex = getCurrentStep();

  const webhookFixed = isSuccess || sceneTime >= 17000;
  const showFixOverlay = isShowingFix || sceneTime >= 10000;

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
            userMessage="How do I connect Stripe?"
            botResponse={CHATBOT_RESPONSE}
            userTypingStart={1000}
            userTypingDuration={2000}
            botTypingStart={3500}
            botTypingDuration={1500}
            botResponseStart={5000}
            botResponseDuration={6000}
            readingTimeSeconds={75}
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
                    billing.yourapp.com/integrations
                  </span>
                </div>
              </div>

              {/* App content - Integrations */}
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "calc(100% - 52px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Plug className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 text-sm">Integrations</h3>
                </div>

                {/* Stripe card */}
                <motion.div
                  animate={
                    isScanning || isBuilding
                      ? {
                          scale: [1, 1.01, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(124,58,237,0)",
                            "0 0 0 4px rgba(124,58,237,0.2)",
                            "0 0 0 0 rgba(124,58,237,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isScanning || isBuilding ? Infinity : 0,
                  }}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    isSuccess
                      ? "border-green-300 bg-green-50/50"
                      : "border-secondary-200 bg-secondary-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">Stripe</p>
                        <p className="text-xs text-secondary-500">
                          Payment processing
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isSuccess
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isSuccess ? "Connected" : "Configuring"}
                    </div>
                  </div>

                  {/* Preflight checks */}
                  <div className="space-y-1.5">
                    <p className="text-xs text-secondary-500 font-medium mb-1.5">
                      Preflight Checks
                    </p>
                    {checks.map((check, index) => {
                      const status = getCheckStatus(index);
                      const Icon = check.icon;

                      return (
                        <motion.div
                          key={index}
                          animate={
                            status === "checking"
                              ? {
                                  backgroundColor: ["#EFF6FF", "#DBEAFE", "#EFF6FF"],
                                }
                              : {}
                          }
                          transition={{
                            duration: 0.8,
                            repeat: status === "checking" ? Infinity : 0,
                          }}
                          className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                            status === "pass"
                              ? "bg-green-50"
                              : status === "fail"
                                ? "bg-red-50"
                                : status === "checking"
                                  ? "bg-blue-50"
                                  : "bg-secondary-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                status === "pass"
                                  ? "text-green-600"
                                  : status === "fail"
                                    ? "text-red-600"
                                    : "text-secondary-500"
                              }`}
                            />
                            <span className="text-xs text-secondary-700">
                              {check.label}
                            </span>
                          </div>
                          <div>
                            {status === "checking" && (
                              <Loader2 className="w-3.5 h-3.5 text-primary-500 animate-spin" />
                            )}
                            {status === "pass" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                              >
                                <Check className="w-2.5 h-2.5 text-white" />
                              </motion.div>
                            )}
                            {status === "fail" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
                              >
                                <X className="w-2.5 h-2.5 text-white" />
                              </motion.div>
                            )}
                            {status === "pending" && (
                              <div className="w-4 h-4 rounded-full bg-secondary-300" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Webhook URL field - shown when fix is needed */}
                  <AnimatePresence>
                    {(showFixOverlay || getCheckStatus(2) === "fail") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-2 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50"
                      >
                        <div className="flex items-center gap-2 text-amber-700 text-xs font-medium mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Webhook URL Required
                        </div>
                        <motion.div
                          animate={
                            currentStepIndex === 0 || currentStepIndex === 1
                              ? {
                                  borderColor: ["#FCD34D", "#3B82F6", "#22C55E"],
                                }
                              : {}
                          }
                          transition={{ duration: 1.5, repeat: isExecuting ? Infinity : 0 }}
                          className={`w-full px-2 py-1.5 text-xs rounded border-2 ${
                            webhookFixed
                              ? "border-green-400 bg-green-50"
                              : "border-amber-300 bg-white"
                          }`}
                        >
                          {webhookFixed || currentStepIndex >= 0
                            ? "https://api.yourapp.com/webhooks/stripe"
                            : ""}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Connect button */}
                  <motion.button
                    animate={
                      currentStepIndex === 1 || (isSuccess && sceneTime < 18500)
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: currentStepIndex === 1 ? Infinity : 0,
                    }}
                    className={`w-full mt-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                      isSuccess
                        ? "bg-green-500 text-white"
                        : currentStepIndex === 1
                          ? "bg-primary-500 text-white"
                          : "bg-secondary-200 text-secondary-600"
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        Connected
                      </>
                    ) : currentStepIndex === 1 ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Save Configuration"
                    )}
                  </motion.button>
                </motion.div>
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

              {/* AI overlays - scanning, building */}
              <AIOverlay
                isScanning={isScanning}
                isBuilding={isBuilding}
                buildProgress={buildProgress}
                showSteps={false}
                steps={[]}
                visibleSteps={0}
                currentStepIndex={-1}
                isExecuting={false}
                isSuccess={false}
              />

              {/* Custom floating panel for fix steps */}
              <AnimatePresence>
                {showFixOverlay && !isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-16 right-2 w-52 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-secondary-200 overflow-hidden z-20"
                  >
                    <div className="px-3 py-2 border-b border-secondary-100 bg-secondary-50">
                      <p className="text-xs font-medium text-secondary-800">
                        Issue Found
                      </p>
                    </div>

                    <div className="p-3 space-y-2">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 rounded-lg bg-amber-50 border border-amber-200"
                      >
                        <div className="flex items-center gap-1.5 text-amber-800 font-medium text-xs">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Webhook Missing
                        </div>
                      </motion.div>

                      {/* Fix steps */}
                      <div className="space-y-1.5">
                        <p className="text-xs text-secondary-500 font-medium">
                          Fix steps:
                        </p>
                        {steps.map((step, i) => {
                          const status = getFixStepStatus(i);
                          const isVisible = i < visibleFixSteps;
                          const StepIcon = step.icon;

                          if (!isVisible) return null;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-all ${
                                status === "active"
                                  ? "bg-primary-50 border border-primary-200"
                                  : status === "completed"
                                    ? "bg-green-50 border border-green-200"
                                    : "bg-secondary-50 border border-transparent"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  status === "completed"
                                    ? "bg-green-500 text-white"
                                    : status === "active"
                                      ? "bg-primary-500 text-white"
                                      : "bg-secondary-200 text-secondary-600"
                                }`}
                              >
                                {status === "completed" ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <StepIcon className="w-2.5 h-2.5" />
                                )}
                              </div>
                              <span
                                className={`text-xs flex-1 ${
                                  status === "active"
                                    ? "text-primary-700 font-medium"
                                    : status === "completed"
                                      ? "text-green-700"
                                      : "text-secondary-600"
                                }`}
                              >
                                {step.label}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success celebration overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-16 right-2 w-52 bg-green-50 border border-green-200 rounded-xl p-3 shadow-xl z-20"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-green-800 text-sm">
                          Connected!
                        </p>
                        <p className="text-xs text-green-600">
                          All checks passed
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success sparkles */}
              <SuccessSparkles isVisible={isSuccess} originX={200} originY={200} />
            </motion.div>
          </div>
        </div>

        {/* Status indicators row */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="px-4 text-sm text-secondary-500">
            {isSuccess ? (
              <span>User still reading instructions...</span>
            ) : sceneTime >= 11000 ? (
              <span>Reading documentation... ~{Math.max(0, Math.ceil((75000 - (sceneTime - 11000)) / 1000))}s remaining</span>
            ) : (
              <span>Estimated reading time: ~75 seconds</span>
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
