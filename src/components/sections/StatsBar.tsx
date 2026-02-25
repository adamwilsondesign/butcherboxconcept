"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 400, suffix: ",000+", label: "Subscribers" },
  { target: 1, suffix: "B+", label: "Better Meals Sent" },
  { target: 70, suffix: ",000+", label: "5-Star Reviews" },
];

function useCountUp(
  target: number,
  duration: number,
  startDelay: number,
  trigger: boolean,
) {
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.target, 1200, index * 150, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="text-center"
    >
      <p className="text-4xl font-bold leading-none text-white sm:text-5xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-white/70 sm:text-base">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#005A73]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-8 sm:flex-row sm:gap-16 sm:px-8 lg:px-12">
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && (
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
            )}
            <AnimatedStat stat={stat} index={i} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
