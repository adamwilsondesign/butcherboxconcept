"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, AlertTriangle, ArrowUpRight } from "lucide-react";
import { PRODUCTS, type CartItem } from "@/lib/products";

const FILTERS = ["All", "Beef", "Chicken", "Pork", "Seafood", "Ready to Cook"] as const;

const BOX_LIMITS = {
  classic: { max: 14, label: "Classic Box", weight: "9–14 lbs", price: 146, fullPrice: 169, meals: "~24 meals" },
  big: { max: 26, label: "Big Box", weight: "18–26 lbs", price: 269, fullPrice: 306, meals: "~48 meals" },
} as const;

interface Props {
  orderType: "subscribe" | "onetime";
  items: CartItem[];
  boxSize: "classic" | "big";
  onBoxSizeChange: (size: "classic" | "big") => void;
  onUpdate: (items: CartItem[]) => void;
  onContinue: () => void;
  onBack: () => void;
  initialCategory?: string;
}

export default function StepProducts({
  orderType,
  items,
  boxSize,
  onBoxSizeChange,
  onUpdate,
  onContinue,
  onBack,
  initialCategory,
}: Props) {
  const [filter, setFilter] = useState<string>(initialCategory ?? "All");
  const [showWeightWarning, setShowWeightWarning] = useState(false);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);

  useEffect(() => {
    if (initialCategory) setFilter(initialCategory);
  }, [initialCategory]);

  const filtered = filter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  const getQty = (id: number) => items.find((i) => i.id === id)?.qty ?? 0;

  const totalWeight = items.reduce((s, i) => s + i.lbs * i.qty, 0);
  const maxWeight = BOX_LIMITS[boxSize].max;
  const nearLimit = totalWeight >= maxWeight - 1;
  const atLimit = totalWeight >= maxWeight;

  const setQty = (id: number, qty: number) => {
    if (qty <= 0) {
      onUpdate(items.filter((i) => i.id !== id));
      setShowWeightWarning(false);
    } else {
      const product = PRODUCTS.find((p) => p.id === id)!;
      const currentQty = getQty(id);
      const newWeight = totalWeight + (qty - currentQty) * product.lbs;

      if (newWeight > maxWeight) {
        setShowWeightWarning(true);
        return;
      }

      setShowWeightWarning(false);
      const exists = items.find((i) => i.id === id);
      if (exists) {
        onUpdate(items.map((i) => (i.id === id ? { ...i, qty } : i)));
      } else {
        onUpdate([...items, { ...product, qty }]);
      }
    }
  };

  const handleBoxSizeChange = (newSize: "classic" | "big") => {
    if (newSize === "classic" && totalWeight > BOX_LIMITS.classic.max) {
      setShowDowngradeModal(true);
      return;
    }
    onBoxSizeChange(newSize);
    setShowWeightWarning(false);
  };

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
  const boxInfo = BOX_LIMITS[boxSize];
  const price = orderType === "subscribe" ? boxInfo.price : boxInfo.fullPrice;
  const progressPct = Math.min((totalWeight / maxWeight) * 100, 100);
  const progressColor = nearLimit ? "#C8512B" : "#3D7B5F";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Pick Your Favorites
      </motion.h2>

      {/* Box size toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 flex flex-col items-center gap-3"
      >
        <div className="inline-flex rounded-full bg-surface-warm p-1">
          {(["classic", "big"] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleBoxSizeChange(s)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                boxSize === s
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              {BOX_LIMITS[s].label} ({BOX_LIMITS[s].weight})
            </button>
          ))}
        </div>
        <p className="text-sm text-text-muted">
          {boxInfo.meals} · <span className="font-bold text-primary">${price}</span>
          {orderType === "subscribe" && (
            <span className="ml-2 text-xs text-text-muted line-through">${boxInfo.fullPrice}</span>
          )}
        </p>
      </motion.div>

      {/* Weight progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-4 w-full max-w-md"
      >
        <div className="flex items-center justify-between text-xs font-medium text-text-muted">
          <span>{totalWeight.toFixed(1)} / {maxWeight} lbs selected</span>
          <span>{totalItems} items</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full transition-colors duration-300"
            style={{ backgroundColor: progressColor }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
      </motion.div>

      {/* Weight warning toast */}
      <AnimatePresence>
        {showWeightWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-3 flex w-full max-w-md items-center gap-3 rounded-xl bg-accent/10 px-4 py-3 text-sm"
          >
            <AlertTriangle size={18} className="shrink-0 text-accent" />
            <span className="flex-1 font-medium text-accent">
              Box is full! Remove items or upgrade to Big Box.
            </span>
            {boxSize === "classic" && (
              <button
                onClick={() => { onBoxSizeChange("big"); setShowWeightWarning(false); }}
                className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-accent/90"
              >
                Switch to Big Box <ArrowUpRight size={12} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface-warm text-text-muted hover:bg-primary/10"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Product grid */}
      <div className="mt-5 grid flex-1 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const qty = getQty(p.id);
            const wouldExceed = totalWeight + p.lbs > maxWeight;
            const addDisabled = atLimit || (qty === 0 && wouldExceed);

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`overflow-hidden rounded-xl border-2 bg-surface transition-colors ${
                  qty > 0 ? "border-primary-light" : "border-transparent"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h4 className="text-sm font-bold leading-tight text-text-dark">
                    {p.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {p.weight} · ${p.price}
                  </p>

                  {/* Qty stepper */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      onClick={() => setQty(p.id, qty - 1)}
                      disabled={qty === 0}
                      aria-label={`Remove one ${p.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted transition-colors hover:bg-primary/10 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-text-dark" aria-label={`${qty} in cart`}>
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(p.id, qty + 1)}
                      disabled={addDisabled}
                      aria-label={`Add one ${p.name}`}
                      className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                        addDisabled
                          ? "cursor-not-allowed bg-gray-200 text-gray-400"
                          : "bg-primary-light text-white hover:bg-primary"
                      }`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sticky bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="sticky bottom-0 -mx-4 mt-4 flex items-center justify-between border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:px-6"
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          className="text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden text-sm text-text-muted sm:inline">
            {totalItems} items · {totalWeight.toFixed(1)} lbs · <span className="font-bold text-primary">${totalPrice}</span>
          </span>
          <span className="text-xs text-text-muted sm:hidden">
            {totalItems} items · <span className="font-bold text-primary">${totalPrice}</span>
          </span>
          <button
            onClick={onContinue}
            disabled={totalItems === 0}
            className="rounded-md bg-primary-light px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:opacity-40 sm:px-6"
          >
            Continue
          </button>
        </div>
      </motion.div>

      {/* Downgrade warning modal */}
      <AnimatePresence>
        {showDowngradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle size={24} className="text-accent" />
                <h3 className="text-lg font-bold text-text-dark">Too heavy for Classic</h3>
              </div>
              <p className="mt-3 text-sm text-text-muted">
                Your selections exceed the Classic box limit of {BOX_LIMITS.classic.max} lbs.
                Remove {(totalWeight - BOX_LIMITS.classic.max).toFixed(1)} lbs or stay with Big Box.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setShowDowngradeModal(false)}
                  className="flex-1 rounded-md bg-primary-light py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
                >
                  Stay with Big Box
                </button>
                <button
                  onClick={() => setShowDowngradeModal(false)}
                  className="flex-1 rounded-md border border-border py-2.5 text-sm font-semibold text-text-muted transition-colors hover:bg-surface-warm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
