interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  className?: string;
  eyebrowColor?: "teal" | "accent";
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  className = "",
  eyebrowColor = "teal",
}: SectionHeadingProps) {
  const eyebrowColorClass = eyebrowColor === "accent" ? "text-[#C8512B]" : "text-[#2D5E4A]";

  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${eyebrowColorClass}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-bold leading-tight text-text-dark sm:text-5xl">
        {heading}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
