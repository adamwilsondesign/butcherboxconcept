"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const CATEGORIES = [
  {
    name: "Beef",
    filterCategory: "Beef",
    image: IMAGES.barbacoa,
    alt: "Slow-cooked barbacoa beef",
  },
  {
    name: "Poultry",
    filterCategory: "Chicken",
    image: IMAGES.dicedChicken,
    alt: "Seasoned diced chicken",
  },
  {
    name: "Seafood",
    filterCategory: "Seafood",
    image: IMAGES.scallops,
    alt: "Pan-seared sea scallops",
  },
  {
    name: "Specialty",
    filterCategory: "Ready to Cook",
    image: IMAGES.smashBurger,
    alt: "Gourmet smash burgers",
  },
];

const LIFESTYLE_PILLS = [
  "Keto & Paleo",
  "High Protein",
  "Family-Friendly",
  "Ready to Cook",
  "Whole30\u00AE",
];

export default function ProteinCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#FAF7F2] py-10 sm:py-14" id="proteins">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Category rows — compact editorial layout */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() =>
                openSignup({ prefilterCategory: cat.filterCategory })
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className={`group flex w-full cursor-pointer items-center gap-4 sm:gap-8 lg:gap-12 ${
                i % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Text block */}
              <div
                className={`flex flex-1 flex-col ${
                  i % 2 === 1 ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <h3 className="font-display text-5xl leading-[0.9] text-[#1B4332] transition-colors duration-300 group-hover:text-[#40916C] sm:text-6xl lg:text-7xl">
                  {cat.name}
                </h3>
              </div>

              {/* Circular image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
