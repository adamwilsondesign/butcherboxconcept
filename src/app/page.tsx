import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import SixReasons from "@/components/sections/SixReasons";
import ProductCategories from "@/components/sections/ProductCategories";
import HowItWorks from "@/components/sections/HowItWorks";
import ForEveryTable from "@/components/sections/ForEveryTable";
import OurStandards from "@/components/sections/OurStandards";
import MemberReviews from "@/components/sections/MemberReviews";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <SixReasons />
      <ProductCategories />
      <HowItWorks />
      <ForEveryTable />
      <OurStandards />
      <MemberReviews />
      <FinalCTA />
    </main>
  );
}
