"use client";

import { useEffect, useState, useRef } from "react";
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
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const topOffset = promoVisible ? 36 : 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);

      // Show/hide based on scroll direction (only after scrolling past 100px)
      if (currentY > 100) {
        setVisible(currentY < lastScrollY.current || currentY < 60);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };
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

  // Always show nav when mobile drawer is open
  const navVisible = visible || mobileOpen;

  return (
    <>
      {/* Main nav — 68px, transparent -> white on scroll, hide/show on scroll direction */}
      <header
        className="fixed inset-x-0 z-50"
        style={{
          top: topOffset,
          backgroundColor: scrolled ? "#FFFFFF" : "transparent",
          boxShadow: scrolled && navVisible ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          transition:
            "background-color 300ms ease, box-shadow 300ms ease, top 300ms ease, transform 300ms ease",
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
            <span className="font-sans font-extrabold text-[18px] text-[#005A73]">
              ButcherBox
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="nav-link relative py-1 text-[14px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:text-[#2D6A4F]"
                >
                  {label}
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#2D6A4F] transition-transform duration-[250ms] ease-out"
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
              className="text-[14px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:text-[#2D6A4F]"
            >
              Sign In
            </a>
            <button
              onClick={() => openSignup()}
              className="rounded-lg bg-[#2D6A4F] px-6 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#1B4332]"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#1B4332]/5 lg:hidden"
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
                  <X size={24} className="text-[#1B4332]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
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
                    className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#1B4332]/5 hover:text-[#2D6A4F]"
                  >
                    {label}
                  </motion.a>
                ))}
                <hr className="my-3 border-[#E5DDD4]" />
                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-[16px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#1B4332]/5 hover:text-[#2D6A4F]"
                >
                  Sign In
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openSignup();
                  }}
                  className="mt-2 rounded-lg bg-[#2D6A4F] py-3.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-[#1B4332]"
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
