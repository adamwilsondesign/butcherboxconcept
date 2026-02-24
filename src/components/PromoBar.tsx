"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PROMO_TEXT =
  "🥩 Free Steak For A Year — Claim Yours Today  ◆  Free Shipping on Every Order  ◆  Skip or Cancel Anytime  ◆  100% Satisfaction Guaranteed  ◆  70,000+ Five-Star Reviews  ◆  B Corp Certified  ◆  ";

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
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center overflow-hidden bg-[#243B35] text-white"
      role="banner"
    >
      {/* Scrolling marquee — double the text for seamless loop */}
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          {PROMO_TEXT}
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
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
