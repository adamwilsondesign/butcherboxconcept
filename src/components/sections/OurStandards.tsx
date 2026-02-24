"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { IMAGES } from "@/lib/images";

const CREDENTIALS = [
  "Certified B Corporation — highest standards of social and environmental impact",
  "No antibiotics or added hormones — ever. 200+ banned ingredients.",
  "100% recyclable packaging — shipped frozen in eco-friendly materials",
] as const;

export default function OurStandards() {
  return (
    <section className="bg-white" id="our-standards">
      <div className="mx-auto w-full max-w-7xl lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative min-h-[320px] lg:min-h-[520px]"
          >
            <img
              src={IMAGES.chickensField}
              alt="Free-range chickens on pasture"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          {/* Right: Headline + credentials */}
          <div className="flex flex-col justify-center px-6 py-[120px] sm:px-12 lg:px-16">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2D6A4F]"
            >
              Our Promise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-4 font-sans font-extrabold text-[40px] font-semibold leading-[1.15] tracking-heading text-[#2A2A2A]"
            >
              We Know Where Every Cut Comes From
            </motion.h2>

            <ul className="mt-10 space-y-6">
              {CREDENTIALS.map((cred, i) => (
                <motion.li
                  key={cred}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4332]">
                    <Check size={12} className="text-white" />
                  </span>
                  <span className="text-[16px] leading-relaxed text-[#767676]">{cred}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
