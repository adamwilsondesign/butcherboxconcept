"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function MemberReviews() {
  return (
    <section className="bg-white" id="reviews">
      <div className="mx-auto w-full max-w-[720px] px-6 py-[120px] sm:px-8 lg:px-12">
        <div className="relative flex flex-col items-center text-center">
          {/* Decorative quote mark — Cormorant 120px, absolute, subtle */}
          <span
            className="pointer-events-none absolute -top-8 left-0 font-display text-[120px] font-semibold leading-none text-[#1B4332] select-none sm:-top-12 sm:left-4"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="fill-[#1B4332] text-[#1B4332]" />
            ))}
          </motion.div>

          {/* Quote — Cormorant Garamond italic 32px */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-8"
          >
            <p className="font-display text-[22px] font-normal italic leading-relaxed tracking-heading text-[#2A2A2A] sm:text-[28px] lg:text-[32px]">
              &ldquo;I was nervous about the subscription but cancelling is genuinely easy — and the quality makes it a no-brainer.&rdquo;
            </p>
          </motion.blockquote>

          {/* Attribution — DM Sans 14px/500 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-8"
          >
            <p className="text-[14px] font-medium text-[#2A2A2A]">Paul T.</p>
            <p className="mt-1 text-[13px] text-[#767676]">Member since 2022</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
