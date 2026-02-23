"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

/* Word-by-word headline animation */
function AnimatedHeadline({ text, slideKey }: { text: string; slideKey: number }) {
  const words = text.split(" ");
  return (
    <h1 className="mt-4 font-display text-[42px] font-semibold leading-[1.08] tracking-heading text-white sm:text-[56px] lg:text-[72px]">
      {words.map((word, i) => (
        <motion.span
          key={`${slideKey}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const { openSignup } = useSignup();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    progressRef.current = 0;
  }, []);
  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  /* Progress bar animation & auto-advance */
  useEffect(() => {
    if (paused) return;
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      progressRef.current = pct;
      setProgress(pct);

      if (pct >= 1) {
        next();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, current, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[calc(100vh-104px)] min-h-[600px] overflow-hidden"
      id="hero"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images — pure crossfade, no slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content — left-aligned, crossfade with word-by-word headline */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-xl"
          >
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/80"
            >
              {slide.label}
            </motion.span>

            {/* Headline — word-by-word stagger */}
            <AnimatedHeadline text={slide.headline} slideKey={current} />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-5 max-w-md text-[16px] leading-relaxed text-white/80 sm:text-[18px]"
            >
              {slide.subtext}
            </motion.p>

            {/* CTA + text link */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <motion.button
                onClick={() => openSignup()}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-pill bg-white px-8 py-3.5 text-[14px] font-medium text-[#1B4332] transition-all duration-200 hover:bg-white/90"
              >
                {slide.cta}
              </motion.button>
              <a
                href="#how-it-works"
                className="text-[14px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {slide.textLink}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation with progress fill */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setProgress(0);
                progressRef.current = 0;
              }}
              className="relative h-2 overflow-hidden rounded-full bg-white/30 transition-all duration-[400ms]"
              style={{
                width: isActive ? 28 : 8,
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {/* Progress fill — only on active dot */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full bg-white"
                  style={{
                    transformOrigin: "left",
                    transform: `scaleX(${progress})`,
                    transition: "none",
                  }}
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 rounded-full bg-white/50" />
              )}
            </button>
          );
        })}
      </div>

      {/* Arrow buttons — backdrop-blur, hover effects */}
      <motion.button
        onClick={prev}
        whileHover={{ scale: 1 }}
        className="group absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-200 sm:left-6"
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} className="transition-transform duration-200 group-hover:scale-110" />
      </motion.button>
      <motion.button
        onClick={next}
        whileHover={{ scale: 1 }}
        className="group absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-200 sm:right-6"
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
        aria-label="Next slide"
      >
        <ChevronRight size={22} className="transition-transform duration-200 group-hover:scale-110" />
      </motion.button>
    </section>
  );
}
