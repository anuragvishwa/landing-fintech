"use client";

import { motion } from "framer-motion";
import { Code, MousePointer, Upload, Check, Key, Fingerprint } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: Code,
    title: "Install Flexdash SDK",
    description: "Add our SDK to your staging environment. Works with React, Vue, Angular, and vanilla JS.",
    time: "5 minutes",
    color: "from-blue-500 to-primary-600",
  },
  {
    number: "02",
    icon: Key,
    title: "Admin logs in normally",
    description: "Your team logs in with their existing SSO + MFA. We never need your credentials.",
    time: "SSO/MFA friendly",
    color: "from-purple-500 to-violet-600",
  },
  {
    number: "03",
    icon: MousePointer,
    title: "Turn on Mapping Mode",
    description: "Click on key billing elements: 'Add payment method', 'Tax settings', 'Export invoices'",
    time: "1-2 hours",
    color: "from-amber-500 to-orange-600",
  },
  {
    number: "04",
    icon: Upload,
    title: "Publish UI map",
    description: "Publish your versioned UI map. Flexdash starts guiding users immediately.",
    time: "Instant",
    color: "from-green-500 to-emerald-600",
  },
];

const bestPractices = [
  {
    title: "Add stable anchors in your design system",
    examples: [
      'data-assist-id="billing.tax.vat_id"',
      'data-assist-id="billing.invoices.export_csv"',
    ],
  },
];

export function OnboardingSection() {
  return (
    <section className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Easy Onboarding"
          title="How onboarding works (SSO/MFA friendly)"
          description="Get up and running within a day. No codebase understanding required."
        />

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-secondary-300 to-transparent z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-6 border border-secondary-200 hover:border-primary-200 hover:shadow-elevated transition-all duration-300 h-full z-10">
                {/* Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-600 mb-4">
                  {step.description}
                </p>

                {/* Time badge */}
                <div className="inline-flex items-center px-3 py-1 bg-secondary-100 rounded-full text-xs font-medium text-secondary-600">
                  {step.time}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Best practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 border border-secondary-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Best practice: Reduce drift further</h3>
                <p className="text-sm text-secondary-500">Add stable anchors in your design system</p>
              </div>
            </div>

            <div className="bg-secondary-900 rounded-xl p-4 font-mono text-sm">
              {bestPractices[0].examples.map((example, index) => (
                <div key={index} className="text-secondary-300">
                  <span className="text-green-400">{example}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
