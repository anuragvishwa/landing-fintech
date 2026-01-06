"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { Twitter, Linkedin, Github, Heart } from "lucide-react";

const footerLinks = {
  solutions: [
    { name: "For Billing SaaS", href: "#" },
    { name: "For Subscription Management", href: "#" },
    { name: "For Payment Ops", href: "#" },
    { name: "For Enterprise", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Security", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh-gradient-dark opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <Container className="relative z-10">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <Link href="/" className="inline-block mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10C4 8.89543 4.89543 8 6 8H26C27.1046 8 28 8.89543 28 10V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V10Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                      <circle cx="16" cy="16" r="6" fill="white" fillOpacity="0.3" />
                      <path d="M16 6L20 12H12L16 6Z" fill="white" fillOpacity="0.9" />
                      <path
                        d="M16 14V22M16 22L13 19M16 22L19 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent" />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-white">Flex</span>
                    <span className="text-primary-400">dash</span>
                  </span>
                </div>
              </Link>
              <p className="text-secondary-400 text-sm mb-6 max-w-xs leading-relaxed">
                On-demand UI support for fintech teams — guide users through billing, invoicing, and payment workflows.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-secondary-800/80 border border-secondary-700/50 flex items-center justify-center text-secondary-400 hover:text-primary-400 hover:border-primary-500/50 hover:bg-secondary-800 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-400 text-sm">
              © {new Date().getFullYear()} Flexdash. All rights reserved.
            </p>
            <p className="text-secondary-500 text-sm flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for fintech teams.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
