"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FintechLogosProps {
  className?: string;
  showLabels?: boolean;
}

// Simple SVG logos for fintech integrations
const logos = [
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
      </svg>
    ),
  },
  {
    name: "QuickBooks",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.25 17.25h-1.5v-1.5h-1.5v-1.5h1.5v-4.5h-1.5v-1.5h3v6h1.5v1.5h-1.5v1.5zm-4.5 0h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-6h-1.5v-1.5h3v7.5z" />
      </svg>
    ),
  },
  {
    name: "NetSuite",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Intercom",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 1C5.93 1 1 5.93 1 12v9c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-9c0-6.07-4.93-11-11-11zm-5 15.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6zm3 1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v8zm3 0c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v8zm3-1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6zm3 0c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5s.5.22.5.5v6z" />
      </svg>
    ),
  },
  {
    name: "Zendesk",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.5 2.5v14.09L2 21.5 11.5 2.5zm1 0L22 21.5l-9.5-4.91V2.5z" />
      </svg>
    ),
  },
  {
    name: "Segment",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function FintechLogos({ className, showLabels = false }: FintechLogosProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-6 lg:gap-10", className)}>
      {logos.map((logo, index) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="text-secondary-400 group-hover:text-primary-500 transition-colors">
            {logo.svg}
          </div>
          {showLabels && (
            <span className="text-xs text-secondary-500 group-hover:text-secondary-700 transition-colors">
              {logo.name}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
