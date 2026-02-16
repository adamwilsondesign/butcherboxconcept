"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, X as XIcon, PartyPopper } from "lucide-react";
import type { CartItem, Plan } from "@/lib/products";

interface Props {
  plan: Plan;
  frequency: string;
  items: CartItem[];
  onUpdateItems: (items: CartItem[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export default function StepReview({ plan, frequency, items, onUpdateItems, onBack, onClose }: Props) {
  const [placed, setPlaced] = useState(false);

  const subtotal = plan.price;
  const total = subtotal;

  const removeItem = (id: number) => {
    onUpdateItems(items.filter((i) => i.id !== id));
  };

  // Format frequency for display
  const freqDisplay = frequency.replace("Every ", "Every ").replace("Weeks", "Weeks");

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center px-4 py-20 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2D5E4A]/10"
        >
          <Check size={40} className="text-[#2D5E4A]" />
        </motion.div>
        <h2 className="mt-6 font-serif text-4xl font-bold text-text-dark">Thank You!</h2>
        <p className="mt-3 max-w-sm text-text-muted">
          Your order is confirmed. Check your email for details and tracking info.
        </p>
        <button
          onClick={onClose}
          className="mt-8 rounded-md bg-[#2D5E4A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243B35]"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-serif text-3xl font-bold text-text-dark sm:text-4xl"
      >
        Review &amp; Checkout
      </motion.h2>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* ── Left column: Order summary (60%) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:col-span-3"
        >
          <h3 className="text-lg font-bold text-text-dark">Order Summary</h3>

          {/* Plan badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-[#2D5E4A] px-3 py-1 text-xs font-bold text-white">
              {plan.name}
            </span>
            <span className="text-xs text-text-muted">{freqDisplay}</span>
          </div>

          {/* Promo banner */}
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#C8512B]/10 px-3 py-2 text-xs font-semibold text-[#C8512B]">
            <PartyPopper size={14} /> Free Steak For A Year — included!
          </div>

          {/* Item list */}
          <ul className="mt-5 divide-y divide-border" aria-label="Order items">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-dark truncate">{item.name}</p>
                  <p className="text-xs text-text-muted">Qty: {item.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onBack}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-[#2D5E4A]/10 transition-colors"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-[#C8512B]/10 hover:text-[#C8512B] transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-3 border-border" />
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Subtotal</span>
            <span className="text-text-dark">${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Shipping</span>
            <span className="font-medium text-[#2D5E4A]">FREE</span>
          </div>
          <hr className="my-3 border-border" />
          <div className="flex justify-between text-base font-bold">
            <span className="text-text-dark">Total</span>
            <span className="text-[#2D5E4A]">${total}</span>
          </div>
        </motion.div>

        {/* ── Right column: Checkout form (40%) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <form
            onSubmit={(e) => { e.preventDefault(); setPlaced(true); }}
            className="space-y-3"
            aria-label="Checkout form"
          >
            <label className="sr-only" htmlFor="checkout-email">Email address</label>
            <input id="checkout-email" placeholder="Email address" type="email" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none transition-colors focus:border-[#2D5E4A]" />

            <label className="sr-only" htmlFor="checkout-name">Full name</label>
            <input id="checkout-name" placeholder="Full Name" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A]" />

            <label className="sr-only" htmlFor="checkout-address">Street address</label>
            <input id="checkout-address" placeholder="Street Address" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A]" />

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div>
                <label className="sr-only" htmlFor="checkout-city">City</label>
                <input id="checkout-city" placeholder="City" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A] sm:px-4" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-state">State</label>
                <input id="checkout-state" placeholder="State" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A] sm:px-4" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-zip">ZIP</label>
                <input id="checkout-zip" placeholder="ZIP" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A] sm:px-4" />
              </div>
            </div>

            <hr className="!my-4 border-border" />

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="col-span-3 sm:col-span-1">
                <label className="sr-only" htmlFor="checkout-card">Card number</label>
                <input id="checkout-card" placeholder="Card number" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A]" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-exp">Expiration</label>
                <input id="checkout-exp" placeholder="MM / YY" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A] sm:px-4" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-cvc">CVC</label>
                <input id="checkout-cvc" placeholder="CVC" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D5E4A] sm:px-4" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#2D5E4A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243B35]"
            >
              Place Order
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 text-center text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
              aria-label="Go back"
            >
              ← Back to product selection
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
