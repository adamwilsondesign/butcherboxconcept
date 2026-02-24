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
        "brand-teal": "#2D5E4A",
        "brand-teal-dark": "#243B35",
        "brand-teal-light": "#3A7D64",
        accent: "#C8512B",
        cream: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-warm": "#F5F0EB",
        "text-primary": "#1A1A1A",
        "text-muted": "#6B6B6B",
        border: "#E5DDD4",
        "star-gold": "#D4A84B",
        primary: "#2D5E4A",
        background: "#FAF7F2",
      },
      fontFamily: {
        display: ["var(--font-libre)", "serif"],
        serif: ["var(--font-libre)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.01em",
      },
      borderRadius: {
        card: "12px",
        pill: "100px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.07)",
        "card-hover": "0 12px 32px rgba(0,0,0,0.10)",
        "btn-hover": "0 8px 24px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
