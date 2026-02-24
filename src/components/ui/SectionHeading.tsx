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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mx-auto max-w-3xl text-center ${className}`}
    >
      {label && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.1em] sm:text-sm ${
            light ? "text-white/70" : "text-[#005A73]"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-sans font-extrabold text-3xl leading-tight tracking-subheading sm:text-4xl ${
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
          style={{ lineHeight: 1.7 }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
