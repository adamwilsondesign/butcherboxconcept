"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
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
  "Whole30\u00AE",
];

export default function SomethingForEveryone() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32" id="proteins">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="Premium Proteins for Every Lifestyle"
          title="Something for Every Table"
          subtitle="Over 400,000 members trust ButcherBox for protein that fits the way they eat. From keto to family-friendly, we've got your table covered."
        />

        {/* Category Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => openSignup()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Text */}
              <div className="p-8 sm:p-10">
                <h3 className="font-display text-xl text-[#1A1A1A] sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#6B6B6B]">
                  {cat.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2D6A4F] transition-colors group-hover:text-[#1B4332]">
                  Shop Now →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lifestyle pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {LIFESTYLE_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => openSignup()}
              className="rounded-full border border-[#E5DDD4] bg-white px-5 py-2.5 text-sm font-medium text-[#1B4332] transition-all hover:bg-[#1B4332] hover:text-white"
            >
              {pill}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
