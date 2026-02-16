"use client";

import { motion } from "framer-motion";
import { Recycle } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function BCorpIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#243B35" />
      <text x="16" y="21" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontFamily="'Libre Baskerville', serif">B</text>
    </svg>
  );
}

export default function OurStandards() {
  return (
    <section className="bg-white" id="our-standards">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[2rem] bg-[#F0E8DD]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#2D5E4A]">More Than Just Meat</motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-bold leading-tight text-text-dark sm:text-5xl">Quality Is Our Standard</motion.h2>
              <motion.p variants={fadeUp} className="mt-5 max-w-md text-[16px] leading-relaxed text-text-muted">Discover proteins sourced from trusted ranchers and fisheries who share our commitment to humane practices, sustainability, and exceptional taste.</motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#F5F0EB] border border-border px-4 py-2.5">
                  <BCorpIcon />
                  <span className="text-sm font-semibold text-[#243B35]">Certified B Corp&reg;</span>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#F5F0EB] border border-border px-4 py-2.5">
                  <Recycle size={24} className="shrink-0 text-[#2D5E4A]" />
                  <span className="text-sm font-semibold text-[#2D5E4A]">100% Recyclable Packaging</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" as const }} className="relative min-h-[320px] lg:min-h-0">
              <img src={IMAGES.steakRosemary} alt="Close-up of marbled grass-fed steak with fresh herbs" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
