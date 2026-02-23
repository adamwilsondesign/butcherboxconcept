"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useSignup } from "@/components/signup/SignupFlow";

const STEPS = [
  { number: "01", title: "Choose Your Plan", description: "Pick the box size that fits your household." },
  { number: "02", title: "Pick Your Proteins", description: "Select from beef, chicken, pork, and seafood." },
  { number: "03", title: "We Ship Free", description: "Arrives frozen in 100% recyclable packaging." },
  { number: "04", title: "Cook & Enjoy", description: "Restaurant-quality meals, ready in minutes." },
] as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const stepReveal = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function HowItWorks() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#F5F0EB]" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-6 py-[100px] sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }}>
          <SectionHeading heading="How It Works" />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={stepReveal} className="flex gap-5">
              <span className="font-serif text-[56px] font-bold leading-none text-[#243B35]">
                {step.number}
              </span>
              <div className="pt-2">
                <h3 className="text-[16px] font-semibold text-[#2C2C2C]">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6B6B6B]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Button variant="primary" className="px-10 py-4 text-[13px]" onClick={() => openSignup()}>
            Start Building Your Box
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
