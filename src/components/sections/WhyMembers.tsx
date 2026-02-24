"use client";

import { motion } from "framer-motion";
import { DollarSign, Sparkles, Tag, Check, X, HelpCircle } from "lucide-react";
import { useSignup } from "@/components/signup/SignupFlow";

const VALUE_CARDS = [
  {
    icon: DollarSign,
    label: "Best Prices",
    title: "Hard-to-beat meat prices",
    body: "Up to 15% savings on premium cuts vs. grocery stores\u2014plus zero lines.",
  },
  {
    icon: Sparkles,
    label: "Sizzle Perks",
    title: "Loyalty that pays off",
    body: "Get 2% back on every order in rewards points, redeemable for savings on future boxes.",
  },
  {
    icon: Tag,
    label: "Weekly Deals",
    title: "Exclusive weekly deals",
    body: "Members get access to perks like \u2018free-for-life\u2019 offers on select meats.",
  },
];

const COMPARISON_HEADERS = [
  "",
  "ButcherBox",
  "Good Chop",
  "Good Ranchers",
  "Omaha Steaks",
];

type CellValue = string | "check" | "cross" | "question";

const COMPARISON_ROWS: { label: string; values: CellValue[] }[] = [
  {
    label: "Pricing*",
    values: ["$8.52-$15.23/lb", "$10.64-$18.43/lb", "$14.53-$16.98/lb", "$20.52/lb"],
  },
  {
    label: "100% Grass-fed beef across all cuts",
    values: ["check", "cross", "cross", "cross"],
  },
  {
    label: "Pasture-raised, Grain-finished beef",
    values: ["check", "check", "check", "question"],
  },
  {
    label: "No feedlot confinement ever",
    values: ["check", "cross", "cross", "cross"],
  },
  {
    label: "B-corp certified",
    values: ["check", "cross", "cross", "cross"],
  },
  {
    label: "No antibiotics or added hormones",
    values: ["check", "question", "check", "question"],
  },
  {
    label: "Third-party animal welfare certified",
    values: ["check", "cross", "cross", "cross"],
  },
  {
    label: "Shipping Cost",
    values: ["Free", "$9.99", "Free", "$19.99"],
  },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "check")
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D5E4A]/10">
        <Check size={14} className="text-[#2D5E4A]" />
      </span>
    );
  if (value === "cross")
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
        <X size={14} className="text-[#6B6B6B]" />
      </span>
    );
  if (value === "question")
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
        <HelpCircle size={14} className="text-[#6B6B6B]" />
      </span>
    );
  return <span className="text-sm text-[#1A1A1A]">{value}</span>;
}

export default function WhyMembers() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white py-20" id="why-us">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
            The value of a ButcherBox Membership
          </span>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-[#1A1A1A] sm:text-[44px]">
            Why 400,000+ members choose us
          </h2>
        </motion.div>

        {/* Value cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
              className="rounded-xl bg-[#F5F0EB] p-8 text-center transition-shadow"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2D5E4A] text-white">
                <card.icon size={22} />
              </div>
              <span className="mt-4 block text-sm font-semibold uppercase text-[#C8512B]">
                {card.label}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-[#1A1A1A]">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B6B6B]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="text-center">
            <h3 className="font-display text-[28px] font-bold text-[#1A1A1A] sm:text-[32px]">
              ButcherBox vs Others
            </h3>
            <p className="mt-2 text-[15px] text-[#6B6B6B]">
              How ButcherBox compares with other meat delivery services
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-[#E5DDD4]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-[#E5DDD4] bg-[#F5F0EB]">
                  {COMPARISON_HEADERS.map((h, i) => (
                    <th
                      key={h || "label"}
                      className={`px-4 py-3 text-sm font-semibold ${
                        i === 1
                          ? "border-l-2 border-[#2D5E4A] bg-[#2D5E4A]/5 text-[#2D5E4A]"
                          : i === 0
                            ? "text-[#1A1A1A]"
                            : "text-[#6B6B6B]"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[#E5DDD4] last:border-b-0"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                      {row.label}
                    </td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 ${
                          j === 0
                            ? "border-l-2 border-[#2D5E4A] bg-[#2D5E4A]/5"
                            : ""
                        }`}
                      >
                        <CellIcon value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-center text-xs text-[#6B6B6B]">
            *All pricing effective as of 1/8/2026. ButcherBox pricing includes
            free protein for 12 months.
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
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
            className="rounded-pill bg-[#2D5E4A] px-10 py-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#3A7D64]"
          >
            Choose ButcherBox
          </motion.button>
        </div>
      </div>
    </section>
  );
}
