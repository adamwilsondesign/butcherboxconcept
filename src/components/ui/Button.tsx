"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
  showArrow?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  showArrow = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 text-[14px] font-semibold transition-all duration-200";

  const variants = {
    primary:
      "rounded-full bg-[#C8512B] text-white px-8 py-4 shadow-md hover:bg-[#A8431F] hover:shadow-lg",
    secondary:
      "rounded-full border-2 border-[#243B35] bg-transparent text-[#243B35] px-8 py-4 hover:bg-[#243B35] hover:text-white",
    text: "text-[#C8512B] hover:text-[#A8431F] bg-transparent px-0 py-0",
  };

  if (variant === "text") {
    return (
      <motion.button
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`${base} ${variants[variant]} group ${className}`}
        {...props}
      >
        {children}
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && (
        <ArrowRight size={16} className="transition-transform duration-200" />
      )}
    </motion.button>
  );
}
