"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useSignup } from "@/components/signup/SignupFlow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const { openSignup } = useSignup();
  return (
    <section className="relative h-[calc(100vh-104px)] overflow-hidden" id="hero" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://njfamily-images.s3.amazonaws.com/wp-content/uploads/2020/07/NJF_Family-BBQ-Covid-19.jpg"
          alt="ButcherBox premium meat spread"
          loading="eager"
          className="h-full w-full object-cover"
          style={{ transform: "scaleX(1)" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-45% to-[#FAF7F2]/10 lg:via-[#FAF7F2]/90 lg:via-40% lg:to-transparent" />
      <div className="absolute inset-0 bg-[#FAF7F2]/60 sm:bg-transparent" />

      {/* Content — vertically centred in left half */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl">
          {/* Headline — 64px, bold, dark green, max 2 lines */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="font-serif text-[48px] font-bold leading-[1.1] text-[#243B35] sm:text-[56px] lg:text-[64px]"
          >
            Restaurant-Quality Meat, Delivered Free.
          </motion.h1>

          {/* Subtext — single short line, max 10 words */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mt-5 text-[16px] text-[#6B6B6B]">
            Grass-fed, free-range, wild-caught — from farm to freezer.
          </motion.p>

          {/* Single CTA */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-8">
            <Button variant="primary" className="px-10 py-4 text-[13px]" onClick={() => openSignup()}>Get Started</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
