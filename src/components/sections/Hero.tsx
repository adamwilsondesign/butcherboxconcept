"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";

interface Slide {
  image: string;
  label: string;
  headline: string;
  subtext: string;
  cta: string;
  textLink: string;
}

const SLIDES: Slide[] = [
  {
    image: "https://images.ctfassets.net/1yr7azz9gqt1/382W88cbfXXjJSvHF6Hqog/0f286ffefd26e6ef5c4fabbce2180064/26_Q1_NYNY_Web_UnauthenticatedHomepage_Mobile_770x1100.jpg?q=50&fm=jpg",
    label: "FREE STEAK FOR A YEAR",
    headline: "Restaurant-Quality Meat, Delivered.",
    subtext: "100% grass-fed beef, free-range chicken, heritage pork & wild-caught seafood — shipped free to your door.",
    cta: "Build Your First Box",
    textLink: "See How It Works →",
  },
  {
    image: "https://images.ctfassets.net/1yr7azz9gqt1/7AHLVQoml5mgzCKgevo4bF/fba1d9919bff561f586de6ac01d8ce27/25_Q3_Website_SuperiorStandardModules_HumanelyRaisedMeat.jpg?q=50&fm=jpg",
    label: "CERTIFIED B CORPORATION",
    headline: "We Know Where Every Cut Comes From.",
    subtext: "No antibiotics, no added hormones — ever. 200+ banned ingredients. Sourced from farms we trust.",
    cta: "Explore Our Standards",
    textLink: "Read Our Story →",
  },
  {
    image: "https://images.ctfassets.net/1yr7azz9gqt1/4GcoyJ3da0Kb0gY3IM9H4N/b5dc8ef16383638fff9454a8c0063cce/25_Q3_Website_SuperiorStandardModules_SustainableSeafood.jpg?q=50&fm=jpg",
    label: "WILD-CAUGHT SEAFOOD",
    headline: "From the Ocean to Your Kitchen.",
    subtext: "Sustainably sourced salmon, scallops, lobster, and more — flash-frozen at peak freshness.",
    cta: "Shop Seafood",
    textLink: "Browse All Proteins →",
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function Hero() {
  const { openSignup } = useSignup();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length), []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[calc(100vh-104px)] min-h-[600px] overflow-hidden"
      id="hero"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            loading={current === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay gradient left → right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content — left-aligned */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            {/* Label */}
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/80">
              {slide.label}
            </span>

            {/* Headline — 72px display */}
            <h1 className="mt-4 font-display text-[42px] font-bold leading-[1.08] text-white sm:text-[56px] lg:text-[72px]">
              {slide.headline}
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/80 sm:text-[18px]">
              {slide.subtext}
            </p>

            {/* CTA + text link */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={() => openSignup()}
                className="rounded-pill bg-white px-8 py-3.5 text-[14px] font-semibold text-[#1B3A2D] transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
              >
                {slide.cta}
              </button>
              <a
                href="#how-it-works"
                className="text-[14px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {slide.textLink}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-6"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
