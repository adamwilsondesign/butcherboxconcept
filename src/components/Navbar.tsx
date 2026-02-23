"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSignup } from "@/components/signup/SignupFlow";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Standards", href: "#our-standards" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const { openSignup } = useSignup();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Promo banner ── */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-[#243B35] text-center text-[11px] font-medium tracking-wide text-white sm:text-[13px]"
        role="banner"
      >
        <button
          onClick={() => openSignup()}
          className="truncate px-4 hover:underline underline-offset-2 transition-all"
        >
          Free Steak or Salmon For A Year!&nbsp;&nbsp;·&nbsp;&nbsp;Free Shipping Always
        </button>
      </div>

      {/* ── Main nav — 16px top/bottom padding ── */}
      <header
        className={`fixed inset-x-0 top-9 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-white/90 backdrop-blur-lg"
            : "bg-white"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12" aria-label="Main navigation">
          <Link href="/" className="relative z-10" aria-label="ButcherBox home">
            <span className="text-lg font-extrabold uppercase tracking-[0.18em] text-[#243B35] sm:text-xl">BUTCHERBOX</span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="group relative py-1 text-[13px] font-medium text-[#2C2C2C] transition-colors hover:text-[#243B35]">
                  {label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-[#243B35] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-[13px] font-medium text-[#2C2C2C] transition-colors hover:text-[#243B35]">Sign In</a>
            <button onClick={() => openSignup()} className="rounded-md bg-[#243B35] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1a2c27]">
              Get Started
            </button>
          </div>

          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#243B35]/5 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} className="text-[#243B35]" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} className="text-[#243B35]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/40 md:hidden" aria-hidden="true" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-white shadow-2xl md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="h-[104px] shrink-0" />
              <nav className="flex flex-1 flex-col gap-2 px-6 py-4" aria-label="Mobile navigation links">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a key={href} href={href} onClick={() => setMobileOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#2C2C2C] transition-colors hover:bg-[#243B35]/5 hover:text-[#243B35]">
                    {label}
                  </motion.a>
                ))}
                <hr className="my-3 border-border" />
                <a href="#" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#2C2C2C] transition-colors hover:bg-[#243B35]/5 hover:text-[#243B35]">Sign In</a>
                <button onClick={() => { setMobileOpen(false); openSignup(); }} className="mt-2 rounded-md bg-[#243B35] py-3 text-center text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1a2c27]">
                  Get Started
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
