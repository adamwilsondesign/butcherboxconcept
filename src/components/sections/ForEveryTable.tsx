"use client";

import { useState, useRef } from "react";
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

const cardVariant = { initial: { opacity: 0, y: 20, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.97 } };

export default function ForEveryTable() {
  const { openSignup } = useSignup();
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const active = FILTERS.find((f) => f.key === activeFilter) ?? FILTERS[0];

  return (
    <section className="bg-[#F7F3EE]" id="products">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
          <SectionHeading label="Shop by Protein" heading="For Every Table" />
        </motion.div>

        {/* Filter tabs — pill style */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }} className="mt-10">
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center">
            {FILTERS.map((filter) => (
              <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={`shrink-0 rounded-pill px-7 py-3 text-[14px] font-medium transition-all duration-200 ${activeFilter === filter.key ? "bg-[#1B3A2D] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1B3A2D]/5"}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product grid */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div key={active.key} initial="initial" animate="animate" exit="exit" transition={{ staggerChildren: 0.06 }} className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
              {active.products.map((product, i) => (
                <motion.div key={product.id} variants={cardVariant} transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" as const }}>
                  <div className="group overflow-hidden rounded-card bg-white shadow-card">
                    {/* Image — 240px height */}
                    <div className="h-[200px] w-full overflow-hidden sm:h-[240px]">
                      <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    {/* Content — 20px padding */}
                    <div className="p-4 sm:p-5">
                      <h4 className="text-[14px] font-medium text-[#1A1A1A] sm:text-[16px]">{product.name}</h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display text-[20px] font-semibold text-[#1B3A2D]">${product.price}</span>
                        <span className="text-[13px] text-[#6B6B6B] line-through">${product.originalPrice}</span>
                      </div>
                      <button
                        onClick={() => openSignup()}
                        className="mt-3 w-full rounded-pill border border-[#1B3A2D] py-2 text-[13px] font-semibold text-[#1B3A2D] transition-all duration-200 hover:bg-[#1B3A2D] hover:text-white"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
