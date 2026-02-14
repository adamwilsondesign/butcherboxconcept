"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const PRESS = [
  { name: "Good Housekeeping", width: "w-40" },
  { name: "Forbes", width: "w-28" },
  { name: "USA Today", width: "w-32" },
  { name: "NYT Cooking", width: "w-32" },
  { name: "TIME", width: "w-24" },
  { name: "Food & Wine", width: "w-32" },
] as const;

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
  visible: { transition: { staggerChildren: 0.08 } },
};

const logoReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function TrustBar() {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="Loved By The Press"
            heading="Trusted & Recognized"
            subtitle="Ranked among the best food subscription services by leading publications."
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        >
          {PRESS.map((pub) => (
            <motion.div
              key={pub.name}
              variants={logoReveal}
              className="group flex items-center justify-center rounded-xl bg-surface-warm px-6 py-8 transition-opacity duration-200 hover:opacity-70"
            >
              <span className="text-center font-serif text-sm font-bold tracking-wide text-text-muted/60 transition-colors duration-200 group-hover:text-text-muted sm:text-base">
                {pub.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
