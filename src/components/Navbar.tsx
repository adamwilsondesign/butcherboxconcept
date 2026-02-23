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
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
        className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-[#1B4332] text-center text-[11px] font-medium tracking-wide text-white sm:text-[13px]"
        role="banner"
      >
        <button
          onClick={() => openSignup()}
          className="truncate px-4 hover:underline underline-offset-2 transition-all"
        >
          Free Steak or Salmon For A Year!&nbsp;&nbsp;·&nbsp;&nbsp;Free Shipping Always
        </button>
      </div>

      {/* ── Main nav — 68px, transparent→white on scroll ── */}
      <header
        className="fixed inset-x-0 top-9 z-50"
        style={{
          backgroundColor: scrolled ? "#FFFFFF" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
          transition: "background-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12" aria-label="Main navigation">
          {/* Logo — Cormorant Garamond 18px */}
          <Link href="/" className="relative z-10" aria-label="ButcherBox home">
            <span className="font-display text-[18px] font-semibold tracking-heading text-[#1B4332]">ButcherBox</span>
          </Link>

          {/* Desktop links — DM Sans 14px/500, ::after underline */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="nav-link relative py-1 text-[14px] font-medium text-[#2A2A2A] transition-colors duration-200 hover:text-[#1B4332]"
                >
                  {label}
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#1B4332] transition-transform duration-[250ms] ease-out"
                    style={{ transitionProperty: "transform" }}
                  />
                </a>
              </li>
            ))}
          </ul>
          {/* CSS for nav link hover underline — applied via group/hover in tailwind */}
          <style jsx>{`
            .nav-link:hover span {
              transform: scaleX(1);
            }
          `}</style>

          {/* Desktop right */}
          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-[14px] font-medium text-[#2A2A2A] transition-colors duration-200 hover:text-[#1B4332]">Sign In</a>
            <motion.button
              onClick={() => openSignup()}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-pill bg-[#1B4332] px-6 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#2D6A4F]"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#1B4332]/5 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} className="text-[#1B4332]" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} className="text-[#1B4332]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/40 md:hidden" aria-hidden="true" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-white shadow-2xl md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="h-[104px] shrink-0" />
              <nav className="flex flex-1 flex-col gap-2 px-6 py-4" aria-label="Mobile navigation links">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a key={href} href={href} onClick={() => setMobileOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#2A2A2A] transition-colors hover:bg-[#1B4332]/5 hover:text-[#1B4332]">
                    {label}
                  </motion.a>
                ))}
                <hr className="my-3 border-[#EDE8E1]" />
                <a href="#" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#2A2A2A] transition-colors hover:bg-[#1B4332]/5 hover:text-[#1B4332]">Sign In</a>
                <button onClick={() => { setMobileOpen(false); openSignup(); }} className="mt-2 rounded-pill bg-[#1B4332] py-3 text-center text-[13px] font-medium text-white transition-colors hover:bg-[#2D6A4F]">
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
