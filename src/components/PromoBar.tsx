"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PROMO_TEXT =
  "Free Steak For A Year — Claim Yours Today  \u25C6  Free Shipping on Every Order  \u25C6  Skip or Cancel Anytime  \u25C6  100% Satisfaction Guaranteed  \u25C6  70,000+ Five-Star Reviews  \u25C6  B Corp Certified  \u25C6  ";

export default function PromoBar({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss();
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center overflow-hidden bg-[#005A73]"
      role="banner"
    >
      {/* Scrolling marquee — 4x repeated for seamless loop */}
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-xs font-medium tracking-wide text-white sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide text-white sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide text-white sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide text-white sm:text-sm">
          {PROMO_TEXT}
        </span>
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-white/60 transition-colors hover:text-white"
        aria-label="Dismiss promo bar"
      >
        <X size={14} />
      </button>
    </div>
  );
}
