"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { CartItem } from "@/lib/products";
import StepPath from "./StepPath";
import StepProducts from "./StepProducts";
import StepReview from "./StepReview";

/* ── Context to trigger the modal from anywhere ── */

interface SignupOptions {
  orderType?: "subscribe" | "onetime";
  skipToStep?: number;
  prefilterCategory?: string;
}

interface SignupCtx {
  open: (preset?: "subscribe" | "onetime") => void;
  openSignup: (options?: SignupOptions) => void;
  closeSignup: () => void;
  isOpen: boolean;
}

const SignupContext = createContext<SignupCtx>({
  open: () => {},
  openSignup: () => {},
  closeSignup: () => {},
  isOpen: false,
});
export const useSignup = () => useContext(SignupContext);

/* ── Progress steps (now 3) ── */

const STEP_LABELS = ["Choose Plan", "Pick Favorites", "Review & Checkout"];

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
  const [boxSize, setBoxSize] = useState<"classic" | "big">("classic");
  const [items, setItems] = useState<CartItem[]>([]);
  const [frequency, setFrequency] = useState("Every 4 weeks");
  const [prefilterCategory, setPrefilterCategory] = useState<string | undefined>();

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
        setBoxSize("classic");
        setItems([]);
        setFrequency("Every 4 weeks");
        setPrefilterCategory(undefined);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show]);

  const resetState = useCallback(() => {
    setStep(1);
    setOrderType(null);
    setBoxSize("classic");
    setItems([]);
    setFrequency("Every 4 weeks");
    setPrefilterCategory(undefined);
  }, []);

  const open = useCallback((preset?: "subscribe" | "onetime") => {
    resetState();
    if (preset === "onetime") {
      setOrderType("onetime");
    }
    setShow(true);
  }, [resetState]);

  const openSignup = useCallback((options?: SignupOptions) => {
    resetState();
    if (options?.orderType) {
      setOrderType(options.orderType);
    }
    if (options?.prefilterCategory) {
      setPrefilterCategory(options.prefilterCategory);
    }
    if (options?.skipToStep) {
      if (options.skipToStep >= 2 && !options?.orderType) {
        setOrderType("subscribe");
      }
      setStep(options.skipToStep);
    }
    setShow(true);
  }, [resetState]);

  const close = useCallback(() => {
    setShow(false);
    resetState();
  }, [resetState]);

  return (
    <SignupContext.Provider value={{ open, openSignup, closeSignup: close, isOpen: show }}>
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
                        <div className={`mx-1 h-px w-6 ${done ? "bg-brand-blue" : "bg-border"}`} />
                      )}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-brand-blue text-white"
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
                            active ? "text-primary-light" : done ? "text-brand-blue" : "text-text-muted"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile progress */}
              <span className="text-xs font-medium text-text-muted sm:hidden">
                Step {step} of 3
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

                  {step === 2 && (
                    <StepProducts
                      orderType={orderType ?? "subscribe"}
                      items={items}
                      boxSize={boxSize}
                      onBoxSizeChange={setBoxSize}
                      onUpdate={setItems}
                      onContinue={() => setStep(3)}
                      onBack={() => setStep(1)}
                      initialCategory={prefilterCategory}
                    />
                  )}

                  {step === 3 && orderType && (
                    <StepReview
                      orderType={orderType}
                      boxSize={boxSize}
                      frequency={frequency}
                      items={items}
                      onUpdateItems={setItems}
                      onBack={() => setStep(2)}
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
