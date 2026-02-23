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

export default function HowItWorks() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-6 py-[120px] sm:px-8 lg:px-12">
        {/* Section header — fade in */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#767676]">
            Why ButcherBox
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 font-display text-[40px] font-semibold leading-tight tracking-heading text-[#2A2A2A]"
          >
            6 Reasons to Try ButcherBox
          </motion.h2>
        </motion.div>

        {/* Alternating rows — image slides from edge, text from opposite */}
        <div className="mt-16 space-y-0">
          {REASONS.map((reason, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div
                key={reason.number}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i > 0 ? "mt-20 lg:mt-24" : ""
                }`}
              >
                {/* Image — slides in from its edge */}
                <motion.div
                  initial={{ opacity: 0, x: imageLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative overflow-hidden rounded-card ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
                >
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
                </motion.div>

                {/* Text — slides in from opposite edge */}
                <motion.div
                  initial={{ opacity: 0, x: imageLeft ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative ${imageLeft ? "lg:order-2" : "lg:order-1"}`}
                >
                  {/* Decorative large number — opacity 0.06 */}
                  <span className="absolute -left-2 -top-8 font-display text-[120px] font-semibold leading-none text-[#1B4332]/[0.06] lg:-left-4 lg:-top-12 lg:text-[160px]">
                    {reason.number}
                  </span>

                  <div className="relative">
                    <motion.span
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2D6A4F]"
                    >
                      {reason.number}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                      className="mt-3 font-display text-[24px] font-semibold leading-snug tracking-heading text-[#2A2A2A] sm:text-[28px]"
                    >
                      {reason.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="mt-4 max-w-md text-[16px] leading-relaxed text-[#767676]"
                    >
                      {reason.body}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
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
          <motion.button
            onClick={() => openSignup()}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-pill bg-[#1B4332] px-10 py-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2D6A4F]"
          >
            Start Building Your Box
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
