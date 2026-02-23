"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

export default function MemberReviews() {
  return (
    <section className="bg-white" id="reviews">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-[#2D5E4A] text-[#2D5E4A]" />
            ))}
          </motion.div>

          <motion.blockquote variants={fadeUp} className="mt-8">
            <p className="font-serif text-2xl font-medium leading-relaxed text-text-dark sm:text-3xl lg:text-4xl">
              &ldquo;I was nervous about the subscription but cancelling is genuinely easy — and the quality makes it a no-brainer.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div variants={fadeUp} className="mt-8">
            <p className="text-lg font-semibold text-text-dark">Paul T.</p>
            <p className="mt-1 text-base font-medium text-text-muted">ButcherBox Member since 2022</p>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-text-muted">
            70,000+ five-star reviews
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
