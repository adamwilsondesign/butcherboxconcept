"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2D5E4A] text-white border-2 border-[#2D5E4A] hover:bg-[#243B35] hover:border-[#243B35]",
  secondary:
    "bg-transparent text-[#2D5E4A] border-2 border-[#2D5E4A] hover:bg-[#2D5E4A] hover:text-white",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(45,94,74,0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`rounded-md px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${variantStyles[variant]} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
