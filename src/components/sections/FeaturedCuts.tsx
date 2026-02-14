"use client";

import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const PRODUCTS = [
  { id: 1, name: "Grass-Fed Ribeye Steak", detail: "10 oz · USDA Choice", placeholder: "Marbled ribeye steak", color: "#C4A282" },
  { id: 2, name: "Organic Chicken Breast", detail: "1 lb · Free-Range", placeholder: "Raw chicken breast", color: "#D4C4A8" },
  { id: 3, name: "Wild Alaskan Salmon", detail: "6 oz · Sockeye Fillet", placeholder: "Salmon fillet", color: "#C2A8A0" },
  { id: 4, name: "Heritage Pork Chops", detail: "12 oz · Bone-In", placeholder: "Pork chops", color: "#CAAE90" },
  { id: 5, name: "Wagyu Blend Burgers", detail: "6 oz patties · Pack of 4", placeholder: "Burger patties", color: "#B8A090" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowReveal = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function FeaturedCuts() {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="Real Ingredients. Unreal Taste."
            heading="Level Up Your Dinner"
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="overflow-hidden rounded-2xl"
          >
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#C9B8A8]">
              <p className="max-w-[200px] text-center text-sm font-medium tracking-wide text-white/50">
                Artful arrangement of different cuts on butcher paper
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col"
            >
              {PRODUCTS.map((product, i) => (
                <motion.div key={product.id} variants={rowReveal}>
                  <motion.button
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex w-full items-center gap-5 border-b border-border py-5 text-left first:pt-0"
                  >
                    <span className="w-5 shrink-0 text-sm font-semibold text-text-muted/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-full"
                      style={{ backgroundColor: product.color }}
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-[9px] font-medium text-white/40">
                          {product.placeholder}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-text-dark group-hover:text-primary-light transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-text-muted">
                        {product.detail}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-200 group-hover:bg-accent group-hover:text-white group-hover:shadow-md">
                      <Plus size={18} strokeWidth={2.5} />
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary-light"
              >
                Explore all products
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
