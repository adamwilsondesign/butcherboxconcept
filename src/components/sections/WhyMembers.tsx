"use client";

import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";

const VALUE_CARDS = [
  {
    image: IMAGES.steakRosemary,
    label: "Best Prices",
    title: "Hard-to-beat meat prices",
    body: "Up to 15% savings on premium cuts vs. grocery stores\u2014plus zero lines.",
  },
  {
    image: IMAGES.chickensField,
    label: "Sizzle Perks",
    title: "Loyalty that pays off",
    body: "Get 2% back on every order in rewards points, redeemable for savings on future boxes.",
  },
  {
    image: IMAGES.fishingBoat,
    label: "Weekly Deals",
    title: "Exclusive weekly deals",
    body: "Members get access to perks like \u2018free-for-life\u2019 offers on select meats.",
  },
];

export default function WhyMembers() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white py-12 sm:py-16" id="why-us">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="The value of a ButcherBox Membership"
          title="Why 400,000+ Members Choose Us"
        />

        {/* Value cards — photo cards with hover reveal */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default state — dark gradient at bottom with title only */}
              <div
                className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(27,67,50,0.75) 0%, rgba(27,67,50,0.2) 45%, transparent 100%)",
                }}
              />

              {/* Hover state — blur + darker shroud with full content */}
              <div
                className="absolute inset-0 opacity-0 backdrop-blur-[6px] transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background:
                    "rgba(27,67,50,0.65)",
                }}
              />

              {/* Title — always visible, repositions on hover */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#40916C] opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  {card.label}
                </span>
                <h3 className="mt-1 font-sans font-extrabold text-xl leading-snug text-white sm:text-2xl">
                  {card.title}
                </h3>
                <p
                  className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 transition-all duration-400 group-hover:max-h-40"
                  style={{ lineHeight: 1.7 }}
                >
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => openSignup()}
            className="rounded-lg bg-[#2D6A4F] px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1B4332]"
          >
            Choose ButcherBox
          </button>
        </motion.div>
      </div>
    </section>
  );
}
