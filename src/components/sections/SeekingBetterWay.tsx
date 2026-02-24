"use client";

import { motion } from "framer-motion";
import MaskedImage from "@/components/ui/MaskedImage";

const CERTS = ["USDA", "ROC", "Non-GMO", "GAP", "CH", "CSI-RFM"];

export default function SeekingBetterWay() {
  return (
    <section className="bg-[#243B35] py-24" id="our-story">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-[#3A7D64]">
              Our Story
            </span>
            <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-white sm:text-[44px]">
              Seeking a better way
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-white/80">
              10 years ago, we set out to change how consumers eat. Today,
              ButcherBox is on a mission to bring better meat and seafood to
              every table. All of our meat and seafood is free from antibiotics
              and added hormones, and comes from partners we&apos;ve vetted for
              sustainability and animal welfare. We are the only B-Corp
              certified meat and seafood company with third-party animal welfare
              certifications for 100% of our products.
            </p>
            <a
              href="#"
              className="mt-6 inline-block text-[15px] font-medium text-[#3A7D64] transition-colors hover:text-white"
            >
              Read Our Story →
            </a>
          </motion.div>

          {/* Right — Two stacked masked images */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Top image */}
            <MaskedImage
              src="https://images.ctfassets.net/1yr7azz9gqt1/32ECyiesQH4g30lgLeGs9t/9a2292c7be487b2519db98b663cd2b5b/25_Q3_Website_SuperiorStandardModules_NoAntibioticsHormones.jpg?q=50&fm=jpg"
              alt="Cows in green field"
              variant="blob2"
              className="aspect-[4/3] w-full"
            />
            {/* Bottom image — offset left, overlapping */}
            <div className="-mt-16 ml-0 mr-auto w-[70%] lg:-mt-20 lg:ml-[-20px]">
              <MaskedImage
                src="https://images.ctfassets.net/1yr7azz9gqt1/4GcoyJ3da0Kb0gY3IM9H4N/b5dc8ef16383638fff9454a8c0063cce/25_Q3_Website_SuperiorStandardModules_SustainableSeafood.jpg?q=50&fm=jpg"
                alt="Sustainable fishing"
                variant="blob1"
                className="aspect-[4/3] w-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Certification badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20"
            >
              <span className="text-[11px] font-bold text-white">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
