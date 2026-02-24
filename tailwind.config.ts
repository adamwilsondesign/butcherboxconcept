import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#1B4332",
        "brand-green-mid": "#2D6A4F",
        "brand-green-light": "#40916C",
        "brand-teal": "#005A73",
        "brand-teal-light": "#007A9A",
        cream: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-warm": "#F5F0EB",
        "text-primary": "#1A1A1A",
        "text-muted": "#6B6B6B",
        "text-light": "#9CA3AF",
        border: "#E5DDD4",
        "star-gold": "#D4A84B",
        primary: "#2D6A4F",
        background: "#FAF7F2",
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.02em",
        subheading: "-0.01em",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
