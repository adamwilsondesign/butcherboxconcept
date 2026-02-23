"use client";

import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const PRODUCTS = [
  { id: 1, name: "Grass-Fed Ribeye Steak", detail: "10 oz · USDA Choice", image: IMAGES.ribeye },
  { id: 2, name: "Organic Chicken Breast", detail: "1 lb · Free-Range", image: IMAGES.chickenBreast },
  { id: 3, name: "Wild Alaskan Salmon", detail: "6 oz · Sockeye Fillet", image: IMAGES.salmon },
  { id: 4, name: "Heritage Pork Chops", detail: "12 oz · Bone-In", image: IMAGES.porkChops },
  { id: 5, name: "Wagyu Blend Burgers", detail: "6 oz patties · Pack of 4", image: IMAGES.smashBurger },
] as const;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const rowReveal = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } } };

export default function FeaturedCuts() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="featured-cuts">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C8512B]">Real Ingredients. Unreal Taste.</p>
          <h2 className="font-serif text-5xl font-bold leading-tight text-text-dark sm:text-6xl">Level Up Your Dinner</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: "easeOut" as const }} className="overflow-hidden rounded-2xl">
            <img src={IMAGES.whatsInBox} alt="Artful arrangement of ButcherBox cuts" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </motion.div>

          <div className="flex flex-col">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="flex flex-col">
              {PRODUCTS.map((product, i) => (
                <motion.div key={product.id} variants={rowReveal}>
                  <motion.button whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={() => openSignup()} aria-label={`Add ${product.name} to box`} className="group flex w-full items-center gap-4 border-b border-border py-5 text-left first:pt-0 sm:gap-5">
                    <span className="w-5 shrink-0 text-sm font-semibold text-text-muted/50">{String(i + 1).padStart(2, "0")}</span>
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
                      <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-text-dark group-hover:text-[#2D5E4A] transition-colors duration-200">{product.name}</h3>
                      <p className="mt-0.5 text-sm text-text-muted">{product.detail}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8512B]/10 text-[#C8512B] transition-all duration-200 group-hover:bg-[#C8512B] group-hover:text-white group-hover:shadow-md">
                      <Plus size={18} strokeWidth={2.5} />
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
              <button onClick={() => openSignup()} className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#2D5E4A] transition-colors hover:text-[#3A7D64]">
                Explore all products
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
