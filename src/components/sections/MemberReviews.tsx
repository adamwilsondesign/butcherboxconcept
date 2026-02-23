"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

export default function MemberReviews() {
  return (
    <section className="bg-white" id="reviews">
      <div className="mx-auto w-full max-w-[720px] px-6 py-[120px] sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Stars — 24px, green-dark */}
          <motion.div variants={fadeUp} className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="fill-[#1B3A2D] text-[#1B3A2D]" />
            ))}
          </motion.div>

          {/* Quote — Playfair italic 32px */}
          <motion.blockquote variants={fadeUp} className="mt-8">
            <p className="font-display text-[22px] font-normal italic leading-relaxed text-[#1A1A1A] sm:text-[28px] lg:text-[32px]">
              &ldquo;I was nervous about the subscription but cancelling is genuinely easy — and the quality makes it a no-brainer.&rdquo;
            </p>
          </motion.blockquote>

          {/* Attribution — Inter 14px/500 */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className="text-[14px] font-medium text-[#1A1A1A]">Paul T.</p>
            <p className="mt-1 text-[13px] text-[#6B6B6B]">Member since 2022</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
