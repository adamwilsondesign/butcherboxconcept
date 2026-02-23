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
    "bg-[#1B3A2D] text-white border-2 border-[#1B3A2D] hover:bg-[#142e22] hover:border-[#142e22]",
  secondary:
    "bg-transparent text-[#1B3A2D] border-2 border-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(27,58,45,0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`rounded-pill px-8 py-3.5 text-[14px] font-semibold tracking-wide transition-colors duration-200 ${variantStyles[variant]} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
