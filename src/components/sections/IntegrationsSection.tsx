"use client";

import { motion } from "framer-motion";
import { MessageSquare, BarChart3, CreditCard, Code } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// SVG Logo components
const IntercomLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#6AFDEF]">
    <path d="M12 1C5.93 1 1 5.93 1 12v9c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-9c0-6.07-4.93-11-11-11zm-5 15.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6zm3 1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v8zm3 0c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v8zm3-1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6zm3 0c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6z" />
  </svg>
);

const ZendeskLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#03363D]">
    <path d="M11.5 2.5v14.09L2 21.5 11.5 2.5zm1 0L22 21.5l-9.5-4.91V2.5z" />
  </svg>
);

const HelpScoutLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#1292EE]">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const SegmentLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#52BD95]">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
  </svg>
);

const RudderStackLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#4F46E5]">
    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18l5.45 2.73L12 9.64 6.55 6.91 12 4.18zM6 8.27l5 2.5v7.96l-5-2.5V8.27zm12 7.96l-5 2.5v-7.96l5-2.5v7.96z" />
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#635BFF]">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
  </svg>
);

const NetSuiteLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#1A1A1A]">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuickBooksLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#2CA01C]">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.25 17.25h-1.5v-1.5h-1.5v-1.5h1.5v-4.5h-1.5v-1.5h3v6h1.5v1.5h-1.5v1.5zm-4.5 0h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-6h-1.5v-1.5h3v7.5z" />
  </svg>
);

const integrationCategories = [
  {
    title: "Support & Chat",
    icon: MessageSquare,
    gradient: "from-blue-500 to-indigo-500",
    tools: [
      { name: "Intercom", Logo: IntercomLogo },
      { name: "Zendesk", Logo: ZendeskLogo },
      { name: "Help Scout", Logo: HelpScoutLogo },
    ],
    description: "Flexdash becomes your 'Show me' execution layer alongside your existing chatbot",
  },
  {
    title: "Analytics & Events",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
    tools: [
      { name: "Segment", Logo: SegmentLogo },
      { name: "RudderStack", Logo: RudderStackLogo },
      { name: "Custom", Logo: null },
    ],
    description: "Track guided resolutions, completion rates, and time-to-value metrics",
  },
  {
    title: "Fintech-specific",
    icon: CreditCard,
    gradient: "from-green-500 to-emerald-500",
    tools: [
      { name: "Stripe", Logo: StripeLogo },
      { name: "NetSuite", Logo: NetSuiteLogo },
      { name: "QuickBooks", Logo: QuickBooksLogo },
    ],
    description: "Preflight checks and troubleshooting for payment processor connections",
  },
];

export function IntegrationsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Integrations"
          title="Works with your existing stack"
          description="Flexdash integrates with your support, analytics, and fintech tools."
        />

        {/* Integration categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {integrationCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-6 border border-secondary-200 hover:border-primary-200 hover:shadow-elevated transition-all duration-300"
              >
                {/* Icon header */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <CategoryIcon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-secondary-900 text-lg mb-4">
                  {category.title}
                </h3>

                {/* Tool logos */}
                <div className="flex items-start gap-4 mb-5">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={toolIndex}
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-secondary-50 border border-secondary-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-soft group-hover:border-secondary-200 transition-all">
                        {tool.Logo ? (
                          <tool.Logo />
                        ) : (
                          <Code className="w-5 h-5 text-secondary-400" />
                        )}
                      </div>
                      <span className="text-[10px] text-secondary-500 font-medium">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* AI chatbot callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 border border-primary-200 rounded-full">
            <span className="text-primary-700 text-sm">
              Already have an AI chatbot? Flexdash becomes the <span className="font-semibold">&quot;Show me&quot; execution layer</span>
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
