"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const CATEGORIES = [
  { name: "Beef & Bison", image: IMAGES.ribeye, filterCategory: "Beef" },
  { name: "Chicken & Pork", image: IMAGES.chickenBreast, filterCategory: "Chicken" },
  { name: "Wild Seafood", image: IMAGES.salmon, filterCategory: "Seafood" },
  { name: "Ready to Cook", image: IMAGES.barbacoa, filterCategory: "Ready to Cook" },
] as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardReveal = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function ProductCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="categories">
      <div className="mx-auto w-full max-w-7xl px-6 py-[100px] sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
          <SectionHeading heading="Premium Proteins, Your Way" />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.name}
              variants={cardReveal}
              aria-label={`Explore ${category.name}`}
              onClick={() => openSignup({ prefilterCategory: category.filterCategory })}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="relative w-full overflow-hidden">
                <div className="h-56 w-full transition-transform duration-500 group-hover:scale-105 sm:h-64">
                  <img src={category.image} alt={category.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="text-[16px] font-semibold text-[#2C2C2C]">{category.name}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#243B35]/20 text-[#243B35] transition-all duration-300 group-hover:border-[#243B35] group-hover:bg-[#243B35] group-hover:text-white">
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
