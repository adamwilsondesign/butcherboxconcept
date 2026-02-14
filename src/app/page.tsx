import Hero from "@/components/sections/Hero";
import ProductCategories from "@/components/sections/ProductCategories";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCuts from "@/components/sections/FeaturedCuts";
import ForEveryTable from "@/components/sections/ForEveryTable";
import OurStandards from "@/components/sections/OurStandards";
import SixReasons from "@/components/sections/SixReasons";
import TrustBar from "@/components/sections/TrustBar";
import MemberReviews from "@/components/sections/MemberReviews";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <SixReasons />
      <HowItWorks />
      <FeaturedCuts />
      <ForEveryTable />
      <OurStandards />
      <TrustBar />
      <MemberReviews />
      <FinalCTA />
    </main>
  );
}
