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
    <section className="relative h-[calc(100vh-116px)] max-h-[900px] overflow-hidden" id="hero" aria-label="Hero">
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 via-40% to-[#FAF7F2]/10 lg:via-[#FAF7F2]/90 lg:via-35% lg:to-transparent" />
      <div className="absolute inset-0 bg-[#FAF7F2]/60 sm:bg-transparent" />

      {/* Content — vertically centred */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-2xl">
          {/* Star badge */}
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

          {/* Headline — dominant size */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-5 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-text-dark sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Restaurant-Quality Meals,<br />
            <span className="text-[#2D5E4A]">Without the Restaurant Price.</span>
          </motion.h1>

          {/* Short subtitle — one line */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-4 text-lg text-text-muted lg:text-xl">
            Grass-fed beef, free-range chicken, wild-caught seafood — delivered free.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-6 flex flex-col items-start gap-3">
            <Button variant="primary" className="px-10 py-4 text-base" onClick={() => openSignup()}>Get Started</Button>
            <button onClick={() => openSignup()} className="text-sm font-medium text-text-muted hover:text-[#2D5E4A] transition-colors">
              Not ready to commit? <span className="underline underline-offset-2">Try a one-time box →</span>
            </button>
          </motion.div>

          {/* Trust stats — immediately below CTA with 12px gap */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-3 text-sm text-text-muted">
            400k+ Members&nbsp;&nbsp;·&nbsp;&nbsp;1B+ Meals Delivered&nbsp;&nbsp;·&nbsp;&nbsp;70k+ 5-Star Reviews
          </motion.p>
        </div>
      </div>
    </section>
  );
}
