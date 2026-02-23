interface SectionHeadingProps {
  heading: string;
  className?: string;
}

export default function SectionHeading({
  heading,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <h2 className="font-serif text-[40px] font-semibold leading-tight text-text-dark">
        {heading}
      </h2>
    </div>
  );
}
