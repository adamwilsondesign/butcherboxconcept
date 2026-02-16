"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "400K+", label: "Subscribers" },
  { value: "1B+", label: "Better Meals Sent" },
  { value: "70K+", label: "Five-Star Reviews" },
];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#243B35]"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm font-medium text-white sm:text-base">
          {STATS.map((stat, i) => (
            <span key={stat.label} className="flex items-center gap-2">
              {i > 0 && <span className="hidden text-white/30 sm:inline">|</span>}
              <span className="font-bold">{stat.value}</span>
              <span className="text-white/70">{stat.label}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
