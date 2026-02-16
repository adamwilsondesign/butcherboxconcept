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
        primary: "#2D5E4A",
        "primary-light": "#3A7D64",
        "primary-dark": "#243B35",
        accent: "#C8512B",
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
