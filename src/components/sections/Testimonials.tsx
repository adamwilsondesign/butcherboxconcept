"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";
import SectionHeading from "@/components/ui/SectionHeading";

const REVIEWS = [
  {
    stars: 5,
    quote:
      "I love that I can receive all of the meat my family consumes right to my doorstep. And even better, they are good quality products that I am feeding my family.",
    name: "Sarah M.",
    initials: "SM",
  },
  {
    stars: 5,
    quote:
      "On average I spend just over $11 per pound for mostly beef, all grass fed and organic, which is unheard of! Everyone I\u2019ve shared with can taste the good quality.",
    name: "Jennifer R.",
    initials: "JR",
  },
  {
    stars: 5,
    quote:
      "I cancelled three other subscriptions. This is the only one I need. Better cuts than most stores for about the same price.",
    name: "Paul T.",
    initials: "PT",
  },
  {
    stars: 5,
    quote:
      "Having access to excellent quality meat for reasonable prices beats going to an actual store and hoping for the best every single time.",
    name: "Daniel K.",
    initials: "DK",
  },
  {
    stars: 5,
    quote:
      "Super convenient, better prices than I can get in the store for the same quality meat, and it really arrives frozen. Even in the summer after sitting on my porch for a couple of hours.",
    name: "Marcus L.",
    initials: "ML",
  },
  {
    stars: 5,
    quote:
      "We\u2019ve been getting ButcherBox for years and have never once considered canceling. The meat quality is consistently excellent.",
    name: "Amy W.",
    initials: "AW",
  },
];

const MOSAIC_IMAGES = [
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/25_Q4_Website_Catalog_Beef_FCBarbacoa_974016.jpg.webp",
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SockeyeSalmon-1826BBoxSockeyeSalmon-1_06c04eb6-c711-4b52-8de0-6e0a7942fe46.jpg.webp",
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SeaScallops-board-1826BBoxScallops-4.jpg.webp",
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/NYStrip_1815BBoxMeatonBoards-2_207175d2-2317-4681-80ba-42678c59ccc7.jpg.webp",
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/PorkTenderloin-1826BBoxPorkTenderloin-V2.jpg.webp",
  "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/Ribeyes_1815BBoxMeatonBoards-1.jpg.webp",
];

/* Slight rotation for pinboard feel */
const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];

export default function Testimonials() {
  const { openSignup } = useSignup();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32" id="reviews">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header with scroll arrows */}
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              label="Real Members, Real Meals"
              title="See Why 70,000+ Members Left 5-Star Reviews"
              className="text-left"
            />
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden gap-3 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#243B35] transition-all hover:bg-[#2D5E4A] hover:text-white"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#243B35] transition-all hover:bg-[#2D5E4A] hover:text-white"
              aria-label="Scroll reviews right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Testimonial cards — horizontal scroll */}
        <div
          ref={scrollRef}
          className="-mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          style={{ scrollbarWidth: "none" }}
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className={`min-w-[320px] max-w-[380px] shrink-0 snap-start rounded-2xl p-8 shadow-md sm:p-10 ${
                i % 2 === 0 ? "bg-white" : "bg-[#F5F0EB]"
              }`}
            >
              {/* Stars — larger */}
              <div className="flex gap-1">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    size={20}
                    className="fill-[#D4A84B] text-[#D4A84B]"
                  />
                ))}
              </div>
              {/* Quote — larger text */}
              <p
                className="mt-5 text-base italic leading-relaxed text-[#1A1A1A]"
                style={{ lineHeight: 1.75 }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>
              {/* Divider */}
              <div className="my-5 h-px bg-[#E5DDD4]" />
              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2D5E4A] text-xs font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#2D5E4A]">Verified Member</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UGC mosaic — pinboard with rotation */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {MOSAIC_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="group cursor-pointer"
              style={{ transform: `rotate(${ROTATIONS[i]}deg)` }}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-xl">
                <img
                  src={src}
                  alt="Member meal"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
          className="mt-12 text-center"
        >
          <button
            onClick={() => openSignup()}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#C8512B] transition-colors hover:text-[#A8431F]"
          >
            Join 400,000+ members
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
