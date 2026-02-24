"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";

const STEPS = [
  {
    number: "01",
    title: "Pick your plan",
    desc: "Find the plan that best fits your needs—choose between Signature or Essentials.",
  },
  {
    number: "02",
    title: "Build your box",
    desc: "Select your preferred premium cuts that fit your family\u2019s tastes and needs.",
  },
  {
    number: "03",
    title: "Get it delivered for free",
    desc: "Receive your box within 1-3 days—shipping\u2019s always on us.",
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
    <section className="bg-[#F5F0EB] py-20" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
            Flexible Subscription, Zero Risk
          </span>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-[#1A1A1A] sm:text-[44px]">
            How It Works
          </h2>
        </motion.div>

        {/* Three steps */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              className="relative text-center"
            >
              {/* Connecting dotted line between steps — desktop only */}
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-10 hidden w-full translate-x-1/2 md:block">
                  <div className="mx-auto h-px w-full border-t-2 border-dashed border-[#2D5E4A]/20" />
                </div>
              )}

              {/* Decorative number */}
              <span className="font-display text-[64px] font-bold leading-none text-[#2D5E4A]/20">
                {step.number}
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#6B6B6B]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance pills */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {PILLS.map((pill) => (
            <div
              key={pill}
              className="flex items-center gap-2 rounded-full border border-[#E5DDD4] bg-white px-4 py-2 text-sm text-[#243B35]"
            >
              <Check size={14} className="text-[#2D5E4A]" />
              {pill}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => openSignup()}
            whileHover={{
              y: -2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
            whileTap={{ y: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="rounded-pill bg-[#2D5E4A] px-10 py-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#3A7D64]"
          >
            Explore Plans →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
