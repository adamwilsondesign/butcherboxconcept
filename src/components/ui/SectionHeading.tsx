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
        <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#767676]">
          {label}
        </span>
      )}
      <h2 className={`font-display text-[40px] font-semibold leading-tight tracking-heading text-[#2A2A2A] ${label ? "mt-4" : ""}`}>
        {heading}
      </h2>
    </div>
  );
}
