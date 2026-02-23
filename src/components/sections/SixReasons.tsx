"use client";

import { motion } from "framer-motion";

function ForbesSVG() {
  return (
    <svg viewBox="0 0 100 28" className="h-6 w-auto sm:h-7">
      <text x="50" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="700" fontStyle="italic" fontSize="22" fill="currentColor">Forbes</text>
    </svg>
  );
}

function BonAppetitSVG() {
  return (
    <svg viewBox="0 0 150 28" className="h-6 w-auto sm:h-7">
      <text x="75" y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="400" fontStyle="italic" fontSize="18" fill="currentColor">Bon Appétit</text>
    </svg>
  );
}

function NYTCookingSVG() {
  return (
    <svg viewBox="0 0 160 28" className="h-6 w-auto sm:h-7">
      <text x="80" y="22" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="16" fill="currentColor">NYT Cooking</text>
    </svg>
  );
}

function TodayShowSVG() {
  return (
    <svg viewBox="0 0 120 28" className="h-6 w-auto sm:h-7">
      <text x="60" y="22" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="1">TODAY</text>
    </svg>
  );
}

const PRESS = [
  { name: "Forbes", Logo: ForbesSVG },
  { name: "Bon Appétit", Logo: BonAppetitSVG },
  { name: "NYT Cooking", Logo: NYTCookingSVG },
  { name: "Today Show", Logo: TodayShowSVG },
] as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const logoReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function SixReasons() {
  return (
    <section className="border-y border-[#EDE8E1] bg-white" id="press">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10 lg:gap-14"
        >
          <motion.span variants={logoReveal} className="shrink-0 text-[12px] font-medium uppercase tracking-[0.15em] text-[#767676]">
            As Seen In
          </motion.span>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-14">
            {PRESS.map((pub) => (
              <motion.div
                key={pub.name}
                variants={logoReveal}
                className="text-[#9CA3AF] transition-colors duration-200 hover:text-[#4B5563]"
                aria-label={pub.name}
              >
                <pub.Logo />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
