"use client";

import { motion } from "framer-motion";
import { ShieldCheck, DollarSign, Truck } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "100% grass-fed beef, free-range chicken, heritage pork, and wild-caught seafood — never factory farmed.",
  },
  {
    icon: DollarSign,
    title: "Better Prices",
    description: "Restaurant-quality proteins at up to 30% less than specialty grocery stores, delivered free.",
  },
  {
    icon: Truck,
    title: "Zero Hassle",
    description: "Ships frozen to your door on your schedule. Skip, pause, or cancel anytime — no commitments.",
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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-14 lg:gap-12 lg:px-12 lg:py-16">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 text-center sm:flex-col sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-12 sm:w-12">
              <Icon size={20} className="text-white/90" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white sm:mt-3 sm:text-lg">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:mt-2">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
