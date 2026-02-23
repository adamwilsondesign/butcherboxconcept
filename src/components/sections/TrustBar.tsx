"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const logoReveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

function GoodHousekeepingSVG() {
  return (
    <svg viewBox="0 0 200 28" className="h-7 w-auto sm:h-8">
      <text x="100" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontSize="18" fill="currentColor">Good Housekeeping</text>
    </svg>
  );
}

function ForbesSVG() {
  return (
    <svg viewBox="0 0 100 28" className="h-7 w-auto sm:h-8">
      <text x="50" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontStyle="italic" fontSize="22" fill="currentColor">Forbes</text>
    </svg>
  );
}

function USATodaySVG() {
  return (
    <svg viewBox="0 0 130 28" className="h-7 w-auto sm:h-8">
      <text x="65" y="22" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="1">USA TODAY</text>
    </svg>
  );
}

function TimeSVG() {
  return (
    <svg viewBox="0 0 80 30" className="h-7 w-auto sm:h-8">
      <rect x="2" y="2" width="76" height="26" rx="3" fill="none" stroke="#E4002B" strokeWidth="2" />
      <text x="40" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontSize="20" fill="#E4002B">TIME</text>
    </svg>
  );
}

function FoodAndWineSVG() {
  return (
    <svg viewBox="0 0 140 28" className="h-7 w-auto sm:h-8">
      <text x="70" y="22" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="16" fill="currentColor" letterSpacing="3">FOOD &amp; WINE</text>
    </svg>
  );
}

function ModernRetailSVG() {
  return (
    <svg viewBox="0 0 150 28" className="h-7 w-auto sm:h-8">
      <text x="75" y="22" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="500" fontSize="18" fill="currentColor">Modern Retail</text>
    </svg>
  );
}

const PRESS = [
  { name: "Good Housekeeping", Logo: GoodHousekeepingSVG },
  { name: "Forbes", Logo: ForbesSVG },
  { name: "USA Today", Logo: USATodaySVG },
  { name: "TIME", Logo: TimeSVG },
  { name: "Food & Wine", Logo: FoodAndWineSVG },
  { name: "Modern Retail", Logo: ModernRetailSVG },
] as const;

export default function TrustBar() {
  return (
    <section className="bg-[#F8F4EF]" id="press">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.15em] text-[#1B4332]">As Seen In</p>
          <SectionHeading heading="Trusted & Recognized" />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PRESS.map((pub) => (
            <motion.div key={pub.name} variants={logoReveal} className="group flex items-center justify-center rounded-card border border-[#EDE8E1] bg-white px-8 py-4 text-[#9CA3AF] transition-all duration-200 hover:border-[#1B4332] hover:text-[#4B5563] hover:shadow-card hover:-translate-y-0.5">
              <pub.Logo />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-pill bg-[#1B4332]/5 border border-[#1B4332]/15 px-5 py-2.5">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">B</text>
            </svg>
            <span className="text-[13px] font-medium text-[#1B4332]">Certified B Corporation&reg;</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
