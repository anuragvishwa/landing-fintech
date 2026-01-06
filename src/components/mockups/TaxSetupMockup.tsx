"use client";

import { motion } from "framer-motion";
import { Receipt, Check, AlertCircle, Lightbulb, Globe } from "lucide-react";

const taxFields = [
  { label: "Tax ID / VAT Number", value: "", valid: false, error: "Required for B2B invoicing", required: true },
  { label: "Tax Region", value: "European Union", valid: true },
  { label: "Default Tax Rate", value: "20%", valid: true },
  { label: "Invoice Footer", value: "", valid: false, error: "Add your company registration", suggestion: "Include VAT registration and company number" },
];

export function TaxSetupMockup() {
  const validFields = taxFields.filter(f => f.valid).length;
  const progress = Math.round((validFields / taxFields.length) * 100);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header with progress */}
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">Tax Configuration</h3>
              <span className="text-xs text-secondary-500">{progress}% complete</span>
            </div>
          </div>
          <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            />
          </div>
        </div>

        {/* Form fields */}
        <div className="p-6 space-y-4">
          {taxFields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${
                    field.valid
                      ? "border-green-300 bg-green-50/50"
                      : "border-amber-300 bg-amber-50/50"
                  }`}
                  placeholder={field.value === "" ? `Enter ${field.label.toLowerCase()}` : ""}
                />

                {/* Status icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {field.valid ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
                    >
                      <AlertCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Error/suggestion */}
              {!field.valid && (field.error || field.suggestion) && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-start gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-amber-700">{field.error || field.suggestion}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating helper */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -right-4 top-1/4 transform translate-x-full hidden lg:block"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[180px]">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium opacity-80">Tax Setup Help</span>
          </div>
          <p className="text-sm">2 fields need attention for compliant invoicing</p>
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
