"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CERTS = ["USDA", "ROC", "Non-GMO", "GAP", "CH", "CSI-RFM"];

export default function SeekingBetterWay() {
  return (
    <section className="bg-[#243B35] py-24 sm:py-32" id="our-story">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="block h-[2px] w-12 bg-[#C8512B]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Our Story
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Seeking a Better Way
            </h2>

            <p
              className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              10 years ago, we set out to change how consumers eat. Today,
              ButcherBox is on a mission to bring better meat and seafood to
              every table.
            </p>
            <p
              className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              All of our meat and seafood is free from antibiotics and added
              hormones, and comes from partners we&apos;ve vetted for
              sustainability and animal welfare.
            </p>
            <p
              className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              We are the only B-Corp certified meat and seafood company with
              third-party animal welfare certifications for 100% of our
              products.
            </p>

            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#C8512B] transition-colors hover:text-white"
            >
              Read Our Story
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Right — Two images with rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Top image */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.ctfassets.net/1yr7azz9gqt1/32ECyiesQH4g30lgLeGs9t/9a2292c7be487b2519db98b663cd2b5b/25_Q3_Website_SuperiorStandardModules_NoAntibioticsHormones.jpg?q=50&fm=jpg"
                alt="Cows in green field"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Bottom image — offset left, overlapping */}
            <div className="-mt-16 ml-0 mr-auto w-[65%] lg:-mt-20 lg:ml-[-20px]">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.ctfassets.net/1yr7azz9gqt1/4GcoyJ3da0Kb0gY3IM9H4N/b5dc8ef16383638fff9454a8c0063cce/25_Q3_Website_SuperiorStandardModules_SustainableSeafood.jpg?q=50&fm=jpg"
                  alt="Sustainable fishing"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certification badges — larger, more visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-6"
        >
          {CERTS.map((cert) => (
            <div
              key={cert}
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/10"
            >
              <span className="text-[12px] font-bold tracking-wide text-white">
                {cert}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
