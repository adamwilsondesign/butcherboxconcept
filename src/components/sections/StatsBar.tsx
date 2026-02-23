"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Premium Quality",
    description: "100% grass-fed beef, free-range chicken, heritage pork, and wild-caught seafood.",
  },
  {
    title: "Better Prices",
    description: "Up to 30% less than specialty grocery stores, delivered free to your door.",
  },
  {
    title: "Zero Hassle",
    description: "Ships frozen on your schedule. Skip, pause, or cancel anytime.",
  },
] as const;

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function StatsBar() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#243B35]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-12 lg:gap-12 lg:px-12 lg:py-14">
        {VALUES.map(({ title, description }) => (
          <motion.div key={title} variants={fadeUp} className="text-center">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
