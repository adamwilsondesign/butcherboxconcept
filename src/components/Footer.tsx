"use client";

import { useState } from "react";
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const LINKS = [
  { label: "Gift Boxes", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Sourcing", href: "#" },
  { label: "Recipes", href: "#" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
] as const;

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
] as const;

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* ── Col 1: Newsletter ── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Get Tips &amp; Offers
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Recipes, deals, and sourcing stories — delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Subscribe:", email);
                setEmail("");
              }}
              className="mt-5 flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="min-w-0 flex-1 rounded-l-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-accent focus:bg-white/15"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-md bg-accent px-4 text-white transition-colors hover:bg-accent/90"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* ── Col 2: Mission ── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              ButcherBox delivers 100% grass-fed beef, free-range organic
              chicken, heritage-breed pork, and wild-caught seafood directly
              to your door.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-2 w-2 rounded-full bg-accent" />
              B Corp Certified
            </div>
          </div>

          {/* ── Col 3: Links ── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Explore
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact Us
            </h3>
            <address className="mt-3 space-y-2 not-italic text-sm leading-relaxed text-white/60">
              <p>Watertown, MA</p>
              <p>
                <a
                  href="mailto:support@butcherbox.com"
                  className="transition-colors hover:text-white"
                >
                  support@butcherbox.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+18559811214"
                  className="transition-colors hover:text-white"
                >
                  (855) 981-1214
                </a>
              </p>
            </address>

            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-accent hover:text-white"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; 2026 ButcherBox. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
