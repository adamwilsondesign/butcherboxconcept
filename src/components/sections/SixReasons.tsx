"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";

const REASONS = [
  { number: 1, title: "Freezer to Table in 20 Minutes", image: IMAGES.sirloin },
  { number: 2, title: "400,000+ Happy Members", image: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt9ddf16a5496544b5/685d8851ed43a234704d8e38/grilling-recipes-hero.jpg?q=70&width=1920&auto=webp" },
  { number: 3, title: "100% Grass-Fed, No Exceptions", image: IMAGES.chickensField },
  { number: 4, title: "Free Shipping, Always", image: "https://swyftcourier.ca/wp-content/uploads/2023/12/reliable-personal-delivery-in-vancouver.webp" },
  { number: 5, title: "Certified B Corporation", image: IMAGES.fishingBoat },
  { number: 6, title: "2M+ Meals Donated", image: IMAGES.steakRosemary },
] as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardReveal = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function SixReasons() {
  return (
    <section className="bg-surface" id="why-butcherbox">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
          <SectionHeading eyebrow="On The Fence?" heading="6 Reasons to Try ButcherBox" subtitle="Premium proteins, humanely raised and delivered frozen — ready when you are." />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {REASONS.map((reason) => (
            <motion.div key={reason.number} variants={cardReveal} className="group relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <motion.img src={reason.image} alt={reason.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} />
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#C8512B] text-sm font-bold text-white shadow-md">{reason.number}</span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent px-5 pb-5 pt-12">
                  <h3 className="font-serif text-xl font-bold leading-snug text-white sm:text-2xl">{reason.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
