"use client";

import { motion } from "framer-motion";
import { Award, Recycle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const BADGES = [
  {
    icon: Award,
    label: "B Corp Certified",
    placeholder: "B Corp badge",
    color: "#8EA88A",
  },
  {
    icon: Recycle,
    label: "100% Recyclable Packaging",
    placeholder: "Recyclable badge",
    color: "#A8BEC0",
  },
] as const;

export default function OurStandards() {
  return (
    <section className="bg-surface-warm" id="our-standards">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        {/* Warm beige card */}
        <div className="overflow-hidden rounded-[2rem] bg-[#F0E8DD]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ── Left: content ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-widest text-accent"
              >
                More Than Just Meat
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-4 font-serif text-4xl font-bold leading-tight text-text-dark sm:text-5xl"
              >
                Quality Is Our Standard
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-md text-[16px] leading-relaxed text-text-muted"
              >
                Discover proteins sourced from trusted ranchers and fisheries
                who share our commitment to humane practices, sustainability,
                and exceptional taste.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap gap-6"
              >
                {BADGES.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3.5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: badge.color }}
                    >
                      <badge.icon size={22} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold leading-snug text-text-dark">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: image placeholder ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="relative min-h-[320px] lg:min-h-0"
            >
              <div className="absolute inset-0 bg-[#C4A882]">
                <div className="flex h-full w-full items-center justify-center px-6">
                  <p className="max-w-[260px] text-center text-sm font-medium tracking-wide text-white/50">
                    Close-up of marbled grass-fed steak on wooden cutting board
                    with herbs
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
