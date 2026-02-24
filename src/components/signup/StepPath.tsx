"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PLANS, type Plan } from "@/lib/products";

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
  const freqRef = useRef<HTMLDivElement>(null);

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
    <div className="mx-auto flex w-full flex-col px-4">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-xl text-text-dark"
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
                <h3 className="font-serif text-base text-text-dark">
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

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-5 flex flex-col items-center gap-2"
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
