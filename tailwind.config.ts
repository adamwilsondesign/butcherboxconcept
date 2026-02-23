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
        "green-dark": "#1B4332",
        "green-mid": "#2D6A4F",
        cream: "#F8F4EF",
        "cream-dark": "#EDE8E1",
        "text-primary": "#2A2A2A",
        "text-muted": "#767676",
        accent: "#C8512B",
        border: "#EDE8E1",
        primary: "#1B4332",
        background: "#F8F4EF",
        surface: "#FFFFFF",
        "surface-warm": "#EDE8E1",
        "text-dark": "#2A2A2A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.02em",
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
