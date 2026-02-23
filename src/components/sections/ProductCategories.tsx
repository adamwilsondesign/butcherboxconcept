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

export default function ProductCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="categories">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading heading="Premium Proteins, Your Way" />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CATEGORIES.map((category, i) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
              aria-label={`Explore ${category.name}`}
              onClick={() => openSignup({ prefilterCategory: category.filterCategory })}
              className="group relative flex flex-col overflow-hidden rounded-card bg-surface text-left shadow-card"
              style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            >
              <div className="relative w-full overflow-hidden">
                <div className="h-56 w-full sm:h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="text-[16px] font-medium text-[#2A2A2A]">{category.name}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1B4332]/20 text-[#1B4332] transition-all duration-300 group-hover:border-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white">
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
