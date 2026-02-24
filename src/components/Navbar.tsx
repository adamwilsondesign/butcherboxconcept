"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSignup } from "@/components/signup/SignupFlow";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Standards", href: "#standards" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ promoVisible }: { promoVisible: boolean }) {
  const { openSignup } = useSignup();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const topOffset = promoVisible ? 36 : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main nav — 68px, transparent→white on scroll ── */}
      <header
        className="fixed inset-x-0 z-50"
        style={{
          top: topOffset,
          backgroundColor: scrolled ? "#FFFFFF" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
          transition:
            "background-color 300ms ease, box-shadow 300ms ease, top 300ms ease",
        }}
      >
        <nav
          className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10"
            aria-label="ButcherBox home"
          >
            <span className="font-display text-[18px] font-bold text-[#243B35]">
              ButcherBox
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="nav-link relative py-1 text-[14px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:text-[#2D5E4A]"
                >
                  {label}
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#2D5E4A] transition-transform duration-[250ms] ease-out"
                    style={{ transitionProperty: "transform" }}
                  />
                </a>
              </li>
            ))}
          </ul>
          <style jsx>{`
            .nav-link:hover span {
              transform: scaleX(1);
            }
          `}</style>

          {/* Desktop right */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="#"
              className="text-[14px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:text-[#2D5E4A]"
            >
              Sign In
            </a>
            <motion.button
              onClick={() => openSignup()}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              whileTap={{ y: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-pill bg-[#2D5E4A] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#3A7D64]"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#2D5E4A]/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-[#243B35]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} className="text-[#243B35]" />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-white shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="h-[104px] shrink-0" />
              <nav
                className="flex flex-1 flex-col gap-2 px-6 py-4"
                aria-label="Mobile navigation links"
              >
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#2D5E4A]/5 hover:text-[#2D5E4A]"
                  >
                    {label}
                  </motion.a>
                ))}
                <hr className="my-3 border-[#E5DDD4]" />
                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#2D5E4A]/5 hover:text-[#2D5E4A]"
                >
                  Sign In
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openSignup();
                  }}
                  className="mt-2 rounded-pill bg-[#2D5E4A] py-3 text-center text-[13px] font-semibold text-white transition-colors hover:bg-[#3A7D64]"
                >
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
