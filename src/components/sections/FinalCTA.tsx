"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function FinalCTA() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#243B35]" id="get-started">
      <div className="mx-auto w-full max-w-7xl px-6 py-[100px] sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-[40px] font-semibold leading-tight text-white">
            Ready to Taste the Difference?
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => openSignup()}
              className="rounded-md border-2 border-white px-10 py-4 text-[13px] font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-[#243B35]"
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
