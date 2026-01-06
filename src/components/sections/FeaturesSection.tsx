"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  HelpCircle,
  Lightbulb,
  Plug,
  HeadphonesIcon,
  RefreshCw,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer, expandOverlay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  BillingFormMockup,
  RBACBlockerMockup,
  TaxSetupMockup,
  IntegrationPreflightMockup,
  ExportsMockup,
  PaymentFailureMockup,
} from "@/components/mockups";

// Mockup components mapped by feature index
const featureMockups: Record<number, ReactNode> = {
  0: <BillingFormMockup />,
  1: <RBACBlockerMockup />,
  2: <TaxSetupMockup />,
  3: <IntegrationPreflightMockup />,
  4: <ExportsMockup />,
  5: <PaymentFailureMockup />,
};

const features = [
  {
    icon: FileCheck,
    title: "Billing Forms Copilot",
    shortDesc: "Highest ROI for conversions",
    fullDesc:
      "Rescue the highest-volume fintech tickets: 'I can't submit' and 'what should I fill?' Highlights missing required fields, explains validation errors in plain English, and guides the shortest path to 'Submit enabled'.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    examples: ["Highlights missing required fields", "Explains validation errors", "Guides minimum steps to submit"],
    hasMockup: true,
  },
  {
    icon: HelpCircle,
    title: "Blocked-State Debugger",
    shortDesc: "Why can't I do this?",
    fullDesc:
      "Most stuck moments are caused by missing prerequisites, permission limits, feature flags, or plan entitlements. Flexdash detects the block reason and guides users to resolve the blocker.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    examples: ["Detects missing prerequisites", "Shows permission limits", "Guides to the right fix"],
    hasMockup: true,
  },
  {
    icon: Lightbulb,
    title: "On-demand 'Show me' overlays",
    shortDesc: "Not a rigid product tour",
    fullDesc:
      "Users ask a question, Flexdash guides them on the current screen: spotlight highlight + arrow + tooltip. Works across multi-page flows and stays useful even when UI changes.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    examples: ["Spotlight exact elements", "Tooltips with next steps", "Works across all screens"],
    hasMockup: true,
  },
  {
    icon: Plug,
    title: "Integration Preflight",
    shortDesc: "OAuth & webhook troubleshooting",
    fullDesc:
      "For payment/finance integrations: guided OAuth scope checks, webhook setup checklist, required config detection, and clean handoff payload if it still fails.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    examples: ["Detect missing scopes", "Guide to config screen", "Clean handoff payloads"],
    hasMockup: true,
  },
  {
    icon: HeadphonesIcon,
    title: "Support handoff",
    shortDesc: "Actually helps agents",
    fullDesc:
      "If Flexdash can't fully resolve, it sends an internal payload containing screen context, which steps were attempted, blocked reason codes, and validation codes. No need for users to describe what happened.",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    examples: ["Screen context capture", "Steps attempted log", "Structured handoff payload"],
    hasMockup: true,
  },
  {
    icon: RefreshCw,
    title: "Drift detection + remap",
    shortDesc: "UI change alerts",
    fullDesc:
      "UI changes break tours and docs. Flexdash monitors for missing anchors, ambiguous anchors, and role/type changes. Then opens Mapping Mode directly on the broken screen to fix in minutes.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    examples: ["Critical anchor checks", "Missing element reports", "One-click remap"],
    hasMockup: true,
  },
];

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section id="features" className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="Fintech-Curated Features"
          title="What Flexdash does for billing teams"
          description="Six powerful features designed specifically for fintech billing workflows."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              onClick={() => setSelectedFeature(index)}
              className="cursor-pointer group"
            >
              <div
                className={cn(
                  "relative h-full p-6 rounded-2xl border border-secondary-200 bg-white",
                  "hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300",
                  "overflow-hidden"
                )}
              >
                {/* Gradient background on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    feature.bgColor
                  )}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                      feature.color
                    )}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {feature.shortDesc}
                  </p>

                  {/* Click to expand indicator */}
                  <div className="mt-4 flex items-center gap-1 text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Click to learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded Feature Modal/Overlay */}
        <AnimatePresence>
          {selectedFeature !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/60 backdrop-blur-md"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                variants={expandOverlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-white rounded-2xl shadow-2xl overflow-hidden",
                  features[selectedFeature].hasMockup ? "max-w-5xl w-full" : "max-w-lg w-full"
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    "p-6 bg-gradient-to-br text-white",
                    features[selectedFeature].color
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        {(() => {
                          const Icon = features[selectedFeature].icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {features[selectedFeature].title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {features[selectedFeature].shortDesc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className={cn(
                  "p-6",
                  features[selectedFeature].hasMockup && "grid md:grid-cols-2 gap-8"
                )}>
                  {/* Left: Text content */}
                  <div>
                    <p className="text-secondary-700 mb-6">
                      {features[selectedFeature].fullDesc}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-secondary-900">
                        Key capabilities:
                      </p>
                      <ul className="space-y-2">
                        {features[selectedFeature].examples.map((example, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-secondary-600"
                          >
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full bg-gradient-to-br",
                                features[selectedFeature].color
                              )}
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Mockup */}
                  {features[selectedFeature].hasMockup && featureMockups[selectedFeature] && (
                    <div className="flex items-center justify-center bg-secondary-50 rounded-xl p-4 min-h-[300px]">
                      <div className="transform scale-90 sm:scale-75 origin-center">
                        {featureMockups[selectedFeature]}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
