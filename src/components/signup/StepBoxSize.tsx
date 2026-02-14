"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  orderType: "subscribe" | "onetime";
  onSelect: (size: "classic" | "big", style: "custom" | "curated") => void;
  onBack: () => void;
}

const BOXES = [
  {
    key: "classic" as const,
    name: "Classic Box",
    weight: "9–14 lbs",
    meals: "~24 meals",
    subPrice: 146,
    fullPrice: 169,
  },
  {
    key: "big" as const,
    name: "Big Box",
    weight: "18–26 lbs",
    meals: "~48 meals",
    subPrice: 269,
    fullPrice: 306,
  },
];

export default function StepBoxSize({ orderType, onSelect, onBack }: Props) {
  const [style, setStyle] = useState<"custom" | "curated">("custom");

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Pick Your Box Size
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-center text-text-muted"
      >
        Choose a size, then decide if you want to pick your cuts or let us curate.
      </motion.p>

      {/* Custom vs Curated toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-8 flex justify-center"
      >
        <div className="inline-flex rounded-full bg-surface-warm p-1">
          {(["custom", "curated"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                style === s
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              {s === "custom" ? "I'll Pick My Cuts" : "Curate For Me"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Box cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {BOXES.map((box, i) => {
          const price = orderType === "subscribe" ? box.subPrice : box.fullPrice;
          const showSavings = orderType === "subscribe";

          return (
            <motion.button
              key={box.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, ease: "easeOut" as const }}
              onClick={() => onSelect(box.key, style)}
              className="group flex flex-col rounded-2xl border-2 border-border bg-surface p-6 text-left transition-all hover:border-primary-light hover:shadow-lg sm:p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-text-dark">
                {box.name}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {box.weight} · {box.meals}
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">${price}</span>
                {showSavings && (
                  <span className="text-base text-text-muted line-through">
                    ${box.fullPrice}
                  </span>
                )}
              </div>
              {showSavings && (
                <span className="mt-1 text-xs font-semibold text-accent">
                  Save ${box.fullPrice - box.subPrice} with subscription
                </span>
              )}

              <div className="mt-6 rounded-md bg-primary-light py-2.5 text-center text-sm font-semibold text-white transition-colors group-hover:bg-primary">
                Select {box.name}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Back */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <button
          onClick={onBack}
          className="text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
        >
          ← Back to path selection
        </button>
      </motion.div>
    </div>
  );
}
