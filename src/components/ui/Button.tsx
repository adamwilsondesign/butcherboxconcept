"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-pill px-8 py-3.5 text-[14px] font-semibold transition-colors duration-200";

  const variants = {
    primary: "bg-[#2D5E4A] text-white hover:bg-[#3A7D64]",
    secondary:
      "border border-[#E5DDD4] bg-white text-[#243B35] hover:bg-[#F5F0EB]",
  };

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
