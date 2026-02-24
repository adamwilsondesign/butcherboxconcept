"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PROMO_SEGMENTS = [
  { text: "Free Steak For A Year — Claim Yours Today", highlight: true },
  { text: "Free Shipping on Every Order", highlight: false },
  { text: "Skip or Cancel Anytime", highlight: false },
  { text: "100% Satisfaction Guaranteed", highlight: false },
  { text: "70,000+ Five-Star Reviews", highlight: false },
  { text: "B Corp Certified", highlight: false },
];

function PromoText() {
  return (
    <>
      {PROMO_SEGMENTS.map((seg, i) => (
        <span key={i}>
          <span
            className={
              seg.highlight
                ? "font-semibold text-[#C8512B]"
                : "text-white"
            }
          >
            {seg.text}
          </span>
          <span className="mx-4 text-white/30">{"\u25C6"}</span>
        </span>
      ))}
    </>
  );
}

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
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center overflow-hidden bg-[#243B35]"
      role="banner"
    >
      {/* Scrolling marquee — 4x repeated for seamless loop */}
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          <PromoText />
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          <PromoText />
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          <PromoText />
        </span>
        <span className="text-xs font-medium tracking-wide sm:text-sm">
          <PromoText />
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
