"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const REVIEWS = [
  { id: 1, name: "Shannon", quote: "We love getting high quality meat at an amazing value! We have never had Ribeye steaks that taste as good as this.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/25_Q4_Website_Catalog_Beef_FCBarbacoa_974016.jpg.webp", rotate: -1.5 },
  { id: 2, name: "Zachary", quote: "ButcherBox has exceeded my expectations. The meat quality and taste is great and it has made me a better and healthier cook.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SockeyeSalmon-1826BBoxSockeyeSalmon-1_06c04eb6-c711-4b52-8de0-6e0a7942fe46.jpg.webp", rotate: 1 },
  { id: 3, name: "Paul", quote: "I cancelled three other subscriptions. This is the only one I need. Better cuts than most stores for about the same price.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/SeaScallops-board-1826BBoxScallops-4.jpg.webp", rotate: -1 },
  { id: 4, name: "Daniel", quote: "Having access to excellent quality meat for reasonable prices beats going to an actual store and hoping for the best every single time.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/PorkTenderloin-1826BBoxPorkTenderloin-V2.jpg.webp", rotate: 1.5 },
  { id: 5, name: "Isaac", quote: "It's my favorite subscription. Takes the work out of buying meat. Would definitely recommend!", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/NYStrip_1815BBoxMeatonBoards-2_207175d2-2317-4681-80ba-42678c59ccc7.jpg.webp", rotate: -2 },
  { id: 6, name: "Georganna", quote: "My meats are delivered straight to my door! Modification of order dates, box contents and payment methods is a breeze.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/Ribeyes_1815BBoxMeatonBoards-1.jpg.webp", rotate: 1 },
  { id: 7, name: "Scott", quote: "The curated box works great for my family. The option to change the scheduled delivery date came in handy while on vacation.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/ChickenBreasts-3pack-1826BBoxChixSkinlessBreasts-1_adc084cc-f2fd-41d1-ab08-c7ee8fe8d021.jpg.webp", rotate: -1.5 },
  { id: 8, name: "Christine", quote: "Each month I go in and change what meats we have shipped so that we can try all the varieties.", image: "https://cdn.shopify.com/s/files/1/0634/3121/3295/files/PorkChops-bone-less-1826BBoxBonelessPorkChop-1.jpg.webp", rotate: 2 },
] as const;

const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const CARD_WIDTH = 320;
const GAP = 24;
const TOTAL_WIDTH = REVIEWS.length * (CARD_WIDTH + GAP);

export default function MemberReviews() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !marqueeRef.current) return;
    xRef.current -= (delta / 1000) * 22;
    if (xRef.current <= -TOTAL_WIDTH) xRef.current += TOTAL_WIDTH;
    marqueeRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <section className="bg-white overflow-hidden" id="reviews">
      <div className="py-28">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
            <SectionHeading eyebrow="Loved By Members" heading="Join 400,000+ Happy Members" />
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (<Star key={s} size={16} className="fill-[#D4A84B] text-[#D4A84B]" />))}
              </span>
              <span className="text-sm font-semibold text-[#2D5E4A]">70K+ Reviews</span>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div ref={marqueeRef} className="flex will-change-transform" style={{ gap: GAP }}>
            {MARQUEE_ITEMS.map((review, i) => (
              <div key={`${review.id}-${i}`} className="shrink-0" style={{ width: CARD_WIDTH, transform: `rotate(${review.rotate}deg)` }}>
                <div className="overflow-hidden rounded-xl border-t-[3px] border-[#2D5E4A] bg-surface shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img src={review.image} alt={review.name} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10">
                      <p className="text-sm font-medium leading-snug text-white/90">&ldquo;{review.quote}&rdquo;</p>
                    </div>
                  </div>
                  <div className="px-4 py-3.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (<Star key={s} size={14} className="fill-[#D4A84B] text-[#D4A84B]" />))}
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-text-dark">{review.name}</p>
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
