"use client";

import { motion } from "framer-motion";

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
    <section className="bg-white py-20" id="standards">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
            Superior standards, no exceptions
          </span>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((card, i) => (
            <motion.div
              key={card.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.heading}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm text-white/70">{card.label}</p>
                <h3 className="mt-1.5 text-xl font-bold text-white">
                  {card.heading}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E5DDD4] bg-white"
            >
              <span className="text-[11px] font-bold text-[#243B35]">
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
