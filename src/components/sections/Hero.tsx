"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
    <section className="relative min-h-[calc(100vh-108px)] overflow-hidden" id="hero" aria-label="Hero">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://njfamily-images.s3.amazonaws.com/wp-content/uploads/2020/07/NJF_Family-BBQ-Covid-19.jpg"
          alt="ButcherBox premium meat spread"
          loading="eager"
          className="h-full w-full object-cover"
          style={{ transform: "scaleX(1)" }}
        />
      </div>

      {/* Gradient overlay — cream to transparent for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-40% to-[#FAF7F2]/10 lg:via-[#FAF7F2]/90 lg:via-35% lg:to-transparent" />
      <div className="absolute inset-0 bg-[#FAF7F2]/60 sm:bg-transparent" />

      <div className="relative mx-auto flex h-full min-h-[calc(100vh-108px)] max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl py-16 lg:py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-text-dark shadow-sm backdrop-blur-sm">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#D4A84B] text-[#D4A84B]" />
                ))}
              </span>
              Trusted by 2M+ households
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mt-6 font-serif text-3xl font-bold leading-[1.1] tracking-tight text-text-dark sm:text-4xl md:text-5xl lg:text-6xl">
            Restaurant-Quality
            <br />
            <span className="text-[#2D5E4A]">Meat &amp; Seafood,</span>
            <br />
            Delivered
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-6 max-w-md text-lg leading-relaxed text-text-muted">
            100% grass-fed beef, organic free-range chicken, wild-caught seafood — from trusted farms to your freezer. Free steak for a year when you join today.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" className="px-10 py-4 text-base" onClick={() => openSignup()}>
              Choose Your Plan — Starting at $179
            </Button>
            <Button variant="secondary" className="px-10 py-4 text-base" onClick={() => openSignup()}>
              Send a Gift Box
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-6 text-sm text-text-muted">
            Free shipping always&nbsp;&nbsp;·&nbsp;&nbsp;Skip or cancel anytime&nbsp;&nbsp;·&nbsp;&nbsp;100% satisfaction guarantee
          </motion.p>
        </div>
      </div>
    </section>
  );
}
