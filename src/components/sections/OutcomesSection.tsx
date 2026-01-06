"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, CheckCircle, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const stats = [
  {
    icon: TrendingDown,
    value: 40,
    suffix: "%",
    label: "Fewer 'how do I' tickets",
    description: "Drop in repetitive billing support questions",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: CheckCircle,
    value: 25,
    suffix: "%",
    label: "Higher setup completion",
    description: "More users finish billing onboarding",
    color: "from-blue-500 to-primary-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    value: 30,
    suffix: "%",
    label: "Lower AHT",
    description: "Reduced average handle time on billing tickets",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: HeadphonesIcon,
    value: 50,
    suffix: "%",
    label: "Fewer escalations",
    description: "Less tickets escalated to engineering",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function OutcomesSection() {
  return (
    <section className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-300 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Measurable Outcomes"
          title="Hours saved, results you can measure"
          description="Track these metrics in your first 2-4 weeks to prove value internally."
        />

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-secondary-200 hover:border-primary-200 hover:shadow-elevated transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              {/* Value */}
              <div className="mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl font-bold text-secondary-900"
                />
              </div>

              {/* Label */}
              <h3 className="font-semibold text-secondary-900 mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-secondary-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
