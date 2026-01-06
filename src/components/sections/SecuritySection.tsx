"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Check, ShieldCheck, Fingerprint } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const securityFeatures = [
  {
    icon: Eye,
    title: "No PII captured",
    description: "We never read typed form values or personal user data",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Lock,
    title: "No screenshots",
    description: "End-user screens are never captured or transmitted",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Safe signals only",
    description: "We operate on screen IDs, anchor IDs, and validation flags",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Server,
    title: "Self-hosted option",
    description: "Deploy on your own infrastructure for maximum control",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const safeSignals = [
  "Screen ID / Route",
  "assistId anchors",
  "Validation codes",
  "Disabled/invalid flags",
  "Success state signals",
];

const enterpriseControls = [
  "Dev-only Mapping Mode (token-gated)",
  "Environment separation (staging vs prod)",
  "Audit logs for mapping changes",
  "Allowlisted domains and admin users",
  "Optional private deployment path",
];

export function SecuritySection() {
  return (
    <section id="security" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Security & Privacy"
          title="Built for fintech buyers"
          description="Privacy-first architecture designed to meet enterprise compliance requirements."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-secondary-100 hover:border-primary-200 hover:shadow-elevated transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Safe signals + Enterprise controls */}
          <div className="space-y-6">
            {/* Safe signals card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 rounded-2xl p-8 text-white shadow-2xl border border-secondary-700/50 relative overflow-hidden"
            >
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl" />

              {/* Shield icon */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30"
                >
                  <ShieldCheck className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Safe signals only
                  </h3>
                  <p className="text-sm text-secondary-400">
                    Minimal data, maximum functionality
                  </p>
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {safeSignals.map((signal, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                      <Check className="w-3.5 h-3.5 text-primary-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-secondary-200 group-hover:text-white transition-colors">{signal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Enterprise controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-secondary-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-secondary-900">Enterprise controls</h3>
              </div>
              <ul className="space-y-2">
                {enterpriseControls.map((control, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-secondary-600"
                  >
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {control}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
