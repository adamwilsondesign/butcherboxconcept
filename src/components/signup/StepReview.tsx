"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, PartyPopper, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/products";

interface Props {
  orderType: "subscribe" | "onetime";
  boxSize: "classic" | "big";
  frequency: string;
  items: CartItem[];
  onUpdateItems: (items: CartItem[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export default function StepReview({ orderType, boxSize, frequency, items, onUpdateItems, onBack, onClose }: Props) {
  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = orderType === "subscribe" ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discount;

  const updateItemQty = (id: number, qty: number) => {
    if (qty <= 0) {
      onUpdateItems(items.filter((i) => i.id !== id));
    } else {
      onUpdateItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center px-4 py-20 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light/10">
          <Check size={40} className="text-primary-light" />
        </div>
        <h2 className="mt-6 font-serif text-4xl font-bold text-text-dark">Thank You!</h2>
        <p className="mt-3 max-w-sm text-text-muted">
          Your order is confirmed. Check your email for details and tracking info.
        </p>
        <button
          onClick={onClose}
          className="mt-8 rounded-md bg-primary-light px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
        >
          Back to Home
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

          <div className="mt-4 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold text-white ${orderType === "subscribe" ? "bg-brand-blue" : "bg-accent"}`}>
              {orderType === "subscribe" ? "Subscription" : "One-Time"}
            </span>
            <span className="text-xs text-text-muted capitalize">{boxSize} box</span>
          </div>

          {orderType === "subscribe" && (
            <p className="mt-2 text-xs text-text-muted">{frequency}</p>
          )}

          {orderType === "subscribe" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent">
              <PartyPopper size={14} /> Free Ground Beef for Life!
            </div>
          )}

          {/* Item list with edit/remove */}
          <ul className="mt-5 divide-y divide-border" aria-label="Order items">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-dark truncate">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.weight}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateItemQty(item.id, item.qty - 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-primary/10"
                    aria-label={`Reduce ${item.name}`}
                  >
                    {item.qty === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
                  </button>
                  <span className="w-5 text-center text-xs font-bold">{item.qty}</span>
                  <button
                    onClick={() => updateItemQty(item.id, item.qty + 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light text-white hover:bg-primary"
                    aria-label={`Add ${item.name}`}
                  >
                    <Plus size={11} />
                  </button>
                </div>
                <span className="w-12 text-right text-sm font-medium text-text-dark">
                  ${item.price * item.qty}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-3 border-border" />
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Subtotal</span>
            <span className="text-text-dark">${subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-accent">Subscriber discount (15%)</span>
              <span className="text-accent">-${discount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Shipping</span>
            <span className="font-medium text-primary-light">FREE</span>
          </div>
          <hr className="my-3 border-border" />
          <div className="flex justify-between text-base font-bold">
            <span className="text-text-dark">Total</span>
            <span className="text-primary">${total}</span>
          </div>

          {/* Promo banner */}
          {orderType === "subscribe" && (
            <div className="mt-4 rounded-lg bg-brand-blue/5 border border-brand-blue/20 px-4 py-3 text-center text-xs font-semibold text-brand-blue">
              Subscribers get free shipping + exclusive member deals every month
            </div>
          )}
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
            <input id="checkout-email" placeholder="Email address" type="email" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none transition-colors focus:border-primary-light" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="sr-only" htmlFor="checkout-fname">First name</label>
                <input id="checkout-fname" placeholder="First name" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-lname">Last name</label>
                <input id="checkout-lname" placeholder="Last name" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />
              </div>
            </div>

            <label className="sr-only" htmlFor="checkout-address">Street address</label>
            <input id="checkout-address" placeholder="Street address" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div>
                <label className="sr-only" htmlFor="checkout-city">City</label>
                <input id="checkout-city" placeholder="City" className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light sm:px-4" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-state">State</label>
                <input id="checkout-state" placeholder="State" className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light sm:px-4" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-zip">ZIP</label>
                <input id="checkout-zip" placeholder="ZIP" className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light sm:px-4" />
              </div>
            </div>

            <hr className="!my-4 border-border" />

            <label className="sr-only" htmlFor="checkout-card">Card number</label>
            <input id="checkout-card" placeholder="Card number" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="sr-only" htmlFor="checkout-exp">Expiration</label>
                <input id="checkout-exp" placeholder="MM / YY" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />
              </div>
              <div>
                <label className="sr-only" htmlFor="checkout-cvc">CVC</label>
                <input id="checkout-cvc" placeholder="CVC" className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-dark outline-none focus:border-primary-light" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-primary-light px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              Place Order — ${total}
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
