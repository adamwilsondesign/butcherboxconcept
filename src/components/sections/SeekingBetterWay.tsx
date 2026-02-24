"use client";

import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

const CERTS_DATA = [
  { src: IMAGES.certUSDA, alt: "USDA Organic" },
  { src: IMAGES.certRegenerativeOrganic, alt: "Regenerative Organic Certified" },
  { src: IMAGES.certNonGMO, alt: "Non-GMO Project Verified" },
  { src: IMAGES.certGAP, alt: "Global Animal Partnership" },
  { src: IMAGES.certCSI, alt: "CSI Responsibly Fished & Managed" },
  { src: IMAGES.certHumane, alt: "Certified Humane" },
];

export default function SeekingBetterWay() {
  return (
    <section className="bg-[#005A73] py-24 sm:py-32" id="our-story">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Our Story
            </p>
            <h2 className="font-sans font-extrabold text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
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
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              Read Our Story →
            </a>
          </motion.div>

          {/* Right — Two images with rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Top image */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.ctfassets.net/1yr7azz9gqt1/32ECyiesQH4g30lgLeGs9t/9a2292c7be487b2519db98b663cd2b5b/25_Q3_Website_SuperiorStandardModules_NoAntibioticsHormones.jpg?q=50&fm=jpg"
                alt="Cows in green field"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Bottom image — offset left, overlapping */}
            <div className="-mt-16 ml-0 mr-auto w-[65%] lg:-mt-20 lg:ml-[-20px]">
              <div className="overflow-hidden rounded-2xl shadow-md">
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

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-10"
        >
          {CERTS_DATA.map((cert) => (
            <div
              key={cert.alt}
              className="flex h-14 w-14 items-center justify-center brightness-0 invert sm:h-16 sm:w-16"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
