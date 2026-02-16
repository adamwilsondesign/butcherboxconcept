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
          src="https://lh3.googleusercontent.com/gg-dl/AOI_d_8yf7v8GltjxJDskckvPSOJgGrZvL2IuS_yGi--K45K876GEq3uH8uXYKenCpWCg-yMToYfiEAGkipVExVrkJvd7PzODnw-KKVWoY1JViHAnavUdeAQioV7h3vtUeCL6ceam6j8mvnuEmlFKxdhaaRiKLlK29mx5o18AlL4Iy45H57f=s1024-rj"
          alt="ButcherBox premium meat spread"
          loading="eager"
          className="h-full w-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 via-40% to-background/20 lg:via-background/90 lg:via-35% lg:to-transparent" />
      <div className="absolute inset-0 bg-background/60 sm:bg-transparent" />

      <div className="relative mx-auto flex h-full min-h-[calc(100vh-108px)] max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl py-16 lg:py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-text-dark shadow-sm backdrop-blur-sm">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-star-gold text-star-gold" />
                ))}
              </span>
              Trusted by 2M+ households
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mt-8 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-text-dark sm:text-5xl md:text-6xl lg:text-7xl">
            Better Meat,
            <br />
            <span className="text-[#2D5E4A]">Served Your Way</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-6 max-w-md text-lg leading-relaxed text-text-muted">
            100% grass-fed beef, free-range chicken, wild-caught seafood
            &amp;&nbsp;more&nbsp;— delivered to your door.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" className="px-10 py-4 text-base" onClick={() => openSignup()}>
              Build Your Box
            </Button>
            <Button variant="secondary" className="px-10 py-4 text-base" onClick={() => openSignup()}>
              Try a One-Time Box
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-6 text-sm text-text-muted">
            Free shipping always&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime
          </motion.p>
        </div>
      </div>
    </section>
  );
}
