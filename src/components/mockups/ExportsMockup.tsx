"use client";

import { motion } from "framer-motion";
import { Download, FileSpreadsheet, FileText, Check, ArrowRight } from "lucide-react";

const exportOptions = [
  { name: "CSV Export", icon: FileSpreadsheet, description: "For Excel/Sheets", recommended: true },
  { name: "PDF Export", icon: FileText, description: "For records" },
  { name: "QuickBooks", icon: FileSpreadsheet, description: "Accounting sync" },
];

export function ExportsMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <Download className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">Export Invoices</h3>
              <span className="text-xs text-secondary-500">Select export format</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {exportOptions.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                option.recommended
                  ? "border-primary-500 bg-primary-50"
                  : "border-secondary-200 hover:border-secondary-300"
              }`}
            >
              {option.recommended && (
                <div className="absolute -top-2 right-4 px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  option.recommended ? "bg-primary-100" : "bg-secondary-100"
                }`}>
                  <option.icon className={`w-5 h-5 ${option.recommended ? "text-primary-600" : "text-secondary-600"}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${option.recommended ? "text-primary-900" : "text-secondary-900"}`}>
                    {option.name}
                  </p>
                  <p className="text-xs text-secondary-500">{option.description}</p>
                </div>
                {option.recommended && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <Check className="w-5 h-5 text-primary-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Export button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full mt-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export 127 invoices
          </motion.button>
        </div>
      </div>

      {/* Flexdash tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-4 right-0 translate-y-full"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span className="text-xs font-medium opacity-80">Export Guide</span>
          </div>
          <p className="text-sm">CSV is best for accounting reconciliation with your workflow</p>
        </div>
        <div className="absolute left-4 top-0 -translate-y-2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
