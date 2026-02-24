"use client";

import { motion } from "framer-motion";
import MaskedImage from "@/components/ui/MaskedImage";
import { useSignup } from "@/components/signup/SignupFlow";

const CATEGORIES = [
  {
    name: "Grass-Fed Beef",
    image:
      "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/Ribeyes_1815BBoxMeatonBoards-1.jpg.webp",
    desc: "100% grass-fed & pasture-raised. No feedlots, ever.",
  },
  {
    name: "Organic Chicken",
    image:
      "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/ChickenBreasts-3pack-1826BBoxChixSkinlessBreasts-1_adc084cc-f2fd-41d1-ab08-c7ee8fe8d021.jpg.webp",
    desc: "Free-range, organic, antibiotic-free.",
  },
  {
    name: "Wild-Caught Seafood",
    image:
      "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SockeyeSalmon-1826BBoxSockeyeSalmon-1_06c04eb6-c711-4b52-8de0-6e0a7942fe46.jpg.webp",
    desc: "Sustainably harvested from pristine waters.",
  },
  {
    name: "Crate-Free Pork",
    image:
      "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/PorkTenderloin-1826BBoxPorkTenderloin-V2.jpg.webp",
    desc: "Heritage-quality, humanely raised pork.",
  },
];

const LIFESTYLE_PILLS = [
  "Keto & Paleo",
  "High Protein",
  "Family-Friendly",
  "Ready to Cook",
  "Whole30®",
];

export default function SomethingForEveryone() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#FAF7F2] py-20" id="proteins">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
            Premium Proteins for Every Lifestyle
          </span>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-[#1A1A1A] sm:text-[44px]">
            Something for Every Table
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#6B6B6B]">
            Over 400,000 members trust ButcherBox for protein that fits the way
            they eat. From keto to family-friendly, we&apos;ve got your table
            covered.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => openSignup()}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-0 text-left shadow-card transition-shadow"
            >
              {/* Image — top 60% */}
              <div className="relative overflow-hidden" style={{ height: "60%" }}>
                <MaskedImage
                  src={cat.image}
                  alt={cat.name}
                  variant="oval"
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {/* Text */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-[#1A1A1A]">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-sm text-[#6B6B6B]">{cat.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lifestyle pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {LIFESTYLE_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => openSignup()}
              className="rounded-full border border-[#E5DDD4] bg-white px-4 py-2 text-sm text-[#243B35] transition-all hover:bg-[#2D5E4A] hover:text-white"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
