"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface ProteinModalProps {
  onSelect: (category: string) => void;
}

const PROTEINS = [
  { key: "beef", emoji: "🥩", label: "Beef & Bison" },
  { key: "chicken", emoji: "🍗", label: "Chicken & Pork" },
  { key: "seafood", emoji: "🐟", label: "Wild Seafood" },
  { key: "all", emoji: "🍽️", label: "A Bit of Everything" },
];

const SESSION_KEY = "bb_protein_modal_shown";

export default function ProteinModal({ onSelect }: ProteinModalProps) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (key: string) => {
    setSelected(key);
    setTimeout(() => {
      onSelect(key);
      setShow(false);
    }, 400);
  };

  const handleDismiss = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your protein preference"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-card bg-white p-8 shadow-2xl"
          >
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#6B6B6B] transition-colors hover:bg-[#FAF7F2] hover:text-[#1A1A1A]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="text-center">
              <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#6B6B6B]">
                Personalize Your Experience
              </span>
              <h3 className="mt-3 font-display text-[24px] font-bold text-[#1A1A1A]">
                What do you love to cook?
              </h3>
              <p className="mt-2 text-[14px] text-[#6B6B6B]">
                We&apos;ll show you the best cuts for your kitchen.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {PROTEINS.map((protein) => {
                const isSelected = selected === protein.key;
                return (
                  <motion.button
                    key={protein.key}
                    onClick={() => handleSelect(protein.key)}
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`group relative flex flex-col items-center gap-2 rounded-card border-2 bg-white p-5 transition-all duration-200 ${
                      isSelected
                        ? "border-[#2D5E4A] bg-[#FAF7F2]"
                        : "border-[#E5DDD4] hover:border-[#2D5E4A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.175, 0.885, 0.32, 1.275],
                          }}
                          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2D5E4A]"
                        >
                          <Check size={12} className="text-white" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="text-[36px] transition-transform duration-200 group-hover:scale-110">
                      {protein.emoji}
                    </span>
                    <span className="text-[14px] font-medium text-[#1A1A1A]">
                      {protein.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <button
              onClick={handleDismiss}
              className="mt-5 w-full text-center text-[13px] text-[#6B6B6B] transition-colors hover:text-[#1A1A1A]"
            >
              Skip for now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
