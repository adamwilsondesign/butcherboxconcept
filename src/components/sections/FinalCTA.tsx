"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useSignup } from "@/components/signup/SignupFlow";
import { IMAGES } from "@/lib/images";

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
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function FinalCTA() {
  const { open } = useSignup();

  return (
    <section className="relative bg-surface-warm" id="get-started">
      {/* ── Wavy SVG divider at top ── */}
      <div className="absolute inset-x-0 -top-px overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full"
          preserveAspectRatio="none"
          style={{ height: 60 }}
        >
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V0H0V30Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left image stack ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="hidden flex-col gap-4 lg:col-span-3 lg:flex"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={IMAGES.hero}
                alt="Raw steaks on butcher paper"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src={IMAGES.whatsInBox}
                alt="ButcherBox delivery contents"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* ── Center content ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center text-center lg:col-span-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-widest text-accent"
            >
              Made With Integrity
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-4 font-serif text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl"
            >
              Premium Proteins,
              <br />
              Delivered
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-lg leading-relaxed text-text-muted"
            >
              Order today &amp; get free ground beef for life!
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Button variant="primary" className="px-12 py-4 text-base" onClick={() => open()}>
                Get Started
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm text-text-muted"
            >
              Free shipping&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime&nbsp;&nbsp;·&nbsp;&nbsp;100% guarantee
            </motion.p>
          </motion.div>

          {/* ── Right image stack ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="hidden flex-col gap-4 lg:col-span-3 lg:flex"
          >
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src={IMAGES.chickenBreast}
                alt="Organic chicken breast"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={IMAGES.porkChops}
                alt="Heritage pork chops"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
