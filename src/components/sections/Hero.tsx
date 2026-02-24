"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1588347818481-0e5e2f450243?w=1920&q=80",
    alt: "Premium beef cuts on cutting board",
  },
  {
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255a1d015?w=1920&q=80",
    alt: "Fresh wild-caught salmon",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=1920&q=80",
    alt: "Family dinner with premium meats",
  },
];

const CYCLE_MS = 6000;

export default function Hero() {
  const { openSignup } = useSignup();
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const startRef = useRef(Date.now());

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    startRef.current = Date.now();
  }, []);

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(advance, CYCLE_MS);
    return () => clearInterval(id);
  }, [advance]);

  /* Progress bar */
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / CYCLE_MS, 1);
      if (progressRef.current) {
        progressRef.current.style.width = `${pct * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  /* Parallax */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background images with parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].alt}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="block h-[2px] w-12 bg-[#C8512B]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
                100% Grass-Fed &amp; Free-Range
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              Protein Your Family Deserves.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              Humanely raised beef, free-range chicken, wild-caught seafood —
              delivered free to your door. Plans from $5.27/meal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => openSignup()}
                className="group inline-flex items-center gap-2 rounded-full bg-[#C8512B] px-8 py-4 text-[14px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#A8431F] hover:shadow-lg"
              >
                Build Your Box — Free Shipping
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <button className="rounded-full border-2 border-white/40 px-8 py-4 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-white/10">
                See How It Works
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-6 text-[13px] text-white/50"
            >
              ★ Trusted by 400,000+ families · Cancel anytime
            </motion.p>
          </div>
        </div>
      </div>

      {/* Slide dots + progress */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              startRef.current = Date.now();
            }}
            className="group relative flex h-5 items-center"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-300 ${
                i === current
                  ? "w-10 bg-white/30"
                  : "w-3 bg-white/40 group-hover:bg-white/60"
              }`}
            />
            {i === current && (
              <div
                ref={progressRef}
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white"
                style={{ width: "0%" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
