"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { CartItem, Plan } from "@/lib/products";
import StepPath from "./StepPath";
import StepProducts from "./StepProducts";
import StepReview from "./StepReview";

/* ── Context ── */

interface SignupOptions {
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

/* ── Step labels ── */

const STEP_LABELS = ["Select Plan", "Choose Proteins", "Review & Checkout"];
const STEP_SUBTITLES = ["Size & frequency", "Pick your cuts", "Review & pay"];

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
  const [plan, setPlan] = useState<Plan | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [frequency, setFrequency] = useState("Every Four Weeks");
  const [prefilterCategory, setPrefilterCategory] = useState<string | undefined>();

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
        setStep(1);
        setPlan(null);
        setItems([]);
        setFrequency("Every Four Weeks");
        setPrefilterCategory(undefined);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show]);

  const resetState = useCallback(() => {
    setStep(1);
    setPlan(null);
    setItems([]);
    setFrequency("Every Four Weeks");
    setPrefilterCategory(undefined);
  }, []);

  const open = useCallback(() => {
    resetState();
    setShow(true);
  }, [resetState]);

  const openSignup = useCallback((options?: SignupOptions) => {
    resetState();
    if (options?.prefilterCategory) {
      setPrefilterCategory(options.prefilterCategory);
    }
    if (options?.skipToStep) {
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
                        <div className={`mx-1 h-px w-6 ${done ? "bg-[#2D6A4F]" : "bg-border"}`} />
                      )}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-[#2D6A4F] text-white"
                              : active
                                ? "bg-[#40916C] text-white"
                                : "bg-border text-text-muted"
                          }`}
                          aria-current={active ? "step" : undefined}
                        >
                          {done ? <Check size={12} /> : n}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-medium leading-tight ${
                              active ? "text-[#2D6A4F]" : done ? "text-[#2D6A4F]" : "text-text-muted"
                            }`}
                          >
                            {label}
                          </span>
                          <span className="text-[10px] text-text-muted/60 leading-tight">
                            {STEP_SUBTITLES[i]}
                          </span>
                        </div>
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
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#2D6A4F]/5"
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
                      selectedPlan={plan}
                      frequency={frequency}
                      onSelectPlan={setPlan}
                      onSelectFrequency={setFrequency}
                      onContinue={() => setStep(2)}
                    />
                  )}

                  {step === 2 && plan && (
                    <StepProducts
                      plan={plan}
                      items={items}
                      onUpdate={setItems}
                      onContinue={() => setStep(3)}
                      onBack={() => setStep(1)}
                      onUpgrade={() => setStep(1)}
                      initialCategory={prefilterCategory}
                    />
                  )}

                  {step === 3 && plan && (
                    <StepReview
                      plan={plan}
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
