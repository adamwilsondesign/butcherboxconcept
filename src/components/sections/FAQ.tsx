"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "What sets ButcherBox apart from the competition?",
    a: "ButcherBox is on a mission to bring better meat and seafood to every table. All of our meat and seafood is free from antibiotics and added hormones, and comes from partners we\u2019ve vetted for sustainability and animal welfare. We are the only B-Corp certified meat and seafood company with third-party animal welfare certifications for 100% of our products \u2014 beef, poultry, pork, seafood, and more. Our members get access to 100+ products ranging from thick-cut steaks to gluten-free chicken nuggets, all free of 200+ banned ingredients.",
  },
  {
    q: "How much can I customize my box?",
    a: "We offer a completely customizable subscription with two plan options. Choose between Essentials (6 products from 50+ core cuts) or Signature (6, 9, or 12 products from 100+ cuts including specialty items like ribeye, filet mignon, and salmon). You can change your selections every order, up to the night before it bills.",
  },
  {
    q: "How much does ButcherBox cost?",
    a: "Our Essentials Plan starts at $159 for 6 products. The Signature Plan starts at $179 (Medium, 6 products), $249 (Large, 9 products), or $319 (Extra-Large, 12 products). Shipping is always free, and you choose delivery every 2, 4, 6, or 8 weeks.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes! If you decide ButcherBox isn\u2019t right for you, you can easily cancel your subscription at any time with no fees or penalties. You\u2019re always welcome to resubscribe if you change your mind.",
  },
  {
    q: "Are your animals humanely raised?",
    a: "Yes. We partner with people dedicated to doing the right thing. ButcherBox is the only B Corp certified meat and seafood brand to source exclusively from partners with third-party animal welfare certifications. Our farmers\u2019 methods are inspired by Dr. Temple Grandin, and facilities are routinely inspected and approved by the USDA or comparable agencies.",
  },
  {
    q: "How does shipping and delivery work?",
    a: "Your order ships within 1-3 days with free shipping. You\u2019ll receive tracking info via email. Orders arrive packed with dry ice and should be refrigerator-cold (below 40\u00B0F) when retrieved within 6-8 hours of delivery. All products can go straight into the freezer.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "Absolutely. Every order is backed by our 100% Satisfaction Guarantee. If you\u2019re unhappy with our service or products for any reason, reach out and we\u2019ll make it right.",
  },
];

export default function FAQ() {
  const { openSignup } = useSignup();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ButcherBox"
        />

        {/* Accordion */}
        <div className="mt-16">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b border-[#E5DDD4] transition-all duration-300 ${
                  isOpen ? "border-l-4 border-l-[#2D6A4F] pl-6" : "pl-0"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-8 text-lg font-semibold text-[#1A1A1A] sm:text-xl">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={22} className="text-[#6B6B6B]" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 text-base leading-relaxed text-[#6B6B6B]"
                        style={{ lineHeight: 1.75 }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 rounded-2xl bg-[#FAF7F2] p-8 text-center sm:p-10"
        >
          <p className="font-sans font-extrabold text-xl text-[#1A1A1A] sm:text-2xl">
            Still have questions?
          </p>
          <p className="mt-2 text-base text-[#6B6B6B]">
            Reach out anytime at{" "}
            <a
              href="tel:+18559818568"
              className="font-medium text-[#2D6A4F] hover:underline"
            >
              855-981-8568
            </a>
          </p>
          <button
            onClick={() => openSignup()}
            className="mt-6 rounded-lg bg-[#2D6A4F] px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1B4332]"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
