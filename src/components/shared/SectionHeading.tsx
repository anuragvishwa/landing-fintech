"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  centered = true,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={cn(
        "mb-12 lg:mb-16",
        centered && "text-center max-w-3xl mx-auto",
        className
      )}
    >
      {badge && (
        <Badge
          variant={dark ? "dark" : "default"}
          className="mb-4"
        >
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
          dark ? "text-white" : "text-secondary-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg",
            dark ? "text-secondary-300" : "text-secondary-600"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
