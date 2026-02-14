"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";

const STEPS = [
  {
    number: 1,
    title: "Choose Your Path",
    description:
      "Subscribe for regular deliveries and save, or order a one-time box. No commitment either way.",
  },
  {
    number: 2,
    title: "Pick Your Proteins",
    description:
      "Select from grass-fed beef, organic chicken, heritage pork, and wild-caught seafood — or let us curate for you.",
  },
  {
    number: 3,
    title: "We Ship Free",
    description:
      "Your box arrives frozen to your door in an eco-friendly, 100% recyclable box.",
  },
  {
    number: 4,
    title: "Cook & Enjoy",
    description:
      "Thaw, cook, and serve restaurant-quality meals at home. Recipes included.",
  },
] as const;

function CountUpNumber({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 600;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <>{count}</>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-surface-warm" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="How It Works"
            heading="Delivered Frozen, Served Incredible"
            subtitle="We partner with trusted ranchers and fisheries to bring you the best proteins, made simple."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
          className="mt-14 overflow-hidden rounded-2xl"
        >
          <img
            src={IMAGES.whatsInBox}
            alt="What's in a ButcherBox"
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
        </motion.div>

        <motion.div
          ref={stepsRef}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={stepReveal}>
              <span className="font-serif text-6xl font-bold leading-none text-primary-light sm:text-7xl">
                <CountUpNumber target={step.number} inView={stepsInView} />
              </span>
              <div className="mt-4 mb-5 h-[3px] w-12 rounded-full bg-primary-light/30" />
              <h3 className="text-lg font-bold text-text-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
