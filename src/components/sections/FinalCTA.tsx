"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";

export default function FinalCTA() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#1B4332]" id="get-started">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/60"
          >
            Ready When You Are
          </motion.span>

          {/* Headline — subtle text-shadow for depth */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-5 font-display text-[36px] font-semibold leading-tight tracking-heading text-white sm:text-[48px] lg:text-[56px]"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.2)" }}
          >
            Ready to Taste the Difference?
          </motion.h2>

          {/* Pill button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10"
          >
            <motion.button
              onClick={() => openSignup()}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-lg bg-white px-10 py-4 text-[18px] font-medium text-[#1B4332] transition-all duration-200 hover:bg-white/90"
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-5 text-[13px] text-white/50"
          >
            Cancel or pause anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
