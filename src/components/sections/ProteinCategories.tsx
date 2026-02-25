"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

/* Inline image pill — rounded-rect image that sits within the text flow */
function InlineImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group/img relative inline-block h-[48px] w-[82px] shrink-0 translate-y-[3px] overflow-hidden rounded-[1rem] shadow-sm transition-shadow duration-300 hover:shadow-md sm:h-[60px] sm:w-[100px] lg:h-[72px] lg:w-[120px]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
      />
    </button>
  );
}

/* Shared text style */
const textClass =
  "text-2xl font-extrabold leading-[1.2] tracking-tight text-[#005A73] sm:text-3xl lg:text-4xl";
const hoverClass = "transition-colors duration-300 hover:text-[#007A9A]";

export default function ProteinCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="overflow-hidden bg-[#FAF7F2] py-6 sm:py-8" id="proteins">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* One flowing sentence with inline images — 3 visual lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-y-2"
        >
          {/* Line 1: Grass-Fed Beef [img] Free-Range Poultry [img] */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 lg:gap-x-5">
            <button
              onClick={() => openSignup({ prefilterCategory: "Beef" })}
              className={`${textClass} ${hoverClass}`}
            >
              Grass-Fed Beef
            </button>
            <InlineImage
              src={IMAGES.ribeye}
              alt="Grass-fed ribeye steaks"
              onClick={() => openSignup({ prefilterCategory: "Beef" })}
            />
            <button
              onClick={() => openSignup({ prefilterCategory: "Chicken" })}
              className={`${textClass} ${hoverClass}`}
            >
              Free-Range Poultry
            </button>
            <InlineImage
              src={IMAGES.chickenBreast}
              alt="Free-range chicken breasts"
              onClick={() => openSignup({ prefilterCategory: "Chicken" })}
            />
          </div>

          {/* Line 2: Crate-Free Pork [img] & Wild-Caught Seafood [img] */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 lg:gap-x-5">
            <button
              onClick={() => openSignup({ prefilterCategory: "Pork" })}
              className={`${textClass} ${hoverClass}`}
            >
              Crate-Free Pork
            </button>
            <InlineImage
              src={IMAGES.porkChops}
              alt="Crate-free pork chops"
              onClick={() => openSignup({ prefilterCategory: "Pork" })}
            />
            <span className={textClass}>&amp;</span>
            <button
              onClick={() => openSignup({ prefilterCategory: "Seafood" })}
              className={`${textClass} ${hoverClass}`}
            >
              Wild-Caught Seafood
            </button>
            <InlineImage
              src={IMAGES.salmon}
              alt="Wild-caught sockeye salmon"
              onClick={() => openSignup({ prefilterCategory: "Seafood" })}
            />
          </div>

          {/* Line 3: Delivered Right to Your Door! */}
          <div className="flex items-center justify-center">
            <span className={textClass}>
              Delivered Right to Your Door!
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => openSignup()}
            className="rounded-lg bg-[#2D6A4F] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
          >
            Build Your Box →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
