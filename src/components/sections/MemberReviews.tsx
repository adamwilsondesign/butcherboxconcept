"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";

const REVIEWS = [
  { id: 1, name: "Sarah M.", quote: "The ribeye alone is worth it. Restaurant quality, every single time.", image: IMAGES.ribeye, rotate: -2 },
  { id: 2, name: "Jason K.", quote: "My family looks forward to ButcherBox night. The salmon is unreal.", image: IMAGES.salmon, rotate: 1.5 },
  { id: 3, name: "Emily R.", quote: "I cancelled three other subscriptions. This is the only one I need.", image: IMAGES.scallops, rotate: -1 },
  { id: 4, name: "Marcus T.", quote: "Knowing exactly where my meat comes from gives me real peace of mind.", image: IMAGES.lobster, rotate: 2 },
  { id: 5, name: "Ana L.", quote: "Free shipping and no commitment? Honestly, there's no reason not to try.", image: IMAGES.sirloin, rotate: -1.5 },
] as const;

const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS];
const CARD_WIDTH = 300;
const GAP = 20;
const TOTAL_WIDTH = REVIEWS.length * (CARD_WIDTH + GAP);

export default function MemberReviews() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !marqueeRef.current) return;
    xRef.current -= (delta / 1000) * 30;
    if (xRef.current <= -TOTAL_WIDTH) {
      xRef.current += TOTAL_WIDTH;
    }
    marqueeRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <section className="bg-background overflow-hidden" id="reviews">
      <div className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <SectionHeading
              eyebrow="Loved By Members"
              heading="Join 400,000+ Happy Members"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={marqueeRef}
            className="flex will-change-transform"
            style={{ gap: GAP }}
          >
            {MARQUEE_ITEMS.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="shrink-0"
                style={{
                  width: CARD_WIDTH,
                  transform: `rotate(${review.rotate}deg)`,
                }}
              >
                <div className="overflow-hidden rounded-2xl bg-surface shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img
                      src={review.image}
                      alt={review.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10">
                      <p className="text-sm font-medium leading-snug text-white/90">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className="fill-star-gold text-star-gold"
                        />
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-text-dark">
                      {review.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
