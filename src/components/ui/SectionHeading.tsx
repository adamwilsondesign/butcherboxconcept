interface SectionHeadingProps {
  title: string;
  label?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  label,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {label && (
        <span className="text-sm font-semibold uppercase tracking-wider text-[#2D5E4A]">
          {label}
        </span>
      )}
      <h2 className="mt-4 font-display text-[36px] font-bold leading-tight text-[#1A1A1A] sm:text-[44px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[16px] leading-relaxed text-[#6B6B6B]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
