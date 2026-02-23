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
    "bg-[#243B35] text-white border-2 border-[#243B35] hover:bg-[#1a2c27] hover:border-[#1a2c27]",
  secondary:
    "bg-transparent text-[#243B35] border-2 border-[#243B35] hover:bg-[#243B35] hover:text-white",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(36,59,53,0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`rounded-md px-8 py-3.5 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 ${variantStyles[variant]} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
