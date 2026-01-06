"use client";

import { motion } from "framer-motion";
import { ArrowRight, Receipt, CreditCard, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/Container";
import { InteractiveHeroMockup } from "@/components/illustrations/InteractiveHeroMockup";
import { FintechLogos } from "@/components/illustrations/FintechLogos";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

const builtFor = [
  { icon: Receipt, label: "Billing & Invoicing SaaS" },
  { icon: CreditCard, label: "Subscription Management" },
  { icon: DollarSign, label: "Payment Ops & Reconciliation" },
  { icon: Building2, label: "Admin-heavy Fintech Products" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-mesh-gradient" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary-300 rounded-full opacity-40"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8 sm:py-12 lg:py-20">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass-card px-4 py-2">
                <Receipt className="w-3.5 h-3.5 mr-2 text-primary-500" />
                For Fintech & Billing Teams
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 tracking-tight mb-6"
            >
              Stop billing setup{" "}
              <span className="text-gradient">drop-offs.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-secondary-600 mb-6 max-w-xl mx-auto lg:mx-0"
            >
              Flexdash answers questions by{" "}
              <span className="font-medium text-secondary-900">showing users exactly what to click and fill</span> — and verifies completion.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <a href="https://cal.com/anuragvishwa/ui-15" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 btn-glow group">
                  Book a Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            {/* Built for */}
            <motion.div variants={fadeInUp}>
              <p className="text-sm text-secondary-500 mb-4">
                Built for:
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {builtFor.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-secondary-200 text-sm text-secondary-700"
                  >
                    <item.icon className="w-4 h-4 text-primary-500" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Mockup */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="relative"
          >
            <InteractiveHeroMockup />
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center pb-8"
        >
          <p className="text-sm text-secondary-500 mb-4">
            Integrates with your existing tools
          </p>
          <FintechLogos showLabels className="justify-center" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-secondary-300 rounded-full flex justify-center backdrop-blur-sm bg-white/30"
          >
            <motion.div className="w-1.5 h-3 bg-secondary-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
