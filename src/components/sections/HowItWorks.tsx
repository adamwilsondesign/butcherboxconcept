"use client";

import { motion } from "framer-motion";
import { ClipboardList, Package, Truck, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Pick your plan",
    desc: "Find the plan that best fits your needs — choose between Signature or Essentials.",
  },
  {
    number: "02",
    icon: Package,
    title: "Build your box",
    desc: "Select your preferred premium cuts that fit your family\u2019s tastes and needs.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Get it delivered for free",
    desc: "Receive your box within 1-3 days — shipping\u2019s always on us.",
  },
];

const PILLS = [
  "Flexible Subscription",
  "Skip or Cancel Anytime",
  "Free Shipping",
  "100% Satisfaction Guarantee",
  "Third-Party Certified",
  "No Antibiotics Ever",
];

export default function HowItWorks() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="Flexible Subscription, Zero Risk"
          title="How It Works"
        />

        {/* Three steps */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="relative text-center"
            >
              {/* Connecting dotted line between steps — desktop only */}
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-10 hidden w-full translate-x-1/2 md:block">
                  <div className="mx-auto h-px w-full border-t-2 border-dashed border-[#2D6A4F]/20" />
                </div>
              )}

              {/* Icon — tinted rounded-xl square */}
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B4332]/5">
                <step.icon size={24} className="text-[#2D6A4F]" />
              </div>

              {/* Step number */}
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#2D6A4F]">
                Step {step.number}
              </p>

              <h3 className="mt-2 font-display text-xl text-[#1A1A1A] sm:text-2xl">
                {step.title}
              </h3>
              <p
                className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-[#6B6B6B]"
                style={{ lineHeight: 1.75 }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {PILLS.map((pill) => (
            <div
              key={pill}
              className="flex items-center gap-2 rounded-full border border-[#E5DDD4] bg-white px-5 py-2.5 text-sm font-medium text-[#1B4332]"
            >
              <Check size={14} className="text-[#2D6A4F]" />
              {pill}
            </div>
          ))}
        </motion.div>

        {/* CTA — secondary style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => openSignup()}
            className="rounded-lg border-2 border-[#1B4332] bg-transparent px-8 py-3.5 text-base font-medium text-[#1B4332] transition-colors duration-200 hover:bg-[#1B4332] hover:text-white"
          >
            Explore Plans
          </button>
        </motion.div>
      </div>
    </section>
  );
}
