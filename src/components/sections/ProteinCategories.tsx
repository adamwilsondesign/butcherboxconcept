"use client";

import { motion } from "framer-motion";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

export default function ProteinCategories() {
  const { openSignup } = useSignup();

  return (
    <section className="overflow-hidden bg-[#FAF7F2] py-16 sm:py-20" id="proteins">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Row 1: "Grass-Fed Beef" text + Beef image + Poultry image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8"
        >
          <button
            onClick={() => openSignup({ prefilterCategory: "Beef" })}
            className="group flex items-center gap-4 sm:gap-6"
          >
            <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-[#1B4332] transition-colors duration-300 group-hover:text-[#40916C] sm:text-5xl lg:text-6xl">
              Grass-Fed<br />Beef
            </h3>
            <div className="h-28 w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-48 lg:h-36 lg:w-52">
              <img
                src={IMAGES.ribeye}
                alt="Grass-fed ribeye steaks"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </button>

          <button
            onClick={() => openSignup({ prefilterCategory: "Chicken" })}
            className="group"
          >
            <div className="h-28 w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-48 lg:h-36 lg:w-52">
              <img
                src={IMAGES.chickenBreast}
                alt="Free-range chicken breasts"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </button>
        </motion.div>

        {/* Row 2: Pork image + "Free-Range Poultry & Crate-Free Pork" text + Seafood image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-8 sm:gap-x-8"
        >
          <button
            onClick={() => openSignup({ prefilterCategory: "Pork" })}
            className="group flex items-center gap-4 sm:gap-6"
          >
            <div className="h-28 w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-48 lg:h-36 lg:w-52">
              <img
                src={IMAGES.porkChops}
                alt="Heritage breed pork chops"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-[#1B4332] transition-colors duration-300 group-hover:text-[#40916C] sm:text-5xl lg:text-6xl">
              Free-Range<br />Poultry
            </h3>
          </button>

          <button
            onClick={() => openSignup({ prefilterCategory: "Seafood" })}
            className="group"
          >
            <div className="h-28 w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-48 lg:h-36 lg:w-52">
              <img
                src={IMAGES.salmon}
                alt="Wild-caught sockeye salmon"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </button>
        </motion.div>

        {/* Row 3: "Crate-Free Pork & Wild-Caught Seafood" text centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-8 sm:gap-x-8"
        >
          <button
            onClick={() => openSignup({ prefilterCategory: "Pork" })}
            className="group"
          >
            <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-[#1B4332] transition-colors duration-300 group-hover:text-[#40916C] sm:text-5xl lg:text-6xl">
              Crate-Free Pork
            </h3>
          </button>

          <span className="font-display text-4xl text-[#40916C] sm:text-5xl lg:text-6xl">&amp;</span>

          <button
            onClick={() => openSignup({ prefilterCategory: "Seafood" })}
            className="group"
          >
            <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-[#1B4332] transition-colors duration-300 group-hover:text-[#40916C] sm:text-5xl lg:text-6xl">
              Wild-Caught Seafood
            </h3>
          </button>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-base font-medium text-[#2D6A4F] sm:mt-10 sm:text-lg"
        >
          Delivered right to your door.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-4 flex justify-center"
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
