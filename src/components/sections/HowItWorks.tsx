"use client";

import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { useSignup } from "@/components/signup/SignupFlow";

interface Reason {
  number: string;
  title: string;
  body: string;
  image: string;
}

const REASONS: Reason[] = [
  {
    number: "01",
    title: "100% Grass-Fed, Grass-Finished Beef",
    body: "Our cattle roam free on open pastures — no feedlots, no shortcuts. You taste the difference in every bite.",
    image: IMAGES.ribeye,
  },
  {
    number: "02",
    title: "No Antibiotics or Added Hormones — Ever",
    body: "We ban over 200 ingredients that the industry considers standard. Because clean meat shouldn't be a premium.",
    image: IMAGES.steakRosemary,
  },
  {
    number: "03",
    title: "Wild-Caught, Sustainably Sourced Seafood",
    body: "From Alaskan salmon to Atlantic scallops, our seafood is traceable from ocean to plate.",
    image: IMAGES.salmon,
  },
  {
    number: "04",
    title: "Free Shipping on Every Order",
    body: "Delivered frozen in 100% recyclable packaging. Your meat arrives in perfect condition, always.",
    image: IMAGES.whatsInBox,
  },
  {
    number: "05",
    title: "Flexible Plans, Cancel Anytime",
    body: "Customize your box, skip a month, or cancel — no fees, no guilt, no fine print.",
    image: IMAGES.chickenBreast,
  },
  {
    number: "06",
    title: "Certified B Corporation",
    body: "We meet the highest standards of social and environmental performance. Better meat, better planet.",
    image: IMAGES.chickensField,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HowItWorks() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#6B6B6B]">
            Why ButcherBox
          </span>
          <h2 className="mt-4 font-display text-[40px] font-bold leading-tight text-[#1A1A1A]">
            6 Reasons to Try ButcherBox
          </h2>
        </motion.div>

        {/* Alternating rows */}
        <div className="mt-16 space-y-0">
          {REASONS.map((reason, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <motion.div
                key={reason.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i > 0 ? "mt-20 lg:mt-24" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-card ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div
                    className="aspect-[4/3] w-full overflow-hidden"
                    style={{
                      clipPath: imageLeft
                        ? "polygon(0 0, 100% 4%, 100% 96%, 0 100%)"
                        : "polygon(0 4%, 100% 0, 100% 100%, 0 96%)",
                    }}
                  >
                    <img
                      src={reason.image}
                      alt={reason.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={`relative ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                  {/* Decorative large number */}
                  <span className="absolute -left-2 -top-8 font-display text-[120px] font-bold leading-none text-[#1B3A2D]/[0.04] lg:-left-4 lg:-top-12 lg:text-[160px]">
                    {reason.number}
                  </span>

                  <div className="relative">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#2D5A40]">
                      {reason.number}
                    </span>
                    <h3 className="mt-3 font-display text-[24px] font-semibold leading-snug text-[#1A1A1A] sm:text-[28px]">
                      {reason.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#6B6B6B]">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 flex justify-center"
        >
          <button
            onClick={() => openSignup()}
            className="rounded-pill bg-[#1B3A2D] px-10 py-4 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#142e22] hover:shadow-lg"
          >
            Start Building Your Box
          </button>
        </motion.div>
      </div>
    </section>
  );
}
