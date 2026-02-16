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
    <div className="mx-auto w-full max-w-4xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Select Your Plan &amp; Frequency
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-center text-[#2D5E4A] font-semibold"
      >
        Select a Signature Box
      </motion.p>

      {/* Plan cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
              className={`group relative flex flex-col rounded-2xl border-2 bg-surface p-6 text-left transition-all hover:shadow-lg sm:p-8 ${
                isSelected
                  ? "border-[#2D5E4A] shadow-lg"
                  : "border-border hover:border-[#3A7D64]"
              }`}
            >
              {/* Most Popular badge */}
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2D5E4A] px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#2D5E4A] text-white">
                  <Check size={16} />
                </span>
              )}

              <h3 className="font-serif text-xl font-bold text-text-dark sm:text-2xl">
                {plan.name}
              </h3>

              <p className="mt-3 text-3xl font-bold text-[#2D5E4A]">
                ${plan.price}
              </p>

              <p className="mt-2 text-sm text-text-muted">
                Choose {plan.proteins} proteins (up to {plan.maxLbs} lbs)
              </p>

              <div className={`mt-4 rounded-md py-2.5 text-center text-sm font-semibold transition-colors ${
                isSelected
                  ? "bg-[#2D5E4A] text-white"
                  : "bg-[#2D5E4A]/10 text-[#2D5E4A] group-hover:bg-[#2D5E4A] group-hover:text-white"
              }`}>
                {isSelected ? "Selected" : "Select Plan"}
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
        className="mt-12"
      >
        <h3 className="text-center font-serif text-xl font-bold text-text-dark sm:text-2xl">
          How often do you want a box?
        </h3>
        <p className="mt-2 text-center text-sm text-text-muted">
          You can pause or cancel anytime.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {FREQS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => onSelectFrequency(f)}
              aria-pressed={frequency === f}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                frequency === f
                  ? "bg-[#2D5E4A] text-white shadow-md"
                  : "bg-surface-warm text-text-muted hover:bg-[#2D5E4A]/10"
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
        className="mt-10 flex justify-center"
      >
        <button
          onClick={onContinue}
          disabled={!selectedPlan}
          className="rounded-md bg-[#2D5E4A] px-10 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#243B35] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next, Choose Your Proteins →
        </button>
      </motion.div>
    </div>
  );
}
