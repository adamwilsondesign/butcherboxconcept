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
    "bg-[#1B4332] text-white border-2 border-[#1B4332] hover:bg-[#2D6A4F] hover:border-[#2D6A4F]",
  secondary:
    "bg-transparent text-[#1B4332] border-2 border-[#1B4332] hover:bg-[#1B4332] hover:text-white",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        y: -2,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      whileTap={{
        y: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        transition: { duration: 0.1 },
      }}
      className={`rounded-pill px-8 py-3.5 text-[14px] font-medium transition-all duration-200 ${variantStyles[variant]} ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
