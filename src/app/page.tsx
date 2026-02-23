"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import SixReasons from "@/components/sections/SixReasons";
import HowItWorks from "@/components/sections/HowItWorks";
import ForEveryTable from "@/components/sections/ForEveryTable";
import OurStandards from "@/components/sections/OurStandards";
import MemberReviews from "@/components/sections/MemberReviews";
import FinalCTA from "@/components/sections/FinalCTA";
import ProteinModal from "@/components/ProteinModal";

export default function Home() {
  const [, setPreferredProtein] = useState<string | null>(null);

  return (
    <main>
      <Hero />
      <StatsBar />
      <SixReasons />
      <HowItWorks />
      <ForEveryTable />
      <OurStandards />
      <MemberReviews />
      <FinalCTA />
      <ProteinModal onSelect={(cat) => setPreferredProtein(cat)} />
    </main>
  );
}
