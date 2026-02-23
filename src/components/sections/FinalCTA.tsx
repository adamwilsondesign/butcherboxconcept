"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function FinalCTA() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#1B3A2D]" id="get-started">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Label */}
          <motion.span variants={fadeUp} className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/60">
            Ready When You Are
          </motion.span>

          {/* Headline — h1 56px Playfair */}
          <motion.h2 variants={fadeUp} className="mt-5 font-display text-[36px] font-bold leading-tight text-white sm:text-[48px] lg:text-[56px]">
            Ready to Taste the Difference?
          </motion.h2>

          {/* Pill button — white bg, green-dark text */}
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => openSignup()}
              className="rounded-pill bg-white px-10 py-4 text-[18px] font-semibold text-[#1B3A2D] transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
            >
              Get Started
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 text-[13px] text-white/50">
            Cancel or pause anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
