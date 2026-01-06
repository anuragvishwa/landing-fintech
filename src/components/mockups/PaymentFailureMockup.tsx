"use client";

import { motion } from "framer-motion";
import { CreditCard, AlertTriangle, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";

export function PaymentFailureMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-red-900">Payment Failed</h3>
              <span className="text-xs text-red-600">Card ending in 4242</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Error details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 font-medium mb-2">
              Your card was declined
            </p>
            <p className="text-xs text-red-600">
              Error: Insufficient funds or card limit reached
            </p>
          </div>

          {/* Resolution steps */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-secondary-900">Resolution steps:</p>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg"
            >
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">1</div>
              <span className="text-sm text-secondary-700">Check your card balance</span>
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-3 bg-primary-50 border border-primary-200 rounded-lg"
            >
              <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-white">2</div>
              <span className="text-sm text-primary-700 font-medium">Update payment method</span>
              <ArrowRight className="w-4 h-4 text-primary-500 ml-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg opacity-50"
            >
              <div className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center text-xs font-bold text-secondary-500">3</div>
              <span className="text-sm text-secondary-500">Retry payment</span>
              <RefreshCw className="w-4 h-4 text-secondary-400 ml-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Flexdash tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 translate-y-full"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[220px]">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium opacity-80">Payment Help</span>
          </div>
          <p className="text-sm">Click &quot;Update payment method&quot; to add a new card</p>
        </div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
