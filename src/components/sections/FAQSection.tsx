"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp } from "@/lib/animations";

const faqs = [
  {
    question: "Is this just a chatbot?",
    answer:
      "No. Chatbots answer in text. Flexdash guides users inside the UI and verifies progress. Instead of explaining what to do, we show users exactly where to click and confirm when the task is complete.",
  },
  {
    question: "Do you need our codebase?",
    answer:
      "No. Mapping Mode works on the rendered UI. Your team logs in to your app normally and uses our visual interface to identify and approve UI anchors. Code-first anchors (adding data-assist-id attributes) are optional for extra stability.",
  },
  {
    question: "Will this work behind SSO/MFA?",
    answer:
      "Yes. Because Mapping Mode is performed by your logged-in admin inside your actual application, it works with any authentication system — Okta, Azure AD, Google Workspace, custom SSO, or MFA. We never need your credentials.",
  },
  {
    question: "Will you read user financial data?",
    answer:
      "Flexdash can operate without reading typed values or business records. It uses safe UI-state signals and anchor IDs by default. We never capture PII, form field contents, or screenshots of user screens.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running within a day. Install the SDK (5 minutes), run Mapping Mode on your key billing screens (1-2 hours), configure your first few intents (30 minutes), and you're ready to test. Production rollout typically happens within the first week.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          description="Common questions from fintech teams evaluating Flexdash."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
