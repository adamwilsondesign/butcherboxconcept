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
        primary: "#243B35",
        "primary-light": "#3D7B5F",
        "primary-dark": "#1A2E29",
        accent: "#C8512B",
        "brand-blue": "#1B365D",
        background: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-warm": "#F5F0EB",
        "text-dark": "#1A1A1A",
        "text-muted": "#6B6B6B",
        border: "#E5DDD4",
        "star-gold": "#D4A84B",
      },
      fontFamily: {
        serif: ["var(--font-libre)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
