"use client";

import { motion } from "framer-motion";

const STATS = ["400k+ Members", "1B+ Meals Delivered", "70k+ 5-Star Reviews"];

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-2 text-[13px] font-medium text-[#6B6B6B]">
              {i > 0 && <span className="hidden text-border sm:inline">·</span>}
              {stat}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
