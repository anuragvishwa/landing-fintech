"use client";

import { motion } from "framer-motion";
import { Lock, Shield, User, ArrowRight, AlertCircle } from "lucide-react";

export function RBACBlockerMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900">Billing Settings</h3>
            <div className="flex items-center gap-2 text-xs text-secondary-500">
              <User className="w-3.5 h-3.5" />
              <span>john@company.com</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Disabled button */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0)",
                "0 0 0 4px rgba(239, 68, 68, 0.2)",
                "0 0 0 0 rgba(239, 68, 68, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <button
              disabled
              className="w-full py-3 px-4 bg-secondary-100 text-secondary-400 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Export All Invoices
            </button>
          </motion.div>

          {/* Permission info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">
                  Permission Required
                </p>
                <p className="text-xs text-amber-700 mb-3">
                  You need &quot;Billing Admin&quot; role to export invoices. Your current role: Viewer
                </p>
                <button className="text-xs font-medium text-amber-700 hover:text-amber-900 flex items-center gap-1 underline">
                  Request access from admin
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Current permissions */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Your permissions:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">View invoices</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">View reports</span>
              <span className="px-2 py-1 bg-secondary-100 text-secondary-400 text-xs rounded-full line-through">Export data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flexdash tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -left-4 top-1/3 transform -translate-x-full hidden lg:block"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium opacity-80">Access Blocked</span>
          </div>
          <p className="text-sm">This action requires &quot;Billing Admin&quot; role. Contact your admin.</p>
        </div>
        <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
