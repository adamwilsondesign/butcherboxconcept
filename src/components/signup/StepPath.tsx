"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Package } from "lucide-react";

const FREQS = ["Every 2 weeks", "Every 4 weeks", "Every 6 weeks", "Every 8 weeks"];

interface Props {
  onSelect: (type: "subscribe" | "onetime", frequency?: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function StepPath({ onSelect }: Props) {
  const [freq, setFreq] = useState("Every 4 weeks");

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Choose Your Plan
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-center text-text-muted"
      >
        Subscribe for savings or try a one-time box. Same quality either way.
      </motion.p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Subscribe card — auto-advances on click */}
        <motion.button
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => onSelect("subscribe", freq)}
          className="group relative flex flex-col rounded-2xl border-2 border-border bg-surface p-6 text-left transition-all hover:border-primary-light hover:shadow-lg sm:p-8"
        >
          <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            Most Popular
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <RefreshCw size={22} />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-bold text-text-dark">
            Subscribe &amp; Save
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary-light">✓</span>Save 15% on every box</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary-light">✓</span>Free shipping, always</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary-light">✓</span>Skip, pause, or cancel anytime</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-primary-light">✓</span>Members-only deals</li>
          </ul>

          {/* Frequency selector */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Delivery frequency
            </p>
            <div className="flex flex-wrap gap-2">
              {FREQS.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={(e) => { e.stopPropagation(); setFreq(f); }}
                  aria-pressed={freq === f}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    freq === f
                      ? "bg-primary text-white"
                      : "bg-background text-text-muted hover:bg-primary/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Savings callout */}
          <div className="mt-4 rounded-lg bg-primary-light/10 px-3 py-2 text-xs font-semibold text-primary-light">
            Save up to $40/box vs. one-time pricing
          </div>

          <div className="mt-4 rounded-md bg-primary-light py-2.5 text-center text-sm font-semibold text-white transition-colors group-hover:bg-primary">
            Select &amp; Continue →
          </div>
        </motion.button>

        {/* One-time card — auto-advances on click */}
        <motion.button
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => onSelect("onetime")}
          className="group flex flex-col rounded-2xl border-2 border-border bg-surface p-6 text-left transition-all hover:border-primary-light hover:shadow-lg sm:p-8"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Package size={22} />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-bold text-text-dark">
            One-Time Box
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-accent">✓</span>No commitment whatsoever</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-accent">✓</span>Great for gifts</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-accent">✓</span>Free shipping included</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-accent">✓</span>Same premium quality</li>
          </ul>

          <div className="mt-auto pt-6 rounded-md border-2 border-primary py-2.5 text-center text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            Select &amp; Continue →
          </div>
        </motion.button>
      </div>

      {/* Skip link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <button
          onClick={() => onSelect("subscribe", freq)}
          className="text-sm text-text-muted transition-colors hover:text-text-dark underline underline-offset-2"
        >
          Skip — I&apos;ll decide later
        </button>
      </motion.div>
    </div>
  );
}
