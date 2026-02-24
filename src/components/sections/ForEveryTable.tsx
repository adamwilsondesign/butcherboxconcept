"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

interface Product { id: number; name: string; image: string; price: number; originalPrice: number; }
interface FilterCategory { key: string; label: string; products: Product[]; }

const FILTERS: FilterCategory[] = [
  { key: "all", label: "All", products: [
    { id: 1, name: "Grass-Fed NY Strip", image: IMAGES.nyStrip, price: 16, originalPrice: 20 },
    { id: 2, name: "Free-Range Drumsticks", image: IMAGES.bonelessThighs, price: 9, originalPrice: 12 },
    { id: 3, name: "Wild Sockeye Salmon", image: IMAGES.salmon, price: 14, originalPrice: 17 },
    { id: 4, name: "Heritage Pork Tenderloin", image: IMAGES.porkTenderloin, price: 13, originalPrice: 16 },
    { id: 5, name: "Wagyu Burger Blend", image: IMAGES.smashBurger, price: 15, originalPrice: 18 },
    { id: 6, name: "Organic Chicken Thighs", image: IMAGES.chickenThighs, price: 11, originalPrice: 14 },
  ] },
  { key: "beef", label: "Beef", products: [
    { id: 10, name: "Ribeye Steak", image: IMAGES.ribeye, price: 18, originalPrice: 22 },
    { id: 11, name: "Grass-Fed NY Strip", image: IMAGES.nyStrip, price: 16, originalPrice: 20 },
    { id: 12, name: "Top Sirloin", image: IMAGES.sirloin, price: 14, originalPrice: 17 },
    { id: 13, name: "Ground Sirloin", image: IMAGES.groundSirloin, price: 10, originalPrice: 13 },
    { id: 14, name: "Wagyu Burger Blend", image: IMAGES.smashBurger, price: 15, originalPrice: 18 },
  ] },
  { key: "chicken", label: "Chicken", products: [
    { id: 20, name: "Chicken Breast 3-Pack", image: IMAGES.chickenBreast, price: 12, originalPrice: 15 },
    { id: 21, name: "Boneless Thighs", image: IMAGES.bonelessThighs, price: 11, originalPrice: 14 },
    { id: 22, name: "Bone-In Thighs", image: IMAGES.chickenThighs, price: 10, originalPrice: 13 },
    { id: 23, name: "Whole Chicken", image: IMAGES.wholeChicken, price: 16, originalPrice: 20 },
    { id: 24, name: "Diced Chicken", image: IMAGES.dicedChicken, price: 13, originalPrice: 16 },
  ] },
  { key: "pork", label: "Pork", products: [
    { id: 30, name: "Pork Tenderloin", image: IMAGES.porkTenderloin, price: 13, originalPrice: 16 },
    { id: 31, name: "Pork Chops", image: IMAGES.porkChops, price: 13, originalPrice: 16 },
    { id: 32, name: "Pork Loin Roast", image: IMAGES.porkRoast, price: 14, originalPrice: 17 },
    { id: 33, name: "Uncured Bacon", image: IMAGES.bacon, price: 11, originalPrice: 14 },
  ] },
  { key: "seafood", label: "Seafood", products: [
    { id: 40, name: "Wild Sockeye Salmon", image: IMAGES.salmon, price: 14, originalPrice: 17 },
    { id: 41, name: "Atlantic Cod", image: IMAGES.cod, price: 13, originalPrice: 16 },
    { id: 42, name: "Sea Scallops", image: IMAGES.scallops, price: 18, originalPrice: 22 },
    { id: 43, name: "Lobster Tails", image: IMAGES.lobster, price: 24, originalPrice: 30 },
  ] },
];

export default function ForEveryTable() {
  const { openSignup } = useSignup();
  const [activeFilter, setActiveFilter] = useState("all");
  const active = FILTERS.find((f) => f.key === activeFilter) ?? FILTERS[0];

  /* Sliding pill highlight state */
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    const btn = tabRefs.current.get(activeFilter);
    const container = tabsContainerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [activeFilter]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const setTabRef = useCallback((key: string, el: HTMLButtonElement | null) => {
    if (el) tabRefs.current.set(key, el);
  }, []);

  return (
    <section className="bg-[#F8F4EF]" id="products">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading label="Shop by Protein" title="For Every Table" />
        </motion.div>

        {/* Filter tabs — sliding pill background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-10"
        >
          <div
            ref={tabsContainerRef}
            className="relative flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Animated pill highlight */}
            <motion.div
              className="absolute top-0 h-full rounded-pill bg-[#1B4332]"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              style={{ height: "100%", zIndex: 0 }}
            />

            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                ref={(el) => setTabRef(filter.key, el)}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative z-10 shrink-0 rounded-pill px-7 py-3 text-[14px] font-medium transition-colors duration-200 ${
                  activeFilter === filter.key
                    ? "text-white"
                    : "text-[#2A2A2A] hover:text-[#1B4332]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product grid — staggered card reveals */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3"
            >
              {active.products.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08, ease: "easeOut" } },
                  }}
                >
                  {/* Card — hover lift + shadow + image scale */}
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group overflow-hidden rounded-card bg-white shadow-card"
                  >
                    {/* Image — overflow hidden, scale on hover */}
                    <div className="h-[200px] w-full overflow-hidden sm:h-[240px]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h4 className="text-[14px] font-medium text-[#2A2A2A] sm:text-[16px]">{product.name}</h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display text-[20px] font-semibold tracking-heading text-[#1B4332]">${product.price}</span>
                        <span className="text-[13px] text-[#767676] line-through">${product.originalPrice}</span>
                      </div>
                      <motion.button
                        onClick={() => openSignup()}
                        whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                        whileTap={{ y: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mt-3 w-full rounded-pill border border-[#1B4332] py-2 text-[13px] font-medium text-[#1B4332] transition-colors duration-200 hover:bg-[#1B4332] hover:text-white"
                      >
                        + Add
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
