"use client";

import { motion } from "framer-motion";
import { Receipt, CreditCard, Shield, Download, Zap, Plug } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const scenarios = [
  {
    icon: Receipt,
    title: "Tax setup & invoice rules",
    description: "Users don't know which tax fields to fill or what invoice settings mean. Flexdash highlights the exact fields and explains \"what this impacts\" in 1–2 lines.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    number: "01",
  },
  {
    icon: CreditCard,
    title: "Payment method failures",
    description: "Cards fail, mandates aren't completed, or \"Save\" stays disabled. Flexdash pinpoints missing prerequisites and guides the minimum steps to enable submit.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    number: "02",
  },
  {
    icon: Shield,
    title: "Role-based billing settings",
    description: "Users can't access billing screens or export actions. Flexdash explains the missing permission and offers a clean \"Request access\" action.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    number: "03",
  },
  {
    icon: Download,
    title: "Exports & reconciliation",
    description: "Users can't find exports or don't know which export matches their accounting workflow. Flexdash points to the right export and confirms the action succeeded.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    number: "04",
  },
  {
    icon: Zap,
    title: "Plan/entitlement gating",
    description: "Users see a feature but it's disabled due to plan limits. Flexdash clearly states what's restricted and routes them to upgrade/contact-admin flows.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    number: "05",
  },
  {
    icon: Plug,
    title: "Integration troubleshooting",
    description: "Connections to Stripe, NetSuite, QuickBooks fail due to missing scopes/steps. Flexdash runs a preflight checklist and shows exactly what to fix.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    number: "06",
  },
];

export function ScenariosSection() {
  return (
    <section id="scenarios" className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-300 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="High-Impact Scenarios"
          title="The 6 highest-impact fintech scenarios"
          description="Real-time guidance for the billing flows that generate the most support tickets."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-6 border border-secondary-200 hover:border-primary-200 hover:shadow-elevated transition-all duration-300 h-full overflow-hidden">
                {/* Number badge */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-secondary-100 group-hover:text-primary-100 transition-colors">
                  {scenario.number}
                </div>

                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <scenario.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-lg font-semibold text-secondary-900 mb-3">
                  {scenario.title}
                </h3>
                <p className="relative z-10 text-sm text-secondary-600 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
