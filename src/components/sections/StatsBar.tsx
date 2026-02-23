"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 400, suffix: "k+", label: "Active Members" },
  { target: 1, suffix: "B+", label: "Meals Delivered" },
  { target: 70, suffix: "k+", label: "5-Star Reviews" },
];

/* Count-up hook: animates from 0 → target over duration with easeOut */
function useCountUp(target: number, duration: number, startDelay: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = Date.now() + startDelay;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startDelay, trigger]);

  return value;
}

function AnimatedStat({ stat, index }: { stat: StatConfig; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.target, 1200, index * 150, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="text-center"
    >
      <p className="font-display text-[48px] font-semibold leading-none tracking-heading text-[#1B4332]">
        {count}{stat.suffix}
      </p>
      <p className="mt-2 text-[14px] font-medium text-[#767676]">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#EDE8E1]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 sm:flex-row sm:gap-16 sm:px-8 lg:px-12">
        {STATS.map((stat, i) => (
          <AnimatedStat key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
