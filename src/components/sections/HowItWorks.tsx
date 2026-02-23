"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useSignup } from "@/components/signup/SignupFlow";

const STEPS = [
  { number: "01", title: "Choose Your Plan", description: "Pick the Signature Box size that fits your household — Medium, Large, or Extra-Large." },
  { number: "02", title: "Pick Your Proteins", description: "Select from grass-fed beef, organic chicken, heritage pork, and wild-caught seafood." },
  { number: "03", title: "We Ship Free", description: "Your box arrives frozen to your door in an eco-friendly, 100% recyclable box." },
  { number: "04", title: "Cook & Enjoy", description: "Thaw, cook, and serve restaurant-quality meals at home. Recipes included." },
] as const;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const stepReveal = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function HowItWorks() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-[#F5F0EB]" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionHeading eyebrow="How It Works" heading="Delivered Frozen, Served Incredible" subtitle="We partner with trusted ranchers and fisheries to bring you the best proteins, made simple." />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }} className="mt-14 overflow-hidden rounded-2xl">
          <img src="https://shapinup.com/wp-content/uploads/2019/02/BBmeatbox1.jpg" alt="What's in a ButcherBox" loading="lazy" className="aspect-[21/9] w-full object-cover" />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={stepReveal} className="flex gap-5">
              <span className="font-serif text-5xl font-bold leading-none text-[#2D5E4A] sm:text-6xl lg:text-7xl">
                {step.number}
              </span>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-text-dark">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <Button variant="primary" className="px-10 py-4 text-base" onClick={() => openSignup()}>
            Start Building Your Box →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
