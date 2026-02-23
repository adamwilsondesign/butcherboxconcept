"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const CATEGORIES = [
  { name: "Beef & Bison", description: "100% grass-fed, grass-finished", image: IMAGES.ribeye, filterCategory: "Beef" },
  { name: "Chicken & Pork", description: "Heritage breed, free-range", image: IMAGES.chickenBreast, filterCategory: "Chicken" },
  { name: "Wild Seafood", description: "Sustainably caught, never farmed", image: IMAGES.salmon, filterCategory: "Seafood" },
  { name: "Ready to Cook", description: "Marinated, seasoned & ready", image: IMAGES.barbacoa, filterCategory: "Ready to Cook" },
] as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardReveal = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function ProductCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="categories">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
          <SectionHeading eyebrow="What We Offer" heading="Premium Proteins, Your&nbsp;Way" subtitle="Explore our curated categories." />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.name}
              variants={cardReveal}
              aria-label={`Explore ${category.name}`}
              onClick={() => openSignup({ prefilterCategory: category.filterCategory })}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
            >
              <div className="relative w-full overflow-hidden">
                <div className="h-56 w-full transition-transform duration-500 group-hover:scale-105 sm:h-64">
                  <img src={category.image} alt={category.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
              {/* Teal bottom border on hover */}
              <div className="h-1 w-0 bg-[#2D5E4A] transition-all duration-300 group-hover:w-full" />
              <div className="flex flex-1 items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                <div>
                  <h3 className="font-serif text-lg font-bold text-text-dark">{category.name}</h3>
                  <p className="mt-0.5 text-sm text-text-muted">{category.description}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#2D5E4A]/20 text-[#2D5E4A] transition-all duration-300 group-hover:border-[#2D5E4A] group-hover:bg-[#2D5E4A] group-hover:text-white">
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
