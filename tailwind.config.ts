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
        primary: "#1B3C34",
        secondary: "#2D5E4A",
        accent: "#C75B2C",
        cream: "#FFF8F0",
        "warm-white": "#FFFDFB",
        "text-dark": "#1A1A1A",
        "text-muted": "#6B6B6B",
        border: "#E8E0D8",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
