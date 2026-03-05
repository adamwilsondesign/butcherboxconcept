"use client";

import { useState, useEffect, useMemo, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { PLANS, ADDON_CATALOG, type CartItem, type Plan, type AddonItem, type SignupMode } from "@/lib/products";
import StepPath from "./StepPath";
import StepProducts from "./StepProducts";
import StepReview from "./StepReview";

/* ── Context ── */

interface SignupOptions {
  skipToStep?: number;
  prefilterCategory?: string;
  mode?: SignupMode;
  prebuiltItems?: CartItem[];
}

interface SignupCtx {
  open: (preset?: "subscribe" | "onetime") => void;
  openSignup: (options?: SignupOptions) => void;
  closeSignup: () => void;       // Full reset + close (checkout complete)
  abandonSignup: () => void;     // Close without resetting (preserve cart)
  resumeSignup: () => void;      // Re-open with preserved state
  isOpen: boolean;
  hasCart: boolean;               // true if user has selected a plan
  cartItemCount: number;          // total items in cart
}

const SignupContext = createContext<SignupCtx>({
  open: () => {},
  openSignup: () => {},
  closeSignup: () => {},
  abandonSignup: () => {},
  resumeSignup: () => {},
  isOpen: false,
  hasCart: false,
  cartItemCount: 0,
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
  const [mode, setMode] = useState<SignupMode>("subscription");
  const [addons, setAddons] = useState<AddonItem[]>([]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  /* ── Derived cart state ── */
  const hasCart = plan !== null;
  const cartItemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  useEffect(() => {
    if (!show) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false); // abandon — preserve state
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
    setMode("subscription");
    setAddons([]);
  }, []);

  const open = useCallback(() => {
    resetState();
    setShow(true);
  }, [resetState]);

  const openSignup = useCallback((options?: SignupOptions) => {
    resetState();
    if (options?.mode) {
      setMode(options.mode);
    }
    if (options?.prebuiltItems && options.prebuiltItems.length > 0) {
      setItems(options.prebuiltItems);
      // Auto-select the smallest plan that fits the items
      const totalQty = options.prebuiltItems.reduce((s, i) => s + i.qty, 0);
      const matchingPlan = PLANS.find((p) => p.proteins >= totalQty) ?? PLANS[PLANS.length - 1];
      setPlan(matchingPlan);
    }
    if (options?.prefilterCategory) {
      setPrefilterCategory(options.prefilterCategory);
    }
    if (options?.skipToStep) {
      setStep(options.skipToStep);
    }
    setShow(true);
  }, [resetState]);

  /* Close + full reset (checkout complete or explicit "start over") */
  const closeSignup = useCallback(() => {
    setShow(false);
    resetState();
  }, [resetState]);

  /* Close without reset — preserves plan, items, step for later resume */
  const abandonSignup = useCallback(() => {
    setShow(false);
  }, []);

  /* Re-open the drawer at whatever step the user left off */
  const resumeSignup = useCallback(() => {
    setShow(true);
  }, []);

  /* Toggle an addon on/off */
  const toggleAddon = useCallback((addon: AddonItem) => {
    setAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon],
    );
  }, []);

  return (
    <SignupContext.Provider
      value={{
        open,
        openSignup,
        closeSignup,
        abandonSignup,
        resumeSignup,
        isOpen: show,
        hasCart,
        cartItemCount,
      }}
    >
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
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={abandonSignup}
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
                  onClick={abandonSignup}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#2D6A4F]/5"
                  aria-label="Close signup"
                >
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              {/* ── Step content (scrollable) ── */}
              <div className="flex-1 overflow-y-auto pt-4 sm:pt-6">
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
                        mode={mode}
                        onSelectPlan={setPlan}
                        onSelectFrequency={setFrequency}
                        onSetMode={setMode}
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
                        mode={mode}
                        addons={addons}
                        onToggleAddon={toggleAddon}
                        addonCatalog={ADDON_CATALOG}
                        onUpdateItems={setItems}
                        onBack={() => setStep(2)}
                        onChangePlan={() => setStep(1)}
                        onClose={closeSignup}
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
