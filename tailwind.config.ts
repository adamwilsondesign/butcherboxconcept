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
        accent: "#C8512B",
        background: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-warm": "#F5F0EB",
        "text-dark": "#2C2C2C",
        "text-muted": "#6B6B6B",
        border: "#E5DDD4",
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
