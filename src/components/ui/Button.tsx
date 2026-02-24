"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 text-base font-medium transition-colors duration-200";

  const variants = {
    primary:
      "rounded-lg bg-[#2D6A4F] text-white px-8 py-3.5 hover:bg-[#1B4332]",
    secondary:
      "rounded-lg border-2 border-[#1B4332] bg-transparent text-[#1B4332] px-8 py-3.5 hover:bg-[#1B4332] hover:text-white",
    text: "text-[#2D6A4F] hover:text-[#1B4332] hover:underline bg-transparent px-0 py-0",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
