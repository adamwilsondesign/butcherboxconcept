"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const REASONS = [
  {
    number: 1,
    title: "Freezer to Table in 20 Minutes",
    placeholder: "Seared steak on plate",
    color: "#C4A882",
  },
  {
    number: 2,
    title: "400,000+ Happy Members",
    placeholder: "Person unboxing ButcherBox",
    color: "#B8A99A",
  },
  {
    number: 3,
    title: "100% Grass-Fed, No Exceptions",
    placeholder: "Cattle on open pasture",
    color: "#8EA88A",
  },
  {
    number: 4,
    title: "Free Shipping, Always",
    placeholder: "ButcherBox on doorstep",
    color: "#A8BEC0",
  },
  {
    number: 5,
    title: "Certified B Corporation",
    placeholder: "B Corp badge / team photo",
    color: "#C9B8A8",
  },
  {
    number: 6,
    title: "2M+ Meals Donated",
    placeholder: "Community giving back",
    color: "#D4B896",
  },
] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SixReasons() {
  return (
    <section className="bg-warm-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="On The Fence?"
            heading="6 Reasons to Try ButcherBox"
            subtitle="Premium proteins, humanely raised and delivered frozen — ready when you are."
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {REASONS.map((reason) => (
            <motion.div
              key={reason.number}
              variants={cardReveal}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Image placeholder */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden"
                style={{ backgroundColor: reason.color }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-sm font-medium tracking-wide text-white/50">
                    {reason.placeholder}
                  </p>
                </div>

                {/* Hover zoom on the image area */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: reason.color }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-sm font-medium tracking-wide text-white/50">
                      {reason.placeholder}
                    </p>
                  </div>
                </motion.div>

                {/* Number badge */}
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-md">
                  {reason.number}
                </span>

                {/* Bottom gradient + title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent px-5 pb-5 pt-12">
                  <h3 className="font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                    {reason.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
