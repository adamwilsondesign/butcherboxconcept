"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#1B4332] transition-all hover:bg-[#2D6A4F] hover:text-white"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#1B4332] transition-all hover:bg-[#2D6A4F] hover:text-white"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className={`min-w-[320px] max-w-[380px] shrink-0 snap-start rounded-2xl p-8 shadow-sm sm:p-10 ${
                i % 2 === 0 ? "bg-white" : "bg-[#F5F0EB]"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    size={20}
                    className="fill-[#D4A84B] text-[#D4A84B]"
                  />
                ))}
              </div>
              {/* Quote */}
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
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2D6A4F] text-xs font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#2D6A4F]">Verified Member</p>
                </div>
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
            className="text-[15px] font-medium text-[#2D6A4F] transition-colors hover:text-[#1B4332] hover:underline"
          >
            Join 400,000+ members →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
