"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const CATEGORIES = [
  {
    name: "Beef & Bison",
    description: "100% grass-fed, grass-finished",
    image: IMAGES.ribeye,
    filterCategory: "Beef",
  },
  {
    name: "Chicken & Pork",
    description: "Heritage breed, free-range",
    image: IMAGES.chickenBreast,
    filterCategory: "Chicken",
  },
  {
    name: "Wild Seafood",
    description: "Sustainably caught, never farmed",
    image: IMAGES.salmon,
    filterCategory: "Seafood",
  },
  {
    name: "Ready to Cook",
    description: "Marinated, seasoned & ready",
    image: IMAGES.barbacoa,
    filterCategory: "Ready to Cook",
  },
] as const;

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ProductCategories() {
  const { openSignup } = useSignup();

  return (
    <SectionWrapper id="categories">
      <SectionHeading
        eyebrow="What We Offer"
        heading="Premium Proteins, Your&nbsp;Way"
        subtitle="From pasture-raised staples to chef-ready meals — explore our curated categories."
      />

      {/* ── Asymmetric staggered grid ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
      >
        {/* Card 1 — Beef & Bison: large, spans 7 cols */}
        <motion.button
          variants={cardReveal}
          aria-label={`Explore ${CATEGORIES[0].name}`}
          onClick={() => openSignup({ skipToStep: 2, prefilterCategory: CATEGORIES[0].filterCategory })}
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left lg:col-span-7"
        >
          <CategoryCard category={CATEGORIES[0]} size="large" />
        </motion.button>

        {/* Card 2 — Chicken & Pork: tall, spans 5 cols */}
        <motion.button
          variants={cardReveal}
          aria-label={`Explore ${CATEGORIES[1].name}`}
          onClick={() => openSignup({ skipToStep: 2, prefilterCategory: CATEGORIES[1].filterCategory })}
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left lg:col-span-5"
        >
          <CategoryCard category={CATEGORIES[1]} size="tall" />
        </motion.button>

        {/* Card 3 — Wild Seafood: spans 5 cols */}
        <motion.button
          variants={cardReveal}
          aria-label={`Explore ${CATEGORIES[2].name}`}
          onClick={() => openSignup({ skipToStep: 2, prefilterCategory: CATEGORIES[2].filterCategory })}
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left lg:col-span-5"
        >
          <CategoryCard category={CATEGORIES[2]} size="tall" />
        </motion.button>

        {/* Card 4 — Ready to Cook: wide, spans 7 cols */}
        <motion.button
          variants={cardReveal}
          aria-label={`Explore ${CATEGORIES[3].name}`}
          onClick={() => openSignup({ skipToStep: 2, prefilterCategory: CATEGORIES[3].filterCategory })}
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface text-left lg:col-span-7"
        >
          <CategoryCard category={CATEGORIES[3]} size="large" />
        </motion.button>
      </motion.div>
    </SectionWrapper>
  );
}

/* ── Individual card ── */

interface CategoryCardProps {
  category: (typeof CATEGORIES)[number];
  size: "large" | "tall";
}

function CategoryCard({ category, size }: CategoryCardProps) {
  const imageHeight = size === "large" ? "h-64 sm:h-72" : "h-72 sm:h-80";

  return (
    <>
      {/* Image */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`${imageHeight} w-full`}
        >
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="flex flex-1 items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-text-dark sm:text-3xl">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{category.description}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 text-primary transition-all duration-300 group-hover:border-primary-light group-hover:bg-primary-light group-hover:text-white">
          <ArrowRight size={18} />
        </span>
      </div>
    </>
  );
}
