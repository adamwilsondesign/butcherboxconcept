"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function FinalCTA() {
  const { openSignup } = useSignup();

  return (
    <section className="relative bg-[#F5F0EB]" id="get-started">
      <div className="absolute inset-x-0 -top-px overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-full" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V0H0V30Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-32 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }} className="hidden flex-col gap-4 lg:col-span-3 lg:flex">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl"><img src={IMAGES.barbacoa} alt="Plated barbacoa dish" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="aspect-square overflow-hidden rounded-2xl"><img src={IMAGES.whatsInBox} alt="ButcherBox delivery contents" loading="lazy" className="h-full w-full object-cover" /></div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col items-center text-center lg:col-span-6">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#C8512B]">Made With Integrity</motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 font-serif text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">Ready to Taste<br />the Difference?</motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">Join 400,000+ members enjoying restaurant-quality meat at home. Free steak for a year when you start today.</motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <Button variant="primary" className="px-12 py-4 text-base" onClick={() => openSignup()}>Choose Your Plan — Starting at $179</Button>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-3 text-sm font-semibold text-[#C8512B]">Offer ends soon</motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-sm text-text-muted">Free shipping&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime&nbsp;&nbsp;·&nbsp;&nbsp;100% guarantee</motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" as const }} className="hidden flex-col gap-4 lg:col-span-3 lg:flex">
            <div className="aspect-square overflow-hidden rounded-2xl"><img src={IMAGES.salmon} alt="Wild-caught salmon fillet" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl"><img src={IMAGES.porkTenderloin} alt="Heritage pork tenderloin" loading="lazy" className="h-full w-full object-cover" /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
