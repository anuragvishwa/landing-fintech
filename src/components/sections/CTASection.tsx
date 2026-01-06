"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh-gradient-dark opacity-50" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-3xl"
      />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-4 h-4 bg-primary-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 w-3 h-3 bg-primary-300 rounded-full opacity-30"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Ready to get started?
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Make billing setup self-serve —{" "}
            <span className="text-gradient-light">the way users wish it already was.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-secondary-300 mb-10 max-w-2xl mx-auto">
            Stop writing longer docs. Stop answering the same tickets.
            <br />
            Let Flexdash guide users inside your product and verify completion.
          </p>

          {/* CTA */}
          <a href="https://cal.com/anuragvishwa/ui-15" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-14 px-8 btn-glow group">
              Book a Demo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
