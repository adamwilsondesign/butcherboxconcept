"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const CREDENTIALS = [
  "Certified B Corporation — highest standards of social and environmental impact",
  "No antibiotics or added hormones — ever. 200+ banned ingredients.",
  "100% recyclable packaging — shipped frozen in eco-friendly materials",
] as const;

export default function OurStandards() {
  return (
    <section className="bg-white" id="our-standards">
      <div className="mx-auto w-full max-w-7xl lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="relative min-h-[320px] lg:min-h-[520px]"
          >
            <img
              src={IMAGES.chickensField}
              alt="Free-range chickens on pasture"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          {/* Right: Headline + credentials */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center px-6 py-[120px] sm:px-12 lg:px-16"
          >
            <motion.span variants={fadeUp} className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#2D5A40]">
              Our Promise
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-display text-[40px] font-bold leading-[1.15] text-[#1A1A1A]">
              We Know Where Every Cut Comes From
            </motion.h2>

            <motion.ul variants={fadeUp} className="mt-10 space-y-6">
              {CREDENTIALS.map((cred) => (
                <li key={cred} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B3A2D]">
                    <Check size={12} className="text-white" />
                  </span>
                  <span className="text-[16px] leading-relaxed text-[#6B6B6B]">{cred}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
