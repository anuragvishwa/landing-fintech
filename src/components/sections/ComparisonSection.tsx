"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Sparkles,
  Eye,
  Target,
  Clock,
  CheckCircle2,
  Loader2,
  MousePointer,
  Receipt,
  CreditCard,
  AlertCircle,
  Check,
  RefreshCw,
  FileText,
  User,
  Shield,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

// Dual-track animation phases for parallel animations
type ChatbotPhase = "idle" | "typing" | "text" | "scrolling" | "confused";
type FlexdashPhase = "idle" | "analyzing" | "spotlight" | "success";
type QuestionPhase = "idle" | "typing" | "done";

// Fintech-specific questions to cycle through
const questions = [
  "How do I reconcile a failed payment?",
  "Where do I update billing information?",
  "Why is my invoice export stuck?",
];

// Chatbot response text (long and confusing - fintech specific)
const chatbotResponses = [
  // Q1: Failed payment reconciliation
  `To reconcile a failed payment, follow these steps:

1. First, navigate to the Transactions section in your dashboard. Look for the "Payments" tab in the left sidebar.

2. Use the filters to find failed transactions. Set the status filter to "Failed" and select the appropriate date range.

3. Click on the specific transaction to view details. Check the error code - common codes include E001 (insufficient funds), E002 (card declined), E003 (network timeout).

4. If the payment gateway shows pending, wait 24-48 hours for automatic retry. For immediate action, contact your payment processor support.

5. To manually reconcile, click "Actions" and select "Retry Payment" or "Mark as Resolved" depending on the situation...`,

  // Q2: Update billing info
  `To update billing information, here's what you need to do:

1. Go to the Customers section from the main navigation. Click on the customer whose billing info needs updating.

2. In the customer profile, look for the "Billing" tab. It might be under "Settings" or "Account Details" depending on your setup.

3. Click "Edit Billing Details" - note that some changes may require admin approval.

4. Update the payment method, billing address, or tax information as needed. Make sure to save before navigating away.

5. If you're changing the primary payment method, the customer will receive an email notification...`,

  // Q3: Invoice export stuck
  `The invoice export might be stuck for several reasons:

1. Check your permissions first - go to Settings > Team > Your Role and verify you have "Export" permissions enabled.

2. Large exports (1000+ invoices) may take several minutes. Check the export queue in Reports > Exports > Pending.

3. Ensure the date range is valid - exports spanning more than 12 months may timeout.

4. Try a different format - CSV exports are faster than PDF or Excel formats.

5. Clear your browser cache and try again. Some users report issues with Safari; Chrome works best for exports...`,
];

// Differentiator cards data (fintech-focused)
const differentiators = [
  {
    icon: Eye,
    title: "See it, don't read it",
    description: "Visual highlights on billing UI beat walls of support text",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Receipt,
    title: "Billing-aware guidance",
    description: "Understands invoices, payments, and reconciliation flows",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Detects stuck states",
    description: "Knows when exports are blocked, payments failed, or permissions missing",
    gradient: "from-amber-500 to-orange-500",
  },
];

// Screen configurations for each question
type ScreenType = "reconciliation" | "billing" | "exports";

const screenConfigs: Array<{
  screenType: ScreenType;
  highlightTarget: string;
  successLabel: string;
}> = [
  {
    screenType: "reconciliation",
    highlightTarget: "reconcile-button",
    successLabel: "Reconciled!",
  },
  {
    screenType: "billing",
    highlightTarget: "edit-billing",
    successLabel: "Found it!",
  },
  {
    screenType: "exports",
    highlightTarget: "permission-fix",
    successLabel: "Fixed!",
  },
];

