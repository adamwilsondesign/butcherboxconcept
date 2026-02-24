"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  label?: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  label,
  subtitle,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mx-auto max-w-3xl text-center ${className}`}
    >
      {label && (
        <div className="mb-6 flex items-center justify-center gap-3">
          <span
            className={`block h-[2px] w-12 ${
              light ? "bg-white/30" : "bg-[#C8512B]"
            }`}
          />
          <span
            className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${
              light ? "text-white/70" : "text-[#C8512B]"
            }`}
          >
            {label}
          </span>
          <span
            className={`block h-[2px] w-12 ${
              light ? "bg-white/30" : "bg-[#C8512B]"
            }`}
          />
        </div>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-[#6B6B6B]"
          }`}
          style={{ lineHeight: 1.75 }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
