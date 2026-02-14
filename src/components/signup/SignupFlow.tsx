"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { CartItem } from "@/lib/products";
import StepPath from "./StepPath";
import StepBoxSize from "./StepBoxSize";
import StepProducts from "./StepProducts";
import StepReview from "./StepReview";

/* ── Context to trigger the modal from anywhere ── */

interface SignupCtx {
  open: (preset?: "subscribe" | "onetime") => void;
}

const SignupContext = createContext<SignupCtx>({ open: () => {} });
export const useSignup = () => useContext(SignupContext);

/* ── Progress steps ── */

const STEP_LABELS = ["Your Path", "Box Size", "Pick Proteins", "Review"];

/* ── Slide animation ── */

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

/* ── Provider + modal ── */

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<"subscribe" | "onetime" | null>(null);
  const [boxSize, setBoxSize] = useState<"classic" | "big" | null>(null);
  const [boxStyle, setBoxStyle] = useState<"custom" | "curated">("custom");
  const [items, setItems] = useState<CartItem[]>([]);
  const [frequency, setFrequency] = useState("Every 4 weeks");

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  // Close on Escape
  useEffect(() => {
    if (!show) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
        setStep(1);
        setOrderType(null);
        setBoxSize(null);
        setBoxStyle("custom");
        setItems([]);
        setFrequency("Every 4 weeks");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show]);

  const open = useCallback((preset?: "subscribe" | "onetime") => {
    setStep(1);
    setOrderType(null);
    setBoxSize(null);
    setBoxStyle("custom");
    setItems([]);
    setFrequency("Every 4 weeks");
    if (preset === "onetime") {
      setOrderType("onetime");
      setStep(2);
    }
    setShow(true);
  }, []);

  const close = () => {
    setShow(false);
    setStep(1);
    setOrderType(null);
    setBoxSize(null);
    setBoxStyle("custom");
    setItems([]);
    setFrequency("Every 4 weeks");
  };

  return (
    <SignupContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Build your ButcherBox"
          >
            {/* ── Top bar ── */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:h-16 sm:px-8">
              {/* Logo */}
              <span className="text-base font-extrabold uppercase tracking-[0.12em] text-primary sm:text-lg">
                BUTCHERBOX
              </span>

              {/* Progress */}
              <div className="hidden items-center gap-1 sm:flex" aria-label="Progress">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1;
                  const done = step > n;
                  const active = step === n;
                  return (
                    <div key={label} className="flex items-center">
                      {i > 0 && (
                        <div className={`mx-1 h-px w-6 ${done ? "bg-primary" : "bg-border"}`} />
                      )}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-primary text-white"
                              : active
                                ? "bg-primary-light text-white"
                                : "bg-border text-text-muted"
                          }`}
                          aria-current={active ? "step" : undefined}
                        >
                          {done ? <Check size={12} /> : n}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            active ? "text-primary-light" : done ? "text-primary" : "text-text-muted"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile progress: simple "Step X of 4" */}
              <span className="text-xs font-medium text-text-muted sm:hidden">
                Step {step} of 4
              </span>

              {/* Close */}
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary/5"
                aria-label="Close signup"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            {/* ── Step content ── */}
            <div className="flex-1 overflow-y-auto py-6 sm:py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                >
                  {step === 1 && (
                    <StepPath
                      onSelect={(type, freq) => {
                        setOrderType(type);
                        if (freq) setFrequency(freq);
                        setStep(2);
                      }}
                    />
                  )}

                  {step === 2 && orderType && (
                    <StepBoxSize
                      orderType={orderType}
                      onSelect={(size, style) => {
                        setBoxSize(size);
                        setBoxStyle(style);
                        setStep(style === "curated" ? 4 : 3);
                      }}
                      onBack={() => setStep(1)}
                    />
                  )}

                  {step === 3 && (
                    <StepProducts
                      items={items}
                      onUpdate={setItems}
                      onContinue={() => setStep(4)}
                      onBack={() => setStep(2)}
                    />
                  )}

                  {step === 4 && orderType && boxSize && (
                    <StepReview
                      orderType={orderType}
                      boxSize={boxSize}
                      frequency={frequency}
                      items={items}
                      onBack={() => setStep(boxStyle === "curated" ? 2 : 3)}
                      onClose={close}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SignupContext.Provider>
  );
}
