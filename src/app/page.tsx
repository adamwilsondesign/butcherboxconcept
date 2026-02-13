import Hero from "@/components/sections/Hero";
import ProductCategories from "@/components/sections/ProductCategories";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCuts from "@/components/sections/FeaturedCuts";
import SixReasons from "@/components/sections/SixReasons";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <HowItWorks />
      <FeaturedCuts />
      <SixReasons />
    </main>
  );
}
