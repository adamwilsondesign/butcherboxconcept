"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, AlertTriangle } from "lucide-react";
import { PRODUCTS, type CartItem, type Plan } from "@/lib/products";

const FILTERS = ["All", "Beef", "Chicken", "Pork", "Seafood", "Ready to Cook"] as const;

interface Props {
  plan: Plan;
  items: CartItem[];
  onUpdate: (items: CartItem[]) => void;
  onContinue: () => void;
  onBack: () => void;
  onUpgrade: () => void;
  initialCategory?: string;
}

export default function StepProducts({
  plan,
  items,
  onUpdate,
  onContinue,
  onBack,
  onUpgrade,
  initialCategory,
}: Props) {
  const [filter, setFilter] = useState<string>(initialCategory ?? "All");

  useEffect(() => {
    if (initialCategory) setFilter(initialCategory);
  }, [initialCategory]);

  const filtered = filter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  const getQty = (id: number) => items.find((i) => i.id === id)?.qty ?? 0;

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const maxItems = plan.proteins;
  const isFull = totalItems >= maxItems;

  const setQty = (id: number, qty: number) => {
    if (qty <= 0) {
      onUpdate(items.filter((i) => i.id !== id));
    } else {
      const product = PRODUCTS.find((p) => p.id === id)!;
      const currentQty = getQty(id);
      const newTotal = totalItems + (qty - currentQty);

      if (newTotal > maxItems) return;

      const exists = items.find((i) => i.id === id);
      if (exists) {
        onUpdate(items.map((i) => (i.id === id ? { ...i, qty } : i)));
      } else {
        onUpdate([...items, { ...product, qty }]);
      }
    }
  };

  const progressPct = Math.min((totalItems / maxItems) * 100, 100);

  return (
    <div className="flex w-full flex-col px-4 pb-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-sans font-bold text-2xl text-text-dark"
      >
        Choose Your Proteins
      </motion.h2>

      {/* Plan badge with change plan link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-3 flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#2D6A4F]/10 px-4 py-2 text-sm font-semibold text-[#2D6A4F]">
          {plan.id === "medium" ? "Medium" : plan.id === "large" ? "Large" : "Extra-Large"} · {plan.proteins} proteins · ${plan.price}
          <button
            onClick={onBack}
            className="ml-1 text-xs font-medium underline underline-offset-2 opacity-70 hover:opacity-100 hover:no-underline"
          >
            Change plan
          </button>
        </span>
      </motion.div>

      {/* Box full banner */}
      <AnimatePresence>
        {isFull && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex items-center gap-3 rounded-xl bg-[#1B4332]/10 px-4 py-3 text-sm"
          >
            <AlertTriangle size={18} className="shrink-0 text-[#1B4332]" />
            <span className="flex-1 font-medium text-[#1B4332]">
              Your box is full! Remove an item to swap, or{" "}
              <button onClick={onUpgrade} className="underline underline-offset-2 font-bold hover:no-underline">
                upgrade your plan
              </button>.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              filter === f
                ? "bg-[#2D6A4F] text-white"
                : "bg-surface-warm text-text-muted hover:bg-[#2D6A4F]/10"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Product grid — always 2 columns for sidebar */}
      <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const qty = getQty(p.id);
            const addDisabled = isFull && qty === 0;

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`overflow-hidden rounded-xl border-2 bg-surface transition-colors ${
                  qty > 0 ? "border-[#2D6A4F]" : "border-transparent"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {/* Source badge */}
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#2D6A4F] backdrop-blur-sm">
                    {p.sourceBadge}
                  </span>
                  {/* Quantity overlay */}
                  {qty > 0 && (
                    <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2D6A4F] text-xs font-bold text-white">
                      {qty}
                    </span>
                  )}
                </div>

                <div className="px-3 py-3">
                  <h4 className="text-sm font-bold leading-tight text-text-dark">
                    {p.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {p.weight}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-text-muted/70">
                    {p.description}
                  </p>

                  {/* Add / qty controls */}
                  <div className="mt-2.5 flex items-center gap-2">
                    {qty === 0 ? (
                      <button
                        onClick={() => setQty(p.id, 1)}
                        disabled={addDisabled}
                        className={`flex h-8 w-full items-center justify-center gap-1 rounded-md text-xs font-semibold transition-colors ${
                          addDisabled
                            ? "cursor-not-allowed bg-gray-200 text-gray-400"
                            : "bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
                        }`}
                      >
                        <Plus size={14} /> Add
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setQty(p.id, qty - 1)}
                          aria-label={`Remove one ${p.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted transition-colors hover:bg-[#2D6A4F]/10"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold text-text-dark" aria-label={`${qty} in cart`}>
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(p.id, qty + 1)}
                          disabled={isFull}
                          aria-label={`Add one ${p.name}`}
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                            isFull
                              ? "cursor-not-allowed bg-gray-200 text-gray-400"
                              : "bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
                          }`}
                        >
                          <Plus size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sticky bottom bar with progress — sticks within the drawer scroll container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="sticky bottom-0 z-50 -mx-4 mt-4 border-t border-border bg-background/95 backdrop-blur-sm"
      >
        {/* Progress bar */}
        <div className="h-1 w-full bg-border">
          <motion.div
            className="h-full bg-[#2D6A4F] transition-colors duration-300"
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {totalItems}/{maxItems} · <span className="font-bold text-[#2D6A4F]">${plan.price}</span>
            </span>
            <button
              onClick={onContinue}
              disabled={totalItems !== maxItems}
              className="rounded-lg bg-[#2D6A4F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
