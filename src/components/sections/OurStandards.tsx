"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const CREDENTIALS = [
  "Certified B Corporation — meeting the highest standards of social and environmental impact",
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

          {/* Right: Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#2D5E4A]">
              Sourcing
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-3xl font-bold leading-tight text-text-dark sm:text-4xl lg:text-5xl">
              We Know Where Every Cut Comes From
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-[16px] leading-relaxed text-text-muted">
              Every product in your box is traceable to farms and fisheries that meet our strict standards for animal welfare, sustainability, and taste.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 space-y-4">
              {CREDENTIALS.map((cred) => (
                <li key={cred} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2D5E4A]">
                    <Check size={12} className="text-white" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-text-muted">{cred}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10">
              <a
                href="#"
                className="text-sm font-semibold text-[#2D5E4A] underline underline-offset-4 transition-colors hover:text-[#243B35]"
              >
                Learn more about our sourcing →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
