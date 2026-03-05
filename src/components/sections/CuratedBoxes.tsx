"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";
import { CURATED_BOXES, PRODUCTS, PLANS, type CartItem, type CuratedBox } from "@/lib/products";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function CuratedBoxes() {
  const { openSignup } = useSignup();

  const handleBuildBox = (box: CuratedBox) => {
    const cartItems: CartItem[] = box.items.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId)!;
      return { ...product, qty: item.qty };
    });
    openSignup({ prebuiltItems: cartItems, skipToStep: 2 });
  };

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          label="Curated For You"
          title="Ready-Made Boxes"
          subtitle="Skip the picking, start the cooking. Grab a pre-built box curated for every occasion."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CURATED_BOXES.map((box, i) => {
            const planData = PLANS.find((p) => p.id === box.planId)!;
            const itemNames = box.items.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId)!;
              return item.qty > 1 ? `${product.name} ×${item.qty}` : product.name;
            });

            return (
              <motion.div
                key={box.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Hero image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {box.tagline}
                    </p>
                    <h3 className="mt-1 font-sans text-2xl font-extrabold text-white">
                      {box.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-text-muted leading-relaxed">
                    {box.description}
                  </p>

                  {/* Item list */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {itemNames.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-[#FAF7F2] px-2.5 py-1 text-[11px] font-medium text-[#1B4332]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-[#2D6A4F]">${planData.price}</span>
                      <span className="ml-1.5 text-xs text-text-muted">
                        {planData.proteins} proteins
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuildBox(box)}
                      className="rounded-lg bg-[#2D6A4F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
                    >
                      Build This Box
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
