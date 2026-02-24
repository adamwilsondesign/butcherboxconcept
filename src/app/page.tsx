"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import SomethingForEveryone from "@/components/sections/SomethingForEveryone";
import Standards from "@/components/sections/Standards";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyMembers from "@/components/sections/WhyMembers";
import SeekingBetterWay from "@/components/sections/SeekingBetterWay";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ProteinModal from "@/components/ProteinModal";

export default function Home() {
  const [, setPreferredProtein] = useState<string | null>(null);

  return (
    <main>
      {/* 1. Hero + StatsBar */}
      <Hero />
      <StatsBar />

      {/* 2. Something for Everyone (protein categories) */}
      <SomethingForEveryone />

      {/* 3. Superior Standards */}
      <Standards />

      {/* 4. How It Works (3 steps) */}
      <HowItWorks />

      {/* 5. Why 400,000+ Members Choose Us */}
      <WhyMembers />

      {/* 6. Seeking a Better Way (brand story) */}
      <SeekingBetterWay />

      {/* 7. Testimonials + UGC mosaic */}
      <Testimonials />

      {/* 8. FAQ */}
      <FAQ />

      {/* Protein preference modal (appears once per session) */}
      <ProteinModal onSelect={(cat) => setPreferredProtein(cat)} />
    </main>
  );
}