// ============ CHATBOT SIDE COMPONENT ============
function ChatbotSide({
  chatbotPhase,
  questionIndex,
}: {
  chatbotPhase: ChatbotPhase;
  questionIndex: number;
}) {
  const showTyping = chatbotPhase === "typing";
  const showText = ["text", "scrolling", "confused"].includes(chatbotPhase);
  const isScrolling = chatbotPhase === "scrolling";
  const isConfused = chatbotPhase === "confused";

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-secondary-500" />
        </div>
        <span className="text-sm font-medium text-secondary-600">Traditional Chatbot</span>
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-xl border border-secondary-200 shadow-soft overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-secondary-500">Billing Support Bot</span>
        </div>

        {/* Chat content */}
        <div className="h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden relative">
          <motion.div
            animate={isScrolling ? { y: -120 } : { y: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="p-4"
          >
            {/* Bot response */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-secondary-500" />
              </div>
              <div className="flex-1">
                {/* Typing indicator */}
                <AnimatePresence>
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 px-3 py-2 bg-secondary-100 rounded-lg w-16"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-secondary-400"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actual response */}
                <AnimatePresence>
                  {showText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-secondary-100 rounded-lg p-3">
                        <p className="text-xs text-secondary-700 whitespace-pre-line leading-relaxed">
                          {chatbotResponses[questionIndex]}
                        </p>
                      </div>

                      {/* Reading time indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1.5 mt-2 text-xs text-secondary-400"
                      >
                        <Clock className="w-3 h-3" />
                        <span>~3 min read</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <AnimatePresence>
            {showText && !isScrolling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-secondary-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confused user indicator */}
      <div className="h-8 sm:h-10 mt-2 sm:mt-3">
        <AnimatePresence>
          {isConfused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
                <div className="relative">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], y: [-5, -15] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute text-amber-500 text-xs"
                      style={{ left: i * 8 - 8 }}
                    >
                      ?
                    </motion.span>
                  ))}
                </div>
                <span className="text-xs text-amber-700 font-medium ml-4">Still reading...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============ FLEXDASH SIDE COMPONENT ============
function FlexdashSide({
  flexdashPhase,
  questionIndex,
}: {
  flexdashPhase: FlexdashPhase;
  questionIndex: number;
}) {
  const isAnalyzing = flexdashPhase === "analyzing";
  const showSpotlight = ["spotlight", "success"].includes(flexdashPhase);
  const isSuccess = flexdashPhase === "success";

  const config = screenConfigs[questionIndex];

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
        </div>
        <span className="text-sm font-medium text-primary-700">Flexdash</span>
      </div>

      {/* App mockup */}
      <div className="bg-white rounded-xl border border-secondary-200 shadow-soft overflow-hidden">
        {/* Window header */}
        <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white rounded text-xs text-secondary-400 border border-secondary-200">
              billing.yourapp.com
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="h-[200px] sm:h-[240px] md:h-[280px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 p-4"
            >
              {config.screenType === "reconciliation" && (
                <ReconciliationScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
              {config.screenType === "billing" && (
                <BillingSettingsScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
              {config.screenType === "exports" && (
                <InvoiceExportScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Analyzing overlay */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-200">
                  <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                  <span className="text-sm text-primary-700 font-medium">Analyzing screen...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success indicator */}
      <div className="h-8 sm:h-10 mt-2 sm:mt-3">
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Done in 3 seconds</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success sparkles */}
      <AnimatePresence>
        {isSuccess && (
          <>
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const distance = 30 + Math.random() * 40;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.cos(angle) * distance],
                    y: [0, Math.sin(angle) * distance],
                  }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="absolute z-50 pointer-events-none"
                  style={{ left: "50%", top: "50%" }}
                >
                  <Sparkles className={`${i % 2 === 0 ? "w-4 h-4" : "w-3 h-3"} text-yellow-400`} />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ SCREEN COMPONENTS FOR FLEXDASH ============

// Payment Reconciliation Screen
function ReconciliationScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-secondary-900">Failed Transactions</h3>
        <span className="text-xs text-secondary-400">3 items</span>
      </div>

      {/* Failed transaction row - highlighted */}
      <div className="relative">
        <AnimatePresence>
          {showSpotlight && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-2 bg-primary-500/10 rounded-xl border-2 border-primary-500 border-dashed z-10"
              />
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 0 12px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-1 rounded-xl"
              />
            </>
          )}
        </AnimatePresence>

        <div className={`p-3 rounded-lg border transition-all ${
          isSuccess ? "bg-green-50 border-green-300" : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}>
              <CreditCard className={`w-4 h-4 ${isSuccess ? "text-green-600" : "text-red-500"}`} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-secondary-900">TXN-4521 • $1,250.00</p>
              <p className={`text-[10px] ${isSuccess ? "text-green-600" : "text-red-500"}`}>
                {isSuccess ? "Reconciled successfully" : "Card declined - E002"}
              </p>
            </div>

            {/* Reconcile button - spotlighted */}
            <div className="relative">
              <AnimatePresence>
                {showSpotlight && !isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                  >
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs rounded shadow-lg">
                      <MousePointer className="w-3 h-3" />
                      Click here
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSuccess
                  ? "bg-green-500 text-white"
                  : "bg-primary-500 text-white"
              }`}>
                {isSuccess ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Done
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Reconcile
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other transactions */}
      {[
        { id: "TXN-4520", amount: "$890.00", status: "Failed" },
        { id: "TXN-4519", amount: "$2,100.00", status: "Pending" },
      ].map((txn, i) => (
        <div key={i} className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-secondary-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-secondary-700">{txn.id} • {txn.amount}</p>
              <p className={`text-[10px] ${
                txn.status === "Failed" ? "text-red-500" : "text-yellow-600"
              }`}>{txn.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Customer Billing Settings Screen
function BillingSettingsScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="flex gap-4 h-full">
      {/* Sidebar */}
      <div className="w-14 space-y-2 flex-shrink-0">
        <div className="w-full h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-400" />
        </div>
        <div className="w-full h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-secondary-400" />
        </div>

        {/* Billing button - highlighted */}
        <div className="relative">
          <AnimatePresence>
            {showSpotlight && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -inset-1.5 rounded-lg border-2 border-primary-500 border-dashed"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-0.5 rounded-lg"
                />
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap z-20"
                >
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs rounded shadow-lg">
                    <MousePointer className="w-3 h-3" />
                    Edit Billing
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className={`w-full h-10 rounded-lg flex items-center justify-center transition-all ${
            showSpotlight ? "bg-primary-100 border-2 border-primary-500" : isSuccess ? "bg-green-100" : "bg-secondary-100"
          }`}>
            <CreditCard className={`w-4 h-4 ${
              showSpotlight ? "text-primary-600" : isSuccess ? "text-green-600" : "text-secondary-400"
            }`} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-3">
        <h3 className="text-sm font-semibold text-secondary-900">Customer: Acme Corp</h3>

        <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
          <p className="text-[10px] text-secondary-500 mb-1">Current Plan</p>
          <p className="text-sm font-medium text-secondary-900">Enterprise • $499/mo</p>
        </div>

        <div className={`p-3 rounded-lg border transition-all ${
          isSuccess ? "bg-green-50 border-green-300" : "bg-secondary-50 border-secondary-100"
        }`}>
          <p className="text-[10px] text-secondary-500 mb-1">Payment Method</p>
          <div className="flex items-center gap-2">
            <CreditCard className={`w-4 h-4 ${isSuccess ? "text-green-600" : "text-secondary-400"}`} />
            <p className="text-sm text-secondary-700">•••• 4242</p>
            {isSuccess && <Check className="w-4 h-4 text-green-500 ml-auto" />}
          </div>
        </div>

        <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
          <p className="text-[10px] text-secondary-500 mb-1">Next Invoice</p>
          <p className="text-sm text-secondary-700">Jan 15, 2025 • $499.00</p>
        </div>
      </div>
    </div>
  );
}

// Invoice Export Screen
function InvoiceExportScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-secondary-900">Invoice Exports</h3>
        <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          isSuccess
            ? "bg-green-500 text-white"
            : "bg-secondary-200 text-secondary-400 cursor-not-allowed"
        }`} disabled={!isSuccess}>
          {isSuccess ? (
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" />
              Export CSV
            </span>
          ) : (
            "Export CSV"
          )}
        </button>
      </div>

      {/* Permission warning - highlighted */}
      <div className="relative">
        <AnimatePresence>
          {showSpotlight && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-2 bg-red-500/10 rounded-xl border-2 border-red-400 border-dashed z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-0 z-20"
              >
                <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-[10px] rounded shadow-lg">
                  <AlertCircle className="w-3 h-3" />
                  Missing permission
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className={`p-3 rounded-lg border transition-all ${
          isSuccess
            ? "bg-green-50 border-green-300"
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Shield className="w-5 h-5 text-amber-500" />
            )}
            <div className="flex-1">
              <p className={`text-xs font-medium ${isSuccess ? "text-green-800" : "text-amber-800"}`}>
                {isSuccess ? "Permission Granted" : "Export Permission Required"}
              </p>
              <p className={`text-[10px] ${isSuccess ? "text-green-600" : "text-amber-600"}`}>
                {isSuccess
                  ? "You now have export access"
                  : "Contact admin for \"Billing Export\" role"}
              </p>
            </div>
            {!isSuccess && (
              <button className="px-2 py-1 text-[10px] bg-amber-100 text-amber-700 rounded font-medium">
                Request
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Invoice table */}
      <div className="space-y-2">
        {[
          { id: "#INV-1234", customer: "Acme Corp", amount: "$1,250" },
          { id: "#INV-1235", customer: "TechStart", amount: "$890" },
          { id: "#INV-1236", customer: "DataFlow", amount: "$2,100" },
        ].map((invoice, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 bg-secondary-50 rounded-lg border border-secondary-100">
            <div className={`w-4 h-4 rounded border ${
              isSuccess ? "border-green-400 bg-green-100" : "border-secondary-300 bg-white"
            }`}>
              {isSuccess && <Check className="w-3 h-3 text-green-500" />}
            </div>
            <Receipt className="w-3.5 h-3.5 text-secondary-400" />
            <span className="text-xs font-medium text-secondary-700 flex-1">{invoice.id}</span>
            <span className="text-xs text-secondary-500">{invoice.customer}</span>
            <span className="text-xs font-medium text-secondary-700">{invoice.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export function ComparisonSection() {
  // Dual-track state machine for parallel animations
  const [questionPhase, setQuestionPhase] = useState<QuestionPhase>("idle");
  const [chatbotPhase, setChatbotPhase] = useState<ChatbotPhase>("idle");
  const [flexdashPhase, setFlexdashPhase] = useState<FlexdashPhase>("idle");
  const [showComparison, setShowComparison] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState("");
  const hasStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Helper to manage timeouts
  const scheduleTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Clear all scheduled timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Main animation orchestrator
  const runDemoLoop = useCallback(() => {
    const question = questions[questionIndex];

    clearAllTimeouts();

    // Reset all states
    setChatbotPhase("idle");
    setFlexdashPhase("idle");
    setShowComparison(false);
    setDisplayQuestion("");
    setQuestionPhase("typing");

    // Phase 1: Type the question
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayQuestion(question.slice(0, charIndex));
      if (charIndex >= question.length) {
        clearInterval(typeInterval);
        setQuestionPhase("done");

        // Start BOTH animation tracks in parallel
        scheduleTimeout(() => {
          // CHATBOT TRACK
          setChatbotPhase("typing");
          scheduleTimeout(() => setChatbotPhase("text"), 1000);
          scheduleTimeout(() => setChatbotPhase("scrolling"), 2500);
          scheduleTimeout(() => setChatbotPhase("confused"), 4000);

          // FLEXDASH TRACK
          scheduleTimeout(() => setFlexdashPhase("analyzing"), 500);
          scheduleTimeout(() => setFlexdashPhase("spotlight"), 1500);
          scheduleTimeout(() => setFlexdashPhase("success"), 3000);

          // COMPARISON & RESET
          scheduleTimeout(() => setShowComparison(true), 4500);

          scheduleTimeout(() => {
            setChatbotPhase("idle");
            setFlexdashPhase("idle");
            setShowComparison(false);
            setQuestionPhase("idle");
            setQuestionIndex((prev) => (prev + 1) % questions.length);
          }, 7000);
        }, 500);
      }
    }, 60);

    timeoutsRef.current.push(typeInterval as unknown as NodeJS.Timeout);
  }, [questionIndex, scheduleTimeout, clearAllTimeouts]);

  // Restart loop when idle
  useEffect(() => {
    if (questionPhase === "idle" && hasStartedRef.current) {
      const timer = setTimeout(() => {
        runDemoLoop();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [questionPhase, runDemoLoop]);

  // Initial start
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timer = setTimeout(() => {
      runDemoLoop();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  return (
    <section className="pt-8 pb-20 lg:pb-28 bg-gradient-to-b from-white to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-300 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          badge="Why Flexdash?"
          title="See the difference instantly"
          description="While chatbots make users read through billing guides, Flexdash shows them exactly where to click."
        />

        {/* Shared question display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-white rounded-xl border border-secondary-200 shadow-soft p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-secondary-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-secondary-500 mb-0.5">User asks:</p>
                <p className="text-sm font-medium text-secondary-900 min-h-[20px]">
                  {displayQuestion}
                  {questionPhase === "typing" && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-secondary-400 ml-0.5"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <ChatbotSide chatbotPhase={chatbotPhase} questionIndex={questionIndex} />
          <FlexdashSide flexdashPhase={flexdashPhase} questionIndex={questionIndex} />
        </motion.div>

        {/* Comparison result */}
        <div className="h-12 sm:h-16 mb-8 md:mb-12 flex items-center justify-center">
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary-50 rounded-full border border-primary-200">
                  <span className="text-secondary-500 line-through">Minutes of reading</span>
                  <span className="text-secondary-300">vs</span>
                  <span className="text-primary-700 font-semibold">3 seconds to done</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Three differentiator cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-secondary-100 h-full hover:shadow-elevated hover:border-primary-200 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
