"use client";

import { useId } from "react";

type MaskVariant = "blob1" | "blob2" | "blob3" | "oval" | "arch";

interface MaskedImageProps {
  src: string;
  alt: string;
  variant: MaskVariant;
  className?: string;
}

const CLIP_PATHS: Record<MaskVariant, string> = {
  blob1:
    "M0.5,0.02 C0.75,0.02 0.95,0.12 0.98,0.35 C1.01,0.58 0.92,0.82 0.72,0.95 C0.52,1.08 0.22,1.02 0.08,0.78 C-0.06,0.54 0.02,0.25 0.18,0.1 C0.34,-0.05 0.25,0.02 0.5,0.02 Z",
  blob2:
    "M0.45,0.01 C0.7,-0.02 0.92,0.1 0.97,0.3 C1.02,0.5 0.95,0.75 0.78,0.9 C0.61,1.05 0.35,1.03 0.15,0.88 C-0.05,0.73 -0.02,0.45 0.05,0.25 C0.12,0.05 0.2,0.04 0.45,0.01 Z",
  blob3:
    "M0.5,0.0 C0.72,0.0 0.88,0.08 0.95,0.22 C1.02,0.36 1.0,0.55 0.96,0.72 C0.92,0.89 0.78,0.98 0.55,1.0 C0.32,1.02 0.15,0.92 0.06,0.75 C-0.03,0.58 -0.01,0.38 0.05,0.22 C0.11,0.06 0.28,0.0 0.5,0.0 Z",
  oval:
    "M0.5,0.02 C0.78,0.02 0.98,0.18 0.98,0.5 C0.98,0.82 0.78,0.98 0.5,0.98 C0.22,0.98 0.02,0.82 0.02,0.5 C0.02,0.18 0.22,0.02 0.5,0.02 Z",
  arch:
    "M0.0,0.25 C0.0,0.08 0.15,0.0 0.5,0.0 C0.85,0.0 1.0,0.08 1.0,0.25 L1.0,1.0 L0.0,1.0 Z",
};

export default function MaskedImage({
  src,
  alt,
  variant,
  className = "",
}: MaskedImageProps) {
  const id = useId();
  const maskId = `mask-${id.replace(/:/g, "")}`;

  return (
    <div className={`relative ${className}`}>
      {/* Hidden SVG with clipPath definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={maskId} clipPathUnits="objectBoundingBox">
            <path d={CLIP_PATHS[variant]} />
          </clipPath>
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ clipPath: `url(#${maskId})` }}
      />
    </div>
  );
}
