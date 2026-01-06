"use client";

import { motion } from "framer-motion";
import { Check, Zap, Building2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const pricingOptions = [
  {
    name: "Paid Pilot",
    duration: "30 days",
    description: "Start with your top 20 billing friction intents",
    features: [
      "SDK install support",
      "Mapping mode setup",
      "Drift guard basics",
      "Outcome report: ticket reduction + form completion",
    ],
    highlight: true,
    cta: "Start pilot",
    note: "Fixed-fee for easy procurement",
  },
  {
    name: "Platform + Bundle",
    duration: "Ongoing",
    description: "Predictable monthly spend with included resolutions",
    features: [
      "Monthly bundle of guided resolutions",
      "Overages priced per resolution",
      "Full feature access",
      "Priority support",
    ],
    highlight: false,
    cta: "Talk to sales",
    note: "Best for teams who want stable costs",
  },
  {
    name: "Usage-led",
    duration: "Ongoing",
    description: "Pay per verified resolution",
    features: [
      "Low base fee",
      "Pay per Ask → Show → Verify success",
      "Full feature access",
      "Scale as you grow",
    ],
    highlight: false,
    cta: "Talk to sales",
    note: "Best for smaller fintech SaaS teams",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Pricing"
          title="Simple, pilot-first pricing"
          description="Start with a paid pilot, then choose the model that fits your team."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pricingOptions.map((option, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                option.highlight
                  ? "border-primary-500 shadow-lg shadow-primary-500/10"
                  : "border-secondary-200 hover:border-secondary-300"
              }`}
            >
              {/* Highlight badge */}
              {option.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                  Recommended
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {option.highlight ? (
                    <Zap className="w-5 h-5 text-primary-500" />
                  ) : (
                    <Building2 className="w-5 h-5 text-secondary-500" />
                  )}
                  <h3 className="text-xl font-bold text-secondary-900">
                    {option.name}
                  </h3>
                </div>
                <div className="text-sm text-secondary-500 mb-2">
                  {option.duration}
                </div>
                <p className="text-secondary-600">
                  {option.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                  >
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      option.highlight ? "text-primary-500" : "text-green-500"
                    }`} />
                    <span className="text-sm text-secondary-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={option.highlight ? "default" : "outline"}
                className="w-full group"
              >
                {option.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Note */}
              <p className="mt-4 text-xs text-secondary-500 text-center">
                {option.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Free trial note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-secondary-200 rounded-full text-sm text-secondary-600">
            <span>💡</span>
            <span>
              <span className="font-medium">Free trial available:</span> 14 days with enough guided resolutions to see real patterns
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
