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
        "green-dark": "#1B3A2D",
        "green-mid": "#2D5A40",
        cream: "#F7F3EE",
        "cream-dark": "#EDE8E1",
        "text-primary": "#1A1A1A",
        "text-muted": "#6B6B6B",
        accent: "#C8512B",
        border: "#EDE8E1",
        /* Aliases for existing Tailwind classes in other components */
        primary: "#1B3A2D",
        background: "#F7F3EE",
        surface: "#FFFFFF",
        "surface-warm": "#EDE8E1",
        "text-dark": "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        pill: "100px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
