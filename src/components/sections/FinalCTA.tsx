"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function FinalCTA() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#243B35]" id="get-started">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Ready to Start?
          </motion.p>

          <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Taste<br />the Difference?
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Join 400,000+ members enjoying restaurant-quality meat at home. Free steak for a year when you start today.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => openSignup()}
              className="rounded-lg bg-white px-12 py-4 text-base font-bold text-[#243B35] shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl"
            >
              Choose Your Plan — Starting at $179
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-sm text-white/50">
            Cancel or pause anytime.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-white/40">
            Free shipping&nbsp;&nbsp;·&nbsp;&nbsp;100% guarantee&nbsp;&nbsp;·&nbsp;&nbsp;No commitments
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
