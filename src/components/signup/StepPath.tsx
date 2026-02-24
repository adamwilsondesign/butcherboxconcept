"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PLANS, type Plan } from "@/lib/products";

const FREE_OFFERS = [
  {
    emoji: "🥩",
    title: "Free Top Sirloin Steaks for a Year",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&q=80",
  },
  {
    emoji: "🍗",
    title: "Free Chicken Breasts for a Year",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&q=80",
  },
  {
    emoji: "🍔",
    title: "Free Ground Beef for a Year",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&q=80",
  },
];

const FREQS = [
  { label: "Every 2 weeks", value: "Every Two Weeks" },
  { label: "Every 4 weeks", value: "Every Four Weeks" },
  { label: "Every 6 weeks", value: "Every Six Weeks" },
  { label: "Every 8 weeks", value: "Every Eight Weeks" },
];

interface Props {
  selectedPlan: Plan | null;
  frequency: string;
  onSelectPlan: (plan: Plan) => void;
  onSelectFrequency: (freq: string) => void;
  onContinue: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" as const },
  }),
};

export default function StepPath({ selectedPlan, frequency, onSelectPlan, onSelectFrequency, onContinue }: Props) {
  const [freqOpen, setFreqOpen] = useState(false);
  const [offerIdx, setOfferIdx] = useState(0);
  const freqRef = useRef<HTMLDivElement>(null);

  const offer = FREE_OFFERS[offerIdx];
  const prevOffer = () => setOfferIdx((i) => (i - 1 + FREE_OFFERS.length) % FREE_OFFERS.length);
  const nextOffer = () => setOfferIdx((i) => (i + 1) % FREE_OFFERS.length);

  const activeFreq = FREQS.find((f) => f.value === frequency) ?? FREQS[1];

  // Close dropdown on outside click
  useEffect(() => {
    if (!freqOpen) return;
    const handler = (e: MouseEvent) => {
      if (freqRef.current && !freqRef.current.contains(e.target as Node)) {
        setFreqOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [freqOpen]);

  return (
    <div className="mx-auto flex w-full flex-col px-4 pb-6">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-sans font-bold text-xl text-text-dark"
      >
        Choose Your Box
      </motion.h2>

      {/* Plan cards — 2-column grid, left column spans 1 card, right column spans 2 */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {PLANS.map((plan, i) => {
          const isSelected = selectedPlan?.id === plan.id;
          const isPopular = plan.id === "large";

          return (
            <motion.button
              key={plan.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={() => onSelectPlan(plan)}
              className={`group relative flex flex-col rounded-xl border-2 bg-surface p-3.5 text-left transition-all hover:shadow-md ${
                isSelected
                  ? "border-[#2D6A4F] shadow-md"
                  : "border-border hover:border-[#40916C]"
              } ${i === 0 ? "col-span-2" : ""}`}
            >
              {/* Most Popular badge */}
              {isPopular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#2D6A4F] px-3 py-0.5 text-[11px] font-bold text-white whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#2D6A4F] text-white">
                  <Check size={14} />
                </span>
              )}

              <div className="flex items-baseline justify-between pr-8">
                <h3 className="font-sans font-bold text-base text-text-dark">
                  {plan.id === "medium" ? "Medium" : plan.id === "large" ? "Large" : "XL"} Box
                </h3>
                <span className="text-lg font-bold text-[#2D6A4F]">
                  ${plan.price}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-text-muted">
                {plan.proteins} proteins · up to {plan.maxLbs} lbs · {plan.perMeal}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[#2D6A4F]">
                {plan.feeds}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Frequency — compact inline dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-5"
        ref={freqRef}
      >
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
          <div>
            <p className="text-xs font-medium text-text-muted">Delivery frequency</p>
            <p className="text-sm font-semibold text-text-dark">{activeFreq.label}</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFreqOpen(!freqOpen)}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-[#2D6A4F] transition-colors hover:bg-[#2D6A4F]/5"
            >
              Change <ChevronDown size={14} className={`transition-transform ${freqOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {freqOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-border bg-white py-1 shadow-lg">
                {FREQS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => { onSelectFrequency(f.value); setFreqOpen(false); }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-[#2D6A4F]/5 ${
                      frequency === f.value ? "font-semibold text-[#2D6A4F]" : "text-text-dark"
                    }`}
                  >
                    {f.label}
                    {frequency === f.value && <Check size={14} className="text-[#2D6A4F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-text-muted">
          Pause or cancel anytime — free shipping always
        </p>
      </motion.div>

      {/* Free offer CTA — cycles through 3 offers */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="mt-5 overflow-hidden rounded-xl border border-[#2D6A4F]/20 bg-[#2D6A4F]/5"
      >
        <div className="flex items-center gap-3 px-3.5 py-3">
          {/* Cycling image */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={offerIdx}
                src={offer.image}
                alt={offer.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <div className="flex-1 min-w-0">
            {/* Title row with prev/next arrows */}
            <div className="flex items-center gap-1">
              <button onClick={prevOffer} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#2D6A4F]/60 transition-colors hover:bg-[#2D6A4F]/10 hover:text-[#2D6A4F]" aria-label="Previous offer">
                <ChevronLeft size={14} />
              </button>
              <AnimatePresence mode="wait">
                <motion.p
                  key={offerIdx}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 text-xs font-bold text-[#1B4332] truncate"
                >
                  {offer.emoji} {offer.title}
                </motion.p>
              </AnimatePresence>
              <button onClick={nextOffer} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#2D6A4F]/60 transition-colors hover:bg-[#2D6A4F]/10 hover:text-[#2D6A4F]" aria-label="Next offer">
                <ChevronRight size={14} />
              </button>
            </div>
            {/* Dots indicator */}
            <div className="mt-1 flex items-center gap-1">
              {FREE_OFFERS.map((_, i) => (
                <span key={i} className={`h-1 rounded-full transition-all duration-200 ${i === offerIdx ? "w-3 bg-[#2D6A4F]" : "w-1 bg-[#2D6A4F]/25"}`} />
              ))}
              <span className="ml-1 text-[10px] leading-snug text-[#1B4332]/70">
                Enter email to claim your free offer.
              </span>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              <input
                type="email"
                placeholder="you@email.com"
                className="h-7 flex-1 min-w-0 rounded-md border border-[#2D6A4F]/20 bg-white px-2.5 text-[11px] text-text-dark placeholder:text-text-muted/50 focus:border-[#2D6A4F] focus:outline-none"
              />
              <button className="h-7 shrink-0 rounded-md bg-[#2D6A4F] px-3 text-[11px] font-semibold text-white transition-colors hover:bg-[#1B4332]">
                Claim
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex flex-col items-center gap-2"
      >
        <button
          onClick={onContinue}
          disabled={!selectedPlan}
          className="w-full rounded-lg bg-[#2D6A4F] py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1B4332] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Choose Proteins →
        </button>
        <button className="text-xs font-medium text-[#2D6A4F] underline underline-offset-2 hover:no-underline">
          Or try a one-time box
        </button>
      </motion.div>
    </div>
  );
}
