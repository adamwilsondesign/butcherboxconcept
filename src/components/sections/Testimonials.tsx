"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import MaskedImage from "@/components/ui/MaskedImage";
import { useSignup } from "@/components/signup/SignupFlow";

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
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/25_Q4_Website_Catalog_Beef_FCBarbacoa_974016.jpg.webp",
    variant: "blob1" as const,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SockeyeSalmon-1826BBoxSockeyeSalmon-1_06c04eb6-c711-4b52-8de0-6e0a7942fe46.jpg.webp",
    variant: "blob2" as const,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SeaScallops-board-1826BBoxScallops-4.jpg.webp",
    variant: "oval" as const,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/NYStrip_1815BBoxMeatonBoards-2_207175d2-2317-4681-80ba-42678c59ccc7.jpg.webp",
    variant: "blob3" as const,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/PorkTenderloin-1826BBoxPorkTenderloin-V2.jpg.webp",
    variant: "arch" as const,
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/Ribeyes_1815BBoxMeatonBoards-1.jpg.webp",
    variant: "blob1" as const,
  },
];

export default function Testimonials() {
  const { openSignup } = useSignup();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#F5F0EB] py-20" id="reviews">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
              Real Members, Real Meals
            </span>
            <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-[#1A1A1A] sm:text-[44px]">
              See why 70,000+ members left 5-star reviews
            </h2>
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DDD4] bg-white text-[#243B35] transition-colors hover:bg-[#2D5E4A] hover:text-white"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DDD4] bg-white text-[#243B35] transition-colors hover:bg-[#2D5E4A] hover:text-white"
              aria-label="Scroll reviews right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Testimonial cards — horizontal scroll */}
        <div
          ref={scrollRef}
          className="mt-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          style={{ scrollbarWidth: "none" }}
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="min-w-[320px] max-w-[360px] shrink-0 snap-start rounded-2xl bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-[#D4A84B] text-[#D4A84B]"
                  />
                ))}
              </div>
              {/* Quote */}
              <p className="mt-4 text-[15px] italic leading-relaxed text-[#1A1A1A]">
                &ldquo;{review.quote}&rdquo;
              </p>
              {/* Divider */}
              <div className="my-4 h-px bg-[#E5DDD4]" />
              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5E4A] text-xs font-bold text-white">
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

        {/* UGC mosaic */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 lg:gap-5">
          {MOSAIC_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <MaskedImage
                  src={img.src}
                  alt="Member meal"
                  variant={img.variant}
                  className="aspect-square w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => openSignup()}
            className="text-[15px] font-medium text-[#2D5E4A] transition-colors hover:text-[#243B35]"
          >
            Join 400,000+ members →
          </button>
        </div>
      </div>
    </section>
  );
}
