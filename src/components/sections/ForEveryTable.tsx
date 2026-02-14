"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";

/* ── Types ── */

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
}

interface FilterCategory {
  key: string;
  label: string;
  description: string;
  products: Product[];
}

/* ── Filter data ── */

const FILTERS: FilterCategory[] = [
  {
    key: "all",
    label: "All",
    description:
      "Our full selection of premium proteins — from everyday essentials to showstopper cuts.",
    products: [
      { id: 1, name: "Grass-Fed NY Strip", image: IMAGES.nyStrip, price: 16, originalPrice: 20 },
      { id: 2, name: "Free-Range Drumsticks", image: IMAGES.bonelessThighs, price: 9, originalPrice: 12 },
      { id: 3, name: "Wild Sockeye Salmon", image: IMAGES.salmon, price: 14, originalPrice: 17 },
      { id: 4, name: "Heritage Pork Tenderloin", image: IMAGES.porkTenderloin, price: 13, originalPrice: 16 },
      { id: 5, name: "Wagyu Burger Blend", image: IMAGES.smashBurger, price: 15, originalPrice: 18 },
      { id: 6, name: "Organic Chicken Thighs", image: IMAGES.chickenThighs, price: 11, originalPrice: 14 },
    ],
  },
  {
    key: "keto",
    label: "Keto",
    description:
      "High-fat, zero-carb cuts perfect for ketogenic lifestyles. Rich marbling and healthy fats.",
    products: [
      { id: 10, name: "Ribeye Steak", image: IMAGES.ribeye, price: 18, originalPrice: 22 },
      { id: 11, name: "Bacon-Wrapped Filet", image: IMAGES.bacon, price: 21, originalPrice: 26 },
      { id: 12, name: "Salmon Belly Strips", image: IMAGES.salmon, price: 16, originalPrice: 19 },
      { id: 13, name: "Pork Belly Slices", image: IMAGES.porkRoast, price: 14, originalPrice: 17 },
      { id: 14, name: "Lamb Shoulder Chops", image: IMAGES.sirloin, price: 17, originalPrice: 21 },
    ],
  },
  {
    key: "paleo",
    label: "Paleo",
    description:
      "Clean proteins with no additives. Grass-fed, pasture-raised, and wild-caught — as nature intended.",
    products: [
      { id: 20, name: "Grass-Fed Flank Steak", image: IMAGES.groundSirloin, price: 14, originalPrice: 18 },
      { id: 21, name: "Organic Whole Chicken", image: IMAGES.wholeChicken, price: 16, originalPrice: 20 },
      { id: 22, name: "Wild Cod Fillets", image: IMAGES.cod, price: 13, originalPrice: 16 },
      { id: 23, name: "Bison Ground Blend", image: IMAGES.bison, price: 15, originalPrice: 18 },
    ],
  },
  {
    key: "whole30",
    label: "Whole30",
    description:
      "Whole30-approved proteins with zero sugar, additives, or fillers. Clean eating made easy.",
    products: [
      { id: 30, name: "Chicken Breast Tenders", image: IMAGES.chickenBreast, price: 12, originalPrice: 15 },
      { id: 31, name: "Ground Turkey", image: IMAGES.groundTurkey, price: 10, originalPrice: 13 },
      { id: 32, name: "Wild Shrimp", image: IMAGES.lobster, price: 14, originalPrice: 17 },
      { id: 33, name: "Sirloin Steak Tips", image: IMAGES.sirloin, price: 15, originalPrice: 19 },
      { id: 34, name: "Pork Chops", image: IMAGES.porkChops, price: 13, originalPrice: 16 },
    ],
  },
  {
    key: "family",
    label: "Family Packs",
    description:
      "Bigger portions, better value. Crowd-pleasing packs that make weeknight dinners effortless.",
    products: [
      { id: 40, name: "Chicken Breast 4-Pack", image: IMAGES.chickenBreast, price: 22, originalPrice: 28 },
      { id: 41, name: "Burger Night Bundle", image: IMAGES.smashBurger, price: 24, originalPrice: 30 },
      { id: 42, name: "Taco Tuesday Pack", image: IMAGES.barbacoa, price: 19, originalPrice: 24 },
      { id: 43, name: "Salmon Family Box", image: IMAGES.salmon, price: 28, originalPrice: 34 },
    ],
  },
  {
    key: "quick",
    label: "Quick Cook",
    description:
      "Pre-marinated and ready in under 15 minutes. Perfect for busy weeknights.",
    products: [
      { id: 50, name: "Teriyaki Chicken", image: IMAGES.dicedChicken, price: 13, originalPrice: 16 },
      { id: 51, name: "Herb-Crusted Salmon", image: IMAGES.salmon, price: 15, originalPrice: 18 },
      { id: 52, name: "Garlic Steak Strips", image: IMAGES.barbacoa, price: 14, originalPrice: 17 },
      { id: 53, name: "BBQ Pork Chops", image: IMAGES.porkChops, price: 13, originalPrice: 16 },
      { id: 54, name: "Lemon Butter Shrimp", image: IMAGES.scallops, price: 14, originalPrice: 17 },
      { id: 55, name: "Italian Sausage Links", image: IMAGES.bacon, price: 11, originalPrice: 14 },
    ],
  },
];

/* ── Animation variants ── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariant = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.97 },
};

/* ── Section component ── */

export default function ForEveryTable() {
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = FILTERS.find((f) => f.key === activeFilter) ?? FILTERS[0];

  return (
    <section className="bg-background" id="products">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="Something For Everyone"
            heading="For Every Table"
            subtitle="Over 400,000 members cook with us. Premium proteins that fit every diet and every lifestyle."
          />
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }}
          className="mt-12"
        >
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface text-text-dark hover:bg-primary/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Content: sidebar + product grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="sticky top-[132px]"
              >
                <h3 className="font-serif text-2xl font-bold text-text-dark sm:text-3xl">
                  {active.label}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                  {active.description}
                </p>
                <div className="mt-5 h-[3px] w-12 rounded-full bg-primary-light/30" />
                <p className="mt-4 text-sm font-medium text-primary-light">
                  {active.products.length} products
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ staggerChildren: 0.06 }}
                className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
              >
                {active.products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariant}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.06,
                      ease: "easeOut" as const,
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(36,59,53,0.12)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-surface shadow-sm"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                        <h4 className="text-sm font-bold leading-snug text-text-dark group-hover:text-primary-light transition-colors duration-200 sm:text-base">
                          {product.name}
                        </h4>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-base font-bold text-primary-light">
                            ${product.price}
                          </span>
                          <span className="text-sm text-text-muted line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
