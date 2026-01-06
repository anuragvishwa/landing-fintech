"use client";

import { motion } from "framer-motion";
import { Plug, Check, X, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";

const preflightChecks = [
  { name: "API Key Valid", status: "success" },
  { name: "OAuth Scopes", status: "success" },
  { name: "Webhook URL", status: "error", message: "Endpoint not reachable" },
  { name: "Test Mode", status: "success" },
];

export function IntegrationPreflightMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Plug className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">Connect Stripe</h3>
              <span className="text-xs text-secondary-500">Preflight checklist</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {preflightChecks.map((check, index) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`p-3 rounded-lg flex items-center justify-between ${
                check.status === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  check.status === "success" ? "bg-green-500" : "bg-red-500"
                }`}>
                  {check.status === "success" ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div>
                  <span className={`text-sm font-medium ${
                    check.status === "success" ? "text-green-900" : "text-red-900"
                  }`}>
                    {check.name}
                  </span>
                  {check.message && (
                    <p className="text-xs text-red-600">{check.message}</p>
                  )}
                </div>
              </div>
              {check.status === "error" && (
                <button className="text-xs font-medium text-red-600 hover:text-red-800 flex items-center gap-1">
                  Fix
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          ))}

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex-1 py-2.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              disabled
              className="flex-1 py-2.5 bg-secondary-200 text-secondary-400 rounded-lg font-medium cursor-not-allowed"
            >
              Connect
            </motion.button>
          </div>
        </div>
      </div>

      {/* Flexdash tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -right-4 top-[180px] transform translate-x-full hidden lg:block"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium opacity-80">Integration Help</span>
          </div>
          <p className="text-sm">Your webhook URL returned 404. Check your server config.</p>
          <button className="mt-2 text-xs underline opacity-80 hover:opacity-100">
            View webhook docs →
          </button>
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
