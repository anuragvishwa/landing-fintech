"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, Receipt, Clock, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Failed onboarding",
    description: "No payment method added, users drop off before completing setup",
    color: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Receipt,
    title: "Misconfigured taxes/invoices",
    description: "Wrong tax rules lead to compliance issues and manual corrections",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: HeadphonesIcon,
    title: "Support escalations",
    description: "Billing tickets delay cash collection and frustrate customers",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Clock,
    title: "Slow enterprise onboarding",
    description: "RBAC and approval flows block users who need billing access",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function WhyFintechSection() {
  return (
    <section id="why-fintech" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="The Problem"
          title="Billing UX confusion is expensive"
          description="When users get stuck in billing flows, the impact is immediate — and costly."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 border border-secondary-200 hover:border-secondary-300 hover:shadow-elevated transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${point.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <point.icon className={`w-6 h-6 ${point.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 border border-primary-200 rounded-full">
            <span className="text-primary-700 font-medium">
              Flexdash helps users complete the task <span className="font-bold">in the UI</span> instead of bouncing between chat, docs, and trial-and-error.
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
