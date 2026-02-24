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
      className="group/img relative inline-block h-[56px] w-[96px] shrink-0 translate-y-[4px] overflow-hidden rounded-[1.25rem] shadow-sm transition-shadow duration-300 hover:shadow-md sm:h-[68px] sm:w-[115px] lg:h-[80px] lg:w-[135px]"
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

export default function ProteinCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="overflow-hidden bg-[#FAF7F2] py-12 sm:py-16" id="proteins">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* One flowing sentence with inline images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center sm:gap-x-5 lg:gap-x-6"
        >
          {/* "Grass Fed Beef" */}
          <button
            onClick={() => openSignup({ prefilterCategory: "Beef" })}
            className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] transition-colors duration-300 hover:text-[#40916C] sm:text-4xl lg:text-5xl"
          >
            Grass-Fed Beef
          </button>

          {/* Beef image */}
          <InlineImage
            src={IMAGES.ribeye}
            alt="Grass-fed ribeye steaks"
            onClick={() => openSignup({ prefilterCategory: "Beef" })}
          />

          {/* "Free Range Poultry" */}
          <button
            onClick={() => openSignup({ prefilterCategory: "Chicken" })}
            className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] transition-colors duration-300 hover:text-[#40916C] sm:text-4xl lg:text-5xl"
          >
            Free-Range Poultry
          </button>

          {/* Poultry image */}
          <InlineImage
            src={IMAGES.chickenBreast}
            alt="Free-range chicken breasts"
            onClick={() => openSignup({ prefilterCategory: "Chicken" })}
          />

          {/* "Crate Free Pork" */}
          <button
            onClick={() => openSignup({ prefilterCategory: "Pork" })}
            className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] transition-colors duration-300 hover:text-[#40916C] sm:text-4xl lg:text-5xl"
          >
            Crate-Free Pork
          </button>

          {/* Pork image */}
          <InlineImage
            src={IMAGES.porkChops}
            alt="Crate-free pork chops"
            onClick={() => openSignup({ prefilterCategory: "Pork" })}
          />

          {/* "& Wild Caught Seafood" */}
          <span className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] sm:text-4xl lg:text-5xl">
            &amp;
          </span>
          <button
            onClick={() => openSignup({ prefilterCategory: "Seafood" })}
            className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] transition-colors duration-300 hover:text-[#40916C] sm:text-4xl lg:text-5xl"
          >
            Wild-Caught Seafood
          </button>

          {/* Seafood image */}
          <InlineImage
            src={IMAGES.salmon}
            alt="Wild-caught sockeye salmon"
            onClick={() => openSignup({ prefilterCategory: "Seafood" })}
          />

          {/* "delivered right to your door!" */}
          <span className="font-display text-3xl uppercase leading-[1.1] tracking-tight text-[#1B4332] sm:text-4xl lg:text-5xl">
            Delivered Right to Your Door!
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
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
