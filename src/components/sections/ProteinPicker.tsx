"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";

interface ProteinCategory {
  id: string;
  label: string;
  tagline: string;
  image: string;
  products: { name: string; image: string }[];
}

const CATEGORIES: ProteinCategory[] = [
  {
    id: "Beef",
    label: "Grass-Fed Beef",
    tagline: "100% grass-fed, pasture-raised. Never any feedlots.",
    image: IMAGES.ribeye,
    products: [
      { name: "Ribeyes", image: IMAGES.ribeye },
      { name: "NY Strip", image: IMAGES.nyStrip },
      { name: "Top Sirloin", image: IMAGES.sirloin },
      { name: "Ground Beef", image: IMAGES.groundBeef },
    ],
  },
  {
    id: "Chicken",
    label: "Free-Range Chicken",
    tagline: "Organic & free-range. No antibiotics ever.",
    image: IMAGES.chickenBreast,
    products: [
      { name: "Breasts", image: IMAGES.chickenBreast },
      { name: "Thighs", image: IMAGES.chickenThighs },
      { name: "Whole Chicken", image: IMAGES.wholeChicken },
      { name: "Ground Turkey", image: IMAGES.groundTurkey },
    ],
  },
  {
    id: "Pork",
    label: "Crate-Free Pork",
    tagline: "Heritage-breed, humanely raised. Always crate-free.",
    image: IMAGES.porkChops,
    products: [
      { name: "Pork Chops", image: IMAGES.porkChops },
      { name: "Tenderloin", image: IMAGES.porkTenderloin },
      { name: "Bacon", image: IMAGES.bacon },
      { name: "Pork Roast", image: IMAGES.porkRoast },
    ],
  },
  {
    id: "Seafood",
    label: "Wild-Caught Seafood",
    tagline: "Sustainably sourced from pristine waters.",
    image: IMAGES.salmon,
    products: [
      { name: "Salmon", image: IMAGES.salmon },
      { name: "Scallops", image: IMAGES.scallops },
      { name: "Lobster", image: IMAGES.lobster },
      { name: "Cod", image: IMAGES.cod },
    ],
  },
];

export default function ProteinPicker() {
  const { openSignup } = useSignup();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CATEGORIES[activeIdx];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="Discover 100+ Premium Proteins"
          title="What Are You In The Mood For?"
        />

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveIdx(i)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeIdx === i
                  ? "bg-[#2D6A4F] text-white shadow-md"
                  : "bg-[#FAF7F2] text-[#1A1A1A] hover:bg-[#2D6A4F]/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active category showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-10 overflow-hidden rounded-2xl border border-[#E5DDD4] bg-[#FAF7F2]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — hero image + info */}
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={active.image}
                  alt={active.label}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(27,67,50,0.85) 0%, rgba(27,67,50,0.3) 50%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#40916C]">
                    {active.label}
                  </span>
                  <p className="mt-2 text-lg font-medium text-white/90 sm:text-xl" style={{ lineHeight: 1.6 }}>
                    {active.tagline}
                  </p>
                  <button
                    onClick={() => openSignup({ prefilterCategory: active.id })}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2D6A4F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
                  >
                    Shop {active.label} <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right — product grid */}
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#005A73]">
                  Popular cuts
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {active.products.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => openSignup({ prefilterCategory: active.id })}
                      className="group flex flex-col overflow-hidden rounded-xl border border-[#E5DDD4] bg-white transition-all duration-200 hover:border-[#2D6A4F]/30 hover:shadow-md"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-center justify-between px-3 py-2.5">
                        <span className="text-sm font-semibold text-[#1A1A1A]">
                          {product.name}
                        </span>
                        <ArrowRight size={14} className="text-[#2D6A4F] opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => openSignup({ prefilterCategory: active.id })}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#1B4332] py-3 text-sm font-semibold text-[#1B4332] transition-colors hover:bg-[#1B4332] hover:text-white"
                >
                  View All {active.label} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
