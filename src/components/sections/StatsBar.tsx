"use client";

import { motion } from "framer-motion";

const STATS = [
  { number: "400k+", label: "Active Members" },
  { number: "1B+", label: "Meals Delivered" },
  { number: "70k+", label: "5-Star Reviews" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function StatsBar() {
  return (
    <section className="bg-[#EDE8E1]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 sm:flex-row sm:gap-16 sm:px-8 lg:px-12"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <p className="font-display text-[40px] font-bold leading-none text-[#1B3A2D]">
              {stat.number}
            </p>
            <p className="mt-2 text-[14px] font-medium text-[#6B6B6B]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
