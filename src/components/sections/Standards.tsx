"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const STANDARDS = [
  {
    image:
      "https://images.ctfassets.net/1yr7azz9gqt1/7AHLVQoml5mgzCKgevo4bF/fba1d9919bff561f586de6ac01d8ce27/25_Q3_Website_SuperiorStandardModules_HumanelyRaisedMeat.jpg?q=50&fm=jpg&w=640",
    label: "Clean protein you can trust",
    heading: "No antibiotics or added hormones, ever.",
  },
  {
    image:
      "https://images.ctfassets.net/1yr7azz9gqt1/7BnpMYvpkNG2ehlSMVdo5n/93a0fdf01a8fd04f39d7bf68d65c8892/25_Q3_Website_SuperiorStandardModules_200BannedIngredients.jpg?q=50&fm=jpg&w=640",
    label: "Practices that prioritize animals",
    heading: "Humanely-raised meat—without compromise.",
  },
  {
    image:
      "https://images.ctfassets.net/1yr7azz9gqt1/4GcoyJ3da0Kb0gY3IM9H4N/b5dc8ef16383638fff9454a8c0063cce/25_Q3_Website_SuperiorStandardModules_SustainableSeafood.jpg?q=50&fm=jpg&w=640",
    label: "Methods that protect marine health",
    heading: "100% sustainably harvested seafood.",
  },
  {
    image:
      "https://images.ctfassets.net/1yr7azz9gqt1/32ECyiesQH4g30lgLeGs9t/9a2292c7be487b2519db98b663cd2b5b/25_Q3_Website_SuperiorStandardModules_NoAntibioticsHormones.jpg?q=50&fm=jpg",
    label: "Meat that raises the bar",
    heading: "Free of over 200 banned ingredients.",
  },
];

const CERTS = ["USDA", "ROC", "Non-GMO", "GAP", "CH", "CSI-RFM"];

export default function Standards() {
  return (
    <section className="bg-white py-24 sm:py-32" id="standards">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="Superior standards, no exceptions"
          title="We Source Differently"
          subtitle="Every cut meets standards most brands can't match. Third-party verified, farm-to-freezer traceability."
        />

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((card, i) => (
            <motion.div
              key={card.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.heading}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay — rgba(0,0,0,0.6) */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <p className="text-sm font-medium text-white/80">{card.label}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  {card.heading}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {CERTS.map((cert) => (
            <div
              key={cert}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E5DDD4] bg-white shadow-sm"
            >
              <span className="text-[11px] font-bold text-[#243B35]">
                {cert}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
