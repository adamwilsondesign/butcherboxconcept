"use client";

import { useState } from "react";
import PromoBar from "./PromoBar";
import Navbar from "./Navbar";

export default function ClientShell() {
  const [promoVisible, setPromoVisible] = useState(true);

  return (
    <div data-navbar>
      {promoVisible && (
        <PromoBar onDismiss={() => setPromoVisible(false)} />
      )}
      <Navbar promoVisible={promoVisible} />
      {/* Spacer to offset fixed nav + optional promo bar */}
      <div style={{ height: promoVisible ? 104 : 68 }} />
    </div>
  );
}
