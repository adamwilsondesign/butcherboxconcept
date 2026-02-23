interface SectionHeadingProps {
  heading: string;
  label?: string;
  className?: string;
}

export default function SectionHeading({
  heading,
  label,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {label && (
        <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#6B6B6B]">
          {label}
        </span>
      )}
      <h2 className={`font-display text-[40px] font-bold leading-tight text-[#1A1A1A] ${label ? "mt-4" : ""}`}>
        {heading}
      </h2>
    </div>
  );
}
