"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

/* ── Mock order data (in production, passed via context/URL params) ── */
const ORDER_ITEMS = [
  {
    name: "Ribeye Steak 2pk",
    variant: "1.5 lb · 100% Grass-Fed",
    image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/Ribeyes_1815BBoxMeatonBoards-1.jpg.webp?v=1758046538",
    qty: 1,
    price: 0,
  },
  {
    name: "Organic Chicken Breast",
    variant: "3 lb · Free-Range Organic",
    image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/ChickenBreasts-3pack-1826BBoxChixSkinlessBreasts-1_adc084cc-f2fd-41d1-ab08-c7ee8fe8d021.jpg.webp?v=1748013239",
    qty: 1,
    price: 0,
  },
  {
    name: "Sockeye Salmon",
    variant: "1 lb · Wild-Caught",
    image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SockeyeSalmon-1826BBoxSockeyeSalmon-1_06c04eb6-c711-4b52-8de0-6e0a7942fe46.jpg.webp?v=1757951042",
    qty: 1,
    price: 0,
  },
];

const SUBTOTAL = 249.0;
const TAX = 22.41;
const TOTAL = SUBTOTAL + TAX;

/* Shopify-style input */
function ShopInput({
  label,
  id,
  type = "text",
  half = false,
  third = false,
}: {
  label: string;
  id: string;
  type?: string;
  half?: boolean;
  third?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const floated = focused || value.length > 0;

  return (
    <div className={`relative ${half ? "col-span-1" : third ? "col-span-1" : "col-span-full"}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full rounded-md border bg-white px-3 pb-2 pt-5 text-sm text-[#333] outline-none transition-colors ${
          focused ? "border-[#197BBD] ring-1 ring-[#197BBD]/30" : "border-[#D9D9D9]"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3 transition-all duration-200 ${
          floated
            ? "top-1.5 text-[10px] text-[#737373]"
            : "top-3.5 text-sm text-[#737373]"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function CheckoutPage() {
  const [emailOffers, setEmailOffers] = useState(false);

  return (
    <>
      {/* Hide inherited navbar + footer */}
      <style>{`
        header, nav, footer, [data-navbar], [data-promobar] { display: none !important; }
      `}</style>

      <div className="min-h-screen bg-white font-sans text-[#333]">
        <div className="mx-auto flex max-w-[1100px] flex-col lg:flex-row">

          {/* ══════════ Left Column ══════════ */}
          <div className="flex-1 px-6 py-10 sm:px-10 lg:border-r lg:border-[#E6E6E6] lg:px-14 lg:py-12">

            {/* Store name */}
            <h1 className="text-xl font-normal text-[#333]">ButcherBox</h1>

            {/* Breadcrumb */}
            <nav className="mt-2 flex items-center gap-1 text-xs text-[#737373]" aria-label="Checkout steps">
              <a href="#" className="text-[#197BBD] hover:text-[#145f94]">Cart</a>
              <ChevronRight size={10} className="text-[#B3B3B3]" />
              <span className="font-semibold text-[#333]">Information</span>
              <ChevronRight size={10} className="text-[#B3B3B3]" />
              <span>Shipping</span>
              <ChevronRight size={10} className="text-[#B3B3B3]" />
              <span>Payment</span>
            </nav>

            {/* Express checkout */}
            <div className="mt-8">
              <p className="text-center text-xs text-[#737373]">Express checkout</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button className="flex h-[52px] items-center justify-center rounded-md bg-[#5A31F4] text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90">
                  Shop Pay
                </button>
                <button className="flex h-[52px] items-center justify-center rounded-md bg-[#FFC43A] text-[#003087] text-sm font-bold tracking-wide transition-opacity hover:opacity-90">
                  PayPal
                </button>
                <button className="flex h-[52px] items-center justify-center rounded-md bg-black text-white text-sm font-medium tracking-wide transition-opacity hover:opacity-90">
                  G Pay
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E6E6E6]" />
              <span className="text-xs uppercase text-[#737373]">or</span>
              <div className="h-px flex-1 bg-[#E6E6E6]" />
            </div>

            {/* Contact information */}
            <div>
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-normal text-[#333]">Contact information</h2>
                <p className="text-xs text-[#737373]">
                  Already have an account?{" "}
                  <a href="#" className="text-[#197BBD] hover:text-[#145f94]">Log in</a>
                </p>
              </div>
              <div className="mt-4">
                <ShopInput label="Email" id="email" type="email" />
              </div>
              <label className="mt-3 flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                  className="h-[18px] w-[18px] rounded border-[#D9D9D9] text-[#197BBD] accent-[#197BBD]"
                />
                <span className="text-sm text-[#545454]">Email me with news and offers</span>
              </label>
            </div>

            {/* Shipping address */}
            <div className="mt-10">
              <h2 className="text-lg font-normal text-[#333]">Shipping address</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ShopInput label="First name" id="first-name" half />
                <ShopInput label="Last name" id="last-name" half />
                <ShopInput label="Company (optional)" id="company" />
                <ShopInput label="Address" id="address" />
                <ShopInput label="Apartment, suite, etc. (optional)" id="apt" />
                <ShopInput label="City" id="city" />
                <div className="col-span-full grid grid-cols-3 gap-3">
                  {/* Country */}
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-md border border-[#D9D9D9] bg-white px-3 pb-2 pt-5 text-sm text-[#333] outline-none transition-colors focus:border-[#197BBD] focus:ring-1 focus:ring-[#197BBD]/30"
                      defaultValue="US"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                    <label className="pointer-events-none absolute left-3 top-1.5 text-[10px] text-[#737373]">
                      Country/region
                    </label>
                    <ChevronRight size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#737373]" />
                  </div>
                  {/* State */}
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-md border border-[#D9D9D9] bg-white px-3 pb-2 pt-5 text-sm text-[#333] outline-none transition-colors focus:border-[#197BBD] focus:ring-1 focus:ring-[#197BBD]/30"
                      defaultValue=""
                    >
                      <option value="" disabled>State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                    <label className="pointer-events-none absolute left-3 top-1.5 text-[10px] text-[#737373]">
                      State
                    </label>
                    <ChevronRight size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#737373]" />
                  </div>
                  <ShopInput label="ZIP code" id="zip" third />
                </div>
                <ShopInput label="Phone" id="phone" type="tel" />
              </div>
            </div>

            {/* Continue to shipping + Return to cart */}
            <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <a href="/" className="text-sm text-[#197BBD] hover:text-[#145f94]">
                &lsaquo; Return to cart
              </a>
              <button className="w-full rounded-md bg-[#197BBD] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#145f94] sm:w-auto">
                Continue to shipping
              </button>
            </div>

            {/* Footer links */}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#E6E6E6] pt-6 text-xs text-[#197BBD]">
              <a href="#" className="hover:text-[#145f94]">Refund policy</a>
              <a href="#" className="hover:text-[#145f94]">Privacy policy</a>
              <a href="#" className="hover:text-[#145f94]">Terms of service</a>
            </div>
          </div>

          {/* ══════════ Right Column — Order Summary ══════════ */}
          <div className="bg-[#FAFAFA] px-6 py-10 sm:px-10 lg:w-[420px] lg:shrink-0 lg:px-12 lg:py-12">

            {/* Items */}
            <div className="space-y-5">
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  {/* Thumbnail with badge */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E6E6E6]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#737373] text-[10px] font-semibold text-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#333] truncate">{item.name}</p>
                    <p className="text-xs text-[#737373]">{item.variant}</p>
                  </div>
                  <span className="text-sm text-[#333]">
                    {item.price === 0 ? "Included" : `$${item.price.toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Discount code */}
            <div className="mt-6 flex gap-2 border-t border-[#E6E6E6] pt-6">
              <input
                type="text"
                placeholder="Gift card or discount code"
                className="flex-1 rounded-md border border-[#D9D9D9] bg-white px-3 py-3 text-sm text-[#333] placeholder:text-[#B3B3B3] outline-none focus:border-[#197BBD]"
              />
              <button className="rounded-md bg-[#E6E6E6] px-5 py-3 text-sm font-medium text-[#737373] transition-colors hover:bg-[#D9D9D9] hover:text-[#545454]">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 border-t border-[#E6E6E6] pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#737373]">Subtotal</span>
                <span className="text-[#333]">${SUBTOTAL.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#737373]">Shipping</span>
                <span className="text-xs text-[#737373]">Calculated at next step</span>
              </div>
            </div>

            {/* Grand total */}
            <div className="mt-6 flex items-baseline justify-between border-t border-[#E6E6E6] pt-6">
              <span className="text-base text-[#333]">Total</span>
              <div className="text-right">
                <p className="text-xs text-[#737373]">Including ${TAX.toFixed(2)} in taxes</p>
                <p className="mt-0.5">
                  <span className="text-xs text-[#737373]">USD </span>
                  <span className="text-2xl font-semibold text-[#333]">${TOTAL.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
