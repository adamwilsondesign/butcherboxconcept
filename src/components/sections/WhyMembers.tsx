"use client";

import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import { IMAGES } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";

const VALUE_CARDS = [
  {
    image: IMAGES.steakRosemary,
    label: "Best Prices",
    title: "Hard-to-beat meat prices",
    body: "Up to 15% savings on premium cuts vs. grocery stores\u2014plus zero lines.",
  },
  {
    image: IMAGES.chickensField,
    label: "Sizzle Perks",
    title: "Loyalty that pays off",
    body: "Get 2% back on every order in rewards points, redeemable for savings on future boxes.",
  },
  {
    image: IMAGES.fishingBoat,
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
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D6A4F]/10">
        <Check size={16} className="text-[#2D6A4F]" />
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

        {/* Value cards — photo cards with hover reveal */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default state — dark gradient at bottom with title only */}
              <div
                className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(27,67,50,0.75) 0%, rgba(27,67,50,0.2) 45%, transparent 100%)",
                }}
              />

              {/* Hover state — blur + darker shroud with full content */}
              <div
                className="absolute inset-0 opacity-0 backdrop-blur-[6px] transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background:
                    "rgba(27,67,50,0.65)",
                }}
              />

              {/* Title — always visible, repositions on hover */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#40916C] opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  {card.label}
                </span>
                <h3 className="mt-1 font-sans font-extrabold text-xl leading-snug text-white sm:text-2xl">
                  {card.title}
                </h3>
                <p
                  className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 transition-all duration-400 group-hover:max-h-40"
                  style={{ lineHeight: 1.7 }}
                >
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table section — warm bg */}
        <div className="mt-20 rounded-2xl bg-[#FAF7F2] p-8 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center">
              <h3 className="font-sans font-extrabold text-3xl text-[#1A1A1A] sm:text-4xl">
                ButcherBox vs Others
              </h3>
              <p
                className="mt-4 text-base text-[#6B6B6B]"
                style={{ lineHeight: 1.75 }}
              >
                How ButcherBox compares with other meat delivery services
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E5DDD4] bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[#E5DDD4]">
                    {COMPARISON_HEADERS.map((h, i) => (
                      <th
                        key={h || "label"}
                        className={`px-5 py-4 text-sm font-semibold ${
                          i === 1
                            ? "relative bg-[#2D6A4F]/5 text-[#2D6A4F]"
                            : i === 0
                              ? "text-[#1A1A1A]"
                              : "text-[#6B6B6B]"
                        }`}
                      >
                        {i === 1 && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2D6A4F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
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
                              ? "bg-[#2D6A4F]/5 font-semibold text-[#2D6A4F]"
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
            className="rounded-lg bg-[#2D6A4F] px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1B4332]"
          >
            Choose ButcherBox
          </button>
        </motion.div>
      </div>
    </section>
  );
}
