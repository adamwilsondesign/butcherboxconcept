"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PLANS, type Plan } from "@/lib/products";

const FREQS = ["Every Two Weeks", "Every Four Weeks", "Every Six Weeks", "Every Eight Weeks"];

interface Props {
  selectedPlan: Plan | null;
  frequency: string;
  onSelectPlan: (plan: Plan) => void;
  onSelectFrequency: (freq: string) => void;
  onContinue: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function StepPath({ selectedPlan, frequency, onSelectPlan, onSelectFrequency, onContinue }: Props) {
  return (
    <div className="mx-auto w-full px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-2xl text-text-dark"
      >
        Select Your Plan &amp; Frequency
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-center text-sm font-semibold text-[#2D6A4F]"
      >
        Select a Signature Box
      </motion.p>

      {/* Plan cards — single column for sidebar */}
      <div className="mt-8 grid grid-cols-1 gap-4">
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
              className={`group relative flex flex-col rounded-2xl border-2 bg-surface p-5 text-left transition-all hover:shadow-lg ${
                isSelected
                  ? "border-[#2D6A4F] shadow-lg"
                  : "border-border hover:border-[#40916C]"
              }`}
            >
              {/* Most Popular badge */}
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2D6A4F] px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#2D6A4F] text-white">
                  <Check size={16} />
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-lg text-text-dark">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-[#2D6A4F]">
                  ${plan.price}
                </p>
              </div>

              <p className="mt-1 text-sm text-text-muted">
                Choose {plan.proteins} proteins (up to {plan.maxLbs} lbs) · {plan.perMeal}
              </p>

              <p className="mt-1 text-xs font-medium text-[#2D6A4F]">
                {plan.feeds}
              </p>

              <div className={`mt-3 rounded-md py-2 text-center text-sm font-semibold transition-colors ${
                isSelected
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
              }`}>
                {isSelected ? "Selected ✓" : "Select Plan"}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Frequency selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h3 className="text-center font-serif text-lg text-text-dark">
          How often do you want a box?
        </h3>
        <p className="mt-1 text-center text-sm text-text-muted">
          You can pause or cancel anytime.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {FREQS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => onSelectFrequency(f)}
              aria-pressed={frequency === f}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                frequency === f
                  ? "bg-[#2D6A4F] text-white shadow-md"
                  : "bg-surface-warm text-text-muted hover:bg-[#2D6A4F]/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <button
          onClick={onContinue}
          disabled={!selectedPlan}
          className="w-full rounded-lg bg-[#2D6A4F] py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1B4332] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next, Choose Your Proteins →
        </button>
        <p className="text-sm text-text-muted">
          Not ready to commit?{" "}
          <button className="font-medium text-[#2D6A4F] underline underline-offset-2 hover:no-underline">
            Try a one-time box →
          </button>
        </p>
      </motion.div>
    </div>
  );
}
