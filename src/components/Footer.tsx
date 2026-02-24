"use client";

import {
  Truck,
  XCircle,
  Shield,
  Award,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";

const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping" },
  { icon: XCircle, label: "Cancel Anytime" },
  { icon: Shield, label: "100% Satisfaction" },
  { icon: Award, label: "B Corp Certified" },
];

const FOOTER_LINKS = {
  Shop: ["Choose Your Plan", "Gift Boxes", "Store Locator"],
  Learn: ["How It Works", "Our Sourcing", "Recipes", "FAQs"],
  Company: ["Our Story", "B Corp", "Careers", "Press"],
  Support: ["Contact Us", "Help Center", "Shipping Info", "Returns"],
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const { openSignup } = useSignup();

  return (
    <footer>
      {/* Curved top edge SVG */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 120"
          className="-mb-1 block w-full"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="#243B35"
          />
        </svg>
      </div>

      {/* Footer body */}
      <div className="bg-[#243B35] text-white">
        {/* Top CTA */}
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Eat Better?
            </h2>
            <p
              className="mt-4 text-base text-white/70 sm:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              Join 400,000+ members and get premium protein delivered to your
              door.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openSignup()}
                className="group inline-flex items-center gap-2 rounded-full bg-[#C8512B] px-8 py-4 text-[14px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#A8431F] hover:shadow-lg"
              >
                Get Started — Free Shipping
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <button className="rounded-full border-2 border-white/30 px-8 py-4 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-white/10">
                Send a Gift
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <badge.icon size={16} />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {heading}
                </h4>
                <ul className="mt-5 space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pb-8 pt-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Left */}
            <p className="text-xs text-white/40">
              &copy; 2026 ButcherBox. All rights reserved.
            </p>

            {/* Center — social icons */}
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            {/* Right */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Privacy Policy
              </a>
              <span className="text-xs text-white/20">&middot;</span>
              <a
                href="#"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Terms of Use
              </a>
              <span className="text-xs text-white/20">&middot;</span>
              <a
                href="#"
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
