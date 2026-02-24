"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Sparkles,
  Tag,
  Check,
  X,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
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
    values: [
      "$8.52-$15.23/lb",
      "$10.64-$18.43/lb",
      "$14.53-$16.98/lb",
      "$20.52/lb",
    ],
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
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D5E4A]/10">
        <Check size={16} className="text-[#2D5E4A]" />
      </span>
    );
  if (value === "cross")
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
        <X size={16} className="text-red-400" />
      </span>
    );
  if (value === "question")
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
        <HelpCircle size={16} className="text-[#6B6B6B]" />
      </span>
    );
  return <span className="text-sm font-medium text-[#1A1A1A]">{value}</span>;
}

export default function WhyMembers() {
  const { openSignup } = useSignup();

  return (
    <section className="bg-white py-24 sm:py-32" id="why-us">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <SectionHeading
          label="The value of a ButcherBox Membership"
          title="Why 400,000+ Members Choose Us"
        />

        {/* Value cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {VALUE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-[#F5F0EB] p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2D5E4A] text-white">
                <card.icon size={24} />
              </div>
              <span className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.15em] text-[#C8512B]">
                {card.label}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">
                {card.title}
              </h3>
              <p
                className="mt-4 text-base leading-relaxed text-[#6B6B6B]"
                style={{ lineHeight: 1.75 }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table section — warm bg */}
        <div className="mt-20 rounded-2xl bg-[#FAF7F2] p-8 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center">
              <h3 className="font-display text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                ButcherBox vs Others
              </h3>
              <p
                className="mt-4 text-base text-[#6B6B6B]"
                style={{ lineHeight: 1.75 }}
              >
                How ButcherBox compares with other meat delivery services
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E5DDD4] bg-white shadow-lg">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[#E5DDD4]">
                    {COMPARISON_HEADERS.map((h, i) => (
                      <th
                        key={h || "label"}
                        className={`px-5 py-4 text-sm font-semibold ${
                          i === 1
                            ? "relative bg-[#2D5E4A]/5 text-[#2D5E4A]"
                            : i === 0
                              ? "text-[#1A1A1A]"
                              : "text-[#6B6B6B]"
                        }`}
                      >
                        {i === 1 && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C8512B] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            Best Value
                          </span>
                        )}
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
                      <td className="px-5 py-4 text-sm font-medium text-[#1A1A1A]">
                        {row.label}
                      </td>
                      {row.values.map((val, j) => (
                        <td
                          key={j}
                          className={`px-5 py-4 ${
                            j === 0
                              ? "bg-[#2D5E4A]/5 font-semibold text-[#2D5E4A]"
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

            <p className="mt-4 text-center text-xs text-[#6B6B6B]">
              *All pricing effective as of 1/8/2026. ButcherBox pricing includes
              free protein for 12 months.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => openSignup()}
            className="group inline-flex items-center gap-2 rounded-full bg-[#C8512B] px-8 py-4 text-[14px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#A8431F] hover:shadow-lg"
          >
            Choose ButcherBox
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
