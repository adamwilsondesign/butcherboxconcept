"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pencil, X as XIcon, PartyPopper, ArrowUpRight } from "lucide-react";
import { getUpgradeSavings, type CartItem, type Plan, type AddonItem, type SignupMode } from "@/lib/products";

interface Props {
  plan: Plan;
  frequency: string;
  items: CartItem[];
  mode: SignupMode;
  addons: AddonItem[];
  onToggleAddon: (addon: AddonItem) => void;
  addonCatalog: AddonItem[];
  onUpdateItems: (items: CartItem[]) => void;
  onBack: () => void;
  onChangePlan: () => void;
  onClose: () => void;
}

export default function StepReview({
  plan,
  frequency,
  items,
  mode,
  addons,
  onToggleAddon,
  addonCatalog,
  onUpdateItems,
  onBack,
  onChangePlan,
  onClose,
}: Props) {
  const router = useRouter();
  const isOnetime = mode === "onetime";

  const subtotal = plan.price;
  const addonTotal = addons.reduce((s, a) => s + a.offerPrice, 0);
  const total = subtotal + addonTotal;

  const removeItem = (id: number) => {
    onUpdateItems(items.filter((i) => i.id !== id));
  };

  // Format frequency for display
  const freqDisplay = frequency.replace("Every ", "Every ").replace("Weeks", "Weeks");

  const upgrade = getUpgradeSavings(plan);

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-sans font-bold text-2xl text-text-dark"
      >
        {isOnetime ? "Review Your One-Time Box" : "Review & Checkout"}
      </motion.h2>

      {/* ── Order summary ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-surface p-5"
      >
        <h3 className="text-lg font-bold text-text-dark">Order Summary</h3>

        {/* Plan badge */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-[#2D6A4F] px-3 py-1 text-xs font-bold text-white">
            {plan.name}
          </span>
          {!isOnetime && (
            <span className="text-xs text-text-muted">{freqDisplay}</span>
          )}
          {isOnetime && (
            <span className="text-xs text-text-muted">One-time purchase</span>
          )}
        </div>

        {/* Promo banner — subscription only */}
        {!isOnetime && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#2D6A4F]/10 px-3 py-2 text-xs font-semibold text-[#2D6A4F]">
            <PartyPopper size={14} /> Free Steak For A Year — included!
          </div>
        )}

        {/* Item list */}
        <ul className="mt-4 divide-y divide-border" aria-label="Order items">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-dark truncate">{item.name}</p>
                <p className="text-xs text-text-muted">Qty: {item.qty}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onBack}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-[#2D6A4F]/10 transition-colors"
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-red-50 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <XIcon size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Addon line items */}
        {addons.length > 0 && (
          <ul className="divide-y divide-border border-t border-border">
            {addons.map((addon) => (
              <li key={addon.id} className="flex items-center gap-3 py-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img src={addon.image} alt={addon.name} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-dark truncate">{addon.name}</p>
                  <p className="text-xs text-[#2D6A4F] font-medium">${addon.offerPrice}</p>
                </div>
                <button
                  onClick={() => onToggleAddon(addon)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:bg-red-50 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${addon.name}`}
                >
                  <XIcon size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-3 border-border" />
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="text-text-dark">${subtotal}</span>
        </div>
        {addonTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Add-ons</span>
            <span className="text-text-dark">${addonTotal}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Shipping</span>
          <span className="font-medium text-[#2D6A4F]">FREE</span>
        </div>
        <hr className="my-3 border-border" />
        <div className="flex justify-between text-base font-bold">
          <span className="text-text-dark">Total</span>
          <span className="text-[#2D6A4F]">${total}</span>
        </div>
      </motion.div>

      {/* ── HexClad Cross-Sell Widget ── */}
      {addonCatalog.map((addon) => {
        const isAdded = addons.some((a) => a.id === addon.id);
        return (
          <motion.div
            key={addon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-[#005A73]/15 bg-gradient-to-br from-[#005A73]/5 to-[#2D6A4F]/5 p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#005A73]">
              Exclusive Add-On · Save ${addon.retailPrice - addon.offerPrice}
            </p>
            <div className="mt-2 flex gap-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                <img src={addon.image} alt={addon.name} className="h-full w-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-text-dark leading-tight">
                  {addon.name}
                </h4>
                <p className="mt-1 text-[11px] leading-snug text-text-muted">{addon.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-text-muted line-through">${addon.retailPrice}</span>
                  <span className="text-sm font-bold text-[#2D6A4F]">${addon.offerPrice}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onToggleAddon(addon)}
              className={`mt-3 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                isAdded
                  ? "bg-[#2D6A4F]/10 text-[#2D6A4F] hover:bg-[#2D6A4F]/20"
                  : "bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
              }`}
            >
              {isAdded ? "✓ Added — Remove" : `Add to Box — $${addon.offerPrice}`}
            </button>
          </motion.div>
        );
      })}

      {/* ── Upgrade prompt ── */}
      {upgrade && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="flex items-center gap-3 rounded-xl border border-[#2D6A4F]/20 bg-[#2D6A4F]/5 px-4 py-3"
        >
          <div className="flex-1">
            <p className="text-sm font-bold text-[#1B4332]">
              Want more? Upgrade to {upgrade.nextPlan.name.replace(" Signature Box", "")}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {upgrade.nextPlan.proteins} proteins for ${upgrade.nextPlan.price} ({upgrade.nextPlan.perMeal})
            </p>
          </div>
          <button
            onClick={onChangePlan}
            className="flex shrink-0 items-center gap-1 rounded-lg border-2 border-[#2D6A4F] px-3 py-1.5 text-xs font-semibold text-[#2D6A4F] transition-colors hover:bg-[#2D6A4F] hover:text-white"
          >
            Upgrade <ArrowUpRight size={12} />
          </button>
        </motion.div>
      )}

      {/* ── Checkout form ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); onClose(); router.push("/checkout"); }}
          className="space-y-3"
          aria-label="Checkout form"
        >
          <label className="sr-only" htmlFor="checkout-email">Email address</label>
          <input id="checkout-email" placeholder="Email address" type="email" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none transition-colors focus:border-[#2D6A4F]" />

          <label className="sr-only" htmlFor="checkout-name">Full name</label>
          <input id="checkout-name" placeholder="Full Name" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />

          <label className="sr-only" htmlFor="checkout-address">Street address</label>
          <input id="checkout-address" placeholder="Street Address" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="sr-only" htmlFor="checkout-city">City</label>
              <input id="checkout-city" placeholder="City" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
            <div>
              <label className="sr-only" htmlFor="checkout-state">State</label>
              <input id="checkout-state" placeholder="State" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
            <div>
              <label className="sr-only" htmlFor="checkout-zip">ZIP</label>
              <input id="checkout-zip" placeholder="ZIP" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
          </div>

          <hr className="!my-4 border-border" />

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3">
              <label className="sr-only" htmlFor="checkout-card">Card number</label>
              <input id="checkout-card" placeholder="Card number" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-4 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
            <div>
              <label className="sr-only" htmlFor="checkout-exp">Expiration</label>
              <input id="checkout-exp" placeholder="MM / YY" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
            <div>
              <label className="sr-only" htmlFor="checkout-cvc">CVC</label>
              <input id="checkout-cvc" placeholder="CVC" className="w-full rounded-md border border-[#E5DDD4] bg-[#FAF7F2] px-3 py-2.5 text-sm text-text-dark outline-none focus:border-[#2D6A4F]" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#2D6A4F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
          >
            {isOnetime ? "Complete Purchase" : "Continue to Checkout"}
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
  );
}
