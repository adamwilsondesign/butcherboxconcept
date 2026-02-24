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

const STEP_LABELS = ["Plan", "Proteins", "Review"];

/* ── Slide animation (within drawer) ── */

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

/* ── Provider + sidebar drawer ── */

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
          <>
            {/* ── Backdrop ── */}
            <motion.div
              key="signup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/40"
              onClick={close}
              aria-hidden="true"
            />

            {/* ── Sidebar drawer ── */}
            <motion.div
              key="signup-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-[101] flex w-full flex-col bg-background shadow-2xl sm:w-[480px]"
              role="dialog"
              aria-modal="true"
              aria-label="Build your ButcherBox"
            >
              {/* ── Top bar ── */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
                <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-primary">
                  BUTCHERBOX
                </span>

                {/* Compact numbered progress */}
                <div className="flex items-center gap-1" aria-label="Progress">
                  {STEP_LABELS.map((label, i) => {
                    const n = i + 1;
                    const done = step > n;
                    const active = step === n;
                    return (
                      <div key={label} className="flex items-center">
                        {i > 0 && (
                          <div className={`mx-0.5 h-px w-4 ${done ? "bg-[#2D6A4F]" : "bg-border"}`} />
                        )}
                        <div className="flex items-center gap-1">
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
                          <span
                            className={`text-[11px] font-medium ${
                              active || done ? "text-[#2D6A4F]" : "text-text-muted"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Close */}
                <button
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#2D6A4F]/5"
                  aria-label="Close signup"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              {/* ── Step content (scrollable) ── */}
              <div className="flex-1 overflow-y-auto py-4 sm:py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" as const }}
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
          </>
        )}
      </AnimatePresence>
    </SignupContext.Provider>
  );
}
