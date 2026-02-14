"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { PRODUCTS, type CartItem } from "@/lib/products";

const FILTERS = ["All", "Beef", "Chicken", "Pork", "Seafood", "Ready to Cook"] as const;

interface Props {
  items: CartItem[];
  onUpdate: (items: CartItem[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function StepProducts({ items, onUpdate, onContinue, onBack }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  const getQty = (id: number) => items.find((i) => i.id === id)?.qty ?? 0;

  const setQty = (id: number, qty: number) => {
    if (qty <= 0) {
      onUpdate(items.filter((i) => i.id !== id));
    } else {
      const exists = items.find((i) => i.id === id);
      if (exists) {
        onUpdate(items.map((i) => (i.id === id ? { ...i, qty } : i)));
      } else {
        const product = PRODUCTS.find((p) => p.id === id)!;
        onUpdate([...items, { ...product, qty }]);
      }
    }
  };

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalLbs = items.reduce((s, i) => s + i.lbs * i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Pick Your Proteins
      </motion.h2>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      <div className="mt-6 grid flex-1 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const qty = getQty(p.id);
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
                {/* Image */}
                <div
                  className="aspect-[4/3] w-full"
                  style={{ backgroundColor: p.color }}
                >
                  <div className="flex h-full w-full items-center justify-center px-2">
                    <span className="text-center text-[10px] font-medium text-white/40">
                      {p.placeholder}
                    </span>
                  </div>
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
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted transition-colors hover:bg-primary/10 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-text-dark">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(p.id, qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-white transition-colors hover:bg-primary"
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
        transition={{ delay: 0.2 }}
        className="sticky bottom-0 -mx-4 mt-4 flex items-center justify-between border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:px-6"
      >
        <button
          onClick={onBack}
          className="text-sm font-medium text-text-muted hover:text-text-dark"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">
            {totalItems} items · {totalLbs.toFixed(1)} lbs · <span className="font-bold text-primary">${totalPrice}</span>
          </span>
          <button
            onClick={onContinue}
            disabled={totalItems === 0}
            className="rounded-md bg-primary-light px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}
